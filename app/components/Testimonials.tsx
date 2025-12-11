import { motion } from "framer-motion";
import { testimonialsData } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="relative py-20 overflow-hidden">


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold mb-6" style={{fontSize: 'clamp(2.5rem, 5vw, 3.75rem)'}} data-testid="text-testimonials-title">
            <span className="font-tech bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
              Real Stories
            </span>
            <span className="font-tech text-foreground"> From Real Families</span>
          </h2>
          <p className="font-mono text-xl text-muted-foreground max-w-1xl mx-auto" data-testid="text-testimonials-subtitle">
            Don't take our word for it. Here's what our students and parents have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="p-8 border-2 border-border hover:border-neon-purple/50 transition-all duration-500 h-full flex flex-col bg-card/50 backdrop-blur-sm"
                data-testid={`card-testimonial-${testimonial.id}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-neon-purple text-neon-purple" />
                  ))}
                </div>

                <blockquote className="text-foreground text-base leading-relaxed mb-6 flex-1" data-testid={`text-testimonial-content-${testimonial.id}`}>
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white font-bold" data-testid={`img-testimonial-avatar-${testimonial.id}`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" data-testid={`text-testimonial-name-${testimonial.id}`}>{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${testimonial.id}`}>{testimonial.role}</p>
                    <p className="text-xs text-neon-purple mt-1 font-mono" data-testid={`text-testimonial-course-${testimonial.id}`}>
                      {testimonial.course} Course
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
