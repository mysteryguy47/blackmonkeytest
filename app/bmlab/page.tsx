'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Trophy, Target, Zap, Star, Award, Gamepad2, ArrowRightIcon, Rocket, 
  Flame, Crown, TrendingUp, Users, Clock, CheckCircle2, BookOpen, 
  Puzzle, Brain, Code, Wrench, FlaskConical, Play, Lock, Unlock,
  ChevronRight, Medal, Gift, Coins, BarChart3, Activity, Eye, EyeOff,
  Sparkles, ArrowUp, Calendar
} from "lucide-react";
import { useSound } from "@/hooks/use-sound";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Helper component to render dynamic icons
function IconRenderer({ icon: Icon, className }: { icon: React.ComponentType<{ className?: string }> | undefined; className?: string }) {
  if (!Icon) return null;
  const IconComponent = Icon;
  return <IconComponent className={className} />;
}

export default function BMLabPage() {
  const { play } = useSound();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const [parentView, setParentView] = useState(false);

      // Simple redirect to login if not authenticated (no loops, no complex logic)
      useEffect(() => {
        // Only redirect if we're sure we're not loading and not authenticated
        if (status === "unauthenticated") {
          // Use window.location to do a full redirect and break any potential loops
          window.location.href = `/dev/login?callbackUrl=${encodeURIComponent(window.location.origin + "/bmlab")}`;
        }
      }, [status]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading BlackMonkey Lab...</p>
        </div>
      </div>
    );
  }

  // Show message if not authenticated (will redirect via useEffect)
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Only show content if authenticated
  if (status !== "authenticated" || !session) {
    return null;
  }

  const quests = [
    { 
      id: 1, 
      title: "Build Your First Circuit", 
      description: "Create a simple LED circuit and watch it glow!",
      xp: 150,
      difficulty: "Easy",
      icon: Zap,
      color: "bg-yellow-500",
      unlocked: true
    },
    { 
      id: 2, 
      title: "Code Your First Robot", 
      description: "Program a robot to follow a path",
      xp: 300,
      difficulty: "Medium",
      icon: Code,
      color: "bg-blue-500",
      unlocked: true
    },
    { 
      id: 3, 
      title: "Design a Smart Home", 
      description: "Connect IoT devices and automate your space",
      xp: 500,
      difficulty: "Hard",
      icon: Wrench,
      color: "bg-purple-500",
      unlocked: false
    },
    { 
      id: 4, 
      title: "Launch a Drone Mission", 
      description: "Control a drone and complete aerial challenges",
      xp: 750,
      difficulty: "Expert",
      icon: Rocket,
      color: "bg-red-500",
      unlocked: false
    },
  ];

  const achievements = [
    { icon: Trophy, title: "First Project", color: "bg-gradient-to-br from-yellow-400 to-orange-500", points: 100, unlocked: true },
    { icon: Zap, title: "Speed Builder", color: "bg-gradient-to-br from-blue-400 to-cyan-500", points: 250, unlocked: true },
    { icon: Star, title: "Perfect Code", color: "bg-gradient-to-br from-purple-400 to-pink-500", points: 500, unlocked: true },
    { icon: Crown, title: "Lab Master", color: "bg-gradient-to-br from-amber-400 to-yellow-500", points: 1000, unlocked: false },
    { icon: Rocket, title: "Innovator", color: "bg-gradient-to-br from-green-400 to-emerald-500", points: 750, unlocked: false },
    { icon: Flame, title: "Hot Streak", color: "bg-gradient-to-br from-red-400 to-orange-500", points: 300, unlocked: true },
  ];

  const skillTree = [
    { name: "Electronics", level: 8, maxLevel: 10, icon: Zap, color: "bg-yellow-500" },
    { name: "Programming", level: 6, maxLevel: 10, icon: Code, color: "bg-blue-500" },
    { name: "Robotics", level: 4, maxLevel: 10, icon: Wrench, color: "bg-purple-500" },
    { name: "IoT", level: 3, maxLevel: 10, icon: FlaskConical, color: "bg-green-500" },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex", xp: 5420, avatar: "👑" },
    { rank: 2, name: "Sam", xp: 4890, avatar: "🚀" },
    { rank: 3, name: "You", xp: 2847, avatar: "⭐", isYou: true },
    { rank: 4, name: "Maya", xp: 2650, avatar: "💫" },
    { rank: 5, name: "Rio", xp: 2400, avatar: "🎯" },
  ];

  return (
    <section
      className="font-tech relative min-h-screen overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #020617 0%, #0f172a 50%, #020617 100%)',
        backgroundColor: '#000000'
      }}
      id="bmlab"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-20">
        {/* Hero Section - Game Title Style with Parent View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative"
        >
          {/* Parent View Toggle */}
          <motion.button
            onClick={() => setParentView(!parentView)}
            className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:border-neon-purple/50 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {parentView ? (
              <>
                <EyeOff className="w-4 h-4 text-muted-foreground group-hover:text-neon-purple transition-colors" />
                <span className="text-sm font-medium text-foreground">Student View</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-muted-foreground group-hover:text-neon-purple transition-colors" />
                <span className="text-sm font-medium text-foreground">Parent View</span>
              </>
            )}
          </motion.button>

          <motion.div
            className="inline-block mb-6"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div className="text-8xl mb-4">🎮</div>
          </motion.div>
          <motion.h1
            className="font-display font-bold mb-6 text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="block mb-2">Welcome to</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              BlackMonkey Lab
            </span>
          </motion.h1>
          <motion.p
            className="font-mono text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {parentView 
              ? "Track your child's progress, achievements, and growth journey 📊"
              : "Level up your skills, complete quests, and become a STEM master! 🚀"
            }
          </motion.p>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Player Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border-2 border-slate-700 p-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  ⭐
                </motion.div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400 font-mono mb-1">Level 12</p>
                  <h3 className="text-xl font-bold text-white mb-1">Circuit Master</h3>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-bold font-mono">2,847 XP</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Progress to Next Level */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Progress to Level 13</span>
                    <span className="text-lg font-bold text-blue-400">73% Complete</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400 mb-1">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm font-bold">7 Day Streak!</span>
                    </div>
                    <span className="text-xs text-slate-400">Keep it going!</span>
                  </div>
                </div>
                <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden border border-slate-600/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: "73%" }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white drop-shadow-lg">653 XP to go</span>
                  </div>
                </div>
                {parentView && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                  >
                    <p className="text-xs text-green-400 font-medium flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      Your child is making excellent progress! 73% to the next level.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Enhanced Quick Stats with Motivational Messages */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { 
                    icon: Trophy, 
                    label: "Badges", 
                    value: "12", 
                    color: "text-yellow-400",
                    bgColor: "from-yellow-500/20 to-orange-500/20",
                    message: parentView ? "12 achievements unlocked!" : "Keep collecting!"
                  },
                  { 
                    icon: Users, 
                    label: "Rank", 
                    value: "#47", 
                    color: "text-blue-400",
                    bgColor: "from-blue-500/20 to-cyan-500/20",
                    message: parentView ? "Top 50! Great work!" : "Climbing the ranks!"
                  },
                  { 
                    icon: Clock, 
                    label: "Hours", 
                    value: "127", 
                    color: "text-purple-400",
                    bgColor: "from-purple-500/20 to-pink-500/20",
                    message: parentView ? "127 hours of learning!" : "Time well spent!"
                  },
                  { 
                    icon: CheckCircle2, 
                    label: "Completed", 
                    value: "89", 
                    color: "text-green-400",
                    bgColor: "from-green-500/20 to-emerald-500/20",
                    message: parentView ? "89 projects done!" : "Almost at 100!"
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-3 text-center border border-slate-600/30 relative overflow-hidden group cursor-pointer`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.02 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <IconRenderer icon={stat.icon} className={`w-5 h-5 mx-auto mb-1 ${stat.color} relative z-10`} />
                    <p className="text-lg font-bold text-white relative z-10">{stat.value}</p>
                    <p className="text-xs text-slate-300 font-mono relative z-10">{stat.label}</p>
                    {parentView && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] text-slate-400 mt-1 relative z-10"
                      >
                        {stat.message}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skill Tree */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border-2 border-slate-700 p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Your Skills
              </h3>
              <div className="space-y-4">
                {skillTree.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${skill.color} flex items-center justify-center`}>
                          <IconRenderer icon={skill.icon} className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-slate-400 font-mono">
                        Lv.{skill.level}/{skill.maxLevel}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.02 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Quests */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border-2 border-slate-700 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-400" />
                Active Quests
              </h2>
              <div className="space-y-4">
                {quests.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 text-center"
                  >
                    <Target className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-white mb-2">Ready for Your First Quest?</h4>
                    <p className="text-sm text-slate-300 mb-4">Complete your current course to unlock exciting new challenges!</p>
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      onClick={() => router.push("/")}
                    >
                      Explore Courses
                    </Button>
                  </motion.div>
                ) : (
                  quests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    className={`relative p-4 rounded-xl border-2 ${
                      quest.unlocked 
                        ? 'bg-slate-700/50 border-slate-600 cursor-pointer hover:border-blue-500' 
                        : 'bg-slate-800/30 border-slate-700 opacity-60'
                    } transition-all`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.02 }}
                    whileHover={quest.unlocked ? { scale: 1.02, x: 5 } : {}}
                    onHoverStart={() => quest.unlocked && setSelectedQuest(quest.id)}
                    onHoverEnd={() => setSelectedQuest(null)}
                    onClick={() => quest.unlocked && play("click")}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-lg ${quest.color} flex items-center justify-center flex-shrink-0`}>
                        {quest.unlocked ? (
                          <IconRenderer icon={quest.icon} className="w-6 h-6 text-white" />
                        ) : (
                          <Lock className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-bold ${quest.unlocked ? 'text-white' : 'text-slate-500'}`}>
                            {quest.title}
                          </h3>
                          {quest.unlocked && (
                            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded font-mono">
                              {quest.difficulty}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{quest.description}</p>
                        {quest.unlocked && (
                          <div className="flex items-center gap-2 text-xs text-yellow-400">
                            <Coins className="w-3 h-3" />
                            <span className="font-mono font-bold">{quest.xp} XP</span>
                          </div>
                        )}
                      </div>
                      {quest.unlocked && (
                        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                    </div>
                  </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Leaderboard & Achievements */}
          <div className="lg:col-span-1 space-y-6">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border-2 border-slate-700 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Leaderboard
              </h2>
              <div className="space-y-3">
                {leaderboard.map((player, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      player.isYou 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50' 
                        : 'bg-slate-700/30'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.02 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-2xl font-bold text-slate-400 w-8">
                      {player.rank === 1 ? '👑' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : `#${player.rank}`}
                    </div>
                    <div className="text-2xl">{player.avatar}</div>
                    <div className="flex-1">
                      <p className={`font-bold ${player.isYou ? 'text-blue-400' : 'text-white'}`}>
                        {player.name} {player.isYou && '(You)'}
                      </p>
                    </div>
                    <div className="text-yellow-400 font-mono font-bold">{player.xp.toLocaleString()}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border-2 border-slate-700 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Medal className="w-6 h-6 text-yellow-400" />
                Achievements
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 + index * 0.02, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    onHoverStart={() => {
                      setSelectedBadge(index);
                      play("hover");
                    }}
                    onHoverEnd={() => setSelectedBadge(null)}
                  >
                    <div className={`aspect-square rounded-xl ${achievement.color} p-3 flex flex-col items-center justify-center border-2 ${
                      achievement.unlocked ? 'border-white/30' : 'border-slate-600/50 opacity-50'
                    }`}>
                      {achievement.unlocked ? (
                        <>
                          <IconRenderer icon={achievement.icon} className="w-6 h-6 text-white mb-1" />
                          <p className="text-[8px] font-bold text-white text-center leading-tight">{achievement.title}</p>
                        </>
                      ) : (
                        <Lock className="w-6 h-6 text-white/50" />
                      )}
                    </div>
                    {selectedBadge === index && achievement.unlocked && (
                      <motion.div
                        className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        +{achievement.points}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section - Game Cards Style */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Lab Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Trophy,
                title: "Achievement System",
                description: "Unlock badges and earn rewards",
                color: "from-yellow-500 to-orange-500",
                bgColor: "bg-yellow-500/10"
              },
              {
                icon: Target,
                title: "Smart Challenges",
                description: "AI adapts to your skill level",
                color: "from-blue-500 to-cyan-500",
                bgColor: "bg-blue-500/10"
              },
              {
                icon: Activity,
                title: "Live Tracking",
                description: "Watch your progress in real-time",
                color: "from-purple-500 to-pink-500",
                bgColor: "bg-purple-500/10"
              },
              {
                icon: Puzzle,
                title: "Skill Trees",
                description: "Visual paths to mastery",
                color: "from-green-500 to-emerald-500",
                bgColor: "bg-green-500/10"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`${feature.bgColor} rounded-2xl border-2 border-slate-700 p-6 cursor-pointer group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(148, 163, 184, 0.5)", y: -5 }}
                onMouseEnter={() => play("hover")}
              >
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <IconRenderer icon={feature.icon} className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="text-xl px-12 py-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-xl"
              onMouseEnter={() => play("hover")}
              onClick={() => play("click")}
            >
              <Gamepad2 className="w-6 h-6 mr-3" />
              Start Your Lab Journey
              <ArrowRightIcon className="w-6 h-6 ml-3" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
