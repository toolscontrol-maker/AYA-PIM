export interface AYAColor {
  displayName: string;
  luxuryName: string;
  hex: string;
  slug: string;
}

export const COLOR_LIBRARY: AYAColor[] = [
  { displayName: 'Black', luxuryName: 'Noir', hex: '#0F0F0F', slug: 'noir' },
  { displayName: 'White', luxuryName: 'Ivory', hex: '#FDFBF7', slug: 'ivory' },
  { displayName: 'Beige', luxuryName: 'Stone', hex: '#8B8580', slug: 'stone' },
  { displayName: 'Grey', luxuryName: 'Slate', hex: '#475569', slug: 'slate' },
  { displayName: 'Green', luxuryName: 'Forest', hex: '#2D3A2E', slug: 'forest' },
  { displayName: 'Brown', luxuryName: 'Clay', hex: '#B87D68', slug: 'clay' },
  { displayName: 'Cream', luxuryName: 'Sand', hex: '#D5C5B5', slug: 'sand' },
  { displayName: 'Sage', luxuryName: 'Sage', hex: '#9CAF88', slug: 'sage' },
];

export const TAXONOMY = {
  genders: ['Woman', 'Man', 'Unisex'] as const,
  mainCategories: ['Top', 'Bottom', 'Outerwear', 'Set', 'Accessory'] as const,
  subcategories: [
    'SPORTS BRAS',
    'TANK TOPS',
    'T-SHIRTS',
    'LONG SLEEVES',
    'LEGGINGS',
    'SHORTS',
    'JOGGERS',
    'HOODIES',
    'SWEATSHIRTS',
    'JACKETS',
    'CAPS',
    'SOCKS',
    'BAGS',
    'TOTE BAGS',
    'WATER BOTTLES',
    'YOGA MATS',
    'YOGA BLOCKS',
    'GRIP SOCKS',
    'HAIR ACCESSORIES'
  ] as const
};

export interface BrainRule {
  id: string;
  when: {
    gender?: string;
    subcategory?: string;
  };
  then: {
    collection: string;
    productType: string;
    generateSEO: boolean;
    generateTags: boolean;
    generateHandle: boolean;
    generateMetafields: boolean;
    generateALT: boolean;
  };
}

// Editable rule database initialized with standard rules
export let brainRules: BrainRule[] = [
  {
    id: 'rule_1',
    when: { gender: 'Woman', subcategory: 'LEGGINGS' },
    then: {
      collection: "Women's Leggings",
      productType: 'Leggings',
      generateSEO: true,
      generateTags: true,
      generateHandle: true,
      generateMetafields: true,
      generateALT: true,
    }
  },
  {
    id: 'rule_2',
    when: { gender: 'Woman', subcategory: 'SPORTS BRAS' },
    then: {
      collection: 'Sports Bras',
      productType: 'Sports Bra',
      generateSEO: true,
      generateTags: true,
      generateHandle: true,
      generateMetafields: true,
      generateALT: true,
    }
  },
  {
    id: 'rule_3',
    when: { subcategory: 'YOGA MATS' },
    then: {
      collection: 'Accessories',
      productType: 'Yoga Mat',
      generateSEO: true,
      generateTags: true,
      generateHandle: true,
      generateMetafields: true,
      generateALT: true,
    }
  }
];

export interface ClassificationResult {
  gender: 'Woman' | 'Man' | 'Unisex';
  mainCategory: 'Top' | 'Bottom' | 'Outerwear' | 'Set' | 'Accessory';
  subcategory: string;
  shopifyProductType: string;
  shopifyCategory: string;
  color: AYAColor;
  activities: string[];
  naming: {
    gender: string;
    subcategory: string;
    fit: string;
    category: string;
  };
  seo: {
    title: string;
    description: string;
    handle: string;
    imageALT: string;
    googlePreview: string;
    canonical: string;
    openGraph: string;
    twitterCard: string;
  };
  tags: string[];
  metafields: Record<string, string>;
  confidence: number;
}

export function classifyProduct(title: string, description: string = ''): ClassificationResult {
  const normTitle = title.toLowerCase();
  const normDesc = description.toLowerCase();
  let confidence = 100;

  // 1. Infer Gender
  let gender: 'Woman' | 'Man' | 'Unisex' = 'Unisex';
  if (normTitle.includes('women') || normTitle.includes('women\'s') || normTitle.includes('woman') || normDesc.includes('women')) {
    gender = 'Woman';
  } else if (normTitle.includes('men') || normTitle.includes('men\'s') || normTitle.includes('man') || normDesc.includes('men')) {
    gender = 'Man';
  } else {
    confidence -= 15; // Lower confidence if unisex or unspecified
  }

  // 2. Infer Subcategory & Main Category
  let subcategory = 'LEGGINGS';
  let mainCategory: 'Top' | 'Bottom' | 'Outerwear' | 'Set' | 'Accessory' = 'Bottom';
  let subcategoryMatched = false;

  const keywordMap: { sub: typeof TAXONOMY.subcategories[number]; main: typeof TAXONOMY.mainCategories[number]; keywords: string[] }[] = [
    { sub: 'SPORTS BRAS', main: 'Top', keywords: ['sports bra', 'bra', 'bralette'] },
    { sub: 'TANK TOPS', main: 'Top', keywords: ['tank top', 'tank', 'vest'] },
    { sub: 'T-SHIRTS', main: 'Top', keywords: ['t-shirt', 'tee', 'tshirt'] },
    { sub: 'LONG SLEEVES', main: 'Top', keywords: ['long sleeve', 'long-sleeve', 'pullover'] },
    { sub: 'LEGGINGS', main: 'Bottom', keywords: ['leggings', 'legging', 'tights'] },
    { sub: 'SHORTS', main: 'Bottom', keywords: ['shorts', 'short'] },
    { sub: 'JOGGERS', main: 'Bottom', keywords: ['joggers', 'jogger', 'pants'] },
    { sub: 'HOODIES', main: 'Top', keywords: ['hoodie', 'hoodies'] },
    { sub: 'SWEATSHIRTS', main: 'Top', keywords: ['sweatshirt', 'sweatshirts', 'crewneck'] },
    { sub: 'JACKETS', main: 'Outerwear', keywords: ['jacket', 'jackets', 'outerwear', 'windbreaker'] },
    { sub: 'CAPS', main: 'Accessory', keywords: ['cap', 'caps', 'hat', 'beanie'] },
    { sub: 'SOCKS', main: 'Accessory', keywords: ['socks', 'sock'] },
    { sub: 'TOTE BAGS', main: 'Accessory', keywords: ['tote', 'tote bag'] },
    { sub: 'BAGS', main: 'Accessory', keywords: ['bag', 'backpack', 'duffel'] },
    { sub: 'WATER BOTTLES', main: 'Accessory', keywords: ['water bottle', 'bottle', 'flask'] },
    { sub: 'YOGA MATS', main: 'Accessory', keywords: ['yoga mat', 'mat'] },
    { sub: 'YOGA BLOCKS', main: 'Accessory', keywords: ['block', 'blocks'] },
    { sub: 'GRIP SOCKS', main: 'Accessory', keywords: ['grip socks', 'grip sock'] },
    { sub: 'HAIR ACCESSORIES', main: 'Accessory', keywords: ['scrunchie', 'headband', 'hair'] },
  ];

  for (const mapping of keywordMap) {
    if (mapping.keywords.some(kw => normTitle.includes(kw))) {
      subcategory = mapping.sub;
      mainCategory = mapping.main;
      subcategoryMatched = true;
      break;
    }
  }

  if (!subcategoryMatched) {
    // Check description if title failed
    for (const mapping of keywordMap) {
      if (mapping.keywords.some(kw => normDesc.includes(kw))) {
        subcategory = mapping.sub;
        mainCategory = mapping.main;
        subcategoryMatched = true;
        confidence -= 10;
        break;
      }
    }
  }

  if (!subcategoryMatched) {
    confidence -= 20; // Drastic confidence drop if subcategory cannot be inferred
  }

  // 3. Shopify Product Type
  const typeMap: Record<string, string> = {
    'SPORTS BRAS': 'Sports Bra',
    'TANK TOPS': 'Tank Top',
    'T-SHIRTS': 'T-Shirt',
    'LONG SLEEVES': 'Long Sleeve',
    'LEGGINGS': 'Leggings',
    'SHORTS': 'Shorts',
    'JOGGERS': 'Joggers',
    'HOODIES': 'Hoodie',
    'SWEATSHIRTS': 'Sweatshirt',
    'JACKETS': 'Jacket',
    'YOGA MATS': 'Yoga Mat',
    'YOGA BLOCKS': 'Yoga Block',
    'SOCKS': 'Socks',
    'BAGS': 'Bag',
  };
  const shopifyProductType = typeMap[subcategory] || 'Activewear';

  // 4. Shopify Category Mapping
  let shopifyCategory = 'Clothing > Activewear';
  if (subcategory === 'SPORTS BRAS') shopifyCategory = 'Clothing > Activewear > Sports Bras';
  else if (subcategory === 'LEGGINGS') shopifyCategory = 'Clothing > Activewear > Leggings';
  else if (subcategory === 'TANK TOPS') shopifyCategory = 'Clothing > Activewear > Tank Tops';
  else if (subcategory === 'SHORTS') shopifyCategory = 'Clothing > Activewear > Shorts';
  else if (subcategory === 'JOGGERS') shopifyCategory = 'Clothing > Activewear > Pants & Joggers';
  else if (subcategory === 'JACKETS') shopifyCategory = 'Clothing > Outerwear > Jackets & Coats';
  else if (mainCategory === 'Accessory') shopifyCategory = 'Sporting Goods > Athletics > Yoga & Pilates';

  // 5. Controlled Color Library Identification
  let matchedColor = COLOR_LIBRARY[3]; // Default to Slate
  let colorMatched = false;
  
  for (const col of COLOR_LIBRARY) {
    const colName = col.displayName.toLowerCase();
    const luxName = col.luxuryName.toLowerCase();
    if (normTitle.includes(colName) || normTitle.includes(luxName) || normDesc.includes(colName) || normDesc.includes(luxName)) {
      matchedColor = col;
      colorMatched = true;
      break;
    }
  }
  
  if (!colorMatched) {
    confidence -= 5;
  }

  // 6. Activities (Focus on Yoga & Pilates)
  const activities = ['Yoga', 'Pilates', 'Studio'];
  if (normTitle.includes('travel') || normDesc.includes('travel')) activities.push('Travel');
  if (normTitle.includes('life') || normDesc.includes('lifestyle')) activities.push('Lifestyle');

  // 7. Naming Rules Analysis
  const fit = normTitle.includes('high rise') || normTitle.includes('high-rise') ? 'High Rise' : 'Regular';
  const naming = {
    gender: gender === 'Woman' ? 'Women\'s' : gender === 'Man' ? 'Men\'s' : 'Unisex',
    subcategory: shopifyProductType,
    fit: fit,
    category: mainCategory
  };

  // 8. SEO Generator (Luxury / Minimal Tone)
  const cleanHandle = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const seoTitle = `AYA | ${title}`;
  const seoDescription = `${title}. Engineered for movement, designed for life. Crafted from our signature refined fabric with a minimal, elegant silhouette. Perfect for ${activities.join(' and ')}.`;
  const imageALT = `${title} in AYA ${matchedColor.luxuryName}`;

  // 9. Tag Engine
  const baseTags = [
    gender.toLowerCase(),
    shopifyProductType.toLowerCase(),
    mainCategory.toLowerCase(),
    matchedColor.slug,
    'activewear',
    'premium',
    'core',
  ];
  activities.forEach(a => baseTags.push(a.toLowerCase()));
  if (fit !== 'Regular') baseTags.push('high-rise');
  const tags = Array.from(new Set(baseTags));

  // 10. Metafield Engine
  const metafields: Record<string, string> = {};
  if (subcategory === 'LEGGINGS') {
    metafields['Rise'] = fit;
    metafields['Compression'] = normTitle.includes('compression') || normDesc.includes('compression') ? 'High' : 'Medium';
    metafields['Length'] = normTitle.includes('7/8') ? '7/8 Length' : 'Full Length';
    metafields['Pocket'] = normTitle.includes('pocket') || normDesc.includes('pocket') ? 'Yes' : 'No';
  } else if (subcategory === 'SPORTS BRAS') {
    metafields['Support'] = normTitle.includes('high support') ? 'High' : 'Medium';
    metafields['Compression'] = 'Medium';
    metafields['Padding'] = 'Removable cups';
  } else if (subcategory === 'HOODIES' || subcategory === 'SWEATSHIRTS') {
    metafields['Fit'] = normTitle.includes('oversized') ? 'Oversized' : 'Relaxed';
    metafields['Fabric Weight'] = 'Heavyweight French Terry';
    metafields['Warmth'] = 'High';
  }

  return {
    gender,
    mainCategory,
    subcategory,
    shopifyProductType,
    shopifyCategory,
    color: matchedColor,
    activities,
    naming,
    seo: {
      title: seoTitle,
      description: seoDescription,
      handle: cleanHandle,
      imageALT,
      googlePreview: seoTitle,
      canonical: `https://aya-active.com/products/${cleanHandle}`,
      openGraph: `https://aya-active.com/products/${cleanHandle}`,
      twitterCard: `https://aya-active.com/products/${cleanHandle}`
    },
    tags,
    metafields,
    confidence
  };
}

// Function to allow adding new rules
export function addBrainRule(rule: Omit<BrainRule, 'id'>) {
  const uniqueId = `rule_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const newRule: BrainRule = {
    ...rule,
    id: uniqueId
  };
  brainRules.push(newRule);
  return newRule;
}

// Function to remove rule
export function removeBrainRule(id: string) {
  brainRules = brainRules.filter(r => r.id !== id);
}
