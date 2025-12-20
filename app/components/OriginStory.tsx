import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Rocket, Users, Trophy, Heart } from "lucide-react";

export function OriginStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const storySteps = [
    {
      icon: Sparkles,
      title: "The Spark",
      description:
        "It started with a curious kid and a broken robot. We saw the frustration when traditional education couldn't keep up with their imagination. That's when BlackMonkey was born.",
      color: "rgb(168, 85, 247)",
    },
    {
      icon: Rocket,
      title: "The Launch",
      description:
        "We built our first lab in a garage with recycled electronics and endless passion. Five students, one teacher, infinite possibilities. The results? Mind-blowing projects and parents asking for more.",
      color: "rgb(34, 211, 238)",
    },
    {
      icon: Users,
      title: "The Movement",
      description:
        "Word spread. Kids became mentors. Parents became believers. What started as a tiny experiment grew into a revolution. We're not just teaching STEM—we're raising the next generation of innovators.",
      color: "rgb(236, 72, 153)",
    },
    {
      icon: Trophy,
      title: "The Future",
      description:
        "Today, BlackMonkey alumni are building startups, winning competitions, and changing the world. But we're just getting started. Every child deserves to feel the thrill of creation. Join us.",
      color: "rgb(34, 197, 94)",
    },
  ];

  return (
    <section id="story" ref={containerRef} className="relative py-20 overflow-hidden">
      {/* BLACKMONKEY faded background text with subtle red heart - positioned near "The Future" */}
      <div className="absolute bottom-0 left-5 text-[9rem] sm:text-[10rem] font-tech font-bold text-foreground/[0.08] select-none pointer-events-none translate-x-[-0.5rem] translate-y-[-7rem] leading-[0.8]">
        <div className="flex items-center gap-3">
          <span>BLACK</span>
          <motion.span
            className="inline-flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
            }}
          >
            <Heart className="w-[8rem] h-[8rem] sm:w-[9rem] sm:h-[9rem] fill-red-500/35 text-red-500/25" style={{ filter: 'drop-shadow(0 0 2px rgba(239, 68, 68, 0.2))' }} />
          </motion.span>
        </div>
        <div>MONKEY</div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 
            className="font-display font-bold mb-6 bg-clip-text text-transparent" 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              backgroundImage: 'linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            data-testid="text-story-title"
          >
            <span className="font-tech">Our Origin Story</span>
          </h2>
          <p className="font-mono text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-story-subtitle">
            From a garage experiment to a STEM revolution. <br></br>
            This is how we're changing education forever.
          </p>
        </motion.div>

        <div className="space-y-24">
          {storySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="flex-1">
                <motion.div
                  className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                    border: `2px solid ${step.color}40`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="w-12 h-12" style={{ color: step.color }} />
                </motion.div>
                <h3 className="font-tech text-5xl font-display font-bold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="font-mono text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="flex-1 relative">
                <motion.div
                  className="w-full h-64 rounded-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}15, transparent)`,
                    border: `1px solid ${step.color}30`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.title !== "The Future" && (
                    <div className="w-full h-full flex items-center justify-center text-8xl opacity-10">
                      <step.icon className="w-32 h-32" style={{ color: step.color }} />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
