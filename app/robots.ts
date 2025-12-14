import { MetadataRoute } from "next";

/**
 * Robots.txt Generation
 * 
 * Generates robots.txt to control search engine crawling behavior.
 * Next.js automatically serves this at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://blackmonkey.in";
  const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",           // Disallow API routes
          "/payment/",       // Disallow payment pages (sensitive)
          "/payment-result/", // Disallow payment result pages
          "/_next/",         // Disallow Next.js internals
          "/admin/",         // Disallow admin routes (if any)
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/payment/",
          "/payment-result/",
        ],
      },
    ],
    sitemap: `${cleanBaseUrl}/sitemap.xml`,
  };
}
