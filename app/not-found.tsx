import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | BlackMonkey",
  description: "The page you're looking for doesn't exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Animated 404 */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl md:text-9xl font-display font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to bottom right, rgb(168, 85, 247) 0%, rgb(200, 100, 245) 12%, rgb(236, 72, 153) 28%, rgb(200, 120, 240) 45%, rgb(34, 211, 238) 58%, rgb(180, 200, 250) 70%, rgb(240, 245, 255) 78%, rgb(255, 255, 255) 78%, rgb(255, 255, 255) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </h1>
        </motion.div>

        {/* Icon */}
        <motion.div
          className="mb-6 flex justify-center"
          animate={{
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-neon-purple/20 rounded-full blur-2xl" />
            <Search className="w-16 h-16 text-neon-purple relative z-10" />
          </div>
        </motion.div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
          Page Not Found
        </h2>

        <p className="text-lg text-muted-foreground mb-2">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <p className="text-base text-muted-foreground/80 mb-8 max-w-md mx-auto">
          Don't worry, let's get you back on track to explore our amazing STEM courses!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="px-8 py-6 rounded-xl font-semibold bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-cyan transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/courses">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 rounded-xl font-semibold border-2 backdrop-blur-xl"
              style={{
                borderColor: 'rgba(168, 85, 247, 0.5)',
                background: 'rgba(15, 23, 42, 0.6)',
              }}
            >
              <Search className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}



