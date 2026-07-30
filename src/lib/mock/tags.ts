export interface Tag {
  id: string
  name: string
  slug: string
  productCount: number
  category: 'gender' | 'type' | 'season' | 'material' | 'activity' | 'brand' | 'misc'
  color?: string
}

export const mockTags: Tag[] = [
  // Gender
  { id: 'tag_1', name: "Women's", slug: 'womens', productCount: 42, category: 'gender', color: '#10B981' },
  { id: 'tag_2', name: "Men's", slug: 'mens', productCount: 30, category: 'gender', color: '#3B82F6' },
  { id: 'tag_3', name: 'Unisex', slug: 'unisex', productCount: 18, category: 'gender', color: '#8B5CF6' },

  // Product Type
  { id: 'tag_4', name: 'Leggings', slug: 'leggings', productCount: 16, category: 'type' },
  { id: 'tag_5', name: 'Sports Bras', slug: 'sports-bras', productCount: 14, category: 'type' },
  { id: 'tag_6', name: 'Tank Tops', slug: 'tank-tops', productCount: 12, category: 'type' },
  { id: 'tag_7', name: 'Crop Tops', slug: 'crop-tops', productCount: 9, category: 'type' },
  { id: 'tag_8', name: 'Shorts', slug: 'shorts', productCount: 10, category: 'type' },
  { id: 'tag_9', name: 'Jackets', slug: 'jackets', productCount: 8, category: 'type' },
  { id: 'tag_10', name: 'Joggers', slug: 'joggers', productCount: 9, category: 'type' },
  { id: 'tag_11', name: 'Hoodies', slug: 'hoodies', productCount: 7, category: 'type' },
  { id: 'tag_12', name: 'Sweatpants', slug: 'sweatpants', productCount: 6, category: 'type' },
  { id: 'tag_13', name: 'Socks', slug: 'socks', productCount: 5, category: 'type' },
  { id: 'tag_14', name: 'Bags', slug: 'bags', productCount: 4, category: 'type' },
  { id: 'tag_15', name: 'Yoga Mats', slug: 'yoga-mats', productCount: 5, category: 'type' },
  { id: 'tag_16', name: 'Water Bottles', slug: 'water-bottles', productCount: 3, category: 'type' },
  { id: 'tag_17', name: 'Headbands', slug: 'headbands', productCount: 3, category: 'type' },
  { id: 'tag_18', name: 'Outerwear', slug: 'outerwear', productCount: 6, category: 'type' },

  // Season
  { id: 'tag_19', name: 'SS25', slug: 'ss25', productCount: 28, category: 'season', color: '#F59E0B' },
  { id: 'tag_20', name: 'AW25', slug: 'aw25', productCount: 22, category: 'season', color: '#6366F1' },
  { id: 'tag_21', name: 'SS24', slug: 'ss24', productCount: 15, category: 'season', color: '#E11D48' },
  { id: 'tag_22', name: 'AW24', slug: 'aw24', productCount: 12, category: 'season', color: '#475569' },
  { id: 'tag_23', name: 'Core', slug: 'core', productCount: 35, category: 'season', color: '#0A0A0A' },
  { id: 'tag_24', name: 'All Season', slug: 'all-season', productCount: 40, category: 'season' },
  { id: 'tag_25', name: 'Summer Capsule', slug: 'summer', productCount: 14, category: 'season' },
  { id: 'tag_26', name: 'Winter Warmth', slug: 'winter', productCount: 11, category: 'season' },

  // Material
  { id: 'tag_27', name: 'Organic Cotton', slug: 'organic-cotton', productCount: 25, category: 'material' },
  { id: 'tag_28', name: 'Recycled Nylon', slug: 'recycled-nylon', productCount: 32, category: 'material' },
  { id: 'tag_29', name: 'Merino Wool', slug: 'merino-wool', productCount: 12, category: 'material' },
  { id: 'tag_30', name: 'Seamless Knit', slug: 'seamless-knit', productCount: 28, category: 'material' },
  { id: 'tag_31', name: 'Bamboo Viscose', slug: 'bamboo-viscose', productCount: 10, category: 'material' },
  { id: 'tag_32', name: 'EcoLyte Stretch', slug: 'ecolyte-stretch', productCount: 18, category: 'material' },
  { id: 'tag_33', name: 'Cashmere Blend', slug: 'cashmere-blend', productCount: 6, category: 'material' },
  { id: 'tag_34', name: 'Breathable Mesh', slug: 'breathable-mesh', productCount: 14, category: 'material' },
  { id: 'tag_35', name: 'Modal Soft', slug: 'modal-soft', productCount: 11, category: 'material' },
  { id: 'tag_36', name: 'Spandex Blend', slug: 'spandex-blend', productCount: 22, category: 'material' },

  // Activity
  { id: 'tag_37', name: 'Yoga', slug: 'yoga', productCount: 34, category: 'activity' },
  { id: 'tag_38', name: 'Pilates', slug: 'pilates', productCount: 30, category: 'activity' },
  { id: 'tag_39', name: 'Running', slug: 'running', productCount: 20, category: 'activity' },
  { id: 'tag_40', name: 'HIIT & Cardio', slug: 'hiit', productCount: 16, category: 'activity' },
  { id: 'tag_41', name: 'Studio Training', slug: 'studio', productCount: 26, category: 'activity' },
  { id: 'tag_42', name: 'Recovery', slug: 'recovery', productCount: 14, category: 'activity' },
  { id: 'tag_43', name: 'Lounge', slug: 'lounge', productCount: 18, category: 'activity' },
  { id: 'tag_44', name: 'Outdoor Trail', slug: 'outdoor', productCount: 12, category: 'activity' },
  { id: 'tag_45', name: 'Tennis', slug: 'tennis', productCount: 8, category: 'activity' },
  { id: 'tag_46', name: 'Travel', slug: 'travel', productCount: 15, category: 'activity' },

  // Brand Lines
  { id: 'tag_47', name: 'AYA Signature', slug: 'aya-signature', productCount: 45, category: 'brand', color: '#0A0A0A' },
  { id: 'tag_48', name: 'AYA Lab', slug: 'aya-lab', productCount: 12, category: 'brand', color: '#2563EB' },
  { id: 'tag_49', name: 'AYA Earth', slug: 'aya-earth', productCount: 24, category: 'brand', color: '#16A34A' },
  { id: 'tag_50', name: 'AYA Studio', slug: 'aya-studio', productCount: 19, category: 'brand', color: '#D97706' },
  { id: 'tag_51', name: 'AYA Black', slug: 'aya-black', productCount: 10, category: 'brand', color: '#171717' },

  // Misc
  { id: 'tag_52', name: 'Best Seller', slug: 'best-seller', productCount: 15, category: 'misc', color: '#DC2626' },
  { id: 'tag_53', name: 'New Arrival', slug: 'new-arrival', productCount: 18, category: 'misc', color: '#059669' },
  { id: 'tag_54', name: 'Sustainable', slug: 'sustainable', productCount: 38, category: 'misc', color: '#15803D' },
  { id: 'tag_55', name: 'Limited Edition', slug: 'limited-edition', productCount: 6, category: 'misc', color: '#7C3AED' },
  { id: 'tag_56', name: 'Gift Guide', slug: 'gift-guide', productCount: 16, category: 'misc' },
  { id: 'tag_57', name: 'Waterproof', slug: 'waterproof', productCount: 7, category: 'misc' },
  { id: 'tag_58', name: 'Quick Dry', slug: 'quick-dry', productCount: 22, category: 'misc' },
  { id: 'tag_59', name: 'Thermal Insulation', slug: 'thermal', productCount: 9, category: 'misc' },
  { id: 'tag_60', name: 'Odor Resistant', slug: 'odor-resistant', productCount: 14, category: 'misc' },
  { id: 'tag_61', name: 'Zero Waste', slug: 'zero-waste', productCount: 8, category: 'misc' },
]
