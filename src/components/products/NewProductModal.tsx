'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { X, Sparkles, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react'
import { useUIStore } from '@/lib/store/ui.store'
import {
  ProductIdentityAttributes,
  GENDER_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  RISE_OPTIONS,
  FIT_OPTIONS,
  LENGTH_OPTIONS,
  SUPPORT_OPTIONS,
  COVERAGE_OPTIONS,
  MATERIAL_OPTIONS,
  PERFORMANCE_OPTIONS,
  CONSTRUCTION_OPTIONS,
  COLOR_OPTIONS,
  generateBaseProductName,
  generateFullProductTitle,
  generateHandle,
  generateSEOTitle,
  generateSKUPrefix,
  generateCanonicalURL,
  handleExists
} from '@/lib/productIdentity'

interface NewProductModalProps {
  productsList: Array<{ handle: string; id: string; name: string; category: string; color: string; status: string }>
}

export function NewProductModal({ productsList }: NewProductModalProps) {
  const router = useRouter()
  const isPending = useTransition()[0]
  const [, startTransition] = useTransition()
  
  const isOpen = useUIStore(s => s.newProductModalOpen)
  const close = useUIStore(s => s.closeNewProductModal)
  const addNotification = useUIStore(s => s.addNotification)

  // 1. Initialize State with Structured Attributes
  const [gender, setGender] = useState<'womens' | 'mens' | 'unisex'>('womens')
  const [productType, setProductType] = useState('leggings')
  const [color, setColor] = useState('black')
  const [price, setPrice] = useState('120')
  const [status, setStatus] = useState<'active' | 'draft' | 'archived'>('active')
  const [vendor, setVendor] = useState('AYA Studio')

  // Optional Attributes configurations
  const [riseVal, setRiseVal] = useState('high-rise')
  const [riseDefine, setRiseDefine] = useState(true)

  const [fitVal, setFitVal] = useState('none')
  const [fitDefine, setFitDefine] = useState(false)

  const [lengthVal, setLengthVal] = useState('none')
  const [lengthDefine, setLengthDefine] = useState(false)

  const [supportVal, setSupportVal] = useState('none')
  const [supportDefine, setSupportDefine] = useState(false)

  const [coverageVal, setCoverageVal] = useState('none')
  const [coverageDefine, setCoverageDefine] = useState(false)

  const [materialVal, setMaterialVal] = useState('none')
  const [materialDefine, setMaterialDefine] = useState(false)

  const [performanceVal, setPerformanceVal] = useState('none')
  const [performanceDefine, setPerformanceDefine] = useState(false)

  const [constructionVal, setConstructionVal] = useState('none')
  const [constructionDefine, setConstructionDefine] = useState(false)

  // Validation state
  const [errorMsg, setErrorMsg] = useState('')

  // Build current attributes object
  const getAttributes = (): ProductIdentityAttributes => ({
    gender,
    productType,
    color,
    rise: { value: riseVal, definesIdentity: riseDefine },
    fit: { value: fitVal, definesIdentity: fitDefine },
    length: { value: lengthVal, definesIdentity: lengthDefine },
    support: { value: supportVal, definesIdentity: supportDefine },
    coverage: { value: coverageVal, definesIdentity: coverageDefine },
    material: { value: materialVal, definesIdentity: materialDefine },
    performance: { value: performanceVal, definesIdentity: performanceDefine },
    construction: { value: constructionVal, definesIdentity: constructionDefine }
  })

  const attributes = getAttributes()

  // Generated Outputs
  const baseName = generateBaseProductName(attributes)
  const fullTitle = generateFullProductTitle(attributes)
  const handle = generateHandle(attributes)
  const seoTitle = generateSEOTitle(attributes)
  const skuPrefix = generateSKUPrefix(attributes)
  const canonicalUrl = generateCanonicalURL(handle)

  // Real-time Collision Check
  const collision = handleExists(handle, productsList)

  useEffect(() => {
    if (collision) {
      setErrorMsg(`Collision Detected: Handle "${handle}" is already in use.`)
    } else {
      setErrorMsg('')
    }
  }, [handle, collision])

  if (!isOpen) return null

  const handleCreate = () => {
    if (collision) {
      addNotification({
        type: 'error',
        title: 'Collision Blocked',
        message: 'You cannot create a product with an existing handle.'
      })
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/shopify/product/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            structuredAttributes: attributes,
            vendor,
            status,
            price: Number(price),
            metafields: {
              fabric_weight: '220 gsm',
              origin_country: 'Portugal'
            }
          })
        })

        const result = await response.json()
        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to create product')
        }

        addNotification({
          type: 'success',
          title: 'Product Created',
          message: `Deterministic identity generated: ${result.product.handle}`,
          duration: 4000
        })

        close()
        // Force redirect to details page of new product
        router.push(`/products/${result.product.id}`)
        router.refresh()
      } catch (err: any) {
        addNotification({
          type: 'error',
          title: 'Creation Failed',
          message: err.message || 'Verification failed. Handle collision or Shopify connection error.'
        })
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-5xl bg-white border border-[#E5E5E5] rounded-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
          <div>
            <h2 className="text-base font-semibold text-[#0A0A0A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" /> AYA Product Identity Engine
            </h2>
            <p className="text-[11px] text-[#737373]">Deterministic PIM creation module for enterprise scale.</p>
          </div>
          <button 
            onClick={close}
            className="p-1 hover:bg-[#FAFAFA] rounded-md transition-colors text-[#737373] hover:text-[#0A0A0A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Form: Selectors */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 border-r border-[#E5E5E5]">
            
            {/* Primary Attributes Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373]">Primary Attributes</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#737373] mb-1">Gender</label>
                  <select 
                    value={gender} 
                    onChange={(e: any) => setGender(e.target.value)}
                    className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white cursor-pointer"
                  >
                    {GENDER_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-[11px] font-medium text-[#737373] mb-1">Product Type</label>
                  <select 
                    value={productType} 
                    onChange={(e: any) => setProductType(e.target.value)}
                    className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white cursor-pointer"
                  >
                    {PRODUCT_TYPE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#737373] mb-1">Color</label>
                  <select 
                    value={color} 
                    onChange={(e: any) => setColor(e.target.value)}
                    className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white cursor-pointer"
                  >
                    {COLOR_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Optional Identity Defining Attributes */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373]">Defining Identity Attributes</h3>
                <span className="text-[10px] text-[#A3A3A3] flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> Toggle to include in naming & handle
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Rise */}
                <div className="p-3 border border-[#E5E5E5] rounded-md space-y-2 hover:border-[#D4D4D4] transition-colors">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-[#404040]">Rise</label>
                    <label className="flex items-center gap-1 text-[10px] text-[#737373] cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={riseDefine} 
                        onChange={(e) => setRiseDefine(e.target.checked)} 
                        className="rounded border-[#E5E5E5] text-black focus:ring-black accent-black" 
                      /> Defines Identity
                    </label>
                  </div>
                  <select 
                    value={riseVal} 
                    onChange={(e) => setRiseVal(e.target.value)} 
                    className="w-full h-[32px] px-2 text-[12px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white"
                  >
                    {RISE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Fit */}
                <div className="p-3 border border-[#E5E5E5] rounded-md space-y-2 hover:border-[#D4D4D4] transition-colors">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-[#404040]">Fit</label>
                    <label className="flex items-center gap-1 text-[10px] text-[#737373] cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={fitDefine} 
                        onChange={(e) => setFitDefine(e.target.checked)} 
                        className="rounded border-[#E5E5E5] text-black focus:ring-black accent-black" 
                      /> Defines Identity
                    </label>
                  </div>
                  <select 
                    value={fitVal} 
                    onChange={(e) => setFitVal(e.target.value)} 
                    className="w-full h-[32px] px-2 text-[12px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white"
                  >
                    {FIT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Length */}
                <div className="p-3 border border-[#E5E5E5] rounded-md space-y-2 hover:border-[#D4D4D4] transition-colors">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-[#404040]">Length</label>
                    <label className="flex items-center gap-1 text-[10px] text-[#737373] cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={lengthDefine} 
                        onChange={(e) => setLengthDefine(e.target.checked)} 
                        className="rounded border-[#E5E5E5] text-black focus:ring-black accent-black" 
                      /> Defines Identity
                    </label>
                  </div>
                  <select 
                    value={lengthVal} 
                    onChange={(e) => setLengthVal(e.target.value)} 
                    className="w-full h-[32px] px-2 text-[12px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white"
                  >
                    {LENGTH_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Support */}
                <div className="p-3 border border-[#E5E5E5] rounded-md space-y-2 hover:border-[#D4D4D4] transition-colors">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-[#404040]">Support</label>
                    <label className="flex items-center gap-1 text-[10px] text-[#737373] cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={supportDefine} 
                        onChange={(e) => setSupportDefine(e.target.checked)} 
                        className="rounded border-[#E5E5E5] text-black focus:ring-black accent-black" 
                      /> Defines Identity
                    </label>
                  </div>
                  <select 
                    value={supportVal} 
                    onChange={(e) => setSupportVal(e.target.value)} 
                    className="w-full h-[32px] px-2 text-[12px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white"
                  >
                    {SUPPORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Coverage */}
                <div className="p-3 border border-[#E5E5E5] rounded-md space-y-2 hover:border-[#D4D4D4] transition-colors">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-[#404040]">Coverage</label>
                    <label className="flex items-center gap-1 text-[10px] text-[#737373] cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={coverageDefine} 
                        onChange={(e) => setCoverageDefine(e.target.checked)} 
                        className="rounded border-[#E5E5E5] text-black focus:ring-black accent-black" 
                      /> Defines Identity
                    </label>
                  </div>
                  <select 
                    value={coverageVal} 
                    onChange={(e) => setCoverageVal(e.target.value)} 
                    className="w-full h-[32px] px-2 text-[12px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white"
                  >
                    {COVERAGE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Material */}
                <div className="p-3 border border-[#E5E5E5] rounded-md space-y-2 hover:border-[#D4D4D4] transition-colors">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-[#404040]">Material</label>
                    <label className="flex items-center gap-1 text-[10px] text-[#737373] cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={materialDefine} 
                        onChange={(e) => setMaterialDefine(e.target.checked)} 
                        className="rounded border-[#E5E5E5] text-black focus:ring-black accent-black" 
                      /> Defines Identity
                    </label>
                  </div>
                  <select 
                    value={materialVal} 
                    onChange={(e) => setMaterialVal(e.target.value)} 
                    className="w-full h-[32px] px-2 text-[12px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white"
                  >
                    {MATERIAL_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Performance */}
                <div className="p-3 border border-[#E5E5E5] rounded-md space-y-2 hover:border-[#D4D4D4] transition-colors">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-[#404040]">Performance</label>
                    <label className="flex items-center gap-1 text-[10px] text-[#737373] cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={performanceDefine} 
                        onChange={(e) => setPerformanceDefine(e.target.checked)} 
                        className="rounded border-[#E5E5E5] text-black focus:ring-black accent-black" 
                      /> Defines Identity
                    </label>
                  </div>
                  <select 
                    value={performanceVal} 
                    onChange={(e) => setPerformanceVal(e.target.value)} 
                    className="w-full h-[32px] px-2 text-[12px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white"
                  >
                    {PERFORMANCE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Construction */}
                <div className="p-3 border border-[#E5E5E5] rounded-md space-y-2 hover:border-[#D4D4D4] transition-colors">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-[#404040]">Construction</label>
                    <label className="flex items-center gap-1 text-[10px] text-[#737373] cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={constructionDefine} 
                        onChange={(e) => setConstructionDefine(e.target.checked)} 
                        className="rounded border-[#E5E5E5] text-black focus:ring-black accent-black" 
                      /> Defines Identity
                    </label>
                  </div>
                  <select 
                    value={constructionVal} 
                    onChange={(e) => setConstructionVal(e.target.value)} 
                    className="w-full h-[32px] px-2 text-[12px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white"
                  >
                    {CONSTRUCTION_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Price & Vendor Info */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373]">Inventory & Settings</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#737373] mb-1">Base Price (€)</label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={e => setPrice(e.target.value)}
                    className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#737373] mb-1">Vendor</label>
                  <input 
                    type="text" 
                    value={vendor} 
                    onChange={e => setVendor(e.target.value)}
                    className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#737373] mb-1">Status</label>
                  <select 
                    value={status} 
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel: Live Product Identity Engine Card */}
          <div className="w-[380px] bg-[#FAFAFA] p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> Live Engine Output
              </h3>

              {/* Title Identity Output */}
              <div className="p-4 bg-white border border-[#E5E5E5] rounded-md shadow-xs space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-[#A3A3A3] uppercase block">Base Product Name</span>
                  <span className="text-[14px] font-semibold text-[#0A0A0A]">{baseName || '—'}</span>
                </div>
                <div className="pt-2 border-t border-[#F5F5F5]">
                  <span className="text-[10px] font-bold text-[#A3A3A3] uppercase block">Full Product Title</span>
                  <span className="text-[14px] font-bold text-[#0A0A0A]">{fullTitle || '—'}</span>
                </div>
                <div className="pt-2 border-t border-[#F5F5F5]">
                  <span className="text-[10px] font-bold text-[#A3A3A3] uppercase block">SKU Prefix</span>
                  <span className="text-[12px] font-mono text-[#0A0A0A] bg-[#FAFAFA] px-1 py-0.5 rounded border border-[#E5E5E5] inline-block mt-0.5">
                    {skuPrefix}
                  </span>
                </div>
              </div>

              {/* Canonical SEO Preview (Shopify style) */}
              <div className="p-4 bg-white border border-[#E5E5E5] rounded-md shadow-xs space-y-2.5">
                <span className="text-[10px] font-bold text-[#A3A3A3] uppercase block">Google & Shopify URL Preview</span>
                
                <div className="space-y-1">
                  {/* Google Style Blue Title */}
                  <span className="text-[14px] font-semibold text-[#1a0dab] hover:underline cursor-pointer block leading-snug">
                    {seoTitle}
                  </span>
                  
                  {/* Google Style Green URL */}
                  <span className="text-[11px] text-[#006621] block overflow-hidden text-ellipsis whitespace-nowrap">
                    {canonicalUrl}
                  </span>
                  
                  {/* Meta description mock */}
                  <p className="text-[11px] text-[#545454] leading-relaxed line-clamp-2">
                    Experience comfort and performance with the new {fullTitle}. Crafted with high-quality materials.
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="p-4 bg-white border border-[#E5E5E5] rounded-md shadow-xs flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#737373]">Identidad Determinista</span>
                {errorMsg ? (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-50 border border-red-200 text-red-600 text-[11px] font-medium rounded-full">
                    <AlertTriangle className="w-3.5 h-3.5" /> Collision Error
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[11px] font-medium rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" /> Deterministic OK
                  </span>
                )}
              </div>

              {/* Collision Warning Message */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-[11px] leading-relaxed flex gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cannot create product.</strong> A product in the catalog is already using the handle: <code className="font-mono bg-red-100/50 px-1 py-0.5 rounded">{handle}</code>. Please change the structured attributes or color to ensure uniqueness.
                  </span>
                </div>
              )}
            </div>

            {/* Footer Action buttons */}
            <div className="pt-4 border-t border-[#E5E5E5] flex gap-2">
              <button 
                onClick={close} 
                className="flex-1 h-[36px] text-[13px] border border-[#E5E5E5] rounded hover:bg-white active:bg-[#FAFAFA] text-[#404040] font-medium transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreate}
                disabled={!!errorMsg || isPending}
                className="flex-1 h-[36px] text-[13px] bg-[#0A0A0A] hover:bg-[#262626] text-white font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                {isPending ? 'Generating...' : 'Create Product'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
