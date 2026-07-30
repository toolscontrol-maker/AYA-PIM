export const PRODUCT_UPDATE_MUTATION = `
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        title
        handle
        status
        vendor
        tags
        seo {
          title
          description
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const PRODUCT_BULK_STATUS_MUTATION = `
  mutation productBulkStatusUpdate($ids: [ID!]!, $status: ProductStatus!) {
    productChangeStatus(id: $ids, status: $status) {
      userErrors {
        field
        message
      }
    }
  }
`

export const VARIANT_UPDATE_MUTATION = `
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      productVariant {
        id
        price
        compareAtPrice
        sku
        barcode
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const PRODUCT_CREATE_MEDIA_MUTATION = `
  mutation productCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
    productCreateMedia(media: $media, productId: $productId) {
      media {
        id
        status
        mediaContentType
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const PRODUCT_VARIANTS_BULK_UPDATE_MUTATION = `
  mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkUpdate(productId: $productId, variants: $variants) {
      productVariants {
        id
        price
        compareAtPrice
        sku
        barcode
      }
      userErrors {
        field
        message
      }
    }
  }
`


