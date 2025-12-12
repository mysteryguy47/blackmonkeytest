"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightCircle, ArrowRightCircleIcon, ArrowRightIcon, ArrowRightToLine, ChevronDown, Sparkles, Zap } from "lucide-react";
import { useSound } from "@/hooks/use-sound";
import { ArrowUp } from "lucide-react";
import { useRef, useState, useEffect } from 'react';
import VariableProximity from './VariableProximity';
import Link from "next/link";

export function Hero() {
  const { play } = useSound();
  const containerRef = useRef(null);
  const scrollToCourses = () => {
    const coursesSection = document.getElementById("courses");
    coursesSection?.scrollIntoView({ behavior: "smooth" });
    play("click");
  };

  // Generate stable particle positions to avoid hydration mismatches
  const [particles, setParticles] = useState<Array<{left: number, top: number, duration: number, delay: number}>>([]);

  useEffect(() => {
    // Generate particle data only on client side
    const particleData = [...Array(50)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(particleData);
  }, []);

  return (
    <section className="font-tech relative min-h-screen flex items-center justify-center overflow-hidden pt-20 font-mono" id="home">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-purple rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      style={{
        marginTop:50,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-neon-purple" />
          <span className="text-sm font-medium">Next-Gen STEM Education</span>
        </motion.div>

        <motion.h1
          className="font-display font-extrabold mb-6 leading-tight px-4"
          style={{
            fontSize: 'clamp(2rem, 8vw, 6rem)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="text-hero-title"
        >
          <span className="font-tech bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent block">
            Ignite Curiosity.
          </span>
          <span className="font-tech text-foreground block whitespace-nowrap">Build Their Future.</span>
        </motion.h1>

        <motion.div
          className="font-tech text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          data-testid="text-hero-subtitle"
        >

            <div
            ref={containerRef}
            style={{position: 'relative'}}
            >
              <VariableProximity
                label={'BlackMonkey turns curious kids into fearless creators. Learning doesn’t feel like homework here — it feels like magic you can touch.'}
                className={'variable-proximity-demo'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='linear'
              />
            </div>
        </motion.div>

        <motion.div
          className="font-tech flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-cyan transition-all duration-300 shadow-lg shadow-neon-purple/50 hover:shadow-neon-cyan/50"
            data-testid="button-explore-courses"
            onClick={scrollToCourses}
            onMouseEnter={() => play("hover")}
          >
            <Zap className="w-5 h-5 mr-2" />
            Explore Courses
          </Button>

          <Link href="/bmlab" target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 border-2 hover:border-neon-purple hover:text-white transition-all duration-300 shadow-lg shadow-neon-purple/50 hover:shadow-neon-purple/50"
            data-testid="button-watch-demo"
            onMouseEnter={() => play("hover")}
          >
            BlackMonkey Lab<ArrowRightIcon className="h-5 w-5" />
          </Button>
          </Link>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          data-testid="button-scroll-indicator"
        >
          <button
            onClick={scrollToCourses}
            className="animate-bounce text-muted-foreground hover:text-foreground transition-colors bg-transparent border-0 p-0"
            aria-label="Scroll to courses"
          >
            <ChevronDown size={42} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
