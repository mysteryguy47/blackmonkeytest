"use client";

import { useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Hero } from "@/components/Hero";
import { STEMCards } from "@/components/STEMCards";
import { CoursesSection } from "@/components/CoursesSection";
import { OriginStory } from "@/components/OriginStory";
import { Testimonials } from "@/components/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { GamifiedLab } from "@/components/GamifiedLab";
import { Footer } from "@/components/Footer";
import { AdvancedModal } from "@/components/AdvancedModal";
import { type Course } from "@shared/schema";
import { Manifesto } from "@/components/Manifesto";
import DarkVeil from "@/components/DarkVeil";
import Nav from "@/components/Nav";
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import ScrollRestoration from "./scroll-restoration";
import CheckoutButton from "@/components/CheckoutButton";

export default function HomePage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <CheckoutButton />
          <ScrollStack>
            <ScrollStackItem>
              <h2>Card 1</h2>
              <p>This is the first card in the stack</p>
            </ScrollStackItem>
            <ScrollStackItem>
              <h2>Card 2</h2>
              <p>This is the second card in the stack</p>
            </ScrollStackItem>
            <ScrollStackItem>
              <h2>Card 3</h2>
              <p>This is the third card in the stack</p>
            </ScrollStackItem>
          </ScrollStack>
          <STEMCards />
          <CoursesSection onCourseSelect={handleCourseSelect} />
          <OriginStory />
          <Testimonials />
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



