"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  ChevronUp,
  Gift,
  Video,
  Heart,
  GraduationCap,
  Lightbulb,
  Shield,
  Package,
  MessageCircle,
  ArrowRight,
  Home,
  Phone,
  Mail,
  Bot,
  Wifi,
  Network,
} from "lucide-react";
import DarkVeil from "@/components/DarkVeil";
import Image from "next/image";
import { useSound } from "@/hooks/use-sound";
import StarBorder from "@/components/StarBorder";
import { StructuredData } from "@/components/StructuredData";

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
    { 
      title: "Glowing Paper Art", 
      description: "Create beautiful LED-lit artwork", 
      week: 2,
      parentOutcome: "Builds confidence in electronics",
      activityType: "Hands-on build"
    },
    { 
      title: "Interactive Greeting Card", 
      description: "Build a card that lights up when opened", 
      week: 4,
      parentOutcome: "Encourages creativity and expression",
      activityType: "Guided activity"
    },
    { 
      title: "Paper Circuit Robot", 
      description: "Design a robot with glowing eyes", 
      week: 6,
      parentOutcome: "Develops problem-solving skills",
      activityType: "Fun challenge"
    },
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
    { name: "Aarav, Age 6", text: "I made a glowing robot card for my mom! She loved it! ⭐", rating: 5, isParent: false },
    { name: "Maya, Age 7", text: "Best class ever! I learned how electricity works!", rating: 5, isParent: false },
    { name: "Priya's Mom", text: "My child now explains electricity to us confidently. Shunya was the perfect start.", rating: 5, isParent: true, childAge: "Age 5" },
  ],
};

const courseFAQs = {
  shunya: [
    { q: "Is this course safe for 4-year-olds?", a: "Absolutely! All materials are child-safe, and we have strict safety protocols. Parents are welcome to join the first session." },
    { q: "What if my child has no prior experience?", a: "Perfect! Shunya is designed as the starting point. We teach everything from scratch in a fun, engaging way." },
    { q: "Do we need to buy anything extra?", a: "No! Everything is included in the course kit. Just bring curiosity and creativity!" },
    { q: "Is supervision required?", a: "For children 4-5 years, we recommend parent supervision during the first few sessions. Older children (6-7 years) can work independently with our guided instructions." },
    { q: "What if my child misses a class?", a: "All sessions are recorded and available for replay. Your child can catch up at their own pace, and our instructors are available for support." },
    { q: "Is there a refund policy?", a: "Yes! We offer a 100% satisfaction guarantee. If you're not happy within the first week, we'll provide a full refund." },
    { q: "What language is it taught in?", a: "The course is taught in English with Hindi support available. All materials are bilingual to ensure clarity." },
    { q: "What device is required?", a: "A tablet or laptop with internet connection. We recommend a screen size of at least 10 inches for the best experience." },
  ],
};

export default function ShunyaPage() {
  const course = coursesData.find((c) => c.id === "shunya");
  const router = useRouter();
  const { play } = useSound();
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([0]));
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://blackmonkey.in";
  const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Course Schema Markup */}
      <StructuredData
        type="Course"
        data={{
          name: course.name,
          description: course.fullDescription,
          courseCode: course.code,
          educationalLevel: course.ageGroup,
          duration: course.duration,
        }}
      />
      
      {/* FAQPage Schema Markup */}
      <StructuredData
        type="FAQPage"
        data={{
          faqs: faqs,
        }}
      />
      
      {/* AggregateRating Schema Markup */}
      <StructuredData
        type="AggregateRating"
        data={{
          ratingValue: "4.9",
          reviewCount: testimonials.length.toString(),
        }}
      />
      
      {/* BreadcrumbList Schema Markup */}
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: cleanBaseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Courses",
              item: `${cleanBaseUrl}/courses`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: course.name,
              item: `${cleanBaseUrl}/courses/${course.id}`,
            },
          ],
        }}
      />
      
      {/* Individual Review Schema for Testimonials */}
      {testimonials.map((testimonial, index) => (
        <StructuredData
          key={index}
          type="Review"
          data={{
            authorName: testimonial.name,
            reviewBody: testimonial.text,
            ratingValue: testimonial.rating.toString(),
            courseName: course.name,
            datePublished: new Date().toISOString(),
            itemReviewed: {
              "@type": "Course",
              name: course.name,
            },
          }}
        />
      ))}
      
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
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                  className="relative backdrop-blur-xl border border-border/30 hover:border-border/60 transition-all duration-300 rounded-xl px-4 py-2 hover:bg-slate-800/50 overflow-hidden group"
                onClick={handleBackToCourses}
              >
                  {/* Subtle shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="inline-flex items-center"
                    whileHover={{ x: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 relative z-10" />
                  </motion.div>
                  <span className="relative z-10">Back to Courses</span>
              </Button>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Course Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: course.neonColor }} />
                  <span className="text-sm font-medium font-jetbrains">{course.code}</span>
                </motion.div>

                <motion.h1
                  className="font-display font-extrabold mb-4 leading-tight bg-clip-text text-transparent"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    lineHeight: "1.1",
                    backgroundImage: 'linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)',
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
                  className="font-satoshi text-xl md:text-2xl text-foreground leading-relaxed mb-4 font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {course.tagline}
                </motion.p>

                {/* Safety Reassurance */}
                <motion.div
                  className="flex items-center gap-2 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                >
                  <Shield className="w-5 h-5 text-green-400" />
                  <p className="text-sm text-muted-foreground font-medium">
                    100% safe · No soldering · Designed for tiny hands
                  </p>
                </motion.div>

                <motion.p
                  className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {course.fullDescription}
                </motion.p>

                {/* Premium Pill Cards - Age / Duration / Projects */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {[
                    { icon: Users, label: "Age Group", value: course.ageGroup },
                    { icon: Clock, label: "Duration", value: course.duration },
                    { icon: Trophy, label: "Projects", value: `${projects.length}+` },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl backdrop-blur-xl border"
                      style={{
                        background: `rgba(15, 23, 42, 0.6)`,
                        borderColor: `${course.neonColor}30`,
                      }}
                      whileHover={{ scale: 1.02, borderColor: `${course.neonColor}60` }}
                      transition={{ duration: 0.2 }}
                    >
                      <stat.icon className="w-4 h-4" style={{ color: course.neonColor }} />
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Premium Minimal CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {/* Watch Preview - Premium Border */}
                  <motion.button
                    className="flex items-center justify-center gap-2.5 rounded-xl font-semibold text-base backdrop-blur-xl border-2 transition-all duration-300"
                    style={{
                      padding: '24px 32px',
                      minHeight: '56px',
                      borderColor: `${course.neonColor}50`,
                      background: 'transparent',
                      color: 'white',
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: `${course.neonColor}80`,
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => play("hover")}
                  >
                    <Video className="w-4 h-4" />
                    <span>Watch Preview</span>
                  </motion.button>
                  
                  {/* Enroll Now - StarBorder with Premium Border */}
                  <Link href={`/payment/${course.id}`} onClick={() => play("click")}>
                    <StarBorder
                      as="div"
                      color={course.neonColor}
                      speed="4s"
                      thickness={2}
                      className="cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        minHeight: '56px',
                      }}
                      contentClassName="text-base font-semibold !px-8 !py-6 !bg-transparent !text-white !border-2 !border-transparent hover:!text-white transition-all duration-300 !shadow-none !flex !items-center !justify-center !gap-2.5 backdrop-blur-md rounded-xl"
                      onMouseEnter={() => play("hover")}
                    >
                      <Rocket className="w-4 h-4" />
                      <span>Enroll Now</span>
                    </StarBorder>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right: Premium Product Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {courseImageMap[course.id] && (
                  <motion.div
                    className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden group"
                    whileHover={{ scale: 1.03, y: -5 }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      y: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      scale: {
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                  >
                    {/* Premium backdrop with gradient */}
                    <div 
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: `linear-gradient(135deg, ${course.neonColor}15 0%, transparent 50%, ${course.neonColor}10 100%)`,
                      }}
                    />
                    
                    {/* Main image container */}
                    <motion.div 
                      className="absolute inset-0 z-10"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={courseImageMap[course.id]}
                        alt={`${course.name} Product Kit`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        quality={100}
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                    
                    {/* Animated glow orbs */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-0"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${course.neonColor}30 0%, transparent 50%)`,
                      }}
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                        x: [0, 20, 0],
                        y: [0, -20, 0],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-0"
                      style={{
                        background: `radial-gradient(circle at 70% 70%, ${course.neonColor}25 0%, transparent 50%)`,
                      }}
                      animate={{
                        opacity: [0.2, 0.35, 0.2],
                        scale: [1, 1.15, 1],
                        x: [0, -15, 0],
                        y: [0, 15, 0],
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                    
                    {/* Premium border glow with hover effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl pointer-events-none z-20"
                      style={{
                        boxShadow: `inset 0 0 40px ${course.neonColor}20, 0 0 60px ${course.neonColor}15`,
                      }}
                      animate={{
                        boxShadow: [
                          `inset 0 0 40px ${course.neonColor}20, 0 0 60px ${course.neonColor}15`,
                          `inset 0 0 60px ${course.neonColor}30, 0 0 80px ${course.neonColor}25`,
                          `inset 0 0 40px ${course.neonColor}20, 0 0 60px ${course.neonColor}15`,
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, transparent 0%, ${course.neonColor}10 50%, transparent 100%)`,
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Course Snapshot Card - Quick Decision Zone */}
        <section className="relative py-12 -mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 backdrop-blur-xl border-2 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%)`,
                  borderColor: `${course.neonColor}40`,
                  boxShadow: `0 20px 60px -20px ${course.neonColor}30`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 via-transparent to-neon-cyan/5" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-center">Course Snapshot</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { icon: Users, label: "Age Group", value: course.ageGroup, color: "text-blue-400" },
                      { icon: Clock, label: "Duration", value: course.duration, color: "text-purple-400" },
                      { icon: Trophy, label: "Projects", value: `${projects.length}+`, color: "text-yellow-400" },
                      { icon: Video, label: "Mode", value: "Live + Recorded", color: "text-pink-400" },
                      { icon: Package, label: "Kit", value: "Home Delivery", color: "text-green-400" },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="text-center p-4 rounded-xl backdrop-blur-sm border border-border/20"
                        style={{
                          background: `linear-gradient(135deg, ${course.neonColor}10, transparent)`,
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                        <p className="text-xs text-muted-foreground mb-1 font-medium">{item.label}</p>
                        <p className="text-sm font-bold text-foreground">{item.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Curriculum Timeline - Interactive */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                Your Learning Journey
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Step-by-step progression from Week 1 to Week 8
              </p>
            </motion.div>

            {/* Premium Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 max-w-5xl mx-auto"
            >
              <div className="relative h-3 bg-slate-800/30 rounded-full overflow-hidden border border-slate-700/30">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                style={{
                    background: `linear-gradient(to right, ${course.neonColor}, ${course.neonColor}dd)`,
                  }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-3">
                  <span className="text-xs font-jetbrains text-muted-foreground font-medium">Week 1</span>
                  <span className="text-xs font-jetbrains text-muted-foreground font-medium">Week 8</span>
                </div>
              </div>
            </motion.div>

            <div className="space-y-3 max-w-5xl mx-auto">
                {course.features.map((feature, index) => {
                  const week = Math.ceil(((index + 1) / course.features.length) * parseInt(course.duration));
                const isExpanded = expandedWeeks.has(index);
                const activityTypes = ["Hands-on build", "Guided activity", "Fun challenge"];
                const activityType = activityTypes[index % activityTypes.length];
                
                  return (
                    <motion.div
                      key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <Card
                      className="backdrop-blur-xl border overflow-hidden cursor-pointer transition-all duration-300"
                          style={{
                        background: `rgba(15, 23, 42, 0.6)`,
                        borderColor: isExpanded ? `${course.neonColor}50` : `${course.neonColor}30`,
                      }}
                      onClick={() => {
                        const newExpanded = new Set(expandedWeeks);
                        if (isExpanded) {
                          newExpanded.delete(index);
                        } else {
                          newExpanded.add(index);
                        }
                        setExpandedWeeks(newExpanded);
                        play("click");
                      }}
                    >
                      <motion.div
                        className="p-5 flex items-center justify-between"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                              background: `linear-gradient(135deg, ${course.neonColor}25, ${course.neonColor}10)`,
                              border: `1px solid ${course.neonColor}40`,
                                }}
                              >
                            <span className="text-base font-bold font-jetbrains" style={{ color: course.neonColor }}>
                              {week}
                            </span>
                              </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-base font-semibold">{feature}</h3>
                              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800/50 text-muted-foreground font-medium">
                                {activityType}
                              </span>
                            </div>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.p
                                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                  animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-sm text-muted-foreground leading-relaxed"
                                >
                              Master this concept through hands-on projects and interactive challenges.
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                      </motion.div>
                    </Card>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </section>

        {/* Project Showcase - Premium Cards */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                Projects You'll Build
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Real projects that kids love to show off
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card
                    className="p-6 h-full backdrop-blur-xl border relative overflow-visible group"
                    style={{
                      background: `rgba(15, 23, 42, 0.7)`,
                      borderColor: `${course.neonColor}30`,
                    }}
                  >
                    {/* Hover glow - outside card */}
                    <motion.div
                      className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10"
                      style={{
                        background: `linear-gradient(135deg, ${course.neonColor}30, ${course.neonColor}10)`,
                        filter: 'blur(8px)',
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${course.neonColor}30, ${course.neonColor}15)`,
                            border: `1px solid ${course.neonColor}40`,
                          }}
                        >
                          <Zap className="w-6 h-6" style={{ color: course.neonColor }} />
                        </div>
                        <span className="text-xs font-jetbrains text-muted-foreground bg-slate-800/50 px-2 py-1 rounded-md font-medium">
                          Week {project.week}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                      
                      {/* Parent Outcome */}
                      <div className="pt-3 border-t border-border/20">
                        <p className="text-xs font-semibold text-foreground mb-1">Parent Benefit:</p>
                        <p className="text-xs text-muted-foreground italic">
                          "{project.parentOutcome}"
                        </p>
                      </div>
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
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 flex items-center justify-center gap-3">
                <Gift className="w-8 h-8" style={{ color: course.neonColor }} />
                What's Included
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
                Everything you need in one premium kit
              </p>
              
              {/* Safety Assurance */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto p-6 rounded-xl backdrop-blur-xl border-2"
                style={{
                  background: `linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.4) 100%)`,
                  borderColor: `${course.neonColor}40`,
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground mb-2">Safety First</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      All components are carefully curated, child-safe, and tested for home use. 
                      No sharp edges, no heat, no soldering required. Meets international safety standards.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/30">
                  {[
                    { icon: Shield, label: "Child-safe materials", color: "text-green-400" },
                    { icon: CheckCircle, label: "International standards", color: "text-blue-400" },
                    { icon: Heart, label: "No sharp edges", color: "text-pink-400" },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center">
                      <item.icon className={`w-5 h-5 mx-auto mb-2 ${item.color}`} />
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {kitItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="cursor-pointer"
                >
                  <Card
                    className="p-5 text-center backdrop-blur-xl border relative overflow-hidden group h-full"
                    style={{
                      background: `rgba(15, 23, 42, 0.6)`,
                      borderColor: `${course.neonColor}30`,
                    }}
                  >
                    <motion.div
                      className="text-4xl mb-3 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                Skills You'll Master
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Real skills that prepare you for the future
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.learningOutcomes.map((outcome, index) => {
                const futureCourseLinks: Record<number, { name: string; color: string }> = {
                  0: { name: "CHAKRA (Robotics)", color: "rgb(34, 211, 238)" },
                  1: { name: "CHAKRA (Robotics)", color: "rgb(34, 211, 238)" },
                  2: { name: "CHAKRA (Robotics)", color: "rgb(34, 211, 238)" },
                  3: { name: "YANTRA (IoT)", color: "rgb(168, 85, 247)" },
                };
                const futureLink = futureCourseLinks[index];
                
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: index % 2 === 0 ? -5 : 5 }}
                >
                  <Card
                      className="p-6 backdrop-blur-xl border-2 relative overflow-hidden group"
                    style={{
                        background: `linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.4) 100%)`,
                        borderColor: `${course.neonColor}40`,
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
                        <div className="flex-1">
                          <p className="text-lg leading-relaxed mb-2">{outcome}</p>
                          {futureLink && (
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30">
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Prepares for{" "}
                                <span className="font-semibold" style={{ color: futureLink.color }}>
                                  {futureLink.name}
                                </span>
                              </span>
                            </div>
                          )}
                        </div>
                    </div>
                  </Card>
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Student & Parent Testimonials */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                What Families Say
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Real feedback from kids and parents who loved this course
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className="p-6 backdrop-blur-xl border relative overflow-hidden h-full flex flex-col"
                    style={{
                      background: `rgba(15, 23, 42, 0.7)`,
                      borderColor: `${course.neonColor}30`,
                    }}
                  >
                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-slate-700 text-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-base leading-relaxed mb-auto italic flex-grow">"{testimonial.text}"</p>
                    
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/20">
                      <div>
                        <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                        {testimonial.isParent && testimonial.childAge && (
                          <p className="text-xs text-muted-foreground mt-0.5">{testimonial.childAge}</p>
                        )}
                      </div>
                      {testimonial.isParent ? (
                        <div className="px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-500/30">
                          <span className="text-xs font-medium text-blue-400">Parent</span>
                        </div>
                      ) : (
                        <div className="px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/30">
                          <span className="text-xs font-medium text-purple-400">Student</span>
                        </div>
                      )}
                    </div>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-muted-foreground">
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

        {/* Parent Peace of Mind Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Parent Peace of Mind
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: "Safe", description: "100% child-safe materials" },
                { icon: Users, label: "Guided", description: "Expert instructor support" },
                { icon: Heart, label: "Age-appropriate", description: "Designed for 4-7 years" },
                { icon: MessageCircle, label: "Support available", description: "24/7 parent assistance" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <Card className="p-5 text-center backdrop-blur-xl border h-full"
                style={{
                      background: `rgba(15, 23, 42, 0.6)`,
                      borderColor: `${course.neonColor}30`,
                }}
              >
                <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="mb-3"
                    >
                      <item.icon className="w-8 h-8 mx-auto" style={{ color: course.neonColor }} />
                    </motion.div>
                    <h3 className="font-semibold text-base mb-1.5">{item.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What Comes Next Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                What Comes Next
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your child's learning journey continues
              </p>
            </motion.div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {[
                { name: "SHUNYA", color: "rgb(168, 85, 247)", icon: Zap, current: true },
                { name: "CHAKRA", color: "rgb(34, 211, 238)", icon: Bot },
                { name: "YANTRA", color: "rgb(168, 85, 247)", icon: Wifi },
              ].map((courseItem, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${
                      courseItem.current ? "ring-4 ring-offset-2 ring-offset-background" : ""
                    }`}
                  style={{
                      background: courseItem.current 
                        ? `linear-gradient(135deg, ${courseItem.color}, ${courseItem.color}dd)`
                        : `linear-gradient(135deg, ${courseItem.color}30, ${courseItem.color}15)`,
                      borderColor: courseItem.color,
                    } as React.CSSProperties & { '--tw-ring-color'?: string }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {(() => {
                      const IconComponent = courseItem.icon;
                      return <IconComponent className="w-8 h-8" style={{ color: courseItem.current ? "#fff" : courseItem.color }} />;
                    })()}
                  </motion.div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: courseItem.color }}>
                      {courseItem.name}
                    </p>
                    {courseItem.current && (
                      <p className="text-xs text-muted-foreground">Current Course</p>
                    )}
                  </div>
                  {idx < 2 && (
                    <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Final CTA Section */}
        <section className="relative py-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card
                className="p-10 md:p-14 text-center backdrop-blur-2xl border relative overflow-hidden"
                style={{
                  background: `rgba(15, 23, 42, 0.8)`,
                  borderColor: `${course.neonColor}40`,
                }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: course.neonColor }} />
                  <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: course.neonColor }} />
                </div>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 leading-tight">
                      <span className="font-satoshi font-light">This isn't just a course.</span>
                      <br />
                      <span className="bg-clip-text text-transparent" style={{
                        backgroundImage: 'linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}>
                        It's the moment your child realizes they can build things.
                      </span>
                  </h2>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="font-satoshi text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-light"
                  >
                    Join hundreds of young creators building the future. Enroll now and get your premium kit delivered to your door.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    {/* Talk to Us - Premium Border */}
                    <motion.button
                      className="flex items-center justify-center gap-2.5 rounded-xl font-semibold text-base backdrop-blur-xl border-2 transition-all duration-300"
                      style={{
                        padding: '24px 32px',
                        minHeight: '56px',
                        borderColor: `${course.neonColor}50`,
                        background: 'transparent',
                        color: 'white',
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: `${course.neonColor}80`,
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => play("hover")}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Talk to Us</span>
                    </motion.button>
                    
                    {/* Enroll Now - StarBorder with Premium Border */}
                    <Link href={`/payment/${course.id}`} onClick={() => play("click")}>
                      <StarBorder
                        as="div"
                        color={course.neonColor}
                        speed="4s"
                        thickness={2}
                        className="cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          minHeight: '56px',
                        }}
                        contentClassName="text-base font-semibold !px-8 !py-6 !bg-transparent !text-white !border-2 !border-transparent hover:!text-white transition-all duration-300 !shadow-none !flex !items-center !justify-center !gap-2.5 backdrop-blur-md rounded-xl"
                        onMouseEnter={() => play("hover")}
                      >
                        <Rocket className="w-4 h-4" />
                        <span>Enroll Now</span>
                      </StarBorder>
                    </Link>
                  </motion.div>
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
