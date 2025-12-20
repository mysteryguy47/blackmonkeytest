"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const isBMLab = pathname === "/bmlab";

  useEffect(() => {
    // Ensure body background is always black
    document.body.style.backgroundColor = '#000000';
    
    // Add class to body to hide navbar
    if (isVisible) {
      document.body.classList.add("loading-screen-active");
    } else {
      document.body.classList.remove("loading-screen-active");
    }

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Smooth progress animation
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    // Minimum 1 second display time
    const minDisplayTime = setTimeout(() => {
      if (progress >= 100) {
        setIsVisible(false);
      }
    }, 1000);

    // Hide when progress reaches 100% (but wait at least 1 second)
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, Math.max(1500, 1000 + (progress / 100) * 500));

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minDisplayTime);
      clearTimeout(hideTimeout);
      document.body.classList.remove("loading-screen-active");
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ backgroundColor: '#000000' }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.3) 1px, transparent 0)`,
                backgroundSize: "50px 50px",
              }}
            />
          </motion.div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
            {/* Logo with animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <Image
                  src="/logo.png"
                  alt="BlackMonkey Logo"
                  width={120}
                  height={120}
                  className="drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-pink-500/30 blur-2xl animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-center"
            >
              <h1
                className="text-5xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "var(--font-audiowide)",
                  letterSpacing: "2px",
                }}
              >
                BlackMonkey{isBMLab ? " Lab" : ""}
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-2 text-sm text-slate-400 font-mono tracking-wider"
              >
                Next-Gen STEM Education
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "280px", opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative w-[280px] h-1 bg-slate-800 rounded-full overflow-hidden"
            >
              {/* Progress fill */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
              {/* Glow effect on progress */}
              <motion.div
                className="absolute inset-y-0 bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-pink-500/50 blur-sm"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex space-x-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => {
            const startX = 10 + Math.random() * 80;
            const startY = 10 + Math.random() * 80;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-400/50 to-cyan-400/50"
                initial={{
                  x: `${startX}%`,
                  y: `${startY}%`,
                  opacity: 0,
                }}
                animate={{
                  y: [`${startY}%`, `${startY + (Math.random() - 0.5) * 30}%`],
                  x: [`${startX}%`, `${startX + (Math.random() - 0.5) * 30}%`],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

