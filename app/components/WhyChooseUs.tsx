import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { statsData } from "@shared/schema";
import { Users, Rocket, TrendingUp, Heart } from "lucide-react";

const iconMap: Record<string, any> = {
  Users,
  Rocket,
  TrendingUp,
  Heart,
};

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [count, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toLocaleString() + suffix;
      }
    });

    return () => unsubscribe();
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Hands-On Learning",
      description: "No boring lectures. Every class is 80% building, 20% theory. Learn by doing, fail forward, and create real projects you can show off.",
      gradient: "from-neon-purple to-neon-pink",
    },
    {
      title: "Expert Mentors",
      description: "Our instructors aren't just teachers—they're makers, engineers, and innovators who've built real products. They speak your language.",
      gradient: "from-neon-cyan to-neon-purple",
    },
    {
      title: "Gamified Progress",
      description: "Track achievements, unlock badges, level up your skills. Our lab makes learning addictive in the best way possible.",
      gradient: "from-neon-pink to-neon-cyan",
    },
    {
      title: "Small Batches",
      description: "Max 8 students per batch. Every kid gets personalized attention, custom challenges, and the support they need to excel.",
      gradient: "from-green-400 to-neon-cyan",
    },
  ];

  return (
    <section id="whyus" className="relative py-20 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-display font-bold mb-6" style={{fontSize: 'clamp(2.5rem, 5vw, 3.75rem)'}} data-testid="text-why-us-title">
            <span className="font-tech text-foreground">Why </span>
            <span className="font-tech bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
              BlackMonkey?
            </span>
          </h2>
          <p className="font-mono text-xl text-muted-foreground max-w-1xl mx-auto" data-testid="text-why-us-subtitle">
            We're not your typical STEM program.<br></br> We're unhinged, innovative, and obsessed with results.
          </p>
        </motion.div>

        <div className="font-tech grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {statsData.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
                data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 border border-neon-purple/30 flex items-center justify-center">
                    {Icon && <Icon className="w-8 h-8 text-neon-purple" data-testid={`icon-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`} />}
                  </div>
                </div>
                <motion.div
                  className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2"
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  data-testid={`text-stat-value-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </motion.div>
                <p className="text-sm text-muted-foreground" data-testid={`text-stat-label-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="font-mono grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.05, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl border-2 border-border hover:border-transparent transition-all duration-500 bg-card/50 backdrop-blur-sm relative overflow-hidden group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              <h3 className="font-tech text-2xl font-display font-bold text-foreground mb-4">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
