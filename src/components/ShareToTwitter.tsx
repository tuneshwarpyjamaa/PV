'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ShareToTwitterProps {
    title: string
    excerpt: string
    category: string
    date: string
    url?: string
    compact?: boolean
}

export default function ShareToTwitter({ title, excerpt, category, date, url, compact = false }: ShareToTwitterProps) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [showPreview, setShowPreview] = useState(false)

    const getCardUrl = () => {
        return `/api/twitter-card?${new URLSearchParams({
            title,
            category,
            excerpt: excerpt.substring(0, 150),
            date,
        }).toString()}`
    }

    const handleShare = async () => {
        setIsGenerating(true)

        try {
            // Create the tweet text
            const articleUrl = url || window.location.href
            const tweetText = `${title}\n\n${excerpt.substring(0, 100)}...\n\nRead more:`

            // Encode the tweet text and URL
            const twitterUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({
                text: tweetText,
                url: articleUrl,
            }).toString()}`

            // Open Twitter in a new window
            const width = 550
            const height = 420
            const left = (window.screen.width - width) / 2
            const top = (window.screen.height - height) / 2

            window.open(
                twitterUrl,
                'Share to Twitter',
                `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1`
            )

        } catch (error) {
            console.error('Failed to share to Twitter:', error)
            alert('Failed to share. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleDownloadCard = async () => {
        setIsGenerating(true)

        try {
            const cardUrl = getCardUrl()

            // Fetch the image
            const response = await fetch(cardUrl)
            const blob = await response.blob()

            // Create a download link
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = `${title.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase()}_twitter_card.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(downloadUrl)

        } catch (error) {
            console.error('Failed to download card:', error)
            alert('Failed to download Twitter card. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    // Compact mode - just an icon button that opens the modal
    if (compact) {
        return (
            <>
                <button
                    onClick={() => setShowPreview(true)}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors group"
                    title="Share to X (Twitter)"
                >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </button>

                {/* Share Modal */}
                {showPreview && (
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in"
                        onClick={() => setShowPreview(false)}
                    >
                        <div
                            className="bg-[#15202b] rounded-2xl max-w-2xl w-full shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                                <h3 className="text-white font-semibold text-lg">Share to X (Twitter)</h3>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Twitter-like Tweet Preview */}
                            <div className="p-6">
                                <div className="bg-black rounded-xl border border-gray-700 p-4">
                                    {/* Tweet Header */}
                                    <div className="flex items-start gap-3 mb-3">
                                        <Image
                                            src="/my_dp.jpg"
                                            alt="Profile"
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-bold">Amish B Harsoor</span>
                                                <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8.52 3.59c.8-1.1 2.18-1.8 3.48-1.8s2.68.7 3.48 1.8l.53.73c.5.7 1.33 1.11 2.21 1.11h.91c1.38 0 2.5 1.12 2.5 2.5v.91c0 .88.41 1.71 1.11 2.21l.73.53c1.1.8 1.8 2.18 1.8 3.48s-.7 2.68-1.8 3.48l-.73.53c-.7.5-1.11 1.33-1.11 2.21v.91c0 1.38-1.12 2.5-2.5 2.5h-.91c-.88 0-1.71.41-2.21 1.11l-.53.73c-.8 1.1-2.18 1.8-3.48 1.8s-2.68-.7-3.48-1.8l-.53-.73c-.5-.7-1.33-1.11-2.21-1.11h-.91c-1.38 0-2.5-1.12-2.5-2.5v-.91c0-.88-.41-1.71-1.11-2.21l-.73-.53c-1.1-.8-1.8-2.18-1.8-3.48s.7-2.68 1.8-3.48l.73-.53c.7-.5 1.11-1.33 1.11-2.21v-.91c0-1.38 1.12-2.5 2.5-2.5h.91c.88 0 1.71-.41 2.21-1.11l.53-.73z" />
                                                    <path fill="black" d="M9 12l2 2 4-4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="text-gray-500">@amishharsooooor · {date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tweet Text */}
                                    <p className="text-white text-[15px] leading-relaxed mb-3">
                                        {title}
                                        <br />
                                        <br />
                                        {excerpt.substring(0, 100)}...
                                        <br />
                                        <br />
                                        Read more: <span className="text-blue-400">views.amish.dev</span>
                                    </p>

                                    {/* Twitter Card */}
                                    <div className="rounded-2xl overflow-hidden border border-gray-700">
                                        <img
                                            src={getCardUrl()}
                                            alt="Twitter Card Preview"
                                            className="w-full h-auto"
                                        />
                                    </div>

                                    {/* Tweet Actions */}
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors group">
                                            <div className="p-2 rounded-full group-hover:bg-blue-400/10">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm">24</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors group">
                                            <div className="p-2 rounded-full group-hover:bg-green-400/10">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </div>
                                            <span className="text-sm">12</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors group">
                                            <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm">156</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors group">
                                            <div className="p-2 rounded-full group-hover:bg-blue-400/10">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 border-t border-gray-700 flex flex-wrap justify-end gap-2">
                                <button
                                    onClick={handleDownloadCard}
                                    disabled={isGenerating}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download Card
                                </button>
                                <button
                                    onClick={() => {
                                        setShowPreview(false)
                                        handleShare()
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors font-medium text-sm"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    Share to X
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }

    // Full mode (original)
    return (
        <>
            <div className="flex flex-wrap items-center gap-2">
                {/* Preview Button */}
                <button
                    onClick={() => setShowPreview(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 font-medium text-sm border border-gray-700 hover:border-gray-600"
                    title="Preview Twitter Card"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Preview</span>
                </button>

                {/* Share to Twitter Button */}
                <button
                    onClick={handleShare}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    title="Share to Twitter/X"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>{isGenerating ? 'Sharing...' : 'Share to X'}</span>
                </button>

                {/* Download Card Button */}
                <button
                    onClick={handleDownloadCard}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm border border-gray-700 hover:border-gray-600"
                    title="Download Twitter Card"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download Card</span>
                </button>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in"
                    onClick={() => setShowPreview(false)}
                >
                    <div
                        className="bg-[#15202b] rounded-2xl max-w-2xl w-full shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-700">
                            <h3 className="text-white font-semibold text-lg">Twitter Card Preview</h3>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Twitter-like Tweet Preview */}
                        <div className="p-6">
                            <div className="bg-black rounded-xl border border-gray-700 p-4">
                                {/* Tweet Header */}
                                <div className="flex items-start gap-3 mb-3">
                                    <Image
                                        src="/my_dp.jpg"
                                        alt="Profile"
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-bold">Amish B Harsoor</span>
                                            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8.52 3.59c.8-1.1 2.18-1.8 3.48-1.8s2.68.7 3.48 1.8l.53.73c.5.7 1.33 1.11 2.21 1.11h.91c1.38 0 2.5 1.12 2.5 2.5v.91c0 .88.41 1.71 1.11 2.21l.73.53c1.1.8 1.8 2.18 1.8 3.48s-.7 2.68-1.8 3.48l-.73.53c-.7.5-1.11 1.33-1.11 2.21v.91c0 1.38-1.12 2.5-2.5 2.5h-.91c-.88 0-1.71.41-2.21 1.11l-.53.73c-.8 1.1-2.18 1.8-3.48 1.8s-2.68-.7-3.48-1.8l-.53-.73c-.5-.7-1.33-1.11-2.21-1.11h-.91c-1.38 0-2.5-1.12-2.5-2.5v-.91c0-.88-.41-1.71-1.11-2.21l-.73-.53c-1.1-.8-1.8-2.18-1.8-3.48s.7-2.68 1.8-3.48l.73-.53c.7-.5 1.11-1.33 1.11-2.21v-.91c0-1.38 1.12-2.5 2.5-2.5h.91c.88 0 1.71-.41 2.21-1.11l.53-.73z" />
                                                <path fill="black" d="M9 12l2 2 4-4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-gray-500">@amishharsooooor · {date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tweet Text */}
                                <p className="text-white text-[15px] leading-relaxed mb-3">
                                    {title}
                                    <br />
                                    <br />
                                    {excerpt.substring(0, 100)}...
                                    <br />
                                    <br />
                                    Read more: <span className="text-blue-400">views.amish.dev</span>
                                </p>

                                {/* Twitter Card */}
                                <div className="rounded-2xl overflow-hidden border border-gray-700">
                                    <img
                                        src={getCardUrl()}
                                        alt="Twitter Card Preview"
                                        className="w-full h-auto"
                                    />
                                </div>

                                {/* Tweet Actions */}
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors group">
                                        <div className="p-2 rounded-full group-hover:bg-blue-400/10">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm">24</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors group">
                                        <div className="p-2 rounded-full group-hover:bg-green-400/10">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </div>
                                        <span className="text-sm">12</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors group">
                                        <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm">156</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors group">
                                        <div className="p-2 rounded-full group-hover:bg-blue-400/10">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-700 flex justify-end gap-2">
                            <button
                                onClick={() => setShowPreview(false)}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setShowPreview(false)
                                    handleShare()
                                }}
                                className="px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors font-medium"
                            >
                                Share Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
