export interface Product {
  id: string
  handle: string
  title: string
  shortName: string
  sku: string
  barcode: string
  vendor: string
  status: 'active' | 'draft' | 'archived'
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  gender: 'women' | 'men' | 'unisex'
  category: string
  subcategory: string
  collection: string
  season: 'SS25' | 'AW25' | 'SS24' | 'AW24' | 'Core' | 'Permanent'
  color: string
  colorCode: string
  material: string
  sizes: string[]
  price: number
  compareAtPrice: number | null
  cost: number
  weight: number
  tags: string[]
  images: ProductImage[]
  variants: ProductVariant[]
  seo: ProductSEO
  metafields: Record<string, string | number | boolean>
  completeness: number // 0-100
}

export interface ProductImage {
  id: string
  src: string
  alt: string
  position: number
  width: number
  height: number
}

export interface ProductVariant {
  id: string
  sku: string
  title: string
  price: number
  compareAtPrice: number | null
  inventory: number
  size: string
  color: string
  barcode: string
}

export interface ProductSEO {
  title: string
  description: string
  handle: string
  score: number // 0-100
  issues: string[]
}

export const mockProducts: Product[] = [
  {
    "id": "prod_aya_001",
    "handle": "flow-leggings-noir",
    "title": "Flow Leggings - Noir",
    "shortName": "Flow Leggings",
    "sku": "AYA-LEG-NOI-001",
    "barcode": "7640392810014",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-07-25T12:42:45.094Z",
    "createdAt": "2026-07-20T12:42:45.092Z",
    "updatedAt": "2026-07-30T12:42:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "High-Waisted Leggings",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 125,
    "compareAtPrice": 156,
    "cost": 40,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "noir",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_001_1",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Flow Leggings - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_001_2",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Flow Leggings - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_001_xs",
        "sku": "AYA-LEG-NOI-001-XS",
        "title": "XS / Noir",
        "price": 125,
        "compareAtPrice": 156,
        "inventory": 33,
        "size": "XS",
        "color": "Noir",
        "barcode": "764039280010"
      },
      {
        "id": "var_001_s",
        "sku": "AYA-LEG-NOI-001-S",
        "title": "S / Noir",
        "price": 125,
        "compareAtPrice": 156,
        "inventory": 54,
        "size": "S",
        "color": "Noir",
        "barcode": "764039280011"
      },
      {
        "id": "var_001_m",
        "sku": "AYA-LEG-NOI-001-M",
        "title": "M / Noir",
        "price": 125,
        "compareAtPrice": 156,
        "inventory": 13,
        "size": "M",
        "color": "Noir",
        "barcode": "764039280012"
      },
      {
        "id": "var_001_l",
        "sku": "AYA-LEG-NOI-001-L",
        "title": "L / Noir",
        "price": 125,
        "compareAtPrice": 156,
        "inventory": 45,
        "size": "L",
        "color": "Noir",
        "barcode": "764039280013"
      },
      {
        "id": "var_001_xl",
        "sku": "AYA-LEG-NOI-001-XL",
        "title": "XL / Noir",
        "price": 125,
        "compareAtPrice": 156,
        "inventory": 48,
        "size": "XL",
        "color": "Noir",
        "barcode": "764039280014"
      }
    ],
    "seo": {
      "title": "Flow Leggings - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Leggings - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-leggings-noir",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 95
  },
  {
    "id": "prod_aya_002",
    "handle": "flow-leggings-ivory",
    "title": "Flow Leggings - Ivory",
    "shortName": "Flow Leggings",
    "sku": "AYA-LEG-IVO-002",
    "barcode": "7640392810024",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-07-22T12:42:45.094Z",
    "createdAt": "2026-07-17T12:42:45.094Z",
    "updatedAt": "2026-07-30T10:18:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "High-Waisted Leggings",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Ivory",
    "colorCode": "#FDFBF7",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 125,
    "compareAtPrice": null,
    "cost": 40,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "ivory",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_002_1",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Flow Leggings - Ivory front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_002_2",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Flow Leggings - Ivory detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_002_xs",
        "sku": "AYA-LEG-IVO-002-XS",
        "title": "XS / Ivory",
        "price": 125,
        "compareAtPrice": null,
        "inventory": 46,
        "size": "XS",
        "color": "Ivory",
        "barcode": "764039280020"
      },
      {
        "id": "var_002_s",
        "sku": "AYA-LEG-IVO-002-S",
        "title": "S / Ivory",
        "price": 125,
        "compareAtPrice": null,
        "inventory": 29,
        "size": "S",
        "color": "Ivory",
        "barcode": "764039280021"
      },
      {
        "id": "var_002_m",
        "sku": "AYA-LEG-IVO-002-M",
        "title": "M / Ivory",
        "price": 125,
        "compareAtPrice": null,
        "inventory": 13,
        "size": "M",
        "color": "Ivory",
        "barcode": "764039280022"
      },
      {
        "id": "var_002_l",
        "sku": "AYA-LEG-IVO-002-L",
        "title": "L / Ivory",
        "price": 125,
        "compareAtPrice": null,
        "inventory": 21,
        "size": "L",
        "color": "Ivory",
        "barcode": "764039280023"
      },
      {
        "id": "var_002_xl",
        "sku": "AYA-LEG-IVO-002-XL",
        "title": "XL / Ivory",
        "price": 125,
        "compareAtPrice": null,
        "inventory": 35,
        "size": "XL",
        "color": "Ivory",
        "barcode": "764039280024"
      }
    ],
    "seo": {
      "title": "Flow Leggings - Ivory | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Leggings - Ivory. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-leggings-ivory",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 96
  },
  {
    "id": "prod_aya_003",
    "handle": "flow-leggings-stone",
    "title": "Flow Leggings - Stone",
    "shortName": "Flow Leggings",
    "sku": "AYA-LEG-STO-003",
    "barcode": "7640392810034",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-07-19T12:42:45.094Z",
    "createdAt": "2026-07-14T12:42:45.094Z",
    "updatedAt": "2026-07-30T07:54:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "High-Waisted Leggings",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Stone",
    "colorCode": "#8B8580",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 120,
    "compareAtPrice": null,
    "cost": 38,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "stone",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_003_1",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Flow Leggings - Stone front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_003_2",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Flow Leggings - Stone detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_003_xs",
        "sku": "AYA-LEG-STO-003-XS",
        "title": "XS / Stone",
        "price": 120,
        "compareAtPrice": null,
        "inventory": 33,
        "size": "XS",
        "color": "Stone",
        "barcode": "764039280030"
      },
      {
        "id": "var_003_s",
        "sku": "AYA-LEG-STO-003-S",
        "title": "S / Stone",
        "price": 120,
        "compareAtPrice": null,
        "inventory": 27,
        "size": "S",
        "color": "Stone",
        "barcode": "764039280031"
      },
      {
        "id": "var_003_m",
        "sku": "AYA-LEG-STO-003-M",
        "title": "M / Stone",
        "price": 120,
        "compareAtPrice": null,
        "inventory": 27,
        "size": "M",
        "color": "Stone",
        "barcode": "764039280032"
      },
      {
        "id": "var_003_l",
        "sku": "AYA-LEG-STO-003-L",
        "title": "L / Stone",
        "price": 120,
        "compareAtPrice": null,
        "inventory": 20,
        "size": "L",
        "color": "Stone",
        "barcode": "764039280033"
      },
      {
        "id": "var_003_xl",
        "sku": "AYA-LEG-STO-003-XL",
        "title": "XL / Stone",
        "price": 120,
        "compareAtPrice": null,
        "inventory": 10,
        "size": "XL",
        "color": "Stone",
        "barcode": "764039280034"
      }
    ],
    "seo": {
      "title": "Flow Leggings - Stone | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Leggings - Stone. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-leggings-stone",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 97
  },
  {
    "id": "prod_aya_004",
    "handle": "flow-leggings-clay",
    "title": "Flow Leggings - Clay",
    "shortName": "Flow Leggings",
    "sku": "AYA-LEG-CLA-004",
    "barcode": "7640392810044",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-07-16T12:42:45.094Z",
    "createdAt": "2026-07-11T12:42:45.094Z",
    "updatedAt": "2026-07-30T05:30:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "High-Waisted Leggings",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Clay",
    "colorCode": "#B87D68",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 130,
    "compareAtPrice": null,
    "cost": 42,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "clay",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_004_1",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Flow Leggings - Clay front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_004_2",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Flow Leggings - Clay detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_004_xs",
        "sku": "AYA-LEG-CLA-004-XS",
        "title": "XS / Clay",
        "price": 130,
        "compareAtPrice": null,
        "inventory": 37,
        "size": "XS",
        "color": "Clay",
        "barcode": "764039280040"
      },
      {
        "id": "var_004_s",
        "sku": "AYA-LEG-CLA-004-S",
        "title": "S / Clay",
        "price": 130,
        "compareAtPrice": null,
        "inventory": 25,
        "size": "S",
        "color": "Clay",
        "barcode": "764039280041"
      },
      {
        "id": "var_004_m",
        "sku": "AYA-LEG-CLA-004-M",
        "title": "M / Clay",
        "price": 130,
        "compareAtPrice": null,
        "inventory": 11,
        "size": "M",
        "color": "Clay",
        "barcode": "764039280042"
      },
      {
        "id": "var_004_l",
        "sku": "AYA-LEG-CLA-004-L",
        "title": "L / Clay",
        "price": 130,
        "compareAtPrice": null,
        "inventory": 45,
        "size": "L",
        "color": "Clay",
        "barcode": "764039280043"
      },
      {
        "id": "var_004_xl",
        "sku": "AYA-LEG-CLA-004-XL",
        "title": "XL / Clay",
        "price": 130,
        "compareAtPrice": null,
        "inventory": 19,
        "size": "XL",
        "color": "Clay",
        "barcode": "764039280044"
      }
    ],
    "seo": {
      "title": "Flow Leggings - Clay | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Leggings - Clay. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-leggings-clay",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 98
  },
  {
    "id": "prod_aya_005",
    "handle": "studio-leggings-forest",
    "title": "Studio Leggings - Forest",
    "shortName": "Studio Leggings",
    "sku": "AYA-LEG-FOR-005",
    "barcode": "7640392810054",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-07-13T12:42:45.094Z",
    "createdAt": "2026-07-08T12:42:45.094Z",
    "updatedAt": "2026-07-30T03:06:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "Seamless Leggings",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Forest",
    "colorCode": "#2D3A2E",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 135,
    "compareAtPrice": null,
    "cost": 43,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "forest",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_005_1",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Studio Leggings - Forest front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_005_2",
        "src": "https://images.unsplash.com/photo-1548690312-bf537a90b04e?w=800&q=80",
        "alt": "Studio Leggings - Forest detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_005_xs",
        "sku": "AYA-LEG-FOR-005-XS",
        "title": "XS / Forest",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 33,
        "size": "XS",
        "color": "Forest",
        "barcode": "764039280050"
      },
      {
        "id": "var_005_s",
        "sku": "AYA-LEG-FOR-005-S",
        "title": "S / Forest",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 45,
        "size": "S",
        "color": "Forest",
        "barcode": "764039280051"
      },
      {
        "id": "var_005_m",
        "sku": "AYA-LEG-FOR-005-M",
        "title": "M / Forest",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 27,
        "size": "M",
        "color": "Forest",
        "barcode": "764039280052"
      },
      {
        "id": "var_005_l",
        "sku": "AYA-LEG-FOR-005-L",
        "title": "L / Forest",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 16,
        "size": "L",
        "color": "Forest",
        "barcode": "764039280053"
      },
      {
        "id": "var_005_xl",
        "sku": "AYA-LEG-FOR-005-XL",
        "title": "XL / Forest",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 53,
        "size": "XL",
        "color": "Forest",
        "barcode": "764039280054"
      }
    ],
    "seo": {
      "title": "Studio Leggings - Forest | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Leggings - Forest. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-leggings-forest",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 99
  },
  {
    "id": "prod_aya_006",
    "handle": "studio-leggings-sand",
    "title": "Studio Leggings - Sand",
    "shortName": "Studio Leggings",
    "sku": "AYA-LEG-SAN-006",
    "barcode": "7640392810064",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-07-10T12:42:45.094Z",
    "createdAt": "2026-07-05T12:42:45.094Z",
    "updatedAt": "2026-07-30T00:42:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "Seamless Leggings",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Sand",
    "colorCode": "#D5C5B5",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 135,
    "compareAtPrice": 169,
    "cost": 43,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "sand",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_006_1",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Studio Leggings - Sand front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_006_2",
        "src": "https://images.unsplash.com/photo-1548690312-bf537a90b04e?w=800&q=80",
        "alt": "Studio Leggings - Sand detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_006_xs",
        "sku": "AYA-LEG-SAN-006-XS",
        "title": "XS / Sand",
        "price": 135,
        "compareAtPrice": 169,
        "inventory": 18,
        "size": "XS",
        "color": "Sand",
        "barcode": "764039280060"
      },
      {
        "id": "var_006_s",
        "sku": "AYA-LEG-SAN-006-S",
        "title": "S / Sand",
        "price": 135,
        "compareAtPrice": 169,
        "inventory": 19,
        "size": "S",
        "color": "Sand",
        "barcode": "764039280061"
      },
      {
        "id": "var_006_m",
        "sku": "AYA-LEG-SAN-006-M",
        "title": "M / Sand",
        "price": 135,
        "compareAtPrice": 169,
        "inventory": 30,
        "size": "M",
        "color": "Sand",
        "barcode": "764039280062"
      },
      {
        "id": "var_006_l",
        "sku": "AYA-LEG-SAN-006-L",
        "title": "L / Sand",
        "price": 135,
        "compareAtPrice": 169,
        "inventory": 37,
        "size": "L",
        "color": "Sand",
        "barcode": "764039280063"
      },
      {
        "id": "var_006_xl",
        "sku": "AYA-LEG-SAN-006-XL",
        "title": "XL / Sand",
        "price": 135,
        "compareAtPrice": 169,
        "inventory": 39,
        "size": "XL",
        "color": "Sand",
        "barcode": "764039280064"
      }
    ],
    "seo": {
      "title": "Studio Leggings - Sand | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Leggings - Sand. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-leggings-sand",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 100
  },
  {
    "id": "prod_aya_007",
    "handle": "studio-leggings-slate",
    "title": "Studio Leggings - Slate",
    "shortName": "Studio Leggings",
    "sku": "AYA-LEG-SLA-007",
    "barcode": "7640392810074",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-07-07T12:42:45.094Z",
    "createdAt": "2026-07-02T12:42:45.094Z",
    "updatedAt": "2026-07-29T22:18:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "Seamless Leggings",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Slate",
    "colorCode": "#475569",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 130,
    "compareAtPrice": null,
    "cost": 42,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "slate",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_007_1",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Studio Leggings - Slate front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_007_2",
        "src": "https://images.unsplash.com/photo-1548690312-bf537a90b04e?w=800&q=80",
        "alt": "Studio Leggings - Slate detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_007_xs",
        "sku": "AYA-LEG-SLA-007-XS",
        "title": "XS / Slate",
        "price": 130,
        "compareAtPrice": null,
        "inventory": 47,
        "size": "XS",
        "color": "Slate",
        "barcode": "764039280070"
      },
      {
        "id": "var_007_s",
        "sku": "AYA-LEG-SLA-007-S",
        "title": "S / Slate",
        "price": 130,
        "compareAtPrice": null,
        "inventory": 41,
        "size": "S",
        "color": "Slate",
        "barcode": "764039280071"
      },
      {
        "id": "var_007_m",
        "sku": "AYA-LEG-SLA-007-M",
        "title": "M / Slate",
        "price": 130,
        "compareAtPrice": null,
        "inventory": 30,
        "size": "M",
        "color": "Slate",
        "barcode": "764039280072"
      },
      {
        "id": "var_007_l",
        "sku": "AYA-LEG-SLA-007-L",
        "title": "L / Slate",
        "price": 130,
        "compareAtPrice": null,
        "inventory": 27,
        "size": "L",
        "color": "Slate",
        "barcode": "764039280073"
      },
      {
        "id": "var_007_xl",
        "sku": "AYA-LEG-SLA-007-XL",
        "title": "XL / Slate",
        "price": 130,
        "compareAtPrice": null,
        "inventory": 13,
        "size": "XL",
        "color": "Slate",
        "barcode": "764039280074"
      }
    ],
    "seo": {
      "title": "Studio Leggings - Slate | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Leggings - Slate. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-leggings-slate",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 95
  },
  {
    "id": "prod_aya_008",
    "handle": "studio-leggings-sage",
    "title": "Studio Leggings - Sage",
    "shortName": "Studio Leggings",
    "sku": "AYA-LEG-SAG-008",
    "barcode": "7640392810084",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-07-04T12:42:45.094Z",
    "createdAt": "2026-06-29T12:42:45.094Z",
    "updatedAt": "2026-07-29T19:54:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "Seamless Leggings",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Sage",
    "colorCode": "#9CAF88",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 135,
    "compareAtPrice": null,
    "cost": 43,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "sage",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_008_1",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Studio Leggings - Sage front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_008_2",
        "src": "https://images.unsplash.com/photo-1548690312-bf537a90b04e?w=800&q=80",
        "alt": "Studio Leggings - Sage detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_008_xs",
        "sku": "AYA-LEG-SAG-008-XS",
        "title": "XS / Sage",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 29,
        "size": "XS",
        "color": "Sage",
        "barcode": "764039280080"
      },
      {
        "id": "var_008_s",
        "sku": "AYA-LEG-SAG-008-S",
        "title": "S / Sage",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 35,
        "size": "S",
        "color": "Sage",
        "barcode": "764039280081"
      },
      {
        "id": "var_008_m",
        "sku": "AYA-LEG-SAG-008-M",
        "title": "M / Sage",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 29,
        "size": "M",
        "color": "Sage",
        "barcode": "764039280082"
      },
      {
        "id": "var_008_l",
        "sku": "AYA-LEG-SAG-008-L",
        "title": "L / Sage",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 49,
        "size": "L",
        "color": "Sage",
        "barcode": "764039280083"
      },
      {
        "id": "var_008_xl",
        "sku": "AYA-LEG-SAG-008-XL",
        "title": "XL / Sage",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 32,
        "size": "XL",
        "color": "Sage",
        "barcode": "764039280084"
      }
    ],
    "seo": {
      "title": "Studio Leggings - Sage | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Leggings - Sage. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-leggings-sage",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 96
  },
  {
    "id": "prod_aya_009",
    "handle": "essential-leggings-noir",
    "title": "Essential Leggings - Noir",
    "shortName": "Essential Leggings",
    "sku": "AYA-LEG-NOI-009",
    "barcode": "7640392810094",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-07-01T12:42:45.094Z",
    "createdAt": "2026-06-26T12:42:45.094Z",
    "updatedAt": "2026-07-29T17:30:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "7/8 Leggings",
    "collection": "Permanent Core Collection",
    "season": "Permanent",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 95,
    "compareAtPrice": null,
    "cost": 30,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "noir",
      "permanent",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_009_1",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Essential Leggings - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_009_2",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Essential Leggings - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_009_xs",
        "sku": "AYA-LEG-NOI-009-XS",
        "title": "XS / Noir",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 33,
        "size": "XS",
        "color": "Noir",
        "barcode": "764039280090"
      },
      {
        "id": "var_009_s",
        "sku": "AYA-LEG-NOI-009-S",
        "title": "S / Noir",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 39,
        "size": "S",
        "color": "Noir",
        "barcode": "764039280091"
      },
      {
        "id": "var_009_m",
        "sku": "AYA-LEG-NOI-009-M",
        "title": "M / Noir",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 43,
        "size": "M",
        "color": "Noir",
        "barcode": "764039280092"
      },
      {
        "id": "var_009_l",
        "sku": "AYA-LEG-NOI-009-L",
        "title": "L / Noir",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 23,
        "size": "L",
        "color": "Noir",
        "barcode": "764039280093"
      },
      {
        "id": "var_009_xl",
        "sku": "AYA-LEG-NOI-009-XL",
        "title": "XL / Noir",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 17,
        "size": "XL",
        "color": "Noir",
        "barcode": "764039280094"
      }
    ],
    "seo": {
      "title": "Essential Leggings - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Essential Leggings - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "essential-leggings-noir",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 97
  },
  {
    "id": "prod_aya_010",
    "handle": "essential-leggings-stone",
    "title": "Essential Leggings - Stone",
    "shortName": "Essential Leggings",
    "sku": "AYA-LEG-STO-010",
    "barcode": "7640392810104",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-06-28T12:42:45.094Z",
    "createdAt": "2026-06-23T12:42:45.094Z",
    "updatedAt": "2026-07-29T15:06:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "7/8 Leggings",
    "collection": "Permanent Core Collection",
    "season": "Permanent",
    "color": "Stone",
    "colorCode": "#8B8580",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 95,
    "compareAtPrice": null,
    "cost": 30,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "stone",
      "permanent",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_010_1",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Essential Leggings - Stone front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_010_2",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Essential Leggings - Stone detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_010_xs",
        "sku": "AYA-LEG-STO-010-XS",
        "title": "XS / Stone",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 14,
        "size": "XS",
        "color": "Stone",
        "barcode": "764039280100"
      },
      {
        "id": "var_010_s",
        "sku": "AYA-LEG-STO-010-S",
        "title": "S / Stone",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 36,
        "size": "S",
        "color": "Stone",
        "barcode": "764039280101"
      },
      {
        "id": "var_010_m",
        "sku": "AYA-LEG-STO-010-M",
        "title": "M / Stone",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 19,
        "size": "M",
        "color": "Stone",
        "barcode": "764039280102"
      },
      {
        "id": "var_010_l",
        "sku": "AYA-LEG-STO-010-L",
        "title": "L / Stone",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 38,
        "size": "L",
        "color": "Stone",
        "barcode": "764039280103"
      },
      {
        "id": "var_010_xl",
        "sku": "AYA-LEG-STO-010-XL",
        "title": "XL / Stone",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 11,
        "size": "XL",
        "color": "Stone",
        "barcode": "764039280104"
      }
    ],
    "seo": {
      "title": "Essential Leggings - Stone | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Essential Leggings - Stone. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "essential-leggings-stone",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 98
  },
  {
    "id": "prod_aya_011",
    "handle": "essential-leggings-clay",
    "title": "Essential Leggings - Clay",
    "shortName": "Essential Leggings",
    "sku": "AYA-LEG-CLA-011",
    "barcode": "7640392810114",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-06-25T12:42:45.094Z",
    "createdAt": "2026-06-20T12:42:45.094Z",
    "updatedAt": "2026-07-29T12:42:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "7/8 Leggings",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Clay",
    "colorCode": "#B87D68",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 105,
    "compareAtPrice": 131,
    "cost": 34,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "clay",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_011_1",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Essential Leggings - Clay front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_011_2",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Essential Leggings - Clay detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_011_xs",
        "sku": "AYA-LEG-CLA-011-XS",
        "title": "XS / Clay",
        "price": 105,
        "compareAtPrice": 131,
        "inventory": 31,
        "size": "XS",
        "color": "Clay",
        "barcode": "764039280110"
      },
      {
        "id": "var_011_s",
        "sku": "AYA-LEG-CLA-011-S",
        "title": "S / Clay",
        "price": 105,
        "compareAtPrice": 131,
        "inventory": 11,
        "size": "S",
        "color": "Clay",
        "barcode": "764039280111"
      },
      {
        "id": "var_011_m",
        "sku": "AYA-LEG-CLA-011-M",
        "title": "M / Clay",
        "price": 105,
        "compareAtPrice": 131,
        "inventory": 33,
        "size": "M",
        "color": "Clay",
        "barcode": "764039280112"
      },
      {
        "id": "var_011_l",
        "sku": "AYA-LEG-CLA-011-L",
        "title": "L / Clay",
        "price": 105,
        "compareAtPrice": 131,
        "inventory": 36,
        "size": "L",
        "color": "Clay",
        "barcode": "764039280113"
      },
      {
        "id": "var_011_xl",
        "sku": "AYA-LEG-CLA-011-XL",
        "title": "XL / Clay",
        "price": 105,
        "compareAtPrice": 131,
        "inventory": 29,
        "size": "XL",
        "color": "Clay",
        "barcode": "764039280114"
      }
    ],
    "seo": {
      "title": "Essential Leggings - Clay | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Essential Leggings - Clay. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "essential-leggings-clay",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 99
  },
  {
    "id": "prod_aya_012",
    "handle": "essential-leggings-forest",
    "title": "Essential Leggings - Forest",
    "shortName": "Essential Leggings",
    "sku": "AYA-LEG-FOR-012",
    "barcode": "7640392810124",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-06-22T12:42:45.094Z",
    "createdAt": "2026-06-17T12:42:45.094Z",
    "updatedAt": "2026-07-29T10:18:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "7/8 Leggings",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Forest",
    "colorCode": "#2D3A2E",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 105,
    "compareAtPrice": null,
    "cost": 34,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "forest",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_012_1",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Essential Leggings - Forest front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_012_2",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Essential Leggings - Forest detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_012_xs",
        "sku": "AYA-LEG-FOR-012-XS",
        "title": "XS / Forest",
        "price": 105,
        "compareAtPrice": null,
        "inventory": 35,
        "size": "XS",
        "color": "Forest",
        "barcode": "764039280120"
      },
      {
        "id": "var_012_s",
        "sku": "AYA-LEG-FOR-012-S",
        "title": "S / Forest",
        "price": 105,
        "compareAtPrice": null,
        "inventory": 51,
        "size": "S",
        "color": "Forest",
        "barcode": "764039280121"
      },
      {
        "id": "var_012_m",
        "sku": "AYA-LEG-FOR-012-M",
        "title": "M / Forest",
        "price": 105,
        "compareAtPrice": null,
        "inventory": 19,
        "size": "M",
        "color": "Forest",
        "barcode": "764039280122"
      },
      {
        "id": "var_012_l",
        "sku": "AYA-LEG-FOR-012-L",
        "title": "L / Forest",
        "price": 105,
        "compareAtPrice": null,
        "inventory": 28,
        "size": "L",
        "color": "Forest",
        "barcode": "764039280123"
      },
      {
        "id": "var_012_xl",
        "sku": "AYA-LEG-FOR-012-XL",
        "title": "XL / Forest",
        "price": 105,
        "compareAtPrice": null,
        "inventory": 23,
        "size": "XL",
        "color": "Forest",
        "barcode": "764039280124"
      }
    ],
    "seo": {
      "title": "Essential Leggings - Forest | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Essential Leggings - Forest. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "essential-leggings-forest",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 100
  },
  {
    "id": "prod_aya_013",
    "handle": "flow-leggings-high-rise-sand",
    "title": "Flow Leggings - High Rise - Sand",
    "shortName": "Flow High Rise",
    "sku": "AYA-LEG-SAN-013",
    "barcode": "7640392810134",
    "vendor": "AYA Studio",
    "status": "archived",
    "publishedAt": null,
    "createdAt": "2026-06-14T12:42:45.094Z",
    "updatedAt": "2026-07-29T07:54:45.094Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "High-Waisted Leggings",
    "collection": "SS24 Core Collection",
    "season": "SS24",
    "color": "Sand",
    "colorCode": "#D5C5B5",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 140,
    "compareAtPrice": null,
    "cost": 45,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "sand",
      "ss24",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_013_1",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Flow Leggings - High Rise - Sand front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_013_2",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Flow Leggings - High Rise - Sand detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_013_xs",
        "sku": "AYA-LEG-SAN-013-XS",
        "title": "XS / Sand",
        "price": 140,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XS",
        "color": "Sand",
        "barcode": "764039280130"
      },
      {
        "id": "var_013_s",
        "sku": "AYA-LEG-SAN-013-S",
        "title": "S / Sand",
        "price": 140,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Sand",
        "barcode": "764039280131"
      },
      {
        "id": "var_013_m",
        "sku": "AYA-LEG-SAN-013-M",
        "title": "M / Sand",
        "price": 140,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Sand",
        "barcode": "764039280132"
      },
      {
        "id": "var_013_l",
        "sku": "AYA-LEG-SAN-013-L",
        "title": "L / Sand",
        "price": 140,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Sand",
        "barcode": "764039280133"
      },
      {
        "id": "var_013_xl",
        "sku": "AYA-LEG-SAN-013-XL",
        "title": "XL / Sand",
        "price": 140,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XL",
        "color": "Sand",
        "barcode": "764039280134"
      }
    ],
    "seo": {
      "title": "Flow Leggings - High Rise - Sand | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Leggings - High Rise - Sand. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-leggings-high-rise-sand",
      "score": 38,
      "issues": [
        "Discontinued product redirect missing",
        "Canonical tag pointing to obsolete URL"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 75
  },
  {
    "id": "prod_aya_014",
    "handle": "studio-leggings-7-8-length-slate",
    "title": "Studio Leggings - 7/8 Length - Slate",
    "shortName": "Studio 7/8",
    "sku": "AYA-LEG-SLA-014",
    "barcode": "7640392810144",
    "vendor": "AYA Studio",
    "status": "archived",
    "publishedAt": null,
    "createdAt": "2026-06-11T12:42:45.095Z",
    "updatedAt": "2026-07-29T05:30:45.095Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "7/8 Leggings",
    "collection": "AW24 Core Collection",
    "season": "AW24",
    "color": "Slate",
    "colorCode": "#475569",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 145,
    "compareAtPrice": null,
    "cost": 46,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "slate",
      "aw24",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_014_1",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Studio Leggings - 7/8 Length - Slate front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_014_2",
        "src": "https://images.unsplash.com/photo-1548690312-bf537a90b04e?w=800&q=80",
        "alt": "Studio Leggings - 7/8 Length - Slate detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_014_xs",
        "sku": "AYA-LEG-SLA-014-XS",
        "title": "XS / Slate",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XS",
        "color": "Slate",
        "barcode": "764039280140"
      },
      {
        "id": "var_014_s",
        "sku": "AYA-LEG-SLA-014-S",
        "title": "S / Slate",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Slate",
        "barcode": "764039280141"
      },
      {
        "id": "var_014_m",
        "sku": "AYA-LEG-SLA-014-M",
        "title": "M / Slate",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Slate",
        "barcode": "764039280142"
      },
      {
        "id": "var_014_l",
        "sku": "AYA-LEG-SLA-014-L",
        "title": "L / Slate",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Slate",
        "barcode": "764039280143"
      },
      {
        "id": "var_014_xl",
        "sku": "AYA-LEG-SLA-014-XL",
        "title": "XL / Slate",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XL",
        "color": "Slate",
        "barcode": "764039280144"
      }
    ],
    "seo": {
      "title": "Studio Leggings - 7/8 Length - Slate | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Leggings - 7/8 Length - Slate. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-leggings-7-8-length-slate",
      "score": 38,
      "issues": [
        "Discontinued product redirect missing",
        "Canonical tag pointing to obsolete URL"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 75
  },
  {
    "id": "prod_aya_015",
    "handle": "essential-leggings-ribbed-sage",
    "title": "Essential Leggings - Ribbed - Sage",
    "shortName": "Essential Ribbed",
    "sku": "AYA-LEG-SAG-015",
    "barcode": "7640392810154",
    "vendor": "AYA Studio",
    "status": "draft",
    "publishedAt": null,
    "createdAt": "2026-06-08T12:42:45.095Z",
    "updatedAt": "2026-07-29T03:06:45.095Z",
    "gender": "women",
    "category": "Leggings",
    "subcategory": "Ribbed Leggings",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Sage",
    "colorCode": "#9CAF88",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "price": 115,
    "compareAtPrice": null,
    "cost": 37,
    "weight": 240,
    "tags": [
      "women",
      "leggings",
      "sage",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_015_1",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Essential Leggings - Ribbed - Sage front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_015_2",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Essential Leggings - Ribbed - Sage detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_015_xs",
        "sku": "AYA-LEG-SAG-015-XS",
        "title": "XS / Sage",
        "price": 115,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XS",
        "color": "Sage",
        "barcode": "764039280150"
      },
      {
        "id": "var_015_s",
        "sku": "AYA-LEG-SAG-015-S",
        "title": "S / Sage",
        "price": 115,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Sage",
        "barcode": "764039280151"
      },
      {
        "id": "var_015_m",
        "sku": "AYA-LEG-SAG-015-M",
        "title": "M / Sage",
        "price": 115,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Sage",
        "barcode": "764039280152"
      },
      {
        "id": "var_015_l",
        "sku": "AYA-LEG-SAG-015-L",
        "title": "L / Sage",
        "price": 115,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Sage",
        "barcode": "764039280153"
      },
      {
        "id": "var_015_xl",
        "sku": "AYA-LEG-SAG-015-XL",
        "title": "XL / Sage",
        "price": 115,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XL",
        "color": "Sage",
        "barcode": "764039280154"
      }
    ],
    "seo": {
      "title": "Essential Leggings - Ribbed - Sage | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Essential Leggings - Ribbed - Sage. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "essential-leggings-ribbed-sage",
      "score": 59,
      "issues": [
        "Meta description is too short (under 120 characters)",
        "Product title missing primary target keyword",
        "Missing Alt text on gallery images"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 74
  },
  {
    "id": "prod_aya_016",
    "handle": "studio-bra-noir",
    "title": "Studio Bra - Noir",
    "shortName": "Studio Bra",
    "sku": "AYA-SPO-NOI-016",
    "barcode": "7640392810164",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-06-10T12:42:45.095Z",
    "createdAt": "2026-06-05T12:42:45.095Z",
    "updatedAt": "2026-07-29T00:42:45.095Z",
    "gender": "women",
    "category": "Sports Bras",
    "subcategory": "Medium Impact Bra",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 75,
    "compareAtPrice": 94,
    "cost": 24,
    "weight": 180,
    "tags": [
      "women",
      "sports bras",
      "noir",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_016_1",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Studio Bra - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_016_2",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Studio Bra - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_016_xs",
        "sku": "AYA-SPO-NOI-016-XS",
        "title": "XS / Noir",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 12,
        "size": "XS",
        "color": "Noir",
        "barcode": "764039280160"
      },
      {
        "id": "var_016_s",
        "sku": "AYA-SPO-NOI-016-S",
        "title": "S / Noir",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 18,
        "size": "S",
        "color": "Noir",
        "barcode": "764039280161"
      },
      {
        "id": "var_016_m",
        "sku": "AYA-SPO-NOI-016-M",
        "title": "M / Noir",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 42,
        "size": "M",
        "color": "Noir",
        "barcode": "764039280162"
      },
      {
        "id": "var_016_l",
        "sku": "AYA-SPO-NOI-016-L",
        "title": "L / Noir",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 37,
        "size": "L",
        "color": "Noir",
        "barcode": "764039280163"
      }
    ],
    "seo": {
      "title": "Studio Bra - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Bra - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-bra-noir",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 98
  },
  {
    "id": "prod_aya_017",
    "handle": "studio-bra-ivory",
    "title": "Studio Bra - Ivory",
    "shortName": "Studio Bra",
    "sku": "AYA-SPO-IVO-017",
    "barcode": "7640392810174",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-06-07T12:42:45.095Z",
    "createdAt": "2026-06-02T12:42:45.095Z",
    "updatedAt": "2026-07-28T22:18:45.095Z",
    "gender": "women",
    "category": "Sports Bras",
    "subcategory": "Medium Impact Bra",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Ivory",
    "colorCode": "#FDFBF7",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 75,
    "compareAtPrice": null,
    "cost": 24,
    "weight": 180,
    "tags": [
      "women",
      "sports bras",
      "ivory",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_017_1",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Studio Bra - Ivory front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_017_2",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Studio Bra - Ivory detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_017_xs",
        "sku": "AYA-SPO-IVO-017-XS",
        "title": "XS / Ivory",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 51,
        "size": "XS",
        "color": "Ivory",
        "barcode": "764039280170"
      },
      {
        "id": "var_017_s",
        "sku": "AYA-SPO-IVO-017-S",
        "title": "S / Ivory",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 46,
        "size": "S",
        "color": "Ivory",
        "barcode": "764039280171"
      },
      {
        "id": "var_017_m",
        "sku": "AYA-SPO-IVO-017-M",
        "title": "M / Ivory",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 10,
        "size": "M",
        "color": "Ivory",
        "barcode": "764039280172"
      },
      {
        "id": "var_017_l",
        "sku": "AYA-SPO-IVO-017-L",
        "title": "L / Ivory",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 39,
        "size": "L",
        "color": "Ivory",
        "barcode": "764039280173"
      }
    ],
    "seo": {
      "title": "Studio Bra - Ivory | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Bra - Ivory. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-bra-ivory",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 99
  },
  {
    "id": "prod_aya_018",
    "handle": "studio-bra-stone",
    "title": "Studio Bra - Stone",
    "shortName": "Studio Bra",
    "sku": "AYA-SPO-STO-018",
    "barcode": "7640392810184",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-06-04T12:42:45.095Z",
    "createdAt": "2026-05-30T12:42:45.095Z",
    "updatedAt": "2026-07-28T19:54:45.095Z",
    "gender": "women",
    "category": "Sports Bras",
    "subcategory": "Medium Impact Bra",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Stone",
    "colorCode": "#8B8580",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 75,
    "compareAtPrice": null,
    "cost": 24,
    "weight": 180,
    "tags": [
      "women",
      "sports bras",
      "stone",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_018_1",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Studio Bra - Stone front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_018_2",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Studio Bra - Stone detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_018_xs",
        "sku": "AYA-SPO-STO-018-XS",
        "title": "XS / Stone",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 52,
        "size": "XS",
        "color": "Stone",
        "barcode": "764039280180"
      },
      {
        "id": "var_018_s",
        "sku": "AYA-SPO-STO-018-S",
        "title": "S / Stone",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 16,
        "size": "S",
        "color": "Stone",
        "barcode": "764039280181"
      },
      {
        "id": "var_018_m",
        "sku": "AYA-SPO-STO-018-M",
        "title": "M / Stone",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 37,
        "size": "M",
        "color": "Stone",
        "barcode": "764039280182"
      },
      {
        "id": "var_018_l",
        "sku": "AYA-SPO-STO-018-L",
        "title": "L / Stone",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 40,
        "size": "L",
        "color": "Stone",
        "barcode": "764039280183"
      }
    ],
    "seo": {
      "title": "Studio Bra - Stone | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Bra - Stone. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-bra-stone",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 100
  },
  {
    "id": "prod_aya_019",
    "handle": "studio-bra-clay",
    "title": "Studio Bra - Clay",
    "shortName": "Studio Bra",
    "sku": "AYA-SPO-CLA-019",
    "barcode": "7640392810194",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-06-01T12:42:45.095Z",
    "createdAt": "2026-05-27T12:42:45.095Z",
    "updatedAt": "2026-07-28T17:30:45.095Z",
    "gender": "women",
    "category": "Sports Bras",
    "subcategory": "Medium Impact Bra",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Clay",
    "colorCode": "#B87D68",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 80,
    "compareAtPrice": null,
    "cost": 26,
    "weight": 180,
    "tags": [
      "women",
      "sports bras",
      "clay",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_019_1",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Studio Bra - Clay front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_019_2",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Studio Bra - Clay detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_019_xs",
        "sku": "AYA-SPO-CLA-019-XS",
        "title": "XS / Clay",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 51,
        "size": "XS",
        "color": "Clay",
        "barcode": "764039280190"
      },
      {
        "id": "var_019_s",
        "sku": "AYA-SPO-CLA-019-S",
        "title": "S / Clay",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 26,
        "size": "S",
        "color": "Clay",
        "barcode": "764039280191"
      },
      {
        "id": "var_019_m",
        "sku": "AYA-SPO-CLA-019-M",
        "title": "M / Clay",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 20,
        "size": "M",
        "color": "Clay",
        "barcode": "764039280192"
      },
      {
        "id": "var_019_l",
        "sku": "AYA-SPO-CLA-019-L",
        "title": "L / Clay",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 34,
        "size": "L",
        "color": "Clay",
        "barcode": "764039280193"
      }
    ],
    "seo": {
      "title": "Studio Bra - Clay | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Bra - Clay. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-bra-clay",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 95
  },
  {
    "id": "prod_aya_020",
    "handle": "flow-bra-forest",
    "title": "Flow Bra - Forest",
    "shortName": "Flow Bra",
    "sku": "AYA-SPO-FOR-020",
    "barcode": "7640392810204",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-05-29T12:42:45.095Z",
    "createdAt": "2026-05-24T12:42:45.095Z",
    "updatedAt": "2026-07-28T15:06:45.095Z",
    "gender": "women",
    "category": "Sports Bras",
    "subcategory": "Low Impact Bra",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Forest",
    "colorCode": "#2D3A2E",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 65,
    "compareAtPrice": null,
    "cost": 21,
    "weight": 180,
    "tags": [
      "women",
      "sports bras",
      "forest",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_020_1",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Flow Bra - Forest front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_020_2",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Flow Bra - Forest detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_020_xs",
        "sku": "AYA-SPO-FOR-020-XS",
        "title": "XS / Forest",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 13,
        "size": "XS",
        "color": "Forest",
        "barcode": "764039280200"
      },
      {
        "id": "var_020_s",
        "sku": "AYA-SPO-FOR-020-S",
        "title": "S / Forest",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 39,
        "size": "S",
        "color": "Forest",
        "barcode": "764039280201"
      },
      {
        "id": "var_020_m",
        "sku": "AYA-SPO-FOR-020-M",
        "title": "M / Forest",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 50,
        "size": "M",
        "color": "Forest",
        "barcode": "764039280202"
      },
      {
        "id": "var_020_l",
        "sku": "AYA-SPO-FOR-020-L",
        "title": "L / Forest",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 42,
        "size": "L",
        "color": "Forest",
        "barcode": "764039280203"
      }
    ],
    "seo": {
      "title": "Flow Bra - Forest | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Bra - Forest. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-bra-forest",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 96
  },
  {
    "id": "prod_aya_021",
    "handle": "flow-bra-sand",
    "title": "Flow Bra - Sand",
    "shortName": "Flow Bra",
    "sku": "AYA-SPO-SAN-021",
    "barcode": "7640392810214",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-05-26T12:42:45.095Z",
    "createdAt": "2026-05-21T12:42:45.095Z",
    "updatedAt": "2026-07-28T12:42:45.095Z",
    "gender": "women",
    "category": "Sports Bras",
    "subcategory": "Low Impact Bra",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Sand",
    "colorCode": "#D5C5B5",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 65,
    "compareAtPrice": 81,
    "cost": 21,
    "weight": 180,
    "tags": [
      "women",
      "sports bras",
      "sand",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_021_1",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Flow Bra - Sand front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_021_2",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Flow Bra - Sand detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_021_xs",
        "sku": "AYA-SPO-SAN-021-XS",
        "title": "XS / Sand",
        "price": 65,
        "compareAtPrice": 81,
        "inventory": 39,
        "size": "XS",
        "color": "Sand",
        "barcode": "764039280210"
      },
      {
        "id": "var_021_s",
        "sku": "AYA-SPO-SAN-021-S",
        "title": "S / Sand",
        "price": 65,
        "compareAtPrice": 81,
        "inventory": 17,
        "size": "S",
        "color": "Sand",
        "barcode": "764039280211"
      },
      {
        "id": "var_021_m",
        "sku": "AYA-SPO-SAN-021-M",
        "title": "M / Sand",
        "price": 65,
        "compareAtPrice": 81,
        "inventory": 54,
        "size": "M",
        "color": "Sand",
        "barcode": "764039280212"
      },
      {
        "id": "var_021_l",
        "sku": "AYA-SPO-SAN-021-L",
        "title": "L / Sand",
        "price": 65,
        "compareAtPrice": 81,
        "inventory": 40,
        "size": "L",
        "color": "Sand",
        "barcode": "764039280213"
      }
    ],
    "seo": {
      "title": "Flow Bra - Sand | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Bra - Sand. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-bra-sand",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 97
  },
  {
    "id": "prod_aya_022",
    "handle": "flow-bra-slate",
    "title": "Flow Bra - Slate",
    "shortName": "Flow Bra",
    "sku": "AYA-SPO-SLA-022",
    "barcode": "7640392810224",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-05-23T12:42:45.095Z",
    "createdAt": "2026-05-18T12:42:45.095Z",
    "updatedAt": "2026-07-28T10:18:45.095Z",
    "gender": "women",
    "category": "Sports Bras",
    "subcategory": "Low Impact Bra",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Slate",
    "colorCode": "#475569",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 65,
    "compareAtPrice": null,
    "cost": 21,
    "weight": 180,
    "tags": [
      "women",
      "sports bras",
      "slate",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_022_1",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Flow Bra - Slate front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_022_2",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Flow Bra - Slate detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_022_xs",
        "sku": "AYA-SPO-SLA-022-XS",
        "title": "XS / Slate",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 13,
        "size": "XS",
        "color": "Slate",
        "barcode": "764039280220"
      },
      {
        "id": "var_022_s",
        "sku": "AYA-SPO-SLA-022-S",
        "title": "S / Slate",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 46,
        "size": "S",
        "color": "Slate",
        "barcode": "764039280221"
      },
      {
        "id": "var_022_m",
        "sku": "AYA-SPO-SLA-022-M",
        "title": "M / Slate",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 36,
        "size": "M",
        "color": "Slate",
        "barcode": "764039280222"
      },
      {
        "id": "var_022_l",
        "sku": "AYA-SPO-SLA-022-L",
        "title": "L / Slate",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 33,
        "size": "L",
        "color": "Slate",
        "barcode": "764039280223"
      }
    ],
    "seo": {
      "title": "Flow Bra - Slate | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Bra - Slate. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-bra-slate",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 98
  },
  {
    "id": "prod_aya_023",
    "handle": "flow-bra-sage",
    "title": "Flow Bra - Sage",
    "shortName": "Flow Bra",
    "sku": "AYA-SPO-SAG-023",
    "barcode": "7640392810234",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-05-20T12:42:45.095Z",
    "createdAt": "2026-05-15T12:42:45.095Z",
    "updatedAt": "2026-07-28T07:54:45.095Z",
    "gender": "women",
    "category": "Sports Bras",
    "subcategory": "Low Impact Bra",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Sage",
    "colorCode": "#9CAF88",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 70,
    "compareAtPrice": null,
    "cost": 22,
    "weight": 180,
    "tags": [
      "women",
      "sports bras",
      "sage",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_023_1",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Flow Bra - Sage front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_023_2",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Flow Bra - Sage detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_023_xs",
        "sku": "AYA-SPO-SAG-023-XS",
        "title": "XS / Sage",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 24,
        "size": "XS",
        "color": "Sage",
        "barcode": "764039280230"
      },
      {
        "id": "var_023_s",
        "sku": "AYA-SPO-SAG-023-S",
        "title": "S / Sage",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 10,
        "size": "S",
        "color": "Sage",
        "barcode": "764039280231"
      },
      {
        "id": "var_023_m",
        "sku": "AYA-SPO-SAG-023-M",
        "title": "M / Sage",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 49,
        "size": "M",
        "color": "Sage",
        "barcode": "764039280232"
      },
      {
        "id": "var_023_l",
        "sku": "AYA-SPO-SAG-023-L",
        "title": "L / Sage",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 28,
        "size": "L",
        "color": "Sage",
        "barcode": "764039280233"
      }
    ],
    "seo": {
      "title": "Flow Bra - Sage | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Bra - Sage. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-bra-sage",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 99
  },
  {
    "id": "prod_aya_024",
    "handle": "studio-bra-high-support-noir",
    "title": "Studio Bra - High Support - Noir",
    "shortName": "Studio High Support",
    "sku": "AYA-SPO-NOI-024",
    "barcode": "7640392810244",
    "vendor": "AYA Studio",
    "status": "archived",
    "publishedAt": null,
    "createdAt": "2026-05-12T12:42:45.095Z",
    "updatedAt": "2026-07-28T05:30:45.095Z",
    "gender": "women",
    "category": "Sports Bras",
    "subcategory": "High Impact Bra",
    "collection": "AW24 Core Collection",
    "season": "AW24",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 95,
    "compareAtPrice": null,
    "cost": 30,
    "weight": 180,
    "tags": [
      "women",
      "sports bras",
      "noir",
      "aw24",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_024_1",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Studio Bra - High Support - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_024_2",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Studio Bra - High Support - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_024_xs",
        "sku": "AYA-SPO-NOI-024-XS",
        "title": "XS / Noir",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XS",
        "color": "Noir",
        "barcode": "764039280240"
      },
      {
        "id": "var_024_s",
        "sku": "AYA-SPO-NOI-024-S",
        "title": "S / Noir",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Noir",
        "barcode": "764039280241"
      },
      {
        "id": "var_024_m",
        "sku": "AYA-SPO-NOI-024-M",
        "title": "M / Noir",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Noir",
        "barcode": "764039280242"
      },
      {
        "id": "var_024_l",
        "sku": "AYA-SPO-NOI-024-L",
        "title": "L / Noir",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Noir",
        "barcode": "764039280243"
      }
    ],
    "seo": {
      "title": "Studio Bra - High Support - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Bra - High Support - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-bra-high-support-noir",
      "score": 38,
      "issues": [
        "Discontinued product redirect missing",
        "Canonical tag pointing to obsolete URL"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 75
  },
  {
    "id": "prod_aya_025",
    "handle": "flow-bra-strappy-ivory",
    "title": "Flow Bra - Strappy - Ivory",
    "shortName": "Flow Strappy",
    "sku": "AYA-SPO-IVO-025",
    "barcode": "7640392810254",
    "vendor": "AYA Studio",
    "status": "draft",
    "publishedAt": null,
    "createdAt": "2026-05-09T12:42:45.095Z",
    "updatedAt": "2026-07-28T03:06:45.095Z",
    "gender": "women",
    "category": "Sports Bras",
    "subcategory": "Low Impact Bra",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Ivory",
    "colorCode": "#FDFBF7",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 70,
    "compareAtPrice": null,
    "cost": 22,
    "weight": 180,
    "tags": [
      "women",
      "sports bras",
      "ivory",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_025_1",
        "src": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "alt": "Flow Bra - Strappy - Ivory front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_025_2",
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
        "alt": "Flow Bra - Strappy - Ivory detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_025_xs",
        "sku": "AYA-SPO-IVO-025-XS",
        "title": "XS / Ivory",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XS",
        "color": "Ivory",
        "barcode": "764039280250"
      },
      {
        "id": "var_025_s",
        "sku": "AYA-SPO-IVO-025-S",
        "title": "S / Ivory",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Ivory",
        "barcode": "764039280251"
      },
      {
        "id": "var_025_m",
        "sku": "AYA-SPO-IVO-025-M",
        "title": "M / Ivory",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Ivory",
        "barcode": "764039280252"
      },
      {
        "id": "var_025_l",
        "sku": "AYA-SPO-IVO-025-L",
        "title": "L / Ivory",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Ivory",
        "barcode": "764039280253"
      }
    ],
    "seo": {
      "title": "Flow Bra - Strappy - Ivory | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Bra - Strappy - Ivory. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-bra-strappy-ivory",
      "score": 49,
      "issues": [
        "Meta description is too short (under 120 characters)",
        "Product title missing primary target keyword",
        "Missing Alt text on gallery images"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Sculpting / Tight Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 64
  },
  {
    "id": "prod_aya_026",
    "handle": "flow-tank-noir",
    "title": "Flow Tank - Noir",
    "shortName": "Flow Tank",
    "sku": "AYA-TOP-NOI-026",
    "barcode": "7640392810264",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-05-11T12:42:45.095Z",
    "createdAt": "2026-05-06T12:42:45.095Z",
    "updatedAt": "2026-07-28T00:42:45.095Z",
    "gender": "women",
    "category": "Tops",
    "subcategory": "Tank Tops",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 65,
    "compareAtPrice": 81,
    "cost": 21,
    "weight": 180,
    "tags": [
      "women",
      "tops",
      "noir",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_026_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Flow Tank - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_026_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Flow Tank - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_026_xs",
        "sku": "AYA-TOP-NOI-026-XS",
        "title": "XS / Noir",
        "price": 65,
        "compareAtPrice": 81,
        "inventory": 26,
        "size": "XS",
        "color": "Noir",
        "barcode": "764039280260"
      },
      {
        "id": "var_026_s",
        "sku": "AYA-TOP-NOI-026-S",
        "title": "S / Noir",
        "price": 65,
        "compareAtPrice": 81,
        "inventory": 10,
        "size": "S",
        "color": "Noir",
        "barcode": "764039280261"
      },
      {
        "id": "var_026_m",
        "sku": "AYA-TOP-NOI-026-M",
        "title": "M / Noir",
        "price": 65,
        "compareAtPrice": 81,
        "inventory": 10,
        "size": "M",
        "color": "Noir",
        "barcode": "764039280262"
      },
      {
        "id": "var_026_l",
        "sku": "AYA-TOP-NOI-026-L",
        "title": "L / Noir",
        "price": 65,
        "compareAtPrice": 81,
        "inventory": 30,
        "size": "L",
        "color": "Noir",
        "barcode": "764039280263"
      }
    ],
    "seo": {
      "title": "Flow Tank - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Tank - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-tank-noir",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 96
  },
  {
    "id": "prod_aya_027",
    "handle": "flow-tank-ivory",
    "title": "Flow Tank - Ivory",
    "shortName": "Flow Tank",
    "sku": "AYA-TOP-IVO-027",
    "barcode": "7640392810274",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-05-08T12:42:45.095Z",
    "createdAt": "2026-05-03T12:42:45.095Z",
    "updatedAt": "2026-07-27T22:18:45.095Z",
    "gender": "women",
    "category": "Tops",
    "subcategory": "Tank Tops",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Ivory",
    "colorCode": "#FDFBF7",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 65,
    "compareAtPrice": null,
    "cost": 21,
    "weight": 180,
    "tags": [
      "women",
      "tops",
      "ivory",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_027_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Flow Tank - Ivory front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_027_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Flow Tank - Ivory detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_027_xs",
        "sku": "AYA-TOP-IVO-027-XS",
        "title": "XS / Ivory",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 47,
        "size": "XS",
        "color": "Ivory",
        "barcode": "764039280270"
      },
      {
        "id": "var_027_s",
        "sku": "AYA-TOP-IVO-027-S",
        "title": "S / Ivory",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 23,
        "size": "S",
        "color": "Ivory",
        "barcode": "764039280271"
      },
      {
        "id": "var_027_m",
        "sku": "AYA-TOP-IVO-027-M",
        "title": "M / Ivory",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 22,
        "size": "M",
        "color": "Ivory",
        "barcode": "764039280272"
      },
      {
        "id": "var_027_l",
        "sku": "AYA-TOP-IVO-027-L",
        "title": "L / Ivory",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 48,
        "size": "L",
        "color": "Ivory",
        "barcode": "764039280273"
      }
    ],
    "seo": {
      "title": "Flow Tank - Ivory | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Tank - Ivory. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-tank-ivory",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 97
  },
  {
    "id": "prod_aya_028",
    "handle": "flow-tank-stone",
    "title": "Flow Tank - Stone",
    "shortName": "Flow Tank",
    "sku": "AYA-TOP-STO-028",
    "barcode": "7640392810284",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-05-05T12:42:45.095Z",
    "createdAt": "2026-04-30T12:42:45.095Z",
    "updatedAt": "2026-07-27T19:54:45.095Z",
    "gender": "women",
    "category": "Tops",
    "subcategory": "Tank Tops",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Stone",
    "colorCode": "#8B8580",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 65,
    "compareAtPrice": null,
    "cost": 21,
    "weight": 180,
    "tags": [
      "women",
      "tops",
      "stone",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_028_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Flow Tank - Stone front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_028_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Flow Tank - Stone detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_028_xs",
        "sku": "AYA-TOP-STO-028-XS",
        "title": "XS / Stone",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 35,
        "size": "XS",
        "color": "Stone",
        "barcode": "764039280280"
      },
      {
        "id": "var_028_s",
        "sku": "AYA-TOP-STO-028-S",
        "title": "S / Stone",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 36,
        "size": "S",
        "color": "Stone",
        "barcode": "764039280281"
      },
      {
        "id": "var_028_m",
        "sku": "AYA-TOP-STO-028-M",
        "title": "M / Stone",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 18,
        "size": "M",
        "color": "Stone",
        "barcode": "764039280282"
      },
      {
        "id": "var_028_l",
        "sku": "AYA-TOP-STO-028-L",
        "title": "L / Stone",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 43,
        "size": "L",
        "color": "Stone",
        "barcode": "764039280283"
      }
    ],
    "seo": {
      "title": "Flow Tank - Stone | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Tank - Stone. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-tank-stone",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 98
  },
  {
    "id": "prod_aya_029",
    "handle": "flow-tank-clay",
    "title": "Flow Tank - Clay",
    "shortName": "Flow Tank",
    "sku": "AYA-TOP-CLA-029",
    "barcode": "7640392810294",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-05-02T12:42:45.095Z",
    "createdAt": "2026-04-27T12:42:45.095Z",
    "updatedAt": "2026-07-27T17:30:45.095Z",
    "gender": "women",
    "category": "Tops",
    "subcategory": "Tank Tops",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Clay",
    "colorCode": "#B87D68",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 70,
    "compareAtPrice": null,
    "cost": 22,
    "weight": 180,
    "tags": [
      "women",
      "tops",
      "clay",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_029_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Flow Tank - Clay front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_029_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Flow Tank - Clay detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_029_xs",
        "sku": "AYA-TOP-CLA-029-XS",
        "title": "XS / Clay",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 53,
        "size": "XS",
        "color": "Clay",
        "barcode": "764039280290"
      },
      {
        "id": "var_029_s",
        "sku": "AYA-TOP-CLA-029-S",
        "title": "S / Clay",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 31,
        "size": "S",
        "color": "Clay",
        "barcode": "764039280291"
      },
      {
        "id": "var_029_m",
        "sku": "AYA-TOP-CLA-029-M",
        "title": "M / Clay",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 52,
        "size": "M",
        "color": "Clay",
        "barcode": "764039280292"
      },
      {
        "id": "var_029_l",
        "sku": "AYA-TOP-CLA-029-L",
        "title": "L / Clay",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 35,
        "size": "L",
        "color": "Clay",
        "barcode": "764039280293"
      }
    ],
    "seo": {
      "title": "Flow Tank - Clay | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Tank - Clay. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-tank-clay",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 99
  },
  {
    "id": "prod_aya_030",
    "handle": "studio-tank-forest",
    "title": "Studio Tank - Forest",
    "shortName": "Studio Tank",
    "sku": "AYA-TOP-FOR-030",
    "barcode": "7640392810304",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-04-29T12:42:45.095Z",
    "createdAt": "2026-04-24T12:42:45.095Z",
    "updatedAt": "2026-07-27T15:06:45.095Z",
    "gender": "women",
    "category": "Tops",
    "subcategory": "Cropped Tanks",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Forest",
    "colorCode": "#2D3A2E",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 75,
    "compareAtPrice": null,
    "cost": 24,
    "weight": 180,
    "tags": [
      "women",
      "tops",
      "forest",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_030_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Studio Tank - Forest front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_030_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Studio Tank - Forest detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_030_xs",
        "sku": "AYA-TOP-FOR-030-XS",
        "title": "XS / Forest",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 45,
        "size": "XS",
        "color": "Forest",
        "barcode": "764039280300"
      },
      {
        "id": "var_030_s",
        "sku": "AYA-TOP-FOR-030-S",
        "title": "S / Forest",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 43,
        "size": "S",
        "color": "Forest",
        "barcode": "764039280301"
      },
      {
        "id": "var_030_m",
        "sku": "AYA-TOP-FOR-030-M",
        "title": "M / Forest",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 22,
        "size": "M",
        "color": "Forest",
        "barcode": "764039280302"
      },
      {
        "id": "var_030_l",
        "sku": "AYA-TOP-FOR-030-L",
        "title": "L / Forest",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 18,
        "size": "L",
        "color": "Forest",
        "barcode": "764039280303"
      }
    ],
    "seo": {
      "title": "Studio Tank - Forest | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Tank - Forest. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-tank-forest",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 100
  },
  {
    "id": "prod_aya_031",
    "handle": "studio-tank-sand",
    "title": "Studio Tank - Sand",
    "shortName": "Studio Tank",
    "sku": "AYA-TOP-SAN-031",
    "barcode": "7640392810314",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-04-26T12:42:45.095Z",
    "createdAt": "2026-04-21T12:42:45.095Z",
    "updatedAt": "2026-07-27T12:42:45.095Z",
    "gender": "women",
    "category": "Tops",
    "subcategory": "Cropped Tanks",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Sand",
    "colorCode": "#D5C5B5",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 75,
    "compareAtPrice": 94,
    "cost": 24,
    "weight": 180,
    "tags": [
      "women",
      "tops",
      "sand",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_031_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Studio Tank - Sand front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_031_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Studio Tank - Sand detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_031_xs",
        "sku": "AYA-TOP-SAN-031-XS",
        "title": "XS / Sand",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 17,
        "size": "XS",
        "color": "Sand",
        "barcode": "764039280310"
      },
      {
        "id": "var_031_s",
        "sku": "AYA-TOP-SAN-031-S",
        "title": "S / Sand",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 12,
        "size": "S",
        "color": "Sand",
        "barcode": "764039280311"
      },
      {
        "id": "var_031_m",
        "sku": "AYA-TOP-SAN-031-M",
        "title": "M / Sand",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 22,
        "size": "M",
        "color": "Sand",
        "barcode": "764039280312"
      },
      {
        "id": "var_031_l",
        "sku": "AYA-TOP-SAN-031-L",
        "title": "L / Sand",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 19,
        "size": "L",
        "color": "Sand",
        "barcode": "764039280313"
      }
    ],
    "seo": {
      "title": "Studio Tank - Sand | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Tank - Sand. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-tank-sand",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 95
  },
  {
    "id": "prod_aya_032",
    "handle": "studio-tank-ribbed-slate",
    "title": "Studio Tank - Ribbed - Slate",
    "shortName": "Studio Ribbed Tank",
    "sku": "AYA-TOP-SLA-032",
    "barcode": "7640392810324",
    "vendor": "AYA Studio",
    "status": "archived",
    "publishedAt": null,
    "createdAt": "2026-04-18T12:42:45.095Z",
    "updatedAt": "2026-07-27T10:18:45.095Z",
    "gender": "women",
    "category": "Tops",
    "subcategory": "Ribbed Tanks",
    "collection": "SS24 Core Collection",
    "season": "SS24",
    "color": "Slate",
    "colorCode": "#475569",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 80,
    "compareAtPrice": null,
    "cost": 26,
    "weight": 180,
    "tags": [
      "women",
      "tops",
      "slate",
      "ss24",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_032_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Studio Tank - Ribbed - Slate front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_032_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Studio Tank - Ribbed - Slate detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_032_xs",
        "sku": "AYA-TOP-SLA-032-XS",
        "title": "XS / Slate",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XS",
        "color": "Slate",
        "barcode": "764039280320"
      },
      {
        "id": "var_032_s",
        "sku": "AYA-TOP-SLA-032-S",
        "title": "S / Slate",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Slate",
        "barcode": "764039280321"
      },
      {
        "id": "var_032_m",
        "sku": "AYA-TOP-SLA-032-M",
        "title": "M / Slate",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Slate",
        "barcode": "764039280322"
      },
      {
        "id": "var_032_l",
        "sku": "AYA-TOP-SLA-032-L",
        "title": "L / Slate",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Slate",
        "barcode": "764039280323"
      }
    ],
    "seo": {
      "title": "Studio Tank - Ribbed - Slate | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Tank - Ribbed - Slate. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-tank-ribbed-slate",
      "score": 38,
      "issues": [
        "Discontinued product redirect missing",
        "Canonical tag pointing to obsolete URL"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 75
  },
  {
    "id": "prod_aya_033",
    "handle": "studio-tank-cropped-sage",
    "title": "Studio Tank - Cropped - Sage",
    "shortName": "Studio Crop Tank",
    "sku": "AYA-TOP-SAG-033",
    "barcode": "7640392810334",
    "vendor": "AYA Studio",
    "status": "draft",
    "publishedAt": null,
    "createdAt": "2026-04-15T12:42:45.095Z",
    "updatedAt": "2026-07-27T07:54:45.095Z",
    "gender": "women",
    "category": "Tops",
    "subcategory": "Cropped Tanks",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Sage",
    "colorCode": "#9CAF88",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 85,
    "compareAtPrice": null,
    "cost": 27,
    "weight": 180,
    "tags": [
      "women",
      "tops",
      "sage",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_033_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Studio Tank - Cropped - Sage front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_033_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Studio Tank - Cropped - Sage detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_033_xs",
        "sku": "AYA-TOP-SAG-033-XS",
        "title": "XS / Sage",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XS",
        "color": "Sage",
        "barcode": "764039280330"
      },
      {
        "id": "var_033_s",
        "sku": "AYA-TOP-SAG-033-S",
        "title": "S / Sage",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Sage",
        "barcode": "764039280331"
      },
      {
        "id": "var_033_m",
        "sku": "AYA-TOP-SAG-033-M",
        "title": "M / Sage",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Sage",
        "barcode": "764039280332"
      },
      {
        "id": "var_033_l",
        "sku": "AYA-TOP-SAG-033-L",
        "title": "L / Sage",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Sage",
        "barcode": "764039280333"
      }
    ],
    "seo": {
      "title": "Studio Tank - Cropped - Sage | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Tank - Cropped - Sage. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-tank-cropped-sage",
      "score": 57,
      "issues": [
        "Meta description is too short (under 120 characters)",
        "Product title missing primary target keyword",
        "Missing Alt text on gallery images"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 72
  },
  {
    "id": "prod_aya_034",
    "handle": "studio-shorts-7--noir",
    "title": "Studio Shorts - 7\" - Noir",
    "shortName": "Studio Shorts 7\"",
    "sku": "AYA-SHO-NOI-034",
    "barcode": "7640392810344",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-04-17T12:42:45.095Z",
    "createdAt": "2026-04-12T12:42:45.095Z",
    "updatedAt": "2026-07-27T05:30:45.095Z",
    "gender": "women",
    "category": "Shorts",
    "subcategory": "Biker Shorts",
    "collection": "Permanent Core Collection",
    "season": "Permanent",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 75,
    "compareAtPrice": null,
    "cost": 24,
    "weight": 180,
    "tags": [
      "women",
      "shorts",
      "noir",
      "permanent",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_034_1",
        "src": "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&q=80",
        "alt": "Studio Shorts - 7\" - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_034_2",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Studio Shorts - 7\" - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_034_xs",
        "sku": "AYA-SHO-NOI-034-XS",
        "title": "XS / Noir",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 38,
        "size": "XS",
        "color": "Noir",
        "barcode": "764039280340"
      },
      {
        "id": "var_034_s",
        "sku": "AYA-SHO-NOI-034-S",
        "title": "S / Noir",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 44,
        "size": "S",
        "color": "Noir",
        "barcode": "764039280341"
      },
      {
        "id": "var_034_m",
        "sku": "AYA-SHO-NOI-034-M",
        "title": "M / Noir",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 14,
        "size": "M",
        "color": "Noir",
        "barcode": "764039280342"
      },
      {
        "id": "var_034_l",
        "sku": "AYA-SHO-NOI-034-L",
        "title": "L / Noir",
        "price": 75,
        "compareAtPrice": null,
        "inventory": 18,
        "size": "L",
        "color": "Noir",
        "barcode": "764039280343"
      }
    ],
    "seo": {
      "title": "Studio Shorts - 7\" - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Shorts - 7\" - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-shorts-7--noir",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 98
  },
  {
    "id": "prod_aya_035",
    "handle": "studio-shorts-5--stone",
    "title": "Studio Shorts - 5\" - Stone",
    "shortName": "Studio Shorts 5\"",
    "sku": "AYA-SHO-STO-035",
    "barcode": "7640392810354",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-04-14T12:42:45.095Z",
    "createdAt": "2026-04-09T12:42:45.095Z",
    "updatedAt": "2026-07-27T03:06:45.095Z",
    "gender": "women",
    "category": "Shorts",
    "subcategory": "Biker Shorts",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Stone",
    "colorCode": "#8B8580",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 70,
    "compareAtPrice": null,
    "cost": 22,
    "weight": 180,
    "tags": [
      "women",
      "shorts",
      "stone",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_035_1",
        "src": "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&q=80",
        "alt": "Studio Shorts - 5\" - Stone front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_035_2",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Studio Shorts - 5\" - Stone detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_035_xs",
        "sku": "AYA-SHO-STO-035-XS",
        "title": "XS / Stone",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 53,
        "size": "XS",
        "color": "Stone",
        "barcode": "764039280350"
      },
      {
        "id": "var_035_s",
        "sku": "AYA-SHO-STO-035-S",
        "title": "S / Stone",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 37,
        "size": "S",
        "color": "Stone",
        "barcode": "764039280351"
      },
      {
        "id": "var_035_m",
        "sku": "AYA-SHO-STO-035-M",
        "title": "M / Stone",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 30,
        "size": "M",
        "color": "Stone",
        "barcode": "764039280352"
      },
      {
        "id": "var_035_l",
        "sku": "AYA-SHO-STO-035-L",
        "title": "L / Stone",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 35,
        "size": "L",
        "color": "Stone",
        "barcode": "764039280353"
      }
    ],
    "seo": {
      "title": "Studio Shorts - 5\" - Stone | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Shorts - 5\" - Stone. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-shorts-5--stone",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 99
  },
  {
    "id": "prod_aya_036",
    "handle": "studio-shorts-high-rise-clay",
    "title": "Studio Shorts - High Rise - Clay",
    "shortName": "Studio Shorts High",
    "sku": "AYA-SHO-CLA-036",
    "barcode": "7640392810364",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-04-11T12:42:45.095Z",
    "createdAt": "2026-04-06T12:42:45.095Z",
    "updatedAt": "2026-07-27T00:42:45.095Z",
    "gender": "women",
    "category": "Shorts",
    "subcategory": "Biker Shorts",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Clay",
    "colorCode": "#B87D68",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 80,
    "compareAtPrice": 100,
    "cost": 26,
    "weight": 180,
    "tags": [
      "women",
      "shorts",
      "clay",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_036_1",
        "src": "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&q=80",
        "alt": "Studio Shorts - High Rise - Clay front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_036_2",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Studio Shorts - High Rise - Clay detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_036_xs",
        "sku": "AYA-SHO-CLA-036-XS",
        "title": "XS / Clay",
        "price": 80,
        "compareAtPrice": 100,
        "inventory": 40,
        "size": "XS",
        "color": "Clay",
        "barcode": "764039280360"
      },
      {
        "id": "var_036_s",
        "sku": "AYA-SHO-CLA-036-S",
        "title": "S / Clay",
        "price": 80,
        "compareAtPrice": 100,
        "inventory": 29,
        "size": "S",
        "color": "Clay",
        "barcode": "764039280361"
      },
      {
        "id": "var_036_m",
        "sku": "AYA-SHO-CLA-036-M",
        "title": "M / Clay",
        "price": 80,
        "compareAtPrice": 100,
        "inventory": 37,
        "size": "M",
        "color": "Clay",
        "barcode": "764039280362"
      },
      {
        "id": "var_036_l",
        "sku": "AYA-SHO-CLA-036-L",
        "title": "L / Clay",
        "price": 80,
        "compareAtPrice": 100,
        "inventory": 13,
        "size": "L",
        "color": "Clay",
        "barcode": "764039280363"
      }
    ],
    "seo": {
      "title": "Studio Shorts - High Rise - Clay | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Shorts - High Rise - Clay. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-shorts-high-rise-clay",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 100
  },
  {
    "id": "prod_aya_037",
    "handle": "studio-shorts-seamless-forest",
    "title": "Studio Shorts - Seamless - Forest",
    "shortName": "Studio Shorts Seamless",
    "sku": "AYA-SHO-FOR-037",
    "barcode": "7640392810374",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-04-08T12:42:45.095Z",
    "createdAt": "2026-04-03T12:42:45.095Z",
    "updatedAt": "2026-07-26T22:18:45.095Z",
    "gender": "women",
    "category": "Shorts",
    "subcategory": "Running Shorts",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Forest",
    "colorCode": "#2D3A2E",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 85,
    "compareAtPrice": null,
    "cost": 27,
    "weight": 180,
    "tags": [
      "women",
      "shorts",
      "forest",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_037_1",
        "src": "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&q=80",
        "alt": "Studio Shorts - Seamless - Forest front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_037_2",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Studio Shorts - Seamless - Forest detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_037_xs",
        "sku": "AYA-SHO-FOR-037-XS",
        "title": "XS / Forest",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 52,
        "size": "XS",
        "color": "Forest",
        "barcode": "764039280370"
      },
      {
        "id": "var_037_s",
        "sku": "AYA-SHO-FOR-037-S",
        "title": "S / Forest",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 26,
        "size": "S",
        "color": "Forest",
        "barcode": "764039280371"
      },
      {
        "id": "var_037_m",
        "sku": "AYA-SHO-FOR-037-M",
        "title": "M / Forest",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 28,
        "size": "M",
        "color": "Forest",
        "barcode": "764039280372"
      },
      {
        "id": "var_037_l",
        "sku": "AYA-SHO-FOR-037-L",
        "title": "L / Forest",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 10,
        "size": "L",
        "color": "Forest",
        "barcode": "764039280373"
      }
    ],
    "seo": {
      "title": "Studio Shorts - Seamless - Forest | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Shorts - Seamless - Forest. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-shorts-seamless-forest",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 95
  },
  {
    "id": "prod_aya_038",
    "handle": "studio-shorts-sculpt-sand",
    "title": "Studio Shorts - Sculpt - Sand",
    "shortName": "Studio Shorts Sculpt",
    "sku": "AYA-SHO-SAN-038",
    "barcode": "7640392810384",
    "vendor": "AYA Studio",
    "status": "draft",
    "publishedAt": null,
    "createdAt": "2026-03-31T12:42:45.095Z",
    "updatedAt": "2026-07-26T19:54:45.095Z",
    "gender": "women",
    "category": "Shorts",
    "subcategory": "Biker Shorts",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Sand",
    "colorCode": "#D5C5B5",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 90,
    "compareAtPrice": null,
    "cost": 29,
    "weight": 180,
    "tags": [
      "women",
      "shorts",
      "sand",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_038_1",
        "src": "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&q=80",
        "alt": "Studio Shorts - Sculpt - Sand front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_038_2",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Studio Shorts - Sculpt - Sand detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_038_xs",
        "sku": "AYA-SHO-SAN-038-XS",
        "title": "XS / Sand",
        "price": 90,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XS",
        "color": "Sand",
        "barcode": "764039280380"
      },
      {
        "id": "var_038_s",
        "sku": "AYA-SHO-SAN-038-S",
        "title": "S / Sand",
        "price": 90,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Sand",
        "barcode": "764039280381"
      },
      {
        "id": "var_038_m",
        "sku": "AYA-SHO-SAN-038-M",
        "title": "M / Sand",
        "price": 90,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Sand",
        "barcode": "764039280382"
      },
      {
        "id": "var_038_l",
        "sku": "AYA-SHO-SAN-038-L",
        "title": "L / Sand",
        "price": 90,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Sand",
        "barcode": "764039280383"
      }
    ],
    "seo": {
      "title": "Studio Shorts - Sculpt - Sand | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Shorts - Sculpt - Sand. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-shorts-sculpt-sand",
      "score": 62,
      "issues": [
        "Meta description is too short (under 120 characters)",
        "Product title missing primary target keyword",
        "Missing Alt text on gallery images"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 77
  },
  {
    "id": "prod_aya_039",
    "handle": "flow-jacket-full-zip-noir",
    "title": "Flow Jacket - Full Zip - Noir",
    "shortName": "Flow Jacket Zip",
    "sku": "AYA-OUT-NOI-039",
    "barcode": "7640392810394",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-04-02T12:42:45.095Z",
    "createdAt": "2026-03-28T12:42:45.095Z",
    "updatedAt": "2026-07-26T17:30:45.095Z",
    "gender": "women",
    "category": "Outerwear",
    "subcategory": "Zip Jackets",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "88% Recycled Polyester, 12% Elastane with DWR Finish",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 165,
    "compareAtPrice": null,
    "cost": 53,
    "weight": 520,
    "tags": [
      "women",
      "outerwear",
      "noir",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_039_1",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Flow Jacket - Full Zip - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_039_2",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Flow Jacket - Full Zip - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_039_xs",
        "sku": "AYA-OUT-NOI-039-XS",
        "title": "XS / Noir",
        "price": 165,
        "compareAtPrice": null,
        "inventory": 14,
        "size": "XS",
        "color": "Noir",
        "barcode": "764039280390"
      },
      {
        "id": "var_039_s",
        "sku": "AYA-OUT-NOI-039-S",
        "title": "S / Noir",
        "price": 165,
        "compareAtPrice": null,
        "inventory": 21,
        "size": "S",
        "color": "Noir",
        "barcode": "764039280391"
      },
      {
        "id": "var_039_m",
        "sku": "AYA-OUT-NOI-039-M",
        "title": "M / Noir",
        "price": 165,
        "compareAtPrice": null,
        "inventory": 43,
        "size": "M",
        "color": "Noir",
        "barcode": "764039280392"
      },
      {
        "id": "var_039_l",
        "sku": "AYA-OUT-NOI-039-L",
        "title": "L / Noir",
        "price": 165,
        "compareAtPrice": null,
        "inventory": 36,
        "size": "L",
        "color": "Noir",
        "barcode": "764039280393"
      }
    ],
    "seo": {
      "title": "Flow Jacket - Full Zip - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Jacket - Full Zip - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-jacket-full-zip-noir",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 97
  },
  {
    "id": "prod_aya_040",
    "handle": "flow-jacket-cropped-zip-ivory",
    "title": "Flow Jacket - Cropped Zip - Ivory",
    "shortName": "Flow Jacket Crop",
    "sku": "AYA-OUT-IVO-040",
    "barcode": "7640392810404",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-03-30T12:42:45.095Z",
    "createdAt": "2026-03-25T12:42:45.095Z",
    "updatedAt": "2026-07-26T15:06:45.095Z",
    "gender": "women",
    "category": "Outerwear",
    "subcategory": "Zip Jackets",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Ivory",
    "colorCode": "#FDFBF7",
    "material": "88% Recycled Polyester, 12% Elastane with DWR Finish",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 155,
    "compareAtPrice": null,
    "cost": 50,
    "weight": 520,
    "tags": [
      "women",
      "outerwear",
      "ivory",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_040_1",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Flow Jacket - Cropped Zip - Ivory front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_040_2",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Flow Jacket - Cropped Zip - Ivory detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_040_xs",
        "sku": "AYA-OUT-IVO-040-XS",
        "title": "XS / Ivory",
        "price": 155,
        "compareAtPrice": null,
        "inventory": 54,
        "size": "XS",
        "color": "Ivory",
        "barcode": "764039280400"
      },
      {
        "id": "var_040_s",
        "sku": "AYA-OUT-IVO-040-S",
        "title": "S / Ivory",
        "price": 155,
        "compareAtPrice": null,
        "inventory": 13,
        "size": "S",
        "color": "Ivory",
        "barcode": "764039280401"
      },
      {
        "id": "var_040_m",
        "sku": "AYA-OUT-IVO-040-M",
        "title": "M / Ivory",
        "price": 155,
        "compareAtPrice": null,
        "inventory": 32,
        "size": "M",
        "color": "Ivory",
        "barcode": "764039280402"
      },
      {
        "id": "var_040_l",
        "sku": "AYA-OUT-IVO-040-L",
        "title": "L / Ivory",
        "price": 155,
        "compareAtPrice": null,
        "inventory": 26,
        "size": "L",
        "color": "Ivory",
        "barcode": "764039280403"
      }
    ],
    "seo": {
      "title": "Flow Jacket - Cropped Zip - Ivory | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Jacket - Cropped Zip - Ivory. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-jacket-cropped-zip-ivory",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 98
  },
  {
    "id": "prod_aya_041",
    "handle": "flow-jacket-hybrid-slate",
    "title": "Flow Jacket - Hybrid - Slate",
    "shortName": "Flow Jacket Hybrid",
    "sku": "AYA-ACC-SLA-041",
    "barcode": "7640392810414",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-03-27T12:42:45.095Z",
    "createdAt": "2026-03-22T12:42:45.095Z",
    "updatedAt": "2026-07-26T12:42:45.095Z",
    "gender": "women",
    "category": "Accessories",
    "subcategory": "Outerwear",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Slate",
    "colorCode": "#475569",
    "material": "82% Organic Cotton, 15% Polyamide, 3% Elastane",
    "sizes": [
      "ONE SIZE"
    ],
    "price": 185,
    "compareAtPrice": 231,
    "cost": 59,
    "weight": 450,
    "tags": [
      "women",
      "accessories",
      "slate",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_041_1",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Flow Jacket - Hybrid - Slate front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_041_2",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Flow Jacket - Hybrid - Slate detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_041_one size",
        "sku": "AYA-ACC-SLA-041-ONE SIZE",
        "title": "ONE SIZE / Slate",
        "price": 185,
        "compareAtPrice": 231,
        "inventory": 23,
        "size": "ONE SIZE",
        "color": "Slate",
        "barcode": "764039280410"
      }
    ],
    "seo": {
      "title": "Flow Jacket - Hybrid - Slate | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Jacket - Hybrid - Slate. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-jacket-hybrid-slate",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 99
  },
  {
    "id": "prod_aya_042",
    "handle": "flow-jacket-windbreaker-stone",
    "title": "Flow Jacket - Windbreaker - Stone",
    "shortName": "Flow Windbreaker",
    "sku": "AYA-OUT-STO-042",
    "barcode": "7640392810424",
    "vendor": "AYA Studio",
    "status": "archived",
    "publishedAt": null,
    "createdAt": "2026-03-19T12:42:45.095Z",
    "updatedAt": "2026-07-26T10:18:45.095Z",
    "gender": "women",
    "category": "Outerwear",
    "subcategory": "Windbreakers",
    "collection": "AW24 Core Collection",
    "season": "AW24",
    "color": "Stone",
    "colorCode": "#8B8580",
    "material": "88% Recycled Polyester, 12% Elastane with DWR Finish",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 145,
    "compareAtPrice": null,
    "cost": 46,
    "weight": 520,
    "tags": [
      "women",
      "outerwear",
      "stone",
      "aw24",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_042_1",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Flow Jacket - Windbreaker - Stone front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_042_2",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Flow Jacket - Windbreaker - Stone detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_042_xs",
        "sku": "AYA-OUT-STO-042-XS",
        "title": "XS / Stone",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XS",
        "color": "Stone",
        "barcode": "764039280420"
      },
      {
        "id": "var_042_s",
        "sku": "AYA-OUT-STO-042-S",
        "title": "S / Stone",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Stone",
        "barcode": "764039280421"
      },
      {
        "id": "var_042_m",
        "sku": "AYA-OUT-STO-042-M",
        "title": "M / Stone",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Stone",
        "barcode": "764039280422"
      },
      {
        "id": "var_042_l",
        "sku": "AYA-OUT-STO-042-L",
        "title": "L / Stone",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Stone",
        "barcode": "764039280423"
      }
    ],
    "seo": {
      "title": "Flow Jacket - Windbreaker - Stone | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Jacket - Windbreaker - Stone. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-jacket-windbreaker-stone",
      "score": 38,
      "issues": [
        "Discontinued product redirect missing",
        "Canonical tag pointing to obsolete URL"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 75
  },
  {
    "id": "prod_aya_043",
    "handle": "flow-jacket-thermal-forest",
    "title": "Flow Jacket - Thermal - Forest",
    "shortName": "Flow Thermal Jacket",
    "sku": "AYA-OUT-FOR-043",
    "barcode": "7640392810434",
    "vendor": "AYA Studio",
    "status": "draft",
    "publishedAt": null,
    "createdAt": "2026-03-16T12:42:45.095Z",
    "updatedAt": "2026-07-26T07:54:45.095Z",
    "gender": "women",
    "category": "Outerwear",
    "subcategory": "Thermal Jackets",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Forest",
    "colorCode": "#2D3A2E",
    "material": "88% Recycled Polyester, 12% Elastane with DWR Finish",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "price": 195,
    "compareAtPrice": null,
    "cost": 62,
    "weight": 520,
    "tags": [
      "women",
      "outerwear",
      "forest",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_043_1",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Flow Jacket - Thermal - Forest front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_043_2",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "Flow Jacket - Thermal - Forest detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_043_xs",
        "sku": "AYA-OUT-FOR-043-XS",
        "title": "XS / Forest",
        "price": 195,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XS",
        "color": "Forest",
        "barcode": "764039280430"
      },
      {
        "id": "var_043_s",
        "sku": "AYA-OUT-FOR-043-S",
        "title": "S / Forest",
        "price": 195,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Forest",
        "barcode": "764039280431"
      },
      {
        "id": "var_043_m",
        "sku": "AYA-OUT-FOR-043-M",
        "title": "M / Forest",
        "price": 195,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Forest",
        "barcode": "764039280432"
      },
      {
        "id": "var_043_l",
        "sku": "AYA-OUT-FOR-043-L",
        "title": "L / Forest",
        "price": 195,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Forest",
        "barcode": "764039280433"
      }
    ],
    "seo": {
      "title": "Flow Jacket - Thermal - Forest | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Jacket - Thermal - Forest. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-jacket-thermal-forest",
      "score": 47,
      "issues": [
        "Meta description is too short (under 120 characters)",
        "Product title missing primary target keyword",
        "Missing Alt text on gallery images"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 62
  },
  {
    "id": "prod_aya_044",
    "handle": "active-shorts-7-unlined-noir",
    "title": "Active Shorts - 7\" Unlined - Noir",
    "shortName": "Active Shorts 7\"",
    "sku": "AYA-SHO-NOI-044",
    "barcode": "7640392810444",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-03-18T12:42:45.095Z",
    "createdAt": "2026-03-13T12:42:45.095Z",
    "updatedAt": "2026-07-26T05:30:45.095Z",
    "gender": "men",
    "category": "Shorts",
    "subcategory": "Training Shorts",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 80,
    "compareAtPrice": null,
    "cost": 26,
    "weight": 180,
    "tags": [
      "men",
      "shorts",
      "noir",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_044_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Active Shorts - 7\" Unlined - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_044_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Active Shorts - 7\" Unlined - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_044_s",
        "sku": "AYA-SHO-NOI-044-S",
        "title": "S / Noir",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 34,
        "size": "S",
        "color": "Noir",
        "barcode": "764039280440"
      },
      {
        "id": "var_044_m",
        "sku": "AYA-SHO-NOI-044-M",
        "title": "M / Noir",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 30,
        "size": "M",
        "color": "Noir",
        "barcode": "764039280441"
      },
      {
        "id": "var_044_l",
        "sku": "AYA-SHO-NOI-044-L",
        "title": "L / Noir",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 39,
        "size": "L",
        "color": "Noir",
        "barcode": "764039280442"
      },
      {
        "id": "var_044_xl",
        "sku": "AYA-SHO-NOI-044-XL",
        "title": "XL / Noir",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 29,
        "size": "XL",
        "color": "Noir",
        "barcode": "764039280443"
      },
      {
        "id": "var_044_xxl",
        "sku": "AYA-SHO-NOI-044-XXL",
        "title": "XXL / Noir",
        "price": 80,
        "compareAtPrice": null,
        "inventory": 41,
        "size": "XXL",
        "color": "Noir",
        "barcode": "764039280444"
      }
    ],
    "seo": {
      "title": "Active Shorts - 7\" Unlined - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Active Shorts - 7\" Unlined - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "active-shorts-7-unlined-noir",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 96
  },
  {
    "id": "prod_aya_045",
    "handle": "active-shorts-5-lined-slate",
    "title": "Active Shorts - 5\" Lined - Slate",
    "shortName": "Active Shorts 5\"",
    "sku": "AYA-SHO-SLA-045",
    "barcode": "7640392810454",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-03-15T12:42:45.095Z",
    "createdAt": "2026-03-10T12:42:45.095Z",
    "updatedAt": "2026-07-26T03:06:45.095Z",
    "gender": "men",
    "category": "Shorts",
    "subcategory": "Lined Shorts",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Slate",
    "colorCode": "#475569",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 85,
    "compareAtPrice": null,
    "cost": 27,
    "weight": 180,
    "tags": [
      "men",
      "shorts",
      "slate",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_045_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Active Shorts - 5\" Lined - Slate front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_045_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Active Shorts - 5\" Lined - Slate detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_045_s",
        "sku": "AYA-SHO-SLA-045-S",
        "title": "S / Slate",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 19,
        "size": "S",
        "color": "Slate",
        "barcode": "764039280450"
      },
      {
        "id": "var_045_m",
        "sku": "AYA-SHO-SLA-045-M",
        "title": "M / Slate",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 48,
        "size": "M",
        "color": "Slate",
        "barcode": "764039280451"
      },
      {
        "id": "var_045_l",
        "sku": "AYA-SHO-SLA-045-L",
        "title": "L / Slate",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 30,
        "size": "L",
        "color": "Slate",
        "barcode": "764039280452"
      },
      {
        "id": "var_045_xl",
        "sku": "AYA-SHO-SLA-045-XL",
        "title": "XL / Slate",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 22,
        "size": "XL",
        "color": "Slate",
        "barcode": "764039280453"
      },
      {
        "id": "var_045_xxl",
        "sku": "AYA-SHO-SLA-045-XXL",
        "title": "XXL / Slate",
        "price": 85,
        "compareAtPrice": null,
        "inventory": 36,
        "size": "XXL",
        "color": "Slate",
        "barcode": "764039280454"
      }
    ],
    "seo": {
      "title": "Active Shorts - 5\" Lined - Slate | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Active Shorts - 5\" Lined - Slate. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "active-shorts-5-lined-slate",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 97
  },
  {
    "id": "prod_aya_046",
    "handle": "active-shorts-performance-stone",
    "title": "Active Shorts - Performance - Stone",
    "shortName": "Active Performance",
    "sku": "AYA-SHO-STO-046",
    "barcode": "7640392810464",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-03-12T12:42:45.095Z",
    "createdAt": "2026-03-07T12:42:45.095Z",
    "updatedAt": "2026-07-26T00:42:45.095Z",
    "gender": "men",
    "category": "Shorts",
    "subcategory": "Training Shorts",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Stone",
    "colorCode": "#8B8580",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 75,
    "compareAtPrice": 94,
    "cost": 24,
    "weight": 180,
    "tags": [
      "men",
      "shorts",
      "stone",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_046_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Active Shorts - Performance - Stone front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_046_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Active Shorts - Performance - Stone detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_046_s",
        "sku": "AYA-SHO-STO-046-S",
        "title": "S / Stone",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 12,
        "size": "S",
        "color": "Stone",
        "barcode": "764039280460"
      },
      {
        "id": "var_046_m",
        "sku": "AYA-SHO-STO-046-M",
        "title": "M / Stone",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 14,
        "size": "M",
        "color": "Stone",
        "barcode": "764039280461"
      },
      {
        "id": "var_046_l",
        "sku": "AYA-SHO-STO-046-L",
        "title": "L / Stone",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 15,
        "size": "L",
        "color": "Stone",
        "barcode": "764039280462"
      },
      {
        "id": "var_046_xl",
        "sku": "AYA-SHO-STO-046-XL",
        "title": "XL / Stone",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 26,
        "size": "XL",
        "color": "Stone",
        "barcode": "764039280463"
      },
      {
        "id": "var_046_xxl",
        "sku": "AYA-SHO-STO-046-XXL",
        "title": "XXL / Stone",
        "price": 75,
        "compareAtPrice": 94,
        "inventory": 28,
        "size": "XXL",
        "color": "Stone",
        "barcode": "764039280464"
      }
    ],
    "seo": {
      "title": "Active Shorts - Performance - Stone | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Active Shorts - Performance - Stone. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "active-shorts-performance-stone",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 98
  },
  {
    "id": "prod_aya_047",
    "handle": "active-shorts-pro-clay",
    "title": "Active Shorts - Pro - Clay",
    "shortName": "Active Shorts Pro",
    "sku": "AYA-SHO-CLA-047",
    "barcode": "7640392810474",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-03-09T12:42:45.095Z",
    "createdAt": "2026-03-04T12:42:45.095Z",
    "updatedAt": "2026-07-25T22:18:45.095Z",
    "gender": "men",
    "category": "Shorts",
    "subcategory": "Training Shorts",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Clay",
    "colorCode": "#B87D68",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 90,
    "compareAtPrice": null,
    "cost": 29,
    "weight": 180,
    "tags": [
      "men",
      "shorts",
      "clay",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_047_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Active Shorts - Pro - Clay front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_047_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Active Shorts - Pro - Clay detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_047_s",
        "sku": "AYA-SHO-CLA-047-S",
        "title": "S / Clay",
        "price": 90,
        "compareAtPrice": null,
        "inventory": 24,
        "size": "S",
        "color": "Clay",
        "barcode": "764039280470"
      },
      {
        "id": "var_047_m",
        "sku": "AYA-SHO-CLA-047-M",
        "title": "M / Clay",
        "price": 90,
        "compareAtPrice": null,
        "inventory": 40,
        "size": "M",
        "color": "Clay",
        "barcode": "764039280471"
      },
      {
        "id": "var_047_l",
        "sku": "AYA-SHO-CLA-047-L",
        "title": "L / Clay",
        "price": 90,
        "compareAtPrice": null,
        "inventory": 28,
        "size": "L",
        "color": "Clay",
        "barcode": "764039280472"
      },
      {
        "id": "var_047_xl",
        "sku": "AYA-SHO-CLA-047-XL",
        "title": "XL / Clay",
        "price": 90,
        "compareAtPrice": null,
        "inventory": 39,
        "size": "XL",
        "color": "Clay",
        "barcode": "764039280473"
      },
      {
        "id": "var_047_xxl",
        "sku": "AYA-SHO-CLA-047-XXL",
        "title": "XXL / Clay",
        "price": 90,
        "compareAtPrice": null,
        "inventory": 49,
        "size": "XXL",
        "color": "Clay",
        "barcode": "764039280474"
      }
    ],
    "seo": {
      "title": "Active Shorts - Pro - Clay | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Active Shorts - Pro - Clay. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "active-shorts-pro-clay",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 99
  },
  {
    "id": "prod_aya_048",
    "handle": "active-shorts-trail-forest",
    "title": "Active Shorts - Trail - Forest",
    "shortName": "Active Trail Shorts",
    "sku": "AYA-SHO-FOR-048",
    "barcode": "7640392810484",
    "vendor": "AYA Studio",
    "status": "draft",
    "publishedAt": null,
    "createdAt": "2026-03-01T12:42:45.095Z",
    "updatedAt": "2026-07-25T19:54:45.095Z",
    "gender": "men",
    "category": "Shorts",
    "subcategory": "Outdoor Shorts",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Forest",
    "colorCode": "#2D3A2E",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 95,
    "compareAtPrice": null,
    "cost": 30,
    "weight": 180,
    "tags": [
      "men",
      "shorts",
      "forest",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_048_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Active Shorts - Trail - Forest front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_048_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Active Shorts - Trail - Forest detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_048_s",
        "sku": "AYA-SHO-FOR-048-S",
        "title": "S / Forest",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Forest",
        "barcode": "764039280480"
      },
      {
        "id": "var_048_m",
        "sku": "AYA-SHO-FOR-048-M",
        "title": "M / Forest",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Forest",
        "barcode": "764039280481"
      },
      {
        "id": "var_048_l",
        "sku": "AYA-SHO-FOR-048-L",
        "title": "L / Forest",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Forest",
        "barcode": "764039280482"
      },
      {
        "id": "var_048_xl",
        "sku": "AYA-SHO-FOR-048-XL",
        "title": "XL / Forest",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XL",
        "color": "Forest",
        "barcode": "764039280483"
      },
      {
        "id": "var_048_xxl",
        "sku": "AYA-SHO-FOR-048-XXL",
        "title": "XXL / Forest",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XXL",
        "color": "Forest",
        "barcode": "764039280484"
      }
    ],
    "seo": {
      "title": "Active Shorts - Trail - Forest | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Active Shorts - Trail - Forest. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "active-shorts-trail-forest",
      "score": 52,
      "issues": [
        "Meta description is too short (under 120 characters)",
        "Product title missing primary target keyword",
        "Missing Alt text on gallery images"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 67
  },
  {
    "id": "prod_aya_049",
    "handle": "studio-top-seamless-crew-noir",
    "title": "Studio Top - Seamless Crew - Noir",
    "shortName": "Studio Crew Top",
    "sku": "AYA-TOP-NOI-049",
    "barcode": "7640392810494",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-03-03T12:42:45.095Z",
    "createdAt": "2026-02-26T12:42:45.095Z",
    "updatedAt": "2026-07-25T17:30:45.095Z",
    "gender": "men",
    "category": "Tops",
    "subcategory": "Performance Tees",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 70,
    "compareAtPrice": null,
    "cost": 22,
    "weight": 180,
    "tags": [
      "men",
      "tops",
      "noir",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_049_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Studio Top - Seamless Crew - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_049_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Studio Top - Seamless Crew - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_049_s",
        "sku": "AYA-TOP-NOI-049-S",
        "title": "S / Noir",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 47,
        "size": "S",
        "color": "Noir",
        "barcode": "764039280490"
      },
      {
        "id": "var_049_m",
        "sku": "AYA-TOP-NOI-049-M",
        "title": "M / Noir",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 54,
        "size": "M",
        "color": "Noir",
        "barcode": "764039280491"
      },
      {
        "id": "var_049_l",
        "sku": "AYA-TOP-NOI-049-L",
        "title": "L / Noir",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 12,
        "size": "L",
        "color": "Noir",
        "barcode": "764039280492"
      },
      {
        "id": "var_049_xl",
        "sku": "AYA-TOP-NOI-049-XL",
        "title": "XL / Noir",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 30,
        "size": "XL",
        "color": "Noir",
        "barcode": "764039280493"
      },
      {
        "id": "var_049_xxl",
        "sku": "AYA-TOP-NOI-049-XXL",
        "title": "XXL / Noir",
        "price": 70,
        "compareAtPrice": null,
        "inventory": 31,
        "size": "XXL",
        "color": "Noir",
        "barcode": "764039280494"
      }
    ],
    "seo": {
      "title": "Studio Top - Seamless Crew - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Top - Seamless Crew - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-top-seamless-crew-noir",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 95
  },
  {
    "id": "prod_aya_050",
    "handle": "studio-top-tech-tee-slate",
    "title": "Studio Top - Tech Tee - Slate",
    "shortName": "Studio Tech Tee",
    "sku": "AYA-TOP-SLA-050",
    "barcode": "7640392810504",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-02-28T12:42:45.095Z",
    "createdAt": "2026-02-23T12:42:45.095Z",
    "updatedAt": "2026-07-25T15:06:45.095Z",
    "gender": "men",
    "category": "Tops",
    "subcategory": "Performance Tees",
    "collection": "SS25 Core Collection",
    "season": "SS25",
    "color": "Slate",
    "colorCode": "#475569",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 65,
    "compareAtPrice": null,
    "cost": 21,
    "weight": 180,
    "tags": [
      "men",
      "tops",
      "slate",
      "ss25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_050_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Studio Top - Tech Tee - Slate front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_050_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Studio Top - Tech Tee - Slate detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_050_s",
        "sku": "AYA-TOP-SLA-050-S",
        "title": "S / Slate",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 25,
        "size": "S",
        "color": "Slate",
        "barcode": "764039280500"
      },
      {
        "id": "var_050_m",
        "sku": "AYA-TOP-SLA-050-M",
        "title": "M / Slate",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 26,
        "size": "M",
        "color": "Slate",
        "barcode": "764039280501"
      },
      {
        "id": "var_050_l",
        "sku": "AYA-TOP-SLA-050-L",
        "title": "L / Slate",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 54,
        "size": "L",
        "color": "Slate",
        "barcode": "764039280502"
      },
      {
        "id": "var_050_xl",
        "sku": "AYA-TOP-SLA-050-XL",
        "title": "XL / Slate",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 11,
        "size": "XL",
        "color": "Slate",
        "barcode": "764039280503"
      },
      {
        "id": "var_050_xxl",
        "sku": "AYA-TOP-SLA-050-XXL",
        "title": "XXL / Slate",
        "price": 65,
        "compareAtPrice": null,
        "inventory": 37,
        "size": "XXL",
        "color": "Slate",
        "barcode": "764039280504"
      }
    ],
    "seo": {
      "title": "Studio Top - Tech Tee - Slate | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Top - Tech Tee - Slate. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-top-tech-tee-slate",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 96
  },
  {
    "id": "prod_aya_051",
    "handle": "studio-top-long-sleeve-stone",
    "title": "Studio Top - Long Sleeve - Stone",
    "shortName": "Studio LS Top",
    "sku": "AYA-TOP-STO-051",
    "barcode": "7640392810514",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-02-25T12:42:45.095Z",
    "createdAt": "2026-02-20T12:42:45.095Z",
    "updatedAt": "2026-07-25T12:42:45.095Z",
    "gender": "men",
    "category": "Tops",
    "subcategory": "Long Sleeve Tops",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Stone",
    "colorCode": "#8B8580",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 85,
    "compareAtPrice": 106,
    "cost": 27,
    "weight": 180,
    "tags": [
      "men",
      "tops",
      "stone",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_051_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Studio Top - Long Sleeve - Stone front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_051_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Studio Top - Long Sleeve - Stone detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_051_s",
        "sku": "AYA-TOP-STO-051-S",
        "title": "S / Stone",
        "price": 85,
        "compareAtPrice": 106,
        "inventory": 45,
        "size": "S",
        "color": "Stone",
        "barcode": "764039280510"
      },
      {
        "id": "var_051_m",
        "sku": "AYA-TOP-STO-051-M",
        "title": "M / Stone",
        "price": 85,
        "compareAtPrice": 106,
        "inventory": 46,
        "size": "M",
        "color": "Stone",
        "barcode": "764039280511"
      },
      {
        "id": "var_051_l",
        "sku": "AYA-TOP-STO-051-L",
        "title": "L / Stone",
        "price": 85,
        "compareAtPrice": 106,
        "inventory": 46,
        "size": "L",
        "color": "Stone",
        "barcode": "764039280512"
      },
      {
        "id": "var_051_xl",
        "sku": "AYA-TOP-STO-051-XL",
        "title": "XL / Stone",
        "price": 85,
        "compareAtPrice": 106,
        "inventory": 29,
        "size": "XL",
        "color": "Stone",
        "barcode": "764039280513"
      },
      {
        "id": "var_051_xxl",
        "sku": "AYA-TOP-STO-051-XXL",
        "title": "XXL / Stone",
        "price": 85,
        "compareAtPrice": 106,
        "inventory": 14,
        "size": "XXL",
        "color": "Stone",
        "barcode": "764039280514"
      }
    ],
    "seo": {
      "title": "Studio Top - Long Sleeve - Stone | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Top - Long Sleeve - Stone. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-top-long-sleeve-stone",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 97
  },
  {
    "id": "prod_aya_052",
    "handle": "studio-top-zip-neck-forest",
    "title": "Studio Top - Zip Neck - Forest",
    "shortName": "Studio Half-Zip",
    "sku": "AYA-TOP-FOR-052",
    "barcode": "7640392810524",
    "vendor": "AYA Studio",
    "status": "draft",
    "publishedAt": null,
    "createdAt": "2026-02-17T12:42:45.095Z",
    "updatedAt": "2026-07-25T10:18:45.095Z",
    "gender": "men",
    "category": "Tops",
    "subcategory": "Zip Tops",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Forest",
    "colorCode": "#2D3A2E",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 95,
    "compareAtPrice": null,
    "cost": 30,
    "weight": 180,
    "tags": [
      "men",
      "tops",
      "forest",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_052_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Studio Top - Zip Neck - Forest front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_052_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Studio Top - Zip Neck - Forest detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_052_s",
        "sku": "AYA-TOP-FOR-052-S",
        "title": "S / Forest",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Forest",
        "barcode": "764039280520"
      },
      {
        "id": "var_052_m",
        "sku": "AYA-TOP-FOR-052-M",
        "title": "M / Forest",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Forest",
        "barcode": "764039280521"
      },
      {
        "id": "var_052_l",
        "sku": "AYA-TOP-FOR-052-L",
        "title": "L / Forest",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Forest",
        "barcode": "764039280522"
      },
      {
        "id": "var_052_xl",
        "sku": "AYA-TOP-FOR-052-XL",
        "title": "XL / Forest",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XL",
        "color": "Forest",
        "barcode": "764039280523"
      },
      {
        "id": "var_052_xxl",
        "sku": "AYA-TOP-FOR-052-XXL",
        "title": "XXL / Forest",
        "price": 95,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XXL",
        "color": "Forest",
        "barcode": "764039280524"
      }
    ],
    "seo": {
      "title": "Studio Top - Zip Neck - Forest | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Top - Zip Neck - Forest. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-top-zip-neck-forest",
      "score": 56,
      "issues": [
        "Meta description is too short (under 120 characters)",
        "Product title missing primary target keyword",
        "Missing Alt text on gallery images"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 71
  },
  {
    "id": "prod_aya_053",
    "handle": "flow-jogger-tapered-noir",
    "title": "Flow Jogger - Tapered - Noir",
    "shortName": "Flow Jogger Tapered",
    "sku": "AYA-PAN-NOI-053",
    "barcode": "7640392810534",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-02-19T12:42:45.095Z",
    "createdAt": "2026-02-14T12:42:45.095Z",
    "updatedAt": "2026-07-25T07:54:45.095Z",
    "gender": "men",
    "category": "Pants",
    "subcategory": "Joggers",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 135,
    "compareAtPrice": null,
    "cost": 43,
    "weight": 180,
    "tags": [
      "men",
      "pants",
      "noir",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_053_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Flow Jogger - Tapered - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_053_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Flow Jogger - Tapered - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_053_s",
        "sku": "AYA-PAN-NOI-053-S",
        "title": "S / Noir",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 36,
        "size": "S",
        "color": "Noir",
        "barcode": "764039280530"
      },
      {
        "id": "var_053_m",
        "sku": "AYA-PAN-NOI-053-M",
        "title": "M / Noir",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 16,
        "size": "M",
        "color": "Noir",
        "barcode": "764039280531"
      },
      {
        "id": "var_053_l",
        "sku": "AYA-PAN-NOI-053-L",
        "title": "L / Noir",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 10,
        "size": "L",
        "color": "Noir",
        "barcode": "764039280532"
      },
      {
        "id": "var_053_xl",
        "sku": "AYA-PAN-NOI-053-XL",
        "title": "XL / Noir",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 22,
        "size": "XL",
        "color": "Noir",
        "barcode": "764039280533"
      },
      {
        "id": "var_053_xxl",
        "sku": "AYA-PAN-NOI-053-XXL",
        "title": "XXL / Noir",
        "price": 135,
        "compareAtPrice": null,
        "inventory": 17,
        "size": "XXL",
        "color": "Noir",
        "barcode": "764039280534"
      }
    ],
    "seo": {
      "title": "Flow Jogger - Tapered - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Jogger - Tapered - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-jogger-tapered-noir",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 99
  },
  {
    "id": "prod_aya_054",
    "handle": "flow-jogger-essential-slate",
    "title": "Flow Jogger - Essential - Slate",
    "shortName": "Flow Jogger Essential",
    "sku": "AYA-PAN-SLA-054",
    "barcode": "7640392810544",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-02-16T12:42:45.095Z",
    "createdAt": "2026-02-11T12:42:45.095Z",
    "updatedAt": "2026-07-25T05:30:45.095Z",
    "gender": "men",
    "category": "Pants",
    "subcategory": "Joggers",
    "collection": "Permanent Core Collection",
    "season": "Permanent",
    "color": "Slate",
    "colorCode": "#475569",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 125,
    "compareAtPrice": null,
    "cost": 40,
    "weight": 180,
    "tags": [
      "men",
      "pants",
      "slate",
      "permanent",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_054_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Flow Jogger - Essential - Slate front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_054_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Flow Jogger - Essential - Slate detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_054_s",
        "sku": "AYA-PAN-SLA-054-S",
        "title": "S / Slate",
        "price": 125,
        "compareAtPrice": null,
        "inventory": 12,
        "size": "S",
        "color": "Slate",
        "barcode": "764039280540"
      },
      {
        "id": "var_054_m",
        "sku": "AYA-PAN-SLA-054-M",
        "title": "M / Slate",
        "price": 125,
        "compareAtPrice": null,
        "inventory": 52,
        "size": "M",
        "color": "Slate",
        "barcode": "764039280541"
      },
      {
        "id": "var_054_l",
        "sku": "AYA-PAN-SLA-054-L",
        "title": "L / Slate",
        "price": 125,
        "compareAtPrice": null,
        "inventory": 53,
        "size": "L",
        "color": "Slate",
        "barcode": "764039280542"
      },
      {
        "id": "var_054_xl",
        "sku": "AYA-PAN-SLA-054-XL",
        "title": "XL / Slate",
        "price": 125,
        "compareAtPrice": null,
        "inventory": 14,
        "size": "XL",
        "color": "Slate",
        "barcode": "764039280543"
      },
      {
        "id": "var_054_xxl",
        "sku": "AYA-PAN-SLA-054-XXL",
        "title": "XXL / Slate",
        "price": 125,
        "compareAtPrice": null,
        "inventory": 51,
        "size": "XXL",
        "color": "Slate",
        "barcode": "764039280544"
      }
    ],
    "seo": {
      "title": "Flow Jogger - Essential - Slate | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Jogger - Essential - Slate. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-jogger-essential-slate",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 100
  },
  {
    "id": "prod_aya_055",
    "handle": "flow-jogger-tech-stone",
    "title": "Flow Jogger - Tech - Stone",
    "shortName": "Flow Tech Jogger",
    "sku": "AYA-PAN-STO-055",
    "barcode": "7640392810554",
    "vendor": "AYA Studio",
    "status": "draft",
    "publishedAt": null,
    "createdAt": "2026-02-08T12:42:45.095Z",
    "updatedAt": "2026-07-25T03:06:45.095Z",
    "gender": "men",
    "category": "Pants",
    "subcategory": "Joggers",
    "collection": "AW25 Core Collection",
    "season": "AW25",
    "color": "Stone",
    "colorCode": "#8B8580",
    "material": "78% Recycled Polyamide, 22% Elastane",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "price": 145,
    "compareAtPrice": null,
    "cost": 46,
    "weight": 180,
    "tags": [
      "men",
      "pants",
      "stone",
      "aw25",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_055_1",
        "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999a55b?w=800&q=80",
        "alt": "Flow Jogger - Tech - Stone front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_055_2",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Flow Jogger - Tech - Stone detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_055_s",
        "sku": "AYA-PAN-STO-055-S",
        "title": "S / Stone",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S",
        "color": "Stone",
        "barcode": "764039280550"
      },
      {
        "id": "var_055_m",
        "sku": "AYA-PAN-STO-055-M",
        "title": "M / Stone",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "M",
        "color": "Stone",
        "barcode": "764039280551"
      },
      {
        "id": "var_055_l",
        "sku": "AYA-PAN-STO-055-L",
        "title": "L / Stone",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L",
        "color": "Stone",
        "barcode": "764039280552"
      },
      {
        "id": "var_055_xl",
        "sku": "AYA-PAN-STO-055-XL",
        "title": "XL / Stone",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XL",
        "color": "Stone",
        "barcode": "764039280553"
      },
      {
        "id": "var_055_xxl",
        "sku": "AYA-PAN-STO-055-XXL",
        "title": "XXL / Stone",
        "price": 145,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "XXL",
        "color": "Stone",
        "barcode": "764039280554"
      }
    ],
    "seo": {
      "title": "Flow Jogger - Tech - Stone | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Flow Jogger - Tech - Stone. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "flow-jogger-tech-stone",
      "score": 59,
      "issues": [
        "Meta description is too short (under 120 characters)",
        "Product title missing primary target keyword",
        "Missing Alt text on gallery images"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 74
  },
  {
    "id": "prod_aya_056",
    "handle": "studio-yoga-mat-5mm-noir",
    "title": "Studio Yoga Mat - 5mm - Noir",
    "shortName": "Studio Yoga Mat",
    "sku": "AYA-ACC-NOI-056",
    "barcode": "7640392810564",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-02-10T12:42:45.095Z",
    "createdAt": "2026-02-05T12:42:45.095Z",
    "updatedAt": "2026-07-25T00:42:45.095Z",
    "gender": "unisex",
    "category": "Accessories",
    "subcategory": "Equipment",
    "collection": "Permanent Core Collection",
    "season": "Permanent",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "100% Eco Rubber",
    "sizes": [
      "ONE SIZE"
    ],
    "price": 95,
    "compareAtPrice": 119,
    "cost": 30,
    "weight": 450,
    "tags": [
      "unisex",
      "accessories",
      "noir",
      "permanent",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_056_1",
        "src": "https://images.unsplash.com/photo-1548690312-bf537a90b04e?w=800&q=80",
        "alt": "Studio Yoga Mat - 5mm - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_056_2",
        "src": "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&q=80",
        "alt": "Studio Yoga Mat - 5mm - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_056_one size",
        "sku": "AYA-ACC-NOI-056-ONE SIZE",
        "title": "ONE SIZE / Noir",
        "price": 95,
        "compareAtPrice": 119,
        "inventory": 22,
        "size": "ONE SIZE",
        "color": "Noir",
        "barcode": "764039280560"
      }
    ],
    "seo": {
      "title": "Studio Yoga Mat - 5mm - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Studio Yoga Mat - 5mm - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "studio-yoga-mat-5mm-noir",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 96
  },
  {
    "id": "prod_aya_057",
    "handle": "aya-performance-sports-bag-clay",
    "title": "AYA Performance Sports Bag - Clay",
    "shortName": "AYA Sports Bag",
    "sku": "AYA-ACC-CLA-057",
    "barcode": "7640392810574",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-02-07T12:42:45.095Z",
    "createdAt": "2026-02-02T12:42:45.095Z",
    "updatedAt": "2026-07-24T22:18:45.095Z",
    "gender": "unisex",
    "category": "Accessories",
    "subcategory": "Bags",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Clay",
    "colorCode": "#B87D68",
    "material": "82% Organic Cotton, 15% Polyamide, 3% Elastane",
    "sizes": [
      "ONE SIZE"
    ],
    "price": 120,
    "compareAtPrice": null,
    "cost": 38,
    "weight": 450,
    "tags": [
      "unisex",
      "accessories",
      "clay",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_057_1",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "AYA Performance Sports Bag - Clay front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_057_2",
        "src": "https://images.unsplash.com/photo-1506629082-d1e61e0ac2a7?w=800&q=80",
        "alt": "AYA Performance Sports Bag - Clay detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_057_one size",
        "sku": "AYA-ACC-CLA-057-ONE SIZE",
        "title": "ONE SIZE / Clay",
        "price": 120,
        "compareAtPrice": null,
        "inventory": 45,
        "size": "ONE SIZE",
        "color": "Clay",
        "barcode": "764039280570"
      }
    ],
    "seo": {
      "title": "AYA Performance Sports Bag - Clay | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the AYA Performance Sports Bag - Clay. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "aya-performance-sports-bag-clay",
      "score": 65,
      "issues": [
        "Meta description could be optimized for higher click-through rate"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 97
  },
  {
    "id": "prod_aya_058",
    "handle": "seamless-crew-socks-3-pack--ivory",
    "title": "Seamless Crew Socks (3-Pack) - Ivory",
    "shortName": "Crew Socks 3-Pack",
    "sku": "AYA-ACC-IVO-058",
    "barcode": "7640392810584",
    "vendor": "AYA Studio",
    "status": "draft",
    "publishedAt": null,
    "createdAt": "2026-01-30T12:42:45.095Z",
    "updatedAt": "2026-07-24T19:54:45.095Z",
    "gender": "unisex",
    "category": "Accessories",
    "subcategory": "Socks",
    "collection": "Permanent Core Collection",
    "season": "Permanent",
    "color": "Ivory",
    "colorCode": "#FDFBF7",
    "material": "82% Organic Cotton, 15% Polyamide, 3% Elastane",
    "sizes": [
      "S/M",
      "L/XL"
    ],
    "price": 25,
    "compareAtPrice": null,
    "cost": 8,
    "weight": 450,
    "tags": [
      "unisex",
      "accessories",
      "ivory",
      "permanent",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_058_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Seamless Crew Socks (3-Pack) - Ivory front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_058_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Seamless Crew Socks (3-Pack) - Ivory detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_058_s_m",
        "sku": "AYA-ACC-IVO-058-S/M",
        "title": "S/M / Ivory",
        "price": 25,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "S/M",
        "color": "Ivory",
        "barcode": "764039280580"
      },
      {
        "id": "var_058_l_xl",
        "sku": "AYA-ACC-IVO-058-L/XL",
        "title": "L/XL / Ivory",
        "price": 25,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "L/XL",
        "color": "Ivory",
        "barcode": "764039280581"
      }
    ],
    "seo": {
      "title": "Seamless Crew Socks (3-Pack) - Ivory | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Seamless Crew Socks (3-Pack) - Ivory. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "seamless-crew-socks-3-pack--ivory",
      "score": 62,
      "issues": [
        "Meta description is too short (under 120 characters)",
        "Product title missing primary target keyword",
        "Missing Alt text on gallery images"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 77
  },
  {
    "id": "prod_aya_059",
    "handle": "luxury-studio-towel-large-ivory",
    "title": "Luxury Studio Towel - Large - Ivory",
    "shortName": "Studio Towel Large",
    "sku": "AYA-ACC-IVO-059",
    "barcode": "7640392810594",
    "vendor": "AYA Studio",
    "status": "active",
    "publishedAt": "2026-02-01T12:42:45.095Z",
    "createdAt": "2026-01-27T12:42:45.095Z",
    "updatedAt": "2026-07-24T17:30:45.095Z",
    "gender": "unisex",
    "category": "Accessories",
    "subcategory": "Towels",
    "collection": "Permanent Core Collection",
    "season": "Permanent",
    "color": "Ivory",
    "colorCode": "#FDFBF7",
    "material": "100% Organic Terry Cotton",
    "sizes": [
      "ONE SIZE"
    ],
    "price": 45,
    "compareAtPrice": null,
    "cost": 14,
    "weight": 450,
    "tags": [
      "unisex",
      "accessories",
      "ivory",
      "permanent",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_059_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Luxury Studio Towel - Large - Ivory front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_059_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Luxury Studio Towel - Large - Ivory detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_059_one size",
        "sku": "AYA-ACC-IVO-059-ONE SIZE",
        "title": "ONE SIZE / Ivory",
        "price": 45,
        "compareAtPrice": null,
        "inventory": 19,
        "size": "ONE SIZE",
        "color": "Ivory",
        "barcode": "764039280590"
      }
    ],
    "seo": {
      "title": "Luxury Studio Towel - Large - Ivory | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Luxury Studio Towel - Large - Ivory. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "luxury-studio-towel-large-ivory",
      "score": 90,
      "issues": []
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 99
  },
  {
    "id": "prod_aya_060",
    "handle": "microfiber-sweat-towel-noir",
    "title": "Microfiber Sweat Towel - Noir",
    "shortName": "Microfiber Towel",
    "sku": "AYA-ACC-NOI-060",
    "barcode": "7640392810604",
    "vendor": "AYA Studio",
    "status": "draft",
    "publishedAt": null,
    "createdAt": "2026-01-24T12:42:45.095Z",
    "updatedAt": "2026-07-24T15:06:45.095Z",
    "gender": "unisex",
    "category": "Accessories",
    "subcategory": "Towels",
    "collection": "Core Core Collection",
    "season": "Core",
    "color": "Noir",
    "colorCode": "#0F0F0F",
    "material": "100% Organic Terry Cotton",
    "sizes": [
      "ONE SIZE"
    ],
    "price": 35,
    "compareAtPrice": null,
    "cost": 11,
    "weight": 450,
    "tags": [
      "unisex",
      "accessories",
      "noir",
      "core",
      "luxury-activewear",
      "activewear",
      "premium-sportswear",
      "second-skin",
      "engineered",
      "crafted",
      "polyamide",
      "elastane",
      "oeko-tex"
    ],
    "images": [
      {
        "id": "img_060_1",
        "src": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "alt": "Microfiber Sweat Towel - Noir front view",
        "position": 1,
        "width": 1200,
        "height": 1600
      },
      {
        "id": "img_060_2",
        "src": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        "alt": "Microfiber Sweat Towel - Noir detail shot",
        "position": 2,
        "width": 1200,
        "height": 1600
      }
    ],
    "variants": [
      {
        "id": "var_060_one size",
        "sku": "AYA-ACC-NOI-060-ONE SIZE",
        "title": "ONE SIZE / Noir",
        "price": 35,
        "compareAtPrice": null,
        "inventory": 0,
        "size": "ONE SIZE",
        "color": "Noir",
        "barcode": "764039280600"
      }
    ],
    "seo": {
      "title": "Microfiber Sweat Towel - Noir | Luxury Activewear by AYA",
      "description": "Experience ultimate comfort and refined elegance with the Microfiber Sweat Towel - Noir. Engineered with high-performance breathable fabric for seamless movement.",
      "handle": "microfiber-sweat-towel-noir",
      "score": 64,
      "issues": [
        "Meta description is too short (under 120 characters)",
        "Product title missing primary target keyword",
        "Missing Alt text on gallery images"
      ]
    },
    "metafields": {
      "fabric_weight": "220 gsm",
      "care_instructions": "Machine wash cold. Line dry in shade.",
      "sustainability_rating": "A+",
      "origin_country": "Portugal",
      "fit_type": "Regular Fit",
      "transparency_level": "100% Opaque"
    },
    "completeness": 79
  }
];

export const getProductById = (id: string): Product | undefined => mockProducts.find(p => p.id === id);
