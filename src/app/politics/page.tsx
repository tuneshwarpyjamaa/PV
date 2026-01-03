import React from 'react'
import FactCheckCard from '@/components/FactCheckCard'
import PoliticalTimeline from '@/components/PoliticalTimeline'
import PolicyTracker from '@/components/PolicyTracker'
import Link from 'next/link'

export default function PoliticalToolboxDemo() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Political Toolbox
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-24">

        {/* Intro */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-serif font-bold">Analytic Tools</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of specialized components designed for rigorous political analysis,
            fact-checking, and long-term governance tracking.
          </p>
        </section>

        {/* Feature 1: Fact Check Card */}
        <section>
          <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-black">1</div>
            <div>
              <h3 className="text-2xl font-bold">Fact Check Verification</h3>
              <p className="text-gray-500 text-sm">Isolates claims with clear verdicts and evidence.</p>
            </div>
          </div>

          <FactCheckCard
            claim="The new digital privacy bill will allow complete government surveillance of all encrypted messages without a warrant."
            claimant="Opposition Leader"
            verdict="Misleading"
            date={new Date().toISOString()}
            evidence="While the bill does propose new oversight mechanisms, Section 45 explicitly states that end-to-end encryption cannot be broken, and warrants are still required for metadata access."
            sourceUrl="https://example.com/bill-text"
          />

          <FactCheckCard
            claim="Unemployment rates have dropped to their lowest point in two decades."
            claimant="Finance Ministry"
            verdict="True"
            date={new Date().toISOString()}
            evidence="According to the latest Q3 report from the National Statistical Office, the unemployment rate stands at 3.2%, the lowest recorded since 2004."
            sourceUrl="https://example.com/stats"
          />
        </section>

        {/* Feature 2: Policy Tracker */}
        <section>
          <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-4">
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black">2</div>
            <div>
              <h3 className="text-2xl font-bold">Policy Tracker Dashboard</h3>
              <p className="text-gray-500 text-sm">Monitors the status of campaign promises and bills.</p>
            </div>
          </div>

          <PolicyTracker
            title="Election Manifesto 2024 Tracker"
            policies={[
              {
                id: '1',
                name: 'Nationwide 5G Coverage',
                description: 'Complete rollout of 5G infrastructure across all tier-1 and tier-2 cities.',
                category: 'Infrastructure',
                status: 'In Progress',
                progress: 75,
                lastUpdated: 'Oct 2025'
              },
              {
                id: '2',
                name: 'Green Energy Subsidy',
                description: '30% subsidy for all residential solar panel installations.',
                category: 'Environment',
                status: 'Implemented',
                progress: 100,
                lastUpdated: 'Jan 2025'
              },
              {
                id: '3',
                name: 'Universal Basic Income Pilot',
                description: 'Experimental UBI program for low-income districts.',
                category: 'Economy',
                status: 'Stalled',
                progress: 15,
                lastUpdated: 'Aug 2024'
              }
            ]}
          />
        </section>

        {/* Feature 3: Interactive Timeline */}
        <section>
          <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-4">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-black">3</div>
            <div>
              <h3 className="text-2xl font-bold">Interactive Timeline</h3>
              <p className="text-gray-500 text-sm">Visualizes the history and context of events.</p>
            </div>
          </div>

          <PoliticalTimeline
            title="Evolution of the Digital Data Protection Act"
            events={[
              {
                date: "Nov 2022",
                title: "Draft Bill Released",
                description: "The Ministry of Electronics and IT releases the first draft for public consultation.",
                status: "completed"
              },
              {
                date: "Aug 2023",
                title: "Parliamentary Approval",
                description: "Passed by both houses of Parliament after 4 days of intense debate.",
                status: "completed"
              },
              {
                date: "Jan 2024",
                title: "Rules Notification Pending",
                description: "The detailed rules for implementation are currently being drafted by the committee.",
                status: "ongoing"
              },
              {
                date: "2025 (Expected)",
                title: "Full Enforcement",
                description: "The Data Protection Board will be fully operational and penalties will come into force.",
                status: "future"
              }
            ]}
          />
        </section>

      </main>
    </div>
  )
}
