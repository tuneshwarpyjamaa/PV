'use client'

import { useEffect, useState } from 'react'

export default function QuoteToShare() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [selectedText, setSelectedText] = useState('')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection()
            const text = selection?.toString().trim()

            if (text && text.length > 10) {
                const range = selection?.getRangeAt(0)
                const rect = range?.getBoundingClientRect()

                if (rect) {
                    setPosition({
                        x: rect.left + rect.width / 2,
                        y: rect.top - 50
                    })
                    setSelectedText(text)
                    setVisible(true)
                }
            } else {
                setVisible(false)
            }
        }

        document.addEventListener('mouseup', handleSelection)
        document.addEventListener('selectionchange', handleSelection)

        return () => {
            document.removeEventListener('mouseup', handleSelection)
            document.removeEventListener('selectionchange', handleSelection)
        }
    }, [])

    const shareOnTwitter = () => {
        const url = window.location.href
        const tweetText = `"${selectedText}"\n\nRead more: ${url}`
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
        window.open(twitterUrl, '_blank', 'width=550,height=420')
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div
            className="fixed z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translateX(-50%)'
            }}
        >
            <button
                onClick={shareOnTwitter}
                className="bg-black border border-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors shadow-lg flex items-center gap-2"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share on X
            </button>
        </div>
    )
}
