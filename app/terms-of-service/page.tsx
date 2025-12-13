"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FileText, BookOpen, CreditCard, GraduationCap, AlertTriangle, Gavel } from "lucide-react";

export default function TermsOfServicePage() {
  const sections = [
    {
      icon: BookOpen,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using BlackMonkey's website and services, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.",
      ],
    },
    {
      icon: GraduationCap,
      title: "Use of Services",
      content: [
        "You must be at least 13 years old to use our services, or have parental/guardian consent if under 13.",
        "You agree to use our services only for lawful purposes and in accordance with these Terms of Service.",
        "You agree not to use the service: (a) in any way that violates any applicable national or international law or regulation; (b) to transmit, or procure the sending of, any advertising or promotional material; (c) to impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity.",
        "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: [
        "All course fees must be paid in full before access to course materials is granted.",
        "Prices for our courses are subject to change without notice. We reserve the right at any time to modify or discontinue courses without prior notice.",
        "We accept various payment methods including credit cards, debit cards, and other payment methods as displayed on our website.",
        "All payments are processed securely through our payment partners. We do not store your complete payment card information on our servers.",
        "Refunds are subject to our Refunds & Cancellations policy, which can be found on our website.",
      ],
    },
    {
      icon: FileText,
      title: "Intellectual Property Rights",
      content: [
        "The content on our website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of BlackMonkey or its content suppliers and is protected by international copyright laws.",
        "You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without prior written consent.",
        "Course materials provided to you are for your personal, non-commercial use only. You may not share, resell, or redistribute course materials without explicit permission.",
        "All trademarks, service marks, and trade names of BlackMonkey used on the site are trademarks or registered trademarks of BlackMonkey.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: [
        "BlackMonkey shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of or inability to use the service.",
        "We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free.",
        "We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.",
        "You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.",
      ],
    },
    {
      icon: Gavel,
      title: "Governing Law",
      content: [
        "These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.",
        "Any disputes arising out of or relating to these terms or the services provided by BlackMonkey shall be subject to the exclusive jurisdiction of the courts located in Gurgaon, Haryana, India.",
        "If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
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
                Terms of Service
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By using our website, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 2025
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 border-neon-purple/30 bg-card/50">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Welcome to BlackMonkey. These Terms of Service ("Terms") govern your access to and use of our website, courses, and related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  If you disagree with any part of these terms, then you may not access the Services. We reserve the right to update, change, or replace any part of these Terms of Service by posting updates and/or changes to our website.
                </p>
              </Card>
            </motion.div>

            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
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
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="p-8 border-neon-purple/30 bg-card/50">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="p-8 border-neon-purple/30 bg-card/50">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: ignite@blackmonkey.in</p>
                  <p>Phone: +91 - 9718325064</p>
                  <p>Address: Gurgaon, Haryana, India</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}



