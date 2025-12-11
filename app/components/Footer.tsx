"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
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
      { label: "Shunya - Paper Circuits", path: "/course/shunya" },
      { label: "Chakra - Robotics", path: "/course/chakra" },
      { label: "Yantra - IoT", path: "/course/yantra" },
      { label: "Ananta - Advanced IoT", path: "/course/ananta" },
      { label: "Garuda - Drones", path: "/course/garuda" },
    ],
    company: [
      { label: "About Us", path: "/#story" },
      { label: "Why Choose Us", path: "/#why-us" },
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
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-card/30 border-t border-border backdrop-blur-sm overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
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
                <span>info@blackmonkey.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neon-purple" />
                <span>+91 - 9718325064</span>
              </div>
              
            </div>
          </div>

          <div>
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

          <div>
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

          <div>
            <h4 className="font-tech font-semibold text-foreground mb-6">Stay Updated</h4>
            <p className="font-mono text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and exclusive content.
            </p>
            {/* Scroll To Top Button */}
<Button1
  onClick={scrollToTop}
  size="icon"
  variant="outline"
  className="fixed bottom-40 right-0 z-50 rounded-full shadow-[0_0_20px_5px_rgba(0,255,255,0.7) glass-card neon-glow-cyan shadow-lg backdrop-blur-md"
  data-testid="button-scroll-top"
>
  <ArrowUp className="h-5 w-5" />
</Button1>
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
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="font-mono text-xs text-muted-foreground flex items-center justify-between w-full gap-20">
               <p>© 2025 BlackMonkey™. All rights reserved.</p>
                        <p className="font-mono text-xs text-muted-foreground flex items-center gap-2">
              Crafted with{" "}
              <Heart className="h-3 w-3 text-primary fill-primary animate-pulse" />{" "}
              using NextJS + TypeScript
                </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-terms">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-cookies">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>


    </footer>
  );
}
