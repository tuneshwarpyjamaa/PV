import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    console.log('[API] Fetching all posts...')
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    console.log(`[API] Successfully fetched ${posts.length} posts`)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('[API] Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, slug } = body

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, excerpt, and content are required' },
        { status: 400 }
      )
    }

    // Generate slug if not provided
    const postSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    console.log(`[API] Creating post with slug: ${postSlug}`)

    const post = await db.post.create({
      title,
      excerpt,
      content,
      category: category || 'Politics',
      slug: postSlug
    })

    console.log(`[API] Successfully created post: ${post.id}`)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('[API] Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    await db.post.delete({ id })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
