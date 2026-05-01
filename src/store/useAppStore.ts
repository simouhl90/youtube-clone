import { create } from 'zustand';
import type { AppView, Category } from '@/types';

interface AppState {
  currentView: AppView;
  selectedCategory: Category;
  history: AppView[];
  isSubscribed: Record<string, boolean>;
  likedVideos: Record<string, boolean>;
  dislikedVideos: Record<string, boolean>;
  searchHistory: string[];

  navigate: (view: AppView) => void;
  goBack: () => void;
  setCategory: (category: Category) => void;
  toggleSubscribe: (channelId: string) => void;
  toggleLike: (videoId: string) => void;
  toggleDislike: (videoId: string) => void;
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentView: { type: 'home' },
  selectedCategory: 'All',
  history: [],
  isSubscribed: {},
  likedVideos: {},
  dislikedVideos: {},
  searchHistory: ['Next.js tutorial', 'React hooks', 'TypeScript tips', 'CSS animations'],

  navigate: (view) => {
    const { currentView, history } = get();
    // Don't push if navigating to the same view
    if (view.type === 'video' && currentView.type === 'video' && view.videoId === currentView.videoId) return;
    if (view.type === 'search' && currentView.type === 'search' && view.query === currentView.query) return;
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

  setCategory: (category) => set({ selectedCategory: category }),
  
  toggleSubscribe: (channelId) => {
    set((state) => ({
      isSubscribed: {
        ...state.isSubscribed,
        [channelId]: !state.isSubscribed[channelId],
      },
    }));
  },

  toggleLike: (videoId) => {
    set((state) => {
      const isCurrentlyLiked = state.likedVideos[videoId] || false;
      return {
        likedVideos: {
          ...state.likedVideos,
          [videoId]: !isCurrentlyLiked,
        },
        dislikedVideos: {
          ...state.dislikedVideos,
          [videoId]: false,
        },
      };
    });
  },

  toggleDislike: (videoId) => {
    set((state) => {
      const isCurrentlyDisliked = state.dislikedVideos[videoId] || false;
      return {
        dislikedVideos: {
          ...state.dislikedVideos,
          [videoId]: !isCurrentlyDisliked,
        },
        likedVideos: {
          ...state.likedVideos,
          [videoId]: false,
        },
      };
    });
  },

  addSearchHistory: (query) => {
    set((state) => ({
      searchHistory: [query, ...state.searchHistory.filter(q => q !== query)].slice(0, 10),
    }));
  },

  clearSearchHistory: () => set({ searchHistory: [] }),
}));
