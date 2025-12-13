"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Clock, Users, CheckCircle, Zap, Bot, Wifi, Network, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@shared/schema";
import { useSound } from "@/hooks/use-sound";
import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";

const iconMap: Record<string, any> = {
  Zap,
  Bot,
  Wifi,
  Network,
  Plane,
};

// Generate stable particle data - memoized per course
const generateParticleData = (courseId: string) => {
  // Use a seed based on courseId to generate consistent random values
  let seed = courseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  return Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    width: 4 + random() * 6,
    height: 4 + random() * 6,
    left: random() * 100,
    top: random() * 100,
    delay: random() * 2,
    duration: 3.5 + random() * 2,
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
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, xOffset, 0],
            opacity: [0.12, 0.25, 0.12],
            scale: [1, 1.15, 1],
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

interface AdvancedModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AdvancedModal({ course, isOpen, onClose }: AdvancedModalProps) {
  const { play } = useSound();

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Prevents scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClose}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 z-[9998] bg-black/60"
            data-testid="modal-backdrop"
          />

          {/* Modal - Reduced Height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[80vh] overflow-y-auto rounded-[2rem] border pointer-events-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
              style={{
                background: `linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(20, 30, 50, 0.96) 100%)`,
                borderColor: `${course.neonColor}30`,
                boxShadow: `0 25px 80px -20px ${course.neonColor}25, 0 0 0 1px ${course.neonColor}25`,
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
              data-testid={`modal-course-${course.id}`}
            >
              {/* Premium Background Graphics */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.08]"
                  style={{
                    background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
                    top: "-20%",
                    right: "-10%",
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.08, 0.12, 0.08],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                {graphics.shapes}
                {graphics.particles}
              </div>

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                onHoverStart={() => play("hover")}
                className="absolute top-8 right-8 w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 border border-border/40 hover:border-border/60 z-20"
                style={{
                  background: `rgba(15, 23, 42, 0.7)`,
                }}
                data-testid="button-modal-close"
              >
                <X className="w-4 h-4" />
              </motion.button>

              <div className="relative p-10 sm:p-14 z-10">
                {/* Premium Header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
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

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-4xl"
                  style={{ lineHeight: "1.85", fontWeight: 300 }}
                >
                  {course.fullDescription}
                </motion.p>

                {/* Premium Info Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
                >
                  {[
                    { icon: Users, label: "Age Group", value: course.ageGroup },
                    { icon: Clock, label: "Duration", value: course.duration },
                    { icon: Icon, label: "Category", value: course.description },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + idx * 0.05 }}
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

                {/* Key Outcomes */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12"
                >
                  <h3 className="font-display text-2xl font-semibold mb-8 text-foreground tracking-tight" style={{ fontWeight: 500 }}>
                    Key Outcomes
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + idx * 0.08 }}
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

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <h3 className="font-display text-2xl font-semibold mb-8 text-foreground tracking-tight" style={{ fontWeight: 500 }}>
                    What You'll Learn
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + idx * 0.04 }}
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

                {/* Premium CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href={`/courses/${course.id}`} onClick={() => play("click")}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto text-lg px-10 py-7 font-mono rounded-xl hover:scale-[1.02] transition-transform duration-300 border-2"
                      style={{
                        borderColor: `${course.neonColor}40`,
                      }}
                    >
                      Explore Full Course
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href={`/payment/${course.id}`} onClick={() => play("click")}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto text-lg px-10 py-7 font-mono rounded-xl hover:scale-[1.02] transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                        boxShadow: `0 8px 32px -8px ${course.neonColor}40`,
                      }}
                    >
                      Enroll Now
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
