'use client';

import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopBar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between px-5 py-3">
          <h1 className="text-xl font-bold gradient-text tracking-tight">
            CineVerse
          </h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full transition-colors hover:bg-white/10 active:scale-90">
              <Bell size={20} className="text-white/70" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-black/40" />
            </button>
            <button className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-purple-500/50 transition-transform active:scale-90">
              <img
                src="https://picsum.photos/seed/useravatar/100/100"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
