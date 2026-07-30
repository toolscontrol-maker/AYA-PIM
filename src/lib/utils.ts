import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeDate(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

export function getSEOScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-500'
}

export function getSEOScoreLabel(score: number): string {
  if (score >= 80) return 'Good'
  if (score >= 60) return 'Needs work'
  return 'Poor'
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-50 text-green-700 border-green-200'
    case 'draft': return 'bg-gray-50 text-gray-600 border-gray-200'
    case 'archived': return 'bg-red-50 text-red-600 border-red-200'
    default: return 'bg-gray-50 text-gray-600 border-gray-200'
  }
}

export function calculateCompleteness(product: Record<string, unknown>): number {
  const fields = [
    'title', 'shortName', 'sku', 'vendor', 'category', 'subcategory',
    'collection', 'season', 'color', 'material', 'gender', 'price', 'cost',
  ]
  const seoFields = ['seo.title', 'seo.description']
  let filled = 0
  let total = fields.length + seoFields.length + 2 // +2 for images and tags

  for (const field of fields) {
    const value = product[field]
    if (value !== null && value !== undefined && value !== '') filled++
  }

  // SEO
  const seo = product.seo as Record<string, string> | undefined
  if (seo?.title) filled++
  if (seo?.description) filled++

  // Images
  const images = product.images as unknown[]
  if (images && images.length > 0) filled++

  // Tags
  const tags = product.tags as unknown[]
  if (tags && tags.length > 0) filled++

  return Math.round((filled / total) * 100)
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
