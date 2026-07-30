'use client'
import React, { useState, useRef, useEffect } from 'react'

// Simple cn utility fallback
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

interface InlineCellProps {
  value: string | number
  onSave: (value: string) => void
  type?: 'text' | 'number' | 'select'
  options?: { label: string; value: string }[]
  className?: string
  formatter?: (value: string | number) => string
}

export function InlineCell({ value, onSave, type = 'text', options = [], className, formatter }: InlineCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(String(value))
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    if (editValue !== String(value)) {
      onSave(editValue)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setEditValue(String(value))
      setIsEditing(false)
    }
  }

  if (isEditing) {
    if (type === 'select') {
      return (
        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={cn("w-full h-full min-h-[32px] px-2 text-[13px] border border-black outline-none bg-white", className)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )
    }
    
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn("w-full h-full min-h-[32px] px-2 text-[13px] border border-black outline-none bg-white", className)}
      />
    )
  }

  return (
    <div 
      onDoubleClick={() => setIsEditing(true)} 
      className={cn("w-full h-full min-h-[32px] flex items-center bg-transparent cursor-pointer px-2 border border-transparent", className)}
    >
      {formatter ? formatter(value) : value}
    </div>
  )
}
