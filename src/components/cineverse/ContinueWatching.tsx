'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { series as allSeries } from '@/lib/mock-data';
import type { WatchProgress } from '@/types';

interface ContinueWatchingProps {
  items: WatchProgress[];
}

export default function ContinueWatching({ items }: ContinueWatchingProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { navigate, updateProgress } = useAppStore();

  if (items.length === 0) return null;

  return (
    <section className="relative">
      <div className="flex items-center gap-2 px-5 mb-4">
        <h2 className="text-lg font-bold text-white">Continue Watching</h2>
        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-[11px] font-semibold text-purple-300">
          {items.length}
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar fade-edges px-5 pb-2"
      >
        {items.map((item, index) => {
          const series = allSeries.find((s) => s.id === item.seriesId);
          if (!series) return null;
          const season = series.seasons.find((s) => s.number === item.seasonNumber);
          const episode = season?.episodes.find((e) => e.number === item.episodeNumber);

          return (
            <motion.div
              key={item.seriesId}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate({ type: 'series', seriesId: series.id })}
              className="relative flex-shrink-0 w-[260px] cursor-pointer group rounded-xl overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src={episode?.thumbnail || series.backdrop}
                  alt={episode?.title || series.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play size={20} fill="white" className="text-white ml-0.5" />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-full shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="mt-2 px-1">
                <h3 className="text-sm font-semibold text-white truncate">{series.title}</h3>
                <p className="text-xs text-white/40 mt-0.5">
                  S{item.seasonNumber}E{item.episodeNumber}
                  {episode ? ` · ${episode.title}` : ''}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
