import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@shared/schema";
import { useSound } from "@/hooks/use-sound";
import { EnrollmentForm } from "./EnrollmentForm";
import { useState, useEffect } from "react";

interface AdvancedModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AdvancedModal({ course, isOpen, onClose }: AdvancedModalProps) {
  const { play } = useSound();
  const [showEnrollForm, setShowEnrollForm] = useState(false);

  // ⬇️ ADD THIS HERE
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";  // lock scroll
    } else {
      document.body.style.overflow = "";        // unlock scroll
    }

    return () => {
      document.body.style.overflow = "";        // cleanup
    };
  }, [isOpen]);
  // ⬆️ ADD THIS HERE

  if (!course) return null;


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            data-testid="modal-backdrop"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                            border border-slate-700/50 rounded-3xl shadow-2xl pointer-events-auto 
                            max-h-[85vh] overflow-y-auto"

              style={{
                background: `linear-gradient(135deg, ${course.neonColor}05 0%, transparent 100%), linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)`,
              }}
              data-testid={`modal-course-${course.id}`}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
                style={{ background: course.neonColor }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Close button */}
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                onHoverStart={() => play("hover")}
                className="absolute top-6 right-6 z-10 bg-slate-700/50 hover:bg-slate-600 p-2 rounded-lg transition-colors"
                data-testid="button-modal-close"
              >
                <X size={20} />
              </motion.button>

              {/* Content */}
              <div className="relative p-8 md:p-12 space-y-6">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="font-tech text-4xl md:text-5xl font-display font-bold" style={{fontSize: 'clamp(2rem, 4vw, 3rem)'}}>
                    <span style={{ color: course.neonColor }}>{course.name}</span>
                  </h2>
                  <p className="font-mono text-lg mt-2" style={{ color: "white", opacity: 0.8 }}>
                    {course.tagline}
                  </p>
                </motion.div>

                {/* Course details grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <p className="font-tech text-sm text-slate-400 mb-1">Age Group</p>
                    <p className="font-bold font-mono" style={{ color: course.neonColor }}>
                      {course.ageGroup}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <p className="font-tech text-sm text-slate-400 mb-1">Duration</p>
                    <p className="font-bold font-mono" style={{ color: course.neonColor }}>
                      {course.duration}
                    </p>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-bold mb-2 font-tech">About This Course</h3>
                  <p className="text-slate-300 leading-relaxed font-mono">{course.fullDescription}</p>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h3 className="text-lg font-bold mb-3 font-tech">What You'll Learn</h3>
                  <div className="font-mono grid grid-cols-1 md:grid-cols-1 gap-0">
                    {course.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="flex items-start gap-2 p-1 rounded-lg hover:bg-slate-700/30 transition-colors"
                      >
                        <span
                          className="text-lg mt-0"
                          style={{ color: course.neonColor }}
                        >
                          ✦
                        </span>
                        <span className="text-slate-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Enrollment Form or CTA */}
                {showEnrollForm ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEnrollForm(false)}
                      className="font-mono mb-4 text-muted-foreground hover:text-foreground"
                      data-testid="button-back-to-details"
                    >
                      ← Back to Course Details
                    </Button>
                    <div className="font-mono max-h-[80vh] overflow-y-auto px-2">
                      <EnrollmentForm 
                      courseId={course.id} 
                      courseName={course.name}
                      onSuccess={() => {
                        setTimeout(() => onClose(), 2000);
                      }}/>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex gap-3 pt-4"
                  >
                    <Button
                      size="lg"
                      className="flex-1 text-lg font-tech"
                      style={{
                        background: `linear-gradient(135deg, ${course.neonColor}, ${course.neonColor}dd)`,
                        color: "#fff",
                      }}
                      onMouseEnter={() => play("hover")}
                      onClick={() => {
                        play("click");
                        setShowEnrollForm(true);
                      }}
                      data-testid={`button-enroll-${course.id}`}
                    >
                      Enroll Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-tech flex-1 text-lg"
                      onClick={onClose}
                      onMouseEnter={() => play("hover")}
                      data-testid="button-modal-cancel"
                    >
                      Close
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
