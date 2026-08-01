import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'
import { GET_COLLECTIONS_QUERY } from '@/lib/shopify/queries'
import { mockCollections } from '@/lib/mock/collections'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    if (!shop || !token) {
      let noImageCounter = 0;
      const mapped = mockCollections.map(col => {
        let imageUrl = col.image;
        if (!imageUrl) {
          const index = (noImageCounter % 5) + 1;
          imageUrl = `/images/collections/col-cover-${index}.jpg`;
          noImageCounter++;
        }
        return {
          id: col.id,
          name: col.title,
          handle: col.handle,
          type: col.isAutomatic ? 'Smart' : 'Manual',
          productCount: col.productCount,
          updated: col.updatedAt.split('T')[0],
          status: col.publishedAt ? 'Published' : 'Draft',
          image: imageUrl,
          description: col.description
        }
      })
      return NextResponse.json({
        success: true,
        source: 'mock',
        collections: mapped
      })
    }

    const data = await shopifyFetch<any>({
      query: GET_COLLECTIONS_QUERY,
      variables: { first: 100 }
    })

    const edges = data?.collections?.edges || []
    
    let noImageCounter = 0;
    const mappedCollections = edges.map(({ node }: any) => {
      const type = node.ruleSet ? 'Smart' : 'Manual'
      const date = new Date(node.updatedAt)
      const formattedDate = date.toISOString().split('T')[0]

      let imageUrl = node.image?.url;
      if (!imageUrl) {
        // Assign cover image sequentially (1 to 5) from uploaded assets
        const index = (noImageCounter % 5) + 1;
        imageUrl = `/images/collections/col-cover-${index}.jpg`;
        noImageCounter++;
      }

      return {
        id: node.id.split('/').pop() || node.id,
        name: node.title,
        handle: node.handle,
        type: type,
        productCount: node.productsCount?.count || 0,
        updated: formattedDate,
        status: 'Published', // In Shopify, collections retrieved via Admin API are published unless restricted
        image: imageUrl,
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
