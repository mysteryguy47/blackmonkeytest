"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightCircle, ArrowRightCircleIcon, ArrowRightIcon, ArrowRightToLine, ChevronDown, Sparkles, Zap } from "lucide-react";
import { useSound } from "@/hooks/use-sound";
import { ArrowUp } from "lucide-react";
import { useRef, useState, useEffect } from 'react';
import VariableProximity from './VariableProximity';
import Link from "next/link";
import StarBorder from "@/components/StarBorder";

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
    <section className="font-tech relative min-h-screen flex items-center justify-center overflow-x-hidden overflow-y-visible pt-20 font-mono" id="home">
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center overflow-x-visible overflow-y-visible"
      style={{
        marginTop:50,
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
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
          className="font-display font-extrabold mb-6 leading-tight bg-clip-text text-transparent"
          style={{
            fontSize: 'clamp(2rem, 8vw, 6rem)',
            backgroundImage: 'linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            overflow: 'visible',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="text-hero-title"
        >
          <span className="font-satoshi font-light block">
            Ignite Curiosity.
          </span>
          <span className="font-tech block whitespace-nowrap" style={{ overflow: 'visible', width: 'fit-content', margin: '0 auto', display: 'block' }}>Build Their Future.</span>
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
            className="text-lg font-semibold px-6 !h-14 !min-h-14 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-cyan transition-all duration-300 shadow-md shadow-neon-purple/20 hover:shadow-lg hover:shadow-neon-cyan/30 hover:scale-[1.02] active:scale-[0.98] border-0 !text-white"
            data-testid="button-explore-courses"
            onClick={scrollToCourses}
            onMouseEnter={() => play("hover")}
          >
            <Zap className="w-5 h-5" />
            <span>Explore Courses</span>
          </Button>

          <StarBorder 
            as="a" 
            href="/bmlab" 
            target="_blank" 
            rel="noopener noreferrer"
            color="#c59915" 
            speed="5s" 
            thickness={2}
            className="cursor-pointer inline-flex items-center group transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]" 
            contentClassName="text-lg font-semibold px-6 !h-14 !bg-gradient-to-br !from-slate-900/95 !to-slate-800/95 !text-white !border-0 hover:!text-white transition-all duration-300 !shadow-none !flex !items-center !justify-center !gap-2.5 backdrop-blur-md rounded-xl"
            onMouseEnter={() => play("hover")}
          >
            <span className="whitespace-nowrap">BlackMonkey Lab</span>
            <ArrowRightIcon className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1.5 group-hover:scale-110" />
          </StarBorder>
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
