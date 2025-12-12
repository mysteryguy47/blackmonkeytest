"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { RefreshCw, Clock, XCircle, CheckCircle, AlertCircle, CreditCard } from "lucide-react";

export default function RefundsCancellationsPage() {
  const sections = [
    {
      icon: Clock,
      title: "Refund Policy Overview",
      content: [
        "At BlackMonkey, we want you to be completely satisfied with your course enrollment. If you are not satisfied with your purchase, we offer refunds under certain conditions as outlined in this policy.",
        "All refund requests must be submitted within 7 days of the course purchase date. Refunds requested after this period will not be eligible.",
        "Refunds will be processed to the original payment method used for the purchase. Processing times may vary depending on your payment provider, typically taking 5-10 business days.",
      ],
    },
    {
      icon: CheckCircle,
      title: "Eligible Refund Scenarios",
      content: [
        "Technical Issues: If you experience persistent technical problems that prevent you from accessing course materials and we are unable to resolve them within 48 hours.",
        "Course Content Mismatch: If the course content significantly differs from what was advertised and does not meet your expectations, provided you have completed less than 25% of the course.",
        "Duplicate Purchase: If you accidentally purchased the same course twice, we will refund one of the purchases.",
        "Cancellation Before Course Start: If you cancel your enrollment before the course start date, you are eligible for a full refund.",
      ],
    },
    {
      icon: XCircle,
      title: "Non-Refundable Scenarios",
      content: [
        "Refunds will not be provided if you have completed more than 50% of the course content.",
        "Refunds are not available for courses that have been completed or certificates that have been issued.",
        "Refunds will not be provided if the refund request is made more than 7 days after the purchase date.",
        "No refunds will be provided for courses purchased during special promotional periods unless explicitly stated in the promotion terms.",
        "Refunds are not available for downloadable materials that have already been accessed or downloaded.",
      ],
    },
    {
      icon: RefreshCw,
      title: "Cancellation Process",
      content: [
        "To cancel your enrollment, please contact us at ignite@blackmonkey.in with your order number and reason for cancellation.",
        "Cancellation requests must be submitted at least 48 hours before the course start date to be eligible for a full refund.",
        "If you cancel after the course has started, you may be eligible for a partial refund based on the amount of course content accessed.",
        "Once your cancellation is processed, you will lose access to all course materials and resources immediately.",
      ],
    },
    {
      icon: CreditCard,
      title: "Refund Processing",
      content: [
        "Once your refund request is approved, we will process the refund within 5-7 business days.",
        "The refund will be credited back to the original payment method used for the purchase.",
        "If the original payment method is no longer available, please contact us to arrange an alternative refund method.",
        "You will receive an email confirmation once the refund has been processed. Please allow additional time for your bank or credit card company to reflect the refund in your account.",
      ],
    },
    {
      icon: AlertCircle,
      title: "Special Circumstances",
      content: [
        "In case of course cancellation by BlackMonkey due to unforeseen circumstances, enrolled students will receive a full refund or the option to transfer to another course.",
        "If a course is postponed or rescheduled, students will be notified and given the option to receive a full refund or transfer to the new date.",
        "For group enrollments or bulk purchases, refund policies may differ. Please refer to your specific agreement or contact us for details.",
        "We reserve the right to refuse refund requests that we believe are fraudulent or made in bad faith.",
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
                Refunds & Cancellations
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our refund and cancellation policy ensures fairness for both you and us. Please review these terms carefully.
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
                  At BlackMonkey, we are committed to providing high-quality STEM education courses. We understand that sometimes circumstances change, and you may need to cancel your enrollment or request a refund. This policy outlines the terms and conditions for refunds and cancellations.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Please read this policy carefully before making a purchase. By purchasing a course, you agree to the terms outlined in this refund and cancellation policy.
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
                  How to Request a Refund
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    To request a refund, please follow these steps:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Send an email to ignite@blackmonkey.in with the subject line "Refund Request"</li>
                    <li>Include your order number and the reason for your refund request</li>
                    <li>Provide any relevant documentation or screenshots if applicable</li>
                    <li>Our team will review your request and respond within 2-3 business days</li>
                  </ol>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="p-8 border-neon-purple/30 bg-card/50">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Questions?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about our refund and cancellation policy, please don't hesitate to contact us:
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

