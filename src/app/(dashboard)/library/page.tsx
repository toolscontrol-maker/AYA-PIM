"use client"

import React, { useState, useEffect, useTransition } from "react"
import { 
  BookOpen, Scissors, Wind, Droplets, CheckCircle, Copy, 
  Link as LinkIcon, RefreshCw, Palette, Edit3, Loader2, Sparkles 
} from "lucide-react"
import { COLOR_LIBRARY, type AYAColor, classifyProduct } from '@/lib/brand/brain'
import { useUIStore } from '@/lib/store/ui.store'

const tabs = ["Materials", "Technologies", "Certifications", "Colors", "Templates"]

interface VariantColorAudit {
  rawName: string;
  luxuryProposal: string;
  hex: string;
  affectedVariants: Array<{ id: string; size: string; productId: string; productTitle: string }>;
  isMapped: boolean;
}

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("Materials")
  const [loadingColors, setLoadingColors] = useState(false)
  const [auditedColors, setAuditedColors] = useState<VariantColorAudit[]>([])
  const [activePalette, setActivePalette] = useState<AYAColor[]>(COLOR_LIBRARY)
  const [products, setProducts] = useState<any[]>([])
  const [isPending, startTransition] = useTransition()
  const addNotification = useUIStore(s => s.addNotification)

  const scanAllVariantColors = async () => {
    setLoadingColors(true)
    try {
      const response = await fetch('/api/shopify/sync')
      const data = await response.json()
      
      if (response.ok && data.success) {
        const allProducts = data.products || []
        setProducts(allProducts)

        const rawColorGroups: Record<string, typeof auditedColors[0]['affectedVariants']> = {}

        // Scan every product and every variant for raw color values
        allProducts.forEach((p: any) => {
          p.variants?.forEach((v: any) => {
            const rawColor = v.color || 'Noir'
            if (!rawColorGroups[rawColor]) {
              rawColorGroups[rawColor] = []
            }
            rawColorGroups[rawColor].push({
              id: v.id,
              size: v.size || 'M',
              productId: p.id,
              productTitle: p.title
            })
          })
        })

        // Audit the colors and propose improvements
        const auditedList: VariantColorAudit[] = Object.keys(rawColorGroups).map(rawName => {
          // Check if it is already mapped in our luxury library
          const match = activePalette.find(
            ap => ap.displayName.toLowerCase() === rawName.toLowerCase() ||
                  ap.luxuryName.toLowerCase() === rawName.toLowerCase()
          )

          // Generate proposal: try to run classifyProduct or find match
          let luxuryProposal = 'Noir'
          let hex = '#0F0F0F'
          let isMapped = false

          if (match) {
            luxuryProposal = match.luxuryName
            hex = match.hex
            isMapped = true
          } else {
            // Infer proposal semantically
            const clean = rawName.toLowerCase()
            if (clean.includes('black') || clean.includes('onyx')) {
              luxuryProposal = 'Noir'
              hex = '#0F0F0F'
            } else if (clean.includes('grey') || clean.includes('gray')) {
              luxuryProposal = 'Slate'
              hex = '#475569'
            } else if (clean.includes('white') || clean.includes('ivory')) {
              luxuryProposal = 'Ivory'
              hex = '#FDFBF7'
            } else if (clean.includes('green') || clean.includes('matcha') || clean.includes('sage')) {
              luxuryProposal = 'Sage'
              hex = '#A9BA9D'
            } else if (clean.includes('beige') || clean.includes('stone') || clean.includes('sand')) {
              luxuryProposal = 'Stone'
              hex = '#D6CFC7'
            } else if (clean.includes('brown') || clean.includes('clay')) {
              luxuryProposal = 'Clay'
              hex = '#A78B71'
            } else {
              // Custom vocabulary
              luxuryProposal = rawName.charAt(0).toUpperCase() + rawName.slice(1)
              hex = '#CCCCCC'
            }
          }

          return {
            rawName,
            luxuryProposal,
            hex,
            affectedVariants: rawColorGroups[rawName],
            isMapped
          }
        })

        setAuditedColors(auditedList)
      } else {
        throw new Error(data.error || 'Failed to sync catalog products')
      }
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: 'Color Audit Failed',
        message: err.message || 'Error scanning variant options.',
        duration: 4000
      })
    } finally {
      setLoadingColors(false)
    }
  }

  useEffect(() => {
    if (activeTab === "Colors") {
      scanAllVariantColors()
    }
  }, [activeTab])

  // Bulk update variants in Shopify to apply AYA luxury color mapping
  const handleApplyColorRenaming = (auditItem: VariantColorAudit) => {
    if (!window.confirm(`Are you sure you want to rename "${auditItem.rawName}" to AYA "${auditItem.luxuryProposal}" across all ${auditItem.affectedVariants.length} variants in Shopify?`)) {
      return
    }

    startTransition(async () => {
      try {
        let successCount = 0
        const variantsToUpdate = auditItem.affectedVariants

        for (let i = 0; i < variantsToUpdate.length; i++) {
          const v = variantsToUpdate[i]
          
          // Throttled queue: wait 250ms to strictly avoid rate limiting (GraphQL 429)
          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 250))
          }

          const response = await fetch('/api/shopify/product/variant/update-color', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              variantId: v.id,
              size: v.size,
              color: auditItem.luxuryProposal
            })
          })

          if (response.ok) {
            successCount++
          }
        }

        addNotification({
          type: 'success',
          title: 'Color Normalization Complete',
          message: `Successfully renamed color to "${auditItem.luxuryProposal}" for ${successCount} variants in Shopify.`,
          duration: 5000
        })

        // Rescan to reload state
        scanAllVariantColors()
      } catch (err: any) {
        addNotification({
          type: 'error',
          title: 'Normalization Failed',
          message: err.message || 'Error updating variants.',
          duration: 5000
        })
      }
    })
  }

  return (
    <div className="flex-1 overflow-auto bg-[#FAFAFA] text-[#0A0A0A] p-8 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1 flex items-center">
          <BookOpen className="w-6 h-6 mr-3 text-[#404040]" />
          Brand Library
        </h1>
        <p className="text-[#737373] text-sm ml-9">The single source of truth for AYA brand assets and knowledge.</p>
      </div>

      <div className="border-b border-[#E5E5E5] mb-8">
        <nav className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab ? "text-[#0A0A0A]" : "text-[#737373] hover:text-[#404040]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A0A0A] rounded-t-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1">
        {activeTab === "Materials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Second Skin™ Fabric</h3>
                  <p className="text-sm text-[#737373]">78% Polyamide, 22% Elastane</p>
                </div>
                <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Core</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center text-xs bg-[#F3F4F6] px-2 py-1 rounded text-[#404040] font-medium"><Wind className="w-3 h-3 mr-1"/> Breathable</span>
                <span className="inline-flex items-center text-xs bg-[#F3F4F6] px-2 py-1 rounded text-[#404040] font-medium"><Scissors className="w-3 h-3 mr-1"/> 4-Way Stretch</span>
                <span className="inline-flex items-center text-xs bg-[#F3F4F6] px-2 py-1 rounded text-[#404040] font-medium"><Droplets className="w-3 h-3 mr-1"/> Moisture-Wicking</span>
              </div>
              <div className="pt-4 border-t border-[#E5E5E5] flex justify-between items-center text-sm">
                <span className="text-indigo-600 font-medium flex items-center">
                  Used in 34 products <LinkIcon className="w-3 h-3 ml-1" />
                </span>
                <button className="text-[#737373] hover:text-[#0A0A0A]"><Copy className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Eco Recover™</h3>
                  <p className="text-sm text-[#737373]">85% Recycled Polyester, 15% Elastane</p>
                </div>
                <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Sustainable</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center text-xs bg-[#F3F4F6] px-2 py-1 rounded text-[#404040] font-medium">GRS Certified</span>
                <span className="inline-flex items-center text-xs bg-[#F3F4F6] px-2 py-1 rounded text-[#404040] font-medium">Durable</span>
              </div>
              <div className="pt-4 border-t border-[#E5E5E5] flex justify-between items-center text-sm">
                <span className="text-indigo-600 font-medium flex items-center">
                  Used in 12 products <LinkIcon className="w-3 h-3 ml-1" />
                </span>
                <button className="text-[#737373] hover:text-[#0A0A0A]"><Copy className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Colors" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-[#404040] uppercase tracking-wider text-xs">AYA Core Palette</h3>
                <p className="text-xs text-[#737373] mt-0.5">Defining indicators for mapped vocabulary</p>
              </div>
              <button 
                onClick={scanAllVariantColors} 
                disabled={loadingColors}
                className="p-2 border border-[#E5E5E5] bg-white text-[#404040] rounded hover:bg-[#FAFAFA] transition-colors disabled:opacity-50 flex items-center gap-1 text-xs font-medium"
              >
                <RefreshCw className={`w-3 h-3 ${loadingColors ? 'animate-spin' : ''}`} /> Scan Variants
              </button>
            </div>

            {/* Core Swatch Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
              {activePalette.map((color) => (
                <div key={color.slug} className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden group shadow-sm hover:border-[#0A0A0A] transition-colors">
                  <div className="h-20 relative border-b border-[#E5E5E5]" style={{ backgroundColor: color.hex }}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                      <span className="bg-white/95 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm flex items-center"><Copy className="w-3 h-3 mr-1"/> Copy</span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="font-semibold text-xs truncate">{color.luxuryName}</p>
                    <p className="text-[10px] text-[#737373] truncate mt-0.5">{color.displayName}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-[#E5E5E5]" />

            {/* Variants Color Scan Audit & Mapping Suggestions */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#404040] uppercase tracking-wider text-xs">Catalog Variants Color Audit</h3>
                <p className="text-xs text-[#737373] mt-0.5">Scans all variant combinations in Shopify, audits names, and suggests luxury replacements.</p>
              </div>

              {loadingColors ? (
                <div className="border border-[#E5E5E5] bg-white rounded-lg p-12 text-center text-[#737373] animate-pulse">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gray-500" />
                  <p className="text-xs">Analyzing variant colors catalog...</p>
                </div>
              ) : auditedColors.length === 0 ? (
                <div className="border border-[#E5E5E5] bg-white rounded-lg p-12 text-center text-[#737373]">
                  <Palette className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p className="text-xs">No variant colors detected. Click Scan Variants to load Shopify data.</p>
                </div>
              ) : (
                <div className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-white max-w-4xl shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5] font-mono text-[#737373] uppercase tracking-wider">
                        <th className="p-3">Raw Shopify Value</th>
                        <th className="p-3">Swatch</th>
                        <th className="p-3">AYA Proposal</th>
                        <th className="p-3">Impact</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E5]">
                      {auditedColors.map((item) => (
                        <tr key={item.rawName} className="hover:bg-[#FAFAFA]/50 transition-colors">
                          <td className="p-3 font-semibold text-[#0A0A0A]">{item.rawName}</td>
                          <td className="p-3">
                            <div className="w-5 h-5 rounded-full border border-gray-300 shadow-inner" style={{ backgroundColor: item.hex }} />
                          </td>
                          <td className="p-3">
                            <span className="font-mono text-purple-600 font-bold flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-purple-500" /> {item.luxuryProposal}
                            </span>
                          </td>
                          <td className="p-3 font-medium text-[#737373]">
                            {item.affectedVariants.length} variant{item.affectedVariants.length === 1 ? '' : 's'}
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                              item.isMapped 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}>
                              {item.isMapped ? "Active Mapping" : "Improvement Suggestion"}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button 
                              onClick={() => handleApplyColorRenaming(item)}
                              disabled={isPending}
                              className="bg-[#0A0A0A] text-white px-3 py-1 rounded text-[11px] font-medium hover:bg-[#404040] disabled:opacity-50 transition-colors flex items-center gap-1 ml-auto"
                            >
                              {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                              Rename {item.affectedVariants.length} Variants
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "Certifications" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 flex flex-col items-center text-center">
               <div className="w-20 h-20 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full flex items-center justify-center mb-4">
                 <CheckCircle className="w-8 h-8 text-[#16A34A]" />
               </div>
               <h3 className="font-semibold mb-2">OEKO-TEX® Standard 100</h3>
               <p className="text-xs text-[#737373] mb-4">Valid until: Dec 2025</p>
               <span className="text-sm font-medium text-indigo-600">View Certificate</span>
             </div>
          </div>
        )}

        {(activeTab === "Technologies" || activeTab === "Templates") && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen className="w-12 h-12 text-[#E5E5E5] mb-4" />
            <h3 className="text-lg font-medium mb-2">Content coming soon</h3>
            <p className="text-[#737373] text-sm max-w-md">The brand team is still putting together the definitive copy and specifications for this section.</p>
          </div>
        )}
      </div>
    </div>
  )
}
