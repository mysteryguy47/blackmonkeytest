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

interface CourseCardProps {
  course: Course;
  index: number;
  onSelect?: (course: Course) => void;
}

export function CourseCard({ course, index, onSelect }: CourseCardProps) {
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
        className="relative h-full cursor-pointer"
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className="group relative overflow-hidden border-2 border-border hover:border-transparent transition-all duration-500 bg-card/50 backdrop-blur-sm h-full"
          style={{
            boxShadow: isHovered
              ? `0 0 30px ${course.neonColor}60, 0 0 60px ${course.neonColor}30`
              : `0 0 0 0 ${course.neonColor}`,
          }}
          data-testid={`card-course-${course.id}`}
        >
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${course.neonColor}15 0%, transparent 100%)`,
              boxShadow: `0 0 30px ${course.neonColor}40`,
            }}
          />

          <div className="relative p-8">
            <div className="mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4"
                style={{
                  background: `linear-gradient(135deg, ${course.neonColor}20, ${course.neonColor}10)`,
                  border: `2px solid ${course.neonColor}40`,
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {Icon && <Icon className="w-10 h-10" style={{ color: course.neonColor }} />}
              </motion.div>
              
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                {course.code}
              </p>
              
              <h3 className="text-3xl font-display font-bold text-foreground mb-2">
                {course.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
            </div>

            <p
              className="text-lg font-medium leading-relaxed mb-6"
              style={{ color: course.neonColor }}
            >
              {course.tagline}
            </p>

            <div className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors">
              <span className="text-sm font-medium">Learn More</span>
              <motion.div
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
