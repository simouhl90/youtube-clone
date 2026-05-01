import { NextRequest, NextResponse } from 'next/server';
import { searchVideos } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
      return NextResponse.json({ videos: [], nextCursor: null });
    }

    const videos = searchVideos(query);
    return NextResponse.json({ videos, nextCursor: null });
  } catch (error) {
    console.error('Error searching videos:', error);
    return NextResponse.json({ error: 'Failed to search videos' }, { status: 500 });
  }
}
