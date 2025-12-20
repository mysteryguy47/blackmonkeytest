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

          {/* Modal - Premium Minimal Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border pointer-events-auto scrollbar-thin scrollbar-thumb-border/50 scrollbar-track-transparent"
              style={{
                background: `rgba(15, 23, 42, 0.95)`,
                backdropFilter: 'blur(20px)',
                borderColor: `rgba(148, 163, 184, 0.1)`,
                boxShadow: `0 20px 60px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(148, 163, 184, 0.1)`,
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
              {/* Subtle Background Accent */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.03]"
                  style={{
                    background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
                    top: "-10%",
                    right: "-5%",
                  }}
                />
              </div>

              {/* Close Button - Minimal */}
              <motion.button
                onClick={onClose}
                onHoverStart={() => play("hover")}
                className="absolute top-6 right-6 w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted/20 z-20"
                data-testid="button-modal-close"
              >
                <X className="w-4 h-4" />
              </motion.button>

              <div className="relative p-8 sm:p-12 z-10">
                {/* Minimal Header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-10"
                >
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    {course.code}
                  </div>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-semibold mb-3 text-foreground leading-tight"
                    style={{ 
                      fontFamily: "var(--font-audiowide)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {course.name}
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {course.tagline}
                  </p>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-muted-foreground text-base leading-relaxed mb-10"
                  style={{ lineHeight: "1.75" }}
                >
                  {course.fullDescription}
                </motion.p>

                {/* Minimal Info Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 pb-10 border-b border-border/10"
                >
                  {[
                    { icon: Users, label: "Age Group", value: course.ageGroup },
                    { icon: Clock, label: "Duration", value: course.duration },
                    { icon: Icon, label: "Category", value: course.description },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3"
                    >
                      <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-mono">
                          {item.label}
                        </div>
                        <div className="text-sm font-medium text-foreground">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Key Outcomes - Minimal */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mb-10"
                >
                  <h3 className="font-display text-xl font-semibold mb-6 text-foreground">
                    Key Outcomes
                  </h3>
                  <div className="space-y-3">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle
                          className="w-4 h-4 flex-shrink-0 mt-1 text-muted-foreground"
                        />
                        <p className="text-sm text-muted-foreground leading-relaxed">{outcome}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Features - Minimal */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="mb-10"
                >
                  <h3 className="font-display text-xl font-semibold mb-6 text-foreground">
                    What You'll Learn
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0 mt-2 bg-muted-foreground/40"
                        />
                        <p className="text-sm text-muted-foreground leading-relaxed">{feature}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Minimal CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/10"
                >
                  <Link href={`/courses/${course.id}`} onClick={() => play("click")} className="flex-1">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full h-12 font-medium rounded-lg border-border/50 hover:border-border transition-all duration-200"
                    >
                      Explore Full Course
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href={`/payment/${course.id}`} onClick={() => play("click")} className="flex-1">
                    <Button
                      size="lg"
                      className="w-full h-12 font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
                    >
                      Enroll Now
                      <ArrowRight className="w-4 h-4 ml-2" />
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
