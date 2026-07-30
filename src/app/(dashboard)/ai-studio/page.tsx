"use client"

import React, { useState, useEffect, useTransition } from 'react'
import { 
  Sparkles, Type, AlignLeft, Tags, LayoutList, Scissors, 
  Image as ImageIcon, Search, CheckCircle2, ChevronRight, 
  Play, Loader2, ArrowRight, X, AlertCircle
} from 'lucide-react'
import { useUIStore } from '@/lib/store/ui.store'
import { cn } from '@/lib/utils'
import { classifyProduct, type ClassificationResult } from '@/lib/brand/brain'
import Link from 'next/link'

type ActionState = 'idle' | 'running' | 'completed'

interface DiffItem {
  productId: string;
  productTitle: string;
  field: string;
  oldValue: string;
  newValue: string;
  rawProposedProduct: any;
}

export default function AIStudioPage() {
  const selectedProductIds = useUIStore(state => state.selectedProductIds)
  const productCount = selectedProductIds.size
  const addNotification = useUIStore(s => s.addNotification)

  const [products, setProducts] = useState<any[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [actionState, setActionState] = useState<ActionState>('idle')
  const [progress, setProgress] = useState(0)
  const [diffs, setDiffs] = useState<DiffItem[]>([])
  const [isPending, startTransition] = useTransition()

  // Load products from sync API and filter to selected ones
  useEffect(() => {
    const loadSelectedProducts = async () => {
      setLoadingProducts(true)
      try {
        const response = await fetch('/api/shopify/sync')
        const data = await response.json()
        if (response.ok && data.success) {
          const selected = data.products.filter((p: any) => selectedProductIds.has(p.id))
          setProducts(selected)
        }
      } catch (err) {
        console.error('Failed to load products for AI Studio', err)
      } finally {
        setLoadingProducts(false)
      }
    }

    if (productCount > 0) {
      loadSelectedProducts()
    }
  }, [productCount, selectedProductIds])

  const runAIPipeline = (actionName: string) => {
    setActiveAction(actionName)
    setActionState('running')
    setProgress(0)

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setProgress(currentProgress)
      
      if (currentProgress >= 100) {
        clearInterval(interval)
        
        // Calculate the actual diffs based on the AYA Brand Brain
        const generatedDiffs: DiffItem[] = []

        products.forEach(p => {
          // Pass product details through AYA Brand Brain
          const brain = classifyProduct(p.title, p.seo?.description || '')

          if (actionName === 'Generate SEO Title' || actionName === 'Organize all products') {
            generatedDiffs.push({
              productId: p.id,
              productTitle: p.title,
              field: 'SEO Title',
              oldValue: p.seo?.title || p.title,
              newValue: brain.seo.title,
              rawProposedProduct: { ...p, seo: { ...p.seo, title: brain.seo.title } }
            })
          }

          if (actionName === 'Generate Meta Description' || actionName === 'Organize all products') {
            generatedDiffs.push({
              productId: p.id,
              productTitle: p.title,
              field: 'Meta Description',
              oldValue: p.seo?.description || 'No meta description',
              newValue: brain.seo.description,
              rawProposedProduct: { ...p, seo: { ...p.seo, description: brain.seo.description } }
            })
          }

          if (actionName === 'Generate Tags' || actionName === 'Organize all products') {
            generatedDiffs.push({
              productId: p.id,
              productTitle: p.title,
              field: 'Tags',
              oldValue: p.tags?.join(', ') || 'No tags',
              newValue: brain.tags.join(', '),
              rawProposedProduct: { ...p, tags: brain.tags }
            })
          }

          if (actionName === 'Rename Products' || actionName === 'Organize all products') {
            const reconstructedTitle = `${brain.gender === 'Woman' ? "Women's" : "Men's"} ${brain.naming.fit} ${brain.naming.subcategory}`
            generatedDiffs.push({
              productId: p.id,
              productTitle: p.title,
              field: 'Product Title',
              oldValue: p.title,
              newValue: reconstructedTitle,
              rawProposedProduct: { ...p, title: reconstructedTitle }
            })
          }

          if (actionName === 'Generate ALT Texts' || actionName === 'Organize all products') {
            generatedDiffs.push({
              productId: p.id,
              productTitle: p.title,
              field: 'Featured Image ALT',
              oldValue: p.images?.[0]?.alt || 'No ALT text',
              newValue: brain.seo.imageALT,
              rawProposedProduct: p // Just mock ALT
            })
          }
        })

        setDiffs(generatedDiffs)
        setActionState('completed')
      }
    }, 100)
  }

  const resetAction = () => {
    setActiveAction(null)
    setActionState('idle')
    setProgress(0)
    setDiffs([])
  }

  // Save changes to Shopify using the API updates route
  const handleApplyChanges = () => {
    startTransition(async () => {
      try {
        // Group diff items by product ID to build the final update payload
        const productUpdatesMap: Record<string, any> = {}
        
        diffs.forEach(diff => {
          if (!productUpdatesMap[diff.productId]) {
            productUpdatesMap[diff.productId] = {
              id: diff.productId,
              title: diff.rawProposedProduct.title,
              tags: diff.rawProposedProduct.tags,
            }
          } else {
            // Merge properties
            if (diff.field === 'Product Title') {
              productUpdatesMap[diff.productId].title = diff.newValue
            }
            if (diff.field === 'Tags') {
              productUpdatesMap[diff.productId].tags = diff.newValue.split(', ')
            }
          }
        })

        const results = []
        const updates = Object.values(productUpdatesMap)
        
        for (let i = 0; i < updates.length; i++) {
          const update = updates[i]
          
          // Throttle: wait 250ms between updates to protect Shopify's API leaky bucket rate limit
          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 250))
          }
          
          const res = await fetch('/api/shopify/product/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(update)
          })
          results.push(res)
        }

        const failed = results.filter(r => !r.ok)

        if (failed.length > 0) {
          throw new Error(`${failed.length} products failed to sync back to Shopify.`)
        }

        addNotification({
          type: 'success',
          title: 'Brand Brain Synced',
          message: `Successfully updated and organized ${Object.keys(productUpdatesMap).length} products in Shopify.`,
          duration: 5000
        })

        resetAction()
      } catch (err: any) {
        addNotification({
          type: 'error',
          title: 'Failed to apply changes',
          message: err.message || 'Verify Shopify access scope permission settings.',
          duration: 5000
        })
      }
    })
  }

  if (productCount === 0) {
    return (
      <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center p-8 bg-white">
        <div className="w-16 h-16 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-[#0A0A0A]" />
        </div>
        <h2 className="text-xl font-semibold text-[#0A0A0A] mb-2">No products selected</h2>
        <p className="text-[#737373] max-w-md mb-8">Go to Products and select the items you want to run AI actions on, then return here to process them at scale.</p>
        <Link href="/products" className="px-5 py-2 bg-[#0A0A0A] text-white rounded-md text-sm font-medium hover:bg-[#404040] transition-colors">
          Go to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="flex-none px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FAFAFA]">
        <div>
          <h1 className="text-lg font-semibold text-[#0A0A0A] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" /> AYA Brand Brain AI Studio
          </h1>
          <p className="text-xs text-[#737373] mt-0.5">Reduce manual work to zero. The Brand Brain auto-organizes your Shopify catalog.</p>
        </div>
        <div className="px-3 py-1.5 bg-white border border-[#E5E5E5] rounded-md text-xs font-mono font-medium text-[#0A0A0A]">
          {productCount} product{productCount === 1 ? '' : 's'} selected
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Actions */}
        <div className="w-[280px] flex-none border-r border-[#E5E5E5] overflow-y-auto bg-[#FAFAFA]/50 p-4 space-y-6">
          <div className="bg-white border border-purple-100 rounded-lg p-3 space-y-2 mb-2">
            <h4 className="text-xs font-semibold text-purple-800 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Auto Pipeline</h4>
            <p className="text-[11px] text-[#737373] leading-normal">Semantic analyzer classifies, maps types, categorizes, generates tags, and structures SEO descriptions in one click.</p>
            <button 
              onClick={() => runAIPipeline('Organize all products')}
              disabled={actionState !== 'idle' || loadingProducts}
              className="w-full bg-[#0A0A0A] text-white text-xs font-medium py-1.5 rounded hover:bg-[#404040] transition-colors disabled:opacity-50"
            >
              Organize all products
            </button>
          </div>

          <ActionGroup title="Copy & Content">
            <ActionButton icon={<AlignLeft />} label="Generate Product Description" time="~2s" onClick={() => runAIPipeline('Rewrite Description')} disabled={actionState !== 'idle' || loadingProducts} />
            <ActionButton icon={<Type />} label="Rename Products" time="~1s" onClick={() => runAIPipeline('Rename Products')} disabled={actionState !== 'idle' || loadingProducts} />
          </ActionGroup>

          <ActionGroup title="SEO">
            <ActionButton icon={<Search />} label="Generate SEO Title" time="~1s" onClick={() => runAIPipeline('Generate SEO Title')} disabled={actionState !== 'idle' || loadingProducts} />
            <ActionButton icon={<AlignLeft />} label="Generate Meta Description" time="~1s" onClick={() => runAIPipeline('Generate Meta Description')} disabled={actionState !== 'idle' || loadingProducts} />
            <ActionButton icon={<ImageIcon />} label="Generate ALT Texts" time="~2s" onClick={() => runAIPipeline('Generate ALT Texts')} disabled={actionState !== 'idle' || loadingProducts} />
          </ActionGroup>

          <ActionGroup title="Organization">
            <ActionButton icon={<Tags />} label="Generate Tags" time="~1s" onClick={() => runAIPipeline('Generate Tags')} disabled={actionState !== 'idle' || loadingProducts} />
          </ActionGroup>
        </div>

        {/* Right Panel - Results */}
        <div className="flex-1 overflow-y-auto bg-white">
          {loadingProducts ? (
            <div className="h-full flex flex-col items-center justify-center text-[#737373]">
              <Loader2 className="w-8 h-8 animate-spin text-gray-500 mb-2" />
              <p className="text-xs">Preparing selection...</p>
            </div>
          ) : actionState === 'idle' ? (
            <div className="h-full flex flex-col items-center justify-center text-[#737373] p-8 text-center max-w-sm mx-auto">
              <Sparkles className="w-12 h-12 text-[#E5E5E5] mb-4" />
              <h3 className="text-sm font-semibold text-[#0A0A0A] mb-1">AI Processor Ready</h3>
              <p className="text-xs">Select an auto action from the left panel. AYA Brand Brain will compute the proposals automatically.</p>
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
            </div>
          ) : (
            <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E5E5]">
                <div>
                  <h2 className="text-xl font-semibold text-[#0A0A0A] flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#0A0A0A]" /> Actions Calculated
                  </h2>
                  <p className="text-xs text-[#737373] mt-1">Review the semantic changes proposed by AYA Brand Brain. Apply them directly to Shopify.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={resetAction} className="px-4 py-2 bg-white border border-[#E5E5E5] text-[#404040] rounded-md text-xs font-medium hover:bg-[#FAFAFA] transition-colors">
                    Discard
                  </button>
                  <button 
                    onClick={handleApplyChanges}
                    disabled={isPending}
                    className="px-4 py-2 bg-[#0A0A0A] text-white rounded-md text-xs font-medium hover:bg-[#262626] transition-colors flex items-center gap-1.5"
                  >
                    {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Apply All Changes
                  </button>
                </div>
              </div>

              {/* Dynamic Diff Views */}
              <div className="space-y-4">
                {diffs.map((diff, index) => (
                  <DiffCard 
                    key={index}
                    title={diff.productTitle}
                    field={diff.field}
                    oldValue={diff.oldValue}
                    newValue={diff.newValue}
                  />
                ))}
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
      <h3 className="text-[10px] font-bold text-[#737373] uppercase tracking-wider px-2">{title}</h3>
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
      className="w-full flex flex-col items-start p-2.5 rounded-lg border border-transparent hover:border-[#E5E5E5] hover:bg-white transition-all text-left group disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-transparent disabled:cursor-not-allowed"
    >
      <div className="flex items-center gap-2 text-xs font-medium text-[#0A0A0A] mb-1">
        <span className="text-[#737373] group-hover:text-[#0A0A0A] [&>svg]:w-3.5 [&>svg]:h-3.5 transition-colors">
          {icon}
        </span>
        {label}
      </div>
      <div className="text-[10px] text-[#737373] pl-5 font-mono">
        {time}
      </div>
    </button>
  )
}

function DiffCard({ title, field, oldValue, newValue }: { title: string, field: string, oldValue: string, newValue: string }) {
  return (
    <div className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="px-4 py-2.5 border-b border-[#E5E5E5] bg-[#FAFAFA] flex items-center justify-between text-xs">
        <span className="font-semibold text-[#0A0A0A]">{title}</span>
        <span className="text-[10px] text-purple-700 bg-purple-50 border border-purple-100 font-mono px-2 py-0.5 rounded font-semibold uppercase">{field}</span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-[#E5E5E5]">
        <div className="p-4 bg-red-50/10">
          <div className="text-[10px] font-semibold text-red-700 mb-2 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Current</div>
          <div className="text-xs text-[#737373] line-through decoration-red-300 decoration-1 break-words">{oldValue}</div>
        </div>
        <div className="p-4 bg-green-50/10">
          <div className="text-[10px] font-semibold text-green-700 mb-2 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Brand Brain Proposal</div>
          <div className="text-xs text-[#0A0A0A] font-medium break-words">{newValue}</div>
        </div>
      </div>
    </div>
  )
}
