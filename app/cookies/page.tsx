import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Cookie, Settings, Shield, BarChart, Target, Eye } from "lucide-react";
import { AnimatedSection, AnimatedHeader } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Cookie Policy - BlackMonkey",
  description: "Learn about how BlackMonkey uses cookies and similar technologies to enhance your browsing experience and improve our services.",
  openGraph: {
    title: "Cookie Policy - BlackMonkey",
    description: "Learn about how BlackMonkey uses cookies and similar technologies to enhance your browsing experience and improve our services.",
    type: "website",
  },
};

export default function CookiesPage() {
  const cookieTypes = [
    {
      icon: Cookie,
      title: "Essential Cookies",
      description: "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
      examples: [
        "Session management cookies that keep you logged in",
        "Security cookies that protect against fraudulent activity",
        "Load balancing cookies that distribute traffic across servers",
      ],
    },
    {
      icon: BarChart,
      title: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: [
        "Google Analytics cookies that track page views and user behavior",
        "Performance monitoring cookies that help us improve site speed",
        "Error tracking cookies that help us identify and fix issues",
      ],
    },
    {
      icon: Target,
      title: "Marketing Cookies",
      description: "These cookies are used to deliver advertisements that are relevant to you and your interests. They may also be used to limit the number of times you see an advertisement.",
      examples: [
        "Advertising cookies that show you relevant ads",
        "Social media cookies that enable sharing features",
        "Retargeting cookies that help us show you relevant content",
      ],
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      examples: [
        "Preference cookies that remember your language choice",
        "Feature cookies that enable enhanced functionality",
        "Localization cookies that provide location-based content",
      ],
    },
  ];

  const sections = [
    {
      icon: Eye,
      title: "How We Use Cookies",
      content: [
        "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.",
        "Cookies help us understand which pages are most popular and how visitors navigate through our site.",
        "We use cookies to remember your preferences and settings, so you don't have to re-enter them every time you visit.",
        "Cookies enable us to provide personalized content and recommendations based on your interests and browsing history.",
      ],
    },
    {
      icon: Shield,
      title: "Third-Party Cookies",
      content: [
        "In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements, and so on.",
        "Third-party cookies are set by domains other than BlackMonkey. We use services like Google Analytics, which may set cookies on your device.",
        "We do not have control over third-party cookies. You should check the third-party websites for more information about their cookies and how to manage them.",
        "Some third-party cookies are used for advertising purposes. These cookies may track your browsing habits across different websites.",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedHeader className="text-center mb-16">
            <h1
              className="font-display font-bold mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(90deg, rgb(168, 85, 247), rgb(34, 211, 238))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Cookie Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn about how we use cookies and similar technologies to enhance your browsing experience.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 2025
            </p>
          </AnimatedHeader>

          <div className="space-y-8">
            <AnimatedSection delay={0.1}>
              <Card className="p-8 border-neon-purple/30 bg-card/50">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  This Cookie Policy explains what cookies are, how we use cookies on our website, and how you can control cookies. By using our website, you consent to the use of cookies in accordance with this policy.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Types of Cookies We Use
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cookieTypes.map((type, idx) => (
                  <AnimatedSection key={idx} delay={0.3 + idx * 0.1}>
                    <Card className="p-6 border-neon-purple/30 bg-card/50 hover:border-neon-purple/50 transition-colors h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <type.icon className="w-6 h-6 text-neon-purple flex-shrink-0 mt-1" />
                        <h3 className="text-xl font-bold text-foreground">
                          {type.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {type.description}
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground">
                          Examples:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {type.examples.map((example, eIdx) => (
                            <li key={eIdx}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            {sections.map((section, idx) => (
              <AnimatedSection key={idx} delay={0.7 + idx * 0.1}>
                <Card className="p-8 border-neon-purple/30 bg-card/50 hover:border-neon-purple/50 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <section.icon className="w-6 h-6 text-neon-purple flex-shrink-0 mt-1" />
                    <h2 className="text-2xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4 ml-10">
                    {section.content.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>
            ))}

            <AnimatedSection delay={0.9}>
              <Card className="p-8 border-neon-purple/30 bg-card/50">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Managing Cookies
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
                  </p>
                  <p className="leading-relaxed">
                    However, if you choose to decline cookies, you may not be able to fully experience the interactive features of our website or some of our services may not function properly.
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold text-foreground mb-2">
                      How to manage cookies in different browsers:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                      <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
                      <li>Safari: Preferences → Privacy → Cookies and website data</li>
                      <li>Edge: Settings → Privacy, search, and services → Cookies and site permissions</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={1.0}>
              <Card className="p-8 border-neon-purple/30 bg-card/50">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: ignite@blackmonkey.in</p>
                  <p>Phone: +91 - 9718325064</p>
                  <p>Address: Gurgaon, Haryana, India</p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </main>
    </div>
  );
}



