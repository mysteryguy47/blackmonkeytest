"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { AnimatedNavbar } from "@/components/AnimatedNavbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Clock, User } from "lucide-react";
import DarkVeil from "@/components/DarkVeil";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Paper Circuits",
    author: "Sarah Chen",
    date: "Nov 15, 2024",
    category: "Tutorial",
    excerpt:
      "Learn the basics of conductive tape, LEDs, and circuit design in this beginner-friendly guide.",
    readTime: "5 min read",
    color: "rgb(168, 85, 247)",
  },
  {
    id: 2,
    title: "5 Robotics Projects for Beginners",
    author: "Rajesh Kumar",
    date: "Nov 12, 2024",
    category: "Projects",
    excerpt:
      "Discover hands-on projects that will teach you programming and mechanical engineering.",
    readTime: "8 min read",
    color: "rgb(34, 211, 238)",
  },
  {
    id: 3,
    title: "IoT Security: Protecting Your Smart Devices",
    author: "Maya Patel",
    date: "Nov 10, 2024",
    category: "Guide",
    excerpt:
      "Everything you need to know about securing your IoT projects and protecting user data.",
    readTime: "6 min read",
    color: "rgb(236, 72, 153)",
  },
  {
    id: 4,
    title: "Building Your First Drone: A Complete Guide",
    author: "Alex Rodriguez",
    date: "Nov 8, 2024",
    category: "Tutorial",
    excerpt:
      "Step-by-step instructions to build and program your first autonomous drone.",
    readTime: "10 min read",
    color: "rgb(34, 197, 94)",
  },
];

const categories = ["All", "Tutorial", "Projects", "Guide"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <AnimatedNavbar />
      <div
        className="glass-container"
        style={{ width: "100vw", height: "100vh", position: "absolute" }}
      >
        <DarkVeil />
      </div>

      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1
              className="font-display font-bold mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(90deg, rgb(168, 85, 247), rgb(34, 211, 238))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                STEM Insights
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore tutorials, tips, and stories from our community.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 mb-12"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-blog-search"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                      : "bg-slate-800/50 border border-slate-700 text-muted-foreground hover:border-neon-purple/50"
                  }`}
                  data-testid={`button-filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                data-testid={`card-blog-${post.id}`}
              >
                <Card className="p-6 group cursor-pointer border-slate-700 hover:border-slate-600 transition-all h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-sm font-bold px-3 py-1 rounded-full text-white"
                      style={{ background: post.color }}
                    >
                      {post.category}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-neon-purple transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <span>{post.date}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No articles found. Try a different search.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}



