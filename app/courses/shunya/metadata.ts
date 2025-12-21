import { Metadata } from "next";
import { coursesData } from "@shared/schema";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://blackmonkey.in";
const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

/**
 * Generate dynamic metadata for Shunya course page
 * This enables server-side rendering with proper SEO metadata
 */
export function generateShunyaMetadata(): Metadata {
  const course = coursesData.find((c) => c.id === "shunya");
  
  if (!course) {
    return {
      title: "SHUNYA - Paper Circuits Course | BlackMonkey",
      description: "Learn paper circuits with BlackMonkey's beginner-friendly course.",
    };
  }

  const courseUrl = `${cleanBaseUrl}/courses/shunya`;
  const ogImage = `${cleanBaseUrl}/generated_images/shunya_product.png`;

  return {
    title: `${course.name} - ${course.tagline} | BlackMonkey`,
    description: course.fullDescription || course.description,
    alternates: {
      canonical: courseUrl,
    },
    openGraph: {
      title: `${course.name} - ${course.tagline}`,
      description: course.fullDescription || course.description,
      type: "website",
      url: courseUrl,
      siteName: "BlackMonkey",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${course.name} Course Kit`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.name} - ${course.tagline}`,
      description: course.fullDescription || course.description,
      images: [ogImage],
    },
    keywords: [
      "paper circuits",
      "electronics for kids",
      "STEM education",
      "beginner electronics",
      "kids coding",
      "educational courses",
      course.name.toLowerCase(),
      course.ageGroup,
    ],
  };
}

