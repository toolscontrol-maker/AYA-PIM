import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'

const PRODUCT_REORDER_MEDIA_MUTATION = `
  mutation productReorderMedia($moves: [MoveInput!]!, $productId: ID!) {
    productReorderMedia(moves: $moves, productId: $productId) {
      mediaUserErrors {
        field
        message
      }
    }
  }
`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, moves } = body

    if (!productId || !Array.isArray(moves)) {
      return NextResponse.json({ success: false, error: 'Product ID and Moves array are required' }, { status: 400 })
    }

    const fullProductId = productId.startsWith('gid://') ? productId : `gid://shopify/Product/${productId}`

    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    if (!shop || !token) {
      return NextResponse.json({
        success: true,
        source: 'mock'
      })
    }

    const formattedMoves = moves.map((move: any) => ({
      id: move.id.startsWith('gid://') ? move.id : `gid://shopify/ProductImage/${move.id}`,
      newPosition: String(move.newPosition) // Shopify expects position as a String representation of an integer
    }))

    const data = await shopifyFetch<any>({
      query: PRODUCT_REORDER_MEDIA_MUTATION,
      variables: {
        productId: fullProductId,
        moves: formattedMoves
      }
    })

    const errors = data?.productReorderMedia?.mediaUserErrors || []
    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        error: errors.map((e: any) => e.message).join(', ')
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      source: 'shopify'
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
