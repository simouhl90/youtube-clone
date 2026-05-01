'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Moon, Sun, ChevronRight, Award, Clock, Heart, CheckCircle } from 'lucide-react';
import BottomNav from './BottomNav';
import { useAppStore } from '@/store/useAppStore';

const stats = [
  { icon: Clock, label: 'Hours Watched', value: '128', color: 'text-purple-400' },
  { icon: CheckCircle, label: 'Series Completed', value: '24', color: 'text-pink-400' },
  { icon: Heart, label: 'In Watchlist', value: '0', color: 'text-cyan-400' },
];

const settingsItems = [
  { icon: Bell, label: 'Notifications', subtitle: 'Push & email', color: 'text-pink-400' },
  { icon: Settings, label: 'General', subtitle: 'Language, region', color: 'text-cyan-400' },
];

export default function ProfileView() {
  const { watchlist } = useAppStore();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const dynamicStats = stats.map((s) =>
    s.label === 'In Watchlist' ? { ...s, value: String(watchlist.size) } : s
  );

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTheme(next);
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-[#0a0a1a]/80 backdrop-blur-xl px-5 pt-14 pb-4"
      >
        <h1 className="text-xl font-bold text-white">Profile</h1>
      </motion.div>

      <div className="px-5 mt-2">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center mt-4"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-[3px] ring-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <img
                src="https://picsum.photos/seed/userprofile/200/200"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Award size={14} className="text-white" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mt-4">CineViewer</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300">
              CineVerse Member
            </span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mt-8"
        >
          {dynamicStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <Icon size={20} className={stat.color} />
                <span className="text-lg font-bold text-white mt-2">
                  {stat.value}
                </span>
                <span className="text-[10px] text-white/40 mt-0.5 text-center leading-tight">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h3 className="text-sm font-semibold text-white/60 mb-3 px-1">Settings</h3>
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden divide-y divide-white/5">
            {/* Appearance Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors active:bg-white/[0.08]"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                {theme === 'dark' ? (
                  <Moon size={18} className="text-purple-400" />
                ) : (
                  <Sun size={18} className="text-yellow-400" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">Appearance</p>
                <p className="text-xs text-white/40">
                  {theme === 'dark' ? 'Dark' : 'Light'} mode
                </p>
              </div>
              <div
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-white/20'
                }`}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
                  animate={{ left: theme === 'dark' ? 26 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {theme === 'dark' ? (
                    <Moon size={12} className="text-purple-600" />
                  ) : (
                    <Sun size={12} className="text-yellow-500" />
                  )}
                </motion.div>
              </div>
            </button>

            {settingsItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors active:bg-white/[0.08]"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon size={18} className={item.color} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-white/40">{item.subtitle}</p>
                  </div>
                  <ChevronRight size={16} className="text-white/20" />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center mt-12 mb-4"
        >
          <p className="text-xs text-white/20">CineVerse v2.1.0</p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
