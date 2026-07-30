'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  charCount?: { current: number; max: number }
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, charCount, leftSlot, rightSlot, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-[11px] text-[#737373] font-medium uppercase tracking-wide">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftSlot && (
            <span className="absolute left-2.5 text-[#A3A3A3]">{leftSlot}</span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full h-9 px-3 text-[13px] text-[#0A0A0A] bg-white',
              'border border-[#E5E5E5] rounded transition-colors',
              'placeholder:text-[#A3A3A3]',
              'focus:outline-none focus:border-[#0A0A0A]',
              'disabled:bg-[#FAFAFA] disabled:text-[#A3A3A3] disabled:cursor-not-allowed',
              error && 'border-red-400 focus:border-red-500',
              leftSlot && 'pl-8',
              rightSlot && 'pr-8',
              className,
            )}
            {...props}
          />
          {rightSlot && (
            <span className="absolute right-2.5 text-[#A3A3A3]">{rightSlot}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          {(hint || error) && (
            <p className={cn('text-[11px]', error ? 'text-red-500' : 'text-[#737373]')}>
              {error ?? hint}
            </p>
          )}
          {charCount && (
            <p
              className={cn(
                'text-[11px] tabular-nums ml-auto',
                charCount.current > charCount.max ? 'text-red-500' : 'text-[#A3A3A3]',
              )}
            >
              {charCount.current}/{charCount.max}
            </p>
          )}
        </div>
      </div>
    )
  },
)
Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
  charCount?: { current: number; max: number }
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, charCount, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-[11px] text-[#737373] font-medium uppercase tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full px-3 py-2 text-[13px] text-[#0A0A0A] bg-white',
            'border border-[#E5E5E5] rounded transition-colors resize-none',
            'placeholder:text-[#A3A3A3]',
            'focus:outline-none focus:border-[#0A0A0A]',
            'disabled:bg-[#FAFAFA] disabled:text-[#A3A3A3] disabled:cursor-not-allowed',
            error && 'border-red-400 focus:border-red-500',
            className,
          )}
          {...props}
        />
        <div className="flex items-center justify-between">
          {(hint || error) && (
            <p className={cn('text-[11px]', error ? 'text-red-500' : 'text-[#737373]')}>
              {error ?? hint}
            </p>
          )}
          {charCount && (
            <p
              className={cn(
                'text-[11px] tabular-nums ml-auto',
                charCount.current > charCount.max ? 'text-red-500' : 'text-[#A3A3A3]',
              )}
            >
              {charCount.current}/{charCount.max}
            </p>
          )}
        </div>
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
