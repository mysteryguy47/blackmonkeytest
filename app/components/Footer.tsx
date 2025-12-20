"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Mail, MapPin, Phone, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Button1 } from "@/components/ui/button1";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";


export function Footer() {
  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const footerLinks = {
    courses: [
      { label: "Shunya - Paper Circuits", path: "/courses/shunya" },
      { label: "Chakra - Robotics", path: "/courses/chakra" },
      { label: "Yantra - IoT", path: "/courses/yantra" },
      { label: "Ananta - Advanced IoT", path: "/courses/ananta" },
      { label: "Garuda - Drones", path: "/courses/garuda" },
    ],
    company: [
      { label: "About Us", path: "/#story" },
      { label: "Why Choose Us", path: "/#whyus" },
      { label: "The Lab", path: "/#lab" },
      { label: "Testimonials", path: "/#testimonials" },
    ],
    resources: [
      { label: "Blog", path: "#" },
      { label: "Projects Gallery", path: "#" },
      { label: "FAQs", path: "#" },
      { label: "Careers", path: "#" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/blackmonkey.ai/?utm_source=ig_web_button_share_sheet", label: "Instagram", color: "rgb(225, 48, 108)" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/blackmonkeyx/", label: "LinkedIn", color: "rgb(40, 103, 178)" },
    { icon: Youtube, href: "#", label: "YouTube", color: "rgb(255, 0, 0)" },
  ];

  return (
    <footer className="relative bg-card/30 border-t border-border backdrop-blur-sm overflow-visible">
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="w-full px-6 md:px-8 lg:px-12 pt-8 pb-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-6">
          <div className="col-span-2 md:col-span-1 lg:col-span-2 flex flex-col">
            <h3 
              className="font-display text-xl font-bold mb-3 bg-clip-text text-transparent" 
              style={{
                backgroundImage: 'linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <span className="font-tech">BlackMonkey</span>
            </h3>
            <p className="font-mono text-xs text-muted-foreground mb-4 leading-relaxed">
              Next-gen STEM education that transforms curious kids into confident creators.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:bg-muted"
                  style={{
                    boxShadow: `0 0 6px ${social.color}30`,
                    border: `1px solid ${social.color}30`,
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 12px ${social.color}50`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon
                    className="w-4 h-4"
                    style={{ color: social.color }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-tech font-semibold text-sm text-foreground mb-3">Courses</h4>
            <ul className="font-mono space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <button className="text-xs text-muted-foreground hover:text-neon-purple transition-colors text-left bg-transparent border-0 font-mono p-0" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link.label}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-tech font-semibold text-sm text-foreground mb-3">Company</h4>
            <ul className="font-mono space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <button className="text-xs text-muted-foreground hover:text-neon-purple transition-colors text-left bg-transparent border-0 font-mono p-0" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link.label}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-tech font-semibold text-sm text-foreground mb-3">Legal</h4>
            <ul className="font-mono space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-neon-purple transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-neon-purple transition-colors" data-testid="link-footer-terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refunds-cancellations" className="text-xs text-muted-foreground hover:text-neon-purple transition-colors" data-testid="link-footer-refunds">
                  Refunds &amp; Cancellations
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-xs text-muted-foreground hover:text-neon-purple transition-colors" data-testid="link-footer-cookies">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-1 flex flex-col">
            <h4 className="font-tech font-semibold text-sm text-foreground mb-3">Stay Updated</h4>
            <div className="font-mono flex gap-2 mb-3">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 h-8 text-xs"
                data-testid="input-newsletter-email"
              />
              <Button variant="default" size="sm" className="font-mono bg-gradient-to-r from-neon-purple to-neon-pink h-8 px-3 text-xs" data-testid="button-newsletter-subscribe">
                Join
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info - Horizontal Layout */}
        <div className="pt-4 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-neon-purple" />
                <span>+91 - 9718325064</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-neon-purple" />
                <span>ignite@blackmonkey.in</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-neon-purple" />
                <span>Gurgaon, Haryana, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Separating Line */}
        <div className="relative py-0">
          <div 
            className="h-px w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.3) 20%, rgba(236, 72, 153, 0.5) 50%, rgba(34, 211, 238, 0.3) 80%, transparent 100%)',
              boxShadow: '0 0 8px rgba(168, 85, 247, 0.2)',
            }}
          />
        </div>

        {/* Copyright */}
        <div className="pt-4 pb-2">
          <div className="font-mono text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© 2025 BlackMonkey™. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Crafted with{" "}
              <Heart className="h-3 w-3 text-primary fill-primary animate-pulse" />{" "}
              using NextJS + TypeScript
            </p>
          </div>
        </div>
      </div>

      {/* Scroll To Top Button - Fixed Position Bottom Right */}
      <div className="fixed bottom-16 right-6 md:bottom-20 md:right-8 z-50">
        <Button1
          onClick={scrollToTop}
          size="icon"
          variant="outline"
          className="rounded-full shadow-[0_0_20px_5px_rgba(0,255,255,0.7)] glass-card neon-glow-cyan backdrop-blur-md hover:scale-110 transition-transform"
          data-testid="button-scroll-top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button1>
      </div>
    </footer>
  );
}
