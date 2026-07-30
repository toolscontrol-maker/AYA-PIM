'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 font-medium transition-colors select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-1',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          {
            // Variants
            'bg-[#0A0A0A] text-white hover:bg-[#262626] rounded': variant === 'default',
            'bg-[#F5F5F5] text-[#0A0A0A] hover:bg-[#EBEBEB] rounded': variant === 'secondary',
            'text-[#404040] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] rounded': variant === 'ghost',
            'text-red-600 hover:bg-red-50 rounded': variant === 'danger',
            'border border-[#E5E5E5] text-[#404040] hover:bg-[#FAFAFA] rounded': variant === 'outline',
            // Sizes
            'text-[12px] px-2 py-1': size === 'sm',
            'text-[13px] px-3 py-1.5': size === 'md',
            'text-[14px] px-4 py-2': size === 'lg',
            'h-8 w-8 p-0': size === 'icon',
          },
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
