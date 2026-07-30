'use client'

import { usePathname } from 'next/navigation'
import { Search, Filter, Undo, Redo, LayoutGrid, List, X, ChevronDown, Clock } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui.store'

export function TopBar() {
  const pathname = usePathname()
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  const segments = pathname.split('/').filter(Boolean)
  const moduleName = segments[0] ? segments[0].charAt(0).toUpperCase() + segments[0].slice(1) : 'PIM'
  const pageName = segments[1] ? segments[1].charAt(0).toUpperCase() + segments[1].slice(1) : 'Dashboard'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="flex items-center justify-between h-10 px-4 bg-white border-b border-[#E5E5E5] shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center text-[13px]">
          <span className="text-[#737373]">{moduleName}</span>
          <span className="mx-2 text-[#E5E5E5]">/</span>
          <span className="font-medium text-[#0A0A0A]">{pageName}</span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] text-[11px] font-medium text-[#737373]">
          60 products
        </div>
      </div>

      <div className="flex-1 max-w-md px-8 relative flex items-center justify-center">
        <div className={cn(
          "flex items-center w-full max-w-xs h-7 rounded px-2 transition-colors",
          searchFocused ? "bg-white border border-[#E5E5E5] shadow-sm" : "bg-transparent border border-transparent hover:bg-[#FAFAFA]"
        )}>
          <Search className="w-3.5 h-3.5 text-[#737373] shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search products... (⌘F)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 h-full bg-transparent border-none outline-none px-2 text-[13px] text-[#0A0A0A] placeholder:text-[#737373]"
          />
          {searchValue && (
            <button onClick={() => setSearchValue('')} className="shrink-0 text-[#737373] hover:text-[#0A0A0A]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button className="flex items-center gap-1.5 h-7 px-2.5 rounded text-[13px] font-medium text-[#404040] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors">
          <Clock className="w-3.5 h-3.5" />
          <span>Recent</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-50" />
        </button>
        <button className="flex items-center gap-1.5 h-7 px-2.5 rounded text-[13px] font-medium text-[#404040] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter</span>
        </button>
        <div className="w-px h-4 bg-[#E5E5E5] mx-1" />
        <button disabled className="w-7 h-7 flex items-center justify-center rounded text-[#737373] opacity-50 cursor-not-allowed">
          <Undo className="w-3.5 h-3.5" />
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded text-[#404040] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors">
          <Redo className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-4 bg-[#E5E5E5] mx-1" />
        <div className="flex bg-[#FAFAFA] border border-[#E5E5E5] rounded p-0.5">
          <button className="w-6 h-6 flex items-center justify-center rounded bg-white shadow-sm text-[#0A0A0A]">
            <List className="w-3.5 h-3.5" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded text-[#737373] hover:text-[#0A0A0A]">
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
