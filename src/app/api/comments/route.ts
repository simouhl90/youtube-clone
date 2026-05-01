import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoId, text, author } = body

    if (!videoId || !text || !author) {
      return NextResponse.json(
        { error: 'videoId, text, and author are required' },
        { status: 400 }
      )
    }

    const video = await db.video.findUnique({ where: { id: videoId } })
    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    const comment = await db.comment.create({
      data: {
        text,
        author,
        avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(author)}`,
        videoId,
      },
    })

    return NextResponse.json({ comment })
  } catch (error) {
    console.error('Failed to create comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
