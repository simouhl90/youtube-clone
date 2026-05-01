import { NextRequest, NextResponse } from 'next/server';

// Mock comments for CineVerse
const mockComments = [
  { id: '1', text: 'Amazing series! The cinematography is stunning.', author: 'FilmLover99', videoId: 's1' },
  { id: '2', text: 'Best show I\'ve watched this year.', author: 'SeriesAddict', videoId: 's2' },
  { id: '3', text: 'The plot twists are incredible!', author: 'DramaQueen', videoId: 's1' },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId') || '';

    const comments = videoId
      ? mockComments.filter((c) => c.videoId === videoId)
      : mockComments;

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoId, text, author } = body;

    if (!videoId || !text || !author) {
      return NextResponse.json(
        { error: 'videoId, text, and author are required' },
        { status: 400 }
      );
    }

    const comment = {
      id: `c-${Date.now()}`,
      text,
      author,
      avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(author)}`,
      videoId,
    };

    return NextResponse.json({ comment });
  } catch (error) {
    console.error('Failed to create comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
