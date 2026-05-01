'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  BookmarkPlus,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Play,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { formatViews, formatSubscribers, timeAgo } from '@/types';
import type { Video, Comment } from '@/types';

export default function VideoPlayerView({ videoId }: { videoId: string }) {
  const { goBack, isSubscribed, toggleSubscribe, likedVideos, dislikedVideos, toggleLike, toggleDislike } = useAppStore();
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['video', videoId],
    queryFn: async () => {
      const res = await fetch(`/api/videos/${videoId}`);
      if (!res.ok) throw new Error('Failed to fetch video');
      return res.json() as Promise<{ video: Video; relatedVideos: Video[] }>;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 flex h-14 items-center gap-2 bg-background px-3">
          <div className="size-9" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="aspect-video w-full" />
        <div className="px-3 pt-3 space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!data?.video) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Video not found</p>
        <Button variant="outline" onClick={goBack}>Go back</Button>
      </div>
    );
  }

  const video = data.video;
  const relatedVideos = data.relatedVideos;
  const channel = video.channel;
  const subscribed = isSubscribed[channel?.id] || false;
  const isLiked = likedVideos[video.id] || false;
  const isDisliked = dislikedVideos[video.id] || false;

  const likeCount = isLiked ? video.likes + 1 : video.likes;
  const dislikeCount = isDisliked ? video.dislikes + 1 : video.dislikes;

  const hashtags = video.description.match(/#\w+/g) || [];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center gap-2 bg-background px-2 py-1.5">
        <button
          onClick={goBack}
          className="flex items-center justify-center size-9 rounded-full hover:bg-accent transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="size-5" />
        </button>
      </div>

      {/* Video thumbnail with play overlay */}
      <div className="relative aspect-video w-full bg-muted">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Skeleton className="size-full" />
          </div>
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="flex size-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
            <Play className="size-7 fill-white text-white ml-0.5" />
          </div>
        </div>
        {/* Duration badge */}
        {video.isLive ? (
          <Badge className="absolute bottom-2 right-2 rounded-sm bg-[#FF0000] px-1.5 py-0 text-[11px] font-semibold text-white hover:bg-[#FF0000] border-none">
            LIVE
          </Badge>
        ) : (
          video.duration && video.duration !== 'LIVE' && (
            <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white">
              {video.duration}
            </span>
          )
        )}
      </div>

      {/* Video info */}
      <div className="px-3 pt-3 space-y-3">
        <h1 className="text-base font-semibold leading-snug">{video.title}</h1>
        <p className="text-xs text-muted-foreground">
          {formatViews(video.views)} &middot; {timeAgo(video.uploadedAt)}
        </p>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Like/Dislike */}
            <div className="flex items-center rounded-full bg-secondary overflow-hidden">
              <button
                onClick={() => toggleLike(video.id)}
                className={`flex items-center gap-1.5 px-3 py-2 transition-colors ${
                  isLiked ? 'text-[#065fd4]' : 'text-foreground'
                }`}
              >
                <ThumbsUp className={`size-[18px] ${isLiked ? 'fill-[#065fd4]' : ''}`} />
                <span className="text-xs font-medium">
                  {likeCount >= 1000 ? `${(likeCount / 1000).toFixed(1)}K` : likeCount}
                </span>
              </button>
              <Separator orientation="vertical" className="h-5" />
              <button
                onClick={() => toggleDislike(video.id)}
                className="flex items-center px-3 py-2 transition-colors"
              >
                <ThumbsDown className={`size-[18px] ${isDisliked ? 'fill-[#065fd4] text-[#065fd4]' : 'text-foreground'}`} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-medium">
              <Share2 className="size-[18px]" />
              Share
            </button>
            <button className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-medium">
              <Download className="size-[18px]" />
              Download
            </button>
            <button className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-medium">
              <BookmarkPlus className="size-[18px]" />
              Save
            </button>
          </div>
        </div>

        <Separator />

        {/* Channel row */}
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage src={channel?.avatarUrl} alt={channel?.name} />
            <AvatarFallback>{channel?.name?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{channel?.name}</span>
              {channel?.isVerified && (
                <CheckCircle className="size-3.5 fill-muted-foreground text-background" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatSubscribers(channel?.subscribers || 0)}
            </p>
          </div>
          <Button
            onClick={() => toggleSubscribe(channel?.id || '')}
            variant={subscribed ? 'secondary' : 'default'}
            size="sm"
            className={`rounded-full text-xs font-medium ${
              subscribed
                ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                : 'bg-foreground text-background hover:bg-foreground/90'
            }`}
          >
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>

        <Separator />

        {/* Description */}
        <div className="rounded-xl bg-secondary p-3">
          <p className={`text-sm whitespace-pre-line ${!descriptionExpanded ? 'line-clamp-2' : ''}`}>
            {video.description}
          </p>
          {hashtags.length > 0 && !descriptionExpanded && (
            <div className="mt-1 flex flex-wrap gap-1">
              {hashtags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-blue-500">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <button
            onClick={() => setDescriptionExpanded(!descriptionExpanded)}
            className="mt-1 text-xs font-medium text-foreground"
          >
            {descriptionExpanded ? (
              <span className="flex items-center gap-1">Show less <ChevronUp className="size-3.5" /></span>
            ) : (
              <span className="flex items-center gap-1">Show more <ChevronDown className="size-3.5" /></span>
            )}
          </button>
        </div>

        <Separator />

        {/* Comments section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">
              {video.comments?.length || 0} Comments
            </span>
          </div>

          {/* Add comment */}
          <div className="flex items-start gap-3">
            <Avatar className="size-8">
              <AvatarImage src="https://picsum.photos/seed/myprofile/100/100" />
              <AvatarFallback className="text-[10px]">Y</AvatarFallback>
            </Avatar>
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 border-b border-border bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          {/* Comment list */}
          <div className="space-y-4">
            {(video.comments || []).map((comment: Comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                  <AvatarFallback className="text-[10px]">
                    {comment.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm">{comment.text}</p>
                  <div className="mt-1 flex items-center gap-3">
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                      <ThumbsUp className="size-3.5" />
                      <span className="text-xs">{comment.likes || ''}</span>
                    </button>
                    <button className="text-muted-foreground hover:text-foreground">
                      <ThumbsDown className="size-3.5" />
                    </button>
                    <button className="text-xs font-medium text-muted-foreground hover:text-foreground">
                      Reply
                    </button>
                  </div>
                </div>
                <button className="text-muted-foreground self-start mt-1">
                  <MoreVertical className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Related videos */}
        {relatedVideos && relatedVideos.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold">Related videos</h2>
            <div className="space-y-3">
              {relatedVideos.map((rv) => (
                <VideoPlayerRelatedCard
                  key={rv.id}
                  video={rv}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    goBack();
                    // Use a small delay to let the store update then navigate to the new video
                    setTimeout(() => {
                      const store = useAppStore.getState();
                      store.navigate({ type: 'video', videoId: rv.id });
                    }, 50);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}

function VideoPlayerRelatedCard({ video, onClick }: { video: Video; onClick: () => void }) {
  const channel = video.channel;

  return (
    <button
      onClick={onClick}
      className="flex gap-2 w-full text-left cursor-pointer"
    >
      <div className="relative w-40 shrink-0 aspect-video rounded-lg overflow-hidden bg-muted">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="size-full object-cover"
          loading="lazy"
        />
        {video.isLive ? (
          <Badge className="absolute bottom-1 right-1 rounded-sm bg-[#FF0000] px-1 py-0 text-[9px] font-semibold text-white hover:bg-[#FF0000] border-none">
            LIVE
          </Badge>
        ) : (
          video.duration && video.duration !== 'LIVE' && (
            <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[9px] font-medium text-white">
              {video.duration}
            </span>
          )
        )}
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <h3 className="line-clamp-2 text-xs font-medium leading-snug">{video.title}</h3>
        <p className="mt-1 text-[11px] text-muted-foreground">{channel?.name}</p>
        <p className="text-[11px] text-muted-foreground">
          {formatViews(video.views)} &middot; {timeAgo(video.uploadedAt)}
        </p>
      </div>
    </button>
  );
}
