'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real application, you would send this data to a backend
        console.log('Form submitted:', formData)
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
    }

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
                <div className="text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-gray-400 mb-12">
                        Have a question, suggestion, or just want to share your thoughts? I'd love to hear from you.
                    </p>

                    {submitted ? (
                        <div className="bg-green-900/20 border border-green-800 text-green-400 p-6 rounded-lg mb-8">
                            <p className="font-semibold">Thank you for your message!</p>
                            <p className="text-sm mt-2">I'll get back to you as soon as possible.</p>
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2 font-medium">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors"
                                    required
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2 font-medium">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors"
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">
                                Subject *
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors"
                                required
                                placeholder="What is this regarding?"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">
                                Message *
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={8}
                                className="w-full bg-gray-950 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors resize-none"
                                required
                                placeholder="Your message here..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>

                    <div className="mt-16 pt-8 border-t border-gray-800">
                        <h2 className="text-2xl font-semibold mb-6">Other Ways to Connect</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-gray-800 p-6">
                                <h3 className="text-white font-semibold mb-2">Email</h3>
                                <p className="text-gray-400 text-sm">
                                    For general inquiries and feedback
                                </p>
                                <p className="text-white mt-2">contact@politicalviews.com</p>
                            </div>

                            <div className="border border-gray-800 p-6">
                                <h3 className="text-white font-semibold mb-2">Social Media</h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    Follow for updates and discussions
                                </p>
                                <div className="flex gap-4">
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Twitter
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
