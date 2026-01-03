import React from 'react'

type PolicyStatus = 'Proposed' | 'In Progress' | 'Implemented' | 'Stalled' | 'Failed'

interface Policy {
  id: string
  name: string
  description: string
  status: PolicyStatus
  progress: number // 0 to 100
  lastUpdated: string
  category: string
}

interface PolicyTrackerProps {
  title?: string
  policies: Policy[]
}

const statusColors: Record<PolicyStatus, string> = {
  'Proposed': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'In Progress': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Implemented': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Stalled': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Failed': 'bg-red-500/10 text-red-400 border-red-500/20',
}

const progressColors: Record<PolicyStatus, string> = {
  'Proposed': 'bg-blue-500',
  'In Progress': 'bg-yellow-500',
  'Implemented': 'bg-green-500',
  'Stalled': 'bg-orange-500',
  'Failed': 'bg-red-500',
}

export default function PolicyTracker({ title = "Policy Tracker", policies }: PolicyTrackerProps) {
  return (
    <div className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden my-8">
      <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {title}
        </h3>
        <span className="text-xs text-gray-500 font-mono">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
      </div>

      <div className="divide-y divide-gray-800">
        {policies.map((policy) => (
          <div key={policy.id} className="p-6 hover:bg-[#111] transition-colors group">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-white font-medium text-lg">{policy.name}</h4>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded border border-gray-700">
                    {policy.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                  {policy.description}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap self-start ${statusColors[policy.status]}`}>
                {policy.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500 font-mono">
                <span>Progress</span>
                <span>{policy.progress}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${progressColors[policy.status]}`}
                  style={{ width: `${policy.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 text-right pt-1">
                Updated: {policy.lastUpdated}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
