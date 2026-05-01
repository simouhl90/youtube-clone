export interface CastMember {
  name: string;
  role: string;
  photo: string;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  rating: number;
  airDate: string;
}

export interface Season {
  number: number;
  episodes: Episode[];
  year: string;
}

export interface Series {
  id: string;
  title: string;
  titleAr?: string;
  poster: string;
  backdrop: string;
  logo?: string;
  description: string;
  genre: string[];
  year: number;
  rating: number;
  ratingCount: number;
  maturity: string;
  seasons: Season[];
  cast: CastMember[];
  status: 'Airing' | 'Completed' | 'Upcoming';
  studio: string;
  country: string;
  language: string;
  totalEpisodes: number;
  featured?: boolean;
  trending?: boolean;
}

export interface WatchProgress {
  seriesId: string;
  seasonNumber: number;
  episodeNumber: number;
  progress: number; // 0-100
}

export type AppView =
  | { type: 'home' }
  | { type: 'series'; seriesId: string }
  | { type: 'search'; query?: string }
  | { type: 'watchlist' }
  | { type: 'profile' }
  | { type: 'discover' };

export const GENRES = [
  'All',
  '🔥 Trending',
  '🧛 Horror',
  '🎭 Drama',
  '😂 Comedy',
  '💎 Action',
  '🔍 Mystery',
  '💔 Romance',
  '🔬 Sci-Fi',
  '📜 History',
  '🍜 Asian',
  '🇹🇷 Turkish',
  '👨‍👩‍👧 Family',
  '🕵️ Thriller',
  '🌅 Fantasy',
] as const;

export type Genre = (typeof GENRES)[number];

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatYear(year: number): string {
  return year.toString();
}

export function formatDuration(duration: string): string {
  return duration;
}

export function getGenreEmoji(genre: string): string {
  const map: Record<string, string> = {
    'Action': '💎', 'Comedy': '😂', 'Drama': '🎭', 'Horror': '🧛',
    'Romance': '💔', 'Sci-Fi': '🔬', 'Thriller': '🕵️', 'Mystery': '🔍',
    'Fantasy': '🌅', 'History': '📜', 'Family': '👨‍👩‍👧', 'Crime': '🔫',
    'War': '⚔️', 'Animation': '🎨', 'Documentary': '📹', 'Asian': '🍜',
    'Turkish': '🇹🇷', 'Trending': '🔥',
  };
  return map[genre] || '🎬';
}

export function getMaturityColor(maturity: string): string {
  if (maturity.includes('18') || maturity === 'R') return 'bg-red-600';
  if (maturity.includes('16') || maturity === 'TV-MA') return 'bg-orange-500';
  if (maturity.includes('13') || maturity === 'PG-13') return 'bg-yellow-500';
  return 'bg-green-500';
}
