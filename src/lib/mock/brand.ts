export interface BrandDNA {
  name: string
  tagline: string
  mission: string
  luxuryLevel: 1 | 2 | 3 | 4 | 5
  tone: string[]
  targetAudience: {
    gender: string[]
    activities: string[]
    ageRange: [number, number]
  }
  voiceRules: {
    neverUse: string[]
    alwaysUse: string[]
  }
  seoRules: {
    titleStructure: string
    metaStructure: string
    globalKeywords: string[]
    categoryKeywords: Record<string, string[]>
  }
  namingRules: Record<string, string>
  colorVocabulary: Record<string, string>
  seasons: string[]
  materials: string[]
  certifications: string[]
  packagingType: string[]
}

export const ayaBrandDNA: BrandDNA = {
  name: 'AYA',
  tagline: 'Luxury Activewear Inspired by Nature',
  mission: 'To create the most refined activewear on earth, engineered for movement and designed for life.',
  luxuryLevel: 5,
  tone: ['Elegant', 'Minimal', 'Calm', 'Premium', 'Editorial'],
  targetAudience: {
    gender: ['Women', 'Men', 'Unisex'],
    activities: ['Yoga', 'Pilates', 'Running', 'Studio', 'Recovery', 'Lounge'],
    ageRange: [25, 50],
  },
  voiceRules: {
    neverUse: ['cheap', 'perfect', 'best', 'amazing', 'great', 'awesome', 'incredible'],
    alwaysUse: ['Engineered', 'Designed', 'Crafted', 'Premium', 'Refined', 'Natural', 'Movement'],
  },
  seoRules: {
    titleStructure: 'AYA | {Product} | Luxury Activewear Inspired by Nature',
    metaStructure: 'Discover {Product} by AYA. Crafted with {Material} for unparalleled comfort and performance inspired by nature.',
    globalKeywords: [
      'luxury activewear',
      'sustainable activewear',
      'AYA activewear',
      'designer sportswear',
      'eco luxury apparel',
      'seamless activewear',
      'minimalist activewear',
    ],
    categoryKeywords: {
      leggings: ['luxury leggings', 'high waist leggings', 'seamless compression leggings', 'recycled nylon leggings'],
      sportsBras: ['luxury sports bra', 'high support sports bra', 'seamless yoga bra', 'minimalist bra top'],
      jackets: ['luxury activewear jacket', 'waterproof running shell', 'lightweight windbreaker'],
      joggers: ['luxury joggers', 'merino wool sweatpants', 'tailored lounge pants'],
    },
  },
  namingRules: {
    collectionPrefix: 'AYA',
    productFormat: 'AYA {Descriptor} {Category}',
    colorFormat: 'AYA {Shade}',
  },
  colorVocabulary: {
    Black: 'Noir',
    White: 'Ivory',
    Beige: 'Stone',
    Grey: 'Slate',
    Green: 'Forest',
    Brown: 'Clay',
    Cream: 'Sand',
    Sage: 'Sage',
  },
  seasons: ['SS25', 'AW25', 'SS24', 'AW24', 'Core'],
  materials: [
    'Organic Cotton',
    'Recycled Nylon',
    'Merino Wool',
    'Seamless Knit',
    'Bamboo Viscose',
    'EcoLyte Stretch',
    'Cashmere Blend',
    'Modal Soft',
  ],
  certifications: [
    'OEKO-TEX Standard 100',
    'GOTS Certified Organic Cotton',
    'Global Recycled Standard (GRS)',
    'Bluesign Certified',
    'B Corp Certified',
    'Climate Neutral Certified',
  ],
  packagingType: [
    '100% Recycled Rigid Presentation Box',
    'FSC-Certified Craft Envelope',
    'Compostable Bio-Polybag',
    'Organic Cotton Drawstring Dust Bag',
  ],
}
