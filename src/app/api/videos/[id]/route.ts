import { NextRequest, NextResponse } from 'next/server';
import { getVideoById, getRelatedVideos } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const video = getVideoById(id);

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const relatedVideos = getRelatedVideos(id);

    return NextResponse.json({
      video,
      comments: video.comments || [],
      relatedVideos,
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 });
  }
}
