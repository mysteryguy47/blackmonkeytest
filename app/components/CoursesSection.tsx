import { motion } from "framer-motion";
import { coursesData, type Course } from "@shared/schema";
import { EnhancedCourseCard } from "./EnhancedCourseCard";
import { useState } from "react";

interface CoursesSectionProps {
  onCourseSelect?: (course: Course) => void;
}

export function CoursesSection({ onCourseSelect }: CoursesSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  return (
    <section id="courses" className="relative py-20 overflow-hidden">


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold mb-6" style={{fontSize: 'clamp(2.5rem, 5vw, 3.75rem)'}} data-testid="text-courses-title">
            <span className="font-tech bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
              Five Paths
            </span>
            <span className="text-foreground font-tech"> to Mastery</span>
          </h2>
          <p className="font-mono text-xl text-muted-foreground max-w-1xl mx-auto whitespace-nowrap" data-testid="text-courses-subtitle">
            Each course is a journey from beginner to builder. Choose your adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course, index) => (
            <EnhancedCourseCard
              key={course.id}
              course={course}
              index={index}
              onSelect={onCourseSelect}
            />
          ))}
        </div>

        {/* More Courses Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl border border-slate-700/50 bg-gradient-to-r from-slate-900/50 to-slate-800/30 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-display font-bold mb-4 font-tech">
            Progressive Learning Path
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6 font-mono">
            Our courses are designed as a progressive journey. Start with fundamentals in Shunya and advance through increasingly complex concepts in Chakra, Yantra, Ananta, and Garuda. Each course builds upon previous knowledge, creating a comprehensive STEM foundation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {coursesData.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-4 rounded-lg bg-slate-800/30 border border-slate-700/30"
              >
                <div className="font-mono text-sm font-bold text-muted-foreground mb-2">
                  Level {idx + 1}
                </div>
                <div className="font-display font-bold text-foreground font-tech">
                  {course.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
