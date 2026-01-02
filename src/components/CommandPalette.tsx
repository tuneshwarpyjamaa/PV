'use client'

import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'

interface Post {
    id: string
    title: string
    excerpt: string
    category: string
    content: string
    createdAt: string
}

interface CommandPaletteProps {
    posts: Post[]
    onSelectPost: Dispatch<SetStateAction<Post | null>>
}

export default function CommandPalette({ posts, onSelectPost }: CommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const router = useRouter()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase())
    )

    const commands = [
        { id: 'home', label: 'Go to Home', action: () => router.push('/') },
        { id: 'now', label: 'What I\'m doing now', action: () => router.push('/now') },
        { id: 'tech', label: 'Filter: Tech Articles', action: () => { /* handled by parent */ } },
        { id: 'politics', label: 'Filter: Politics Articles', action: () => { /* handled by parent */ } },
    ]

    const allItems = [
        ...commands.map(cmd => ({ ...cmd, type: 'command' as const })),
        ...filteredPosts.map(post => ({ ...post, type: 'post' as const }))
    ]

    useEffect(() => {
        setSelectedIndex(0)
    }, [search])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev + 1) % allItems.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev - 1 + allItems.length) % allItems.length)
        } else if (e.key === 'Enter') {
            e.preventDefault()
            const item = allItems[selectedIndex]
            if (item.type === 'command') {
                item.action()
            } else {
                onSelectPost(item)
            }
            setIsOpen(false)
            setSearch('')
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-start justify-center pt-[20vh] px-4">
            <div className="w-full max-w-2xl bg-gray-950 border border-gray-800 rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search articles or type a command..."
                        className="flex-1 bg-transparent text-white placeholder:text-gray-600 focus:outline-none text-sm"
                        autoFocus
                    />
                    <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-gray-500 bg-gray-900 border border-gray-800 rounded">
                        ESC
                    </kbd>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {allItems.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500 text-sm">
                            No results found
                        </div>
                    ) : (
                        <div className="py-2">
                            {allItems.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        if (item.type === 'command') {
                                            item.action()
                                        } else {
                                            onSelectPost(item)
                                        }
                                        setIsOpen(false)
                                        setSearch('')
                                    }}
                                    className={`w-full px-4 py-3 text-left transition-colors ${index === selectedIndex
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-400 hover:bg-gray-900'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.type === 'command' ? (
                                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium truncate">
                                                {item.type === 'command' ? item.label : item.title}
                                            </div>
                                            {item.type === 'post' && (
                                                <div className="text-xs text-gray-600 truncate mt-1">
                                                    {item.excerpt}
                                                </div>
                                            )}
                                        </div>
                                        {item.type === 'post' && (
                                            <span className="px-2 py-1 text-xs bg-gray-900 text-gray-400 rounded">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-4 py-2 border-t border-gray-800 flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-gray-900 border border-gray-800 rounded">↑↓</kbd>
                            Navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-gray-900 border border-gray-800 rounded">↵</kbd>
                            Select
                        </span>
                    </div>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-gray-900 border border-gray-800 rounded">⌘K</kbd>
                        or
                        <kbd className="px-1.5 py-0.5 bg-gray-900 border border-gray-800 rounded">Ctrl K</kbd>
                    </span>
                </div>
            </div>
        </div>
    )
}
