import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "@shared/schema";
import { Zap, Bot, Wifi, Network, Plane, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import { useSound } from "@/hooks/use-sound";
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

// Generate stable particle data for grid cards
const generateGridParticleData = (courseId: string) => {
  let seed = courseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  return Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    width: 3 + random() * 5,
    height: 3 + random() * 5,
    left: random() * 100,
    top: random() * 100,
    delay: random() * 2,
    duration: 4 + random() * 2,
  }));
};

// Subtle Premium graphics generator for grid cards
const generatePremiumGraphics = (course: Course, particleData: ReturnType<typeof generateGridParticleData>) => {
  const color = course.neonColor;
  
  return {
    // Minimal abstract SVG patterns
    svgPattern: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-soft-light" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grid-grad-${course.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`grid-radial-${course.id}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Subtle curves */}
        <path
          d="M0,100 Q200,50 400,100 T800,100"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.12"
          className="blur-sm"
        />
        {/* Minimal geometric accents */}
        <circle cx="80%" cy="20%" r="100" fill={`url(#grid-radial-${course.id})`} className="blur-3xl" />
        <circle cx="20%" cy="80%" r="80" fill={`url(#grid-radial-${course.id})`} className="blur-3xl" />
      </svg>
    ),
    // Subtle particles with deterministic positions
    particles: particleData.map((particle) => (
      <motion.div
        key={particle.id}
        className="absolute rounded-full"
        style={{
          width: `${particle.width}px`,
          height: `${particle.height}px`,
          background: color,
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          opacity: 0.08,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: particle.duration,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeInOut",
        }}
      />
    )),
  };
};

interface EnhancedCourseCardProps {
  course: Course;
  index: number;
  onSelect?: (course: Course) => void;
}

export function EnhancedCourseCard({ course, index, onSelect }: EnhancedCourseCardProps) {
  const Icon = iconMap[course.icon];
  const [isHovered, setIsHovered] = useState(false);
  const { play } = useSound();
  // Generate stable particle data once per course
  const particleData = useMemo(() => generateGridParticleData(course.id), [course.id]);
  // Generate graphics with stable particles
  const graphics = useMemo(() => generatePremiumGraphics(course, particleData), [course.id, particleData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      onHoverStart={() => {
        setIsHovered(true);
        play("hover");
      }}
      onHoverEnd={() => setIsHovered(false)}
      style={{ paddingTop: "12px", marginTop: "-12px" }}
    >
      <motion.div
        onClick={() => onSelect?.(course)}
        className="relative h-full cursor-pointer group"
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className="overflow-hidden border border-border hover:border-transparent transition-all duration-500 h-full flex flex-col relative rounded-3xl"
          style={{
            background: `linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(20, 30, 50, 0.75) 100%)`,
            borderColor: isHovered ? `${course.neonColor}40` : `rgba(148, 163, 184, 0.08)`,
            boxShadow: isHovered
              ? `0 20px 60px -15px ${course.neonColor}30, 0 0 0 1px ${course.neonColor}30`
              : `0 8px 32px -8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(148, 163, 184, 0.06)`,
          }}
          data-testid={`card-course-${course.id}`}
        >
          {/* Premium Background Graphics Layer */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Subtle Gradient orbs */}
            <motion.div
              className="absolute w-96 h-96 rounded-full blur-3xl opacity-[0.06]"
              style={{
                background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
                top: "-25%",
                right: "-15%",
              }}
              animate={{
                opacity: isHovered ? [0.06, 0.1, 0.06] : 0.06,
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-80 h-80 rounded-full blur-3xl opacity-[0.05]"
              style={{
                background: `radial-gradient(circle, ${course.neonColor} 0%, transparent 70%)`,
                bottom: "-20%",
                left: "-12%",
              }}
              animate={{
                opacity: isHovered ? [0.05, 0.08, 0.05] : 0.05,
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* SVG Abstract Graphics */}
            {graphics.svgPattern}

            {/* Animated Particles */}
            {graphics.particles}

            {/* Subtle mesh overlay */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                background: `radial-gradient(at 30% 20%, ${course.neonColor} 0px, transparent 50%),
                            radial-gradient(at 70% 80%, ${course.neonColor} 0px, transparent 50%)`,
              }}
            />
          </div>

          {/* Premium Image Header Section - Full-size product images for all courses */}
          {courseImageMap[course.id] ? (
            <motion.div
              className="relative flex-1 min-h-[500px] overflow-hidden"
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
            <motion.div
              className="relative h-56 overflow-hidden"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Gradient background with course color */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${course.neonColor}15 0%, ${course.neonColor}08 50%, transparent 100%)`,
                }}
              />

              {/* Additional graphics overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${course.neonColor}20 0%, transparent 70%)`,
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
            </motion.div>
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
                <Link
                  href={`/courses/${course.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    play("click");
                  }}
                  className="font-tech flex items-center text-foreground hover:text-neon-purple transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold">Explore Now</span>
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          ) : (
            <div className="relative p-8 flex-1 flex flex-col z-10">
              {/* Subtle Badge */}
              <motion.div
                className="inline-flex items-center gap-2 mb-5 w-fit"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span
                  className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-lg"
                  style={{
                    background: `${course.neonColor}10`,
                    color: `${course.neonColor}cc`,
                    border: `1px solid ${course.neonColor}20`,
                  }}
                >
                  {course.code}
                </span>
              </motion.div>

              {/* Title - Premium Typography */}
              <motion.h3
                className="font-display text-3xl font-semibold text-foreground mb-3 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ 
                  fontFamily: "var(--font-audiowide)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {course.name}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-sm text-muted-foreground mb-5 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ fontWeight: 300 }}
              >
                {course.description}
              </motion.p>

              {/* Tagline - Subtle */}
              <motion.p
                className="font-mono text-sm leading-relaxed mb-8 flex-1"
                style={{ 
                  color: `${course.neonColor}dd`,
                  lineHeight: "1.75",
                  fontSize: "0.9rem",
                  fontWeight: 300,
                }}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {course.tagline}
              </motion.p>

              {/* Premium CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href={`/courses/${course.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    play("click");
                  }}
                  className="font-tech flex items-center text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold">Explore Now</span>
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          )}

          {/* Premium Shine Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.04) 50%, transparent 100%)`,
            }}
            animate={{
              x: isHovered ? ["-100%", "200%"] : "-100%",
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 2,
            }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}
