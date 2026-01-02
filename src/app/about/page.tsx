import Link from 'next/link'
import Image from 'next/image'

export default function About() {
    return (
        <div className="min-h-screen flex flex-col bg-black">
            <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/">
                            <h1 className="text-white text-xl md:text-2xl font-semibold tracking-tight cursor-pointer">
                                Views
                            </h1>
                        </Link>
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                <article className="text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About Views</h1>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <p className="text-xl text-gray-400">
                                Welcome to Views, a personal blog where I share my thoughts on Indian politics and technology.
                            </p>

                            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">About the Author</h2>
                            <div className="flex items-start gap-6 mb-6">
                                <Image
                                    src="/my_dp.jpg"
                                    alt="Amish B Harsoor"
                                    width={96}
                                    height={96}
                                    className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Amish B Harsoor</h3>
                                    <p>
                                        I am passionate about politics and technology. I enjoy analyzing Indian politics, governance, and policy decisions, while also exploring the world of technology as a separate interest. Through this blog, I share my perspectives on both these topics that fascinate me.
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">What You'll Find Here</h2>
                            <ul className="space-y-3 list-disc list-inside">
                                <li><strong className="text-white">Political Analysis:</strong> In-depth commentary on Indian politics, elections, and political developments</li>
                                <li><strong className="text-white">Technology:</strong> Insights and discussions on tech trends, innovations, and developments</li>
                                <li><strong className="text-white">Policy Insights:</strong> Analysis of government policies and their implications</li>
                                <li><strong className="text-white">Current Affairs:</strong> Perspectives on trending topics and news events</li>
                            </ul>

                            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">My Approach</h2>
                            <p>
                                I believe in thoughtful, balanced analysis that considers multiple perspectives. While I have my own views and opinions, I strive to present arguments backed by facts and logical reasoning. My goal is to contribute to informed public discourse and encourage critical thinking about the issues that shape our nation.
                            </p>

                            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Disclaimer</h2>
                            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
                                <p className="text-gray-400 text-sm">
                                    All views and opinions expressed on this blog are strictly personal and do not represent any official position, organization, or institution. The content is meant for informational and educational purposes only.
                                </p>
                            </div>

                            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Get in Touch</h2>
                            <p>
                                I welcome constructive feedback, suggestions, and discussions. If you'd like to reach out, please visit the <Link href="/contact" className="text-white hover:text-gray-300 underline">Contact page</Link>.
                            </p>
                        </div>
                    </div>
                </article>
            </main>

            <footer className="border-t border-gray-800 py-8 bg-black mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Views by Amish B Harsoor. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
