"use client"

import React, { useState, useEffect, useTransition } from 'react'
import { 
  Sparkles, Type, AlignLeft, Tags, LayoutList, Scissors, 
  Image as ImageIcon, Search, CheckCircle2, ChevronRight, 
  Play, Loader2, ArrowRight, X, AlertCircle, Palette,
  Send, User, MessageSquare, Check, CornerDownLeft,
  Clock, RotateCcw, ArrowLeft, AlertTriangle
} from 'lucide-react'
import { useUIStore } from '@/lib/store/ui.store'
import { cn } from '@/lib/utils'
import { classifyProduct, type ClassificationResult, COLOR_LIBRARY, constructStandardTitle } from '@/lib/brand/brain'
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

interface ChatMessage {
  id: string
  sender: 'user' | 'ai'
  text: string
  timestamp: Date
  proposal?: {
    actionType: string
    description: string
    diffs: {
      productId: string
      productTitle: string
      field: string
      oldValue: string
      newValue: string
      rawProduct: any
    }[]
  }
  status?: 'pending' | 'applying' | 'applied' | 'cancelled'
}

interface HistoryItem {
  id: string
  actionType: string
  description: string
  timestamp: Date
  status: 'applied' | 'reverted'
  diffs: {
    productId: string
    productTitle: string
    field: string
    oldValue: any
    newValue: any
    rawProduct: any
  }[]
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

  // Chat Console States
  const [sidebarTab, setSidebarTab] = useState<'presets' | 'chat'>('presets')
  
  // Change History States
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'mock_hist_1',
      actionType: 'Optimize Color Names',
      description: 'Optimizar los nombres de colores a su denominación de lujo (Grey -> Slate, Black -> Black) de todo el catálogo. Afecta a 1 producto.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
      status: 'applied',
      diffs: [
        {
          productId: 'prod_1',
          productTitle: 'The Men\'s Hooded Windbreaker',
          field: 'Color',
          oldValue: 'Grey',
          newValue: 'Slate',
          rawProduct: { id: 'prod_1', title: 'The Men\'s Hooded Windbreaker', color: 'Slate' }
        }
      ]
    }
  ])
  const [activeHistoryItem, setActiveHistoryItem] = useState<HistoryItem | null>(null)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: '¡Hola! Soy el asistente de AYA Brand Brain. Puedo ayudarte a realizar cambios masivos y específicos sobre tus productos.\n\nSi seleccionas productos de la lista de productos operaré sobre ellos; de lo contrario, los comandos se evaluarán sobre todo el catálogo.\n\nEscribe comandos en el chat, por ejemplo:\n\n• "Archiva todas las prendas que no tengan color negro"\n• "Cambia el precio de todos los tops a 80€"\n• "Quítale el THE inicial a la mitad de los productos"',
      timestamp: new Date()
    }
  ])
  const [isChatPending, setIsChatPending] = useState(false)

  // Load products from sync API (filter to selected ones if a selection exists, otherwise load all)
  useEffect(() => {
    const loadSelectedProducts = async () => {
      setLoadingProducts(true)
      try {
        const response = await fetch('/api/shopify/sync')
        const data = await response.json()
        if (response.ok && data.success) {
          const selected = productCount > 0
            ? data.products.filter((p: any) => selectedProductIds.has(p.id))
            : data.products
          setProducts(selected)
        }
      } catch (err) {
        console.error('Failed to load products for AI Studio', err)
      } finally {
        setLoadingProducts(false)
      }
    }

    loadSelectedProducts()
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
            const rawColor = p.variants?.[0]?.color || p.color || 'Black'
            
            const matchCol = COLOR_LIBRARY.find(
              c => c.displayName.toLowerCase() === rawColor.toLowerCase() ||
                   c.luxuryName.toLowerCase() === rawColor.toLowerCase()
            )
            const luxuryColorName = matchCol ? matchCol.luxuryName : rawColor

            const reconstructedTitle = constructStandardTitle(brain.naming, luxuryColorName)
            generatedDiffs.push({
              productId: p.id,
              productTitle: p.title,
              field: 'Product Title',
              oldValue: p.title,
              newValue: reconstructedTitle,
              rawProposedProduct: { ...p, title: reconstructedTitle }
            })
          }

          if (actionName === 'Optimize Color Names' || actionName === 'Organize all products') {
            const rawColor = p.variants?.[0]?.color || p.color || 'Black'

            const matchCol = COLOR_LIBRARY.find(
              c => c.displayName.toLowerCase() === rawColor.toLowerCase() ||
                   c.luxuryName.toLowerCase() === rawColor.toLowerCase()
            )
            const luxuryColorName = matchCol ? matchCol.luxuryName : rawColor

            generatedDiffs.push({
              productId: p.id,
              productTitle: p.title,
              field: 'Luxury Color Name',
              oldValue: p.color || 'Basic Color',
              newValue: luxuryColorName,
              rawProposedProduct: { ...p, color: luxuryColorName }
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
          }
          
          // Merge properties
          if (diff.field === 'Product Title') {
            productUpdatesMap[diff.productId].title = diff.newValue
          }
          if (diff.field === 'Tags') {
            productUpdatesMap[diff.productId].tags = diff.newValue.split(', ')
          }
          if (diff.field === 'SEO Title') {
            if (!productUpdatesMap[diff.productId].seo) productUpdatesMap[diff.productId].seo = {}
            productUpdatesMap[diff.productId].seo.title = diff.newValue
          }
          if (diff.field === 'Meta Description') {
            if (!productUpdatesMap[diff.productId].seo) productUpdatesMap[diff.productId].seo = {}
            productUpdatesMap[diff.productId].seo.description = diff.newValue
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

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userText = chatInput.trim()
    const userMsg: ChatMessage = {
      id: Math.random().toString(36).slice(2),
      sender: 'user',
      text: userText,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMsg])
    setChatInput('')
    setIsChatPending(true)

    // Simulate AI thinking and parsing command
    setTimeout(() => {
      const parsed = parseAICommand(userText, products, productCount > 0)
      
      let aiResponseText = ''
      let proposal: ChatMessage['proposal'] = undefined
      let initialStatus: ChatMessage['status'] = undefined

      if (parsed) {
        aiResponseText = `Entendido. He analizado tu comando y he preparado una propuesta de cambios específicos. Por favor revisa los productos afectados a continuación:`
        proposal = {
          actionType: parsed.actionType,
          description: parsed.description,
          diffs: parsed.diffs
        }
        initialStatus = 'pending'
      } else {
        aiResponseText = `Lo siento, no he podido interpretar ese comando. Intenta con indicaciones más específicas como:\n\n• "Archiva todas las prendas que no tengan color negro"\n• "Cambia el precio de todos los tops a 80€"\n• "Quítale el THE inicial a la mitad de los productos"`
      }

      const aiMsg: ChatMessage = {
        id: Math.random().toString(36).slice(2),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date(),
        proposal,
        status: initialStatus
      }

      setChatMessages(prev => [...prev, aiMsg])
      setIsChatPending(false)
    }, 1000)
  }

  const handleApplyChatProposal = async (messageId: string, proposal: any) => {
    setChatMessages(prev => prev.map(m => m.id === messageId ? { ...m, status: 'applying' } : m))

    try {
      const productUpdatesMap: Record<string, any> = {}
      
      proposal.diffs.forEach((diff: any) => {
        if (!productUpdatesMap[diff.productId]) {
          const finalPrice = diff.rawProduct.price !== undefined 
            ? Number(diff.rawProduct.price) 
            : (diff.rawProduct.variants?.[0]?.price ? Number(diff.rawProduct.variants[0].price) : undefined)

          const variantUpdates = diff.rawProduct.variants?.map((v: any) => ({
            id: v.id,
            price: finalPrice
          })) || []

          productUpdatesMap[diff.productId] = {
            id: diff.productId,
            title: diff.rawProduct.title || diff.productTitle || undefined,
            status: diff.rawProduct.status || undefined,
            price: finalPrice,
            tags: diff.rawProduct.tags || undefined,
            variants: variantUpdates.length > 0 ? variantUpdates : undefined
          }
        }
      })

      const updates = Object.values(productUpdatesMap)
      
      for (let i = 0; i < updates.length; i++) {
        const update = updates[i]
        
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 250))
        }
        
        const res = await fetch('/api/shopify/product/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update)
        })

        if (!res.ok) {
          throw new Error('API Sync Error')
        }
      }

      setChatMessages(prev => prev.map(m => m.id === messageId ? { ...m, status: 'applied' } : m))
      
      setProducts(prev => prev.map(p => {
        const matchUpdate = proposal.diffs.find((d: any) => d.productId === p.id)
        if (matchUpdate) {
          return {
            ...p,
            ...matchUpdate.rawProduct
          }
        }
        return p
      }))

      // Add to change history list
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).slice(2),
        actionType: proposal.actionType,
        description: proposal.description,
        timestamp: new Date(),
        status: 'applied',
        diffs: proposal.diffs
      }
      setHistory(prev => [newHistoryItem, ...prev])

      addNotification({
        type: 'success',
        title: 'Comandos Aplicados',
        message: `Se aplicaron los cambios correctamente sobre ${updates.length} productos.`,
        duration: 4000
      })
    } catch (err: any) {
      setChatMessages(prev => prev.map(m => m.id === messageId ? { ...m, status: 'pending' } : m))
      addNotification({
        type: 'error',
        title: 'Error aplicando cambios',
        message: err.message || 'Verifica la conexión del API con Shopify.'
      })
    }
  }

  const handleRevertHistoryItem = async (historyId: string) => {
    const item = history.find(h => h.id === historyId)
    if (!item || item.status === 'reverted') return

    try {
      const productUpdatesMap: Record<string, any> = {}
      
      item.diffs.forEach((diff: any) => {
        if (!productUpdatesMap[diff.productId]) {
          productUpdatesMap[diff.productId] = {
            id: diff.productId,
          }
        }
        
        // Restore field values using the oldValue from history
        if (diff.field === 'Status') {
          productUpdatesMap[diff.productId].status = diff.oldValue
        }
        if (diff.field === 'Price') {
          const val = Number(diff.oldValue.replace(/[€$,]/g, ''))
          productUpdatesMap[diff.productId].price = val
        }
        if (diff.field === 'Product Title') {
          productUpdatesMap[diff.productId].title = diff.oldValue
        }
        if (diff.field === 'Color') {
          productUpdatesMap[diff.productId].color = diff.oldValue
        }
      })

      const updates = Object.values(productUpdatesMap)
      
      for (let i = 0; i < updates.length; i++) {
        const update = updates[i]
        
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 250))
        }
        
        const res = await fetch('/api/shopify/product/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update)
        })

        if (!res.ok) {
          throw new Error('API Sync Error')
        }
      }

      // Update local state products
      setProducts(prev => prev.map(p => {
        const matchUpdate = item.diffs.find((d: any) => d.productId === p.id)
        if (matchUpdate) {
          const updatedProduct = { ...p }
          if (matchUpdate.field === 'Status') updatedProduct.status = matchUpdate.oldValue
          if (matchUpdate.field === 'Price') {
            const val = Number(matchUpdate.oldValue.replace(/[€$,]/g, ''))
            updatedProduct.price = val
          }
          if (matchUpdate.field === 'Product Title') updatedProduct.title = matchUpdate.oldValue
          if (matchUpdate.field === 'Color') updatedProduct.color = matchUpdate.oldValue
          return updatedProduct
        }
        return p
      }))

      // Update history list item
      setHistory(prev => prev.map(h => h.id === historyId ? { ...h, status: 'reverted' } : h))
      
      // Update active history item state if currently selected
      if (activeHistoryItem && activeHistoryItem.id === historyId) {
        setActiveHistoryItem(prev => prev ? { ...prev, status: 'reverted' } : null)
      }

      addNotification({
        type: 'success',
        title: 'Cambios Revertidos',
        message: `Se revirtió la acción "${item.actionType}" con éxito en Shopify.`,
        duration: 5000
      })
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: 'Error al revertir cambios',
        message: err.message || 'Inténtalo de nuevo más tarde.',
        duration: 5000
      })
    }
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="flex-none px-6 py-4 border-b border-purple-950/40 flex items-center justify-between bg-gradient-to-r from-[#0C0A0F] to-[#120D1A] aya-pattern-dark relative overflow-hidden">
        <div>
          <h1 className="text-lg font-semibold text-white flex items-center gap-2.5">
            <span className="font-serif tracking-[0.25em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white select-none">A Y A</span>
            <span className="text-xs font-semibold px-2 py-0.5 bg-purple-950/50 border border-purple-800/40 rounded text-purple-300">Brand Brain AI Studio</span>
          </h1>
          <p className="text-xs text-purple-400/50 mt-0.5">Reduce manual work to zero. The Brand Brain auto-organizes your Shopify catalog.</p>
        </div>
        <div className="px-3 py-1.5 bg-[#120D1A] border border-purple-900/30 rounded-md text-xs font-mono font-medium text-purple-300">
          {productCount > 0 ? (
            `${productCount} product${productCount === 1 ? '' : 's'} selected`
          ) : (
            "Entire catalog (All products)"
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Actions and Chat */}
        <div className="w-[290px] flex-none border-r border-purple-950/40 flex flex-col bg-[#0C0A0F] h-full overflow-hidden">
          {/* Tab Switcher */}
          <div className="p-3 border-b border-purple-950/40 bg-[#0C0A0F] shrink-0">
            <div className="flex bg-purple-950/30 p-0.5 rounded-md gap-0.5 border border-purple-900/20">
              <button 
                onClick={() => setSidebarTab('presets')}
                className={cn(
                  "flex-1 py-1.5 text-center text-xs font-semibold rounded transition-all",
                  sidebarTab === 'presets' 
                    ? "bg-purple-900/50 text-white shadow-xs border border-purple-500/20" 
                    : "text-purple-300/60 hover:text-white"
                )}
              >
                Presets
              </button>
              <button 
                onClick={() => setSidebarTab('chat')}
                className={cn(
                  "flex-1 py-1.5 text-center text-xs font-semibold rounded transition-all flex items-center justify-center gap-1.5",
                  sidebarTab === 'chat' 
                    ? "bg-purple-900/50 text-white shadow-xs border border-purple-500/20" 
                    : "text-purple-300/60 hover:text-white"
                )}
              >
                <MessageSquare className="w-3.5 h-3.5" /> AI Chat
              </button>
            </div>
          </div>

          {/* Active Panel View */}
          {sidebarTab === 'presets' ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="bg-[#120D1A] border border-purple-900/30 rounded-lg p-4 space-y-2 mb-2 shadow-sm aya-pattern-dark">
                <h4 className="text-xs font-semibold text-purple-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Auto Pipeline
                </h4>
                <p className="text-[11px] text-purple-300/70 leading-normal">
                  Semantic analyzer classifies, maps types, categorizes, generates tags, and structures SEO descriptions in one click.
                </p>
                <button 
                  onClick={() => runAIPipeline('Organize all products')}
                  disabled={actionState !== 'idle' || loadingProducts}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium py-1.5 rounded hover:bg-purple-700 transition-colors disabled:opacity-50 border border-purple-500/30 shadow-xs cursor-pointer"
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
                <ActionButton icon={<Palette />} label="Optimize Color Names" time="~1s" onClick={() => runAIPipeline('Optimize Color Names')} disabled={actionState !== 'idle' || loadingProducts} />
              </ActionGroup>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden h-full">
              {/* History Header */}
              <div className="p-3 border-b border-purple-950/40 bg-[#0C0A0F] flex items-center gap-1.5 shrink-0">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Historial de Cambios</span>
              </div>
              
              {/* History List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#FAFAFA]/50 bg-[#0C0A0F]/20">
                {history.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 text-purple-400/40">
                    <Clock className="w-8 h-8 opacity-20 mb-2" />
                    <span className="text-xs">No hay cambios registrados todavía</span>
                  </div>
                ) : (
                  history.map(item => {
                    const isReverted = item.status === 'reverted'
                    const isActive = activeHistoryItem?.id === item.id
                    return (
                      <div 
                        key={item.id}
                        onClick={() => setActiveHistoryItem(item)}
                        className={cn(
                          "p-3 rounded-lg border text-left transition-all cursor-pointer select-none",
                          isActive 
                            ? "bg-[#181125] border-purple-500 shadow-sm" 
                            : "bg-[#120D1A] border-purple-950/30 hover:border-purple-800/40"
                        )}
                      >
                        <div className="flex items-center justify-between gap-1.5 mb-1.5">
                          <span className="font-semibold text-xs text-white truncate max-w-[130px]">{item.actionType}</span>
                          <span className={cn(
                            "text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0",
                            isReverted 
                              ? "bg-purple-950/40 text-purple-400/60 border-purple-950" 
                              : "bg-purple-900/50 text-purple-300 border-purple-500/30"
                          )}>
                            {isReverted ? 'Revertido' : 'Aplicado'}
                          </span>
                        </div>
                        <p className="text-[10px] text-purple-300/60 line-clamp-2 leading-relaxed mb-2">{item.description}</p>
                        <div className="flex justify-between items-center text-[9px] text-purple-400/40 font-mono">
                          <span>{item.diffs.length} prod.</span>
                          <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Results, Chat, or History Detail */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0A0A0A] via-[#12091F] to-[#0A0A0A] animate-gradient-slow aya-pattern-dark aya-pattern-glow flex flex-col h-full z-0">
          {sidebarTab === 'chat' ? (
            activeHistoryItem ? (
              /* History Detail View */
              <div className="flex flex-col h-full bg-transparent overflow-hidden">
                <div className="p-6 border-b border-purple-950/40 flex items-center justify-between bg-[#0C0A0F]/90 backdrop-blur shrink-0">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setActiveHistoryItem(null)}
                      className="p-1.5 hover:bg-purple-950/50 border border-purple-900/30 rounded-md text-purple-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-white">{activeHistoryItem.actionType}</h2>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                          activeHistoryItem.status === 'reverted' 
                            ? "bg-purple-950/40 text-purple-400/60 border-purple-950" 
                            : "bg-purple-900/50 text-purple-300 border-purple-500/30"
                        )}>
                          {activeHistoryItem.status === 'reverted' ? 'Revertido' : 'Aplicado'}
                        </span>
                      </div>
                      <p className="text-xs text-purple-300/60 mt-0.5">Ejecutado el {new Date(activeHistoryItem.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => handleRevertHistoryItem(activeHistoryItem.id)}
                      disabled={activeHistoryItem.status === 'reverted'}
                      className={cn(
                        "px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer",
                        activeHistoryItem.status === 'reverted'
                          ? "bg-purple-950/30 text-purple-500/30 border border-purple-900/20 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      )}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      {activeHistoryItem.status === 'reverted' ? 'Cambios Revertidos' : 'Revertir Cambios'}
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-4xl w-full mx-auto">
                  <div className="p-4 bg-amber-950/35 border border-amber-900/40 rounded-lg text-amber-300 text-xs leading-relaxed flex gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong>Resumen de la operación:</strong> {activeHistoryItem.description}
                      {activeHistoryItem.status === 'reverted' ? (
                        <p className="mt-1 font-semibold text-purple-300">Esta acción ya ha sido revertida. Los valores originales han sido restaurados en Shopify.</p>
                      ) : (
                        <p className="mt-1">Puedes revertir esta acción completa en cualquier momento pulsando el botón superior derecho. Esto restaurará el estado anterior en Shopify.</p>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mt-6 mb-3">Detalle de productos modificados</h3>
                  <div className="space-y-3">
                    {activeHistoryItem.diffs.map((diff, idx) => {
                      const productObj = products.find(p => p.id === diff.productId)
                      return (
                        <DiffCard 
                          key={idx}
                          title={diff.productTitle}
                          field={diff.field}
                          oldValue={diff.oldValue}
                          newValue={diff.newValue}
                          product={productObj}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* AI Chat View */
              <div className="flex flex-col h-full overflow-hidden">
                {/* Chat Title Header */}
                <div className="px-6 py-4 border-b border-purple-950/40 bg-[#0C0A0F]/90 backdrop-blur flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-400 animate-pulse" />
                    <h3 className="text-sm font-semibold text-white">AYA Brand Brain Console</h3>
                  </div>
                  <div className="text-[10px] text-purple-300 bg-purple-950/50 border border-purple-800/30 px-2 py-0.5 rounded font-mono">
                    AI Chat Active
                  </div>
                </div>

                {/* Chat Messages scroll area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-transparent flex flex-col">
                  {chatMessages.map(msg => (
                    <div 
                      key={msg.id}
                      className={cn(
                        "flex flex-col max-w-[70%] rounded-lg p-4 text-[13px] leading-relaxed shadow-md",
                        msg.sender === 'user'
                          ? "bg-purple-900/50 border border-purple-500/20 text-white self-end ml-auto rounded-tr-none"
                          : "bg-[#120D1A]/95 border border-purple-900/30 text-purple-100 self-start mr-auto rounded-tl-none"
                      )}
                    >
                      <div className="flex items-center gap-1.5 font-bold mb-1.5 opacity-75 text-[9px] uppercase tracking-wider">
                        {msg.sender === 'user' ? (
                          <><User className="w-3 h-3 text-purple-300" /> Operador PIM</>
                        ) : (
                          <><Sparkles className="w-3 h-3 text-purple-400 animate-pulse" /> AYA Brand Brain</>
                        )}
                      </div>
                      
                      <p className="whitespace-pre-line text-purple-100">{msg.text}</p>

                      {/* Proposal Block inside Chat Balloon */}
                      {msg.proposal && (
                        <div className="mt-4 p-4 border border-purple-900/30 rounded-md bg-[#0C0A0F]/85 text-purple-100 space-y-3 text-[12px] shadow-sm">
                          <div className="font-bold flex items-center gap-1 text-purple-400">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> {msg.proposal.actionType}
                          </div>
                          <p className="text-purple-300/70 text-[11px] leading-normal">{msg.proposal.description}</p>
                          
                          {/* Mini Diffs Scrollable List */}
                          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                            {msg.proposal.diffs.map((diff: any, idx: number) => (
                              <div key={idx} className="p-2.5 border border-purple-950/50 rounded bg-[#120D1A]/70 text-[11px] space-y-1">
                                <div className="font-semibold text-white truncate">{diff.productTitle}</div>
                                <div className="flex flex-wrap items-center gap-1.5 text-purple-300/60">
                                  <span>{diff.field}:</span>
                                  <span className="line-through text-red-400/80 shrink-0">{diff.oldValue}</span>
                                  <span className="text-purple-400/40 shrink-0">→</span>
                                  <span className="font-bold text-green-400 shrink-0">{diff.newValue}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {msg.status === 'pending' && (
                            <div className="flex gap-2 pt-2">
                              <button 
                                onClick={() => setChatMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'cancelled' } : m))}
                                className="flex-1 py-2 bg-[#120D1A] border border-purple-900/30 text-purple-300 rounded font-medium hover:bg-purple-950 hover:text-white transition-colors text-xs cursor-pointer"
                              >
                                Descartar
                              </button>
                              <button 
                                onClick={() => handleApplyChatProposal(msg.id, msg.proposal)}
                                className="flex-1 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 transition-colors text-xs flex items-center justify-center gap-1.5 border border-purple-500/30 shadow-sm cursor-pointer"
                              >
                                Confirmar
                              </button>
                            </div>
                          )}

                          {msg.status === 'applying' && (
                            <div className="pt-2 py-2 text-center text-purple-300 bg-[#120D1A]/50 border border-purple-900/30 rounded flex items-center justify-center gap-1.5 text-xs">
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" /> Aplicando cambios...
                            </div>
                          )}

                          {msg.status === 'applied' && (
                            <div className="pt-2 py-2 text-center text-green-400 font-bold bg-green-950/20 border border-green-900/30 rounded flex items-center justify-center gap-1.5 text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Cambios aplicados en Shopify
                            </div>
                          )}

                          {msg.status === 'cancelled' && (
                            <div className="pt-2 py-2 text-center text-purple-400/50 bg-[#120D1A]/50 border border-purple-900/30 rounded text-xs">
                              Cambio descartado
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isChatPending && (
                    <div className="bg-[#120D1A]/95 border border-purple-900/30 text-purple-100 self-start mr-auto rounded-lg rounded-tl-none p-4 text-[13px] leading-relaxed max-w-[70%] flex items-center gap-2 shadow-md">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                      <span className="text-purple-300/80 font-medium">Procesando comando masivo...</span>
                    </div>
                  )}
                </div>

                {/* Chat Input Form */}
                <div className="p-4 bg-[#0C0A0F] border-t border-purple-950/40 shrink-0">
                  <form onSubmit={handleSendChatMessage} className="flex gap-2 max-w-4xl mx-auto w-full">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Escribe un comando para realizar cambios en lote (ej. 'cambia el precio de todos los tops a 80€')..."
                      className="flex-1 text-[13px] h-[38px] px-3 border border-purple-900/30 rounded-md focus:outline-none focus:border-purple-500 bg-[#120D1A] text-white placeholder-purple-400/40 shadow-xs transition-colors"
                    />
                    <button 
                      type="submit" 
                      className="w-[38px] h-[38px] flex items-center justify-center bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shrink-0 shadow-sm border border-purple-500/30 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )
          ) : (
            /* Presets View Content (Calculated Diffs) */
            <>
              {loadingProducts ? (
                <div className="h-full flex flex-col items-center justify-center text-purple-300/70 p-8">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-500 mb-2" />
                  <p className="text-xs">Preparing selection...</p>
                </div>
              ) : actionState === 'idle' ? (
                <div className="h-full flex flex-col items-center justify-center text-purple-300/70 p-8 text-center max-w-sm mx-auto">
                  <Sparkles className="w-12 h-12 text-purple-500/30 mb-4" />
                  <h3 className="text-sm font-semibold text-white mb-1">AI Processor Ready</h3>
                  <p className="text-xs">Select an auto action from the left panel. AYA Brand Brain will compute the proposals automatically.</p>
                </div>
              ) : actionState === 'running' ? (
                <div className="h-full flex flex-col items-center justify-center p-8 max-w-lg mx-auto w-full">
                  <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-6" />
                  <h3 className="text-lg font-medium text-white mb-2">Running: {activeAction}</h3>
                  <p className="text-sm text-purple-300/80 mb-8">Processing {products.length} products based on brand DNA...</p>
                  
                  <div className="w-full h-2 bg-purple-950 border border-purple-900/30 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-purple-600 transition-all duration-300 ease-out" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                  <div className="w-full flex justify-between text-xs text-purple-400 font-mono">
                    <span>{Math.round((progress / 100) * products.length)} / {products.length}</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              ) : (
                <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
                  <div className="flex items-center justify-between pb-6 border-b border-purple-950/40">
                    <div>
                      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-purple-400" /> Actions Calculated
                      </h2>
                      <p className="text-xs text-purple-300/60 mt-1">Review the semantic changes proposed by AYA Brand Brain. Apply them directly to Shopify.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={resetAction} className="px-4 py-2 bg-[#120D1A] border border-purple-900/30 text-purple-300 rounded-md text-xs font-medium hover:bg-purple-950 hover:text-white transition-colors cursor-pointer">
                        Discard
                      </button>
                      <button 
                        onClick={handleApplyChanges}
                        disabled={isPending}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md text-xs font-medium hover:bg-purple-700 transition-colors flex items-center gap-1.5 border border-purple-500/30 shadow-sm cursor-pointer"
                      >
                        {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        Apply All Changes
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Diff Views */}
                  <div className="space-y-4">
                    {diffs.map((diff, index) => {
                      const productObj = products.find(p => p.id === diff.productId)
                      return (
                        <DiffCard 
                          key={index}
                          title={diff.productTitle}
                          field={diff.field}
                          oldValue={diff.oldValue}
                          newValue={diff.newValue}
                          product={productObj}
                        />
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ActionGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-[10px] font-bold text-purple-400/80 uppercase tracking-wider px-2">{title}</h3>
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
      className="w-full flex flex-col items-start p-2.5 rounded-lg border border-transparent hover:border-purple-900/30 hover:bg-[#120D1A] transition-all text-left group disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-transparent disabled:cursor-not-allowed cursor-pointer"
    >
      <div className="flex items-center gap-2 text-xs font-medium text-purple-200 mb-1 group-hover:text-white">
        <span className="text-purple-400 group-hover:text-purple-300 [&>svg]:w-3.5 [&>svg]:h-3.5 transition-colors">
          {icon}
        </span>
        {label}
      </div>
      <div className="text-[10px] text-purple-400/50 pl-5 font-mono">
        {time}
      </div>
    </button>
  )
}

function DiffCard({ 
  title, 
  field, 
  oldValue, 
  newValue,
  product 
}: { 
  title: string
  field: string
  oldValue: string
  newValue: string
  product?: any 
}) {
  const imageUrl = product?.images?.[0]?.src || product?.image || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&q=80'
  const productCategory = product?.category || 'Activewear'
  const productSubcategory = product?.subcategory || 'General'
  const productGender = product?.gender ? (product.gender.charAt(0).toUpperCase() + product.gender.slice(1)) : 'Unisex'
  const productColor = product?.color || 'Noir'
  const productPrice = product?.price ? `€${Number(product.price).toFixed(2)}` : '€0.00'
  const productStatus = product?.status || 'active'
  const productCollection = product?.collection || 'Core Collection'

  return (
    <div className="border border-purple-950 bg-[#120D1A]/95 rounded-lg shadow-sm relative group hover:border-purple-800 transition-all duration-200">
      
      {/* Product Summary Hover Tooltip Card */}
      {product && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 invisible group-hover:visible opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 flex items-start gap-4 p-4 bg-[#0C0A0F] border border-purple-900/40 rounded-lg shadow-2xl w-[360px] pointer-events-none aya-pattern-dark z-50">
          {/* Product Image */}
          <div className="w-20 h-24 flex-none border border-purple-950 rounded overflow-hidden bg-[#120D1A]">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info Summary */}
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <span className="text-[9px] text-purple-400 uppercase font-bold block tracking-wider">Product Identity</span>
              <h4 className="text-[13px] font-bold text-white truncate">{product.title}</h4>
              <p className="text-[10px] text-purple-400/70 truncate font-mono">ID: {product.id}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
              <div>
                <span className="text-[9px] text-purple-400/60 uppercase block tracking-wider">Category</span>
                <span className="text-purple-200 font-medium truncate block">{productCategory} / {productSubcategory}</span>
              </div>
              <div>
                <span className="text-[9px] text-purple-400/60 uppercase block tracking-wider">Gender / Color</span>
                <span className="text-purple-200 font-medium truncate block">{productGender} · {productColor}</span>
              </div>
              <div>
                <span className="text-[9px] text-purple-400/60 uppercase block tracking-wider">Price</span>
                <span className="text-white font-bold">{productPrice}</span>
              </div>
              <div>
                <span className="text-[9px] text-purple-400/60 uppercase block tracking-wider">Collection</span>
                <span className="text-purple-200 font-medium truncate block">{productCollection}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-1.5 border-t border-purple-950">
              <span className={`w-1.5 h-1.5 rounded-full ${productStatus === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-[9px] text-purple-400 uppercase font-bold tracking-wider">{productStatus}</span>
            </div>
          </div>
        </div>
      )}

      {/* Existing Card Content */}
      <div className="px-4 py-2.5 border-b border-purple-950 bg-[#0C0A0F]/80 rounded-t-lg flex items-center justify-between text-xs">
        <span className="font-semibold text-white">{title}</span>
        <span className="text-[10px] text-purple-300 bg-purple-950 border border-purple-800/40 font-mono px-2 py-0.5 rounded font-semibold uppercase">{field}</span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-purple-950">
        <div className="p-4 bg-red-950/5 rounded-bl-lg">
          <div className="text-[10px] font-semibold text-red-400 mb-2 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Current</div>
          <div className="text-xs text-purple-300/60 line-through decoration-red-900/50 decoration-1 break-words">{oldValue}</div>
        </div>
        <div className="p-4 bg-green-950/5 rounded-br-lg">
          <div className="text-[10px] font-semibold text-green-400 mb-2 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Brand Brain Proposal</div>
          <div className="text-xs text-white font-medium break-words">{newValue}</div>
        </div>
      </div>
    </div>
  )
}

function parseAICommand(command: string, selectedProducts: any[], isSelectionActive: boolean): { actionType: string; description: string; diffs: any[] } | null {
  const cmd = command.toLowerCase().trim()
  const targetLabel = isSelectionActive ? 'seleccionados' : 'del catálogo'
  
  // 0. Price multipliers, absolute changes or percentage changes (e.g. sube el precio x3, triplica el precio, suma 10€, baja un 20%)
  if (cmd.includes('precio') || cmd.includes('coste') || cmd.includes('sube') || cmd.includes('baja') || cmd.includes('aumenta') || cmd.includes('rebaja') || cmd.includes('incrementa') || cmd.includes('multiplica') || cmd.includes('triplica') || cmd.includes('duplica')) {
    // 0.1 Check for general price multiplier command (e.g. sube el precio... x3, duplica el precio, triplica el precio, 3 veces el precio)
    let factor: number | null = null
    let actionLabel = ''

    const multiplierMatch = cmd.match(/(?:un\s+)?(?:x|por|multiplicar\s+por|multiplica\s+por)\s*(\d+(?:\.\d+)?)/i)
    const timesMatch = cmd.match(/(\d+(?:\.\d+)?)\s*veces/i)

    if (multiplierMatch) {
      factor = parseFloat(multiplierMatch[1])
      actionLabel = `Multiply Prices by ${factor}`
    } else if (timesMatch) {
      factor = parseFloat(timesMatch[1])
      actionLabel = `Multiply Prices by ${factor}`
    } else if (cmd.includes('triplica')) {
      factor = 3
      actionLabel = 'Triple Prices'
    } else if (cmd.includes('duplica')) {
      factor = 2
      actionLabel = 'Double Prices'
    }

    if (factor !== null && !isNaN(factor)) {
      // Check for rounding/approximation to 5 or 0 units
      const roundToFive = (cmd.includes('aproxima') || cmd.includes('redondea') || cmd.includes('acabe') || cmd.includes('termine')) &&
                          (cmd.includes('5') || cmd.includes('0'))

      if (roundToFive) {
        actionLabel += ' & Round to nearest 5 or 0'
      }

      const diffs = selectedProducts.map(p => {
        const currentPrice = Number(p.price)
        let newPrice = currentPrice * factor!
        
        if (roundToFive) {
          newPrice = Math.round(newPrice / 5) * 5
        }

        const updatedVariants = p.variants?.map((v: any) => ({
          ...v,
          price: newPrice
        })) || []

        return {
          productId: p.id,
          productTitle: p.title || p.name,
          field: 'Price',
          oldValue: `€${currentPrice.toFixed(2)}`,
          newValue: `€${newPrice.toFixed(2)}`,
          rawProduct: { ...p, price: newPrice, variants: updatedVariants }
        }
      })

      return {
        actionType: actionLabel,
        description: `Multiplicar el precio de todos los productos ${targetLabel} por ${factor}${roundToFive ? ' y aproximar al entero acabado en 0 o 5 más cercano' : ''}. Afecta a ${selectedProducts.length} productos.`,
        diffs
      }
    }

    // 0.2 Check for percentage (e.g. 10%, 15 %)
    const pctMatch = cmd.match(/(\d+(?:\.\d+)?)\s*%/i)
    // Check for absolute amount (e.g. 10€, 10 euros, 10 eur, 10usd, 10$)
    const absMatch = cmd.match(/(\d+(?:\.\d+)?)\s*(?:€|euros|eur|\$|usd|dólares|dolares)/i)

    const isIncrease = cmd.includes('sube') || cmd.includes('aumenta') || cmd.includes('incrementa') || cmd.includes('mas') || cmd.includes('más') || cmd.includes('+')
    const isDecrease = cmd.includes('baja') || cmd.includes('rebaja') || cmd.includes('descuento') || cmd.includes('menos') || cmd.includes('-')

    if (pctMatch && (isIncrease || isDecrease)) {
      const pct = parseFloat(pctMatch[1])
      const multiplier = isIncrease ? (1 + pct / 100) : (1 - pct / 100)
      const actionLabel = isIncrease ? `Increase Prices by ${pct}%` : `Decrease Prices by ${pct}%`

      const diffs = selectedProducts.map(p => {
        const currentPrice = Number(p.price)
        const newPrice = currentPrice * multiplier
        const updatedVariants = p.variants?.map((v: any) => ({
          ...v,
          price: newPrice
        })) || []

        return {
          productId: p.id,
          productTitle: p.title || p.name,
          field: 'Price',
          oldValue: `€${currentPrice.toFixed(2)}`,
          newValue: `€${newPrice.toFixed(2)}`,
          rawProduct: { ...p, price: newPrice, variants: updatedVariants }
        }
      })

      return {
        actionType: actionLabel,
        description: `${isIncrease ? 'Incrementar' : 'Disminuir'} el precio de todos los productos ${targetLabel} un ${pct}%. Afecta a ${selectedProducts.length} productos.`,
        diffs
      }
    }

    if (absMatch && (isIncrease || isDecrease)) {
      const amount = parseFloat(absMatch[1])
      const change = isIncrease ? amount : -amount
      const actionLabel = isIncrease ? `Add €${amount} to Prices` : `Subtract €${amount} from Prices`

      const diffs = selectedProducts.map(p => {
        const currentPrice = Number(p.price)
        const newPrice = Math.max(0, currentPrice + change)
        const updatedVariants = p.variants?.map((v: any) => ({
          ...v,
          price: newPrice
        })) || []

        return {
          productId: p.id,
          productTitle: p.title || p.name,
          field: 'Price',
          oldValue: `€${currentPrice.toFixed(2)}`,
          newValue: `€${newPrice.toFixed(2)}`,
          rawProduct: { ...p, price: newPrice, variants: updatedVariants }
        }
      })

      return {
        actionType: actionLabel,
        description: `${isIncrease ? 'Sumar' : 'Restar'} €${amount.toFixed(2)} al precio de todos los productos ${targetLabel}. Afecta a ${selectedProducts.length} productos.`,
        diffs
      }
    }
  }

  // 1. Archiva todas las prendas que no tengan color negro / no sean negro
  if (cmd.includes('archiv') && (cmd.includes('no') || cmd.includes('diferente')) && (cmd.includes('negro') || cmd.includes('black') || cmd.includes('noir'))) {
    const matched = selectedProducts.filter(p => {
      const col = (p.color || '').toLowerCase()
      return col !== 'black' && col !== 'noir' && col !== 'negro'
    })
    
    const diffs = matched.map(p => ({
      productId: p.id,
      productTitle: p.title,
      field: 'Status',
      oldValue: p.status,
      newValue: 'archived',
      rawProduct: { ...p, status: 'archived' }
    }))
    
    return {
      actionType: 'Archive Non-Black Products',
      description: `Archivar todos los productos ${targetLabel} que NO sean de color Negro/Noir. Afecta a ${matched.length} de ${selectedProducts.length} productos.`,
      diffs
    }
  }

  // 2. Cambia el precio de todos los tops a 80€
  if ((cmd.includes('precio') || cmd.includes('coste') || cmd.includes('cambia')) && (cmd.includes('top') || cmd.includes('tank') || cmd.includes('bra')) && cmd.includes('80')) {
    const matched = selectedProducts.filter(p => {
      const title = (p.title || '').toLowerCase()
      const category = (p.category || '').toLowerCase()
      return title.includes('top') || title.includes('tank') || title.includes('bra') || category.includes('top') || category.includes('bra')
    })

    const diffs = matched.map(p => ({
      productId: p.id,
      productTitle: p.title,
      field: 'Price',
      oldValue: `€${Number(p.price).toFixed(2)}`,
      newValue: '€80.00',
      rawProduct: { ...p, price: 80 }
    }))

    return {
      actionType: 'Update Tops Price to €80',
      description: `Cambiar el precio de todos los tops, tanks y sports bras ${targetLabel} a 80,00€. Afecta a ${matched.length} de ${selectedProducts.length} productos.`,
      diffs
    }
  }

  // 3.1 Quítale el "THE" a productos activos de color negro
  if (cmd.includes('the') && (cmd.includes('elimina') || cmd.includes('quitar') || cmd.includes('quítale') || cmd.includes('quita') || cmd.includes('remueve') || cmd.includes('borra')) && (cmd.includes('negro') || cmd.includes('black') || cmd.includes('noir'))) {
    let filtered = selectedProducts
    
    // Filter active
    if (cmd.includes('activo') || cmd.includes('active')) {
      filtered = filtered.filter(p => p.status === 'active')
    }

    // Filter by black color variant
    filtered = filtered.filter(p => {
      const c = (p.color || '').toLowerCase()
      const hasBlackVar = p.variants?.some((v: any) => {
        const vc = (v.color || '').toLowerCase()
        return vc === 'black' || vc === 'negro' || vc === 'noir'
      })
      return c === 'black' || c === 'negro' || c === 'noir' || hasBlackVar
    })

    // Filter starting with "the "
    const matched = filtered.filter(p => (p.title || p.name || '').toLowerCase().startsWith('the '))

    const diffs = matched.map(p => {
      const currentTitle = p.title || p.name
      const newTitle = currentTitle.replace(/^(the|THE)\s+/i, '')
      return {
        productId: p.id,
        productTitle: currentTitle,
        field: 'Product Title',
        oldValue: currentTitle,
        newValue: newTitle,
        rawProduct: { ...p, title: newTitle }
      }
    })

    return {
      actionType: 'Remove Leading "The" from Black Products',
      description: `Eliminar el prefijo inicial "The" de todos los productos ${targetLabel} activos de color Negro/Noir. Afecta a ${matched.length} de ${selectedProducts.length} productos.`,
      diffs
    }
  }

  // 3. Quítale el "THE" inicial a la mitad de los productos
  if (cmd.includes('the') && (cmd.includes('inicial') || cmd.includes('principio') || cmd.includes('comienzo') || cmd.includes('quitar') || cmd.includes('quítale')) && (cmd.includes('mitad') || cmd.includes('50%'))) {
    const withThe = selectedProducts.filter(p => (p.title || '').toLowerCase().startsWith('the '))
    const matched = withThe.filter((_, idx) => idx % 2 === 0) // take half

    const diffs = matched.map(p => {
      const newTitle = p.title.replace(/^(the|THE)\s+/i, '')
      return ({
        productId: p.id,
        productTitle: p.title,
        field: 'Product Title',
        oldValue: p.title,
        newValue: newTitle,
        rawProduct: { ...p, title: newTitle }
      })
    })

    return {
      actionType: 'Remove Leading "The" from 50%',
      description: `Quitar el prefijo inicial "The" exactamente al 50% de los productos ${targetLabel} que lo contienen. Afecta a ${matched.length} de ${selectedProducts.length} productos.`,
      diffs
    }
  }

  // 4. Fallback commands
  // Draft all
  if (cmd.includes('borrador') || cmd.includes('draft') || cmd.includes('desactiva')) {
    const diffs = selectedProducts.map(p => ({
      productId: p.id,
      productTitle: p.title,
      field: 'Status',
      oldValue: p.status,
      newValue: 'draft',
      rawProduct: { ...p, status: 'draft' }
    }))
    return {
      actionType: 'Set Status to Draft',
      description: `Cambiar el estado de todos los ${selectedProducts.length} productos ${targetLabel} a Borrador (Draft).`,
      diffs
    }
  }

  // Price discount 20%
  if (cmd.includes('descuento') && cmd.includes('20')) {
    const diffs = selectedProducts.map(p => {
      const newPrice = p.price * 0.8
      return {
        productId: p.id,
        productTitle: p.title,
        field: 'Price',
        oldValue: `€${Number(p.price).toFixed(2)}`,
        newValue: `€${newPrice.toFixed(2)}`,
        rawProduct: { ...p, price: newPrice }
      }
    })
    return {
      actionType: 'Apply 20% Discount',
      description: `Aplicar un descuento del 20% a todos los ${selectedProducts.length} productos ${targetLabel}.`,
      diffs
    }
  }

  return null
}
