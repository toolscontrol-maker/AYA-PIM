import { ProductTableView } from '@/components/products/ProductTableView'
import { Suspense } from 'react'

export const metadata = { title: 'Products — AYA PIM' }

export default function ProductsPage() {
  return (
    <div className="h-full flex flex-col">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-[#737373] text-sm">Loading products...</div>}>
        <ProductTableView />
      </Suspense>
    </div>
  )
}
