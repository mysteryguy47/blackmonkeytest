import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Course } from "@shared/schema";
import { Zap, Bot, Wifi, Network, Plane, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useSound } from "@/hooks/use-sound";

const iconMap: Record<string, any> = {
  Zap,
  Bot,
  Wifi,
  Network,
  Plane,
};

// Course images mapping
const courseImages: Record<string, string> = {
  shunya: "linear-gradient(135deg, rgb(168, 85, 247, 0.2), rgb(236, 72, 153, 0.1))",
  chakra: "linear-gradient(135deg, rgb(34, 211, 238, 0.2), rgb(168, 85, 247, 0.1))",
  yantra: "linear-gradient(135deg, rgb(236, 72, 153, 0.2), rgb(34, 211, 238, 0.1))",
  ananta: "linear-gradient(135deg, rgb(245, 158, 11, 0.2), rgb(236, 72, 153, 0.1))",
  garuda: "linear-gradient(135deg, rgb(34, 197, 94, 0.2), rgb(245, 158, 11, 0.1))",
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
    >
      <motion.div
        onClick={() => onSelect?.(course)}
        className="relative h-full cursor-pointer group"
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className="overflow-hidden border-2 border-border hover:border-transparent transition-all duration-500 bg-card/30 backdrop-blur-sm h-full flex flex-col"
          style={{
            boxShadow: isHovered
              ? `0 0 40px ${course.neonColor}60, 0 0 80px ${course.neonColor}20`
              : `0 0 0 0 ${course.neonColor}`,
          }}
          data-testid={`card-course-${course.id}`}
        >
          {/* Course Image Header */}
          <motion.div
            className="relative h-48 overflow-hidden"
            style={{
              background: courseImages[course.id],
            }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${course.neonColor}20 0%, transparent 100%)`,
              }}
            />

            {/* Animated background shapes */}
            <motion.div
              className="absolute inset-0"
              initial={false}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full opacity-20"
                  style={{
                    width: `${100 + i * 50}px`,
                    height: `${100 + i * 50}px`,
                    background: course.neonColor,
                    left: `${20 + i * 30}%`,
                    top: `${20 + i * 20}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>

            {/* Icon Area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${course.neonColor}30, ${course.neonColor}10)`,
                  border: `2px solid ${course.neonColor}50`,
                }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                {Icon && <Icon className="w-12 h-12" style={{ color: course.neonColor }} />}
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="relative p-8 flex-1 flex flex-col">
            {/* Badge */}
            <motion.div
              className="font-tech inline-flex items-center gap-2 mb-4 w-fit"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span
                className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ background: course.neonColor }}
              >
                {course.code}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="font-tech text-3xl font-display font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              {course.name}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="font-tech text-sm text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {course.description}
            </motion.p>

            {/* Tagline */}
            <motion.p
              className="font-mono text-lg font-semibold leading-relaxed mb-6 flex-1"
              style={{ color: course.neonColor }}
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {course.tagline}
            </motion.p>

            {/* CTA */}
            <motion.div
              className="font-tech flex items-center text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                play("click");
              }}
            >
              <span className="text-sm font-bold">Explore Now</span>
              <motion.div
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
