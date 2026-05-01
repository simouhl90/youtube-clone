import { NextResponse } from 'next/server';
import { series } from '@/lib/mock-data';

export async function GET() {
  // Return studios as channels for CineVerse
  const studios = [...new Set(series.map((s) => s.studio))].map((studio, index) => ({
    id: `studio-${index}`,
    name: studio,
    avatar: `https://picsum.photos/seed/studio${index}/100/100`,
    seriesCount: series.filter((s) => s.studio === studio).length,
  }));

  return NextResponse.json({ channels: studios });
}
