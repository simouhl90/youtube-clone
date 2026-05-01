export interface Channel {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  bannerUrl?: string;
  subscribers: number;
  isVerified: boolean;
  description?: string;
  createdAt: string;
  videos?: Video[];
}

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  isLive: boolean;
  category: string;
  uploadedAt: string;
  channelId: string;
  channel?: Channel;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  avatarUrl: string;
  likes: number;
  createdAt: string;
  videoId: string;
}

export type AppView = 
  | { type: 'home' }
  | { type: 'video'; videoId: string }
  | { type: 'search'; query?: string }
  | { type: 'subscriptions' }
  | { type: 'library' }
  | { type: 'shorts' };

export const CATEGORIES = [
  'All',
  'Trending',
  'Music',
  'Gaming',
  'News',
  'Sports',
  'Learning',
  'Fashion',
  'Podcasts',
  'Movies',
  'Live',
  'Comedy',
  'Technology',
  'Cooking',
  'Travel',
  'Science',
] as const;

export type Category = (typeof CATEGORIES)[number];

export function formatViews(views: number): string {
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B views`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views} views`;
}

export function formatSubscribers(subs: number): string {
  if (subs >= 1_000_000) return `${(subs / 1_000_000).toFixed(1)}M subscribers`;
  if (subs >= 1_000) return `${(subs / 1_000).toFixed(1)}K subscribers`;
  return `${subs} subscribers`;
}

export function timeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}
