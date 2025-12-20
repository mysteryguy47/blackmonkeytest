"use client";

import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { LoadingScreen } from "@/components/LoadingScreen";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider
      // Optimize session refetching - less frequent to reduce lag
      // Refetch every 10 minutes to keep session fresh (reduced from 5)
      refetchInterval={10 * 60}
      // Only refetch on window focus if needed (can cause lag)
      refetchOnWindowFocus={false}
      // Base path for NextAuth API routes
      basePath="/api/auth"
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <LoadingScreen />
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}


