"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import { LogOut, User, RefreshCw, ChevronDown, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/hooks/use-sound";
import { usePathname } from "next/navigation";

export function UserMenu() {
  const { data: session, status } = useSession();
  const { play } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    play("click");
    await signOut({ callbackUrl: "/" });
  };

  const handleSwitchAccount = async () => {
    play("click");
    // Logout first, then sign in with new account
    await signOut({ redirect: false });
    const result = await signIn("google", { 
      callbackUrl: window.location.origin + window.location.pathname,
      redirect: false 
    });
    if (result?.url) {
      window.location.href = result.url;
    } else if (result?.error) {
      console.error("Switch account error:", result.error);
    }
  };

  const handleLogin = async () => {
    play("click");
    // Determine callback URL based on current page
    const callbackUrl = pathname === "/bmlab" ? "/bmlab" : "/";
    const result = await signIn("google", {
      callbackUrl: window.location.origin + callbackUrl,
      redirect: false
    });
    if (result?.url) {
      window.location.replace(result.url);
    } else if (result?.error) {
      console.error("Login error:", result.error);
      // Fallback to login page
      window.location.href = `/dev/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    }
  };

  // Show loading placeholder to maintain layout - same size as login button
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/50 shadow-lg shadow-black/20">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-muted/60 to-muted/40 animate-pulse border border-border/40 shadow-sm" />
      </div>
    );
  }

  // Show login button if not authenticated
  if (status !== "authenticated" || !session?.user) {
    return (
      <button
        onClick={handleLogin}
        className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/50 hover:border-neon-purple/50 transition-all duration-500 overflow-hidden group shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-neon-purple/10"
        aria-label="Log in"
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
        }}
      >
        {/* Premium shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/8 via-transparent to-neon-cyan/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Inner border glow */}
        <div className="absolute inset-0 rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <LogIn className="w-4 h-4 text-slate-300 group-hover:text-neon-purple transition-colors duration-500 relative z-10" />
        <span className="text-sm font-semibold text-slate-100 group-hover:text-neon-purple/90 transition-colors duration-500 relative z-10 tracking-wide">Log In</span>
        {/* Premium glow on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.15)",
          }}
        />
      </button>
    );
  }

  const user = session.user;
  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button - Same size as login button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          play("hover");
        }}
        className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/50 hover:border-neon-purple/50 transition-all duration-500 overflow-hidden group shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-neon-purple/10"
        aria-label="User menu"
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
        }}
      >
        {/* Premium shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/8 via-transparent to-neon-cyan/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Inner border glow */}
        <div className="absolute inset-0 rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan flex items-center justify-center text-white text-[9px] font-bold shadow-lg shadow-neon-purple/40 relative z-10 ring-1 ring-white/20 leading-none flex-shrink-0 min-w-[16px]">
          {userInitials}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10"
        >
          <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-neon-purple transition-colors duration-500" />
        </motion.div>
        {/* Premium glow on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.15)",
          }}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.25 }
            }}
            className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-slate-700/60 shadow-2xl shadow-black/50 z-50 overflow-hidden"
            style={{
              backdropFilter: "blur(24px) saturate(200%)",
            }}
          >
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/8 via-transparent to-neon-cyan/8 pointer-events-none" />
            {/* Inner border glow */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
            
            <div className="p-4 border-b border-border/30 relative">
              <p className="text-sm font-bold text-foreground truncate mb-1.5 tracking-wide">
                {user.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground/80 truncate font-medium">
                {user.email}
              </p>
            </div>

            <div className="p-2.5 relative">
              <button
                onClick={handleSwitchAccount}
                className="w-full flex items-center gap-3.5 px-4 py-3 text-sm text-foreground hover:bg-gradient-to-r hover:from-accent/60 hover:via-accent/40 hover:to-accent/30 rounded-xl transition-all duration-500 group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                <RefreshCw className="w-4 h-4 text-muted-foreground group-hover:text-neon-purple transition-colors duration-500 relative z-10" />
                <span className="relative z-10 group-hover:text-neon-purple/90 transition-colors duration-500 font-semibold tracking-wide">Switch Account</span>
                {/* Subtle right arrow indicator */}
                <div className="ml-auto relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ChevronDown className="w-3.5 h-3.5 text-neon-purple rotate-[-90deg]" />
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3.5 px-4 py-3 text-sm text-destructive hover:bg-destructive/15 rounded-xl transition-all duration-500 group relative overflow-hidden mt-1.5"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                <LogOut className="w-4 h-4 relative z-10" />
                <span className="relative z-10 font-semibold tracking-wide">Logout</span>
                {/* Subtle right arrow indicator */}
                <div className="ml-auto relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ChevronDown className="w-3.5 h-3.5 text-destructive rotate-[-90deg]" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

