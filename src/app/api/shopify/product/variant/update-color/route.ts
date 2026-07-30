import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'

const UPDATE_VARIANT_OPTIONS_MUTATION = `
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      productVariant {
        id
        title
        selectedOptions {
          name
          value
        }
      }
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
    const { variantId, size, color } = body

    if (!variantId || !color) {
      return NextResponse.json({ success: false, error: 'Variant ID and Color value are required' }, { status: 400 })
    }

    const fullVariantId = variantId.startsWith('gid://') ? variantId : `gid://shopify/ProductVariant/${variantId}`

    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    if (!shop || !token) {
      return NextResponse.json({
        success: true,
        source: 'mock'
      })
    }

    // Prepare options array. Shopify takes options in order (e.g. ["M", "Noir"])
    const options = size ? [size, color] : [color]

    const data = await shopifyFetch<any>({
      query: UPDATE_VARIANT_OPTIONS_MUTATION,
      variables: {
        input: {
          id: fullVariantId,
          options
        }
      }
    })

    const errors = data?.productVariantUpdate?.userErrors || []
    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        error: errors.map((e: any) => e.message).join(', ')
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      source: 'shopify',
      variant: data?.productVariantUpdate?.productVariant
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
