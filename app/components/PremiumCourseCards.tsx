"use client";

import { motion, AnimatePresence } from "framer-motion";
import { coursesData, type Course } from "@shared/schema";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { X, ArrowRight, Clock, Users, CheckCircle, Zap, Bot, Wifi, Network, Plane, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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

// Generate stable particle data - memoized per course
const generateParticleData = (courseId: string) => {
  // Use a seed based on courseId to generate consistent random values
  let seed = courseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  return Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    width: 4 + random() * 6,
    height: 4 + random() * 6,
    left: random() * 100,
    top: random() * 100,
    delay: random() * 2,
    duration: 4 + random() * 2,
  }));
};

// Premium Graphics with Course Color Schemes
const generateCourseGraphics = (course: Course, particleData: ReturnType<typeof generateParticleData>) => {
  const color = course.neonColor;
  
  return {
    // Abstract geometric shapes with course colors
    shapes: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] mix-blend-soft-light" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${course.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`radial-${course.id}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Flowing curves */}
        <path
          d="M0,120 Q250,60 500,120 T1000,120"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.15"
          className="blur-sm"
        />
        {/* Geometric patterns */}
        <circle cx="75%" cy="25%" r="120" fill={`url(#radial-${course.id})`} className="blur-3xl" />
        <circle cx="25%" cy="75%" r="100" fill={`url(#radial-${course.id})`} className="blur-3xl" />
      </svg>
    ),
    // Animated particles with stable positions - deterministic animation
    particles: particleData.map((particle) => {
      // Use deterministic x offset based on particle id to avoid hydration issues
      const xOffset = (particle.id % 3) * 7 - 7; // -7, 0, or 7
      return (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            background: color,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: 0.12,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, xOffset, 0],
            opacity: [0.12, 0.2, 0.12],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      );
    }),
  };
};

interface PremiumCourseCardProps {
  course: Course;
  index: number;
  onSelect: (course: Course) => void;
  isActive?: boolean;
}

function PremiumCourseCard({ course, index, onSelect, isActive = false }: PremiumCourseCardProps) {
  const Icon = iconMap[course.icon];
  const [isHovered, setIsHovered] = useState(false);
  // Generate stable particle data once per course
  const particleData = useMemo(() => generateParticleData(course.id), [course.id]);
  // Generate graphics with stable particles
  const graphics = useMemo(() => generateCourseGraphics(course, particleData), [course.id, particleData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex-shrink-0 w-[360px] sm:w-[400px]"
    >
      <motion.div
        onClick={() => onSelect(course)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative h-[520px] cursor-pointer group"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ 
          paddingTop: "12px", 
          marginTop: "-12px",
          willChange: "transform",
        }}
      >
        {/* Premium Card with Course Color Scheme */}
        <div
          className="relative h-full rounded-[2rem] overflow-hidden border"
          style={{
            background: `linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(20, 30, 50, 0.75) 100%)`,
            borderColor: isHovered || isActive
              ? `${course.neonColor}50`
              : `rgba(148, 163, 184, 0.08)`,
            boxShadow: isHovered || isActive
              ? `0 25px 70px -15px ${course.neonColor}40, 0 0 0 1.5px ${course.neonColor}40`
              : `0 8px 32px -8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(148, 163, 184, 0.06)`,
          }}
        >
          {/* Premium Background Graphics with Course Colors */}
          <div className="absolute inset-0 overflow-hidden" style={{ willChange: "opacity" }}>
            {/* Animated gradient orbs with course color - optimized for performance */}
            <motion.div
              className="absolute w-[420px] h-[420px] rounded-full blur-3xl opacity-[0.12]"
              style={{
                background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
                top: "-25%",
                right: "-15%",
                willChange: "transform, opacity",
              }}
              animate={{
                scale: isHovered ? [1, 1.12, 1] : [1, 1.06, 1],
                opacity: isHovered ? [0.12, 0.16, 0.12] : [0.12, 0.14, 0.12],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[380px] h-[380px] rounded-full blur-3xl opacity-[0.1]"
              style={{
                background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
                bottom: "-20%",
                left: "-12%",
                willChange: "transform, opacity",
              }}
              animate={{
                scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1],
                opacity: isHovered ? [0.1, 0.14, 0.1] : [0.1, 0.12, 0.1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* SVG Graphics */}
            {graphics.shapes}
            {/* Particles - stable, don't regenerate */}
            {graphics.particles}
          </div>

          {/* Premium Image Header Section - Full-size product images for all courses */}
          {courseImageMap[course.id] ? (
            <motion.div
              className="relative flex-1 min-h-[400px] overflow-hidden"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Full-Size Product Image Background */}
              <div className="absolute inset-0">
                <Image
                  src={courseImageMap[course.id]}
                  alt={`${course.name} Product Kit`}
                  fill
                  className="object-cover"
                  style={{
                    filter: isHovered 
                      ? `brightness(1.1) saturate(1.15)` 
                      : `brightness(1.0) saturate(1.05)`,
                    transition: "filter 0.6s ease",
                  }}
                  priority
                  unoptimized
                />
              </div>

              {/* Animated border glow - subtle */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 30px ${course.neonColor}15`,
                  opacity: isHovered ? 0.8 : 0.5,
                }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          ) : (
            <div className="relative h-56 overflow-hidden">
              {/* Gradient background with course color */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${course.neonColor}15 0%, ${course.neonColor}08 50%, transparent 100%)`,
                }}
              />
              {/* Icon Area with Premium Styling */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="inline-flex items-center justify-center rounded-3xl relative"
                  style={{
                    background: `linear-gradient(135deg, ${course.neonColor}15, ${course.neonColor}08)`,
                    border: `1px solid ${course.neonColor}25`,
                    width: "100px",
                    height: "100px",
                  }}
                  whileHover={{ rotate: 360, scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {Icon && (
                    <Icon
                      className="w-12 h-12 relative z-10"
                      style={{ color: course.neonColor }}
                    />
                  )}
                </motion.div>
              </div>
            </div>
          )}

          {/* Content Section */}
          {courseImageMap[course.id] ? (
            /* Minimal content for courses with product images - just title and CTA at bottom */
            <div className="relative p-6 flex flex-col justify-between z-10 bg-gradient-to-t from-background/95 via-background/80 to-transparent">
              {/* Title */}
              <motion.h3
                className="font-display text-3xl font-semibold text-foreground mb-4 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ 
                  fontFamily: "var(--font-audiowide)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {course.name}
              </motion.h3>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs uppercase tracking-widest font-medium"
                    style={{ 
                      color: isHovered ? `${course.neonColor}ee` : "rgba(148, 163, 184, 0.6)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Explore
                  </span>
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform duration-300"
                    style={{ 
                      color: isHovered ? `${course.neonColor}ee` : "rgba(148, 163, 184, 0.6)",
                      transform: isHovered ? "translateX(4px)" : "translateX(0)",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="relative p-8 flex-1 flex flex-col z-10">
              {/* Course Code */}
              <div className="mb-5">
                <span
                  className="inline-block font-mono text-[0.65rem] font-medium uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-lg"
                  style={{
                    background: `${course.neonColor}12`,
                    color: `${course.neonColor}dd`,
                    border: `1px solid ${course.neonColor}25`,
                  }}
                >
                  {course.code}
                </span>
              </div>

              {/* Course Name */}
              <h3
                className="font-display text-3xl sm:text-4xl font-semibold mb-5 text-foreground leading-tight tracking-tight"
                style={{ 
                  fontFamily: "var(--font-audiowide)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {course.name}
              </h3>

              {/* Tagline */}
              <p
                className="font-mono text-sm leading-relaxed mb-10 flex-1 text-muted-foreground"
                style={{ 
                  color: `${course.neonColor}dd`,
                  lineHeight: "1.75",
                  fontSize: "0.9rem",
                  fontWeight: 300,
                }}
              >
                {course.tagline}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs uppercase tracking-widest font-medium"
                  style={{ 
                    color: isHovered ? `${course.neonColor}ee` : "rgba(148, 163, 184, 0.6)",
                    transition: "color 0.3s ease",
                  }}
                >
                  Explore
                </span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-300"
                  style={{ 
                    color: isHovered ? `${course.neonColor}ee` : "rgba(148, 163, 184, 0.6)",
                    transform: isHovered ? "translateX(4px)" : "translateX(0)",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  // Always call hooks in the same order - use course?.id with fallback
  const courseId = course?.id || "shunya";
  const particleData = useMemo(() => generateParticleData(courseId), [courseId]);
  const graphics = useMemo(() => {
    if (!course) return { shapes: null, particles: [] };
    return generateCourseGraphics(course, particleData);
  }, [course, particleData]);
  
  const Icon = course ? iconMap[course.icon] : Zap;
  const scrollYRef = useRef<number>(0);

  // Lock body scroll and hide navbar when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store scroll position before locking
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      
      // Hide navbar
      const navbar = document.querySelector('.bm-navbar');
      if (navbar) {
        (navbar as HTMLElement).style.display = 'none';
      }
      
      return () => {
        // Restore body styles first
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        
        // Show navbar
        if (navbar) {
          (navbar as HTMLElement).style.display = '';
        }
        
        // Restore scroll position immediately after styles are reset
        window.scrollTo(0, scrollYRef.current);
      };
    }
  }, [isOpen]);

  // Early return after all hooks
  if (!course) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Premium Backdrop with Apple-style Blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ 
              opacity: 1,
              backdropFilter: "blur(20px) saturate(180%)",
            }}
            exit={{ 
              opacity: 0,
              backdropFilter: "blur(0px)",
            }}
            transition={{ 
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for ultra-smooth
            }}
            onClick={onClose}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 z-[9998]"
            style={{
              background: `rgba(0, 0, 0, 0.4)`,
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              backdropFilter: "blur(20px) saturate(180%)",
            }}
          />

          {/* Modal Container with Smooth Scale Animation */}
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.92,
              y: 20,
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
            }}
            exit={{ 
              opacity: 0,
              scale: 0.95,
              y: 10,
            }}
            transition={{ 
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1], // Premium easing curve
              opacity: { duration: 0.5 },
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
            style={{
              perspective: "1000px",
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ 
                scale: 0.92,
                opacity: 0,
                rotateX: 5,
              }}
              animate={{ 
                scale: 1,
                opacity: 1,
                rotateX: 0,
              }}
              exit={{ 
                scale: 0.95,
                opacity: 0,
                rotateX: 2,
              }}
              transition={{ 
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.5 },
              }}
              className="relative w-full max-w-5xl max-h-[80vh] overflow-y-auto rounded-[2rem] border pointer-events-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
              style={{
                background: `linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(20, 30, 50, 0.96) 100%)`,
                borderColor: `${course.neonColor}30`,
                boxShadow: `0 25px 80px -20px ${course.neonColor}25, 0 0 0 1px ${course.neonColor}25`,
                transformStyle: "preserve-3d",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                backdropFilter: "blur(40px) saturate(180%)",
              }}
              onWheel={(e) => {
                // Prevent scroll propagation to background
                const target = e.currentTarget;
                const isAtTop = target.scrollTop === 0;
                const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
                
                if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                  e.preventDefault();
                }
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                // Prevent touch scroll propagation
                e.stopPropagation();
              }}
            >
              {/* Premium Background Graphics with Smooth Entrance */}
              <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.08, 0.12, 0.08],
                    scale: [1, 1.1, 1],
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
                    initial: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
                  style={{
                    background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
                    top: "-20%",
                    right: "-10%",
                  }}
                />
                {graphics.shapes}
                {graphics.particles}
              </motion.div>

              {/* Close Button with Smooth Animation */}
              <motion.button
                onClick={onClose}
                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-8 right-8 w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 border border-border/40 hover:border-border/60 z-20"
                style={{
                  background: `rgba(15, 23, 42, 0.7)`,
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <X className="w-4 h-4" />
              </motion.button>

              <div className="relative p-10 sm:p-14 z-10">
                {/* Premium Header with Staggered Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-8 mb-12"
                >
                  <motion.div
                    className="rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${course.neonColor}25, ${course.neonColor}12)`,
                      border: `1.5px solid ${course.neonColor}35`,
                      width: "96px",
                      height: "96px",
                      boxShadow: `0 12px 32px -12px ${course.neonColor}35`,
                    }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Icon && (
                      <Icon
                        className="w-12 h-12"
                        style={{ color: course.neonColor }}
                      />
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      {course.code}
                    </div>
                    <h2
                      className="font-display text-4xl sm:text-5xl font-semibold mb-4 text-foreground leading-tight tracking-tight"
                      style={{ 
                        fontFamily: "var(--font-audiowide)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {course.name}
                    </h2>
                    <p
                      className="font-mono text-lg leading-relaxed"
                      style={{ 
                        color: `${course.neonColor}dd`,
                        fontWeight: 300,
                      }}
                    >
                      {course.tagline}
                    </p>
                  </div>
                </motion.div>

                {/* Description with Smooth Fade */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-4xl"
                  style={{ lineHeight: "1.85", fontWeight: 300 }}
                >
                  {course.fullDescription}
                </motion.p>

                {/* Premium Info Grid with Stagger */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
                >
                  {[
                    { icon: Users, label: "Age Group", value: course.ageGroup },
                    { icon: Clock, label: "Duration", value: course.duration },
                    { icon: Icon, label: "Category", value: course.description },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.94, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.35 + idx * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-center gap-4 p-5 rounded-2xl border border-border/20"
                      style={{
                        background: `rgba(15, 23, 42, 0.5)`,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${course.neonColor}15`,
                          border: `1px solid ${course.neonColor}25`,
                        }}
                      >
                        <item.icon className="w-6 h-6" style={{ color: course.neonColor }} />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-mono font-medium">
                          {item.label}
                        </div>
                        <div className="font-semibold text-foreground text-base">{item.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Key Outcomes with Smooth Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mb-12"
                >
                  <h3 className="font-display text-2xl font-semibold mb-8 text-foreground tracking-tight" style={{ fontWeight: 500 }}>
                    Key Outcomes
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -15, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ 
                          duration: 0.5,
                          delay: 0.45 + idx * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-start gap-4 p-4 rounded-xl border border-border/15"
                        style={{
                          background: `rgba(15, 23, 42, 0.4)`,
                        }}
                      >
                        <CheckCircle
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: course.neonColor }}
                        />
                        <p className="text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>{outcome}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Features with Smooth Stagger */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mb-12"
                >
                  <h3 className="font-display text-2xl font-semibold mb-8 text-foreground tracking-tight" style={{ fontWeight: 500 }}>
                    What You'll Learn
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -12, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ 
                          duration: 0.45,
                          delay: 0.55 + idx * 0.03,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-start gap-3 p-4 rounded-xl border border-border/15"
                        style={{
                          background: `rgba(15, 23, 42, 0.3)`,
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                          style={{ background: course.neonColor }}
                        />
                        <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Premium CTA Button with Final Smooth Entrance */}
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link href={`/courses/${course.id}`}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto text-lg px-10 py-7 font-mono rounded-xl hover:scale-[1.02] transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                        boxShadow: `0 8px 32px -8px ${course.neonColor}40, 0 0 0 1px ${course.neonColor}30`,
                      }}
                    >
                      Explore Full Course
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function PremiumCourseCards() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleSelect = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 300);
  };

  // Fixed centered scroll algorithm - ensures all cards center properly
  const scrollToCenter = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = 400; // card width
    const gap = 24;
    const containerWidth = container.clientWidth;
    const padding = containerWidth / 2 - cardWidth / 2; // Padding on each side
    
    // Calculate where the card center should be (including padding)
    const cardCenter = padding + (index * (cardWidth + gap)) + (cardWidth / 2);
    
    // Calculate scroll position to center the card
    const scrollPosition = cardCenter - (containerWidth / 2);
    
    // Ensure we don't scroll beyond bounds
    const maxScroll = container.scrollWidth - containerWidth;
    const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
    
    container.scrollTo({
      left: finalScrollPosition,
      behavior: "smooth",
    });
    
    setCurrentIndex(index);
  }, []);

  const checkScrollability = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability, { passive: true });
      window.addEventListener("resize", checkScrollability, { passive: true });
      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [checkScrollability]);

  // Don't auto-center on mount - let first card start from left
  // useEffect(() => {
  //   if (scrollContainerRef.current && currentIndex === 0) {
  //     setTimeout(() => {
  //       scrollToCenter(0);
  //     }, 100);
  //   }
  // }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const newIndex = direction === "left" 
      ? Math.max(0, currentIndex - 1)
      : Math.min(coursesData.length - 1, currentIndex + 1);
    
    scrollToCenter(newIndex);
    
    // Update scrollability immediately and after scroll completes
    setTimeout(() => {
      checkScrollability();
    }, 100);
    setTimeout(() => {
      checkScrollability();
    }, 600);
  }, [currentIndex, scrollToCenter, checkScrollability]);

  // Handle card click to center it
  const handleCardClick = useCallback((index: number) => {
    scrollToCenter(index);
  }, [scrollToCenter]);

  return (
    <>
      {/* Premium Slider Container */}
      <div className="relative px-16">
        {/* Navigation Arrows - Always Responsive, Premium Disabled State */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          style={{
            background: `rgba(15, 23, 42, 0.8)`,
            borderColor: canScrollLeft ? `rgba(148, 163, 184, 0.15)` : `rgba(148, 163, 184, 0.08)`,
            transform: "translateY(-50%)",
            transition: "all 0.2s ease",
            opacity: 1,
          }}
        >
          <ChevronLeft 
            className="w-5 h-5 transition-colors duration-200" 
            style={{
              color: canScrollLeft ? "rgba(255, 255, 255, 0.7)" : "rgba(148, 163, 184, 0.25)",
            }}
          />
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          style={{
            background: `rgba(15, 23, 42, 0.8)`,
            borderColor: canScrollRight ? `rgba(148, 163, 184, 0.15)` : `rgba(148, 163, 184, 0.08)`,
            transform: "translateY(-50%)",
            transition: "all 0.2s ease",
            opacity: 1,
          }}
        >
          <ChevronRight 
            className="w-5 h-5 transition-colors duration-200" 
            style={{
              color: canScrollRight ? "rgba(255, 255, 255, 0.7)" : "rgba(148, 163, 184, 0.25)",
            }}
          />
        </button>

        {/* Smooth Slider Container with Centered Scrolling */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide pb-6 pt-4"
          style={{
            scrollBehavior: "smooth",
          }}
          onScroll={checkScrollability}
        >
          <div className="flex gap-6" style={{ paddingLeft: "24px", paddingRight: "calc(50% - 200px)" }}>
            {coursesData.map((course, index) => (
              <div 
                key={course.id}
                onClick={() => handleCardClick(index)}
                className="cursor-pointer"
              >
                <PremiumCourseCard
                  course={course}
                  index={index}
                  onSelect={handleSelect}
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Premium Slider Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {coursesData.map((course, index) => (
            <motion.button
              key={index}
              onClick={() => {
                scrollToCenter(index);
              }}
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: index === currentIndex ? "28px" : "8px",
                  background: index === currentIndex
                    ? course.neonColor
                    : "rgba(148, 163, 184, 0.3)",
                  boxShadow: index === currentIndex
                    ? `0 0 12px ${course.neonColor}50`
                    : "none",
                }}
                layoutId="indicator"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Premium Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </>
  );
}
