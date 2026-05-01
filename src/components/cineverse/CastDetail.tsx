'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { series as allSeries } from '@/lib/mock-data';
import SeriesCard from './SeriesCard';

export default function CastDetail() {
  const { currentView, goBack, navigate } = useAppStore();
  const castName = currentView.type === 'cast' ? currentView.castName : '';
  const castPhoto = currentView.type === 'cast' ? currentView.castPhoto : '';
  const castRole = currentView.type === 'cast' ? currentView.castRole : '';

  const filmography = useMemo(() => {
    return allSeries.filter((s) =>
      s.cast.some((member) => member.name === castName)
    );
  }, [castName]);

  return (
    <div className="min-h-screen pb-10">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-5 pt-14 bg-gradient-to-b from-[#0a0a1a] via-[#0a0a1a]/90 to-transparent backdrop-blur-sm">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10"
        >
          <ArrowLeft size={18} className="text-white" />
        </motion.button>
        <h1 className="text-white font-bold text-lg">Cast</h1>
        <div className="w-10" />
      </div>

      {/* Actor Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center pt-6 pb-8 px-5"
      >
        {/* Gradient glow behind avatar */}
        <div className="relative">
          <div className="absolute inset-0 w-28 h-28 rounded-full bg-purple-500/30 blur-3xl scale-150" />
          <img
            src={castPhoto}
            alt={castName}
            className="relative w-28 h-28 rounded-full object-cover ring-2 ring-purple-500/50 shadow-xl"
          />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-white">{castName}</h2>
        <p className="mt-1 text-sm text-white/50">{castRole}</p>
      </motion.div>

      {/* Filmography Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="px-5"
      >
        <h3 className="text-sm font-semibold text-white/80 mb-3">
          🎬 Known For
        </h3>

        {filmography.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {filmography.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
              >
                <SeriesCard series={s} index={i} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/30 mt-2">
            Only appears in this series
          </p>
        )}
      </motion.div>
    </div>
  );
}
