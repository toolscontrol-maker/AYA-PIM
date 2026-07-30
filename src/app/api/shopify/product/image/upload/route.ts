import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify/client'
import { PRODUCT_CREATE_MEDIA_MUTATION } from '@/lib/shopify/mutations'
import fs from 'fs'
import path from 'path'

const STAGED_UPLOADS_CREATE_MUTATION = `
  mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters {
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
    const formData = await req.formData()
    const file = formData.get('file') as File
    const productId = formData.get('productId') as string

    if (!file || !productId) {
      return NextResponse.json({ success: false, error: 'File and Product ID are required' }, { status: 400 })
    }

    const fullShopifyId = productId.startsWith('gid://') ? productId : `gid://shopify/Product/${productId}`

    const shop = process.env.SHOPIFY_SHOP_DOMAIN
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY

    // Fallback: If not configured, write to public directory for mock demonstration
    if (!shop || !token) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }
      
      const filePath = path.join(uploadDir, filename)
      fs.writeFileSync(filePath, buffer)

      const localUrl = `/uploads/${filename}`
      return NextResponse.json({
        success: true,
        source: 'mock',
        imageUrl: localUrl,
        media: [{
          id: `gid://shopify/ProductImage/mock_${Date.now()}`,
          mediaContentType: 'IMAGE',
          status: 'READY'
        }]
      })
    }

    // Official Shopify Staged Upload flow
    const stagedData = await shopifyFetch<any>({
      query: STAGED_UPLOADS_CREATE_MUTATION,
      variables: {
        input: [
          {
            resource: 'PRODUCT_IMAGE',
            filename: file.name,
            mimeType: file.type,
            fileSize: String(file.size),
            httpMethod: 'POST'
          }
        ]
      }
    })

    const stagedTargets = stagedData?.stagedUploadsCreate?.stagedTargets || []
    const stagedErrors = stagedData?.stagedUploadsCreate?.userErrors || []

    if (stagedErrors.length > 0 || stagedTargets.length === 0) {
      throw new Error(`Shopify staged upload failed: ${stagedErrors.map((e: any) => e.message).join(', ')}`)
    }

    const target = stagedTargets[0]

    // Construct form data for S3/GCS upload
    const uploadForm = new FormData()
    target.parameters.forEach((param: any) => {
      uploadForm.append(param.name, param.value)
    })
    uploadForm.append('file', file)

    // Upload to target bucket
    const uploadResponse = await fetch(target.url, {
      method: 'POST',
      body: uploadForm
    })

    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload file to Shopify bucket. Status: ${uploadResponse.status}`)
    }

    // Attach S3/GCS media resource to product via productCreateMedia mutation
    const mediaData = await shopifyFetch<any>({
      query: PRODUCT_CREATE_MEDIA_MUTATION,
      variables: {
        productId: fullShopifyId,
        media: [
          {
            alt: file.name.split('.')[0] || 'Product Image',
            mediaContentType: 'IMAGE',
            originalSource: target.resourceUrl
          }
        ]
      }
    })

    const mediaErrors = mediaData?.productCreateMedia?.userErrors || []
    if (mediaErrors.length > 0) {
      throw new Error(`Failed to attach media to product: ${mediaErrors.map((e: any) => e.message).join(', ')}`)
    }

    // Retrieve new image URL from media nodes (or fall back to staged resource URL)
    return NextResponse.json({
      success: true,
      source: 'shopify',
      imageUrl: target.resourceUrl,
      media: mediaData?.productCreateMedia?.media
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
