import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const video = await db.video.findUnique({
      where: { id },
      include: {
        channel: true,
        comments: {
          orderBy: { likes: 'desc' },
        },
      },
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Get related videos from same category
    const relatedVideos = await db.video.findMany({
      where: {
        category: video.category,
        id: { not: video.id },
      },
      take: 10,
      orderBy: { views: 'desc' },
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

    return NextResponse.json({
      video,
      relatedVideos,
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 });
  }
}
