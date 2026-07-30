import { NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'
import { GET_PRODUCTS_QUERY } from '@/lib/shopify/queries'
import { mockProducts } from '@/lib/mock/products'
import { classifyProduct } from '@/lib/brand/brain'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    if (!shop || !token) {
      return NextResponse.json({
        success: true,
        source: 'mock',
        message: 'Credentials missing. Using local catalog mock until live shopify installation is granted.',
        products: mockProducts,
      })
    }

    const data = await shopifyFetch<any>({
      query: GET_PRODUCTS_QUERY,
      variables: { first: 250 },
    })

    const rawProducts = data?.products?.edges || []
    
    // Transform Shopify GraphQL products to AYA PIM Product format using AYA Brand Brain
    const products = rawProducts.map(({ node }: any) => {
      const firstVariant = node.variants?.edges?.[0]?.node
      const imageNode = node.featuredImage || node.images?.edges?.[0]?.node
      const collectionsList = node.collections?.edges?.map((e: any) => e.node.title) || []
      
      const price = firstVariant?.price ? parseFloat(firstVariant.price) : 0
      const compareAtPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice) : null

      // Run AYA Brand Brain semantic classifier
      const brain = classifyProduct(node.title, node.descriptionHtml || '')

      return {
        id: node.id.split('/').pop() || node.id,
        handle: node.handle,
        title: node.title,
        shortName: node.title.split(' ')[0] || node.title,
        sku: firstVariant?.sku || 'N/A',
        barcode: firstVariant?.barcode || '',
        vendor: node.vendor || 'AYA',
        status: (node.status?.toLowerCase() || 'active') as 'active' | 'draft' | 'archived',
        publishedAt: node.publishedAt,
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        gender: brain.gender.toLowerCase() as 'women' | 'men' | 'unisex',
        category: brain.mainCategory,
        subcategory: brain.subcategory,
        collection: collectionsList[0] || 'Core Collection',
        season: 'SS25' as 'SS25' | 'AW25' | 'SS24' | 'AW24' | 'Core' | 'Permanent',
        color: brain.color.displayName,
        colorCode: brain.color.hex,
        material: 'Polyamide',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        price: price,
        compareAtPrice: compareAtPrice,
        cost: Math.round(price * 0.3),
        weight: 250,
        tags: node.tags || [],
        images: imageNode ? [{
          id: imageNode.id,
          src: imageNode.url,
          alt: imageNode.altText || node.title,
          position: 1,
          width: imageNode.width || 800,
          height: imageNode.height || 1000,
        }] : [],
        variants: node.variants?.edges?.map(({ node: v }: any) => ({
          id: v.id.split('/').pop() || v.id,
          sku: v.sku || '',
          title: v.title,
          price: parseFloat(v.price || '0'),
          compareAtPrice: v.compareAtPrice ? parseFloat(v.compareAtPrice) : null,
          inventory: v.inventoryQuantity || 0,
          size: v.selectedOptions?.find((o: any) => o.name.toLowerCase() === 'size')?.value || 'M',
          color: v.selectedOptions?.find((o: any) => o.name.toLowerCase() === 'color')?.value || 'Noir',
          barcode: v.barcode || '',
        })) || [],
        seo: {
          title: node.seo?.title || node.title,
          description: node.seo?.description || node.descriptionHtml?.replace(/<[^>]*>?/gm, '') || '',
          handle: node.handle,
          score: brain.confidence,
          issues: brain.confidence < 80 ? ['Confidence score below AYA thresholds'] : [],
        },
        metafields: brain.metafields,
        completeness: brain.confidence,
      }
    })

    return NextResponse.json({
      success: true,
      source: 'shopify',
      count: products.length,
      products: products.length > 0 ? products : mockProducts,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      source: 'mock',
      error: error.message,
      products: mockProducts,
    })
  }
}
