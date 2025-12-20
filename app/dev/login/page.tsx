"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Zap, Shield, Rocket } from "lucide-react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isRedirectingRef = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  
  // If already logged in, redirect to callback URL (with small delay to avoid loops)
  useEffect(() => {
    if (session) {
      const timer = setTimeout(() => {
        router.push(callbackUrl);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [session, callbackUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setMessage("Invalid credentials");
        setLoading(false);
      } else {
        // Login successful - redirect to callback URL or home
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          router.push(callbackUrl);
        }, 500);
      }
    } catch (error) {
      setMessage("An error occurred during login");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      // Ensure we're using the absolute callback URL
      const absoluteCallbackUrl = callbackUrl.startsWith("http") 
        ? callbackUrl 
        : `${window.location.origin}${callbackUrl}`;
      
      // Get the OAuth URL from NextAuth
      const result = await signIn("google", {
        callbackUrl: absoluteCallbackUrl,
        redirect: false
      });
      
      // Log for debugging
      console.log("SignIn result:", result);
      
      // If we got a URL, immediately redirect without any state updates
      // This prevents any error message from flashing
      if (result?.url) {
        // Set redirecting flags immediately (both ref and state) - this prevents error message rendering
        isRedirectingRef.current = true;
        setIsRedirecting(true);
        // Clear message state - React will batch this with setIsRedirecting
        setMessage("");
        // Redirect immediately - the browser will navigate away before React can render the error
        window.location.href = result.url;
        return; // Exit early - this should prevent any further execution
      }
      
      // Only reach here if there's no URL - handle errors
      // But check redirecting flag first to avoid setting error during redirect
      if (!isRedirectingRef.current) {
        if (result?.error) {
          console.error("SignIn error:", result.error);
          setMessage(`Sign in failed: ${result.error}`);
          setLoading(false);
        } else {
          // No URL returned - this shouldn't happen, but handle it
          console.warn("No URL returned from signIn");
          setMessage("Failed to get OAuth URL. Please try again.");
          setLoading(false);
        }
      }
    } catch (error) {
      // Only show error if we're not redirecting
      if (!isRedirectingRef.current) {
        console.error("Google sign in error:", error);
        setMessage("Failed to initiate Google sign in. Please try again.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Premium Graphics & Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.14, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <Image
                src="/logo.png"
                alt="BlackMonkey Logo"
                width={48}
                height={48}
                className="drop-shadow-lg"
              />
              <h1
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "var(--font-audiowide)",
                  letterSpacing: "1px",
                }}
              >
                BlackMonkey
              </h1>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Welcome Back
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-md">
              Continue your journey into next-generation STEM education. Build, create, and innovate.
            </p>
          </motion.div>

          {/* Feature Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { icon: Sparkles, text: "Interactive Learning", desc: "Hands-on projects and real-world applications" },
              { icon: Zap, text: "Gamified Experience", desc: "Earn badges, level up, and track your progress" },
              { icon: Shield, text: "Secure & Private", desc: "Your data is protected with enterprise-grade security" },
              { icon: Rocket, text: "Expert Guidance", desc: "Learn from industry professionals and educators" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{feature.text}</h3>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Log In</h2>
            <p className="text-muted-foreground">Access your account to continue learning</p>
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-border/50 hover:border-border hover:bg-accent/50 transition-all"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {loading ? "Connecting..." : "Continue with Google"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-3 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-11 border-border/50 focus:border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-11 border-border/50 focus:border-border"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 transition-all"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </Button>
              </form>

              {message && !isRedirecting && !isRedirectingRef.current && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-sm text-center ${
                    message.includes("successful") ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {message}
                </motion.p>
              )}

              <div className="mt-6 text-center">
                <a
                  href="/dev/signup"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Don't have an account?{" "}
                  <span className="font-medium text-foreground">Sign up</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
