'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import SeriesRow from './SeriesRow';
import {
  getRecentlyAdded,
  series as allSeries,
} from '@/lib/mock-data';

const allGenres = ['All', ...new Set(allSeries.flatMap((s) => s.genre))];

export default function DiscoverView() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const highestRated = [...allSeries].sort((a, b) => b.rating - a.rating);
  const popular = [...allSeries].sort(
    (a, b) => b.ratingCount - a.ratingCount
  );
  const recentlyAdded = getRecentlyAdded();

  const genreFiltered = allSeries.filter((s) => s.genre.includes(selectedGenre));

  return (
    <div className="min-h-screen pb-28">
      <TopBar />

      {/* Genre Filter Chips */}
      <div className="px-5 mt-16">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-2">
          {allGenres.map((genre) => (
            <motion.button
              key={genre}
              whileTap={{ scale: 0.93 }}
              onClick={() => setSelectedGenre(genre)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedGenre === genre
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
              }`}
            >
              {genre}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Filtered Results */}
      {selectedGenre !== 'All' && (
        <div className="mt-6">
          <SeriesRow
            title={selectedGenre}
            series={genreFiltered}
            emoji="🎬"
          />
        </div>
      )}

      {/* Popular This Week */}
      {selectedGenre === 'All' && (
        <>
          <div className="mt-6">
            <SeriesRow title="Popular This Week" series={popular.slice(0, 10)} emoji="📊" />
          </div>

          {/* Highest Rated */}
          <div className="mt-8">
            <SeriesRow
              title="Highest Rated"
              series={highestRated.slice(0, 10)}
              emoji="⭐"
            />
          </div>

          {/* Recently Added */}
          <div className="mt-8">
            <SeriesRow title="Recently Added" series={recentlyAdded} emoji="🆕" />
          </div>
        </>
      )}

      <BottomNav />
    </div>
  );
}
