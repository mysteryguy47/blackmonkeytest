import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import type { TestimonialBM1 } from '@shared/schema';

const fallbackTestimonials: TestimonialBM1[] = [
  {
    id: '1',
    name: 'Aisha Patel',
    role: 'Parent, Mumbai',
    content: 'My daughter went from curious to creator in just weeks. BlackMonkey didn\'t teach her STEM—it unleashed her imagination.',
    order: 1,
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    role: 'Educator, Singapore',
    content: 'This isn\'t education. It\'s transformation. I\'ve never seen students so engaged, so excited to build and experiment.',
    order: 2,
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Student, Age 14',
    content: 'I built a drone that actually flies. I coded a smart home system. BlackMonkey made me feel like an innovator, not just a student.',
    order: 3,
  },
];

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const { data: testimonialsBM1 = fallbackTestimonials } = useQuery<TestimonialBM1[]>({
    queryKey: ['/api/testimonials'],
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonialsBM1.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonialsBM1.length]);

  return (
    <section className="py-32 md:py-40 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-5xl md:text-6xl font-black mb-4 neon-glow-purple font-tech bg-clip-text text-transparent" 
            style={{
              backgroundImage: 'linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            data-testid="text-testimonials-heading"
          >
            Voices of the Revolution
          </h2>
        </motion.div>

        <div className="relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
              data-testid={`testimonial-${current}`}
            >
              <div className="mb-12">
                <p className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground/90 leading-relaxed italic mb-10 px-4" data-testid="text-testimonial-content">
                  "{testimonialsBM1[current].content}"
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-2xl md:text-3xl font-bold neon-glow-cyan" style={{ fontFamily: 'Space Grotesk, sans-serif' }} data-testid="text-testimonial-name">
                  {testimonialsBM1[current].name}
                </p>
                <p className="text-base md:text-lg text-muted-foreground" data-testid="text-testimonial-role">
                  {testimonialsBM1[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonialsBM1.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-neon-cyan w-8 shadow-lg shadow-neon-cyan/50'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              data-testid={`button-testimonial-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
