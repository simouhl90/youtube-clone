import { create } from 'zustand';
import type { AppView, WatchProgress, Review } from '@/types';
import { defaultContinueWatching } from '@/lib/mock-data';

interface AppState {
  currentView: AppView;
  history: AppView[];
  watchlist: Set<string>;
  continueWatching: WatchProgress[];
  reviews: Review[];
  notifications: number;
  splashDone: boolean;

  navigate: (view: AppView) => void;
  goBack: () => void;
  toggleWatchlist: (seriesId: string) => void;
  isInWatchlist: (seriesId: string) => boolean;
  updateProgress: (progress: WatchProgress) => void;
  addReview: (review: Review) => void;
  getReviews: (seriesId: string) => Review[];
  dismissNotifications: () => void;
  setSplashDone: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentView: { type: 'home' },
  history: [],
  watchlist: new Set<string>(),
  continueWatching: defaultContinueWatching,
  reviews: [],
  notifications: 3,
  splashDone: false,

  navigate: (view) => {
    const { currentView, history } = get();
    if (view.type === 'series' && currentView.type === 'series' && view.seriesId === currentView.seriesId) return;
    set({ currentView: view, history: [...history, currentView] });
  },

  goBack: () => {
    const { history } = get();
    if (history.length === 0) {
      set({ currentView: { type: 'home' } });
      return;
    }
    const previous = history[history.length - 1];
    set({ currentView: previous, history: history.slice(0, -1) });
  },

  toggleWatchlist: (seriesId) => {
    set((state) => {
      const newWatchlist = new Set(state.watchlist);
      if (newWatchlist.has(seriesId)) {
        newWatchlist.delete(seriesId);
      } else {
        newWatchlist.add(seriesId);
      }
      return { watchlist: newWatchlist };
    });
  },

  isInWatchlist: (seriesId) => {
    return get().watchlist.has(seriesId);
  },

  updateProgress: (progress) => {
    set((state) => {
      const existing = state.continueWatching.findIndex(
        (p) => p.seriesId === progress.seriesId
      );
      let newProgress: WatchProgress[];
      if (existing >= 0) {
        newProgress = [...state.continueWatching];
        newProgress[existing] = progress;
      } else {
        newProgress = [progress, ...state.continueWatching];
      }
      return { continueWatching: newProgress };
    });
  },

  addReview: (review) => {
    set((state) => ({
      reviews: [review, ...state.reviews],
    }));
  },

  getReviews: (seriesId) => {
    return get().reviews.filter((r) => r.seriesId === seriesId);
  },

  dismissNotifications: () => {
    set({ notifications: 0 });
  },

  setSplashDone: () => {
    set({ splashDone: true });
  },
}));
