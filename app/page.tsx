"use client";

import { useState, useEffect } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Hero } from "@/components/Hero";
import { STEMCards } from "@/components/STEMCards";
import { CoursesSection } from "@/components/CoursesSection";
import { OriginStory } from "@/components/OriginStory";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { GamifiedLab } from "@/components/GamifiedLab";
import { Footer } from "@/components/Footer";
import { AdvancedModal } from "@/components/AdvancedModal";
import { type Course } from "@shared/schema";
import { Manifesto } from "@/components/Manifesto";
import DarkVeil from "@/components/DarkVeil";
import Nav from "@/components/Nav";
import ScrollRestoration from "./scroll-restoration";
import { TestimonialSlider } from "./components/TestimonialSlider";

export default function HomePage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ensure page scrolls to top on mount/refresh
  useEffect(() => {
    // Clear any hash from URL
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also scroll after render to ensure it works
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };


    // <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
    //   <CustomCursor />
    //   <div
    //     className="glass-container"
    //     style={{ width: "100vw", height: "100vh", position: "fixed" }}
    //   >
    //     <DarkVeil />
    //   </div>
    //   <Nav />
    //   <ParticleBackground />
      
    return (
      <div>
        <ScrollRestoration />   {/* ← Add here */}
    
        <main className="relative z-10">
          <Hero />
          <Manifesto />
          <STEMCards />
          <CoursesSection onCourseSelect={handleCourseSelect} />
          <OriginStory />
          <TestimonialSlider />
          <WhyChooseUs />
          <GamifiedLab />
        </main>
    
        <AdvancedModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
    
}



