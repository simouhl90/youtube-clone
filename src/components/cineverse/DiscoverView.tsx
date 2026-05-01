'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import SeriesRow from './SeriesRow';
import {
  getTopSeries,
  getRecentlyAdded,
  series as allSeries,
} from '@/lib/mock-data';

const genreCards = [
  { name: 'Drama', emoji: '🎭', gradient: 'from-purple-600/30 to-pink-600/20', count: 5 },
  { name: 'Action', emoji: '💥', gradient: 'from-orange-600/30 to-red-600/20', count: 3 },
  { name: 'Sci-Fi', emoji: '🔬', gradient: 'from-cyan-600/30 to-purple-600/20', count: 3 },
  { name: 'Horror', emoji: '🧛', gradient: 'from-red-600/30 to-gray-600/20', count: 1 },
  { name: 'Comedy', emoji: '😂', gradient: 'from-yellow-600/30 to-green-600/20', count: 2 },
  { name: 'Thriller', emoji: '🕵️', gradient: 'from-gray-600/30 to-purple-600/20', count: 3 },
  { name: 'Romance', emoji: '💔', gradient: 'from-pink-600/30 to-red-600/20', count: 2 },
  { name: 'Fantasy', emoji: '🌅', gradient: 'from-amber-600/30 to-purple-600/20', count: 1 },
  { name: 'Mystery', emoji: '🔍', gradient: 'from-teal-600/30 to-cyan-600/20', count: 2 },
  { name: 'History', emoji: '📜', gradient: 'from-amber-600/30 to-yellow-600/20', count: 2 },
];

const allGenres = ['All', ...new Set(allSeries.flatMap((s) => s.genre))];

export default function DiscoverView() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const highestRated = [...allSeries].sort((a, b) => b.rating - a.rating);
  const popular = [...allSeries].sort(
    (a, b) => b.ratingCount - a.ratingCount
  );
  const recentlyAdded = getRecentlyAdded();

  const genreFiltered =
    selectedGenre === 'All'
      ? popular.slice(0, 10)
      : allSeries.filter((s) => s.genre.includes(selectedGenre));

  return (
    <div className="min-h-screen pb-28">
      <TopBar />

      {/* Genre Grid */}
      <div className="px-5 mt-20">
        <h2 className="text-xl font-bold gradient-text mb-4">Discover</h2>
        <div className="grid grid-cols-2 gap-3">
          {genreCards.map((card, i) => (
            <motion.button
              key={card.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${card.gradient} border border-white/10 hover:border-white/20 transition-all text-left`}
            >
              <span className="text-3xl">{card.emoji}</span>
              <p className="text-sm font-bold text-white mt-2">{card.name}</p>
              <p className="text-xs text-white/40 mt-0.5">
                {card.count} series
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Genre Filter Chips */}
      <div className="mt-8 px-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
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
            emoji={
              genreCards.find((c) => c.name === selectedGenre)?.emoji || '🎬'
            }
          />
        </div>
      )}

      {/* Popular This Week */}
      <div className="mt-8">
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

      <BottomNav />
    </div>
  );
}
