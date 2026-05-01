'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TopBar from './TopBar';
import HeroBanner from './HeroBanner';
import BottomNav from './BottomNav';
import ContinueWatching from './ContinueWatching';
import Top10Row from './Top10Row';
import SeriesRow from './SeriesRow';
import {
  getTrendingSeries,
  getNewEpisodes,
  getSeriesByGenre,
  series as allSeries,
} from '@/lib/mock-data';
import { useAppStore } from '@/store/useAppStore';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';

export default function HomeView() {
  const { continueWatching } = useAppStore();
  const [refreshKey, setRefreshKey] = useState(0);
  const { handlers, isPulling, pullDistance } = usePullToRefresh(() => { setRefreshKey(k => k + 1); });

  const trending = getTrendingSeries();
  const newEpisodes = getNewEpisodes();
  const dramas = getSeriesByGenre('Drama');
  const actions = getSeriesByGenre('Action');
  const kdramas = allSeries.filter(
    (s) => s.country === 'South Korea' || s.language === 'Korean'
  );

  return (
    <div className="min-h-screen pb-24" key={refreshKey} {...handlers}>
      {isPulling && (
        <motion.div 
          className="flex items-center justify-center pt-3"
          animate={{ rotate: pullDistance > 30 ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        </motion.div>
      )}
      <TopBar />
      <HeroBanner />

      {/* Continue Watching */}
      {continueWatching.length > 0 && (
        <div className="mt-8">
          <ContinueWatching items={continueWatching} />
        </div>
      )}

      {/* Trending Now */}
      <div className="mt-10">
        <SeriesRow title="Trending Now" series={trending} emoji="🔥" />
      </div>

      {/* Top 10 */}
      <div className="mt-10">
        <Top10Row />
      </div>

      {/* New Episodes */}
      <div className="mt-10">
        <SeriesRow title="New Episodes" series={newEpisodes} emoji="✨" />
      </div>

      {/* Drama */}
      <div className="mt-10">
        <SeriesRow title="Drama" series={dramas} emoji="🎭" />
      </div>

      {/* Action */}
      <div className="mt-10">
        <SeriesRow title="Action & Thriller" series={actions} emoji="💥" />
      </div>

      {/* K-Dramas */}
      <div className="mt-10">
        <SeriesRow title="K-Dramas" series={kdramas} emoji="🇰🇷" />
      </div>

      <BottomNav />
    </div>
  );
}
