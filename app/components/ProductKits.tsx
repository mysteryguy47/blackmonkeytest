import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import type { STEMKit } from '@shared/schema';
import Image from 'next/image';

const kits: STEMKit[] = [
  {
    id: 'zero',
    name: 'ZERO',
    subtitle: 'The Spark Kit',
    price: '$49',
    image: { src: '/generated_images/zero_spark_kit_product.png' },
    description: 'Perfect for beginners. Ignite your STEM journey with foundational concepts.',
    features: [
      'Introduction to circuits and electricity',
      'LED projects and simple electronics',
      'Hands-on experiments with conductive materials',
      'Perfect for ages 8-10',
    ],
  },
  {
    id: 'chakra',
    name: 'CHAKRA',
    subtitle: 'The Builder Kit',
    price: '$99',
    image: { src: '/generated_images/chakra_builder_kit_product.png' },
    description: 'For intermediate creators. Build complex systems and understand mechanics.',
    features: [
      'Motorized projects and gear systems',
      'Sensor integration and automation',
      'Structural engineering principles',
      'Recommended for ages 10-13',
    ],
  },
  {
    id: 'surya',
    name: 'SURYA',
    subtitle: 'The Smart Maker Kit',
    price: '$149',
    image: { src: '/generated_images/surya_smart_maker_kit.png' },
    description: 'Advanced IoT and smart devices. Connect the physical and digital worlds.',
    features: [
      'Microcontroller programming',
      'IoT sensor integration',
      'Smart home automation projects',
      'Ideal for ages 13-15',
    ],
  },
  {
    id: 'tejas',
    name: 'TEJAS',
    subtitle: 'The Innovator Kit',
    price: '$199',
    image: { src: '/generated_images/tejas_innovator_kit_product.png' },
    description: 'Expert-level innovation. Create sophisticated systems and prototypes.',
    features: [
      'Advanced programming and AI concepts',
      'Complex circuit design',
      'Custom PCB creation',
      'For ages 15+',
    ],
  },
  {
    id: 'garuda',
    name: 'GARUDA',
    subtitle: 'The Aviator Kit',
    price: '$249',
    image: { src: '/generated_images/garuda_aviator_kit_product.png' },
    description: 'Master aerospace engineering. Build, program, and fly your own drones.',
    features: [
      'Drone assembly and flight mechanics',
      'Autonomous navigation systems',
      'Aerial photography and FPV',
      'For ages 14+',
    ],
  },
];

function ProductCard({ kit, index }: { kit: STEMKit; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      data-testid={`card-kit-${kit.id}`}
    >
      <div className="relative bg-card border border-card-border rounded-md overflow-hidden hover-elevate active-elevate-2 transition-all duration-500 hover:scale-[1.02]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative aspect-square overflow-hidden bg-black/50">
          <Image
            src={kit.image.src}
            alt={`${kit.name} - ${kit.subtitle}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-testid={`img-kit-${kit.id}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-4xl font-black neon-glow-cyan mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }} data-testid={`text-kit-name-${kit.id}`}>
              {kit.name}
            </h3>
            <p className="text-lg text-muted-foreground" data-testid={`text-kit-subtitle-${kit.id}`}>{kit.subtitle}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold neon-glow-purple" data-testid={`text-kit-price-${kit.id}`}>{kit.price}</span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors"
              data-testid={`button-toggle-details-${kit.id}`}
            >
              Details
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </div>

          <p className="text-foreground/90 mb-4" data-testid={`text-kit-description-${kit.id}`}>
            {kit.description}
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-card-border">
                  <h4 className="text-sm font-semibold mb-3 text-neon-blue" data-testid={`text-kit-features-heading-${kit.id}`}>Features:</h4>
                  <ul className="space-y-2">
                    {kit.features.map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2" data-testid={`text-kit-feature-${kit.id}-${idx}`}>
                        <span className="text-neon-cyan mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button className="w-full mt-4 px-6 py-3 bg-neon-cyan/10 border border-neon-cyan rounded-md text-neon-cyan font-semibold hover:bg-neon-cyan/20 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/30" data-testid={`button-add-cart-${kit.id}`}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductKits() {
  return (
    <section id="kits" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 neon-glow-purple" style={{ fontFamily: 'Space Grotesk, sans-serif' }} data-testid="text-kits-heading">
            STEM Product Line
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-kits-subtitle">
            From spark to flight. Choose your path to mastery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kits.map((kit, index) => (
            <ProductCard key={kit.id} kit={kit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
