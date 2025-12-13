"use client";
import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    
    // Clear hash from URL on refresh to prevent scrolling to sections
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also scroll to top after a small delay to ensure it works
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      // Force scroll again after render
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }, 0);

    // Also handle on page load event
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("load", handleLoad);
      if (typeof window !== "undefined" && "scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  return null;
}
