'use client'
import React from 'react'

export function StatusBadge({ status }: { status: 'active' | 'draft' | 'archived' | string }) {
  if (status === 'active') {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
        <span className="text-[12px] text-[#404040] capitalize">{status}</span>
      </div>
    )
  }
  
  if (status === 'draft') {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#737373]" />
        <span className="text-[12px] text-[#737373] capitalize">{status}</span>
      </div>
    )
  }
  
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
      <span className="text-[12px] text-[#737373] line-through capitalize">{status}</span>
    </div>
  )
}
