import type { Video, Channel, Comment } from '@/types';

// ============================================================
// In-memory mock data — works everywhere, no database needed
// ============================================================

export const channels: Channel[] = [
  { id: 'ch1', name: 'TechVision', handle: 'techvision', avatarUrl: 'https://picsum.photos/seed/techvisionavatar/100/100', bannerUrl: 'https://picsum.photos/seed/techvisionbanner/1200/300', subscribers: 2400000, isVerified: true, description: 'Exploring the future of technology.', createdAt: '2024-01-15T00:00:00Z' },
  { id: 'ch2', name: 'Cooking Masterclass', handle: 'cookingmasterclass', avatarUrl: 'https://picsum.photos/seed/cookingmasterclassavatar/100/100', subscribers: 890000, isVerified: true, description: 'Learn to cook like a pro.', createdAt: '2024-02-01T00:00:00Z' },
  { id: 'ch3', name: 'GamingZone', handle: 'gamingzone', avatarUrl: 'https://picsum.photos/seed/gamingzoneavatar/100/100', subscribers: 5200000, isVerified: true, description: 'Daily gaming content and reviews.', createdAt: '2024-01-20T00:00:00Z' },
  { id: 'ch4', name: 'Music Vibes', handle: 'musicvibes', avatarUrl: 'https://picsum.photos/seed/musicvibesavatar/100/100', subscribers: 12000000, isVerified: true, description: 'Music videos, covers, and live performances.', createdAt: '2024-01-10T00:00:00Z' },
  { id: 'ch5', name: 'Fitness Pro', handle: 'fitnesspro', avatarUrl: 'https://picsum.photos/seed/fitnessproavatar/100/100', subscribers: 3400000, isVerified: true, description: 'Transform your body with science-based workouts.', createdAt: '2024-02-10T00:00:00Z' },
  { id: 'ch6', name: 'Travel Adventures', handle: 'traveladventures', avatarUrl: 'https://picsum.photos/seed/traveladventuresavatar/100/100', subscribers: 1800000, isVerified: false, description: 'Exploring the world one destination at a time.', createdAt: '2024-03-01T00:00:00Z' },
  { id: 'ch7', name: 'Science Explained', handle: 'scienceexplained', avatarUrl: 'https://picsum.photos/seed/scienceexplainedavatar/100/100', subscribers: 6700000, isVerified: true, description: 'Making complex science simple and fun.', createdAt: '2024-01-05T00:00:00Z' },
  { id: 'ch8', name: 'Daily News Now', handle: 'dailynewsnow', avatarUrl: 'https://picsum.photos/seed/dailynewsnowavatar/100/100', subscribers: 9800000, isVerified: true, description: 'Breaking news and in-depth analysis.', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'ch9', name: 'Comedy Central', handle: 'comedycentral', avatarUrl: 'https://picsum.photos/seed/comedycentralavatar/100/100', subscribers: 15000000, isVerified: true, description: 'Best comedy sketches and stand-up.', createdAt: '2024-01-12T00:00:00Z' },
  { id: 'ch10', name: 'DIY Crafts', handle: 'diycrafts', avatarUrl: 'https://picsum.photos/seed/diycraftsavatar/100/100', subscribers: 560000, isVerified: false, description: 'Creative projects and DIY inspiration.', createdAt: '2024-03-15T00:00:00Z' },
  { id: 'ch11', name: 'Auto World', handle: 'autoworld', avatarUrl: 'https://picsum.photos/seed/autoworldavatar/100/100', subscribers: 4200000, isVerified: true, description: 'Car reviews and automotive news.', createdAt: '2024-02-20T00:00:00Z' },
  { id: 'ch12', name: 'Nature Documentary', handle: 'naturedocumentary', avatarUrl: 'https://picsum.photos/seed/naturedocumentaryavatar/100/100', subscribers: 7800000, isVerified: true, description: 'Stunning nature footage.', createdAt: '2024-01-08T00:00:00Z' },
  { id: 'ch13', name: 'Code Academy', handle: 'codeacademy', avatarUrl: 'https://picsum.photos/seed/codeacademyavatar/100/100', subscribers: 3100000, isVerified: true, description: 'Learn programming from scratch.', createdAt: '2024-02-15T00:00:00Z' },
  { id: 'ch14', name: 'Fashion Forward', handle: 'fashionforward', avatarUrl: 'https://picsum.photos/seed/fashionforwardavatar/100/100', subscribers: 2200000, isVerified: false, description: 'Style tips and fashion trends.', createdAt: '2024-03-05T00:00:00Z' },
  { id: 'ch15', name: 'Space Explorer', handle: 'spaceexplorer', avatarUrl: 'https://picsum.photos/seed/spaceexploravatar/100/100', subscribers: 4500000, isVerified: true, description: 'Journey through the cosmos.', createdAt: '2024-01-25T00:00:00Z' },
];

const channelMap = new Map(channels.map((c) => [c.id, c]));

interface VideoRaw {
  title: string; channelId: string; duration: string; category: string; daysAgo: number; views: number;
}

const rawVideos: VideoRaw[] = [
  { title: 'iPhone 16 Pro Max Review: The Ultimate Smartphone?', channelId: 'ch1', duration: '15:30', category: 'Technology', daysAgo: 2, views: 4200000 },
  { title: 'I Built a Smart Home for Under $500', channelId: 'ch1', duration: '22:18', category: 'Technology', daysAgo: 5, views: 1800000 },
  { title: 'Top 10 Tech Gadgets of 2024 You NEED to See', channelId: 'ch1', duration: '10:15', category: 'Trending', daysAgo: 1, views: 8500000 },
  { title: 'Why I Switched from Mac to Windows', channelId: 'ch1', duration: '18:22', category: 'Technology', daysAgo: 8, views: 3200000 },
  { title: 'The Future of AI: What to Expect in 2025', channelId: 'ch1', duration: '12:03', category: 'Technology', daysAgo: 3, views: 6700000 },
  { title: 'Unboxing the New MacBook Pro M4 Max', channelId: 'ch1', duration: '8:47', category: 'Technology', daysAgo: 1, views: 5100000 },
  { title: 'Best Budget Laptops for Students 2024', channelId: 'ch1', duration: '7:42', category: 'Technology', daysAgo: 14, views: 920000 },
  { title: "Gordon Ramsay's Perfect Beef Wellington Recipe", channelId: 'ch2', duration: '15:30', category: 'Cooking', daysAgo: 4, views: 12000000 },
  { title: '5 Easy Weeknight Dinners Under 30 Minutes', channelId: 'ch2', duration: '10:15', category: 'Cooking', daysAgo: 7, views: 5600000 },
  { title: 'The Secret to Restaurant-Quality Pasta at Home', channelId: 'ch2', duration: '8:47', category: 'Cooking', daysAgo: 10, views: 3800000 },
  { title: 'Japanese Street Food Tour - Tokyo Edition', channelId: 'ch2', duration: '22:18', category: 'Cooking', daysAgo: 3, views: 7800000 },
  { title: 'How to Make Sourdough Bread from Scratch', channelId: 'ch2', duration: '18:22', category: 'Cooking', daysAgo: 12, views: 2100000 },
  { title: "Beginner's Guide to Meal Prepping", channelId: 'ch2', duration: '12:03', category: 'Cooking', daysAgo: 6, views: 1500000 },
  { title: 'GTA 6 - Everything We Know So Far (2024 Update)', channelId: 'ch3', duration: '22:18', category: 'Gaming', daysAgo: 1, views: 15000000 },
  { title: 'I Played Minecraft for 100 Days Straight', channelId: 'ch3', duration: '45:00', category: 'Gaming', daysAgo: 5, views: 9200000 },
  { title: 'Elden Ring DLC - Full Walkthrough Part 1', channelId: 'ch3', duration: '1:23:45', category: 'Gaming', daysAgo: 2, views: 4300000 },
  { title: 'Top 20 Best PC Games of 2024', channelId: 'ch3', duration: '18:22', category: 'Gaming', daysAgo: 8, views: 6700000 },
  { title: 'Fortnite Season 5 - New Map Changes', channelId: 'ch3', duration: '10:15', category: 'Gaming', daysAgo: 1, views: 8100000 },
  { title: 'Palworld Review - Is It Better Than Pokémon?', channelId: 'ch3', duration: '15:30', category: 'Gaming', daysAgo: 20, views: 11000000 },
  { title: 'Taylor Swift - New Album Full Track Breakdown', channelId: 'ch4', duration: '18:22', category: 'Music', daysAgo: 3, views: 22000000 },
  { title: 'Top 50 Songs of 2024 - Year End Mashup', channelId: 'ch4', duration: '45:00', category: 'Music', daysAgo: 5, views: 18000000 },
  { title: 'How to Produce Music Like a Pro', channelId: 'ch4', duration: '22:18', category: 'Music', daysAgo: 10, views: 3400000 },
  { title: 'Best Guitar Solos of All Time - Ranked', channelId: 'ch4', duration: '15:30', category: 'Music', daysAgo: 15, views: 8900000 },
  { title: 'Lo-Fi Beats to Study/Relax To - 24/7 Live Stream', channelId: 'ch4', duration: '3:24', category: 'Music', daysAgo: 1, views: 45000000 },
  { title: 'Full Body Workout - No Equipment Needed', channelId: 'ch5', duration: '30:00', category: 'Sports', daysAgo: 2, views: 7800000 },
  { title: '30-Day Transformation Challenge Results', channelId: 'ch5', duration: '10:15', category: 'Sports', daysAgo: 7, views: 5400000 },
  { title: 'Science of Protein - How Much Do You Need?', channelId: 'ch5', duration: '8:47', category: 'Learning', daysAgo: 14, views: 2100000 },
  { title: 'Yoga for Flexibility - 20 Minute Daily Practice', channelId: 'ch5', duration: '20:00', category: 'Sports', daysAgo: 4, views: 6300000 },
  { title: 'Backpacking Through Southeast Asia - 30 Day Vlog', channelId: 'ch6', duration: '45:00', category: 'Travel', daysAgo: 3, views: 4200000 },
  { title: 'Top 10 Hidden Gems in Europe', channelId: 'ch6', duration: '22:18', category: 'Travel', daysAgo: 10, views: 2800000 },
  { title: "What Happens If You Fall Into a Black Hole?", channelId: 'ch7', duration: '15:30', category: 'Science', daysAgo: 4, views: 18000000 },
  { title: 'Quantum Physics Explained Simply', channelId: 'ch7', duration: '10:15', category: 'Science', daysAgo: 8, views: 12000000 },
  { title: 'The James Webb Telescope - Latest Discoveries', channelId: 'ch7', duration: '18:22', category: 'Science', daysAgo: 2, views: 9500000 },
  { title: 'DNA Editing with CRISPR - Should We Be Worried?', channelId: 'ch7', duration: '12:03', category: 'Science', daysAgo: 15, views: 7800000 },
  { title: 'The Scale of the Universe - Mind Blowing', channelId: 'ch7', duration: '8:47', category: 'Science', daysAgo: 20, views: 15000000 },
  { title: 'Major Tech Companies Announce AI Partnership', channelId: 'ch8', duration: '5:55', category: 'News', daysAgo: 1, views: 5200000 },
  { title: 'Global Economy Update: What You Need to Know', channelId: 'ch8', duration: '10:15', category: 'News', daysAgo: 2, views: 3800000 },
  { title: 'Try Not to Laugh Challenge - Impossible Edition', channelId: 'ch9', duration: '15:30', category: 'Comedy', daysAgo: 1, views: 25000000 },
  { title: 'When Your Mom Discovers Your Browser History', channelId: 'ch9', duration: '3:24', category: 'Comedy', daysAgo: 4, views: 32000000 },
  { title: 'Types of Students During Exams', channelId: 'ch9', duration: '7:42', category: 'Comedy', daysAgo: 6, views: 18000000 },
  { title: 'Next.js 15 Crash Course for Beginners', channelId: 'ch13', duration: '2:30:00', category: 'Technology', daysAgo: 5, views: 4100000 },
  { title: 'React vs Vue vs Angular - Which Should You Learn?', channelId: 'ch13', duration: '15:30', category: 'Learning', daysAgo: 10, views: 6200000 },
  { title: 'Build a Full-Stack App in 2 Hours', channelId: 'ch13', duration: '2:00:00', category: 'Technology', daysAgo: 3, views: 2800000 },
  { title: '2024 Tesla Model S Plaid - Full Review', channelId: 'ch11', duration: '22:18', category: 'Trending', daysAgo: 2, views: 7200000 },
  { title: 'Top 5 Electric Cars Under $40,000', channelId: 'ch11', duration: '15:30', category: 'Trending', daysAgo: 7, views: 5400000 },
  { title: 'BMW M3 vs Mercedes AMG C63 - Track Battle', channelId: 'ch11', duration: '18:22', category: 'Sports', daysAgo: 4, views: 9100000 },
  { title: 'Planet Earth III - Official Trailer (4K)', channelId: 'ch12', duration: '3:24', category: 'Science', daysAgo: 1, views: 20000000 },
  { title: 'The Most Venomous Animals in the World', channelId: 'ch12', duration: '15:30', category: 'Science', daysAgo: 8, views: 14000000 },
  { title: 'Ocean Depths: Life in the Abyss', channelId: 'ch12', duration: '22:18', category: 'Science', daysAgo: 12, views: 8700000 },
  { title: 'Spring/Summer 2024 Fashion Trends', channelId: 'ch14', duration: '10:15', category: 'Fashion', daysAgo: 3, views: 3200000 },
  { title: 'How to Build a Capsule Wardrobe', channelId: 'ch14', duration: '8:47', category: 'Fashion', daysAgo: 7, views: 1800000 },
  { title: 'Walking on Mars - What Would It Really Be Like?', channelId: 'ch15', duration: '18:22', category: 'Science', daysAgo: 2, views: 11000000 },
  { title: 'Return to the Moon: Artemis Program Update', channelId: 'ch15', duration: '15:30', category: 'Science', daysAgo: 5, views: 8900000 },
  { title: "Saturn's Rings Are Disappearing - Here's Why", channelId: 'ch15', duration: '10:15', category: 'Science', daysAgo: 10, views: 13000000 },
];

const sampleComments: Comment[] = [
  { id: 'c1', text: 'This is incredibly helpful! Thank you for sharing.', author: 'Alex Johnson', avatarUrl: 'https://picsum.photos/seed/alexjohnson/50/50', likes: 245, createdAt: '2024-12-20T10:00:00Z', videoId: '' },
  { id: 'c2', text: "I've been waiting for this content. Subscribed!", author: 'Sarah Mitchell', avatarUrl: 'https://picsum.photos/seed/sarahmitchell/50/50', likes: 182, createdAt: '2024-12-19T15:30:00Z', videoId: '' },
  { id: 'c3', text: 'The production quality is amazing. Keep it up!', author: 'Mike Chen', avatarUrl: 'https://picsum.photos/seed/mikechen/50/50', likes: 320, createdAt: '2024-12-21T08:00:00Z', videoId: '' },
  { id: 'c4', text: 'Can you make a follow-up video on this topic?', author: 'Emily Davis', avatarUrl: 'https://picsum.photos/seed/emilydavis/50/50', likes: 89, createdAt: '2024-12-18T12:00:00Z', videoId: '' },
  { id: 'c5', text: 'I learned so much from this. Best channel!', author: 'James Wilson', avatarUrl: 'https://picsum.photos/seed/jameswilson/50/50', likes: 412, createdAt: '2024-12-22T09:00:00Z', videoId: '' },
  { id: 'c6', text: 'First time watching your channel. Instant sub!', author: 'Lisa Thompson', avatarUrl: 'https://picsum.photos/seed/lisathompson/50/50', likes: 156, createdAt: '2024-12-17T14:00:00Z', videoId: '' },
  { id: 'c7', text: 'This deserves way more views than it has.', author: 'David Brown', avatarUrl: 'https://picsum.photos/seed/davidbrown/50/50', likes: 534, createdAt: '2024-12-16T11:00:00Z', videoId: '' },
  { id: 'c8', text: 'The editing in this video is top-notch.', author: 'Jennifer Lee', avatarUrl: 'https://picsum.photos/seed/jenniferlee/50/50', likes: 203, createdAt: '2024-12-15T16:00:00Z', videoId: '' },
  { id: 'c9', text: "I watch all your videos. Never disappointed!", author: 'Robert Garcia', avatarUrl: 'https://picsum.photos/seed/robertgarcia/50/50', likes: 178, createdAt: '2024-12-14T10:00:00Z', videoId: '' },
  { id: 'c10', text: 'Finally someone explains this properly!', author: 'Amanda White', avatarUrl: 'https://picsum.photos/seed/amandawhite/50/50', likes: 267, createdAt: '2024-12-13T13:00:00Z', videoId: '' },
];

// Build full video objects
export const videos: Video[] = rawVideos.map((v, i) => {
  const uploadedAt = new Date(Date.now() - v.daysAgo * 86400000).toISOString();
  const likes = Math.floor(v.views * (0.03 + Math.random() * 0.07));
  return {
    id: `v${i + 1}`,
    title: v.title,
    thumbnailUrl: `https://picsum.photos/seed/yt${v.channelId}v${i}/640/360`,
    description: `${v.title}\n\nIn this video, we dive deep into this topic and explore all the details. Don't forget to like, comment, and subscribe for more content like this!\n\n#${v.category} #youtube`,
    duration: v.duration,
    views: v.views,
    likes,
    dislikes: Math.floor(likes * 0.05),
    isLive: v.category === 'Live',
    category: v.category,
    uploadedAt,
    channelId: v.channelId,
    channel: channelMap.get(v.channelId),
    comments: sampleComments.slice(0, 3 + (i % 6)).map((c, ci) => ({
      ...c,
      id: `c${i}-${ci}`,
      videoId: `v${i + 1}`,
      likes: Math.floor(Math.random() * 400),
    })),
  };
});

// Indexes for fast lookup
export const videoMap = new Map(videos.map((v) => [v.id, v]));
export const videosByChannel = new Map<string, Video[]>();
for (const v of videos) {
  const arr = videosByChannel.get(v.channelId) || [];
  arr.push(v);
  videosByChannel.set(v.channelId, arr);
}

export function getVideoById(id: string): Video | undefined {
  return videoMap.get(id);
}

export function getVideosByChannel(channelId: string): Video[] {
  return videosByChannel.get(channelId) || [];
}

export function getRelatedVideos(videoId: string, limit = 10): Video[] {
  const video = videoMap.get(videoId);
  if (!video) return videos.slice(0, limit);
  return videos.filter((v) => v.id !== videoId && v.category === video.category).slice(0, limit) || videos.filter((v) => v.id !== videoId).slice(0, limit);
}

export function searchVideos(query: string): Video[] {
  const q = query.toLowerCase();
  return videos.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.channel?.name.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q)
  );
}

export function getVideosByCategory(category: string, limit = 20, cursor?: string): { videos: Video[]; nextCursor: string | null } {
  let filtered = category === 'All'
    ? [...videos]
    : category === 'Trending'
      ? [...videos].sort((a, b) => b.views - a.views)
      : videos.filter((v) => v.category === category);

  if (cursor) {
    const idx = filtered.findIndex((v) => v.id === cursor);
    if (idx >= 0) filtered = filtered.slice(idx + 1);
  }

  const items = filtered.slice(0, limit);
  const nextCursor = filtered.length > limit ? items[items.length - 1].id : null;
  return { videos: items, nextCursor };
}
