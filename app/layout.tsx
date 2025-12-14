<script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>

import { useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { ParticleBackground } from "@/components/ParticleBackground";
import { GamifiedLab } from "@/components/GamifiedLab";
import { Footer } from "@/components/Footer";
import { AdvancedModal } from "@/components/AdvancedModal";
import { type Course } from "@shared/schema";
import DarkVeil from "@/components/DarkVeil";
import Nav from "@/components/Nav";


import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Audiowide } from "next/font/google";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StructuredData } from "@/components/StructuredData";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://blackmonkey.in";
const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(cleanBaseUrl),
  title: "BlackMonkey - Next-Gen STEM Education for Kids",
  description:
    "BlackMonkey offers interactive STEM courses in paper circuits, robotics, IoT, and drones. Gamified learning experiences that make science, technology, engineering, and math exciting for kids.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BlackMonkey - Next-Gen STEM Education",
    description:
      "Interactive STEM courses for kids: Paper Circuits, Robotics, IoT, and Drones",
    type: "website",
    url: cleanBaseUrl,
    siteName: "BlackMonkey",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackMonkey - Next-Gen STEM Education",
    description:
      "Interactive STEM courses for kids: Paper Circuits, Robotics, IoT, and Drones",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${audiowide.variable} dark`}>
      <head>
        {/* Organization Structured Data */}
        <StructuredData
          type="Organization"
          data={{
            name: "BlackMonkey",
            description: "Next-Gen STEM Education for Kids",
            url: cleanBaseUrl,
          }}
        />
        {/* Website Structured Data */}
        <StructuredData
          type="WebSite"
          data={{
            name: "BlackMonkey",
            url: cleanBaseUrl,
          }}
        />
      </head>
      <body className="bg-background text-foreground">
        <ErrorBoundary>
          <CustomCursor />         {/* global cursor */}
          <Providers>{children}</Providers>
          <div
          className="glass-container"
          style={{ width: "100vw", height: "100vh", position: "fixed" }}
        >
          <DarkVeil />
        </div>
        <Nav />
        <ParticleBackground />
        <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}



