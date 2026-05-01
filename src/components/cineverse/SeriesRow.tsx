'use client';

import { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SeriesCard from './SeriesCard';
import type { Series } from '@/types';

interface SeriesRowProps {
  title: string;
  series: Series[];
  emoji?: string;
  onSeeAll?: () => void;
}

export default function SeriesRow({ title, series, emoji, onSeeAll }: SeriesRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 mb-4">
        <div className="flex items-center gap-2">
          {emoji && <span className="text-lg">{emoji}</span>}
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="flex items-center gap-1 text-sm text-purple-400 font-medium hover:text-purple-300 transition-colors active:scale-95"
          >
            See All
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar fade-edges px-5 pb-2"
      >
        {series.map((s, i) => (
          <SeriesCard key={s.id} series={s} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
