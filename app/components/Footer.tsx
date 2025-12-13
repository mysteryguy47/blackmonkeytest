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

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="flex flex-col w-full min-w-0">
            <h3 className="font-display text-2xl font-bold mb-6">
              <span className="font-tech bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
                Black
              </span>
              <span className="font-tech text-foreground">Monkey</span>
            </h3>
            <p className="font-mono text-muted-foreground mb-6 leading-relaxed">
              Next-gen STEM education that transforms curious kids into confident creators.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neon-purple" />
                <span>Gurgaon, Haryana, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neon-purple" />
                <span>ignite@blackmonkey.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neon-purple" />
                <span>+91 - 9718325064</span>
              </div>
              
            </div>
          </div>

          <div className="flex flex-col w-full min-w-0">
            <h4 className="font-tech font-semibold text-foreground mb-6">Courses</h4>
            <ul className="font-mono space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <button className="text-sm text-muted-foreground hover:text-neon-purple transition-colors text-left bg-transparent border-0 font-mono p-0" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link.label}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col w-full min-w-0">
            <h4 className="font-tech font-semibold text-foreground mb-6">Company</h4>
            <ul className="font-mono space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <button className="text-sm text-muted-foreground hover:text-neon-purple transition-colors text-left bg-transparent border-0 font-mono p-0" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link.label}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col w-full min-w-0">
            <h4 className="font-tech font-semibold text-foreground mb-6">Legal</h4>
            <ul className="font-mono space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-neon-purple transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-neon-purple transition-colors" data-testid="link-footer-terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refunds-cancellations" className="text-sm text-muted-foreground hover:text-neon-purple transition-colors" data-testid="link-footer-refunds">
                  Refunds &amp; Cancellations
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-neon-purple transition-colors" data-testid="link-footer-cookies">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-full min-w-0">
            <h4 className="font-tech font-semibold text-foreground mb-6">Stay Updated</h4>
            <p className="font-mono text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and exclusive content.
            </p>
            <div className="font-mono flex gap-2 mb-6">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button variant="default" className="font-mono bg-gradient-to-r from-neon-purple to-neon-pink" data-testid="button-newsletter-subscribe">
                Join
              </Button>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all duration-300"
                  style={{
                    boxShadow: `0 0 8px ${social.color}40, inset 0 0 4px ${social.color}20`,
                    border: `1px solid ${social.color}50`,
                    background: `radial-gradient(circle at 30% 30%, ${social.color}15, transparent 55%)`,
                  }}
                  whileHover={{
                    scale: 1.15,
                    boxShadow: [
                      `0 0 10px ${social.color}40`,
                      `0 0 20px ${social.color}60`,
                      `0 0 30px ${social.color}80`,
                    ],
                  }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon
                    className="w-5 h-5"
                    style={{ color: social.color, filter: "drop-shadow(0 0 6px rgba(255,255,255,0.35))" }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border relative">
          <div className="font-mono text-xs text-muted-foreground flex items-center justify-between w-full gap-20">
               <p>© 2025 BlackMonkey™. All rights reserved.</p>
                        <p className="font-mono text-xs text-muted-foreground flex items-center gap-2">
              Crafted with{" "}
              <Heart className="h-3 w-3 text-primary fill-primary animate-pulse" />{" "}
              using NextJS + TypeScript
                </p>
          </div>
        </div>
      </div>

      {/* Scroll To Top Button - Positioned just above Stay Updated section */}
      <div className="absolute top-16 right-48">
        <Button1
          onClick={scrollToTop}
          size="icon"
          variant="outline"
          className="rounded-full shadow-[0_0_20px_5px_rgba(0,255,255,0.7)] glass-card neon-glow-cyan backdrop-blur-md"
          data-testid="button-scroll-top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button1>
      </div>
    </footer>
  );
}
