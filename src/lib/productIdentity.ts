export interface AttributeConfig<T> {
  value: T
  definesIdentity: boolean
}

export interface ProductIdentityAttributes {
  gender: 'womens' | 'mens' | 'unisex'
  productType: string
  color: string
  
  rise?: AttributeConfig<string>
  fit?: AttributeConfig<string>
  length?: AttributeConfig<string>
  support?: AttributeConfig<string>
  coverage?: AttributeConfig<string>
  material?: AttributeConfig<string>
  performance?: AttributeConfig<string>
  construction?: AttributeConfig<string>
}

// Option Mappings for Strict Selectors
export const GENDER_OPTIONS = [
  { value: 'womens', label: "Women's" },
  { value: 'mens', label: "Men's" },
  { value: 'unisex', label: 'Unisex' }
]

export const PRODUCT_TYPE_OPTIONS = [
  { value: 'leggings', label: 'Leggings' },
  { value: 'hoodie', label: 'Hoodie' },
  { value: 'tank', label: 'Tank' },
  { value: 'sports-bra', label: 'Sports Bra' },
  { value: 'jacket', label: 'Jacket' },
  { value: 'shorts', label: 'Shorts' },
  { value: 'joggers', label: 'Joggers' },
  { value: 'socks', label: 'Socks' },
  { value: 'bra', label: 'Bra' },
  { value: 'top', label: 'Top' },
  { value: 'towel', label: 'Towel' },
  { value: 'mat', label: 'Yoga Mat' },
  { value: 'bag', label: 'Bag' }
]

export const RISE_OPTIONS = [
  { value: 'none', label: 'None (No Rise)' },
  { value: 'low-rise', label: 'Low Rise' },
  { value: 'mid-rise', label: 'Mid Rise' },
  { value: 'high-rise', label: 'High Rise' },
  { value: 'ultra-high-rise', label: 'Ultra High Rise' }
]

export const FIT_OPTIONS = [
  { value: 'none', label: 'None (No Fit)' },
  { value: 'relaxed', label: 'Relaxed' },
  { value: 'slim', label: 'Slim' },
  { value: 'sculpting', label: 'Sculpting' },
  { value: 'regular', label: 'Regular' },
  { value: 'loose', label: 'Loose' }
]

export const LENGTH_OPTIONS = [
  { value: 'none', label: 'None (No Length)' },
  { value: 'cropped', label: 'Cropped' },
  { value: '7-8-length', label: '7/8 Length' },
  { value: '5-inch', label: '5" Inch' },
  { value: '7-inch', label: '7" Inch' },
  { value: 'full-length', label: 'Full Length' }
]

export const SUPPORT_OPTIONS = [
  { value: 'none', label: 'None (No Support)' },
  { value: 'low-support', label: 'Low Support' },
  { value: 'medium-support', label: 'Medium Support' },
  { value: 'high-support', label: 'High Support' }
]

export const COVERAGE_OPTIONS = [
  { value: 'none', label: 'None (No Coverage)' },
  { value: 'racerback', label: 'Racerback' },
  { value: 'strappy', label: 'Strappy' },
  { value: 'full-coverage', label: 'Full Coverage' }
]

export const MATERIAL_OPTIONS = [
  { value: 'none', label: 'None (No Material)' },
  { value: 'polyamide', label: 'Polyamide' },
  { value: 'elastane', label: 'Elastane' },
  { value: 'nylon', label: 'Nylon' },
  { value: 'polyester', label: 'Polyester' },
  { value: 'merino', label: 'Merino Wool' },
  { value: 'heavyweight', label: 'Heavyweight' },
  { value: 'lightweight', label: 'Lightweight' },
  { value: 'ribbed', label: 'Ribbed' }
]

export const PERFORMANCE_OPTIONS = [
  { value: 'none', label: 'None (No Performance)' },
  { value: 'breathable', label: 'Breathable' },
  { value: 'waterproof', label: 'Waterproof' },
  { value: 'windbreaker', label: 'Windbreaker' },
  { value: 'thermal', label: 'Thermal' },
  { value: 'seamless', label: 'Seamless' },
  { value: 'quick-dry', label: 'Quick Dry' }
]

export const CONSTRUCTION_OPTIONS = [
  { value: 'none', label: 'None (No Construction)' },
  { value: 'full-zip', label: 'Full Zip' },
  { value: 'half-zip', label: 'Half Zip' },
  { value: 'crewneck', label: 'Crewneck' },
  { value: 'v-neck', label: 'V-Neck' },
  { value: 'hooded', label: 'Hooded' },
  { value: 'pocket', label: 'With Pockets' }
]

export const COLOR_OPTIONS = [
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'slate', label: 'Slate' },
  { value: 'sage', label: 'Sage' },
  { value: 'stone', label: 'Stone' },
  { value: 'clay', label: 'Clay' },
  { value: 'forest', label: 'Forest Green' },
  { value: 'sand', label: 'Sand' },
  { value: 'ivory', label: 'Ivory' },
  { value: 'noir', label: 'Noir' }
]

// Forbidden marketing words list
const FORBIDDEN_WORDS = new Set([
  'the', 'in', 'and', 'with', 'for', 
  'edition', 'collection', 'drop', 'new', 
  'premium', 'luxury', 'aya', 'official', 'performancewear'
])

// Text normalization helper
export function normalizeHandleText(text: string): string {
  if (!text) return ''
  
  // Remove apostrophes
  let normalized = text.replace(/'/g, '')
  
  // Remove accents
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  
  // Replace slashes/backslashes with space
  normalized = normalized.replace(/[\/\\]/g, ' ')
  
  // Lowercase
  normalized = normalized.toLowerCase()
  
  // Remove punctuation (non-alphanumeric, non-space, non-hyphen)
  normalized = normalized.replace(/[^\w\s-]/g, '')
  
  // Replace spaces and underscores with hyphens
  normalized = normalized.replace(/[\s_]+/g, '-')
  
  // Remove duplicate hyphens
  normalized = normalized.replace(/-+/g, '-')
  
  // Trim leading/trailing hyphens
  normalized = normalized.replace(/^-+|-+$/g, '')
  
  return normalized
}

// Singularize product type helper
export function singularizeProductType(type: string): string {
  const t = type.trim().toLowerCase()
  if (!t) return ''
  
  const allowedPlurals = ['leggings', 'shorts', 'joggers', 'socks']
  if (allowedPlurals.includes(t)) {
    return t
  }
  
  if (t.endsWith('s') && !t.endsWith('ss')) {
    return t.slice(0, -1)
  }
  
  return t
}

// Helper to convert keys to friendly Labels
function getLabel(key: string, options: { value: string; label: string }[]): string {
  const found = options.find(opt => opt.value === key)
  return found ? found.label : key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// 1. Generate Base Product Name
export function generateBaseProductName(attrs: ProductIdentityAttributes): string {
  const parts: string[] = []
  
  // Add defining attributes in priority order (excluding gender and color)
  if (attrs.rise?.definesIdentity && attrs.rise.value && attrs.rise.value !== 'none') {
    parts.push(getLabel(attrs.rise.value, RISE_OPTIONS))
  }
  if (attrs.fit?.definesIdentity && attrs.fit.value && attrs.fit.value !== 'none') {
    parts.push(getLabel(attrs.fit.value, FIT_OPTIONS))
  }
  if (attrs.length?.definesIdentity && attrs.length.value && attrs.length.value !== 'none') {
    parts.push(getLabel(attrs.length.value, LENGTH_OPTIONS))
  }
  if (attrs.support?.definesIdentity && attrs.support.value && attrs.support.value !== 'none') {
    parts.push(getLabel(attrs.support.value, SUPPORT_OPTIONS))
  }
  if (attrs.coverage?.definesIdentity && attrs.coverage.value && attrs.coverage.value !== 'none') {
    parts.push(getLabel(attrs.coverage.value, COVERAGE_OPTIONS))
  }
  if (attrs.material?.definesIdentity && attrs.material.value && attrs.material.value !== 'none') {
    parts.push(getLabel(attrs.material.value, MATERIAL_OPTIONS))
  }
  if (attrs.performance?.definesIdentity && attrs.performance.value && attrs.performance.value !== 'none') {
    parts.push(getLabel(attrs.performance.value, PERFORMANCE_OPTIONS))
  }
  if (attrs.construction?.definesIdentity && attrs.construction.value && attrs.construction.value !== 'none') {
    parts.push(getLabel(attrs.construction.value, CONSTRUCTION_OPTIONS))
  }
  
  // Append Product Type
  const typeLabel = getLabel(attrs.productType, PRODUCT_TYPE_OPTIONS)
  parts.push(typeLabel)
  
  return parts.join(' ')
}

// 2. Generate Full Product Title
export function generateFullProductTitle(attrs: ProductIdentityAttributes): string {
  const baseName = generateBaseProductName(attrs)
  const colorLabel = getLabel(attrs.color, COLOR_OPTIONS)
  return `${baseName} - ${colorLabel}`
}

// 3. Generate Product Handle
export function generateHandle(attrs: ProductIdentityAttributes): string {
  // Gender value mapping
  let genderVal = attrs.gender === 'womens' ? 'womens' : attrs.gender === 'mens' ? 'mens' : 'unisex'
  
  // Product type singularization & normalization
  const typeVal = normalizeHandleText(singularizeProductType(attrs.productType))
  
  // Optional defining attributes
  const riseVal = attrs.rise?.definesIdentity && attrs.rise.value !== 'none' ? normalizeHandleText(attrs.rise.value) : ''
  const fitVal = attrs.fit?.definesIdentity && attrs.fit.value !== 'none' ? normalizeHandleText(attrs.fit.value) : ''
  const lengthVal = attrs.length?.definesIdentity && attrs.length.value !== 'none' ? normalizeHandleText(attrs.length.value) : ''
  const supportVal = attrs.support?.definesIdentity && attrs.support.value !== 'none' ? normalizeHandleText(attrs.support.value) : ''
  const coverageVal = attrs.coverage?.definesIdentity && attrs.coverage.value !== 'none' ? normalizeHandleText(attrs.coverage.value) : ''
  const materialVal = attrs.material?.definesIdentity && attrs.material.value !== 'none' ? normalizeHandleText(attrs.material.value) : ''
  const performanceVal = attrs.performance?.definesIdentity && attrs.performance.value !== 'none' ? normalizeHandleText(attrs.performance.value) : ''
  const constructionVal = attrs.construction?.definesIdentity && attrs.construction.value !== 'none' ? normalizeHandleText(attrs.construction.value) : ''
  
  // Color value (always mandatory)
  const colorVal = normalizeHandleText(attrs.color)
  
  // Build in correct sequence:
  // Gender -> Product Type -> Rise -> Fit -> Length -> Support -> Coverage -> Material -> Performance -> Construction -> Color
  const rawSegments = [
    genderVal,
    typeVal,
    riseVal,
    fitVal,
    lengthVal,
    supportVal,
    coverageVal,
    materialVal,
    performanceVal,
    constructionVal,
    colorVal
  ]
  
  // Filter out empty components, forbidden words, and years
  const cleanSegments: string[] = []
  for (const segment of rawSegments) {
    if (!segment) continue
    
    const words = segment.split('-')
    const filteredWords = words.filter(w => {
      if (FORBIDDEN_WORDS.has(w)) return false
      if (/^(19|20)\d{2}$/.test(w)) return false
      return true
    })
    
    if (filteredWords.length > 0) {
      cleanSegments.push(filteredWords.join('-'))
    }
  }
  
  const handle = cleanSegments.join('-')
  return handle.replace(/-+/g, '-').replace(/^-+|-+$/g, '')
}

// 4. Generate SEO Title
export function generateSEOTitle(attrs: ProductIdentityAttributes): string {
  const fullTitle = generateFullProductTitle(attrs)
  const genderLabel = attrs.gender === 'womens' ? "Women's" : attrs.gender === 'mens' ? "Men's" : "Unisex"
  return `${genderLabel} ${fullTitle} | AYA Studio`
}

// 5. Generate Meta Title
export function generateMetaTitle(attrs: ProductIdentityAttributes): string {
  return generateSEOTitle(attrs)
}

// 6. Generate Canonical URL
export function generateCanonicalURL(handle: string): string {
  return `https://aya.com/products/${handle}`
}

// 7. Generate URL Preview
export function generateURLPreview(handle: string): string {
  return `aya.com/products/${handle}`
}

// 8. Generate SKU Prefix
export function generateSKUPrefix(attrs: ProductIdentityAttributes): string {
  // Standardised 3-letter abbreviations
  const genderCode = attrs.gender === 'womens' ? 'W' : attrs.gender === 'mens' ? 'M' : 'U'
  
  let typeCode = attrs.productType.slice(0, 3).toUpperCase()
  if (attrs.productType === 'sports-bra') typeCode = 'SBR'
  else if (attrs.productType === 'leggings') typeCode = 'LEG'
  else if (attrs.productType === 'hoodie') typeCode = 'HDD'
  
  const colorCode = attrs.color.slice(0, 3).toUpperCase()
  
  return `AYA-${genderCode}${typeCode}-${colorCode}`
}

// 9. Collision Check
export function handleExists(handle: string, productsList: Array<{ handle: string } | { seo?: { handle?: string } }>): boolean {
  const norm = handle.trim().toLowerCase()
  return productsList.some(p => {
    // Check both root-level handle and seo.handle
    const ph = 'handle' in p && typeof p.handle === 'string' ? p.handle : ''
    const seoh = 'seo' in p && p.seo && typeof p.seo === 'object' && 'handle' in p.seo && typeof p.seo.handle === 'string' ? p.seo.handle : ''
    
    return ph.trim().toLowerCase() === norm || seoh.trim().toLowerCase() === norm
  })
}

// 10. Legacy parser to initialize structured attributes
export function parseAttributesFromProduct(product: any): ProductIdentityAttributes {
  const handle = (product.handle || product.seo?.handle || '').toLowerCase()
  const title = (product.title || '').toLowerCase()
  
  // 1. Gender mapping
  let gender: 'womens' | 'mens' | 'unisex' = 'unisex'
  if (product.gender === 'women' || product.gender === 'womens' || handle.startsWith('womens') || title.includes("women")) {
    gender = 'womens'
  } else if (product.gender === 'men' || product.gender === 'mens' || handle.startsWith('mens') || title.includes("men")) {
    gender = 'mens'
  }

  // 2. Product type mapping
  let productType = 'leggings'
  const types = ['sports-bra', 'leggings', 'hoodie', 'tank', 'jacket', 'shorts', 'joggers', 'socks', 'bra', 'top', 'towel', 'mat', 'bag']
  for (const t of types) {
    if (handle.includes(t) || title.includes(t) || (product.category && product.category.toLowerCase().includes(t))) {
      productType = t
      break
    }
  }

  // 3. Color mapping
  let color = 'black'
  const colors = ['black', 'white', 'slate', 'sage', 'stone', 'clay', 'forest', 'sand', 'ivory', 'noir']
  for (const c of colors) {
    if (handle.endsWith(c) || (product.color && product.color.toLowerCase() === c)) {
      color = c
      break
    }
  }

  // Helper to parse optional attributes
  const parseOptional = (options: { value: string }[], searchStr: string) => {
    for (const opt of options) {
      if (opt.value === 'none') continue
      if (searchStr.includes(opt.value)) {
        return { value: opt.value, definesIdentity: true }
      }
    }
    return { value: 'none', definesIdentity: false }
  }

  return {
    gender,
    productType,
    color,
    rise: parseOptional(RISE_OPTIONS, handle),
    fit: parseOptional(FIT_OPTIONS, handle),
    length: parseOptional(LENGTH_OPTIONS, handle),
    support: parseOptional(SUPPORT_OPTIONS, handle),
    coverage: parseOptional(COVERAGE_OPTIONS, handle),
    material: parseOptional(MATERIAL_OPTIONS, handle),
    performance: parseOptional(PERFORMANCE_OPTIONS, handle),
    construction: parseOptional(CONSTRUCTION_OPTIONS, handle)
  }
}
