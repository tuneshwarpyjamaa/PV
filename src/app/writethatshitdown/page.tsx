'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
    id: string
    title: string
    excerpt: string
    content: string
    category: string
    createdAt: string
}

export default function AdminPanel() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [isLocalhost, setIsLocalhost] = useState(false)
    const [accessChecked, setAccessChecked] = useState(false)
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', category: 'Politics' })
    const [submitting, setSubmitting] = useState(false)
    const [deleting, setDeleting] = useState<string | null>(null)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    useEffect(() => {
        // Check if we're on localhost
        const hostname = window.location.hostname
        const isLocal = hostname === 'localhost' || hostname === '127.0.0.1'
        setIsLocalhost(isLocal)
        setAccessChecked(true)

        if (isLocal) {
            fetchPosts()
        }
    }, [])

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/admin/posts')
            if (res.status === 403) {
                setIsLocalhost(false)
                return
            }
            const data = await res.json()
            setPosts(data)
        } catch (error) {
            console.error('Failed to fetch posts:', error)
            showMessage('error', 'Failed to fetch posts')
        } finally {
            setLoading(false)
        }
    }

    // Filter posts based on search term and category
    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 3000)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const isEditing = selectedPost !== null
            const url = '/api/admin/posts'
            const method = isEditing ? 'PUT' : 'POST'
            const body = isEditing ? { ...formData, id: selectedPost.id } : formData

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            if (res.ok) {
                showMessage('success', isEditing ? 'Article updated successfully!' : 'Article published successfully!')
                setFormData({ title: '', excerpt: '', content: '', category: 'Politics' })
                setShowForm(false)
                setSelectedPost(null)
                fetchPosts()
            } else {
                const error = await res.json()
                showMessage('error', error.error || 'Failed to save article')
            }
        } catch (error) {
            console.error('Failed to save post:', error)
            showMessage('error', 'Failed to save article')
        } finally {
            setSubmitting(false)
        }
    }

    const handleEdit = (post: Post) => {
        setSelectedPost(post)
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category
        })
        setShowForm(true)
    }

    const handleDelete = async (postId: string) => {
        if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
            return
        }

        setDeleting(postId)
        try {
            const res = await fetch(`/api/admin/posts?id=${postId}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                showMessage('success', 'Article deleted successfully!')
                fetchPosts()
            } else {
                showMessage('error', 'Failed to delete article')
            }
        } catch (error) {
            console.error('Failed to delete post:', error)
            showMessage('error', 'Failed to delete article')
        } finally {
            setDeleting(null)
        }
    }

    const handleNewPost = () => {
        setSelectedPost(null)
        setFormData({ title: '', excerpt: '', content: '', category: 'Politics' })
        setShowForm(true)
    }

    const handleCancel = () => {
        setShowForm(false)
        setSelectedPost(null)
        setFormData({ title: '', excerpt: '', content: '', category: 'Politics' })
    }

    // Access check loading state
    if (!accessChecked) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-gray-400">Checking access...</div>
            </div>
        )
    }

    // Access denied for non-localhost
    if (!isLocalhost) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-white text-2xl font-bold mb-4">Access Denied</h1>
                    <p className="text-gray-400 mb-8">
                        This admin panel is only accessible from localhost. Please access this page from your local development environment.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded font-medium transition-colors"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Message Toast */}
            {message && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                    <p className="text-white font-medium">{message.text}</p>
                </div>
            )}

            {/* Header */}
            <header className="border-b border-gray-800 bg-black sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-white text-xl font-semibold">Admin Panel</h1>
                                <p className="text-green-500 text-xs flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                                    Localhost Access
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleNewPost}
                            className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors rounded"
                        >
                            + New Article
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {showForm ? (
                    /* Article Form */
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-white text-2xl font-bold">
                                {selectedPost ? 'Edit Article' : 'New Article'}
                            </h2>
                            <button
                                onClick={handleCancel}
                                className="text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Cancel
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2 font-medium">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors rounded"
                                    required
                                    placeholder="Enter article title..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2 font-medium">
                                    Excerpt
                                </label>
                                <input
                                    type="text"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors rounded"
                                    required
                                    placeholder="Brief summary of the article..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2 font-medium">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors rounded"
                                    required
                                >
                                    <option value="Politics">Politics</option>
                                    <option value="Tech">Tech</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2 font-medium">
                                    Content
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={20}
                                    className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors resize-none rounded font-mono text-sm"
                                    required
                                    placeholder="Write your article content..."
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
                                >
                                    {submitting ? 'Saving...' : (selectedPost ? 'Update Article' : 'Publish Article')}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-800 text-white px-8 py-3 font-medium hover:bg-gray-700 transition-colors rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* Posts List */
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-white text-2xl font-bold">All Articles</h2>
                            <p className="text-gray-500 text-sm">{filteredPosts.length} of {posts.length} articles</p>
                        </div>

                        {/* Search and Filter Controls */}
                        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
                            <div className="flex-1 w-full sm:w-auto">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-2 pl-10 focus:outline-none focus:border-gray-600 transition-colors rounded"
                                    />
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="bg-gray-950 border border-gray-800 text-white px-4 py-2 focus:outline-none focus:border-gray-600 transition-colors rounded"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Tech">Tech</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-gray-900 p-6 rounded-lg animate-pulse">
                                        <div className="h-4 bg-gray-800 rounded w-1/4 mb-4"></div>
                                        <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-gray-500 mb-4">
                                    {posts.length === 0 ? 'No articles yet' : 'No articles match your search criteria'}
                                </p>
                                {posts.length === 0 ? (
                                    <button
                                        onClick={handleNewPost}
                                        className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition-colors rounded"
                                    >
                                        Write Your First Article
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setSearchTerm('')
                                            setSelectedCategory('all')
                                        }}
                                        className="bg-gray-700 text-white px-6 py-3 font-medium hover:bg-gray-600 transition-colors rounded"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg hover:border-gray-700 transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs font-medium">
                                                        {post.category}
                                                    </span>
                                                    <span className="text-gray-600 text-xs">
                                                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <h3 className="text-white text-lg font-semibold mb-2 truncate">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    disabled={deleting === post.id}
                                                    className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm rounded transition-colors disabled:opacity-50"
                                                >
                                                    {deleting === post.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-800 py-6 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-gray-600 text-sm text-center">
                        Admin Panel • Only accessible on localhost • <Link href="/" className="text-gray-400 hover:text-white">View Public Site</Link>
                    </p>
                </div>
            </footer>
        </div>
    )
}
