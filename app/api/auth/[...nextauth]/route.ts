// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs"; // <- bcryptjs here

console.log("AUTH URL:", process.env.NEXTAUTH_URL);

// server-side supabase client (only if env vars are present)
let supabaseAdmin: ReturnType<typeof createClient> | null = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  try {
    // Supabase may be configured to use "api" schema
    // Try with api schema first, fallback to no schema specification
    const supabaseUrl = process.env.SUPABASE_URL as string;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
    
    // Try with api schema (as error message suggests)
    supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
      db: { schema: "api" as any },
      auth: { persistSession: false }
    });
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error);
  }
}

const providers = [];

// Only add Google provider if credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Request necessary scopes
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    })
  );
}

// Only add Credentials provider if Supabase is configured
if (supabaseAdmin) {
  providers.push(
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !supabaseAdmin) return null;

        try {
          const { data: users, error } = await supabaseAdmin!
            .from("users")
            .select("*")
            .eq("email", credentials.email)
            .limit(1);

          if (error || !users || users.length === 0) return null;
          const user = users[0] as any;
          if (!user || !user.password_hash) return null;

          const valid = await bcrypt.compare(credentials.password, user.password_hash);
          if (!valid) return null;

          return { 
            id: String(user.id || ""), 
            email: String(user.email || ""), 
            name: String(user.name || ""), 
            role: String(user.role || "user") 
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    })
  );
}

// Ensure at least one provider exists (fallback for development)
if (providers.length === 0) {
  // Add a dummy provider that always fails (prevents NextAuth from crashing)
  providers.push(
    CredentialsProvider({
      name: "Disabled",
      credentials: {},
      async authorize() {
        return null;
      }
    })
  );
}

const authOptions: NextAuthOptions = {
  providers,

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        session.user.email = token.email || session.user.email;
        session.user.name = token.name || session.user.name;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // This callback is called AFTER successful authentication
      // It should NOT interfere with OAuth initiation (which happens before this)
      
      // If url is relative, make it absolute
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      
      // If url is on same origin, allow it
      try {
        const urlObj = new URL(url);
        if (urlObj.origin === baseUrl) {
          return url;
        }
      } catch (e) {
        // Invalid URL, use baseUrl
      }
      
      // Default to baseUrl
      return baseUrl;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && supabaseAdmin) {
        // Guard against missing email - required for user lookup/creation
        if (!user?.email) {
          console.error("OAuth sign-in failed: User email is missing");
          return false; // Reject sign-in if email is missing
        }

        try {
          // Check if user exists, if not create them
          const { data: existingUser, error: checkError } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("email", user.email)
            .limit(1);

          // If there's a schema error, log it but continue
          if (checkError && checkError.code === 'PGRST106') {
            console.warn("Supabase schema configuration issue. OAuth user creation skipped:", checkError.message);
            // Still allow sign-in to proceed - user can be created manually if needed
            return true;
          }

          if (!existingUser || existingUser.length === 0) {
            // Create new OAuth user
            // user.email is guaranteed to exist due to guard above
            const { error: insertError } = await supabaseAdmin!.from("users").insert({
              email: user.email,
              name: user.name || "",
              role: "user"
              // password_hash is null for OAuth users
            } as any);

            if (insertError) {
              // If schema error, log but don't block authentication
              if (insertError.code === 'PGRST106') {
                console.warn("Supabase schema configuration issue. OAuth user creation skipped:", insertError.message);
                // Allow sign-in to proceed - user can be created manually if needed
                return true;
              }
              console.error("Error creating OAuth user:", insertError);
              // Don't block authentication if Supabase fails - allow sign-in to proceed
              // The user can be created manually later if needed
              return true;
            }
          }

          return true;
        } catch (error: any) {
          // Catch any other errors (network, DNS, etc.) and log them
          // But ALWAYS allow sign-in to proceed - don't block Google OAuth just because Supabase is down
          console.error("Error in OAuth sign-in callback (allowing sign-in to proceed):", error);
          // Always return true - Google authentication succeeded, that's what matters
          return true;
        }
      }
      // For credentials, authorization is handled in the provider
      return true;
    }
  },

  secret: process.env.NEXTAUTH_SECRET || "development-secret-key-change-in-production",
  pages: {
    signIn: "/dev/login",
    // Don't redirect errors back to login - let NextAuth handle it
    // error: "/dev/login",
  },
  // Session configuration
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Enable debug in development
  debug: process.env.NODE_ENV === "development",
  // Note: NEXTAUTH_URL must be set as an environment variable
  // For development: NEXTAUTH_URL=http://localhost:3000
  // For production: NEXTAUTH_URL=https://yourdomain.com
  // NextAuth uses NEXTAUTH_URL to construct OAuth callback URLs
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
