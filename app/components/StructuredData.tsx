/**
 * StructuredData Component
 * 
 * Adds JSON-LD structured data to pages for better SEO.
 * Helps search engines understand the content and context of your pages.
 */

interface StructuredDataProps {
  type: "Organization" | "WebSite" | "Course" | "BreadcrumbList" | "FAQPage" | "AggregateRating" | "Review";
  data: Record<string, unknown>;
}

/**
 * StructuredData Component
 * 
 * @example
 * ```tsx
 * <StructuredData
 *   type="Organization"
 *   data={{
 *     name: "BlackMonkey",
 *     url: "https://blackmonkey.in"
 *   }}
 * />
 * ```
 */
export function StructuredData({ type, data }: StructuredDataProps) {
  const getSchema = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://blackmonkey.in";
    const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: data.name || "BlackMonkey",
          description: data.description || "Next-Gen STEM Education for Kids",
          url: data.url || cleanBaseUrl,
          logo: `${cleanBaseUrl}/favicon.png`,
          sameAs: [
            // Add social media links here when available
            // "https://twitter.com/blackmonkey",
            // "https://facebook.com/blackmonkey",
          ],
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: data.name || "BlackMonkey",
          url: data.url || cleanBaseUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${cleanBaseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        };

      case "Course":
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          name: data.name,
          description: data.description,
          provider: {
            "@type": "Organization",
            name: "BlackMonkey",
            url: cleanBaseUrl,
          },
          courseCode: data.courseCode,
          educationalLevel: data.educationalLevel || "Beginner",
          timeRequired: data.duration,
          ...(data.price ? {
            offers: {
              "@type": "Offer",
              price: data.price,
              priceCurrency: "INR",
            },
          } : {}),
        };

      case "BreadcrumbList":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.items || [],
        };

      case "FAQPage":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: (data.faqs || []).map((faq: { q: string; a: string }) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        };

      case "AggregateRating":
        return {
          "@context": "https://schema.org",
          "@type": "AggregateRating",
          ratingValue: data.ratingValue || "4.9",
          reviewCount: data.reviewCount || "120",
          bestRating: "5",
          worstRating: "1",
        };

      case "Review":
        return {
          "@context": "https://schema.org",
          "@type": "Review",
          author: {
            "@type": "Person",
            name: data.authorName || "Student",
          },
          datePublished: data.datePublished || new Date().toISOString(),
          reviewBody: data.reviewBody || "",
          reviewRating: {
            "@type": "Rating",
            ratingValue: data.ratingValue || "5",
            bestRating: "5",
            worstRating: "1",
          },
          itemReviewed: data.itemReviewed || {
            "@type": "Course",
            name: data.courseName || "Course",
          },
        };

      default:
        return data;
    }
  };

  const schema = getSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
