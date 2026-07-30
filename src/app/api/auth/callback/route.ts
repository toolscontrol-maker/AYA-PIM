import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const shop = searchParams.get('shop')
  const code = searchParams.get('code')

  if (!shop || !code) {
    return NextResponse.json({ error: 'Missing parameter' }, { status: 400 })
  }

  try {
    const clientId = process.env.SHOPIFY_API_KEY
    const clientSecret = process.env.SHOPIFY_API_SECRET_KEY

    // Exchange code for token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      throw new Error(`Failed to retrieve token: ${errorText}`)
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    if (accessToken) {
      // Dynamically write access token to .env.local
      const envPath = path.join(process.cwd(), '.env.local')
      let envContent = ''
      
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8')
      }

      // Replace or append variables
      const vars: Record<string, string> = {
        SHOPIFY_SHOP_DOMAIN: shop,
        SHOPIFY_API_KEY: clientId || '',
        SHOPIFY_API_SECRET_KEY: clientSecret || '',
        SHOPIFY_ADMIN_ACCESS_TOKEN: accessToken,
        SHOPIFY_API_VERSION: '2025-01',
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      }

      let updatedContent = ''
      const keysHandled = new Set<string>()

      // Update existing variables in env file
      if (envContent) {
        const lines = envContent.split('\n')
        for (const line of lines) {
          const match = line.match(/^([^=]+)=(.*)$/)
          if (match) {
            const key = match[1].trim()
            if (vars[key] !== undefined) {
              updatedContent += `${key}=${vars[key]}\n`
              keysHandled.add(key)
            } else {
              updatedContent += `${line}\n`
            }
          } else {
            updatedContent += `${line}\n`
          }
        }
      }

      // Add new variables that weren't present
      for (const [key, val] of Object.entries(vars)) {
        if (!keysHandled.has(key)) {
          updatedContent += `${key}=${val}\n`
        }
      }

      fs.writeFileSync(envPath, updatedContent.trim() + '\n', 'utf8')
      
      // Force reload of env variables in current process
      process.env.SHOPIFY_ADMIN_ACCESS_TOKEN = accessToken
      process.env.SHOPIFY_SHOP_DOMAIN = shop
    }

    // Success redirect back to Products
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/products`)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
