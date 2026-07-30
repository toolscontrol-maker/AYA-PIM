'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'muted'
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
}

export function Badge({ children, variant = 'default', size = 'md', dot, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded font-medium border',
        {
          'px-2 py-0.5 text-[11px]': size === 'md',
          'px-1.5 py-px text-[10px]': size === 'sm',
          'bg-[#F5F5F5] text-[#404040] border-[#E5E5E5]': variant === 'default',
          'bg-green-50 text-green-700 border-green-200': variant === 'success',
          'bg-yellow-50 text-yellow-700 border-yellow-200': variant === 'warning',
          'bg-red-50 text-red-700 border-red-200': variant === 'error',
          'bg-transparent text-[#737373] border-transparent': variant === 'muted',
        },
        className,
      )}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full shrink-0', {
            'bg-[#A3A3A3]': variant === 'default',
            'bg-green-500': variant === 'success',
            'bg-yellow-500': variant === 'warning',
            'bg-red-500': variant === 'error',
            'bg-[#737373]': variant === 'muted',
          })}
        />
      )}
      {children}
    </span>
  )
}

interface KbdProps {
  children: React.ReactNode
  className?: string
}

export function Kbd({ children, className }: KbdProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded',
        'bg-[#F5F5F5] text-[#737373] border border-[#E5E5E5]',
        className,
      )}
      style={{ boxShadow: '0 1px 0 #D4D4D4' }}
    >
      {children}
    </span>
  )
}

interface SeparatorProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export function Separator({ className, orientation = 'horizontal' }: SeparatorProps) {
  return (
    <div
      className={cn(
        'bg-[#E5E5E5] shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
    />
  )
}

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  return (
    <span
      className={cn(
        'block rounded-full border-2 border-current border-t-transparent animate-spin',
        {
          'h-3 w-3': size === 'sm',
          'h-4 w-4': size === 'md',
          'h-6 w-6': size === 'lg',
        },
        className,
      )}
    />
  )
}

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 px-8 text-center', className)}>
      {icon && <div className="text-[#D4D4D4] mb-1">{icon}</div>}
      <div>
        <p className="text-[14px] font-medium text-[#0A0A0A]">{title}</p>
        {description && <p className="text-[13px] text-[#737373] mt-1">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
