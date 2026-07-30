"use client"

import React, { useState, useEffect } from 'react'
import { Palette, RefreshCw, Layers, CheckCircle2, AlertCircle, Plus, Edit3 } from 'lucide-react'
import { COLOR_LIBRARY, type AYAColor } from '@/lib/brand/brain'
import { useUIStore } from '@/lib/store/ui.store'

interface DetectedColor {
  name: string;
  luxuryMapping: string;
  hex: string;
  variantCount: number;
  productCount: number;
  isMapped: boolean;
}

export default function BrandColorsPage() {
  const [loading, setLoading] = useState(true)
  const [detectedColors, setDetectedColors] = useState<DetectedColor[]>([])
  const [activePalette, setActivePalette] = useState<AYAColor[]>(COLOR_LIBRARY)
  const addNotification = useUIStore(s => s.addNotification)

  const scanCatalogColors = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/shopify/sync')
      const data = await response.json()
      
      if (response.ok && data.success) {
        const products = data.products || []
        const colorCounts: Record<string, { name: string; variants: number; products: Set<string> }> = {}

        // Scan all products and all variants for color options
        products.forEach((p: any) => {
          p.variants?.forEach((v: any) => {
            const colorName = v.color || 'Noir'
            if (!colorCounts[colorName]) {
              colorCounts[colorName] = {
                name: colorName,
                variants: 0,
                products: new Set()
              }
            }
            colorCounts[colorName].variants += 1
            colorCounts[colorName].products.add(p.id)
          })
        })

        // Map detected colors against controlled Brand Brain color library
        const mappedDetected: DetectedColor[] = Object.values(colorCounts).map(c => {
          // Try to find a match in the luxury library (case-insensitive)
          const controlledMatch = activePalette.find(
            ap => ap.displayName.toLowerCase() === c.name.toLowerCase() ||
                  ap.luxuryName.toLowerCase() === c.name.toLowerCase()
          )

          return {
            name: c.name,
            luxuryMapping: controlledMatch ? controlledMatch.luxuryName : 'Unmapped',
            hex: controlledMatch ? controlledMatch.hex : '#D1D5DB', // Gray fallback for unmapped colors
            variantCount: c.variants,
            productCount: c.products.size,
            isMapped: !!controlledMatch
          }
        })

        setDetectedColors(mappedDetected)
      } else {
        throw new Error(data.error || 'Failed to sync product data')
      }
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: 'Color scan failed',
        message: err.message || 'Error fetching variants catalog.',
        duration: 4000
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    scanCatalogColors()
  }, [])

  // Allow manual mapping addition
  const handleMapColor = (colorName: string) => {
    const luxuryName = window.prompt(`Enter AYA luxury name for "${colorName}":`, 'Onyx')
    if (!luxuryName) return

    const hex = window.prompt(`Enter HEX code for AYA ${luxuryName}:`, '#000000')
    if (!hex) return

    // Add to local active palette list
    const newColor: AYAColor = {
      displayName: colorName,
      luxuryName,
      hex,
      slug: luxuryName.toLowerCase()
    }
    
    setActivePalette(prev => [...prev, newColor])
    
    // Update detected colors mapping status
    setDetectedColors(prev => prev.map(c => {
      if (c.name.toLowerCase() === colorName.toLowerCase()) {
        return {
          ...c,
          luxuryMapping: luxuryName,
          hex,
          isMapped: true
        }
      }
      return c
    }))

    addNotification({
      type: 'success',
      title: 'Color Vocabulary Updated',
      message: `Mapped "${colorName}" to AYA "${luxuryName}" successfully.`,
      duration: 3000
    })
  }

  return (
    <div className="flex-1 overflow-auto bg-[#FAFAFA] text-[#0A0A0A] p-8 h-full flex flex-col relative font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-[#E5E5E5] pb-6 bg-white -m-8 p-8 sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Color Vocabulary</h1>
          <p className="text-xs text-[#737373] mt-0.5">Control mappings between raw Shopify variant options and luxury AYA branding.</p>
        </div>
        <button 
          onClick={scanCatalogColors}
          disabled={loading}
          className="p-2 border border-[#E5E5E5] bg-white text-[#404040] rounded-md hover:bg-[#FAFAFA] transition-colors disabled:opacity-50 flex items-center gap-1.5 text-xs font-medium"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Scan Variant Colors
        </button>
      </div>

      <div className="space-y-10 mt-6">
        {/* Active Palette Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737373]">Controlled Luxury Palette ({activePalette.length})</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {activePalette.map((color) => (
              <div 
                key={color.slug} 
                className="bg-white border border-[#E5E5E5] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-black transition-colors"
              >
                <div 
                  className="w-10 h-10 rounded-full border border-gray-300 shadow-inner mb-3" 
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs font-semibold">{color.luxuryName}</span>
                <span className="text-[10px] text-[#737373] mt-0.5">{color.displayName}</span>
                <span className="text-[9px] font-mono text-gray-400 mt-1">{color.hex}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-[#E5E5E5]" />

        {/* Detected Colors Section */}
        <section className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737373] mb-1">Detected Shopify Variant Colors</h3>
            <p className="text-[11px] text-[#737373]">Automatic extraction scanning option values from live Shopify variants.</p>
          </div>

          {loading ? (
            <div className="border border-[#E5E5E5] rounded-lg bg-white p-12 text-center animate-pulse space-y-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto" />
            </div>
          ) : detectedColors.length === 0 ? (
            <div className="border border-[#E5E5E5] rounded-lg bg-white p-12 text-center text-[#737373]">
              <Palette className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-sm">No color option values detected in your Shopify variants.</p>
            </div>
          ) : (
            <div className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-white max-w-4xl shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5] font-mono text-[#737373] uppercase tracking-wider">
                    <th className="p-3.5">Swatch</th>
                    <th className="p-3.5">Shopify Color Option Value</th>
                    <th className="p-3.5">Luxury Vocabulary Mapping</th>
                    <th className="p-3.5">Usage</th>
                    <th className="p-3.5">Mapping Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {detectedColors.map((color) => (
                    <tr key={color.name} className="hover:bg-[#FAFAFA]/50 transition-colors">
                      <td className="p-3.5">
                        <div 
                          className="w-5 h-5 rounded-full border border-gray-300 shadow-inner" 
                          style={{ backgroundColor: color.hex }}
                        />
                      </td>
                      <td className="p-3.5 font-semibold text-sm">{color.name}</td>
                      <td className="p-3.5 font-mono text-purple-600 font-semibold">
                        {color.luxuryMapping}
                      </td>
                      <td className="p-3.5 font-medium text-[#737373]">
                        {color.variantCount} variants ({color.productCount} products)
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          color.isMapped 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {color.isMapped ? "Active Mapping" : "Unmapped Option"}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        {!color.isMapped ? (
                          <button 
                            onClick={() => handleMapColor(color.name)}
                            className="bg-[#0A0A0A] text-white px-3 py-1 rounded text-[11px] font-medium hover:bg-[#404040] transition-colors"
                          >
                            Map to Luxury
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleMapColor(color.name)}
                            className="text-[#737373] hover:text-[#0A0A0A] inline-flex items-center gap-1 font-semibold hover:underline"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
