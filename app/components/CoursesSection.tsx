import { motion } from "framer-motion";
import { coursesData, type Course } from "@shared/schema";
import { EnhancedCourseCard } from "./EnhancedCourseCard";
import { PremiumCourseCards } from "./PremiumCourseCards";
import { useState } from "react";
import StarBorder from "@/components/StarBorder";

interface CoursesSectionProps {
  onCourseSelect?: (course: Course) => void;
}

export function CoursesSection({ onCourseSelect }: CoursesSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  return (
    <section id="courses" className="relative py-20 pb-32 overflow-hidden">


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="font-display font-bold mb-6 bg-clip-text text-transparent" 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              backgroundImage: 'linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            data-testid="text-courses-title"
          >
            <span className="font-tech">Five Paths to Mastery</span>
          </h2>
          <p className="font-mono text-xl text-muted-foreground max-w-1xl mx-auto whitespace-nowrap" data-testid="text-courses-subtitle">
            Each course is a journey from beginner to builder. Choose your adventure.
          </p>
        </motion.div>

        {/* Premium Course Cards Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <PremiumCourseCards />
        </motion.div>

        {/* Existing Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {coursesData.slice(0, 3).map((course, index) => (
            <EnhancedCourseCard
              key={course.id}
              course={course}
              index={index}
              onSelect={onCourseSelect}
            />
          ))}
          {/* Last 2 cards centered */}
          <div className="lg:col-span-3 flex flex-col md:flex-row lg:justify-center gap-8">
            {coursesData.slice(3).map((course, index) => (
              <div key={course.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)]">
                <EnhancedCourseCard
                  course={course}
                  index={index + 3}
                  onSelect={onCourseSelect}
                />
              </div>
            ))}
          </div>
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
              >
                <StarBorder
                  color={course.neonColor}
                  speed="5s"
                  thickness={2}
                  className="w-full"
                  contentClassName="text-center p-4 !bg-slate-800/30 !border-slate-700/30 !text-foreground rounded-lg !flex !flex-col !items-center !justify-center !gap-2"
                >
                  <div className="font-mono text-sm font-bold text-muted-foreground">
                    Level {idx + 1}
                  </div>
                  <div className="font-display font-bold font-tech">
                    {course.name}
                  </div>
                </StarBorder>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
