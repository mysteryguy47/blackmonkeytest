// app/lib/supabase-server.ts
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client with service role key for admin operations
// Note: If your Supabase is configured to use "api" schema, tables need to be in that schema
// or you need to configure Supabase to expose the "public" schema
export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    db: { schema: "api" as any },
    auth: { persistSession: false }
  }
);

