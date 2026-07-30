import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'
import { PRODUCT_CREATE_MEDIA_MUTATION } from '@/lib/shopify/mutations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, imageUrl } = body

    if (!id || !imageUrl) {
      return NextResponse.json({ success: false, error: 'Product ID and Image URL are required' }, { status: 400 })
    }

    const fullShopifyId = id.startsWith('gid://') ? id : `gid://shopify/Product/${id}`

    // Call Shopify Mutation
    const data = await shopifyFetch<any>({
      query: PRODUCT_CREATE_MEDIA_MUTATION,
      variables: {
        productId: fullShopifyId,
        media: [
          {
            alt: 'Product Image',
            mediaContentType: 'IMAGE',
            originalSource: imageUrl
          }
        ]
      }
    })

    const userErrors = data?.productCreateMedia?.userErrors || []
    if (userErrors.length > 0) {
      return NextResponse.json({
        success: false,
        error: userErrors.map((e: any) => e.message).join(', ')
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      media: data?.productCreateMedia?.media
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
