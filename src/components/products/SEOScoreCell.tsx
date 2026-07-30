'use client'
import React from 'react'

export function SEOScoreCell({ score, issues = [] }: { score: number, issues?: string[] }) {
  const color = score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
  
  return (
    <div className="flex flex-col gap-1.5 justify-center h-full w-full group relative" title={issues.join('\n')}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] tabular-nums font-medium text-[#404040]">{score}</span>
      </div>
      <div className="w-full h-[3px] bg-[#E5E5E5] rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${Math.max(0, Math.min(100, score))}%` }} />
      </div>
    </div>
  )
}
