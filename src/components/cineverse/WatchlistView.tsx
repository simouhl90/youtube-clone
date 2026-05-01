'use client';

import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getSeriesById } from '@/lib/mock-data';
import SeriesCard from './SeriesCard';
import BottomNav from './BottomNav';

export default function WatchlistView() {
  const { watchlist } = useAppStore();

  const watchlistSeries = Array.from(watchlist)
    .map((id) => getSeriesById(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-[#0a0a1a]/80 backdrop-blur-xl px-5 pt-14 pb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
            <Heart size={20} className="text-pink-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">My Watchlist</h1>
            {watchlistSeries.length > 0 && (
              <p className="text-xs text-white/40 mt-0.5">
                {watchlistSeries.length} series
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <div className="px-5">
        {watchlistSeries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32"
          >
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Heart size={40} className="text-white/15" />
            </div>
            <h3 className="text-lg font-semibold text-white/60 mb-2">
              Your watchlist is empty
            </h3>
            <p className="text-sm text-white/30 text-center max-w-[260px] leading-relaxed">
              Start adding series to your watchlist and they&apos;ll appear here
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-3 gap-3 mt-2"
          >
            {watchlistSeries.map((s, i) => (
              <div key={s!.id} className="flex justify-center">
                <SeriesCard series={s!} index={i} />
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
