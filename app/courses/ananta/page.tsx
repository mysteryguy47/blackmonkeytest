"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { coursesData } from "@shared/schema";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  Network,
  Brain,
  Shield,
} from "lucide-react";
import DarkVeil from "@/components/DarkVeil";

export default function AnantaPage() {
  const course = coursesData.find((c) => c.id === "ananta");
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToCourses = () => {
    router.push("/");
    setTimeout(() => {
      const coursesSection = document.getElementById("courses");
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  if (!course) return null;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div
        className="glass-container"
        style={{ width: "100vw", height: "100vh", position: "absolute" }}
      >
        <DarkVeil />
      </div>

      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <Button variant="ghost" className="mb-8" onClick={handleBackToCourses}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${course.neonColor}20, ${course.neonColor}10)`,
                  border: `2px solid ${course.neonColor}40`,
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Network className="w-12 h-12" style={{ color: course.neonColor }} />
              </motion.div>
              <div>
                <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider mb-1">
                  {course.code}
                </p>
                <h1
                  className="font-display font-bold text-foreground"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
                >
                  {course.name}
                </h1>
              </div>
            </div>

            <p
              className="text-2xl md:text-3xl font-medium mb-6"
              style={{ color: course.neonColor }}
            >
              {course.tagline}
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mb-8">
              {course.fullDescription}
            </p>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Ananta represents the pinnacle of IoT mastery, combining advanced technologies with artificial intelligence. 
                Deploy machine learning models on edge devices, implement computer vision, and build production-ready systems 
                with enterprise-level security. This course prepares you for real-world IoT applications and industry challenges.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 border-2 border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${course.neonColor}20, ${course.neonColor}10)`,
                  }}
                >
                  <Users className="w-6 h-6" style={{ color: course.neonColor }} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age Group</p>
                  <p className="text-lg font-semibold text-foreground">{course.ageGroup}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${course.neonColor}20, ${course.neonColor}10)`,
                  }}
                >
                  <Clock className="w-6 h-6" style={{ color: course.neonColor }} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-lg font-semibold text-foreground">{course.duration}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${course.neonColor}20, ${course.neonColor}10)`,
                  }}
                >
                  <Brain className="w-6 h-6" style={{ color: course.neonColor }} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="text-lg font-semibold text-foreground">{course.description}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                What You'll Learn
              </h2>
              <div className="space-y-4">
                {course.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                      style={{
                        background: `linear-gradient(135deg, ${course.neonColor}30, ${course.neonColor}20)`,
                      }}
                    >
                      <CheckCircle className="w-4 h-4" style={{ color: course.neonColor }} />
                    </div>
                    <p className="text-foreground leading-relaxed">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                Learning Outcomes
              </h2>
              <div className="space-y-4">
                {course.learningOutcomes.map((outcome, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                      style={{
                        background: `linear-gradient(135deg, ${course.neonColor}30, ${course.neonColor}20)`,
                      }}
                    >
                      <CheckCircle className="w-4 h-4" style={{ color: course.neonColor }} />
                    </div>
                    <p className="text-foreground leading-relaxed">{outcome}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <Card
              className="p-12 border-2 border-transparent bg-card/50 backdrop-blur-sm relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${course.neonColor}05, transparent)`,
                border: `2px solid ${course.neonColor}30`,
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at center, ${course.neonColor}10, transparent)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                  Ready to Master Advanced IoT?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Take your IoT skills to the next level with Ananta. Deploy AI models, build secure systems, 
                  and create production-ready solutions.
                </p>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}cc)`,
                    boxShadow: `0 0 30px ${course.neonColor}40`,
                  }}
                >
                  Enroll in {course.name}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}



