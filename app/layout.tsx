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

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});


export const metadata: Metadata = {
  title: "BlackMonkey - Next-Gen STEM Education for Kids",
  description:
    "BlackMonkey offers interactive STEM courses in paper circuits, robotics, IoT, and drones. Gamified learning experiences that make science, technology, engineering, and math exciting for kids.",
    icons: {
      icon: "/favicon.ico",      // or favicon.png
      shortcut: "/favicon.ico",
      apple: "/favicon.png"      // optional
    },
    openGraph: {
    title: "BlackMonkey - Next-Gen STEM Education",
    description:
      "Interactive STEM courses for kids: Paper Circuits, Robotics, IoT, and Drones",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${audiowide.variable} dark`}>
      <body className="bg-background text-foreground">
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
      </body>
    </html>
  );
}



