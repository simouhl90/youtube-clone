'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { getTopSeries } from '@/lib/mock-data';
import { useAppStore } from '@/store/useAppStore';

export default function Top10Row() {
  const topSeries = getTopSeries(10);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { navigate } = useAppStore();

  return (
    <div className="relative">
      {/* Title */}
      <div className="flex items-center gap-3 px-5 mb-4">
        <h2 className="text-xl font-bold gradient-text">Top 10</h2>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/20">
          <span className="text-xs text-purple-300">🔥</span>
          <span className="text-xs font-medium text-purple-300">Today</span>
        </div>
      </div>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex items-end gap-4 overflow-x-auto no-scrollbar fade-edges px-5 pb-2"
      >
        {topSeries.map((series, index) => {
          const isFirst = index === 0;
          return (
            <motion.div
              key={series.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate({ type: 'series', seriesId: series.id })}
              className={`relative flex-shrink-0 cursor-pointer group ${
                isFirst ? 'w-[160px]' : 'w-[120px]'
              }`}
            >
              {/* Ranking Number */}
              <div
                className={`absolute -left-1 bottom-2 font-black leading-none ${
                  isFirst ? 'text-[120px]' : 'text-[90px]'
                }`}
                style={{
                  background: 'linear-gradient(to bottom, #a855f7, #ec4899, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  zIndex: 0,
                  userSelect: 'none',
                }}
              >
                {index + 1}
              </div>

              {/* Poster */}
              <div
                className={`relative rounded-xl overflow-hidden z-10 shadow-2xl shadow-purple-500/10 ${
                  isFirst ? 'aspect-[2/3]' : 'aspect-[2/3]'
                }`}
              >
                <img
                  src={series.poster}
                  alt={series.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-xs font-bold text-white truncate">{series.title}</p>
                  <p className="text-[10px] text-yellow-400 font-semibold">
                    ★ {series.rating.toFixed(1)}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
