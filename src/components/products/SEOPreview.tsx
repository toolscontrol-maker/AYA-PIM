"use client"

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SEOPreviewProps {
  title: string
  description: string
  handle: string
}

export function SEOPreview({ title, description, handle }: SEOPreviewProps) {
  const url = `https://aya.com/products/${handle}`
  
  const isTitleValid = title.length >= 30 && title.length <= 60
  const isDescValid = description.length >= 120 && description.length <= 160
  
  return (
    <div className="space-y-4">
      <div className="border border-[#E5E5E5] rounded-lg p-6 bg-white max-w-2xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center text-xs font-medium text-[#0A0A0A]">
            A
          </div>
          <div>
            <div className="text-[13px] text-[#0A0A0A] font-medium leading-tight">AYA</div>
            <div className="text-[12px] text-[#404040] leading-tight">{url}</div>
          </div>
        </div>
        <div className="text-[20px] text-[#1a0dab] font-medium cursor-pointer hover:underline mb-1 truncate">
          {title || 'Product Title'}
        </div>
        <div className="text-[13px] text-[#404040] line-clamp-2">
          {description || 'Product description will appear here in search results.'}
        </div>
      </div>

      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[#737373]">Title:</span>
          <span className={cn(isTitleValid ? 'text-[#16A34A]' : 'text-[#EF4444]')}>
            {title.length}/60
          </span>
          {!isTitleValid && <AlertCircle className="w-3.5 h-3.5 text-[#EF4444]" />}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#737373]">Description:</span>
          <span className={cn(isDescValid ? 'text-[#16A34A]' : 'text-[#EF4444]')}>
            {description.length}/160
          </span>
          {!isDescValid && <AlertCircle className="w-3.5 h-3.5 text-[#EF4444]" />}
        </div>
      </div>
    </div>
  )
}
