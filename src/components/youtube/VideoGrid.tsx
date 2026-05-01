'use client';

import { useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import VideoCard from './VideoCard';
import { useAppStore } from '@/store/useAppStore';
import type { Video } from '@/types';

interface VideoGridProps {
  category?: string;
  searchQuery?: string;
}

interface VideoResponse {
  videos: Video[];
  nextCursor: string | null;
}

export default function VideoGrid({ category, searchQuery }: VideoGridProps) {
  const { navigate } = useAppStore();

  const fetchVideos = useCallback(
    async ({ pageParam }: { pageParam: string | null }): Promise<VideoResponse> => {
      if (searchQuery) {
        const params = new URLSearchParams({ q: searchQuery, limit: '12' });
        if (pageParam) params.set('cursor', pageParam);
        const res = await fetch(`/api/search?${params}`);
        if (!res.ok) throw new Error('Failed to search');
        return res.json();
      }

      const params = new URLSearchParams({ limit: '12' });
      if (category && category !== 'All') params.set('category', category);
      if (pageParam) params.set('cursor', pageParam);
      const res = await fetch(`/api/videos?${params}`);
      if (!res.ok) throw new Error('Failed to fetch videos');
      return res.json();
    },
    [category, searchQuery]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['videos', category, searchQuery],
    queryFn: fetchVideos,
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allVideos = data?.pages.flatMap((page) => page.videos) ?? [];

  if (isLoading) {
    return <VideoCardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-sm text-muted-foreground">Failed to load videos</p>
        <button
          onClick={() => refetch()}
          className="text-sm font-medium text-blue-500 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (allVideos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-2">
        <p className="text-sm text-muted-foreground">No videos found</p>
        {searchQuery && (
          <p className="text-xs text-muted-foreground">
            Try different keywords or remove search filters
          </p>
        )}
      </div>
    );
  }

  const handleVideoClick = (video: Video) => {
    navigate({ type: 'video', videoId: video.id });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 px-3">
        {allVideos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={handleVideoClick} />
        ))}
      </div>

      {/* Scroll sentinel for infinite scroll */}
      <div id="scroll-sentinel" className="h-1" />

      {/* Loading more indicator */}
      {isFetchingNextPage && <VideoCardSkeleton count={2} />}

      {/* End of list */}
      {!hasNextPage && allVideos.length > 0 && (
        <p className="py-4 text-center text-xs text-muted-foreground">
          You&apos;ve seen all videos
        </p>
      )}
    </div>
  );
}

function VideoCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="px-3">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="mt-3 flex gap-3">
            <Skeleton className="size-9 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
