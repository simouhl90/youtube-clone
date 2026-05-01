'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  History,
  Video,
  Clock,
  ThumbsUp,
  ListVideo,
  PlayCircle,
} from 'lucide-react';
import Header from './Header';
import { useAppStore } from '@/store/useAppStore';
import type { Video as VideoType } from '@/types';

interface LibrarySection {
  id: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
}

export default function LibraryView() {
  const { likedVideos } = useAppStore();
  const [expandedSection, setExpandedSection] = useState<string | null>('liked');

  const likedCount = Object.values(likedVideos).filter(Boolean).length;

  const sections: LibrarySection[] = [
    { id: 'history', icon: <History className="size-5" />, label: 'History' },
    { id: 'your-videos', icon: <Video className="size-5" />, label: 'Your videos' },
    { id: 'watch-later', icon: <Clock className="size-5" />, label: 'Watch later' },
    {
      id: 'liked',
      icon: <ThumbsUp className="size-5" />,
      label: 'Liked videos',
      count: likedCount > 0 ? likedCount : undefined,
    },
    { id: 'playlists', icon: <ListVideo className="size-5" />, label: 'Playlists' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <div className="px-3 py-2 space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() =>
              setExpandedSection(
                expandedSection === section.id ? null : section.id
              )
            }
            className="flex w-full items-center gap-4 rounded-xl px-3 py-3.5 hover:bg-accent transition-colors text-left"
          >
            <div className="text-muted-foreground">{section.icon}</div>
            <span className="flex-1 text-sm font-medium">{section.label}</span>
            {section.count !== undefined && (
              <span className="text-xs text-muted-foreground">
                {section.count}
              </span>
            )}
            <svg
              className={`size-4 text-muted-foreground transition-transform ${
                expandedSection === section.id ? 'rotate-90' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {expandedSection === 'liked' && <LibraryLikedVideos />}
      {expandedSection === 'history' && (
        <LibraryEmptyState icon={<History className="size-10" />} message="Watch history isn't available" />
      )}
      {expandedSection === 'your-videos' && (
        <LibraryEmptyState icon={<Video className="size-10" />} message="You don't have any videos" />
      )}
      {expandedSection === 'watch-later' && (
        <LibraryEmptyState icon={<Clock className="size-10" />} message="Videos you save will show up here" />
      )}
      {expandedSection === 'playlists' && <LibraryPlaylistsSection />}
    </div>
  );
}

function LibraryEmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function LibraryLikedVideos() {
  const { likedVideos, navigate } = useAppStore();

  const likedIds = useMemo(
    () => Object.entries(likedVideos).filter(([, v]) => v).map(([k]) => k),
    [likedVideos]
  );

  const { data: allVideos, isLoading } = useQuery({
    queryKey: ['all-videos-for-liked'],
    queryFn: async () => {
      const res = await fetch('/api/videos?limit=100');
      if (!res.ok) throw new Error('Failed');
      return res.json().then((d) => d.videos as VideoType[]);
    },
    enabled: likedIds.length > 0,
  });

  const videos = allVideos?.filter((v) => likedIds.includes(v.id)) ?? [];

  if (isLoading) {
    return (
      <div className="px-3 pb-4 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="w-32 aspect-video rounded-lg bg-muted animate-pulse" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 w-full bg-muted animate-pulse rounded" />
              <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (likedIds.length === 0 || videos.length === 0) {
    return (
      <LibraryEmptyState
        icon={<ThumbsUp className="size-10" />}
        message="Videos you like will show up here"
      />
    );
  }

  return (
    <div className="px-3 pb-4 space-y-3">
      <div className="flex items-center gap-2">
        <ThumbsUp className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">Liked videos</h3>
        <span className="text-xs text-muted-foreground">{videos.length} videos</span>
      </div>
      {videos.map((video) => (
        <button
          key={video.id}
          onClick={() => navigate({ type: 'video', videoId: video.id })}
          className="flex w-full gap-2 text-left cursor-pointer"
        >
          <div className="relative w-32 shrink-0 aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="size-full object-cover"
              loading="lazy"
            />
            {video.duration && video.duration !== 'LIVE' && (
              <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[9px] font-medium text-white">
                {video.duration}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 py-0.5">
            <h4 className="line-clamp-2 text-xs font-medium leading-snug">{video.title}</h4>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{video.channel?.name}</p>
            <p className="text-[11px] text-muted-foreground">
              {video.views >= 1_000_000
                ? `${(video.views / 1_000_000).toFixed(1)}M`
                : video.views >= 1_000
                ? `${(video.views / 1_000).toFixed(1)}K`
                : video.views}{' '}
              views
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function LibraryPlaylistsSection() {
  return (
    <div className="px-3 pb-4 space-y-3">
      <h3 className="text-sm font-medium">Your playlists</h3>
      <div className="grid grid-cols-2 gap-3">
        {['Favorites', 'Watch Later', 'Music', 'Gaming'].map((name) => (
          <div
            key={name}
            className="rounded-xl overflow-hidden bg-secondary cursor-pointer hover:bg-accent transition-colors"
          >
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <PlayCircle className="size-10 text-white/80" />
              </div>
              <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[10px] text-white">
                Empty
              </div>
            </div>
            <div className="p-2">
              <div className="flex items-center gap-1.5">
                <ListVideo className="size-4 text-muted-foreground" />
                <span className="text-xs font-medium">{name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
