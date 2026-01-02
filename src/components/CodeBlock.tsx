'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
    code: string
    language: string
    filename?: string
    showLineNumbers?: boolean
}

export default function CodeBlock({
    code,
    language,
    filename,
    showLineNumbers = true
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="my-6 rounded-lg overflow-hidden border border-gray-800 bg-[#1e1e1e]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    {filename && (
                        <span className="text-xs text-gray-400 ml-2 font-mono">{filename}</span>
                    )}
                </div>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                >
                    {copied ? (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </>
                    )}
                </button>
            </div>

            {/* Code */}
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                showLineNumbers={showLineNumbers}
                customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: '#1e1e1e',
                    fontSize: '0.875rem',
                    lineHeight: '1.7'
                }}
                lineNumberStyle={{
                    minWidth: '3em',
                    paddingRight: '1em',
                    color: '#6e7681',
                    userSelect: 'none'
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}
