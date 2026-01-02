import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import TableOfContents from '@/components/TableOfContents'
import QuoteToShare from '@/components/QuoteToShare'
import GiscusComments from '@/components/GiscusComments'
import ShareToTwitter from '@/components/ShareToTwitter'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Post {
    id: string
    title: string
    excerpt: string
    content: string
    category: string
    slug: string
    createdAt: string
}

async function getPost(slug: string): Promise<Post | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000'

        const res = await fetch(`${baseUrl}/api/posts/${slug}`, {
            cache: 'no-store',
            next: { revalidate: 0 }
        })

        if (res.ok) {
            return await res.json()
        }

        console.error(`Failed to fetch post ${slug}: ${res.status} ${res.statusText}`)
        return null
    } catch (error) {
        console.error('Failed to fetch post:', error)
        return null
    }
}

// Generate static params for all posts at build time
export async function generateStaticParams() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000'

        const res = await fetch(`${baseUrl}/api/posts`, {
            cache: 'no-store'
        })

        if (!res.ok) {
            console.error('Failed to fetch posts for static params')
            return []
        }

        const posts: Post[] = await res.json()

        return posts.map((post) => ({
            slug: post.slug || post.id,
        }))
    } catch (error) {
        console.error('Error generating static params:', error)
        return []
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: `${post.title} | Views by Amish B Harsoor`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.createdAt,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        }
    }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    // Get other posts for "More from Author" section
    const otherPosts = await getOtherPosts(post.id)

    // Calculate estimated reading time (assuming 200 words per minute)
    const wordCount = post.content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    const addIdsToHeadings = (html: string) => {
        let headingIndex = 0
        return html.replace(/\u003ch([1-3])\u003e(.*?)\u003c\/h[1-3]\u003e/gi, (match, level, content) => {
            const id = `heading-${headingIndex++}`
            return `\u003ch${level} id="${id}"\u003e${content}\u003c/h${level}\u003e`
        })
    }

    return (
        <div className="min-h-screen flex flex-col bg-black">
            <QuoteToShare />

            <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link
                            href="/"
                            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>
                        <div>
                            <h1 className="text-white text-xl font-semibold tracking-tight">
                                Views
                            </h1>
                        </div>
                        <div className="w-16"></div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <article className="text-white">
                            <header className="mb-12">
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white font-[family-name:var(--font-playfair)]">
                                    {post.title}
                                </h1>
                                <p className="text-xl text-gray-400 leading-relaxed mb-8">
                                    {post.excerpt}
                                </p>

                                {/* Author Info Bar */}
                                <div className="flex items-center justify-between py-6 border-y border-gray-800">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src="/my_dp.jpg"
                                            alt="Amish B Harsoor"
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-white font-medium">Amish B Harsoor</p>
                                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                                <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}</span>
                                                <span>•</span>
                                                <span>{readingTime} min read</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="hidden md:flex items-center gap-1">
                                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors" title="Bookmark">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                        </button>
                                        <ShareToTwitter
                                            title={post.title}
                                            excerpt={post.excerpt}
                                            category={post.category}
                                            date={new Date(post.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                            compact={true}
                                        />
                                    </div>
                                </div>
                            </header>

                            {/* Article Content */}
                            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed" style={{ lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: addIdsToHeadings(post.content) }} />

                            {/* Article Footer */}
                            <div className="mt-16 pt-8 border-t border-gray-800">
                                <div className="flex items-center gap-2 mb-8">
                                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm transition-colors">
                                        {post.category}
                                    </button>
                                </div>
                            </div>

                            {/* Giscus Comments */}
                            <GiscusComments
                                repo="yourusername/yourrepo"
                                repoId="YOUR_REPO_ID"
                                category="General"
                                categoryId="YOUR_CATEGORY_ID"
                            />
                        </article>
                    </div>

                    {/* Sidebar with Table of Contents */}
                    <aside className="lg:col-span-4">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            {/* Table of Contents */}
                            <TableOfContents content={addIdsToHeadings(post.content)} />

                            {/* Author Card */}
                            <div className="border border-gray-800 p-6 rounded-lg">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/my_dp.jpg"
                                        alt="Amish B Harsoor"
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">Amish B Harsoor</h3>
                                        <p className="text-gray-500 text-sm">Author</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    Sharing my thoughts on Indian politics and technology. All views are personal.
                                </p>
                                <button className="w-full bg-white text-black py-2 px-4 rounded font-medium hover:bg-gray-200 transition-colors text-sm">
                                    Follow
                                </button>
                            </div>

                            {/* More from Author */}
                            {otherPosts.length > 0 && (
                                <div className="border border-gray-800 p-6 rounded-lg">
                                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                                        More from Amish B Harsoor
                                    </h3>
                                    <div className="space-y-6">
                                        {otherPosts.map((otherPost) => (
                                            <article
                                                key={otherPost.id}
                                                className="cursor-pointer group"
                                            >
                                                <Link href={`/posts/${otherPost.slug}`}>
                                                    <h4 className="text-white font-medium mb-2 group-hover:text-gray-300 transition-colors line-clamp-2 text-sm">
                                                        {otherPost.title}
                                                    </h4>
                                                    <p className="text-gray-500 text-xs line-clamp-2 mb-2">
                                                        {otherPost.excerpt}
                                                    </p>
                                                    <p className="text-gray-600 text-xs">
                                                        {new Date(otherPost.createdAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </Link>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recommended Topics */}
                            <div className="border border-gray-800 p-6 rounded-lg">
                                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                                    Recommended Topics
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-xs transition-colors">
                                        Politics
                                    </button>
                                    <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-xs transition-colors">
                                        Tech
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="border-t border-gray-800 py-8 bg-black mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6">
                        <p className="text-gray-600 text-sm mb-2">
                            © {new Date().getFullYear()} Views by Amish B Harsoor. All rights reserved.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-700">
                            <span>Built with</span>
                            <span className="flex items-center gap-1.5">
                                <span className="text-gray-500">Next.js</span>
                                <span>+</span>
                                <span className="text-gray-500">TypeScript</span>
                                <span>+</span>
                                <span className="text-gray-500">Tailwind CSS</span>
                                <span>+</span>
                                <span className="text-gray-500">SQLite</span>
                                <span>+</span>
                                <span className="text-gray-500">☕ Coffee</span>
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link
                            href="/now"
                            className="text-gray-600 hover:text-white transition-colors text-sm underline"
                        >
                            What I'm doing now
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

async function getOtherPosts(excludeId: string): Promise<Post[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts`, {
            cache: 'no-store'
        })
        if (res.ok) {
            const posts: Post[] = await res.json()
            return posts.filter(p => p.id !== excludeId).slice(0, 3)
        }
        return []
    } catch (error) {
        console.error('Failed to fetch other posts:', error)
        return []
    }
}