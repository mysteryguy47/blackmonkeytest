<script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>


import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Audiowide } from "next/font/google";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StructuredData } from "@/components/StructuredData";
import { ConditionalLayout } from "@/components/ConditionalLayout";

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
    // Note: favicon.png doesn't exist, using favicon.ico for apple icon as fallback
    // To fix properly, create a 180x180 PNG file at /public/favicon.png
    apple: "/favicon.ico",
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
        {/* Prevent white flash during page transitions */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html {
              background-color: #000000 !important;
            }
            body {
              background-color: #000000 !important;
              margin: 0;
              padding: 0;
            }
            * {
              box-sizing: border-box;
            }
          `
        }} />
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
      <body className="bg-black text-foreground" style={{ backgroundColor: '#000000' }}>
        <ErrorBoundary>
          <Providers>
            <ConditionalLayout>{children}</ConditionalLayout>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}



