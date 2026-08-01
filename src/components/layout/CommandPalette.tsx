'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { 
  Package, LayoutDashboard, Fingerprint, Sparkles, BarChart2, Zap,
  Plus, Edit2, Search, RefreshCw, Download, Upload, Settings, BookOpen
} from 'lucide-react'
import { useUIStore } from '@/lib/store/ui.store'

export function CommandPalette() {
  const router = useRouter()
  const commandPaletteOpen = useUIStore(s => s.commandPaletteOpen)
  const closeCommandPalette = useUIStore(s => s.closeCommandPalette)
  const openNewProductModal = useUIStore(s => s.openNewProductModal)
  const [open, setOpen] = useState(false)

  // Sync internal state with store
  useEffect(() => {
    setOpen(commandPaletteOpen)
  }, [commandPaletteOpen])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    closeCommandPalette()
    command()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => {
          setOpen(false)
          closeCommandPalette()
        }}
      />
      
      <Command 
        className="relative z-50 w-[560px] max-w-[90vw] overflow-hidden rounded-xl bg-white shadow-2xl border border-[#E5E5E5] flex flex-col"
        label="Command Menu"
      >
        <Command.Input 
          autoFocus
          placeholder="Type a command or search..."
          className="w-full border-b border-[#E5E5E5] bg-transparent px-4 py-4 text-sm outline-none placeholder:text-[#737373] text-[#0A0A0A]"
        />
        
        <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-py-2">
          <Command.Empty className="py-6 text-center text-sm text-[#737373]">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-[#737373]">
            <Command.Item onSelect={() => runCommand(() => router.push('/products'))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <LayoutDashboard className="h-4 w-4" />
              <span>Go to Dashboard</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">G</kbd>
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">D</kbd>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/products'))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Package className="h-4 w-4" />
              <span>Go to Products</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">G</kbd>
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">P</kbd>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/brand'))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Fingerprint className="h-4 w-4" />
              <span>Go to Brand System</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">G</kbd>
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">B</kbd>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/ai-studio'))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Sparkles className="h-4 w-4" />
              <span>Go to AI Studio</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">G</kbd>
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">A</kbd>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/analytics'))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <BarChart2 className="h-4 w-4" />
              <span>Go to Analytics</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">G</kbd>
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">N</kbd>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/automations'))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Zap className="h-4 w-4" />
              <span>Go to Automations</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">G</kbd>
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">Z</kbd>
              </div>
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-[#E5E5E5] my-1" />

          <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-[#737373]">
            <Command.Item onSelect={() => runCommand(() => openNewProductModal())} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Plus className="h-4 w-4" />
              <span>New Product</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">⌘</kbd>
                <kbd className="rounded bg-[#F5F5F5] px-1.5 py-0.5 text-[10px] font-medium text-[#737373]">N</kbd>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => {})} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Edit2 className="h-4 w-4" />
              <span>Bulk Edit Selected</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => {})} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Search className="h-4 w-4" />
              <span>Generate SEO for Selection</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => {})} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <RefreshCw className="h-4 w-4" />
              <span>Sync with Shopify</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => {})} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Download className="h-4 w-4" />
              <span>Export Products</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => {})} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Upload className="h-4 w-4" />
              <span>Import Products</span>
            </Command.Item>
          </Command.Group>
          
          <Command.Separator className="h-px bg-[#E5E5E5] my-1" />
          
          <Command.Group heading="Quick Links" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-[#737373]">
            <Command.Item onSelect={() => runCommand(() => router.push('/settings'))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/brand'))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <BookOpen className="h-4 w-4" />
              <span>Brand DNA</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/automations'))} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2.5 text-sm text-[#404040] aria-selected:bg-[#FAFAFA] aria-selected:text-[#0A0A0A]">
              <Zap className="h-4 w-4" />
              <span>Automations</span>
            </Command.Item>
          </Command.Group>

        </Command.List>
      </Command>
    </div>
  )
}
