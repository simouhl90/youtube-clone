'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import SplashScreen from './SplashScreen';
import HomeView from './HomeView';
import SeriesDetail from './SeriesDetail';
import SearchView from './SearchView';
import WatchlistView from './WatchlistView';
import DiscoverView from './DiscoverView';
import ProfileView from './ProfileView';
import CastDetail from './CastDetail';
import EpisodePlayer from './EpisodePlayer';
import ErrorBoundary from './ErrorBoundary';
import StudioDetail from './StudioDetail';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function CineVerseApp() {
  const { currentView, splashDone } = useAppStore();

  return (
    <ErrorBoundary>
    <div className="mx-auto max-w-2xl min-h-screen relative overflow-hidden">
      {!splashDone && <SplashScreen />}

      <AnimatePresence mode="wait">
        {currentView.type === 'home' && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <HomeView />
          </motion.div>
        )}

        {currentView.type === 'series' && (
          <motion.div
            key={`series-${currentView.seriesId}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <SeriesDetail />
          </motion.div>
        )}

        {currentView.type === 'episode' && (
          <motion.div
            key={`episode-${currentView.seriesId}-s${currentView.seasonNumber}e${currentView.episodeNumber}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <EpisodePlayer />
          </motion.div>
        )}

        {currentView.type === 'search' && (
          <motion.div
            key="search"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <SearchView />
          </motion.div>
        )}

        {currentView.type === 'watchlist' && (
          <motion.div
            key="watchlist"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <WatchlistView />
          </motion.div>
        )}

        {currentView.type === 'discover' && (
          <motion.div
            key="discover"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <DiscoverView />
          </motion.div>
        )}

        {currentView.type === 'profile' && (
          <motion.div
            key="profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ProfileView />
          </motion.div>
        )}

        {currentView.type === 'cast' && (
          <motion.div
            key={`cast-${currentView.castName}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <CastDetail />
          </motion.div>
        )}

        {currentView.type === 'studio' && (
          <motion.div
            key={`studio-${currentView.studioName}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <StudioDetail />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </ErrorBoundary>
  );
}
