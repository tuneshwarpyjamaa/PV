import React from 'react'

interface TimelineEvent {
  date: string
  title: string
  description: string
  status?: 'completed' | 'ongoing' | 'future'
}

interface PoliticalTimelineProps {
  title?: string
  events: TimelineEvent[]
}

export default function PoliticalTimeline({ title = "Timeline of Events", events }: PoliticalTimelineProps) {
  return (
    <div className="my-12">
      {title && (
        <h3 className="text-xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
          {title}
        </h3>
      )}

      <div className="relative pl-8 border-l border-gray-800 space-y-12">
        {events.map((event, index) => {
          const isLast = index === events.length - 1

          return (
            <div key={index} className="relative group">
              {/* Timeline Node */}
              <div className={`absolute -left-[39px] top-1.5 w-5 h-5 rounded-full border-4 border-[#0a0a0a] transition-colors duration-300
                ${event.status === 'future' ? 'bg-gray-800' : 'bg-blue-500'}
                ${event.status === 'ongoing' ? 'animate-pulse' : ''}
              `}></div>

              {/* Date Badge */}
              <div className="inline-block px-3 py-1 mb-2 text-xs font-mono text-blue-400 bg-blue-500/10 rounded border border-blue-500/20">
                {event.date}
              </div>

              {/* Content */}
              <div className="bg-[#111] p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-2 font-serif">
                  {event.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
