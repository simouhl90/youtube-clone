'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export default function SplashScreen() {
  const setSplashDone = useAppStore((s) => s.setSplashDone);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), 2000);
    const doneTimer = setTimeout(() => setSplashDone(), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [setSplashDone]);

  return (
    <AnimatePresence>
      {!fadingOut && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: '#0a0a1a' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Glow / pulse backdrop */}
          <motion.div
            className="absolute w-72 h-72 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(236,72,153,0.12) 40%, transparent 70%)',
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: [0.8, 1.15, 0.8],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Logo text */}
          <motion.h1
            className="gradient-text text-5xl font-extrabold tracking-tight select-none relative z-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 14,
              delay: 0.15,
            }}
          >
            CineVerse
          </motion.h1>

          {/* Loading line */}
          <div className="mt-12 w-48 h-[2px] rounded-full bg-white/10 overflow-hidden relative z-10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
