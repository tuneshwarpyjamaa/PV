import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    console.log(`[API] Fetching post with id/slug: ${id}`)

    // Try to find by id first
    let post = await db.post.findUnique({
      id: id
    })

    // If not found by id, try by slug
    if (!post) {
      console.log(`[API] Post not found by id, trying slug: ${id}`)
      post = await db.post.findUnique({
        slug: id
      })
    }

    if (!post) {
      console.error(`[API] Post not found: ${id}`)
      return NextResponse.json(
        { error: 'Post not found', slug: id },
        { status: 404 }
      )
    }

    console.log(`[API] Successfully found post: ${post.title}`)
    return NextResponse.json(post)
  } catch (error) {
    console.error('[API] Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, excerpt, content } = body

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, excerpt, and content are required' },
        { status: 400 }
      )
    }

    const post = await db.post.update(
      {
        id: id
      },
      {
        title,
        excerpt,
        content
      }
    )

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await db.post.delete({
      id: id
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
