import { Metadata } from "next";
import { coursesData } from "@shared/schema";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://blackmonkey.in";
const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  const course = coursesData.find((c) => c.id === "chakra");
  
  if (!course) {
    return {
      title: "CHAKRA - Robotics Course | BlackMonkey",
      description: "Learn robotics with BlackMonkey's interactive course.",
    };
  }

  const courseUrl = `${cleanBaseUrl}/courses/chakra`;
  const ogImage = `${cleanBaseUrl}/generated_images/chakra_product.png`;

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
          alt: `${course.name} Course Kit - Robotics for Kids`,
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
      "robotics",
      "robotics for kids",
      "STEM education",
      "Arduino robotics",
      "robot building",
      "programming for kids",
      "line following robot",
      "obstacle avoidance",
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

export default function ChakraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

