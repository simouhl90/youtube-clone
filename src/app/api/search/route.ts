import { NextRequest, NextResponse } from 'next/server';
import { searchSeries } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
      return NextResponse.json({ videos: [], nextCursor: null });
    }

    const results = searchSeries(query);
    return NextResponse.json({ videos: results, nextCursor: null });
  } catch (error) {
    console.error('Error searching series:', error);
    return NextResponse.json({ error: 'Failed to search series' }, { status: 500 });
  }
}
