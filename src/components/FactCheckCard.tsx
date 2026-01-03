import React from 'react'

type Verdict = 'True' | 'False' | 'Misleading' | 'Context Missing' | 'Unverified'

interface FactCheckCardProps {
  claim: string
  claimant: string
  verdict: Verdict
  evidence: string
  sourceUrl?: string
  date: string
}

const verdictColors: Record<Verdict, string> = {
  'True': 'bg-green-500/10 text-green-500 border-green-500/20',
  'False': 'bg-red-500/10 text-red-500 border-red-500/20',
  'Misleading': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'Context Missing': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'Unverified': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

const verdictIcons: Record<Verdict, React.ReactNode> = {
  'True': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  'False': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  'Misleading': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  'Context Missing': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'Unverified': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export default function FactCheckCard({
  claim,
  claimant,
  verdict,
  evidence,
  sourceUrl,
  date
}: FactCheckCardProps) {
  return (
    <div className="my-8 border border-gray-800 rounded-lg overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-full text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
            Fact Check
          </span>
        </div>
        <span className="text-gray-500 text-xs font-mono">
          {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      </div>

      <div className="p-6">
        {/* Claim Section */}
        <div className="mb-6">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">The Claim</p>
          <div className="flex gap-4">
            <div className="flex-1">
              <h3 className="text-white font-serif text-lg md:text-xl font-medium leading-relaxed">
                "{claim}"
              </h3>
              <p className="text-gray-500 text-sm mt-2">— {claimant}</p>
            </div>
          </div>
        </div>

        {/* Verdict Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${verdictColors[verdict]}`}>
          {verdictIcons[verdict]}
          <span className="font-bold uppercase tracking-wide text-sm">{verdict}</span>
        </div>

        {/* Analysis/Evidence */}
        <div className="space-y-4">
          <p className="text-gray-500 text-xs uppercase tracking-wider">The Evidence</p>
          <p className="text-gray-300 text-base leading-relaxed">
            {evidence}
          </p>

          {sourceUrl && (
            <div className="pt-4 mt-4 border-t border-gray-800">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                <span>View Source</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
