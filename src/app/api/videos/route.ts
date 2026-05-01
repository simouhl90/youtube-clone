import { NextRequest, NextResponse } from 'next/server';
import { series, getSeriesByGenre } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'All';
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    let filteredSeries;
    if (category === 'All') {
      filteredSeries = series;
    } else {
      filteredSeries = getSeriesByGenre(category);
    }

    return NextResponse.json({
      videos: filteredSeries.slice(0, limit),
      nextCursor: null,
    });
  } catch (error) {
    console.error('Error fetching series:', error);
    return NextResponse.json({ error: 'Failed to fetch series' }, { status: 500 });
  }
}
