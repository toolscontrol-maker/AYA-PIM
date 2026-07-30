import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'

const PRODUCT_DELETE_MEDIA_MUTATION = `
  mutation productDeleteMedia($mediaIds: [ID!]!, $productId: ID!) {
    productDeleteMedia(mediaIds: $mediaIds, productId: $productId) {
      deletedMediaIds
      userErrors {
        field
        message
      }
    }
  }
`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, mediaId } = body

    if (!productId || !mediaId) {
      return NextResponse.json({ success: false, error: 'Product ID and Media ID are required' }, { status: 400 })
    }

    const fullProductId = productId.startsWith('gid://') ? productId : `gid://shopify/Product/${productId}`
    const fullMediaId = mediaId.startsWith('gid://') ? mediaId : `gid://shopify/ProductImage/${mediaId}`

    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    if (!shop || !token) {
      return NextResponse.json({
        success: true,
        source: 'mock',
        deletedMediaIds: [fullMediaId]
      })
    }

    const data = await shopifyFetch<any>({
      query: PRODUCT_DELETE_MEDIA_MUTATION,
      variables: {
        productId: fullProductId,
        mediaIds: [fullMediaId]
      }
    })

    const userErrors = data?.productDeleteMedia?.userErrors || []
    if (userErrors.length > 0) {
      return NextResponse.json({
        success: false,
        error: userErrors.map((e: any) => e.message).join(', ')
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      source: 'shopify',
      deletedMediaIds: data?.productDeleteMedia?.deletedMediaIds
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
