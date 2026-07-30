'use client'

import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { ModuleSwitcher } from '@/components/layout/ModuleSwitcher'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { BulkActionsBar } from '@/components/bulk/BulkActionsBar'
import { NotificationStack } from '@/components/ui/NotificationStack'
import { useUIStore } from '@/lib/store/ui.store'
import { CommandPalette } from '@/components/layout/CommandPalette'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts()
  const sidebarCollapsed = useUIStore(s => s.sidebarCollapsed)
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <CommandPalette />
      
      {/* Module switcher - horizontal top strip */}
      <ModuleSwitcher />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - changes per module */}
        <Sidebar />
        
        {/* Main area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-auto bg-[#FAFAFA]">
            {children}
          </main>
        </div>
      </div>
      
      <BulkActionsBar />
      <NotificationStack />
    </div>
  )
}
