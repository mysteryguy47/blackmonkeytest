"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, Star, Crown, TrendingUp, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSound } from "@/hooks/use-sound";

export function LabPreview() {
  const { data: session } = useSession();
  const router = useRouter();
  const { play } = useSound();

  const handleEnterLab = () => {
    play("click");
    if (session) {
      router.push("/bmlab");
    } else {
      router.push("/dev/login?callbackUrl=/bmlab");
    }
  };

  // Mock progress data - in real app, fetch from API
  // This shows "Level 3: Circuit Master" as requested
  const userProgress = {
    level: 3,
    title: "Circuit Master",
    xp: 2847,
    nextLevelXp: 3500,
    progress: 73,
    badges: [
      { icon: Trophy, title: "First Project", unlocked: true, color: "from-yellow-400 to-orange-500" },
      { icon: Zap, title: "Speed Builder", unlocked: true, color: "from-blue-400 to-cyan-500" },
      { icon: Star, title: "Perfect Code", unlocked: true, color: "from-purple-400 to-pink-500" },
      { icon: Crown, title: "Lab Master", unlocked: false, color: "from-amber-400 to-yellow-500" },
    ],
    streak: 7,
    rank: 47,
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple/20 via-neon-pink/20 to-neon-cyan/20 border border-neon-purple/30 mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Zap className="w-4 h-4 text-neon-purple" />
            <span className="text-sm font-semibold text-foreground">Your Progress</span>
          </motion.div>
          <h2 
            className="font-display font-bold mb-4 bg-clip-text text-transparent" 
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              backgroundImage: 'linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Track Your Child's Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See real-time progress, achievements, and growth. Parents love seeing their child excel.
          </p>
        </motion.div>

        {/* Premium Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl border-2 border-border/50 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-cyan/10 opacity-50" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Header with Level Badge */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div className="flex items-center gap-6">
                  <motion.div
                    className="relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  >
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan flex items-center justify-center shadow-2xl shadow-neon-purple/50 border-2 border-white/20">
                      <span className="text-4xl font-bold text-white">{userProgress.level}</span>
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Current Level</p>
                    <h3 className="text-3xl font-bold text-foreground mb-2">{userProgress.title}</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-lg font-bold text-foreground">{userProgress.xp.toLocaleString()} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-muted-foreground">Rank #{userProgress.rank}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={handleEnterLab}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-cyan text-white font-semibold flex items-center gap-2 shadow-lg shadow-neon-purple/30 hover:shadow-xl hover:shadow-neon-purple/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enter Lab
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Progress to Level {userProgress.level + 1}</span>
                  <span className="text-sm font-bold text-neon-cyan">{userProgress.progress}%</span>
                </div>
                <div className="relative h-4 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${userProgress.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{userProgress.xp.toLocaleString()} / {userProgress.nextLevelXp.toLocaleString()} XP</span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    {userProgress.streak} day streak
                  </span>
                </div>
              </div>

              {/* Badges Grid */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Recent Achievements
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userProgress.badges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className={`relative aspect-square rounded-xl bg-gradient-to-br ${badge.color} p-4 flex flex-col items-center justify-center border-2 ${
                        badge.unlocked ? 'border-white/30 shadow-lg' : 'border-slate-600/50 opacity-50'
                      } transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: badge.unlocked ? 5 : 0 }}
                    >
                      {badge.unlocked ? (
                        <>
                          <badge.icon className="w-8 h-8 text-white mb-2" />
                          <p className="text-xs font-bold text-white text-center leading-tight">{badge.title}</p>
                          <motion.div
                            className="absolute -top-1 -right-1"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                          >
                            <CheckCircle2 className="w-4 h-4 text-white fill-white" />
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <Lock className="w-6 h-6 text-white/50 mb-2" />
                          <p className="text-xs font-bold text-white/50 text-center leading-tight">{badge.title}</p>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}

