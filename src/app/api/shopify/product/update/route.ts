import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'
import { PRODUCT_UPDATE_MUTATION, PRODUCT_VARIANTS_BULK_UPDATE_MUTATION } from '@/lib/shopify/mutations'
import { mockProducts } from '@/lib/mock/products'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, title, status, vendor, tags, variants, seo } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 })
    }

    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    // Mock Mode Fallback: Update mockProducts in memory
    if (!shop || !token) {
      const rawProductId = id.split('/').pop()
      const mockProduct = mockProducts.find(p => p.id === rawProductId)
      
      if (mockProduct) {
        if (title) mockProduct.title = title
        if (status) mockProduct.status = status.toLowerCase() as 'active' | 'draft' | 'archived'
        if (vendor) mockProduct.vendor = vendor
        if (tags) mockProduct.tags = tags
        if (seo) {
          mockProduct.seo = {
            ...mockProduct.seo,
            title: seo.title || mockProduct.seo?.title || '',
            description: seo.description || mockProduct.seo?.description || '',
            handle: mockProduct.seo?.handle || ''
          }
        }
        if (Array.isArray(variants)) {
          variants.forEach(uv => {
            const rawVarId = uv.id.split('/').pop()
            const matchVar = mockProduct.variants?.find(v => v.id.split('/').pop() === rawVarId)
            if (matchVar) {
              if (uv.price !== undefined) matchVar.price = uv.price
              if (uv.compareAtPrice !== undefined) matchVar.compareAtPrice = uv.compareAtPrice
              if (uv.sku !== undefined) matchVar.sku = uv.sku
              if (uv.barcode !== undefined) matchVar.barcode = uv.barcode
              if (uv.size !== undefined) matchVar.size = uv.size
              if (uv.color !== undefined) matchVar.color = uv.color
              
              const updatedColor = uv.color || matchVar.color || 'Noir'
              const updatedSize = uv.size || matchVar.size || 'M'
              matchVar.title = `${updatedColor} / ${updatedSize}`
            }
          })
        }
      }
      
      return NextResponse.json({
        success: true,
        source: 'mock'
      })
    }

    const fullShopifyId = id.startsWith('gid://') ? id : `gid://shopify/Product/${id}`

    // 1. Update main product details
    const productData = await shopifyFetch<any>({
      query: PRODUCT_UPDATE_MUTATION,
      variables: {
        input: {
          id: fullShopifyId,
          title,
          status: status ? status.toUpperCase() : undefined,
          vendor,
          tags: Array.isArray(tags) ? tags : undefined,
          seo: seo ? {
            title: seo.title || undefined,
            description: seo.description || undefined
          } : undefined
        }
      }
    })

    const productErrors = productData?.productUpdate?.userErrors || []
    if (productErrors.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Product update error: ${productErrors.map((e: any) => e.message).join(', ')}`
      }, { status: 400 })
    }

    // 2. Update variants bulk
    if (Array.isArray(variants) && variants.length > 0) {
      const formattedVariants = variants.map((v: any) => {
        const fullVariantId = v.id.startsWith('gid://') ? v.id : `gid://shopify/ProductVariant/${v.id}`
        return {
          id: fullVariantId,
          price: v.price !== undefined ? String(v.price) : undefined,
          compareAtPrice: v.compareAtPrice !== undefined ? (v.compareAtPrice ? String(v.compareAtPrice) : null) : undefined,
          barcode: v.barcode || undefined,
          inventoryItem: v.sku ? { sku: v.sku } : undefined
          // Note: In a live Shopify Admin API mutation, editing options (Size/Color) is performed
          // using productVariantUpdate individually or through productUpdate options array.
        }
      })

      const variantData = await shopifyFetch<any>({
        query: PRODUCT_VARIANTS_BULK_UPDATE_MUTATION,
        variables: {
          productId: fullShopifyId,
          variants: formattedVariants
        }
      })

      const variantErrors = variantData?.productVariantsBulkUpdate?.userErrors || []
      if (variantErrors.length > 0) {
        return NextResponse.json({
          success: false,
          error: `Variants update error: ${variantErrors.map((e: any) => e.message).join(', ')}`
        }, { status: 400 })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product and variants updated successfully.'
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
