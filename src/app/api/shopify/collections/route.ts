import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'
import { GET_COLLECTIONS_QUERY } from '@/lib/shopify/queries'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    if (!shop || !token) {
      return NextResponse.json({
        success: false,
        error: 'Shopify credentials missing. Please configure .env.local'
      }, { status: 400 })
    }

    const data = await shopifyFetch<any>({
      query: GET_COLLECTIONS_QUERY,
      variables: { first: 100 }
    })

    const edges = data?.collections?.edges || []
    
    const mappedCollections = edges.map(({ node }: any) => {
      const type = node.ruleSet ? 'Smart' : 'Manual'
      const date = new Date(node.updatedAt)
      const formattedDate = date.toISOString().split('T')[0]

      return {
        id: node.id.split('/').pop() || node.id,
        name: node.title,
        handle: node.handle,
        type: type,
        productCount: node.productsCount?.count || 0,
        updated: formattedDate,
        status: 'Published', // In Shopify, collections retrieved via Admin API are published unless restricted
        image: node.image?.url || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
        description: node.description || ''
      }
    })

    return NextResponse.json({
      success: true,
      collections: mappedCollections
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
