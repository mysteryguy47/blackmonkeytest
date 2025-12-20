import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function LogoAnimation({ onComplete }: { onComplete: () => void }) {
  const [showNeonStreak, setShowNeonStreak] = useState(true);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [slideToNav, setSlideToNav] = useState(false);

  useEffect(() => {
    const neonTimer = setTimeout(() => {
      setShowNeonStreak(false);
      setShowTypewriter(true);
    }, 800);

    const typewriterTimer = setTimeout(() => {
      setSlideToNav(true);
    }, 3000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(neonTimer);
      clearTimeout(typewriterTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      animate={slideToNav ? { opacity: 0, pointerEvents: 'none' } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {showNeonStreak && (
        <motion.div
          className="absolute h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
          initial={{ width: 0, left: '50%' }}
          animate={{ width: '100%', left: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ top: '50%' }}
        />
      )}

      <motion.div
        initial={{ scale: 1 }}
        animate={slideToNav ? {
          scale: 0.5,
          x: -window.innerWidth / 2.5,
          y: -window.innerHeight / 2.3,
        } : {}}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="relative"
      >
        <h1
          className={`font-bold text-foreground ${showTypewriter ? 'overflow-hidden whitespace-nowrap' : ''}`}
          style={{
            fontSize: slideToNav ? '2rem' : '4rem',
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '0.05em',
            animation: showTypewriter ? 'typewriter 2s steps(11) forwards' : 'none',
            width: showTypewriter ? 0 : 'auto',
          }}
          data-testid="text-logo-animation"
        >
          <span className="neon-glow-cyan">Black</span>
          <span className="neon-glow-purple">Monkey</span>
        </h1>
      </motion.div>
    </motion.div>
  );
}
