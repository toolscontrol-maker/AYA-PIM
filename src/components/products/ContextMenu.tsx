'use client'
import React, { useEffect, useRef } from 'react'

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ')

export interface ContextMenuItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  separator?: boolean
  danger?: boolean
}

interface ContextMenuProps {
  x: number
  y: number
  items: ContextMenuItem[]
  onClose: () => void
}

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <div 
      ref={menuRef}
      className="fixed z-50 min-w-[200px] bg-white border border-[#E5E5E5] rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100"
      style={{ top: y, left: x }}
    >
      {items.map((item, idx) => {
        if (item.separator) {
          return <div key={idx} className="h-px bg-[#E5E5E5] my-1" />
        }
        
        return (
          <button
            key={idx}
            onClick={() => {
              item.onClick?.()
              onClose()
            }}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-1.5 text-[13px] text-left hover:bg-[#FAFAFA] transition-colors",
              item.danger ? "text-[#EF4444] hover:bg-red-50" : "text-[#404040]"
            )}
          >
            {item.icon && <span className="w-4 h-4 flex items-center justify-center">{item.icon}</span>}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
