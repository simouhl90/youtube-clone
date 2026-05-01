import { NextRequest, NextResponse } from 'next/server';
import { getSeriesById, getSeriesByGenre, series as allSeries } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const seriesData = getSeriesById(id);

    if (!seriesData) {
      return NextResponse.json({ error: 'Series not found' }, { status: 404 });
    }

    // Return related series (same genre)
    const relatedSeries = seriesData.genre
      .flatMap((genre) => getSeriesByGenre(genre))
      .filter((s) => s.id !== id)
      .filter((s, i, arr) => arr.findIndex((x) => x.id === s.id) === i)
      .slice(0, 10);

    return NextResponse.json({
      video: seriesData,
      comments: [],
      relatedVideos: relatedSeries,
    });
  } catch (error) {
    console.error('Error fetching series:', error);
    return NextResponse.json({ error: 'Failed to fetch series' }, { status: 500 });
  }
}
