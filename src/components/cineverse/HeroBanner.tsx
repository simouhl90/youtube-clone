'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Star } from 'lucide-react';
import { getFeaturedSeries } from '@/lib/mock-data';
import { useAppStore } from '@/store/useAppStore';
import type { Series } from '@/types';
import OptImage from './OptImage';

export default function HeroBanner() {
  const featured = getFeaturedSeries();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const { navigate, toggleWatchlist, watchlist } = useAppStore();

  const rotate = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    const timer = setInterval(rotate, 5000);
    return () => clearInterval(timer);
  }, [rotate]);

  const series: Series = featured[current];

  if (!series) return null;

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 100 : -100,
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Backdrop Images */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={series.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <OptImage src={series.backdrop} alt={series.title} className="absolute inset-0" style={{ objectFit: 'cover' }} />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-transparent to-[#0a0a1a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a]/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={series.id + '-content'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Genre Tags */}
            <div className="flex items-center gap-2 mb-3">
              {series.genre.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white/70 border border-white/10"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text leading-tight mb-3 drop-shadow-lg">
              {series.title}
            </h2>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">
                  {series.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-white/40 text-sm">{series.year}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/15 text-white/60">
                {series.maturity}
              </span>
              <span className="text-white/40 text-sm">
                {series.seasons.length}S · {series.totalEpisodes}E
              </span>
            </div>

            {/* Description */}
            <p className="text-white/50 text-sm leading-relaxed mb-5 line-clamp-2 max-w-md">
              {series.description}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate({ type: 'series', seriesId: series.id })}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
              >
                <Play size={18} fill="white" />
                Watch Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleWatchlist(series.id)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white/80 glass hover:bg-white/10 transition-colors"
              >
                <Plus
                  size={18}
                  className={
                    watchlist.has(series.id) ? 'fill-pink-500 text-pink-500' : ''
                  }
                />
                My List
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center gap-1.5 mt-6">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className="relative h-1 rounded-full transition-all duration-500"
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  i === current
                    ? 'w-8 bg-gradient-to-r from-purple-400 to-pink-400'
                    : 'w-3 bg-white/20 hover:bg-white/30'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
