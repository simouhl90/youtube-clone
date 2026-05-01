import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const cursor = searchParams.get('cursor');
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    if (!query.trim()) {
      return NextResponse.json({ videos: [], nextCursor: null });
    }

    const where: Record<string, unknown> = {
      OR: [
        { title: { contains: query } },
        { description: { contains: query } },
        { channel: { name: { contains: query } } },
      ],
    };

    if (cursor) {
      (where as Record<string, unknown>).id = { gt: cursor };
    }

    const videos = await db.video.findMany({
      where,
      orderBy: { views: 'desc' },
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
    console.error('Error searching videos:', error);
    return NextResponse.json({ error: 'Failed to search videos' }, { status: 500 });
  }
}
