"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Animated Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-neon-purple/20 rounded-full blur-2xl" />
            <Wrench className="w-24 h-24 text-neon-purple relative z-10" />
          </div>
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          We're Making Things Better
        </h1>

        <p className="text-xl text-muted-foreground mb-2">
          Scheduled Maintenance in Progress
        </p>

        <p className="text-base text-muted-foreground/80 mb-8 max-w-md mx-auto">
          We're currently performing scheduled maintenance to improve your experience. 
          We'll be back online shortly. Thank you for your patience!
        </p>

        {/* Contact Info */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
          <Mail className="w-4 h-4" />
          <span>Need immediate assistance? Contact us at</span>
          <a 
            href="mailto:ignite@blackmonkey.in" 
            className="text-neon-purple hover:text-neon-cyan transition-colors"
          >
            ignite@blackmonkey.in
          </a>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="px-8 py-6 rounded-xl font-semibold"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Estimated Time */}
        <motion.p
          className="text-xs text-muted-foreground/60 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Estimated completion: Soon
        </motion.p>
      </motion.div>
    </div>
  );
}

