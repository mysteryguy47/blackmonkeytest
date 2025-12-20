"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { coursesData, type Course } from "@shared/schema";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Bot,
  Wifi,
  Network,
  Plane,
  Play,
  Star,
  Trophy,
  Award,
  BookOpen,
  Rocket,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Gift,
  Box,
  Video,
  Code,
  Target,
  Heart,
  TrendingUp,
  Shield,
  GraduationCap,
  Lightbulb,
  Puzzle,
} from "lucide-react";
import DarkVeil from "@/components/DarkVeil";
import Image from "next/image";
import { useSound } from "@/hooks/use-sound";

const iconMap: Record<string, any> = {
  Zap,
  Bot,
  Wifi,
  Network,
  Plane,
};

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
  chakra: [
    { title: "Line Following Robot", description: "Build a robot that follows paths", week: 3 },
    { title: "Obstacle Avoidance Bot", description: "Create a smart navigation system", week: 5 },
    { title: "Sumo Robot", description: "Compete in robot battles", week: 7 },
  ],
  yantra: [
    { title: "Smart Home Hub", description: "Control lights and devices remotely", week: 4 },
    { title: "Weather Station", description: "Monitor temperature and humidity", week: 7 },
    { title: "Security System", description: "Motion detection and alerts", week: 10 },
  ],
  ananta: [
    { title: "AI Security Camera", description: "Face recognition system", week: 5 },
    { title: "Smart Garden", description: "Automated plant care with ML", week: 8 },
    { title: "Predictive Maintenance", description: "IoT system with anomaly detection", week: 11 },
  ],
  garuda: [
    { title: "Aerial Photography Drone", description: "Capture stunning aerial shots", week: 3 },
    { title: "Search & Rescue Mission", description: "Autonomous search patterns", week: 5 },
    { title: "Racing Drone", description: "High-speed FPV racing", week: 7 },
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
  chakra: [
    { name: "Arduino Board", icon: "🤖" },
    { name: "Motors & Wheels", icon: "⚙️" },
    { name: "Ultrasonic Sensor", icon: "📡" },
    { name: "Chassis Kit", icon: "🔧" },
    { name: "Breadboard & Wires", icon: "🔌" },
  ],
  yantra: [
    { name: "ESP32 Module", icon: "📶" },
    { name: "Sensors Pack", icon: "🌡️" },
    { name: "OLED Display", icon: "📺" },
    { name: "Jumper Wires", icon: "🔌" },
    { name: "Breadboard", icon: "🔧" },
  ],
  ananta: [
    { name: "Raspberry Pi", icon: "🍓" },
    { name: "Camera Module", icon: "📷" },
    { name: "AI Accelerator", icon: "🧠" },
    { name: "Advanced Sensors", icon: "🔬" },
    { name: "Power Supply", icon: "⚡" },
  ],
  garuda: [
    { name: "Drone Frame", icon: "🚁" },
    { name: "Flight Controller", icon: "🎮" },
    { name: "Motors & Props", icon: "🌀" },
    { name: "FPV Camera", icon: "📹" },
    { name: "GPS Module", icon: "📍" },
  ],
};

const courseTestimonials = {
  shunya: [
    { name: "Aarav, Age 6", text: "I made a glowing robot card for my mom! She loved it! ⭐", rating: 5 },
    { name: "Maya, Age 7", text: "Best class ever! I learned how electricity works!", rating: 5 },
  ],
  chakra: [
    { name: "Rohan, Age 10", text: "My robot can follow lines and avoid obstacles. So cool! 🤖", rating: 5 },
    { name: "Isha, Age 9", text: "I built my first robot and it actually works!", rating: 5 },
  ],
  yantra: [
    { name: "Arjun, Age 13", text: "I made a smart home system. My parents are impressed!", rating: 5 },
    { name: "Priya, Age 12", text: "IoT is amazing! I can control things from my phone!", rating: 5 },
  ],
  ananta: [
    { name: "Karan, Age 15", text: "AI integration blew my mind. This is the future!", rating: 5 },
    { name: "Ananya, Age 14", text: "Most advanced course I've taken. Worth every moment!", rating: 5 },
  ],
  garuda: [
    { name: "Vikram, Age 16", text: "Flying my own drone is incredible! Best experience!", rating: 5 },
    { name: "Sneha, Age 15", text: "I captured amazing aerial photos. This course is awesome!", rating: 5 },
  ],
};

const courseFAQs = {
  shunya: [
    { q: "Is this course safe for 4-year-olds?", a: "Absolutely! All materials are child-safe, and we have strict safety protocols. Parents are welcome to join the first session." },
    { q: "What if my child has no prior experience?", a: "Perfect! Shunya is designed as the starting point. We teach everything from scratch in a fun, engaging way." },
    { q: "Do we need to buy anything extra?", a: "No! Everything is included in the course kit. Just bring curiosity and creativity!" },
  ],
  chakra: [
    { q: "Will my child learn real programming?", a: "Yes! We use block-based coding (Scratch/Blockly) that teaches real programming concepts in a visual, kid-friendly way." },
    { q: "How complex are the robots?", a: "We start simple and build up. By the end, students build fully functional autonomous robots!" },
  ],
  yantra: [
    { q: "Do students need coding experience?", a: "Basic programming helps but isn't required. We teach everything step-by-step." },
    { q: "What can students build?", a: "Smart home systems, weather stations, security systems, and more! The possibilities are endless." },
  ],
  ananta: [
    { q: "Is this course suitable for beginners?", a: "We recommend completing Yantra first, or having strong programming skills. This is our most advanced course." },
    { q: "What programming languages are used?", a: "Python for ML, C++ for microcontrollers, and JavaScript for web interfaces." },
  ],
  garuda: [
    { q: "Is flying a drone safe for kids?", a: "Yes! We start with simulators, then supervised flights. Safety is our top priority." },
    { q: "Do students get to keep the drone?", a: "Yes! The drone kit is included and students take it home after the course." },
  ],
};

export default function CoursePage({ params }: any) {
  const courseId = params.id;
  const course = coursesData.find((c) => c.id === courseId);
  const router = useRouter();
  const { play } = useSound();
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    // Track from when hero starts entering viewport until hero completely exits viewport
    // This gives us more scroll distance to work with
    offset: ["start start", "end end"]
  });
  // Fade starts much later and completes over longer scroll distance
  // Only starts fading after 40% scroll, completes at 100%
  // This ensures the hero stays visible for most of its scroll distance
  const opacity = useTransform(scrollYProgress, [0.4, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.4, 1], [1, 0.95]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  const handleBackToCourses = () => {
    router.push("/");
    setTimeout(() => {
      const coursesSection = document.getElementById("courses");
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <Link href="/">
            <Button data-testid="button-back-home">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[course.icon];
  const projects = courseProjects[course.id as keyof typeof courseProjects] || [];
  const kitItems = kitContents[course.id as keyof typeof kitContents] || [];
  const testimonials = courseTestimonials[course.id as keyof typeof courseTestimonials] || [];
  const faqs = courseFAQs[course.id as keyof typeof courseFAQs] || [];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div
        className="glass-container"
        style={{ width: "100vw", height: "100vh", position: "absolute" }}
      >
        <DarkVeil />
      </div>

      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-[0.06]"
          style={{
            background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
            top: "-20%",
            right: "-10%",
          }}
          animate={{
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-[0.04]"
          style={{
            background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
            bottom: "-15%",
            left: "-10%",
          }}
          animate={{
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <main className="relative z-10">
        {/* Premium Hero Section with Parallax */}
        <motion.div
          ref={heroRef}
          style={{ opacity, scale }}
          className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-16"
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                className="backdrop-blur-sm border border-border/30 hover:border-border/60 transition-all duration-200"
                onClick={handleBackToCourses}
                data-testid="button-back-home"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Course Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border border-border/30 mb-6">
                  <span className="text-xs font-mono text-muted-foreground">{course.code}</span>
                </div>

                <h1
                  className="font-display font-bold mb-4 leading-tight"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    lineHeight: "1.1",
                    background: `linear-gradient(to bottom right, ${course.neonColor}, ${course.neonColor}cc)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {course.name}
                </h1>

                <p
                  className="text-xl md:text-2xl font-medium mb-6 leading-relaxed"
                  style={{ color: `${course.neonColor}dd` }}
                >
                  {course.tagline}
                </p>

                <p
                  className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl"
                >
                  {course.fullDescription}
                </p>

                {/* Quick Stats - Minimal */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { icon: Users, label: "Age", value: course.ageGroup },
                    { icon: Clock, label: "Duration", value: course.duration },
                    { icon: Trophy, label: "Projects", value: `${projects.length}+` },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/20 bg-background/30"
                    >
                      <stat.icon className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-sm font-medium">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/payment/${course.id}`}>
                    <Button
                      size="lg"
                      className="text-base px-8 py-6 rounded-lg font-medium transition-all duration-200"
                      style={{
                        background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                        boxShadow: `0 4px 20px -4px ${course.neonColor}40`,
                      }}
                      onClick={() => play("click")}
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Enroll Now
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-6 rounded-lg font-medium border border-border/40 hover:border-border/80 transition-all duration-200"
                    onClick={() => play("hover")}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Watch Preview
                  </Button>
                </div>
              </motion.div>

              {/* Right: Product Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {courseImageMap[course.id] && (
                  <div className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0">
                      <Image
                        src={courseImageMap[course.id]}
                        alt={`${course.name} Product Kit`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        quality={100}
                        className="object-contain"
                        priority
                      />
                    </div>
                    {/* Subtle border */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none border border-border/20"
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Curriculum Timeline - Premium */}
        <section className="relative py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/20 bg-background/30 mb-4">
                <Target className="w-3 h-3" style={{ color: course.neonColor }} />
                <span className="text-xs font-mono text-muted-foreground">Curriculum</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Your Learning Journey
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Step-by-step progression from beginner to master
              </p>
            </motion.div>

            <div className="space-y-6">
              {course.features.map((feature, index) => {
                const week = Math.ceil(((index + 1) / course.features.length) * parseInt(course.duration));
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="p-6 border border-border/20 bg-background/30 hover:border-border/40 hover:bg-background/40 transition-all duration-300 group relative overflow-hidden">
                      {/* Premium accent line */}
                      <div 
                        className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${course.neonColor}60, transparent)`,
                        }}
                      />
                      
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center border-2 bg-background/60 group-hover:bg-background/80 transition-all duration-300 shadow-lg" style={{ borderColor: course.neonColor, boxShadow: `0 4px 20px -4px ${course.neonColor}40` }}>
                            <span className="text-xl font-bold" style={{ color: course.neonColor }}>
                              {index + 1}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="text-lg font-semibold group-hover:text-foreground transition-colors">{feature}</h3>
                            <div className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-border/30 bg-background/50 group-hover:bg-background/70 transition-all duration-300" style={{ borderColor: `${course.neonColor}40`, backgroundColor: `${course.neonColor}10` }}>
                              <span className="text-xs font-bold font-mono" style={{ color: course.neonColor }}>
                                Week {week}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Master this concept through hands-on projects and interactive challenges.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Project Showcase - Premium */}
        <section className="relative py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/20 bg-background/30 mb-4">
                <Code className="w-3 h-3" style={{ color: course.neonColor }} />
                <span className="text-xs font-mono text-muted-foreground">Projects</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Projects You'll Build
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Real projects that kids love to show off
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedProject(selectedProject === index ? null : index);
                    play("click");
                  }}
                >
                  <Card className="p-6 h-full border-2 border-border/30 bg-gradient-to-br from-background/40 via-background/30 to-background/40 hover:border-border/50 hover:from-background/50 hover:via-background/40 hover:to-background/50 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm">
                    {/* Premium accent on hover */}
                    <div 
                      className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${course.neonColor}80, transparent)`,
                        boxShadow: `0 0 15px ${course.neonColor}40`,
                      }}
                    />
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="text-xs font-bold font-mono px-3 py-1.5 rounded-lg border backdrop-blur-sm"
                        style={{
                          color: course.neonColor,
                          borderColor: `${course.neonColor}40`,
                          backgroundColor: `${course.neonColor}15`,
                          boxShadow: `0 2px 10px -2px ${course.neonColor}30`,
                        }}
                      >
                        Week {project.week}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-foreground transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    
                    <AnimatePresence>
                      {selectedProject === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-border/20"
                        >
                          <p className="text-xs text-muted-foreground">
                            This project teaches core concepts through hands-on building. You'll learn by doing!
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Kit Contents - Premium */}
        <section className="relative py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/20 bg-background/30 mb-4">
                <Gift className="w-3 h-3" style={{ color: course.neonColor }} />
                <span className="text-xs font-mono text-muted-foreground">Kit Contents</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                What's Included
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need in one premium kit
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {kitItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="p-6 text-center border-2 border-border/30 bg-gradient-to-br from-background/40 to-background/30 hover:border-border/50 hover:from-background/50 hover:to-background/40 transition-all duration-300 group backdrop-blur-sm relative overflow-hidden">
                    {/* Subtle glow on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${course.neonColor}10, transparent 70%)`,
                      }}
                    />
                    <div className="relative z-10">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                      <p className="text-xs font-semibold">{item.name}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Outcomes - Premium */}
        <section className="relative py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/20 bg-background/30 mb-4">
                <Trophy className="w-3 h-3" style={{ color: course.neonColor }} />
                <span className="text-xs font-mono text-muted-foreground">Outcomes</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Skills You'll Master
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Real skills that prepare you for the future
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.learningOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <Card className="p-6 border-2 border-border/30 bg-gradient-to-br from-background/40 via-background/30 to-background/40 hover:border-border/50 hover:from-background/50 hover:via-background/40 hover:to-background/50 transition-all duration-300 group backdrop-blur-sm relative overflow-hidden">
                    {/* Premium accent line */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(180deg, transparent, ${course.neonColor}80, transparent)`,
                        boxShadow: `0 0 15px ${course.neonColor}40`,
                      }}
                    />
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border-2 bg-background/60 group-hover:bg-background/80 transition-all duration-300 shadow-lg" style={{ borderColor: course.neonColor, boxShadow: `0 4px 15px -4px ${course.neonColor}40` }}>
                        <CheckCircle className="w-5 h-5" style={{ color: course.neonColor }} />
                      </div>
                      <p className="text-sm leading-relaxed flex-1 pt-0.5">{outcome}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Testimonials - Premium */}
        <section className="relative py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/20 bg-background/30 mb-4">
                <Star className="w-3 h-3" style={{ color: course.neonColor }} />
                <span className="text-xs font-mono text-muted-foreground">Testimonials</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                What Students Say
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Real feedback from kids who loved this course
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-7 border-2 border-border/30 bg-gradient-to-br from-background/40 via-background/30 to-background/40 hover:border-border/50 hover:from-background/50 hover:via-background/40 hover:to-background/50 transition-all duration-300 group backdrop-blur-sm relative overflow-hidden">
                    {/* Premium accent corner */}
                    <div 
                      className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at top right, ${course.neonColor}15, transparent 70%)`,
                      }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-1.5 mb-5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                            style={{ filter: 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.4))' }}
                          />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed mb-5 italic text-muted-foreground">"{testimonial.text}"</p>
                      <div className="pt-5 border-t border-border/30">
                        <p className="text-sm font-semibold">— {testimonial.name}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ - Premium */}
        <section className="relative py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/20 bg-background/30 mb-4">
                <Puzzle className="w-3 h-3" style={{ color: course.neonColor }} />
                <span className="text-xs font-mono text-muted-foreground">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Everything parents and kids want to know
              </p>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card
                    className="border-2 border-border/30 bg-gradient-to-br from-background/40 to-background/30 overflow-hidden cursor-pointer hover:border-border/50 hover:from-background/50 hover:to-background/40 transition-all duration-300 group backdrop-blur-sm relative"
                    onClick={() => {
                      setActiveFAQ(activeFAQ === index ? null : index);
                      play("click");
                    }}
                  >
                    {/* Premium accent when active */}
                    {activeFAQ === index && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{
                          background: `linear-gradient(180deg, ${course.neonColor}, ${course.neonColor}dd)`,
                          boxShadow: `0 0 15px ${course.neonColor}50`,
                        }}
                      />
                    )}
                    <div className="p-6 flex items-center justify-between">
                      <h3 className="text-base font-semibold pr-8 group-hover:text-foreground transition-colors">{faq.q}</h3>
                      <motion.div
                        animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown 
                          className="w-5 h-5 transition-colors" 
                          style={{ 
                            color: activeFAQ === index ? course.neonColor : undefined,
                            filter: activeFAQ === index ? `drop-shadow(0 0 6px ${course.neonColor}50)` : undefined
                          }} 
                        />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {activeFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0">
                            <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
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

        {/* CTA Section - Ultra Premium */}
        <section className="relative py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                {/* Premium gradient background layers */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl opacity-40 blur-3xl"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${course.neonColor}30, transparent 60%)`,
                  }}
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-3xl opacity-20 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at 70% 70%, ${course.neonColor}25, transparent 60%)`,
                  }}
                  animate={{
                    opacity: [0.15, 0.3, 0.15],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                
                <Card className="relative p-12 md:p-20 text-center border-2 border-border/40 bg-gradient-to-br from-background/60 via-background/40 to-background/60 backdrop-blur-xl overflow-hidden">
                  {/* Premium accent lines */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px opacity-60"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${course.neonColor}80, transparent)`,
                      boxShadow: `0 0 20px ${course.neonColor}40`,
                    }}
                  />
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px opacity-60"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${course.neonColor}80, transparent)`,
                      boxShadow: `0 0 20px ${course.neonColor}40`,
                    }}
                  />
                  
                  {/* Subtle pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, ${course.neonColor} 1px, transparent 0)`,
                      backgroundSize: '40px 40px'
                    }}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative z-10"
                  >
                    <motion.div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-background/60 backdrop-blur-sm mb-8"
                      style={{
                        borderColor: `${course.neonColor}40`,
                        boxShadow: `0 4px 20px -4px ${course.neonColor}30`,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: course.neonColor }} />
                      <span className="text-xs font-mono font-semibold" style={{ color: course.neonColor }}>Start Your Journey</span>
                    </motion.div>
                    
                    <h2 
                      className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                      style={{
                        background: `linear-gradient(to bottom right, ${course.neonColor}, ${course.neonColor}dd, ${course.neonColor}aa, rgb(255, 255, 255))`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: `0 0 40px ${course.neonColor}20`,
                      }}
                    >
                      Ready to Light Up Your Mind?
                    </h2>
                    
                    <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                      Join hundreds of young creators building the future. Enroll now and get your premium kit delivered to your door.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href={`/payment/${course.id}`}>
                        <Button
                          size="lg"
                          className="text-base px-12 py-8 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
                          style={{
                            background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                            boxShadow: `0 12px 40px -8px ${course.neonColor}60, 0 0 0 1px ${course.neonColor}30`,
                          }}
                          onClick={() => play("click")}
                        >
                          <GraduationCap className="w-5 h-5 mr-2" />
                          Enroll in {course.name}
                        </Button>
                      </Link>
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-base px-12 py-8 rounded-xl font-semibold border-2 border-border/50 hover:border-border/80 hover:bg-background/60 transition-all duration-300 backdrop-blur-sm"
                        style={{
                          borderColor: `${course.neonColor}40`,
                        }}
                        onClick={() => play("hover")}
                      >
                        <Heart className="w-5 h-5 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </motion.div>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
