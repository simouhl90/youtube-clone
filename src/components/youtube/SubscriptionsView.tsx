'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Play } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Header from './Header';
import { useAppStore } from '@/store/useAppStore';
import type { Video, Channel } from '@/types';

interface SubscribedChannel extends Channel {
  _count?: { videos: number };
}

export default function SubscriptionsView() {
  const { isSubscribed, toggleSubscribe } = useAppStore();
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const { data: channels, isLoading: channelsLoading } = useQuery({
    queryKey: ['channels'],
    queryFn: async () => {
      const res = await fetch('/api/videos?limit=100');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const channelMap = new Map<string, SubscribedChannel>();
      for (const video of data.videos as Video[]) {
        if (video.channel && !channelMap.has(video.channel.id)) {
          channelMap.set(video.channel.id, {
            ...video.channel,
            _count: { videos: 0 },
          });
        }
        if (video.channel) {
          const ch = channelMap.get(video.channel.id)!;
          ch._count = { videos: (ch._count?.videos || 0) + 1 };
        }
      }
      return Array.from(channelMap.values());
    },
  });

  const subscribedChannelIds = Object.entries(isSubscribed)
    .filter(([, v]) => v)
    .map(([k]) => k);

  const subscribedChannels = channels?.filter((c) =>
    subscribedChannelIds.includes(c.id)
  ) || [];

  const hasSubscriptions = subscribedChannels.length > 0;

  const { data: videosData, isLoading: videosLoading } = useQuery({
    queryKey: ['subscription-videos', subscribedChannelIds, selectedChannel],
    queryFn: async () => {
      const res = await fetch('/api/videos?limit=50');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      let filtered = (data.videos as Video[]).filter((v) =>
        subscribedChannelIds.includes(v.channelId)
      );
      if (selectedChannel) {
        filtered = filtered.filter((v) => v.channelId === selectedChannel);
      }
      return filtered;
    },
    enabled: hasSubscriptions,
  });

  const videos = videosData || [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      {/* Channel filter chips */}
      {hasSubscriptions && (
        <div className="flex gap-2 overflow-x-auto px-3 py-3 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setSelectedChannel(null)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              !selectedChannel
                ? 'bg-foreground text-background'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            All
          </button>
          {subscribedChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() =>
                setSelectedChannel(
                  selectedChannel === channel.id ? null : channel.id
                )
              }
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedChannel === channel.id
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              <Avatar className="size-5">
                <AvatarImage src={channel.avatarUrl} />
                <AvatarFallback className="text-[8px]">
                  {channel.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {channel.name}
            </button>
          ))}
        </div>
      )}

      {channelsLoading ? (
        <div className="space-y-4 px-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="mt-3 flex gap-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !hasSubscriptions ? (
        <div className="flex flex-col items-center justify-center px-6 py-16">
          <div className="size-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Play className="size-8 text-muted-foreground ml-0.5" />
          </div>
          <h2 className="text-base font-semibold mb-1">No subscriptions yet</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Subscribe to channels to see their latest videos here
          </p>

          <div className="w-full space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
              Suggested channels
            </h3>
            {(channels || []).slice(0, 5).map((channel) => (
              <div
                key={channel.id}
                className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3"
              >
                <Avatar className="size-12">
                  <AvatarImage src={channel.avatarUrl} />
                  <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium truncate">{channel.name}</span>
                    {channel.isVerified && (
                      <CheckCircle className="size-3.5 shrink-0 fill-muted-foreground text-background" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {channel.subscribers >= 1_000_000
                      ? `${(channel.subscribers / 1_000_000).toFixed(1)}M`
                      : channel.subscribers >= 1_000
                      ? `${(channel.subscribers / 1_000).toFixed(0)}K`
                      : channel.subscribers}{' '}
                    subscribers
                  </p>
                </div>
                <Button
                  onClick={() => toggleSubscribe(channel.id)}
                  variant={isSubscribed[channel.id] ? 'secondary' : 'default'}
                  size="sm"
                  className={`rounded-full text-xs ${
                    isSubscribed[channel.id]
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-foreground text-background'
                  }`}
                >
                  {isSubscribed[channel.id] ? 'Subscribed' : 'Subscribe'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <p className="text-sm text-muted-foreground">No videos from your subscriptions</p>
          <p className="text-xs text-muted-foreground">
            New videos from your subscribed channels will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4 px-3">
          {videos.map((video) => (
            <SubscriptionVideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

function SubscriptionVideoCard({ video }: { video: Video }) {
  const { navigate } = useAppStore();
  const channel = video.channel;

  return (
    <button
      onClick={() => navigate({ type: 'video', videoId: video.id })}
      className="flex w-full gap-3 text-left cursor-pointer"
    >
      <div className="relative w-40 shrink-0 aspect-video rounded-xl overflow-hidden bg-muted">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="size-full object-cover"
          loading="lazy"
        />
        {video.isLive ? (
          <span className="absolute bottom-1.5 right-1.5 rounded-sm bg-[#FF0000] px-1 py-0.5 text-[10px] font-semibold text-white">
            LIVE
          </span>
        ) : (
          video.duration && video.duration !== 'LIVE' && (
            <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 py-0.5 text-[10px] font-medium text-white">
              {video.duration}
            </span>
          )
        )}
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">{video.title}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <span>{channel?.name}</span>
          {channel?.isVerified && (
            <CheckCircle className="size-3 fill-muted-foreground text-background" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {video.views >= 1_000_000
            ? `${(video.views / 1_000_000).toFixed(1)}M`
            : video.views >= 1_000
            ? `${(video.views / 1_000).toFixed(1)}K`
            : video.views}{' '}
          views &middot; 3 days ago
        </p>
      </div>
    </button>
  );
}
