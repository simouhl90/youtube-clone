'use client';

import { useCallback } from 'react';
import { Clock, X, TrendingUp, Search } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import Header from './Header';
import VideoGrid from './VideoGrid';

const TRENDING_SEARCHES = [
  'GTA 6 trailer',
  'iPhone 16 review',
  'Best laptops 2024',
  'Cooking recipes',
  'Workout motivation',
  'AI news today',
  'Travel vlog',
  'Music playlist',
];

export default function SearchView() {
  const { currentView, navigate, searchHistory, addSearchHistory, clearSearchHistory } = useAppStore();

  const activeQuery = currentView.type === 'search' ? currentView.query : undefined;
  const hasActiveQuery = !!activeQuery;

  const handleSearch = useCallback(
    (searchQuery: string) => {
      const trimmed = searchQuery.trim();
      if (trimmed) {
        addSearchHistory(trimmed);
        navigate({ type: 'search', query: trimmed });
      }
    },
    [addSearchHistory, navigate]
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {hasActiveQuery ? (
        <VideoGrid searchQuery={activeQuery} />
      ) : (
        <div className="px-4 py-4">
          {/* Search history */}
          {searchHistory.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">Recent</h2>
                <button
                  onClick={clearSearchHistory}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-0">
                {searchHistory.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="flex w-full items-center gap-4 py-3 text-left hover:bg-accent rounded-lg px-2 transition-colors"
                  >
                    <Clock className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 text-sm truncate">{item}</span>
                    <X className="size-4 shrink-0 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending searches */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Trending</h2>
            </div>
            <div className="space-y-0">
              {TRENDING_SEARCHES.map((item, index) => (
                <button
                  key={item}
                  onClick={() => handleSearch(item)}
                  className="flex w-full items-center gap-4 py-3 text-left hover:bg-accent rounded-lg px-2 transition-colors"
                >
                  <span className="text-sm font-medium text-muted-foreground w-5 shrink-0 text-right">
                    {index + 1}
                  </span>
                  <Search className="size-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 text-sm truncate">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
