'use client'

import { useEffect, useState } from 'react'

interface Heading {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string>('')

    useEffect(() => {
        // Parse headings from content (assuming markdown-style headings)
        const lines = content.split('\n')
        const parsedHeadings: Heading[] = []

        lines.forEach((line, index) => {
            const match = line.match(/^(#{1,3})\s+(.+)/)
            if (match) {
                const level = match[1].length
                const text = match[2]
                const id = `heading-${index}`
                parsedHeadings.push({ id, text, level })
            }
        })

        setHeadings(parsedHeadings)
    }, [content])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-20% 0% -35% 0%' }
        )

        headings.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [headings])

    if (headings.length === 0) return null

    return (
        <nav className="sticky top-24 border border-gray-800 rounded-lg p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Table of Contents
            </h3>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`text-sm transition-colors block py-1 border-l-2 pl-3 ${activeId === heading.id
                                    ? 'border-white text-white font-medium'
                                    : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600'
                                }`}
                            onClick={(e) => {
                                e.preventDefault()
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                })
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
