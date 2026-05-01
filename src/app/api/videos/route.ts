import { NextRequest, NextResponse } from 'next/server';
import { getVideosByCategory } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'All';
    const cursor = searchParams.get('cursor');
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const result = getVideosByCategory(category, limit, cursor || undefined);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
