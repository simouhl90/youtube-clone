'use client';

import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export default function TopBar() {
  const notifications = useAppStore((s) => s.notifications);
  const dismissNotifications = useAppStore((s) => s.dismissNotifications);

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
            <button
              onClick={dismissNotifications}
              className="relative p-2 rounded-full transition-colors hover:bg-white/10 active:scale-90"
            >
              <Bell size={20} className="text-white/70" />
              {notifications > 0 && (
                <motion.span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-black/40"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {notifications}
                </motion.span>
              )}
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
