"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import DarkVeil from "@/components/DarkVeil";
import Nav from "@/components/Nav";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Footer } from "@/components/Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't render these components on dev pages
  const isDevPage = pathname?.startsWith("/dev");
  
  // Ensure cursor is visible on dev pages
  useEffect(() => {
    if (isDevPage) {
      document.body.style.cursor = 'auto';
      // Remove any cursor-hidden class if it exists
      document.body.classList.remove('cursor-hidden');
    }
    return () => {
      if (isDevPage) {
        document.body.style.cursor = '';
      }
    };
  }, [isDevPage]);
  
  return (
    <>
      {!isDevPage && <CustomCursor />}
      <div data-dev-page={isDevPage ? "true" : undefined}>
        {children}
      </div>
      {!isDevPage && (
        <>
          <div
            className="glass-container"
            style={{ width: "100vw", height: "100vh", position: "fixed" }}
          >
            <DarkVeil />
          </div>
          <Nav />
          <ParticleBackground />
          <Footer />
        </>
      )}
    </>
  );
}

