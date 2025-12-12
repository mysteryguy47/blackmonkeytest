"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText, Users, Database } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        "We collect information that you provide directly to us, including when you register for courses, make purchases, or contact us. This may include your name, email address, phone number, payment information, and any other information you choose to provide.",
        "We automatically collect certain information about your device when you access our website, including your IP address, browser type, operating system, and browsing behavior.",
        "We may use cookies and similar tracking technologies to track activity on our website and hold certain information.",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To provide, maintain, and improve our services and courses.",
        "To process your transactions and send you related information, including purchase confirmations and invoices.",
        "To send you technical notices, updates, security alerts, and support messages.",
        "To respond to your comments, questions, and provide customer service.",
        "To monitor and analyze trends, usage, and activities in connection with our services.",
        "To personalize and improve your experience on our platform.",
      ],
    },
    {
      icon: Database,
      title: "Information Sharing and Disclosure",
      content: [
        "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
        "With service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.",
        "When we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.",
        "In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        "However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.",
        "We use industry-standard encryption technologies when transferring and receiving data exchanged with our site.",
      ],
    },
    {
      icon: Users,
      title: "Your Rights and Choices",
      content: [
        "You have the right to access, update, or delete your personal information at any time by contacting us.",
        "You can opt-out of receiving promotional communications from us by following the unsubscribe instructions in those messages.",
        "You may have certain rights regarding your personal information under applicable data protection laws, including the right to request access, correction, deletion, or restriction of processing.",
        "You can control cookies through your browser settings, though disabling cookies may limit your ability to use certain features of our website.",
      ],
    },
    {
      icon: Shield,
      title: "Children's Privacy",
      content: [
        "Our services are designed for children and their parents/guardians. We take the privacy of children seriously.",
        "We collect personal information from children only with the consent of their parents or guardians.",
        "Parents or guardians can review, request deletion of, or refuse further collection of their child's personal information at any time.",
        "We do not knowingly collect personal information from children under the age of 13 without parental consent.",
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
                Privacy Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
                  At BlackMonkey, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using our website and services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
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
                  Changes to This Privacy Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
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
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
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

