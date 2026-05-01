'use client';

import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, X } from 'lucide-react';
import { searchSeries, series as allSeries } from '@/lib/mock-data';
import SeriesCard from './SeriesCard';
import { SearchResultsSkeleton } from './Skeletons';
import { GENRES } from '@/types';

const trendingSearches = [
  'Neon Shadows',
  'The Last Kingdom',
  'Shadow Detective',
  'Orbit',
  'K-Drama 2024',
  'Sci-Fi Thriller',
];

function useDebouncedValue(value: string, delay: number): string {
  const [debounced, setDebounced] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const id = setTimeout(() => setDebounced(value), delay);
    timerRef.current = id;
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debounced;
}

export default function SearchView() {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebouncedValue(query, 300);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchSeries(debouncedQuery);
  }, [debouncedQuery]);

  const filteredResults = useMemo(() => {
    if (selectedGenre && !query) {
      return allSeries.filter((s) => s.genre.includes(selectedGenre));
    }
    return results;
  }, [results, selectedGenre, query]);

  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredResults.length) {
          setVisibleCount((prev) => Math.min(prev + 6, filteredResults.length));
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, filteredResults.length]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setVisibleCount(9);
    if (value.trim()) {
      setSearching(true);
      const timer = setTimeout(() => setSearching(false), 600);
      return () => clearTimeout(timer);
    } else {
      setSearching(false);
    }
  }, []);

  const handleGenreSelect = useCallback((genre: string | null) => {
    setSelectedGenre(genre);
    setVisibleCount(9);
  }, []);

  return (
    <div className="min-h-screen pb-28">
      {/* Search Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-[#0a0a1a]/80 backdrop-blur-xl px-5 pt-14 pb-4"
      >
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => inputRef.current?.select()}
            onBlur={() => {}}
            placeholder="Search series, genres, actors..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!hasQuery && !selectedGenre ? (
          /* Empty State */
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-5"
          >
            {/* Trending Searches */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-purple-400" />
                <h3 className="text-sm font-semibold text-white/80">Trending Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <motion.button
                    key={term}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleSearch(term)}
                    className="px-4 py-2 rounded-full text-sm text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {term}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Genre Grid */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-white/80 mb-4">Browse by Genre</h3>
              <div className="grid grid-cols-2 gap-3">
                {GENRES.filter((g) => g !== 'All' && g !== '🔥 Trending').map(
                  (genre) => {
                    const genreName = genre.slice(2).trim();
                    const emoji = genre.slice(0, 2);
                    const gradients: Record<string, string> = {
                      '🧛 Horror': 'from-red-900/40 to-orange-900/30',
                      '🎭 Drama': 'from-purple-900/40 to-pink-900/30',
                      '😂 Comedy': 'from-yellow-900/40 to-green-900/30',
                      '💎 Action': 'from-orange-900/40 to-red-900/30',
                      '🔍 Mystery': 'from-cyan-900/40 to-purple-900/30',
                      '💔 Romance': 'from-pink-900/40 to-red-900/30',
                      '🔬 Sci-Fi': 'from-cyan-900/40 to-blue-900/30',
                      '📜 History': 'from-amber-900/40 to-yellow-900/30',
                      '🍜 Asian': 'from-green-900/40 to-cyan-900/30',
                      '🇹🇷 Turkish': 'from-red-900/40 to-pink-900/30',
                      "👨‍👩‍👧 Family": 'from-green-900/40 to-teal-900/30',
                      '🕵️ Thriller': 'from-gray-900/40 to-purple-900/30',
                      '🌅 Fantasy': 'from-purple-900/40 to-cyan-900/30',
                    };

                    return (
                      <motion.button
                        key={genre}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGenreSelect(genreName)}
                        className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${
                          gradients[genre] || 'from-purple-900/40 to-pink-900/30'
                        } border border-white/10 hover:border-white/20 transition-all`}
                      >
                        <span className="text-2xl">{emoji}</span>
                        <p className="text-sm font-semibold text-white mt-2 text-left">
                          {genreName}
                        </p>
                      </motion.button>
                    );
                  }
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Results */
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-5"
          >
            {/* Genre filter chips */}
            {selectedGenre && (
              <div className="flex items-center gap-2 mt-4 mb-4">
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleGenreSelect(null)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white border border-white/10"
                >
                  All
                </motion.button>
                {allSeries
                  .flatMap((s) => s.genre)
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .map((genre) => (
                    <motion.button
                      key={genre}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => handleGenreSelect(genre)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedGenre === genre
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-white/50 border border-white/10'
                      }`}
                    >
                      {genre}
                    </motion.button>
                  ))}
              </div>
            )}

            {hasQuery && (
              <p className="text-sm text-white/40 mb-4">
                {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
            )}

            {searching && filteredResults.length === 0 ? (
              <SearchResultsSkeleton />
            ) : filteredResults.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-3">
                  {filteredResults.slice(0, visibleCount).map((s, i) => (
                    <div key={s.id} className="flex justify-center">
                      <SeriesCard series={s} index={i} />
                    </div>
                  ))}
                </div>

                {visibleCount < filteredResults.length && (
                  <div ref={sentinelRef} className="flex justify-center py-8">
                    <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <Search size={48} className="text-white/10 mb-4" />
                <p className="text-white/30 text-sm">No series found</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
