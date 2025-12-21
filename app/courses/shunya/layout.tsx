import { Metadata } from "next";
import { coursesData } from "@shared/schema";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://blackmonkey.in";
const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

/**
 * Generate dynamic metadata for Shunya course page
 * This enables perfect SEO with server-side rendering
 */
export async function generateMetadata(): Promise<Metadata> {
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
    
    // Canonical URL to prevent duplicate content
    alternates: {
      canonical: courseUrl,
    },
    
    // Open Graph for social media sharing (Facebook, LinkedIn, etc.)
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
          alt: `${course.name} Course Kit - Paper Circuits for Kids`,
        },
      ],
      locale: "en_US",
    },
    
    // Twitter Cards for Twitter sharing
    twitter: {
      card: "summary_large_image",
      title: `${course.name} - ${course.tagline}`,
      description: course.fullDescription || course.description,
      images: [ogImage],
      creator: "@blackmonkey", // Update with your Twitter handle
    },
    
    // Keywords for SEO
    keywords: [
      "paper circuits",
      "electronics for kids",
      "STEM education",
      "beginner electronics",
      "kids coding",
      "educational courses",
      "paper circuit projects",
      "LED circuits",
      "conductive tape",
      "electronics basics",
      course.name.toLowerCase(),
      course.ageGroup,
      course.code,
    ],
    
    // Robots directives for search engines
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    
    // Additional metadata
    authors: [{ name: "BlackMonkey" }],
    category: "Education",
    
    // Structured data will be added via StructuredData component in page.tsx
  };
}

/**
 * Layout wrapper for Shunya course page
 * This enables server-side metadata generation while keeping the page as a client component
 */
export default function ShunyaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

