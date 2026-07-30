'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/lib/store/ui.store'
import { 
  LayoutDashboard, Package, FolderTree, Tag, Hash, Image as ImageIcon, CheckSquare, 
  Copy, Download, Fingerprint, Type, Search, FileText, Palette, Box, Sparkles, 
  Clock, File, LayoutTemplate, Globe, HelpCircle, Flag, Mail, Activity, Target, 
  Zap, Settings, PenTool, Database, Shield, BookOpen, Layers, BarChart2
} from 'lucide-react'

type NavItem = { label: string; href: string; icon: any }
type NavSection = { title: string; items: NavItem[] }

const NAVIGATION: Record<string, NavSection[]> = {
  pim: [
    {
      title: 'Catalog',
      items: [
        { label: 'Dashboard', href: '/products', icon: LayoutDashboard },
        { label: 'Products', href: '/products', icon: Package },
        { label: 'Collections', href: '/collections', icon: FolderTree },
        { label: 'Categories', href: '/categories', icon: Tag },
        { label: 'Tags', href: '/tags', icon: Hash },
      ]
    },
    {
      title: 'Data',
      items: [
        { label: 'Metafields', href: '/metafields', icon: Database },
        { label: 'Images', href: '/images', icon: ImageIcon },
      ]
    },
    {
      title: 'Tools',
      items: [
        { label: 'Bulk Actions', href: '/bulk', icon: CheckSquare },
        { label: 'Templates', href: '/templates', icon: Copy },
        { label: 'Import/Export', href: '/import', icon: Download },
      ]
    }
  ],
  brand: [
    {
      title: 'Identity',
      items: [
        { label: 'Brand Brain', href: '/brand', icon: Fingerprint },
        { label: 'Voice & Copy', href: '/brand/voice', icon: Type },
        { label: 'Color Palette', href: '/brand/colors', icon: Palette },
        { label: 'Materials', href: '/brand/materials', icon: Box },
      ]
    },
    {
      title: 'Rules',
      items: [
        { label: 'SEO Rules', href: '/brand/seo-rules', icon: Search },
        { label: 'Naming Rules', href: '/brand/naming', icon: FileText },
        { label: 'Collection Rules', href: '/brand/collections-rules', icon: FolderTree },
      ]
    }
  ],
  ai: [
    {
      title: 'Studio',
      items: [
        { label: 'Product AI', href: '/ai-studio', icon: Sparkles },
        { label: 'Brand AI', href: '/ai-studio/brand', icon: Fingerprint },
        { label: 'Image AI', href: '/ai-studio/images', icon: ImageIcon },
        { label: 'History', href: '/ai-studio/history', icon: Clock },
      ]
    }
  ],
  content: [
    {
      title: 'Pages',
      items: [
        { label: 'Pages', href: '/content', icon: File },
        { label: 'Blogs', href: '/content/blogs', icon: FileText },
        { label: 'Collections Pages', href: '/content/collection-pages', icon: LayoutTemplate },
        { label: 'Landing Pages', href: '/content/landing', icon: Globe },
      ]
    },
    {
      title: 'Resources',
      items: [
        { label: 'Policies', href: '/content/policies', icon: Shield },
        { label: 'FAQ', href: '/content/faq', icon: HelpCircle },
      ]
    },
    {
      title: 'Marketing',
      items: [
        { label: 'Banners', href: '/content/banners', icon: Flag },
        { label: 'Newsletter', href: '/content/newsletter', icon: Mail },
      ]
    }
  ],
  analytics: [
    {
      title: 'Insights',
      items: [
        { label: 'Health Dashboard', href: '/analytics', icon: Activity },
        { label: 'SEO Health', href: '/analytics/seo', icon: Search },
        { label: 'Completeness', href: '/analytics/completeness', icon: Target },
        { label: 'Performance', href: '/analytics/performance', icon: BarChart2 },
      ]
    }
  ],
  assets: [
    {
      title: 'Files',
      items: [
        { label: 'All Assets', href: '/assets', icon: Layers },
        { label: 'Logos', href: '/assets/logos', icon: Fingerprint },
        { label: 'Packaging', href: '/assets/packaging', icon: Box },
        { label: 'Print Files', href: '/assets/print', icon: FileText },
        { label: 'Mockups', href: '/assets/mockups', icon: LayoutTemplate },
      ]
    },
    {
      title: 'Media',
      items: [
        { label: 'Campaigns', href: '/assets/campaigns', icon: Flag },
        { label: 'Videos & UGC', href: '/assets/videos', icon: ImageIcon },
      ]
    }
  ],
  automations: [
    {
      title: 'Engine',
      items: [
        { label: 'Active Rules', href: '/automations', icon: Zap },
        { label: 'Rule Builder', href: '/automations/builder', icon: Settings },
        { label: 'History', href: '/automations/history', icon: Clock },
        { label: 'Templates', href: '/automations/templates', icon: Copy },
      ]
    }
  ],
  library: [
    {
      title: 'Knowledge Base',
      items: [
        { label: 'Overview', href: '/library', icon: BookOpen },
        { label: 'Materials', href: '/library/materials', icon: Box },
        { label: 'Technologies', href: '/library/technologies', icon: PenTool },
        { label: 'Certifications', href: '/library/certifications', icon: Shield },
      ]
    },
    {
      title: 'Design',
      items: [
        { label: 'Colors', href: '/library/colors', icon: Palette },
        { label: 'Typography', href: '/library/typography', icon: Type },
        { label: 'Product Templates', href: '/library/templates', icon: LayoutTemplate },
      ]
    }
  ]
}

export function Sidebar() {
  const pathname = usePathname()
  const sidebarCollapsed = useUIStore(s => s.sidebarCollapsed)

  // Determine active module based on first segment of pathname
  const activeModuleKey = Object.keys(NAVIGATION).find(key => {
    const firstSection = NAVIGATION[key][0]
    const firstItemHref = firstSection?.items[0]?.href
    if (firstItemHref === '/products' && pathname.startsWith('/products')) return true
    if (firstItemHref && pathname.startsWith(firstItemHref.split('/')[1])) return true
    return false
  }) || 'pim'

  const activeNav = NAVIGATION[activeModuleKey] || NAVIGATION.pim

  return (
    <motion.div
      initial={false}
      animate={{ width: sidebarCollapsed ? 0 : 220 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="h-full bg-white border-r border-[#E5E5E5] overflow-y-auto overflow-x-hidden flex flex-col shrink-0"
    >
      <div className="w-[220px] p-3 flex flex-col gap-6">
        {activeNav.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <h3 className="px-2 text-[10px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
              {section.title}
            </h3>
            {section.items.map((item) => {
              const active = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/products' && item.href !== '/brand' && item.href !== '/ai-studio' && item.href !== '/content' && item.href !== '/analytics' && item.href !== '/assets' && item.href !== '/automations' && item.href !== '/library')
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-2 h-8 rounded-md transition-colors text-[13px]",
                    active
                      ? "bg-[#F5F5F5] text-[#0A0A0A] font-medium"
                      : "text-[#404040] hover:bg-[#FAFAFA] hover:text-[#0A0A0A]"
                  )}
                >
                  <Icon className="w-3 h-3 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
