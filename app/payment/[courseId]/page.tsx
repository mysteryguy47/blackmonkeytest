"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { coursesData, type Course } from "@shared/schema";
import { PaymentForm, getCoursePrice } from "@/components/PaymentForm";
import { ProfileSetup, type ProfileData } from "@/components/ProfileSetup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import DarkVeil from "@/components/DarkVeil";
import { Footer } from "@/components/Footer";

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const courseId = params?.courseId as string | undefined;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/dev/login?callbackUrl=${encodeURIComponent(`/payment/${courseId}`)}`);
    }
  }, [status, router, courseId]);

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-neon-purple" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Will redirect via useEffect
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
      <main className="relative z-10 pt-32">
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

          {/* Payment Form Card - Premium Minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              className="p-8 md:p-10 backdrop-blur-sm"
              style={{
                background: `rgba(15, 23, 42, 0.6)`,
                borderColor: `${course.neonColor}25`,
                boxShadow: `0 20px 60px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px ${course.neonColor}20`,
              }}
            >
              {/* Header - Minimal with Course Color */}
              <div className="mb-8 pb-6 border-b" style={{ borderColor: `${course.neonColor}15` }}>
                <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-foreground">
                  {!profileComplete ? "Setup Your Profile" : "Complete Your Enrollment"}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {!profileComplete 
                    ? "We need a few details to personalize your child's learning experience"
                    : `Enroll in ${course.name} - Secure payment through Cashfree`
                  }
                </p>
              </div>

              {/* Profile Setup or Payment Form */}
              {!profileComplete ? (
                <ProfileSetup
                  course={course}
                  onComplete={(data) => {
                    setProfileData(data);
                    setProfileComplete(true);
                  }}
                  onCancel={() => router.back()}
                  userEmail={session?.user?.email || undefined}
                  userName={session?.user?.name || undefined}
                />
              ) : (
                <PaymentForm
                  course={course}
                  orderAmount={orderAmount}
                  profileData={profileData}
                  onSuccess={() => {
                    // Payment will redirect via Cashfree
                  }}
                  onCancel={() => router.back()}
                />
              )}
            </Card>
          </motion.div>

          {/* Course Info - Minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6 mb-0 pb-0"
          >
            <Card className="p-6 border-border/10 bg-muted/20">
              <h3 className="font-semibold mb-4 text-foreground">What's Included</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-foreground mt-0.5">•</span>
                  <span>Full course access with lifetime updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground mt-0.5">•</span>
                  <span>Premium course kit delivered to your door</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground mt-0.5">•</span>
                  <span>Expert instructor support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground mt-0.5">•</span>
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </main>

      <div className="payment-footer-wrapper" style={{ marginTop: '-10rem' }}>
        <Footer />
      </div>
    </div>
  );
}
