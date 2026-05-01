'use client';

import { Home, Compass, Search, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import type { AppView } from '@/types';

const tabs: { icon: typeof Home; label: string; view: AppView }[] = [
  { icon: Home, label: 'Home', view: { type: 'home' } },
  { icon: Compass, label: 'Discover', view: { type: 'discover' } },
  { icon: Search, label: 'Search', view: { type: 'search' } },
  { icon: Heart, label: 'Watchlist', view: { type: 'watchlist' } },
  { icon: User, label: 'Profile', view: { type: 'profile' } },
];

export default function BottomNav() {
  const { currentView, navigate } = useAppStore();

  const isActive = (type: string) => {
    if (type === 'home' && currentView.type === 'home') return true;
    if (type === 'home' && currentView.type === 'series') return true;
    return currentView.type === type;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-t border-white/10">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-around px-2 pt-2 pb-[env(safe-area-inset-bottom,8px)]">
          {tabs.map((tab) => {
            const active = isActive(tab.view.type);
            const Icon = tab.icon;
            return (
              <button
                key={tab.label}
                onClick={() => navigate(tab.view)}
                className="relative flex flex-col items-center gap-1 py-1 px-3 min-w-[60px] transition-colors"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className="relative"
                >
                  {active && (
                    <motion.div
                      layoutId="navGlow"
                      className="absolute -inset-2 rounded-full bg-purple-500/20 blur-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={22}
                    className={`relative transition-all duration-300 ${
                      active
                        ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]'
                        : 'text-white/40'
                    }`}
                    strokeWidth={active ? 2.2 : 1.8}
                  />
                </motion.div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-300 ${
                    active ? 'text-purple-400' : 'text-white/40'
                  }`}
                >
                  {tab.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="navDot"
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
