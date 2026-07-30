"use client"

import React, { useState } from 'react'
import { Sparkles, Type, AlignLeft, Tags, LayoutList, Scissors, Image as ImageIcon, Search, CheckCircle2, ChevronRight, Play, Loader2, ArrowRight } from 'lucide-react'
import { useUIStore } from '@/lib/store/ui.store'
import { cn } from '@/lib/utils'

type ActionState = 'idle' | 'running' | 'completed'

export default function AIStudioPage() {
  const selectedProductIds = useUIStore(state => state.selectedProductIds)
  const productCount = selectedProductIds.size

  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [actionState, setActionState] = useState<ActionState>('idle')
  const [progress, setProgress] = useState(0)
  
  const startAction = (actionName: string) => {
    setActiveAction(actionName)
    setActionState('running')
    setProgress(0)
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setActionState('completed')
          return 100
        }
        return p + 5
      })
    }, 100)
  }

  const resetAction = () => {
    setActiveAction(null)
    setActionState('idle')
    setProgress(0)
  }

  if (productCount === 0) {
    return (
      <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-[#0A0A0A]" />
        </div>
        <h2 className="text-xl font-semibold text-[#0A0A0A] mb-2">No products selected</h2>
        <p className="text-[#737373] max-w-md mb-8">Go to Products and select the items you want to run AI actions on, then return here to process them at scale.</p>
        <a href="/products" className="px-4 py-2 bg-[#0A0A0A] text-white rounded-md text-sm font-medium hover:bg-[#404040] transition-colors">
          Go to Products
        </a>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-none px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-white">
        <div>
          <h1 className="text-lg font-semibold text-[#0A0A0A] flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> AI Studio
          </h1>
          <p className="text-sm text-[#737373] mt-1">Select products in PIM, then run AI actions at scale.</p>
        </div>
        <div className="px-3 py-1.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-md text-sm font-medium text-[#0A0A0A]">
          {productCount} product{productCount === 1 ? '' : 's'} selected
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Actions */}
        <div className="w-[280px] flex-none border-r border-[#E5E5E5] overflow-y-auto bg-[#FAFAFA]/50 p-4 space-y-6">
          <ActionGroup title="Copy & Content">
            <ActionButton icon={<AlignLeft />} label="Generate Product Description" time="~2s per product" onClick={() => startAction('Generate Product Description')} disabled={actionState !== 'idle'} />
            <ActionButton icon={<Type />} label="Generate Product Story" time="~3s per product" onClick={() => startAction('Generate Product Story')} disabled={actionState !== 'idle'} />
            <ActionButton icon={<Scissors />} label="Generate Care Guide" time="~1s per product" onClick={() => startAction('Generate Care Guide')} disabled={actionState !== 'idle'} />
            <ActionButton icon={<LayoutList />} label="Generate Technical Specs" time="~2s per product" onClick={() => startAction('Generate Technical Specs')} disabled={actionState !== 'idle'} />
            <ActionButton icon={<Search />} label="Generate FAQ (5 Q&A)" time="~4s per product" onClick={() => startAction('Generate FAQ')} disabled={actionState !== 'idle'} />
            <ActionButton icon={<Type />} label="Rewrite Description (More Premium)" time="~2s per product" onClick={() => startAction('Rewrite Description')} disabled={actionState !== 'idle'} />
          </ActionGroup>

          <ActionGroup title="SEO">
            <ActionButton icon={<Search />} label="Generate SEO Title" time="~1s per product" onClick={() => startAction('Generate SEO Title')} disabled={actionState !== 'idle'} />
            <ActionButton icon={<AlignLeft />} label="Generate Meta Description" time="~1s per product" onClick={() => startAction('Generate Meta Description')} disabled={actionState !== 'idle'} />
            <ActionButton icon={<ChevronRight />} label="Generate URL Handle" time="~1s per product" onClick={() => startAction('Generate URL Handle')} disabled={actionState !== 'idle'} />
            <ActionButton icon={<ImageIcon />} label="Generate ALT Texts" time="~3s per product" onClick={() => startAction('Generate ALT Texts')} disabled={actionState !== 'idle'} />
          </ActionGroup>

          <ActionGroup title="Organization">
            <ActionButton icon={<Tags />} label="Generate Tags" time="~1s per product" onClick={() => startAction('Generate Tags')} disabled={actionState !== 'idle'} />
            <ActionButton icon={<Type />} label="Rename Products (by rules)" time="~1s per product" onClick={() => startAction('Rename Products')} disabled={actionState !== 'idle'} />
            <ActionButton icon={<LayoutList />} label="Assign Collections" time="~2s per product" onClick={() => startAction('Assign Collections')} disabled={actionState !== 'idle'} />
          </ActionGroup>
        </div>

        {/* Right Panel - Results */}
        <div className="flex-1 overflow-y-auto bg-white">
          {actionState === 'idle' ? (
            <div className="h-full flex flex-col items-center justify-center text-[#737373]">
              <Sparkles className="w-12 h-12 text-[#E5E5E5] mb-4" />
              <p className="text-sm">Select an AI action from the left panel to begin.</p>
            </div>
          ) : actionState === 'running' ? (
            <div className="h-full flex flex-col items-center justify-center p-8 max-w-lg mx-auto w-full">
              <Loader2 className="w-8 h-8 text-[#0A0A0A] animate-spin mb-6" />
              <h3 className="text-lg font-medium text-[#0A0A0A] mb-2">Running: {activeAction}</h3>
              <p className="text-sm text-[#737373] mb-8">Processing {productCount} products based on brand DNA...</p>
              
              <div className="w-full h-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-[#0A0A0A] transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <div className="w-full flex justify-between text-xs text-[#737373] font-mono">
                <span>{Math.round((progress / 100) * productCount)} / {productCount}</span>
                <span>{progress}%</span>
              </div>

              <div className="mt-8 w-full border border-[#E5E5E5] rounded-md text-sm p-4 h-48 overflow-y-auto font-mono text-[#737373] bg-[#FAFAFA]">
                <div className="text-[#0A0A0A] flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4" /> Loaded AYA brand DNA</div>
                <div className="text-[#0A0A0A] flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4" /> Applied naming rules</div>
                <div className="animate-pulse">Processing product {Math.max(1, Math.round((progress / 100) * productCount))}...</div>
              </div>
            </div>
          ) : (
            <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E5E5]">
                <div>
                  <h2 className="text-xl font-semibold text-[#0A0A0A] flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#0A0A0A]" /> Action Complete
                  </h2>
                  <p className="text-sm text-[#737373] mt-1">Review the AI-generated changes for {productCount} products.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={resetAction} className="px-4 py-2 bg-white border border-[#E5E5E5] text-[#404040] rounded-md text-sm font-medium hover:bg-[#FAFAFA] transition-colors">
                    Discard
                  </button>
                  <button onClick={resetAction} className="px-4 py-2 bg-white border border-[#E5E5E5] text-[#0A0A0A] rounded-md text-sm font-medium hover:bg-[#FAFAFA] transition-colors flex items-center gap-2">
                    Review Each <ChevronRight className="w-4 h-4" />
                  </button>
                  <button onClick={resetAction} className="px-4 py-2 bg-[#0A0A0A] text-white rounded-md text-sm font-medium hover:bg-[#404040] transition-colors">
                    Apply All Changes
                  </button>
                </div>
              </div>

              {/* Mock Diff Views */}
              <div className="space-y-6">
                <DiffCard 
                  title="Women's Essential Top (Mock)"
                  field="Description"
                  oldValue="A good top for working out. Made of soft material that is comfortable. Fits well."
                  newValue="Engineered for your most demanding studio sessions, the Women's Flow Top combines premium technical fabric with an editorial silhouette. Crafted from our signature breathable blend, it offers refined comfort that transitions effortlessly from practice to street."
                />
                {productCount > 1 && (
                  <DiffCard 
                    title="Studio Legging (Mock)"
                    field="Description"
                    oldValue="These leggings are amazing. They are the best for yoga and running."
                    newValue="Designed to support your practice, the Women's Studio Legging features a premium, compressive fit. Engineered with moisture-wicking technology, this refined piece offers unmatched comfort and an elegant aesthetic for any luxury activewear wardrobe."
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ActionGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-[#404040] uppercase tracking-wider px-2">{title}</h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  )
}

function ActionButton({ icon, label, time, onClick, disabled }: { icon: React.ReactNode, label: string, time: string, onClick: () => void, disabled?: boolean }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="w-full flex flex-col items-start p-3 rounded-lg border border-transparent hover:border-[#E5E5E5] hover:bg-white transition-all text-left group disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-transparent disabled:cursor-not-allowed"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-[#0A0A0A] mb-1">
        <span className="text-[#737373] group-hover:text-[#0A0A0A] [&>svg]:w-4 [&>svg]:h-4 transition-colors">
          {icon}
        </span>
        {label}
      </div>
      <div className="text-[11px] text-[#737373] pl-6 font-mono">
        {time}
      </div>
    </button>
  )
}

function DiffCard({ title, field, oldValue, newValue }: { title: string, field: string, oldValue: string, newValue: string }) {
  return (
    <div className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-white">
      <div className="px-4 py-3 border-b border-[#E5E5E5] bg-[#FAFAFA] flex items-center justify-between">
        <span className="text-sm font-medium text-[#0A0A0A]">{title}</span>
        <span className="text-xs text-[#737373] bg-[#E5E5E5]/50 px-2 py-0.5 rounded uppercase">{field}</span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-[#E5E5E5]">
        <div className="p-4 bg-red-50/20">
          <div className="text-xs font-medium text-red-800 mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /> Current</div>
          <div className="text-sm text-[#404040] line-through decoration-red-300 decoration-2">{oldValue}</div>
        </div>
        <div className="p-4 bg-green-50/20">
          <div className="text-xs font-medium text-green-800 mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> AI Proposal</div>
          <div className="text-sm text-[#0A0A0A]">{newValue}</div>
        </div>
      </div>
    </div>
  )
}
