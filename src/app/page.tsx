'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import TableOfContents from '@/components/TableOfContents'
import QuoteToShare from '@/components/QuoteToShare'
import CommandPalette from '@/components/CommandPalette'
import GiscusComments from '@/components/GiscusComments'
import ShareToTwitter from '@/components/ShareToTwitter'

interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  slug?: string
  createdAt: string
}

// Skeleton loader component
const SkeletonCard = () => (
  <div className="border border-gray-800 p-8 animate-pulse">
    <div className="h-4 bg-gray-800 rounded w-24 mb-4"></div>
    <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-800 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
  </div>
)

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Politics'
  })

  useEffect(() => {
    fetchPosts()

    // Check if admin mode was previously enabled in this session
    const savedAdmin = sessionStorage.getItem('isAdmin')
    if (savedAdmin === 'true') {
      setIsAdmin(true)
    }

    // Listen for admin shortcut (Ctrl+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        if (!isAdmin) {
          setShowAdminLogin(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAdmin])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      } else {
        console.error('Failed to fetch posts')
        setPosts([])
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  // Filter posts based on category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / 200)
  }

  const addIdsToHeadings = (html: string) => {
    let headingIndex = 0
    return html.replace(/<h([1-3])([^>]*)>(.*?)<\/h[1-3]>/gi, (match, level, attrs, content) => {
      const id = `heading-${headingIndex++}`
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`
    })
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - you can change this password
    if (adminPassword === 'amish2026') {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminPassword('')
      sessionStorage.setItem('isAdmin', 'true')
    } else {
      alert('Invalid password')
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    setShowNewPostForm(false)
    sessionStorage.removeItem('isAdmin')
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })

      if (res.ok) {
        const createdPost = await res.json()
        setPosts([createdPost, ...posts])
        setNewPost({
          title: '',
          excerpt: '',
          content: '',
          category: 'Politics'
        })
        setShowNewPostForm(false)
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to create post')
      }
    } catch (error) {
      console.error('Failed to create post:', error)
      alert('Failed to create post')
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <div className="min-h-screen flex flex-col bg-black">
      <CommandPalette posts={posts} />

      <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                Views
              </h1>
              <p className="text-gray-600 text-xs mt-1">by Amish B Harsoor</p>
            </div>

            <nav className="hidden md:flex space-x-2">
              {['All', 'Tech', 'Politics'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${selectedCategory === category
                    ? 'bg-gray-800 text-white border border-gray-700'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                >
                  {category}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Command Palette Hint */}
              <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded text-xs text-gray-500 hover:text-gray-300 hover:border-gray-700 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs">⌘K</kbd>
              </button>

              {/* Admin Controls */}
              {isAdmin && (
                <>
                  <button
                    onClick={() => setShowNewPostForm(true)}
                    className="hidden sm:block bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Write Article
                  </button>
                  <button
                    onClick={handleAdminLogout}
                    className="hidden sm:block text-gray-500 hover:text-white text-sm transition-colors"
                    title="Logout Admin"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-800">
              <div className="space-y-2">
                {['All', 'Tech', 'Politics'].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded transition-colors ${selectedCategory === category
                      ? 'bg-gray-800 text-white border border-gray-700'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {(
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {loading ? (
                <div className="space-y-6">
                  <SkeletonCard />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-gray-600 py-12">
                  {searchQuery || selectedCategory !== 'All' ? (
                    <div>
                      <p>No articles found matching your criteria.</p>
                      <button
                        onClick={() => {
                          setSearchQuery('')
                          setSelectedCategory('All')
                        }}
                        className="mt-4 text-gray-400 hover:text-white text-sm"
                      >
                        Clear filters
                      </button>
                    </div>
                  ) : (
                    <p>No articles yet. Click "Write Article" to create one.</p>
                  )}
                </div>
              ) : (
                <>
                  {filteredPosts.length > 0 && (
                    <div className="space-y-6">
                      {filteredPosts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/posts/${post.slug || post.id}`}
                          className="block"
                        >
                          <article className="cursor-pointer group bg-[#0a0a0a] hover:bg-[#111111] transition-all duration-300 p-8 hover:-translate-y-0.5 border-l-2 border-transparent hover:border-gray-700">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="px-3 py-1 bg-gray-800/50 text-gray-400 rounded-full text-xs font-medium uppercase tracking-wider">
                                {post.category}
                              </span>
                            </div>
                            <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight group-hover:text-gray-200 transition-colors font-[family-name:var(--font-playfair)]">
                              {post.title}
                            </h3>
                            <p className="text-gray-400 text-base leading-relaxed mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}</span>
                                <span>•</span>
                                <span>{calculateReadTime(post.content)} min read</span>
                              </div>
                              <span className="text-gray-600 group-hover:text-gray-400 transition-colors text-sm flex items-center gap-1">
                                Read more
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                {posts.length > 1 && (
                  <div className="bg-[#0a0a0a] border border-gray-800/50 p-6 rounded-lg">
                    <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                      Recent Articles
                    </h3>
                    <ul className="space-y-4">
                      {posts.slice(0, 5).map((post) => (
                        <li key={post.id}>
                          <Link
                            href={`/posts/${post.slug || post.id}`}
                            className="group block"
                          >
                            <p className="text-white text-sm font-medium mb-1 group-hover:text-gray-300 transition-colors line-clamp-2">
                              {post.title}
                            </p>
                            <p className="text-gray-600 text-xs">
                              {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-[#0a0a0a] border border-gray-800/50 p-8 rounded-lg">
                  <div className="flex items-start gap-4 mb-6">
                    <Image
                      src="/my_dp.jpg"
                      alt="Amish B Harsoor"
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <div>
                      <h3 className="text-white text-base font-semibold">
                        Amish B Harsoor
                      </h3>
                      <p className="text-gray-500 text-sm">Writer & Analyst</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Welcome to my personal blog where I share my views on Indian politics and technology.
                  </p>
                  <div className="flex gap-4 mb-6">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="GitHub">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a href="https://twitter.com/amishharsooooor" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Twitter/X">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="LinkedIn">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    <strong className="text-gray-400">Disclaimer:</strong> All articles reflect my personal views and opinions
                    and do not represent any official position or organization.
                  </p>
                </div>


              </div>
            </aside>
          </div>
        </main>
      )}

      <footer className="border-t border-gray-800 py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                Views
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                Personal blog of <span className="text-gray-500">Amish B Harsoor</span>
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                Views and opinions on Indian politics
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-white transition-colors text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/now" className="text-gray-600 hover:text-white transition-colors text-sm">
                    What I'm Doing Now
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-white transition-colors text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-white transition-colors text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                Connect
              </h4>
              <div className="flex gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors" title="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://twitter.com/amishharsooooor" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors" title="Twitter/X">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors" title="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} Views by Amish B Harsoor. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <span>Built with</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-gray-500">Next.js</span>
                  <span>+</span>
                  <span className="text-gray-500">TypeScript</span>
                  <span>+</span>
                  <span className="text-gray-500">Tailwind</span>
                  <span>+</span>
                  <span className="text-gray-500">SQLite</span>
                  <span>+</span>
                  <span className="text-gray-500">☕</span>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={scrollToTop}
              className="text-gray-600 hover:text-white transition-colors text-sm flex items-center gap-2 group"
            >
              <span>Back to Top</span>
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
