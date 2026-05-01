'use client';

import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import type { Series } from '@/types';
import { getGenreEmoji } from '@/types';
import OptImage from './OptImage';
import { useHaptic } from '@/hooks/useHaptic';

interface SeriesCardProps {
  series: Series;
  size?: 'normal' | 'large';
  index?: number;
}

export default function SeriesCard({ series, size = 'normal', index = 0 }: SeriesCardProps) {
  const { navigate, toggleWatchlist, watchlist } = useAppStore();
  const { light } = useHaptic();
  const isWatchlisted = watchlist.has(series.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => { light(); navigate({ type: 'series', seriesId: series.id }); }}
      className={`relative flex-shrink-0 cursor-pointer group ${size === 'large' ? 'w-[180px]' : 'w-[140px]'}`}
    >
      {/* Poster */}
      <div className={`relative rounded-2xl overflow-hidden ${size === 'large' ? 'aspect-[2/3]' : 'aspect-[2/3]'} shadow-lg shadow-purple-500/5`}>
        <OptImage src={series.poster} alt={series.title} className="w-full h-full" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* NEW Badge */}
        {series.status === 'Airing' && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-gradient-to-r from-green-500 to-emerald-500 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            NEW
          </div>
        )}

        {/* Watchlist Button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchlist(series.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-black/60"
        >
          <Heart
            size={14}
            className={`transition-colors ${
              isWatchlisted ? 'fill-pink-500 text-pink-500' : 'text-white/70'
            }`}
          />
        </motion.button>

        {/* Info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-bold text-white leading-tight truncate">
            {series.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              <Star size={11} className="fill-yellow-400 text-yellow-400" />
              <span className="text-[11px] font-semibold text-yellow-400">
                {series.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-white/40 text-[11px]">{series.year}</span>
          </div>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-white/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]" />
      </div>
    </motion.div>
  );
}
