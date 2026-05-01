'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { series } from '@/lib/mock-data';
import SeriesCard from './SeriesCard';
import BottomNav from './BottomNav';

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function StudioDetail() {
  const { currentView, goBack } = useAppStore();
  const studioName = currentView.type === 'studio' ? currentView.studioName : '';
  const studioSeries = series.filter((s) => s.studio === studioName);

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0a0a1a]/80 backdrop-blur-xl px-5 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={goBack}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10"
          >
            <ArrowLeft size={18} className="text-white" />
          </motion.button>
          <h1 className="text-xl font-bold gradient-text truncate">{studioName}</h1>
        </div>
      </div>

      {/* Studio Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mx-5 mt-2 mb-8 flex flex-col items-center py-10 rounded-3xl bg-white/[0.03] border border-white/[0.06]"
      >
        {/* Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-purple-500/20 blur-[80px] pointer-events-none" />

        {/* Icon */}
        <span className="text-6xl relative z-10">🎬</span>

        {/* Studio Name */}
        <h2 className="text-2xl font-bold gradient-text mt-4 relative z-10">{studioName}</h2>

        {/* Series Count */}
        <p className="text-sm text-white/50 mt-1 relative z-10">
          {studioSeries.length} {studioSeries.length === 1 ? 'Series' : 'Series'}
        </p>
      </motion.div>

      {/* All Series Grid */}
      <div className="px-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🎥</span>
          <h2 className="text-lg font-bold text-white">All Series</h2>
        </div>

        {studioSeries.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-3 gap-3"
          >
            {studioSeries.map((s, i) => (
              <motion.div key={s.id} variants={itemVariants}>
                <SeriesCard series={s} index={i} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="text-5xl mb-4">🎬</span>
            <p className="text-white/30 text-sm">No series found for this studio</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
