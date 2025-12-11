import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AdvancedAnimationWrapperProps {
  children: ReactNode;
  delay?: number;
  type?: "fadeUp" | "slideIn" | "popIn" | "blur";
  className?: string;
}

export function AdvancedAnimationWrapper({
  children,
  delay = 0,
  type = "fadeUp",
  className,
}: AdvancedAnimationWrapperProps) {
  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
    },
    slideIn: {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
    },
    popIn: {
      initial: { opacity: 0, scale: 0.8 },
      whileInView: { opacity: 1, scale: 1 },
    },
    blur: {
      initial: { opacity: 0, filter: "blur(10px)" },
      whileInView: { opacity: 1, filter: "blur(0px)" },
    },
  };

  return (
    <motion.div
      variants={variants[type]}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
