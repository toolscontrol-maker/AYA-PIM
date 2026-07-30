'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'
import { useUIStore } from '@/lib/store/ui.store'
import { cn } from '@/lib/utils'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const styles = {
  success: 'bg-white border-green-200 text-[#0A0A0A]',
  error: 'bg-white border-red-200 text-[#0A0A0A]',
  info: 'bg-white border-[#E5E5E5] text-[#0A0A0A]',
  warning: 'bg-white border-yellow-200 text-[#0A0A0A]',
}

const iconColors = {
  success: 'text-green-600',
  error: 'text-red-500',
  info: 'text-[#737373]',
  warning: 'text-yellow-600',
}

export function NotificationStack() {
  const { notifications, removeNotification } = useUIStore()

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    notifications.forEach((n) => {
      const duration = n.duration ?? 4000
      if (duration > 0) {
        const t = setTimeout(() => removeNotification(n.id), duration)
        timers.push(t)
      }
    })
    return () => timers.forEach(clearTimeout)
  }, [notifications, removeNotification])

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => {
          const Icon = icons[n.type]
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg border min-w-[280px] max-w-[360px]',
                styles[n.type],
              )}
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <Icon className={cn('h-4 w-4 mt-0.5 shrink-0', iconColors[n.type])} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium">{n.title}</p>
                {n.message && (
                  <p className="text-[12px] text-[#737373] mt-0.5">{n.message}</p>
                )}
              </div>
              <button
                onClick={() => removeNotification(n.id)}
                className="text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
