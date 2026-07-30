import { mockProducts } from '@/lib/mock/products'
import { ProductEditor } from '@/components/products/ProductEditor'
import { shopifyFetch } from '@/lib/shopify/client'
import { GET_PRODUCT_BY_ID_QUERY } from '@/lib/shopify/queries'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params
  
  // Try to find the product in Shopify first
  try {
    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    if (shop && token) {
      // Reconstruct the global Shopify ID if it is a raw numeric ID
      const fullShopifyId = id.startsWith('gid://') ? id : `gid://shopify/Product/${id}`

      const data = await shopifyFetch<any>({
        query: GET_PRODUCT_BY_ID_QUERY,
        variables: { id: fullShopifyId },
      })

      const node = data?.product

      if (node) {
        const firstVariant = node.variants?.edges?.[0]?.node
        const imageNode = node.featuredImage || node.images?.edges?.[0]?.node
        const collectionsList = node.collections?.edges?.map((e: any) => e.node.title) || []
        
        const price = firstVariant?.price ? parseFloat(firstVariant.price) : 0
        const compareAtPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice) : null

        const mappedProduct = {
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
          gender: 'unisex' as 'women' | 'men' | 'unisex',
          category: node.productType || 'Activewear',
          subcategory: node.productType || 'General',
          collection: collectionsList[0] || 'Core Collection',
          season: 'SS25' as 'SS25' | 'AW25' | 'SS24' | 'AW24' | 'Core' | 'Permanent',
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

        return <ProductEditor key={mappedProduct.id + '-' + mappedProduct.updatedAt} product={mappedProduct} />
      }
    }
  } catch (error) {
    console.error('Error fetching product from Shopify:', error)
  }

  // Fallback to mock products (e.g. if we are offline or product not found on live Shopify)
  const fallbackProduct = mockProducts.find(p => p.id === id)
  if (!fallbackProduct) notFound()

  return <ProductEditor product={fallbackProduct} />
}
