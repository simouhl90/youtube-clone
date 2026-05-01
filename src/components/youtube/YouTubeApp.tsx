'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import BottomNav from './BottomNav';
import HomeView from './HomeView';
import VideoPlayerView from './VideoPlayerView';
import SearchView from './SearchView';
import SubscriptionsView from './SubscriptionsView';
import LibraryView from './LibraryView';
import ShortsView from './ShortsView';

const viewVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function YouTubeApp() {
  const { currentView } = useAppStore();

  const showBottomNav = currentView.type !== 'shorts' && currentView.type !== 'video';

  // Shorts gets full screen, no header/bottom nav
  if (currentView.type === 'shorts') {
    return <ShortsView />;
  }

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentView.type}-${currentView.type === 'video' ? currentView.videoId : currentView.type === 'search' ? currentView.query : ''}`}
          variants={viewVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {currentView.type === 'home' && <HomeView />}
          {currentView.type === 'search' && <SearchView />}
          {currentView.type === 'subscriptions' && <SubscriptionsView />}
          {currentView.type === 'library' && <LibraryView />}
          {currentView.type === 'video' && <VideoPlayerView videoId={currentView.videoId} />}
        </motion.div>
      </AnimatePresence>

      {showBottomNav && <BottomNav />}
    </div>
  );
}
