import Link from 'next/link'

export default function TermsOfService() {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="space-y-8 text-gray-300 leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Agreement to Terms</h2>
                                <p>
                                    By accessing and using Views ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use this Website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Use License</h2>
                                <p>
                                    Permission is granted to temporarily access the materials (information or software) on Views for personal, non-commercial viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mt-3">
                                    <li>Modify or copy the materials</li>
                                    <li>Use the materials for any commercial purpose or for any public display</li>
                                    <li>Attempt to reverse engineer any software contained on the Website</li>
                                    <li>Remove any copyright or other proprietary notations from the materials</li>
                                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                                </ul>
                                <p className="mt-3">
                                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by Views at any time.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Content and Intellectual Property</h2>
                                <p>
                                    All content published on this Website, including but not limited to articles, images, graphics, and logos, is the property of Amish B Harsoor or used with permission. The content is protected by copyright and other intellectual property laws.
                                </p>
                                <p className="mt-3">
                                    You may share and link to articles with proper attribution, but you may not reproduce, distribute, or create derivative works without explicit written permission.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Disclaimer of Opinions</h2>
                                <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
                                    <p className="text-gray-400">
                                        All views, opinions, and analysis expressed on this Website are strictly personal opinions of the author and do not represent the views of any organization, employer, or institution. The content is provided for informational and educational purposes only and should not be considered as professional advice.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">User Comments and Contributions</h2>
                                <p>
                                    If the Website allows you to post comments or other content, you agree that:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mt-3">
                                    <li>You will not post content that is defamatory, obscene, or offensive</li>
                                    <li>You will not post content that infringes on intellectual property rights</li>
                                    <li>You will not engage in personal attacks or harassment</li>
                                    <li>You will maintain respectful discourse even when disagreeing</li>
                                    <li>You grant us the right to use, modify, and display your contributions</li>
                                </ul>
                                <p className="mt-3">
                                    We reserve the right to remove any content that violates these terms or is otherwise objectionable.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Disclaimer of Warranties</h2>
                                <p>
                                    The materials on Views are provided on an 'as is' basis. Views makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Limitations of Liability</h2>
                                <p>
                                    In no event shall Views or its author be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this Website, even if Views or an authorized representative has been notified orally or in writing of the possibility of such damage.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Accuracy of Materials</h2>
                                <p>
                                    The materials appearing on Views could include technical, typographical, or photographic errors. Views does not warrant that any of the materials on its Website are accurate, complete, or current. Views may make changes to the materials contained on its Website at any time without notice.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Links to Third-Party Websites</h2>
                                <p>
                                    Views may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Modifications to Terms</h2>
                                <p>
                                    Views may revise these Terms of Service at any time without notice. By using this Website, you are agreeing to be bound by the then-current version of these Terms of Service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
                                <p>
                                    These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                                <p>
                                    If you have any questions about these Terms of Service, please contact us through our <Link href="/contact" className="text-white hover:text-gray-300 underline">Contact page</Link>.
                                </p>
                            </section>
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
