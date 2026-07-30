"use client"

import React, { useState, useTransition, useRef } from 'react'
import { 
  ArrowLeft, ImagePlus, Sparkles, ZoomIn, Eraser, 
  CheckCircle2, LayoutGrid, RefreshCw
} from 'lucide-react'
import { SEOPreview } from './SEOPreview'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui.store'
import { type Product } from '@/lib/mock/products'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { classifyProduct } from '@/lib/brand/brain'

export function ProductEditor({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState('general')
  const [images, setImages] = useState(product?.images || [])
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  
  // State for products and variants to make it fully reactive
  const [price, setPrice] = useState(product?.price || 0)
  const [compareAtPrice, setCompareAtPrice] = useState(product?.compareAtPrice || 0)
  const [variants, setVariants] = useState(product?.variants || [])
  const [seoTitle, setSeoTitle] = useState(product?.seo?.title || `${product?.title || ''} | AYA Activewear`)
  const [seoDesc, setSeoDesc] = useState(product?.seo?.description || "Discover our latest activewear collection. Designed for movement, crafted for comfort. Free shipping on orders over €100.")
  
  const [isPending, startTransition] = useTransition()
  const addNotification = useUIStore(s => s.addNotification)
  const router = useRouter()

  const [editingSize, setEditingSize] = useState(false)
  const [editingColor, setEditingColor] = useState(false)
  const [sizeInput, setSizeInput] = useState('')
  const [colorInput, setColorInput] = useState('')

  const uniqueSizes = Array.from(new Set(variants.map(v => v.size || 'M').filter(Boolean)))
  const uniqueColors = Array.from(new Set(variants.map(v => v.color || 'Noir').filter(Boolean)))

  const startEditingSizes = () => {
    setSizeInput(uniqueSizes.join(', '))
    setEditingSize(true)
  }

  const startEditingColors = () => {
    setColorInput(uniqueColors.join(', '))
    setEditingColor(true)
  }

  const handleSaveSizes = () => {
    setEditingSize(false)
    const newSizes = sizeInput.split(',').map(s => s.trim()).filter(Boolean)
    if (newSizes.length === 0) return

    setVariants(prev => prev.map(v => {
      const oldSizeIndex = uniqueSizes.indexOf(v.size)
      const updatedSize = newSizes[oldSizeIndex] || newSizes[newSizes.length - 1] || v.size
      return {
        ...v,
        size: updatedSize,
        title: v.title.includes(' / ') ? `${v.title.split(' / ')[0]} / ${updatedSize}` : updatedSize
      }
    }))
  }

  const handleSaveColors = () => {
    setEditingColor(false)
    const newColors = colorInput.split(',').map(c => c.trim()).filter(Boolean)
    if (newColors.length === 0) return

    setVariants(prev => prev.map(v => {
      const oldColorIndex = uniqueColors.indexOf(v.color)
      const updatedColor = newColors[oldColorIndex] || newColors[newColors.length - 1] || v.color
      return {
        ...v,
        color: updatedColor,
        title: v.title.includes(' / ') ? `${updatedColor} / ${v.title.split(' / ')[1]}` : updatedColor
      }
    }))
  }

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'seo', label: 'SEO' },
    { id: 'shopify', label: 'Shopify' },
    { id: 'options', label: 'Options' }
  ]

  // Form refs
  const titleRef = useRef<HTMLInputElement>(null)
  const vendorRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLSelectElement>(null)
  const categoryRef = useRef<HTMLInputElement>(null)
  const skuRef = useRef<HTMLInputElement>(null)
  const barcodeRef = useRef<HTMLInputElement>(null)
  const inventoryRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const activeImage = images[activeImageIdx]

  // Handle main price change (syncs to variants)
  const handleMainPriceChange = (val: number) => {
    setPrice(val)
    setVariants(prev => prev.map(v => ({ ...v, price: val })))
  }

  // Handle individual variant changes
  const handleVariantChange = (variantId: string, field: string, value: any) => {
    setVariants(prev => prev.map(v => v.id === variantId ? { ...v, [field]: value } : v))
  }

  // Handle adding new image from file explorer
  const handleAddImage = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    for (const file of files) {
      await uploadImageFile(file)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const uploadImageFile = async (file: File) => {
    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('productId', product.id)

        const response = await fetch('/api/shopify/product/image/upload', {
          method: 'POST',
          body: formData
        })

        const result = await response.json()
        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to upload image')
        }

        const newImage = {
          id: result.media?.[0]?.id || `img_${Date.now()}`,
          src: result.imageUrl,
          alt: file.name.split('.')[0] || product.title,
          position: images.length + 1,
          width: 800,
          height: 1000
        }

        setImages(prev => [...prev, newImage])
        setActiveImageIdx(images.length)

        addNotification({
          type: 'success',
          title: 'Image uploaded successfully',
          message: `Attached ${file.name} to Shopify product.`,
          duration: 3000
        })
      } catch (err: any) {
         addNotification({
           type: 'error',
           title: 'Upload failed',
           message: err.message || `Error uploading ${file.name}.`,
           duration: 5000
         })
      }
    })
  }

  // Handle reordering product images
  const handleMoveImage = async (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index === 0) return
    if (direction === 'right' && index === images.length - 1) return

    const targetIndex = direction === 'left' ? index - 1 : index + 1
    const updatedImages = [...images]
    const temp = updatedImages[index]
    updatedImages[index] = updatedImages[targetIndex]
    updatedImages[targetIndex] = temp

    const reordered = updatedImages.map((img, idx) => ({
      ...img,
      position: idx + 1
    }))

    setImages(reordered)
    setActiveImageIdx(targetIndex)

    try {
      const moves = reordered.map((img, idx) => ({
        id: img.id,
        newPosition: idx + 1
      }))

      await fetch('/api/shopify/product/image/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, moves })
      })
    } catch (err) {
      console.error('Failed to sync reorder in Shopify', err)
    }
  }

  // Handle deleting image
  const handleDeleteImage = async (mediaId: string) => {
    if (!window.confirm("Are you sure you want to delete this image? This action cannot be undone.")) return

    startTransition(async () => {
      try {
        const response = await fetch('/api/shopify/product/image/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id, mediaId })
        })

        const result = await response.json()
        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to delete image')
        }

        const updatedImages = images.filter(img => img.id !== mediaId).map((img, idx) => ({
          ...img,
          position: idx + 1
        }))

        setImages(updatedImages)
        setActiveImageIdx(0)

        addNotification({
          type: 'success',
          title: 'Image deleted',
          message: 'Successfully removed image from product gallery.',
          duration: 3000
        })
      } catch (err: any) {
        addNotification({
          type: 'error',
          title: 'Delete failed',
          message: err.message || 'Error deleting the image.',
          duration: 5000
        })
      }
    })
  }

  // Handle SEO auto generation from Brand Brain
  const handleGenerateTitle = (e: React.MouseEvent) => {
    e.preventDefault()
    const brain = classifyProduct(product.title, product.seo?.description || '')
    setSeoTitle(brain.seo.title)
    addNotification({
      type: 'success',
      title: 'SEO Title Generated',
      message: 'Luxury editorial title generated successfully based on Brand Brain.',
      duration: 3000
    })
  }

  const handleGenerateDescription = (e: React.MouseEvent) => {
    e.preventDefault()
    const brain = classifyProduct(product.title, product.seo?.description || '')
    setSeoDesc(brain.seo.description)
    addNotification({
      type: 'success',
      title: 'SEO Description Generated',
      message: 'Luxury editorial meta description generated successfully based on Brand Brain.',
      duration: 3000
    })
  }

  // Handle saving changes
  const handleSaveChanges = () => {
    const title = titleRef.current?.value || product.title
    const vendor = vendorRef.current?.value || product.vendor
    const status = statusRef.current?.value || product.status
    const category = categoryRef.current?.value || product.category
    const sku = skuRef.current?.value || product.sku

    startTransition(async () => {
      try {
        const response = await fetch('/api/shopify/product/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: product.id,
            title,
            vendor,
            status,
            category,
            sku,
            variants: variants.map(v => ({
              id: v.id,
              price: v.price,
              compareAtPrice: v.compareAtPrice,
              sku: v.sku,
              barcode: v.barcode,
              size: v.size,
              color: v.color
            })),
            seo: {
              title: seoTitle,
              description: seoDesc
            }
          })
        })

        const result = await response.json()
        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to update product details')
        }

        addNotification({
          type: 'success',
          title: 'Changes saved',
          message: 'All changes were successfully synced to your Shopify store.',
          duration: 4000
        })
        router.refresh()
      } catch (err: any) {
        addNotification({
          type: 'error',
          title: 'Error saving changes',
          message: err.message || 'Verify your internet connection and API token permission scope.',
          duration: 6000
        })
      }
    })
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden text-[#0A0A0A] font-sans">
      {/* Left Panel - Images */}
      <div className="w-[40%] flex flex-col border-r border-[#E5E5E5] bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
          <h2 className="text-sm font-medium flex items-center gap-2">
            Media <span className="text-[#737373] text-xs px-1.5 py-0.5 bg-[#FAFAFA] rounded-md border border-[#E5E5E5]">{images.length}</span>
          </h2>
          <div className="flex items-center gap-1">
            <button onClick={handleAddImage} className="p-1.5 text-[#404040] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] rounded-md transition-colors" title="Upload">
              <ImagePlus className="w-4 h-4" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              multiple 
              onChange={handleFileSelect} 
              className="hidden" 
            />
            <button className="p-1.5 text-[#404040] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] rounded-md transition-colors text-[#A855F7]" title="Enhance (AI)">
              <Sparkles className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-[#404040] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] rounded-md transition-colors" title="Remove Background (AI)">
              <Eraser className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Main Image */}
          <div className="aspect-[3/4] bg-[#FAFAFA] rounded-lg border border-[#E5E5E5] mb-4 relative group overflow-hidden flex items-center justify-center">
            {activeImage ? (
              <img 
                src={activeImage.src} 
                alt={activeImage.alt || "Product image"} 
                className="w-full h-full object-cover transition-transform duration-350 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="text-[#737373] flex flex-col items-center">
                <LayoutGrid className="w-8 h-8 mb-2 opacity-20" />
                <span className="text-sm">No Images Available</span>
              </div>
            )}
            
            {activeImage && (
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/90 backdrop-blur border border-[#E5E5E5] rounded-md text-[#0A0A0A] shadow-sm hover:bg-white">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {activeImage && (
            <div className="flex justify-between items-center gap-2 mb-4 bg-white border border-[#E5E5E5] p-2 rounded-md shadow-sm">
              <div className="flex gap-1">
                <button 
                  onClick={() => handleMoveImage(activeImageIdx, 'left')} 
                  disabled={activeImageIdx === 0}
                  className="px-2.5 py-1 border border-[#E5E5E5] hover:border-black rounded text-[11px] font-medium transition-colors disabled:opacity-30 disabled:hover:border-[#E5E5E5] bg-white flex items-center gap-1"
                >
                  ← Move Left
                </button>
                <button 
                  onClick={() => handleMoveImage(activeImageIdx, 'right')} 
                  disabled={activeImageIdx === images.length - 1}
                  className="px-2.5 py-1 border border-[#E5E5E5] hover:border-black rounded text-[11px] font-medium transition-colors disabled:opacity-30 disabled:hover:border-[#E5E5E5] bg-white flex items-center gap-1"
                >
                  Move Right →
                </button>
              </div>
              <button 
                onClick={() => handleDeleteImage(activeImage.id)}
                className="px-2.5 py-1 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded text-[11px] font-medium transition-colors bg-white"
              >
                Delete Image
              </button>
            </div>
          )}

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div 
                key={img.id || idx} 
                onClick={() => setActiveImageIdx(idx)}
                className={cn(
                  "aspect-[3/4] rounded-md overflow-hidden border cursor-pointer transition-colors bg-[#FAFAFA]",
                  activeImageIdx === idx ? "border-[#0A0A0A] ring-1 ring-[#0A0A0A]" : "border-[#E5E5E5] hover:border-[#737373]"
                )}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            <div 
              onClick={handleAddImage}
              className="aspect-[3/4] border border-dashed border-[#E5E5E5] rounded-md flex flex-col items-center justify-center text-[#737373] hover:bg-[#FAFAFA] hover:border-[#0A0A0A] transition-colors cursor-pointer gap-2"
            >
              <ImagePlus className="w-4 h-4" />
              <span className="text-[10px] font-medium uppercase tracking-wider">Add</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Editor */}
      <div className="w-[60%] flex flex-col bg-white">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[#E5E5E5]">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <Link href="/products" className="text-[#737373] hover:text-[#0A0A0A] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <input 
                  type="text" 
                  ref={titleRef}
                  defaultValue={product?.title || 'Product Name'}
                  className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-[#0A0A0A] w-full max-w-xl"
                />
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border", 
                    product?.status === 'active' ? 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20' : 
                    'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
                  )}>
                    {product?.status || 'Draft'}
                  </span>
                  <span className="text-[11px] text-[#737373] flex items-center gap-1">
                    {isPending ? (
                      <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin text-gray-500" /> Syncing...</span>
                    ) : (
                      <><CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> Ready</>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleSaveChanges}
              disabled={isPending}
              className="bg-[#0A0A0A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#404040] transition-colors shadow-sm disabled:opacity-55 flex items-center gap-1.5"
            >
              {isPending && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              Save changes
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex items-center px-8 gap-6 text-sm">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-3 font-medium transition-colors border-b-2 relative -mb-[1px]",
                  activeTab === tab.id 
                    ? "text-[#0A0A0A] border-[#0A0A0A]" 
                    : "text-[#737373] border-transparent hover:text-[#0A0A0A]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {activeTab === 'general' && (
            <div className="space-y-8 max-w-2xl">
              <section className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#737373] font-medium">Basic Info</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Product Name</label>
                    <input ref={titleRef} type="text" defaultValue={product?.title} className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Short Name</label>
                    <input type="text" defaultValue={product?.shortName} className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] text-[#737373] mb-1.5">SKU</label>
                      <input ref={skuRef} type="text" defaultValue={product?.sku} className="w-full h-[36px] px-3 text-[13px] font-mono border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#737373] mb-1.5">Barcode</label>
                      <input ref={barcodeRef} type="text" defaultValue={product?.barcode} className="w-full h-[36px] px-3 text-[13px] font-mono border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] text-[#737373] mb-1.5">Vendor</label>
                      <input ref={vendorRef} type="text" defaultValue={product?.vendor} className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#737373] mb-1.5">Status</label>
                      <select ref={statusRef} defaultValue={product?.status} className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors">
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Product Type</label>
                    <input ref={categoryRef} type="text" defaultValue={product?.category} className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" />
                  </div>
                </div>
              </section>

              <div className="h-px bg-[#E5E5E5] w-full" />

              <section className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#737373] font-medium">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Gender</label>
                    <select defaultValue={product?.gender} className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors">
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Activity</label>
                    <input type="text" placeholder="Yoga, Pilates, etc." defaultValue={product?.tags?.[0] || ''} className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Season</label>
                    <select defaultValue={product?.season} className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors">
                      <option value="SS25">SS25</option>
                      <option value="AW25">AW25</option>
                      <option value="Core">Core</option>
                      <option value="Permanent">Permanent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Material</label>
                    <input type="text" defaultValue={product?.material || 'Polyamide blend'} className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-8 max-w-2xl">
              <section className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#737373] font-medium">Search Engine Optimization</h3>
                
                <SEOPreview 
                  title={seoTitle} 
                  description={seoDesc}
                  handle={product?.seo?.handle || 'product-handle'}
                />

                <div className="space-y-4 mt-6">
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">URL Handle</label>
                    <div className="flex items-center">
                      <span className="h-[36px] px-3 flex items-center bg-[#FAFAFA] border border-r-0 border-[#E5E5E5] rounded-l text-[#737373] text-[13px]">
                        aya.com/products/
                      </span>
                      <input 
                        type="text" 
                        defaultValue={product?.seo?.handle || ''} 
                        className="flex-1 h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded-r focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[12px] text-[#737373]">Meta Title</label>
                      <button 
                        onClick={handleGenerateTitle}
                        className="text-[11px] text-[#A855F7] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Sparkles className="w-3 h-3" /> Generate
                      </button>
                    </div>
                    <input 
                      type="text" 
                      value={seoTitle} 
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[12px] text-[#737373]">Meta Description</label>
                      <button 
                        onClick={handleGenerateDescription}
                        className="text-[11px] text-[#A855F7] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Sparkles className="w-3 h-3" /> Generate
                      </button>
                    </div>
                    <textarea 
                      rows={4}
                      value={seoDesc}
                      onChange={(e) => setSeoDesc(e.target.value)}
                      className="w-full p-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors resize-y" 
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'shopify' && (
            <div className="space-y-8 max-w-2xl">
              <section className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#737373] font-medium">Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] text-[13px]">€</span>
                      <input 
                        type="number" 
                        value={price} 
                        onChange={(e) => handleMainPriceChange(Number(e.target.value))}
                        className="w-full h-[36px] pl-6 pr-3 text-[13px] font-mono border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Compare At</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] text-[13px]">€</span>
                      <input 
                        type="number" 
                        value={compareAtPrice} 
                        onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                        className="w-full h-[36px] pl-6 pr-3 text-[13px] font-mono border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Cost per item</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] text-[13px]">€</span>
                      <input type="number" defaultValue={product?.cost} className="w-full h-[36px] pl-6 pr-3 text-[13px] font-mono border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" />
                    </div>
                  </div>
                </div>
              </section>

              <div className="h-px bg-[#E5E5E5] w-full" />

              <section className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#737373] font-medium">Inventory</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#E5E5E5] text-[#0A0A0A] focus:ring-[#0A0A0A]" />
                    <span className="text-[13px]">Track inventory</span>
                  </label>
                  
                  <div>
                    <label className="block text-[12px] text-[#737373] mb-1.5">Quantity</label>
                    <input ref={inventoryRef} type="number" defaultValue={variants[0]?.inventory ?? 0} className="w-full h-[36px] px-3 text-[13px] font-mono border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white transition-colors" />
                  </div>

                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#E5E5E5] text-[#0A0A0A] focus:ring-[#0A0A0A]" />
                    <span className="text-[13px]">Continue selling when out of stock</span>
                  </label>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'options' && (
            <div className="space-y-8 max-w-4xl">
              <section className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#737373] font-medium">Product Options</h3>
                
                <div className="border border-[#E5E5E5] rounded-lg bg-white overflow-hidden">
                  <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between min-h-[72px]">
                    <div>
                      <div className="text-[13px] font-medium">Size</div>
                      {editingSize ? (
                        <input 
                          type="text"
                          value={sizeInput}
                          onChange={(e) => setSizeInput(e.target.value)}
                          onBlur={handleSaveSizes}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveSizes()}
                          className="mt-2 h-[32px] px-2 text-[12px] border border-[#0A0A0A] rounded bg-white w-80 focus:outline-none font-mono"
                          autoFocus
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {uniqueSizes.map(size => (
                            <span key={size} className="px-2 py-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded text-[12px] font-mono">{size}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={startEditingSizes}
                      className="text-[12px] text-[#737373] hover:text-[#0A0A0A] hover:underline font-medium"
                    >
                      {editingSize ? 'Save' : 'Edit'}
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between min-h-[72px]">
                    <div>
                      <div className="text-[13px] font-medium">Color</div>
                      {editingColor ? (
                        <input 
                          type="text"
                          value={colorInput}
                          onChange={(e) => setColorInput(e.target.value)}
                          onBlur={handleSaveColors}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveColors()}
                          className="mt-2 h-[32px] px-2 text-[12px] border border-[#0A0A0A] rounded bg-white w-80 focus:outline-none font-mono"
                          autoFocus
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {uniqueColors.map(color => (
                            <span key={color} className="px-2 py-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded text-[12px] font-mono">{color}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={startEditingColors}
                      className="text-[12px] text-[#737373] hover:text-[#0A0A0A] hover:underline font-medium"
                    >
                      {editingColor ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </div>
                
                <button className="text-[13px] font-medium text-[#0A0A0A] hover:underline">
                  + Add another option
                </button>
              </section>

              <section className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#737373] font-medium">Variants</h3>
                <div className="border border-[#E5E5E5] rounded-lg overflow-hidden overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                        <th className="px-4 py-3 text-[12px] font-medium text-[#737373]">Variant</th>
                        <th className="px-4 py-3 text-[12px] font-medium text-[#737373]">Price</th>
                        <th className="px-4 py-3 text-[12px] font-medium text-[#737373]">Inventory</th>
                        <th className="px-4 py-3 text-[12px] font-medium text-[#737373]">SKU</th>
                        <th className="px-4 py-3 text-[12px] font-medium text-[#737373]">Barcode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants.map((v, idx) => (
                        <tr key={v.id || idx} className="border-b border-[#E5E5E5] last:border-0 hover:bg-[#FAFAFA]/50">
                          <td className="px-4 py-3 text-[13px] font-medium">
                            {v.title}
                          </td>
                          <td className="px-4 py-2">
                            <input 
                              type="number" 
                              value={v.price} 
                              onChange={(e) => handleVariantChange(v.id, 'price', Number(e.target.value))}
                              className="w-20 h-8 px-2 text-[13px] font-mono border border-transparent hover:border-[#E5E5E5] focus:border-[#0A0A0A] rounded bg-transparent focus:bg-white" 
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input 
                              type="number" 
                              value={v.inventory} 
                              onChange={(e) => handleVariantChange(v.id, 'inventory', Number(e.target.value))}
                              className="w-20 h-8 px-2 text-[13px] font-mono border border-transparent hover:border-[#E5E5E5] focus:border-[#0A0A0A] rounded bg-transparent focus:bg-white" 
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input 
                              type="text" 
                              value={v.sku} 
                              onChange={(e) => handleVariantChange(v.id, 'sku', e.target.value)}
                              className="w-28 h-8 px-2 text-[13px] font-mono border border-transparent hover:border-[#E5E5E5] focus:border-[#0A0A0A] rounded bg-transparent focus:bg-white" 
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input 
                              type="text" 
                              value={v.barcode} 
                              onChange={(e) => handleVariantChange(v.id, 'barcode', e.target.value)}
                              placeholder="Barcode" 
                              className="w-28 h-8 px-2 text-[13px] font-mono border border-transparent hover:border-[#E5E5E5] focus:border-[#0A0A0A] rounded bg-transparent focus:bg-white" 
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
