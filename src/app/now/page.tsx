'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function NowPage() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="min-h-screen flex flex-col bg-black">
            <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        <h1 className="text-white text-xl font-semibold tracking-tight">
                            Views
                        </h1>
                        <div className="w-20" /> {/* Spacer for centering */}
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
                <article className="text-white">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
                            What I'm Doing Now
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Last updated: {currentDate}
                        </p>
                    </div>

                    {/* Author Card */}
                    <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-800">
                        <Image
                            src="/my_dp.jpg"
                            alt="Amish B Harsoor"
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-white font-semibold text-lg">Amish B Harsoor</h2>
                            <p className="text-gray-500 text-sm">Backend Developer & Political Analyst</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-white">📍 Location</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Currently based in India, working remotely and staying connected to both tech and political developments.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-white">💼 Work</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 mt-1">→</span>
                                    <span>Building scalable backend systems with Java and Spring Boot</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 mt-1">→</span>
                                    <span>Exploring advanced system design patterns and microservices architecture</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 mt-1">→</span>
                                    <span>Contributing to open-source projects in the Java ecosystem</span>
                                </li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-white">📚 Learning</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-purple-500 mt-1">→</span>
                                    <span>Deep diving into distributed systems and event-driven architecture</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-purple-500 mt-1">→</span>
                                    <span>Studying Kubernetes and cloud-native technologies</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-purple-500 mt-1">→</span>
                                    <span>Analyzing electoral patterns and political data science</span>
                                </li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-white">✍️ Writing</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Actively publishing articles on:
                            </p>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">→</span>
                                    <span>Indian state elections and political analysis</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">→</span>
                                    <span>Backend development tutorials and best practices</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">→</span>
                                    <span>System design case studies</span>
                                </li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-white">📖 Reading</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-yellow-500 mt-1">→</span>
                                    <span><em>Designing Data-Intensive Applications</em> by Martin Kleppmann</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-yellow-500 mt-1">→</span>
                                    <span><em>The Psychology of Money</em> by Morgan Housel</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-yellow-500 mt-1">→</span>
                                    <span>Following Indian political commentary and policy analysis</span>
                                </li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-white">🎯 Personal Goals</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-pink-500 mt-1">→</span>
                                    <span>Training for a half marathon</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-pink-500 mt-1">→</span>
                                    <span>Building a portfolio of technical articles and political analysis</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-pink-500 mt-1">→</span>
                                    <span>Contributing more to the developer community</span>
                                </li>
                            </ul>
                        </section>

                        <section className="mb-12 p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                            <h2 className="text-xl font-bold mb-3 text-white">💡 About This Page</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                This is a <strong className="text-gray-300">/now page</strong>, inspired by{' '}
                                <a
                                    href="https://nownownow.com/about"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline"
                                >
                                    Derek Sivers
                                </a>
                                . Unlike an "About" page that stays static, this page is updated regularly to reflect
                                what I'm currently focused on. Think of it as a snapshot of my life right now.
                            </p>
                        </section>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 pt-8 border-t border-gray-800 text-center">
                        <p className="text-gray-400 mb-6">
                            Want to know more about my work or discuss politics and tech?
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/"
                                className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                            >
                                Read My Articles
                            </Link>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-gray-700 text-white font-medium hover:bg-gray-900 transition-colors"
                            >
                                Follow on X
                            </a>
                        </div>
                    </div>
                </article>
            </main>

            <footer className="border-t border-gray-800 py-8 bg-black">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Views by Amish B Harsoor. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
