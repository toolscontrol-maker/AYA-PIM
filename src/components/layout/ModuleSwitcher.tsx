'use client'

import { Package, Fingerprint, Sparkles, FileText, BarChart2, Layers, Zap, BookOpen, Bell, Menu } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useUIStore } from '@/lib/store/ui.store'

const MODULES = [
  { id: 'pim', label: 'PIM', icon: Package, href: '/products', description: 'Product Information', basePaths: ['/products', '/collections', '/categories', '/tags', '/metafields', '/images', '/bulk', '/templates', '/import'] },
  { id: 'brand', label: 'Brand Brain', icon: Fingerprint, href: '/brand', description: 'Brand DNA & Rules', basePaths: ['/brand'] },
  { id: 'ai', label: 'AI Studio', icon: Sparkles, href: '/ai-studio', description: 'AI Production Engine', basePaths: ['/ai-studio'] },
  { id: 'content', label: 'Content Studio', icon: FileText, href: '/content', description: 'Pages & Blogs', basePaths: ['/content'] },
  { id: 'analytics', label: 'Analytics', icon: BarChart2, href: '/analytics', description: 'Catalog Health', basePaths: ['/analytics'] },
  { id: 'assets', label: 'Assets', icon: Layers, href: '/assets', description: 'Brand Files', basePaths: ['/assets'] },
  { id: 'automations', label: 'Automations', icon: Zap, href: '/automations', description: 'Rules & Triggers', basePaths: ['/automations'] },
  { id: 'library', label: 'Brand Library', icon: BookOpen, href: '/library', description: 'Knowledge Graph', basePaths: ['/library'] },
]

export function ModuleSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const toggleSidebar = useUIStore(s => s.toggleSidebar)

  const isActive = (module: typeof MODULES[0]) => {
    return module.basePaths.some(path => pathname.startsWith(path))
  }

  return (
    <div className="flex items-center h-[44px] border-b border-[#E5E5E5] bg-white px-4 shrink-0 justify-between md:justify-start aya-pattern">
      <div className="flex items-center md:w-[204px] shrink-0 pr-4 gap-2">
        <button 
          onClick={toggleSidebar} 
          className="md:hidden p-1 hover:bg-[#FAFAFA] rounded text-[#404040]"
        >
          <Menu className="w-4 h-4" />
        </button>
        <span className="font-serif tracking-[0.25em] text-sm font-bold text-[#0A0A0A] select-none">A Y A</span>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" title="Synced" />
      </div>

      <div className="flex items-center flex-1 overflow-x-auto no-scrollbar gap-2">
        {MODULES.map((module) => {
          const active = isActive(module)
          const Icon = module.icon
          return (
            <Link
              key={module.id}
              href={module.href}
              className={cn(
                "flex items-center gap-1.5 px-3 h-[44px] border-b-2 transition-colors whitespace-nowrap",
                active 
                  ? "border-[#0A0A0A] text-[#0A0A0A]" 
                  : "border-transparent text-[#737373] hover:text-[#404040]"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[13px] font-medium">{module.label}</span>
            </Link>
          )
        })}
      </div>

      <div className="flex items-center gap-4 shrink-0 pl-4 border-l border-[#E5E5E5]">
        <div className="flex items-center justify-center w-8 h-8 relative cursor-pointer text-[#404040] hover:text-[#0A0A0A] transition-colors">
          <Bell className="w-4 h-4" />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </div>
        <div className="w-6 h-6 rounded bg-[#E5E5E5] flex items-center justify-center text-[10px] font-medium cursor-pointer text-[#0A0A0A]">
          AC
        </div>
      </div>
    </div>
  )
}
