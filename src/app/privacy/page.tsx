import Link from 'next/link'

export default function PrivacyPolicy() {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="space-y-8 text-gray-300 leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                                <p>
                                    Welcome to Views. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
                                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Personal Data</h3>
                                <p>
                                    We may collect personal information that you voluntarily provide to us when you:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mt-3">
                                    <li>Subscribe to our newsletter</li>
                                    <li>Contact us through our contact form</li>
                                    <li>Leave comments on articles</li>
                                    <li>Engage with our content</li>
                                </ul>
                                <p className="mt-3">
                                    This information may include your name, email address, and any other information you choose to provide.
                                </p>

                                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Automatically Collected Information</h3>
                                <p>
                                    When you visit our website, we may automatically collect certain information about your device, including:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mt-3">
                                    <li>IP address</li>
                                    <li>Browser type and version</li>
                                    <li>Operating system</li>
                                    <li>Pages visited and time spent on pages</li>
                                    <li>Referring website addresses</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
                                <p>We use the information we collect to:</p>
                                <ul className="list-disc list-inside space-y-2 mt-3">
                                    <li>Provide, operate, and maintain our website</li>
                                    <li>Improve, personalize, and expand our website</li>
                                    <li>Understand and analyze how you use our website</li>
                                    <li>Send you newsletters and updates (if you've subscribed)</li>
                                    <li>Respond to your comments, questions, and requests</li>
                                    <li>Detect, prevent, and address technical issues</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking Technologies</h2>
                                <p>
                                    We may use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
                                </p>
                                <p className="mt-3">
                                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
                                <p>
                                    We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, or assist us in analyzing how our website is used. These third parties may have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
                                <p>
                                    We implement appropriate technical and organizational security measures to protect your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
                                <p>You have the right to:</p>
                                <ul className="list-disc list-inside space-y-2 mt-3">
                                    <li>Access the personal information we hold about you</li>
                                    <li>Request correction of inaccurate information</li>
                                    <li>Request deletion of your personal information</li>
                                    <li>Object to processing of your personal information</li>
                                    <li>Withdraw consent at any time</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Children's Privacy</h2>
                                <p>
                                    Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
                                <p>
                                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us through our <Link href="/contact" className="text-white hover:text-gray-300 underline">Contact page</Link>.
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
