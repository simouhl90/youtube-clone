'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { formatViews, timeAgo } from '@/types';
import type { Video } from '@/types';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const { navigate } = useAppStore();

  const handleClick = () => {
    onClick(video);
    navigate({ type: 'video', videoId: video.id });
  };

  const channel = video.channel;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="size-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            No thumbnail
          </div>
        )}
        {/* Duration / LIVE badge */}
        {video.isLive ? (
          <Badge className="absolute bottom-2 right-2 rounded-sm bg-[#FF0000] px-1.5 py-0 text-[11px] font-semibold text-white hover:bg-[#FF0000] border-none">
            LIVE
          </Badge>
        ) : (
          video.duration && video.duration !== 'LIVE' ? (
            <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white">
              {video.duration}
            </span>
          ) : null
        )}
      </div>

      {/* Info */}
      <div className="mt-3 flex gap-3">
        {/* Channel Avatar */}
        <Avatar className="size-9 shrink-0">
          <AvatarImage src={channel?.avatarUrl} alt={channel?.name} />
          <AvatarFallback className="text-xs">
            {channel?.name?.charAt(0) || '?'}
          </AvatarFallback>
        </Avatar>

        {/* Text info */}
        <div className="flex-1 min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {video.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <span>{channel?.name}</span>
            {channel?.isVerified && (
              <CheckCircle className="size-3.5 fill-muted-foreground text-background" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatViews(video.views)} &middot; {timeAgo(video.uploadedAt)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
