import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sound";
import { useRef } from 'react';
import Link from "next/link";
import { Trophy, Target, Zap, Star, Award, Gamepad2, ArrowRightIcon } from "lucide-react";

export function GamifiedLab() {
  const features = [
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Unlock badges, earn points, compete on leaderboards",
    },
    {
      icon: Target,
      title: "Personalized Challenges",
      description: "AI-powered tasks that adapt to your skill level",
    },
    {
      icon: Zap,
      title: "Live Progress Tracking",
      description: "See your growth in real-time with detailed analytics",
    },
    {
      icon: Award,
      title: "Skill Trees",
      description: "Visual progression paths from beginner to expert",
    },
  ];
  
    const { play } = useSound();
    const containerRef = useRef(null);
    const scrollToCourses = () => {
    const coursesSection = document.getElementById("courses");
    coursesSection?.scrollIntoView({ behavior: "smooth" });
    play("click");
    }
  return (
    <section id="lab" className="relative py-32 translate-y-[-1rem] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-tech font-display font-bold mb-6" style={{fontSize: 'clamp(2.5rem, 5vw, 3.75rem)'}} data-testid="text-lab-title">
            <span className="text-foreground">The </span>
            <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
              BlackMonkey Lab
            </span>
          </h2>
          <p className="font-mono text-xl text-muted-foreground max-w-1xl mx-auto" data-testid="text-lab-subtitle">
            Our gamified learning platform makes education feel like the best video game you've ever played.
          </p>
        </motion.div>

        <div className="font-mono grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative p-12 rounded-3xl border-2 border-neon-purple/30 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-cyan/10 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-neon-purple/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-neon-cyan/20 rounded-full blur-3xl" />
              </div>

              <div className="relative space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-neon-purple/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Level 12</p>
                      <p className="font-semibold text-foreground">Circuit Master</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-neon-purple">2,847</div>
                </div>

                <div className="p-4 rounded-xl bg-card/50 border border-neon-cyan/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">Progress to Next Level</p>
                    <p className="text-sm text-neon-cyan">73%</p>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                      initial={{ width: 0 }}
                      whileInView={{ width: "73%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[Trophy, Target, Gamepad2].map((Icon, i) => (
                    <motion.div
                      key={i}
                      className="p-4 rounded-xl bg-card/50 border border-neon-pink/30 flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Icon className="w-8 h-8 text-neon-pink mb-2" />
                      <p className="text-xs text-muted-foreground">Badge {i + 1}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-4"
                data-testid={`card-lab-feature-${index}`}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 border border-neon-purple/30 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-neon-purple" data-testid={`icon-lab-feature-${index}`} />
                </div>
                <div>
                  <h3 className="font-tech text-xl font-display font-bold text-foreground mb-2" data-testid={`text-lab-feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="font-mono text-muted-foreground leading-relaxed" data-testid={`text-lab-feature-desc-${index}`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}

          <motion.div
          className="font-tech flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          >
          <Link href="/bmlab" target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 border-2 hover:border-neon-purple hover:text-neon-purple transition-all duration-300"
            data-testid="button-watch-demo"
            onMouseEnter={() => play("hover")}
            >
            BlackMonkey Lab<ArrowRightIcon className="h-5 w-5" />
          </Button>
          </Link>
          </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
