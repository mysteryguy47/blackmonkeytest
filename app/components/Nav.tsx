'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import './Nav.css';
import Image from "next/image";

const Nav = () => {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Smart link behavior:
  // If on homepage → scroll to #home
  // If on another page → navigate to "/"
  const logoLink = isHomePage ? "#home" : "/";

  // Helper function to get the correct link path
  const getNavLink = (item: string) => {
    // Map "Why Us" to "whyus" (the actual section ID)
    const sectionMap: Record<string, string> = {
      'home': 'home',
      'courses': 'courses',
      'story': 'story',
      'why us': 'whyus'
    };
    const sectionId = sectionMap[item.toLowerCase()] || item.toLowerCase().replace(' ', '');
    const hashLink = `#${sectionId}`;
    // If on home page, use hash link. If on another page, navigate to home page with hash
    return isHomePage ? hashLink : `/${hashLink}`;
  };

  // Handle navigation to hash sections when coming from another page
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [isHomePage]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShow(current < lastScroll || current < 10);
      setLastScroll(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        className="bm-navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: show ? 0 : -80,
          opacity: show ? 1 : 0,
          transition: { duration: 0.4, ease: 'easeOut' }
        }}
      >
        <div className="bm-left flex items-center gap-2">
          
          {/* SMART LOGO + TEXT LINK */}
          <Link href={logoLink} className="flex items-center gap-2">
            <Image 
              src="/logo.png"
              alt="BlackMonkey Logo"
              width={32}
              height={32}
              className="logo-img"
            />

            <span className="bm-logo">
              BlackMonkey
            </span>
          </Link>

        </div>

        {/* Desktop Menu */}
        <ul className="bm-navlist font-tech">
          {['Home', 'Courses', 'Story', 'Why Us'].map((item) => (
            <li key={item} className="bm-navitem">
              <Link href={getNavLink(item)}>{item}</Link>
              <span className="bm-underline"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="bm-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </motion.nav>

      {/* MOBILE DROPDOWN */}
      <motion.div
        className="bm-mobile-menu"
        initial={{ height: 0 }}
        animate={{
          height: mobileOpen ? 'auto' : 0,
          opacity: mobileOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {['Home', 'Courses', 'Story', 'Why Us'].map((item) => (
          <Link
            key={item}
            href={getNavLink(item)}
            className="bm-mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {item}
          </Link>
        ))}
      </motion.div>
    </>
  );
};

export default Nav;
