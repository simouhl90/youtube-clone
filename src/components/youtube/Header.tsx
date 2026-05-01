'use client';

import { useRef, useEffect } from 'react';
import { Search, Mic, ArrowLeft, Bell, Cast } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAppStore } from '@/store/useAppStore';

export default function Header() {
  const { currentView, navigate, goBack } = useAppStore();
  const isSearchView = currentView.type === 'search';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchView && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchView]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (query?.trim()) {
      navigate({ type: 'search', query: query.trim() });
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-2 bg-background/95 backdrop-blur-sm px-3">
      {isSearchView ? (
        <>
          <button
            onClick={goBack}
            className="flex items-center justify-center size-9 rounded-full hover:bg-accent transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5" />
          </button>
          <form onSubmit={handleSearchSubmit} className="flex flex-1 items-center">
            <input
              ref={inputRef}
              name="search"
              type="text"
              defaultValue={currentView.type === 'search' ? currentView.query : ''}
              placeholder="Search YouTube"
              className="h-9 flex-1 rounded-l-full border border-border bg-transparent px-4 text-sm outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="flex h-9 items-center justify-center rounded-r-full border border-l-0 border-border bg-secondary px-3 hover:bg-accent transition-colors"
              aria-label="Search"
            >
              <Search className="size-[18px] text-foreground" />
            </button>
          </form>
          <button
            className="flex items-center justify-center size-9 rounded-full hover:bg-accent transition-colors ml-1"
            aria-label="Voice search"
          >
            <Mic className="size-5" />
          </button>
        </>
      ) : (
        <>
          {/* YouTube Logo */}
          <button
            onClick={() => navigate({ type: 'home' })}
            className="flex items-center gap-0.5 shrink-0"
          >
            <svg viewBox="0 0 90 20" className="h-5 w-auto" preserveAspectRatio="xMidYMid meet">
              <g>
                {/* Play button icon */}
                <path
                  d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                  fill="#FF0000"
                />
                <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
                {/* YouTube text */}
                <text x="32" y="15.5" className="fill-foreground" fontSize="15" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="-0.5">
                  YouTube
                </text>
              </g>
            </svg>
          </button>

          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              className="flex items-center justify-center size-9 rounded-full hover:bg-accent transition-colors"
              aria-label="Cast"
            >
              <Cast className="size-[18px]" />
            </button>
            <button
              className="flex items-center justify-center size-9 rounded-full hover:bg-accent transition-colors"
              aria-label="Notifications"
            >
              <Bell className="size-[18px]" />
            </button>
            <button className="ml-1" aria-label="Profile">
              <Avatar className="size-7">
                <AvatarImage src="https://picsum.photos/seed/myprofile/100/100" alt="Profile" />
                <AvatarFallback className="bg-purple-600 text-white text-xs">Y</AvatarFallback>
              </Avatar>
            </button>
          </div>
        </>
      )}
    </header>
  );
}
