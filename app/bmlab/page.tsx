'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightCircle, ArrowRightCircleIcon, ArrowRightIcon, ArrowRightToLine, ChevronDown, Sparkles, Zap } from "lucide-react";
import { useSound } from "@/hooks/use-sound";
import { ArrowUp } from "lucide-react";
import { useRef } from 'react';
import Link from "next/link";

export default function AboutPage() {
    return (
<section
  className="font-tech relative min-h-screen flex items-center justify-center z-[999999] overflow-hidden pt-20 font-mono"
  id="bmlab"
>
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="text-center"
  >
    <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
      COMING SOON
    </h1>

    <p className="mt-4 text-lg md:text-xl text-white/60 font-light tracking-wide">
      The BlackMonkey Lab is under construction 🛠️
    </p>
  </motion.div>
</section>

    );
  }
  