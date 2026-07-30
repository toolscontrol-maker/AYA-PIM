export interface ShopifyConfig {
  shopDomain: string
  accessToken: string
  apiVersion?: string
}

export async function shopifyFetch<T>({
  query,
  variables = {},
  config,
}: {
  query: string
  variables?: Record<string, any>
  config?: ShopifyConfig
}): Promise<T> {
  const shop = config?.shopDomain || process.env.NEXT_PUBLIC_SHOPIFY_SHOP_DOMAIN || process.env.SHOPIFY_SHOP_DOMAIN
  const token = config?.accessToken || process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_API_SECRET_KEY
  const apiVersion = config?.apiVersion || process.env.SHOPIFY_API_VERSION || '2025-01'

  if (!shop || !token) {
    throw new Error('Shopify credentials missing. Please configure SHOPIFY_SHOP_DOMAIN and SHOPIFY_ADMIN_ACCESS_TOKEN in .env.local')
  }

  const cleanShop = shop.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const endpoint = `https://${cleanShop}/admin/api/${apiVersion}/graphql.json`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store'
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Shopify GraphQL API Error (${response.status}): ${text}`)
  }

  const json = await response.json()
  if (json.errors) {
    throw new Error(`Shopify GraphQL Errors: ${JSON.stringify(json.errors)}`)
  }

  return json.data as T
}
