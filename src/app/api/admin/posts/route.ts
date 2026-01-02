import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

// Helper function to check if request is from localhost
function isLocalhost(request: NextRequest): boolean {
    const headersList = headers()
    const host = headersList.get('host') || ''
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')

    // Check if host is localhost
    const isLocalHost = host.startsWith('localhost') || host.startsWith('127.0.0.1')

    // In production, also verify no proxy forwarding from external sources
    const noExternalProxy = !forwardedFor && !realIp

    // For development, localhost check is sufficient
    // In production (Vercel, etc), this will fail as intended
    return isLocalHost && (process.env.NODE_ENV === 'development' || noExternalProxy)
}

// Middleware to protect admin routes
function requireLocalhost(request: NextRequest) {
    if (!isLocalhost(request)) {
        return NextResponse.json(
            { error: 'Access denied. Admin routes are only accessible from localhost.' },
            { status: 403 }
        )
    }
    return null
}

export async function GET(request: NextRequest) {
    // Check localhost access
    const accessDenied = requireLocalhost(request)
    if (accessDenied) return accessDenied

    try {
        const posts = await db.post.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(posts)
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    // Check localhost access
    const accessDenied = requireLocalhost(request)
    if (accessDenied) return accessDenied

    try {
        const body = await request.json()
        const { title, excerpt, content, category } = body

        if (!title || !excerpt || !content) {
            return NextResponse.json(
                { error: 'Title, excerpt, and content are required' },
                { status: 400 }
            )
        }

        const post = await db.post.create({
            title,
            excerpt,
            content,
            category: category || 'Politics'
        })

        return NextResponse.json(post, { status: 201 })
    } catch (error) {
        console.error('Error creating post:', error)
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    // Check localhost access
    const accessDenied = requireLocalhost(request)
    if (accessDenied) return accessDenied

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

export async function PUT(request: NextRequest) {
    // Check localhost access
    const accessDenied = requireLocalhost(request)
    if (accessDenied) return accessDenied

    try {
        const body = await request.json()
        const { id, title, excerpt, content, category } = body

        if (!id || !title || !excerpt || !content) {
            return NextResponse.json(
                { error: 'ID, title, excerpt, and content are required' },
                { status: 400 }
            )
        }

        const post = await db.post.update(
            { id },
            { title, excerpt, content, category: category || 'Politics' }
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
