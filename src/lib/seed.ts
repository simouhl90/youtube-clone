import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const channels = [
  { name: 'TechVision', handle: 'techvision', subscribers: 2400000, isVerified: true, description: 'Exploring the future of technology, one video at a time.' },
  { name: 'Cooking Masterclass', handle: 'cookingmasterclass', subscribers: 890000, isVerified: true, description: 'Learn to cook like a pro with simple recipes.' },
  { name: 'GamingZone', handle: 'gamingzone', subscribers: 5200000, isVerified: true, description: 'Daily gaming content, walkthroughs, and reviews.' },
  { name: 'Music Vibes', handle: 'musicvibes', subscribers: 12000000, isVerified: true, description: 'Official music videos, covers, and live performances.' },
  { name: 'Fitness Pro', handle: 'fitnesspro', subscribers: 3400000, isVerified: true, description: 'Transform your body with science-based workouts.' },
  { name: 'Travel Adventures', handle: 'traveladventures', subscribers: 1800000, isVerified: false, description: 'Exploring the world one destination at a time.' },
  { name: 'Science Explained', handle: 'scienceexplained', subscribers: 6700000, isVerified: true, description: 'Making complex science simple and fun.' },
  { name: 'Daily News Now', handle: 'dailynewsnow', subscribers: 9800000, isVerified: true, description: 'Breaking news and in-depth analysis.' },
  { name: 'Comedy Central', handle: 'comedycentral', subscribers: 15000000, isVerified: true, description: 'The best comedy sketches and stand-up.' },
  { name: 'DIY Crafts', handle: 'diycrafts', subscribers: 560000, isVerified: false, description: 'Creative projects and DIY inspiration.' },
  { name: 'Auto World', handle: 'autoworld', subscribers: 4200000, isVerified: true, description: 'Car reviews, comparisons, and automotive news.' },
  { name: 'Nature Documentary', handle: 'naturedocumentary', subscribers: 7800000, isVerified: true, description: 'Stunning nature footage and wildlife documentaries.' },
  { name: 'Code Academy', handle: 'codeacademy', subscribers: 3100000, isVerified: true, description: 'Learn programming from scratch with practical tutorials.' },
  { name: 'Fashion Forward', handle: 'fashionforward', subscribers: 2200000, isVerified: false, description: 'Style tips, lookbooks, and fashion trends.' },
  { name: 'Space Explorer', handle: 'spaceexplorer', subscribers: 4500000, isVerified: true, description: 'Journey through the cosmos with us.' },
];

const videoData: Record<string, { titles: string[]; categories: string[] }> = {
  'techvision': {
    titles: [
      'iPhone 16 Pro Max Review: The Ultimate Smartphone?',
      'I Built a Smart Home for Under $500',
      'Top 10 Tech Gadgets of 2024 You NEED to See',
      'Why I Switched from Mac to Windows - After 10 Years',
      'The Future of AI: What to Expect in 2025',
      'Unboxing the New MacBook Pro M4 Max',
      'Best Budget Laptops for Students 2024',
      'How to Speed Up Your Old Computer in 10 Minutes',
      'Samsung Galaxy S25 Ultra Hands-On',
      'The Truth About 5G - Is It Really That Fast?',
    ],
    categories: ['Technology', 'Technology', 'Trending', 'Technology', 'Technology', 'Technology', 'Technology', 'Learning', 'Technology', 'Technology'],
  },
  'cookingmasterclass': {
    titles: [
      'Gordon Ramsay\'s Perfect Beef Wellington Recipe',
      '5 Easy Weeknight Dinners Under 30 Minutes',
      'The Secret to Restaurant-Quality Pasta at Home',
      'Japanese Street Food Tour - Tokyo Edition',
      'How to Make Sourdough Bread from Scratch',
      'Beginner\'s Guide to Meal Prepping',
      'Amazing Chocolate Cake Recipe - No Oven Needed',
      '10 Kitchen Hacks That Will Change Your Life',
      'Traditional Indian Curry - Authentic Recipe',
      'How to Fillet a Fish Like a Professional Chef',
    ],
    categories: ['Cooking', 'Cooking', 'Cooking', 'Cooking', 'Cooking', 'Cooking', 'Cooking', 'Cooking', 'Cooking', 'Cooking'],
  },
  'gamingzone': {
    titles: [
      'GTA 6 - Everything We Know So Far (2024 Update)',
      'I Played Minecraft for 100 Days Straight',
      'Elden Ring DLC - Full Walkthrough Part 1',
      'Top 20 Best PC Games of 2024',
      'Fortnite Season 5 - New Map Changes Explained',
      'I Built a Gaming PC for $1000 - Is It Worth It?',
      'Zelda Tears of the Kingdom - All Shrine Locations',
      'Valorant Champions 2024 Highlights',
      'The Most Expensive Gaming Setup Ever Built',
      'Palworld Review - Is It Better Than Pokémon?',
    ],
    categories: ['Gaming', 'Gaming', 'Gaming', 'Gaming', 'Gaming', 'Gaming', 'Gaming', 'Gaming', 'Trending', 'Gaming'],
  },
  'musicvibes': {
    titles: [
      'Taylor Swift - New Album Full Track Breakdown',
      'Top 50 Songs of 2024 - Year End Mashup',
      'How to Produce Music Like a Pro - FL Studio Tutorial',
      'Live Concert: Coldplay at Wembley Stadium',
      'The Evolution of Pop Music (2000-2024)',
      'Best Guitar Solos of All Time - Ranked',
      'Lo-Fi Beats to Study/Relax To - 24/7 Live Stream',
      'Cover: Bohemian Rhapsody (Acapella Version)',
      'How Spotify Recommends Music - Algorithm Explained',
      'K-Pop vs Western Pop: What\'s the Difference?',
    ],
    categories: ['Music', 'Music', 'Music', 'Music', 'Music', 'Music', 'Music', 'Music', 'Music', 'Music'],
  },
  'fitnesspro': {
    titles: [
      'Full Body Workout - No Equipment Needed (30 Min)',
      '30-Day Transformation Challenge Results',
      'The Perfect Morning Routine for Fitness',
      'Science of Protein - How Much Do You Really Need?',
      'Home Workout for Beginners - Start Today',
      'How to Lose Belly Fat - The Truth Revealed',
      'Yoga for Flexibility - 20 Minute Daily Practice',
      'Meal Prep Sunday - Healthy Recipes for the Week',
      '100 Push-Ups a Day for 30 Days Challenge',
      'Best Supplements for Muscle Growth 2024',
    ],
    categories: ['Sports', 'Sports', 'Sports', 'Learning', 'Sports', 'Sports', 'Sports', 'Cooking', 'Sports', 'Trending'],
  },
  'traveladventures': {
    titles: [
      'Backpacking Through Southeast Asia - 30 Day Vlog',
      'Top 10 Hidden Gems in Europe (Off the Beaten Path)',
      'Living in Japan - What They Don\'t Tell You',
      'Budget Travel Guide: How to Travel for $50/Day',
      'Most Beautiful Places in Iceland - Drone Footage',
      'Street Food Tour: Bangkok Thailand',
      'I Lived in a Van for 6 Months - Here\'s What Happened',
      'Visiting the World\'s Most Dangerous Tourist Spots',
      'How to Plan the Perfect Road Trip Across the USA',
      'Switzerland Travel Guide - Everything You Need to Know',
    ],
    categories: ['Travel', 'Travel', 'Travel', 'Travel', 'Travel', 'Travel', 'Trending', 'Travel', 'Travel', 'Travel'],
  },
  'scienceexplained': {
    titles: [
      'What Happens If You Fall Into a Black Hole?',
      'Quantum Physics Explained Simply',
      'The James Webb Telescope - Latest Discoveries 2024',
      'Why Is the Sky Blue? (And Other Questions Answered)',
      'DNA Editing with CRISPR - Should We Be Worried?',
      'The Scale of the Universe - Mind Blowing Comparison',
      'How Electricity Actually Works',
      'Climate Change: The Facts Nobody Talks About',
      'What Exists at the Bottom of the Ocean?',
      'Artificial Intelligence vs Human Intelligence',
    ],
    categories: ['Science', 'Science', 'Science', 'Learning', 'Science', 'Science', 'Science', 'News', 'Science', 'Technology'],
  },
  'dailynewsnow': {
    titles: [
      'Breaking: Major Tech Companies Announce AI Partnership',
      '2024 Election Coverage - Live Analysis',
      'Global Economy Update: What You Need to Know',
      'Climate Summit 2024 - Key Takeaways',
      'Space Exploration: New Mars Mission Announced',
      'Healthcare Revolution: AI in Medicine',
      'Cybersecurity Alert: How to Protect Yourself',
      'Immigration Policy Changes Explained',
      'Stock Market Update: Tech Stocks Rally',
      'World Cup 2026: Host Cities Revealed',
    ],
    categories: ['News', 'News', 'News', 'News', 'News', 'News', 'News', 'News', 'News', 'Sports'],
  },
  'comedycentral': {
    titles: [
      'Try Not to Laugh Challenge - Impossible Edition',
      'When Your Mom Discovers Your Browser History',
      'Types of Students During Exams',
      'Office Pranks That Went Too Far',
      'How Parents React to Bad Grades',
      'Funny Cat Compilation 2024',
      'If Historical Figures Had Social Media',
      'The Most Awkward First Date Moments',
      'Reacting to the Cringiest TikToks',
      'Stand-Up Comedy: Best of 2024 Compilation',
    ],
    categories: ['Comedy', 'Comedy', 'Comedy', 'Comedy', 'Comedy', 'Comedy', 'Comedy', 'Comedy', 'Comedy', 'Comedy'],
  },
  'codeacademy': {
    titles: [
      'Next.js 15 Crash Course for Beginners',
      'React vs Vue vs Angular - Which Should You Learn?',
      'Build a Full-Stack App in 2 Hours',
      'Python Tutorial - Learn Python in 1 Hour',
      'Why Everyone Is Learning TypeScript Now',
      'CSS Grid vs Flexbox - When to Use Which',
      'Create an AI Chatbot with ChatGPT API',
      'Docker Tutorial for Beginners - Full Course',
      'How I Got My First Developer Job',
      'Top 10 VS Code Extensions Every Developer Needs',
    ],
    categories: ['Technology', 'Learning', 'Technology', 'Technology', 'Learning', 'Technology', 'Technology', 'Technology', 'Podcasts', 'Technology'],
  },
  'autoworld': {
    titles: [
      '2024 Tesla Model S Plaid - Full Review',
      'Top 5 Electric Cars Under $40,000',
      'BMW M3 vs Mercedes AMG C63 - Track Battle',
      'How to Change Your Oil - Beginner\'s Guide',
      'The Most Reliable Cars of 2024',
      'Formula 1 2024 Season Preview',
      'Used Cars You Should NEVER Buy',
      'Porsche 911 GT3 RS - Dream Car Review',
      'Self-Driving Cars: How Close Are We Really?',
      'Hypercar Drag Race: Bugatti vs Koenigsegg vs Rimac',
    ],
    categories: ['Trending', 'Trending', 'Sports', 'Learning', 'Trending', 'Sports', 'Trending', 'Trending', 'Technology', 'Trending'],
  },
  'naturedocumentary': {
    titles: [
      'Planet Earth III - Official Trailer (4K)',
      'The Most Venomous Animals in the World',
      'Ocean Depths: Life in the Abyss',
      'African Safari - Wildlife in 4K',
      'Volcanoes: Earth\'s Most Powerful Force',
      'The Secret Life of Trees',
      'Predators in Action - National Geographic',
      'The Amazon Rainforest: Lungs of the Earth',
      'Microscopic World - Things You Can\'t See',
      'Migration Patterns: How Animals Navigate',
    ],
    categories: ['Science', 'Science', 'Science', 'Trending', 'Science', 'Science', 'Science', 'Science', 'Science', 'Science'],
  },
  'fashionforward': {
    titles: [
      'Spring/Summer 2024 Fashion Trends',
      'How to Build a Capsule Wardrobe',
      'Luxury vs Affordable: Can You Tell the Difference?',
      '10 Outfit Ideas for Every Occasion',
      'Thrift Shopping Haul - Hidden Gems Found',
      'Sustainable Fashion Brands You Need to Know',
      'Celebrity Style Breakdown - Met Gala 2024',
      'Men\'s Fashion Guide: Dress Better Instantly',
      'Behind the Scenes: Fashion Week Milan',
      'Skincare Routine That Actually Works',
    ],
    categories: ['Fashion', 'Fashion', 'Fashion', 'Fashion', 'Fashion', 'Fashion', 'Trending', 'Fashion', 'Fashion', 'Fashion'],
  },
  'spaceexplorer': {
    titles: [
      'Walking on Mars - What Would It Really Be Like?',
      'The International Space Station Tour (4K)',
      'How Rockets Work - Explained Simply',
      'Mars Colony Update: SpaceX Starship Progress',
      'The Most Incredible Space Images of 2024',
      'What\'s Inside a Black Hole? Latest Research',
      'Return to the Moon: Artemis Program Update',
      'Saturn\'s Rings Are Disappearing - Here\'s Why',
      'Could Aliens Exist? The Science Behind It',
      'Building a Space Station in Minecraft - Realistic Scale',
    ],
    categories: ['Science', 'Science', 'Science', 'Technology', 'Science', 'Science', 'Science', 'Science', 'Science', 'Gaming'],
  },
  'diycrafts': {
    titles: [
      'DIY Room Decor - 10 Easy Projects',
      'How to Make Candles at Home',
      'Resin Art for Beginners - Complete Guide',
      'Upcycling Old Furniture - Before & After',
      'DIY Gifts That People Actually Want',
      'Macramé Wall Hanging Tutorial',
      'How to Start a Bullet Journal',
      'Concrete Planter DIY - Modern Home Decor',
      'Custom T-Shirt Printing at Home',
      'The Ultimate DIY Christmas Ornaments Guide',
    ],
    categories: ['Trending', 'Learning', 'Learning', 'Trending', 'Learning', 'Learning', 'Learning', 'Learning', 'Trending', 'Learning'],
  },
};

const sampleComments = [
  { author: 'Alex Johnson', text: 'This is incredibly helpful! Thank you for sharing.' },
  { author: 'Sarah Mitchell', text: 'I\'ve been waiting for this content. Subscribed!' },
  { author: 'Mike Chen', text: 'The production quality is amazing. Keep it up!' },
  { author: 'Emily Davis', text: 'Can you make a follow-up video on this topic?' },
  { author: 'James Wilson', text: 'I learned so much from this. You\'re the best!' },
  { author: 'Lisa Thompson', text: 'First time watching your channel. Instant sub!' },
  { author: 'David Brown', text: 'This deserves way more views than it has.' },
  { author: 'Jennifer Lee', text: 'The editing in this video is top-notch.' },
  { author: 'Robert Garcia', text: 'I watch all your videos. Never disappointed!' },
  { author: 'Amanda White', text: 'Finally someone explains this properly!' },
  { author: 'Chris Martinez', text: 'Who else is watching this in 2024? 😄' },
  { author: 'Nicole Anderson', text: 'This is exactly what I needed. Thank you!' },
  { author: 'Tom Harris', text: 'The algorithm brought me here and I\'m glad it did.' },
  { author: 'Rachel Clark', text: 'Please do more content like this!' },
  { author: 'Kevin Lewis', text: 'I\'ve shared this with all my friends. Great content!' },
];

const durations = ['3:24', '10:15', '15:30', '7:42', '22:18', '5:55', '12:03', '8:47', '18:22', '6:11', '45:00', '1:23:45', '2:30', '11:09', '9:33'];

function randomViews(): number {
  const ranges = [
    [1000, 50000],
    [50000, 500000],
    [500000, 2000000],
    [2000000, 10000000],
    [10000000, 50000000],
  ];
  const range = ranges[Math.floor(Math.random() * ranges.length)];
  return Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
}

function randomLikes(views: number): number {
  return Math.floor(views * (0.03 + Math.random() * 0.07));
}

function randomDaysAgo(): number {
  return Math.floor(Math.random() * 365);
}

async function seed() {
  console.log('🌱 Seeding database...');

  // Create channels
  const createdChannels = [];
  for (const ch of channels) {
    const channel = await db.channel.create({
      data: {
        name: ch.name,
        handle: ch.handle,
        avatarUrl: `https://picsum.photos/seed/${ch.handle}avatar/100/100`,
        bannerUrl: `https://picsum.photos/seed/${ch.handle}banner/1200/300`,
        subscribers: ch.subscribers,
        isVerified: ch.isVerified,
        description: ch.description,
      },
    });
    createdChannels.push(channel);
    console.log(`  ✓ Created channel: ${ch.name}`);
  }

  // Create videos and comments
  let totalVideos = 0;
  for (const channel of createdChannels) {
    const data = videoData[channel.handle];
    if (!data) continue;

    for (let i = 0; i < data.titles.length; i++) {
      const views = randomViews();
      const daysAgo = randomDaysAgo();
      const uploadedAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      const likes = randomLikes(views);
      const isLive = Math.random() < 0.05;

      const video = await db.video.create({
        data: {
          title: data.titles[i],
          thumbnailUrl: `https://picsum.photos/seed/${channel.handle}vid${i}/640/360`,
          description: `${data.titles[i]}\n\nIn this video, we dive deep into this topic and explore all the details. Don't forget to like, comment, and subscribe for more content like this!\n\n#${data.categories[i]} #${channel.name.replace(/\s/g, '')}\n\nTimestamps:\n0:00 - Introduction\n2:30 - Main Content\n8:00 - Key Points\n12:00 - Conclusion`,
          duration: isLive ? 'LIVE' : durations[Math.floor(Math.random() * durations.length)],
          views,
          likes,
          dislikes: Math.floor(likes * 0.05),
          isLive,
          category: data.categories[i],
          uploadedAt,
          channelId: channel.id,
        },
      });
      totalVideos++;

      // Create 3-8 comments per video
      const numComments = 3 + Math.floor(Math.random() * 6);
      for (let j = 0; j < numComments; j++) {
        const comment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
        const commentDaysAgo = Math.floor(Math.random() * daysAgo);
        await db.comment.create({
          data: {
            text: comment.text,
            author: comment.author,
            avatarUrl: `https://picsum.photos/seed/${comment.author.replace(/\s/g, '')}/50/50`,
            likes: Math.floor(Math.random() * 500),
            createdAt: new Date(Date.now() - commentDaysAgo * 24 * 60 * 60 * 1000),
            videoId: video.id,
          },
        });
      }
    }
    console.log(`  ✓ Created videos for: ${channel.name}`);
  }

  console.log(`\n✅ Seeding complete! ${createdChannels.length} channels, ${totalVideos} videos created.`);
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect());
