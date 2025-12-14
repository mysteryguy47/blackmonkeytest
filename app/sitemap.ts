import { MetadataRoute } from "next";
import { coursesData } from "@shared/schema";

/**
 * Sitemap Generation
 * 
 * Generates sitemap.xml for search engines to discover and index all pages.
 * Next.js automatically serves this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://blackmonkey.in";
  
  // Clean base URL (remove trailing slash)
  const cleanBaseUrl = baseUrl.replace(/\/+$/, "");
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: cleanBaseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${cleanBaseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${cleanBaseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${cleanBaseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${cleanBaseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${cleanBaseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${cleanBaseUrl}/refunds-cancellations`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${cleanBaseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Course detail pages
  const coursePages: MetadataRoute.Sitemap = coursesData.map((course) => ({
    url: `${cleanBaseUrl}/course/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Course category pages
  const courseCategoryPages: MetadataRoute.Sitemap = coursesData.map((course) => ({
    url: `${cleanBaseUrl}/courses/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...coursePages, ...courseCategoryPages];
}
