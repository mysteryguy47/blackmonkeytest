"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { coursesData, type Course } from "@shared/schema";
import { PaymentForm, getCoursePrice } from "@/components/PaymentForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import DarkVeil from "@/components/DarkVeil";
import { Footer } from "@/components/Footer";

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string | undefined;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!courseId) {
      setLoading(false);
      return;
    }
    
    const foundCourse = coursesData.find((c) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }
    setLoading(false);
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-neon-purple" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The course you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </Card>
      </div>
    );
  }

  const orderAmount = getCoursePrice(course.id);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div
        className="glass-container"
        style={{ width: "100vw", height: "100vh", position: "fixed" }}
      >
        <DarkVeil />
      </div>
      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </motion.div>

          {/* Payment Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className="p-8 md:p-12 border-border/30 backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, ${course.neonColor}10 0%, ${course.neonColor}05 50%, transparent 100%)`,
                borderColor: `${course.neonColor}30`,
                boxShadow: `0 20px 60px -20px ${course.neonColor}30`,
              }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
                  Complete Your Enrollment
                </h1>
                <p className="text-muted-foreground">
                  Enroll in <span className="font-semibold" style={{ color: course.neonColor }}>
                    {course.name}
                  </span>
                </p>
              </div>

              {/* Payment Form */}
              <PaymentForm
                course={course}
                orderAmount={orderAmount}
                onSuccess={() => {
                  // Payment will redirect via Cashfree
                }}
                onCancel={() => router.back()}
              />
            </Card>
          </motion.div>

          {/* Course Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <Card className="p-6 border-border/20 bg-card/50">
              <h3 className="font-semibold mb-3">What's Included:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-neon-purple mt-1">✓</span>
                  <span>Full course access with lifetime updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-purple mt-1">✓</span>
                  <span>Premium course kit delivered to your door</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-purple mt-1">✓</span>
                  <span>Expert instructor support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-purple mt-1">✓</span>
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
