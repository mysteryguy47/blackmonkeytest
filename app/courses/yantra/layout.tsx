import { Metadata } from "next";
import { coursesData } from "@shared/schema";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://blackmonkey.in";
const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  const course = coursesData.find((c) => c.id === "yantra");
  
  if (!course) {
    return {
      title: "YANTRA - IoT Course | BlackMonkey",
      description: "Learn IoT with BlackMonkey's advanced course.",
    };
  }

  const courseUrl = `${cleanBaseUrl}/courses/yantra`;
  const ogImage = `${cleanBaseUrl}/generated_images/yantra_product.png`;

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
          alt: `${course.name} Course Kit - IoT for Kids`,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.name} - ${course.tagline}`,
      description: course.fullDescription || course.description,
      images: [ogImage],
      creator: "@blackmonkey",
    },
    keywords: [
      "IoT",
      "Internet of Things",
      "IoT for kids",
      "ESP32",
      "smart home",
      "STEM education",
      "connected devices",
      "sensors",
      course.name.toLowerCase(),
      course.ageGroup,
      course.code,
    ],
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
    authors: [{ name: "BlackMonkey" }],
    category: "Education",
  };
}

export default function YantraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

