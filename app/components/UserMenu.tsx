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

  // Show loading placeholder to maintain layout
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 border border-border/50">
        <div className="w-6 h-6 rounded-full bg-muted/50 animate-pulse border border-border/50" />
      </div>
    );
  }

  // Show login button if not authenticated
  if (status !== "authenticated" || !session?.user) {
    return (
      <button
        onClick={handleLogin}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 hover:bg-background/80 border border-border/50 hover:border-border/80 transition-all duration-200 hover:shadow-sm"
        aria-label="Log in"
      >
        <LogIn className="w-4 h-4 text-muted-foreground transition-colors duration-200" />
        <span className="text-sm font-medium text-foreground">Log In</span>
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
      {/* User Avatar Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          play("hover");
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 hover:bg-background/80 border border-border/50 hover:border-border transition-all duration-200 group"
        aria-label="User menu"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white text-xs font-semibold">
          {userInitials}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-lg bg-card border border-border shadow-lg backdrop-blur-md z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>

            <div className="p-1">
              <button
                onClick={handleSwitchAccount}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Switch Account</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

