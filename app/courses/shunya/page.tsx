"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { coursesData } from "@shared/schema";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Play,
  Star,
  Trophy,
  Rocket,
  Sparkles,
  ChevronDown,
  Gift,
  Video,
  Heart,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import DarkVeil from "@/components/DarkVeil";
import Image from "next/image";
import { useSound } from "@/hooks/use-sound";

// Course product image paths
const courseImageMap: Record<string, string> = {
  shunya: "/generated_images/shunya_product.png",
  chakra: "/generated_images/chakra_product.png",
  yantra: "/generated_images/yantra_product.png",
  ananta: "/generated_images/ananta_product.png",
  garuda: "/generated_images/garuda_aviator_kit_product.png",
};

// Mock data for premium sections
const courseProjects = {
  shunya: [
    { title: "Glowing Paper Art", description: "Create beautiful LED-lit artwork", week: 2 },
    { title: "Interactive Greeting Card", description: "Build a card that lights up when opened", week: 4 },
    { title: "Paper Circuit Robot", description: "Design a robot with glowing eyes", week: 6 },
  ],
};

const kitContents = {
  shunya: [
    { name: "LEDs (20 pcs)", icon: "💡" },
    { name: "Conductive Tape", icon: "⚡" },
    { name: "Coin Cell Batteries", icon: "🔋" },
    { name: "Paper Templates", icon: "📄" },
    { name: "Resistors", icon: "🔌" },
  ],
};

const courseTestimonials = {
  shunya: [
    { name: "Aarav, Age 6", text: "I made a glowing robot card for my mom! She loved it! ⭐", rating: 5 },
    { name: "Maya, Age 7", text: "Best class ever! I learned how electricity works!", rating: 5 },
  ],
};

const courseFAQs = {
  shunya: [
    { q: "Is this course safe for 4-year-olds?", a: "Absolutely! All materials are child-safe, and we have strict safety protocols. Parents are welcome to join the first session." },
    { q: "What if my child has no prior experience?", a: "Perfect! Shunya is designed as the starting point. We teach everything from scratch in a fun, engaging way." },
    { q: "Do we need to buy anything extra?", a: "No! Everything is included in the course kit. Just bring curiosity and creativity!" },
  ],
};

export default function ShunyaPage() {
  const course = coursesData.find((c) => c.id === "shunya");
  const router = useRouter();
  const { play } = useSound();
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

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

  const projects = courseProjects.shunya;
  const kitItems = kitContents.shunya;
  const testimonials = courseTestimonials.shunya;
  const faqs = courseFAQs.shunya;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div
        className="glass-container"
        style={{ width: "100vw", height: "100vh", position: "absolute" }}
      >
        <DarkVeil />
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-[1000px] h-[1000px] rounded-full blur-3xl opacity-[0.12]"
          style={{
            background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
            top: "-30%",
            right: "-15%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.18, 0.12],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full blur-3xl opacity-[0.08]"
          style={{
            background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
            bottom: "-20%",
            left: "-15%",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.14, 0.08],
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + (i % 5) * 2}px`,
              height: `${3 + (i % 5) * 2}px`,
              background: course.neonColor,
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              opacity: 0.15,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.sin(i) * 40, 0],
              opacity: [0.15, 0.3, 0.15],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6 + (i % 3) * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <main className="relative z-10">
        {/* Premium Hero Section with Parallax */}
        <motion.div
          ref={heroRef}
          style={{ opacity, scale }}
          className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20"
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                className="backdrop-blur-md border border-border/50 hover:border-border/80 transition-all duration-300"
                onClick={handleBackToCourses}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Course Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: course.neonColor }} />
                  <span className="text-sm font-medium">{course.code}</span>
                </motion.div>

                <motion.h1
                  className="font-display font-extrabold mb-6 leading-tight"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 5.5rem)",
                    lineHeight: "1.1",
                    background: `linear-gradient(to bottom right, ${course.neonColor}, ${course.neonColor}dd, rgb(255, 255, 255))`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {course.name}
                </motion.h1>

                <motion.p
                  className="text-3xl md:text-4xl font-semibold mb-6 leading-relaxed"
                  style={{ color: `${course.neonColor}ee` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {course.tagline}
                </motion.p>

                <motion.p
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {course.fullDescription}
                </motion.p>

                {/* Quick Stats */}
                <motion.div
                  className="flex flex-wrap gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {[
                    { icon: Users, label: "Age", value: course.ageGroup },
                    { icon: Clock, label: "Duration", value: course.duration },
                    { icon: Trophy, label: "Projects", value: `${projects.length}+` },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border border-border/30"
                      style={{
                        background: `linear-gradient(135deg, ${course.neonColor}15, ${course.neonColor}08)`,
                        borderColor: `${course.neonColor}30`,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <stat.icon className="w-5 h-5" style={{ color: course.neonColor }} />
                      <div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-sm font-semibold">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    size="lg"
                    className="text-lg px-8 py-7 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                      boxShadow: `0 8px 32px -8px ${course.neonColor}50`,
                    }}
                    onClick={() => play("click")}
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Enroll Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-7 rounded-xl font-semibold border-2 hover:scale-105 transition-transform duration-300"
                    style={{
                      borderColor: `${course.neonColor}50`,
                    }}
                    onClick={() => play("hover")}
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Watch Preview
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right: Product Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {courseImageMap[course.id] && (
                  <motion.div
                    className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={courseImageMap[course.id]}
                        alt={`${course.name} Product Kit`}
                        fill
                        className="object-contain"
                        priority
                        unoptimized
                      />
                    </div>
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${course.neonColor}20 0%, transparent 70%)`,
                      }}
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Border glow */}
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 60px ${course.neonColor}30, 0 0 80px ${course.neonColor}20`,
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Curriculum Timeline - Interactive */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Your Learning Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Step-by-step progression from beginner to master
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 hidden md:block"
                style={{
                  background: `linear-gradient(to bottom, ${course.neonColor}40, ${course.neonColor}20)`,
                }}
              />
              
              <div className="space-y-12">
                {course.features.map((feature, index) => {
                  const week = Math.ceil(((index + 1) / course.features.length) * parseInt(course.duration));
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`flex flex-col md:flex-row items-start gap-6 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <motion.div
                          className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border-2"
                          style={{
                            background: `linear-gradient(135deg, ${course.neonColor}30, ${course.neonColor}15)`,
                            borderColor: course.neonColor,
                            boxShadow: `0 0 30px ${course.neonColor}40`,
                          }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <span className="text-2xl font-bold" style={{ color: course.neonColor }}>
                            {index + 1}
                          </span>
                        </motion.div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground whitespace-nowrap">
                          Week {week}
                        </div>
                      </div>

                      {/* Content Card */}
                      <motion.div
                        className="flex-1 max-w-md"
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <Card
                          className="p-6 backdrop-blur-xl border border-border/30 relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.3) 100%)`,
                            borderColor: `${course.neonColor}30`,
                            boxShadow: `0 8px 32px -8px ${course.neonColor}20`,
                          }}
                        >
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{
                                  background: `linear-gradient(135deg, ${course.neonColor}30, ${course.neonColor}15)`,
                                }}
                              >
                                <Lightbulb className="w-5 h-5" style={{ color: course.neonColor }} />
                              </div>
                              <h3 className="text-xl font-bold">{feature}</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              Master this concept through hands-on projects and interactive challenges.
                            </p>
                          </div>
                        </Card>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Project Showcase - Interactive Gallery */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Projects You'll Build
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real projects that kids love to show off
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedProject(selectedProject === index ? null : index);
                    play("click");
                  }}
                >
                  <Card
                    className="p-8 h-full backdrop-blur-xl border border-border/30 relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${course.neonColor}12 0%, transparent 100%)`,
                      borderColor: `${course.neonColor}30`,
                    }}
                  >
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${course.neonColor}20 0%, transparent 70%)`,
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${course.neonColor}30, ${course.neonColor}15)`,
                          }}
                        >
                          {index === 0 ? "🎨" : index === 1 ? "🚀" : "⭐"}
                        </div>
                        <span className="text-sm font-mono text-muted-foreground">
                          Week {project.week}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                      
                      <AnimatePresence>
                        {selectedProject === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-border/20"
                          >
                            <p className="text-sm text-muted-foreground">
                              This project teaches core concepts through hands-on building. You'll learn by doing!
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Kit Contents - Premium Showcase */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 flex items-center justify-center gap-3">
                <Gift className="w-10 h-10" style={{ color: course.neonColor }} />
                What's Included
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need in one premium kit
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {kitItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                  className="cursor-pointer"
                >
                  <Card
                    className="p-6 text-center backdrop-blur-xl border border-border/30 relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${course.neonColor}15 0%, transparent 100%)`,
                      borderColor: `${course.neonColor}30`,
                    }}
                  >
                    <motion.div
                      className="text-5xl mb-3"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut",
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <p className="text-sm font-semibold">{item.name}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Outcomes - Visual Grid */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Skills You'll Master
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real skills that prepare you for the future
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.learningOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: index % 2 === 0 ? -5 : 5 }}
                >
                  <Card
                    className="p-6 backdrop-blur-xl border border-border/30 relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.3) 100%)`,
                      borderColor: `${course.neonColor}30`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${course.neonColor}30, ${course.neonColor}15)`,
                        }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <CheckCircle className="w-6 h-6" style={{ color: course.neonColor }} />
                      </motion.div>
                      <p className="text-lg leading-relaxed flex-1">{outcome}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Testimonials */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                What Students Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real feedback from kids who loved this course
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card
                    className="p-8 backdrop-blur-xl border border-border/30 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${course.neonColor}10 0%, transparent 100%)`,
                      borderColor: `${course.neonColor}30`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed mb-4 italic">"{testimonial.text}"</p>
                    <p className="font-semibold text-foreground">— {testimonial.name}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive FAQ */}
        <section className="relative py-20">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything parents and kids want to know
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="backdrop-blur-xl border border-border/30 overflow-hidden cursor-pointer"
                    style={{
                      borderColor: `${course.neonColor}30`,
                    }}
                    onClick={() => {
                      setActiveFAQ(activeFAQ === index ? null : index);
                      play("click");
                    }}
                  >
                    <motion.div
                      className="p-6 flex items-center justify-between"
                      whileHover={{ x: 5 }}
                    >
                      <h3 className="text-lg font-semibold pr-8">{faq.q}</h3>
                      <motion.div
                        animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </motion.div>
                    </motion.div>
                    <AnimatePresence>
                      {activeFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="relative py-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card
                className="p-16 text-center backdrop-blur-xl border border-border/30 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${course.neonColor}15 0%, ${course.neonColor}08 50%, transparent 100%)`,
                  borderColor: `${course.neonColor}50`,
                  boxShadow: `0 20px 60px -20px ${course.neonColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at center, ${course.neonColor}20 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="inline-block mb-6"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Rocket className="w-16 h-16 mx-auto" style={{ color: course.neonColor }} />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                    Ready to Light Up Your Mind?
                  </h2>
                  <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join hundreds of young creators building the future. Enroll now and get your premium kit delivered to your door.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="text-lg px-10 py-7 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                        boxShadow: `0 8px 32px -8px ${course.neonColor}50`,
                      }}
                      onClick={() => play("click")}
                    >
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Enroll in {course.name}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-10 py-7 rounded-xl font-semibold border-2 hover:scale-105 transition-transform duration-300"
                      style={{
                        borderColor: `${course.neonColor}50`,
                      }}
                      onClick={() => play("hover")}
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
