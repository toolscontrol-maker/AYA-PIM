'use client'

import { useEffect } from 'react'
import { useUIStore } from '@/lib/store/ui.store'
import { useRouter } from 'next/navigation'

export function useKeyboardShortcuts() {
  const { openCommandPalette, undo, redo } = useUIStore()
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const metaKey = isMac ? e.metaKey : e.ctrlKey

      // ⌘K — Command palette
      if (metaKey && e.key === 'k') {
        e.preventDefault()
        openCommandPalette()
        return
      }

      // ⌘Z — Undo
      if (metaKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
        return
      }

      // ⌘⇧Z — Redo
      if (metaKey && e.shiftKey && e.key === 'z') {
        e.preventDefault()
        redo()
        return
      }

      // ⌘S — Save (prevent browser default)
      if (metaKey && e.key === 's') {
        e.preventDefault()
        // Autosave fires via debounce, this just prevents dialog
        return
      }

      // G + P — Go to Products
      // G + D — Go to Dashboard
      // etc. (vim-style navigation)
      if (document.activeElement?.tagName === 'BODY' || document.activeElement?.tagName === 'MAIN') {
        // These are handled in the command palette
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openCommandPalette, undo, redo, router])
}
