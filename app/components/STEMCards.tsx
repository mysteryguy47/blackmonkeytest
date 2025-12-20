import { motion } from "framer-motion";
import { FlaskConical, Cpu, Wrench, Calculator } from "lucide-react";
import { useSound } from "@/hooks/use-sound";

const stemItems = [
  {
    icon: FlaskConical,
    title: "Science",
    subtitle: "Explore Nature",
    description: "Discover the laws of physics, chemistry, and biology through hands-on experiments.",
    color: "rgb(168, 85, 247)",
    gradient: "from-purple-600/20 to-purple-600/5",
  },
  {
    icon: Cpu,
    title: "Technology",
    subtitle: "Build Digital",
    description: "Master circuits, programming, and digital systems to create innovative solutions.",
    color: "rgb(34, 211, 238)",
    gradient: "from-cyan-600/20 to-cyan-600/5",
  },
  {
    icon: Wrench,
    title: "Engineering",
    subtitle: "Create Solutions",
    description: "Design and build mechanical systems, robots, and IoT devices that solve real problems.",
    color: "rgb(236, 72, 153)",
    gradient: "from-pink-600/20 to-pink-600/5",
  },
  {
    icon: Calculator,
    title: "Mathematics",
    subtitle: "Understand Logic",
    description: "Apply mathematical thinking to solve complex problems and model real-world phenomena.",
    color: "rgb(34, 197, 94)",
    gradient: "from-green-600/20 to-green-600/5",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function STEMCards() {
  const { play } = useSound();

  return (
    <section className="relative py-20 overflow-hidden">


      <div className="max-w-7xl mx-auto px-6 relative z-10 font-tech">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="font-display font-bold mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="font-tech"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1 }}
            >
          <h2 className="font-display font-bold mb-6" style={{fontSize: 'clamp(2.5rem, 5vw, 3.75rem)'}} data-testid="text-courses-title">
            <span className="text-foreground font-tech">Unlock Your </span>
            <span className="font-tech bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
              Child's Potential
            </span>
          </h2>
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-mono whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            STEM isn’t just four subjects — it’s the language of the future.
          </motion.p>
        </motion.div>

        {/* STEM Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stemItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br ${item.gradient} p-8 h-full backdrop-blur-sm transition-all duration-500 hover:border-slate-600`}
                  style={{
                    boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 0 20px 0 ${item.color}00`,
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: item.color }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0, 0.15, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    initial={false}
                  />

                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-xl backdrop-blur-sm"
                      style={{
                        background: `${item.color}20`,
                        border: `2px solid ${item.color}40`,
                      }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Icon className="w-8 h-8" style={{ color: item.color }} />
                    </motion.div>

                    {/* Text */}
                    <div>
                      <motion.p
                        className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        {item.subtitle}
                      </motion.p>

                      <motion.h3
                        className="text-2xl font-display font-bold text-foreground mb-3"
                        style={{ color: item.color }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                      >
                        {item.title}
                      </motion.h3>

                      <motion.p
                        className="text-sm leading-relaxed text-muted-foreground"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      >
                        {item.description}
                      </motion.p>
                    </div>

                    {/* Animated accent line */}
                    <motion.div
                      className="h-1 rounded-full mt-4"
                      style={{ background: item.color }}
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: "100%", opacity: 0.5 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
