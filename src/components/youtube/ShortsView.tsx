'use client';

import { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ThumbsUp, MessageCircle, Share2, MoreVertical, Pause } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Video } from '@/types';

export default function ShortsView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: videos, isLoading } = useQuery({
    queryKey: ['shorts'],
    queryFn: async () => {
      const res = await fetch('/api/videos?limit=20');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      return data.videos as Video[];
    },
  });

  // Handle scroll snap to detect current video
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(idx)) setCurrentIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    const children = el.querySelectorAll('[data-index]');
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [videos]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="size-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const shorts = videos?.filter((v) => !v.isLive) || [];

  return (
    <div
      ref={scrollRef}
      className="fixed inset-0 bg-black snap-y snap-mandatory overflow-y-auto"
      style={{ scrollbarWidth: 'none' }}
    >
      {shorts.map((video, index) => (
        <div
          key={video.id}
          data-index={index}
          className="relative h-screen w-full snap-center snap-always flex items-center justify-center"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="size-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
          </div>

          {/* Pause overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Pause className="size-12 text-white/0" />
          </div>

          {/* Right side action buttons */}
          <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-10">
            <button className="flex flex-col items-center gap-1">
              <div className="flex size-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                <ThumbsUp className="size-5 text-white" />
              </div>
              <span className="text-[10px] text-white font-medium">
                {video.likes >= 1000 ? `${(video.likes / 1000).toFixed(1)}K` : video.likes}
              </span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <div className="flex size-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                <MessageCircle className="size-5 text-white" />
              </div>
              <span className="text-[10px] text-white font-medium">
                {video.comments?.length || 0}
              </span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <div className="flex size-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                <Share2 className="size-5 text-white" />
              </div>
              <span className="text-[10px] text-white font-medium">Share</span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <div className="flex size-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                <MoreVertical className="size-5 text-white" />
              </div>
            </button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-8 left-3 right-16 z-10">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="size-8 border border-white/30">
                <AvatarImage src={video.channel?.avatarUrl} />
                <AvatarFallback className="bg-gray-700 text-white text-xs">
                  {video.channel?.name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-white">
                {video.channel?.name}
              </span>
              <Badge className="bg-white text-black hover:bg-white/90 text-[10px] font-semibold px-2 rounded-md border-none">
                Subscribe
              </Badge>
            </div>
            <p className="text-sm text-white line-clamp-2 leading-snug">
              {video.title}
            </p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-white/20 z-10">
            <div
              className="h-full bg-white transition-all"
              style={{ width: `${index <= currentIndex ? 100 : 0}%` }}
            />
          </div>
        </div>
      ))}

      {shorts.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-white/60 text-sm">No shorts available</p>
        </div>
      )}
    </div>
  );
}
