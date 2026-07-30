import { NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'
import { GET_PRODUCTS_QUERY } from '@/lib/shopify/queries'
import { mockProducts } from '@/lib/mock/products'

export async function GET() {
  try {
    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    if (!shop || !token) {
      return NextResponse.json({
        success: true,
        source: 'mock',
        message: 'Credentials configured. Using local catalog mock until live shopify installation is granted.',
        products: mockProducts,
      })
    }

    const data = await shopifyFetch<any>({
      query: GET_PRODUCTS_QUERY,
      variables: { first: 250 },
    })

    const rawProducts = data?.products?.edges || []
    
    // Transform Shopify GraphQL products to AYA PIM Product format
    const products = rawProducts.map(({ node }: any) => {
      const firstVariant = node.variants?.edges?.[0]?.node
      const imageNode = node.featuredImage || node.images?.edges?.[0]?.node
      const collectionsList = node.collections?.edges?.map((e: any) => e.node.title) || []
      
      const price = firstVariant?.price ? parseFloat(firstVariant.price) : 0
      const compareAtPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice) : null

      return {
        id: node.id.split('/').pop() || node.id,
        handle: node.handle,
        title: node.title,
        shortName: node.title.split(' ')[0] || node.title,
        sku: firstVariant?.sku || 'N/A',
        barcode: firstVariant?.barcode || '',
        vendor: node.vendor || 'AYA',
        status: node.status?.toLowerCase() || 'active',
        publishedAt: node.publishedAt,
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        gender: 'unisex',
        category: node.productType || 'Activewear',
        subcategory: node.productType || 'General',
        collection: collectionsList[0] || 'Core Collection',
        season: 'SS25',
        color: 'Noir',
        colorCode: '#0F0F0F',
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
          score: 85,
          issues: [],
        },
        metafields: {},
        completeness: 90,
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
