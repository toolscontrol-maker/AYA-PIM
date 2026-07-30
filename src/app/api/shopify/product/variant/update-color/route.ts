import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'

import { mockProducts } from '@/lib/mock/products'

const GET_VARIANT_OPTIONS_QUERY = `
  query GetVariantOptions($id: ID!) {
    productVariant(id: $id) {
      id
      selectedOptions {
        name
        value
      }
    }
  }
`

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
    const { variantId, color } = body

    if (!variantId || !color) {
      return NextResponse.json({ success: false, error: 'Variant ID and Color value are required' }, { status: 400 })
    }

    const fullVariantId = variantId.startsWith('gid://') ? variantId : `gid://shopify/ProductVariant/${variantId}`

    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    if (!shop || !token) {
      let updated = false
      const rawId = variantId.split('/').pop()
      for (const p of mockProducts) {
        const variant = p.variants?.find((v: any) => v.id.split('/').pop() === rawId)
        if (variant) {
          variant.color = color
          // Standardize variant option titles: Color / Size or Size / Color
          const parts = variant.title.split(' / ')
          if (parts.length > 1) {
            // Check if parts[0] is the color (case match or similar)
            variant.title = `${color} / ${parts[1]}`
          } else {
            variant.title = color
          }
          updated = true
          break
        }
      }
      return NextResponse.json({
        success: updated,
        source: 'mock'
      })
    }

    // 1. Fetch current variant details from Shopify to find the correct Option index for "Color"
    const variantData = await shopifyFetch<any>({
      query: GET_VARIANT_OPTIONS_QUERY,
      variables: { id: fullVariantId }
    })

    const selectedOptions = variantData?.productVariant?.selectedOptions || []
    if (selectedOptions.length === 0) {
      throw new Error(`Variant ${fullVariantId} options not found on Shopify.`)
    }

    // 2. Map color to the correct option index (option1, option2, or option3)
    const colorOptionIdx = selectedOptions.findIndex((o: any) => o.name.toLowerCase() === 'color')
    
    if (colorOptionIdx === -1) {
      throw new Error(`Variant does not have a "Color" option. Current options: ${selectedOptions.map((o: any) => o.name).join(', ')}`)
    }

    // Build the mutation input payload mapping
    const input: Record<string, any> = {
      id: fullVariantId
    }

    if (colorOptionIdx === 0) input.option1 = color
    if (colorOptionIdx === 1) input.option2 = color
    if (colorOptionIdx === 2) input.option3 = color

    // 3. Execute the Shopify update
    const updateData = await shopifyFetch<any>({
      query: UPDATE_VARIANT_OPTIONS_MUTATION,
      variables: { input }
    })

    const errors = updateData?.productVariantUpdate?.userErrors || []
    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        error: errors.map((e: any) => e.message).join(', ')
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      source: 'shopify',
      variant: updateData?.productVariantUpdate?.productVariant
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
