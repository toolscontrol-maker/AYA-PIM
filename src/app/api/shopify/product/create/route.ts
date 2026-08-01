import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'
import { PRODUCT_CREATE_MUTATION } from '@/lib/shopify/mutations'
import { mockProducts } from '@/lib/mock/products'
import { 
  handleExists, 
  generateHandle, 
  generateFullProductTitle, 
  generateSEOTitle, 
  generateSKUPrefix,
  ProductIdentityAttributes 
} from '@/lib/productIdentity'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { structuredAttributes, vendor, status, price, metafields } = body

    if (!structuredAttributes) {
      return NextResponse.json({ success: false, error: 'Structured attributes are required' }, { status: 400 })
    }

    const { gender, productType, color } = structuredAttributes as ProductIdentityAttributes
    if (!gender || !productType || !color) {
      return NextResponse.json({ success: false, error: 'Gender, Product Type, and Color are required attributes' }, { status: 400 })
    }

    // 1. Generate identity values from Core Engine
    const handle = generateHandle(structuredAttributes)
    const title = generateFullProductTitle(structuredAttributes)
    const seoTitle = generateSEOTitle(structuredAttributes)
    const skuPrefix = generateSKUPrefix(structuredAttributes)

    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    // Mock Mode Fallback: Update mockProducts in memory
    if (!shop || !token) {
      // Check collision
      if (handleExists(handle, mockProducts)) {
        return NextResponse.json({ 
          success: false, 
          error: `Cannot create. Handle already exists: "${handle}".` 
        }, { status: 400 })
      }

      const newId = `prod_aya_${Date.now()}`
      const materialVal = structuredAttributes.material?.value !== 'none' ? structuredAttributes.material?.value : 'Polyamide blend'

      // Construct a new Product object matching mock shape
      const newProduct: any = {
        id: newId,
        handle,
        title,
        shortName: title.split(' ')[0] || title,
        sku: `${skuPrefix}-001`,
        barcode: `7640392${Math.floor(100000 + Math.random() * 900000)}`,
        vendor: vendor || 'AYA Studio',
        status: (status || 'active').toLowerCase() as 'active' | 'draft' | 'archived',
        publishedAt: status === 'active' ? new Date().toISOString() : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        gender: gender as 'women' | 'men' | 'unisex',
        category: productType.charAt(0).toUpperCase() + productType.slice(1),
        subcategory: productType.charAt(0).toUpperCase() + productType.slice(1),
        collection: 'SS25 Core Collection',
        season: 'SS25',
        color: color.charAt(0).toUpperCase() + color.slice(1),
        colorCode: color === 'black' || color === 'noir' ? '#0F0F0F' : '#CCCCCC',
        material: materialVal,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        price: Number(price) || 0,
        compareAtPrice: null,
        cost: Math.round((Number(price) || 0) * 0.3),
        weight: 250,
        tags: [gender, productType, color],
        images: [],
        variants: ['XS', 'S', 'M', 'L', 'XL'].map((size, idx) => ({
          id: `var_${Date.now()}_${size.toLowerCase()}`,
          sku: `${skuPrefix}-${size}`,
          title: `${size} / ${color.charAt(0).toUpperCase() + color.slice(1)}`,
          price: Number(price) || 0,
          compareAtPrice: null,
          inventory: 30,
          size,
          color: color.charAt(0).toUpperCase() + color.slice(1),
          barcode: `7640392${Math.floor(100000 + Math.random() * 900000) + idx}`
        })),
        seo: {
          title: seoTitle,
          description: `Experience comfort and performance with the new ${title}. Engineered with high-quality materials.`,
          handle,
          score: 80,
          issues: []
        },
        metafields: metafields || {},
        completeness: 85
      }

      mockProducts.unshift(newProduct)

      return NextResponse.json({
        success: true,
        source: 'mock',
        product: newProduct
      })
    }

    // Shopify Mode
    const productData = await shopifyFetch<any>({
      query: PRODUCT_CREATE_MUTATION,
      variables: {
        input: {
          title,
          handle,
          status: status ? status.toUpperCase() : 'ACTIVE',
          vendor: vendor || 'AYA Studio',
          productType: productType.charAt(0).toUpperCase() + productType.slice(1),
          tags: [gender, productType, color],
          seo: {
            title: seoTitle,
            description: `Discover the premium ${title}.`
          }
        }
      }
    })

    const productErrors = productData?.productCreate?.userErrors || []
    if (productErrors.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Product creation error: ${productErrors.map((e: any) => e.message).join(', ')}`
      }, { status: 400 })
    }

    const createdProduct = productData?.productCreate?.product

    return NextResponse.json({
      success: true,
      message: 'Product created successfully on Shopify.',
      product: {
        id: createdProduct.id.split('/').pop() || createdProduct.id,
        handle: createdProduct.handle
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
