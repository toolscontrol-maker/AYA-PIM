import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'
import { PRODUCT_UPDATE_MUTATION, PRODUCT_VARIANTS_BULK_UPDATE_MUTATION } from '@/lib/shopify/mutations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, title, status, vendor, tags, variants } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 })
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
          tags: Array.isArray(tags) ? tags : undefined
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

    // 2. Update variants bulk (nesting sku under inventoryItem per ProductVariantsBulkInput spec)
    if (Array.isArray(variants) && variants.length > 0) {
      const formattedVariants = variants.map((v: any) => {
        const fullVariantId = v.id.startsWith('gid://') ? v.id : `gid://shopify/ProductVariant/${v.id}`
        return {
          id: fullVariantId,
          price: v.price !== undefined ? String(v.price) : undefined,
          compareAtPrice: v.compareAtPrice !== undefined ? (v.compareAtPrice ? String(v.compareAtPrice) : null) : undefined,
          barcode: v.barcode || undefined,
          inventoryItem: v.sku ? { sku: v.sku } : undefined
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
