import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'All';
    const cursor = searchParams.get('cursor');
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const where: Record<string, unknown> = {};
    if (category !== 'All' && category !== 'Trending') {
      where.category = category;
    }

    // For trending, order by views desc
    const orderBy = category === 'Trending' 
      ? { views: 'desc' as const }
      : { uploadedAt: 'desc' as const };

    if (cursor) {
      (where as Record<string, unknown>).id = { gt: cursor };
    }

    const videos = await db.video.findMany({
      where,
      orderBy,
      take: limit + 1,
      include: {
        channel: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatarUrl: true,
            subscribers: true,
            isVerified: true,
          },
        },
      },
    });

    const hasMore = videos.length > limit;
    const items = hasMore ? videos.slice(0, limit) : videos;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return NextResponse.json({
      videos: items,
      nextCursor,
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
