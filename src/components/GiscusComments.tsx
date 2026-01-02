'use client'

import { useEffect, useRef } from 'react'

interface GiscusCommentsProps {
    repo: string // e.g., "username/repo"
    repoId: string
    category: string
    categoryId: string
}

export default function GiscusComments({
    repo,
    repoId,
    category,
    categoryId
}: GiscusCommentsProps) {
    const commentsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!commentsRef.current) return

        const script = document.createElement('script')
        script.src = 'https://giscus.app/client.js'
        script.setAttribute('data-repo', repo)
        script.setAttribute('data-repo-id', repoId)
        script.setAttribute('data-category', category)
        script.setAttribute('data-category-id', categoryId)
        script.setAttribute('data-mapping', 'pathname')
        script.setAttribute('data-strict', '0')
        script.setAttribute('data-reactions-enabled', '1')
        script.setAttribute('data-emit-metadata', '0')
        script.setAttribute('data-input-position', 'top')
        script.setAttribute('data-theme', 'dark')
        script.setAttribute('data-lang', 'en')
        script.setAttribute('data-loading', 'lazy')
        script.crossOrigin = 'anonymous'
        script.async = true

        commentsRef.current.appendChild(script)

        return () => {
            if (commentsRef.current) {
                commentsRef.current.innerHTML = ''
            }
        }
    }, [repo, repoId, category, categoryId])

    return (
        <div className="mt-16 pt-8 border-t border-gray-800">
            <h3 className="text-white text-xl font-semibold mb-6">Comments</h3>
            <div ref={commentsRef} className="giscus" />
        </div>
    )
}
