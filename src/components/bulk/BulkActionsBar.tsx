'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Edit2, FolderInput, Tag, Sparkles, ChevronDown } from 'lucide-react'
import { useUIStore } from '@/lib/store/ui.store'
import { BulkEditModal } from './BulkEditModal'

export function BulkActionsBar() {
  const { selectedProductIds, clearSelection } = useUIStore()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const selectedCount = selectedProductIds.size

  return (
    <>
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#0A0A0A] text-white px-3 py-2 rounded-full"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.16)' }}
          >
            {/* Count */}
            <div className="text-[13px] font-medium pl-2 pr-3 border-r border-white/20 whitespace-nowrap">
              {selectedCount} {selectedCount === 1 ? 'product' : 'products'} selected
            </div>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setEditModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                <Edit2 className="h-3.5 w-3.5" />
                Bulk Edit
              </button>

              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-full hover:bg-white/10 transition-colors">
                <FolderInput className="h-3.5 w-3.5" />
                Collection
              </button>

              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-full hover:bg-white/10 transition-colors">
                <Tag className="h-3.5 w-3.5" />
                Add Tags
              </button>

              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-full hover:bg-white/10 transition-colors">
                <Sparkles className="h-3.5 w-3.5" />
                Generate SEO
              </button>

              <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-full hover:bg-white/10 transition-colors">
                <ChevronDown className="h-3.5 w-3.5" />
                More
              </button>
            </div>

            {/* Clear */}
            <div className="border-l border-white/20 ml-1 pl-2">
              <button
                onClick={clearSelection}
                className="flex items-center justify-center h-6 w-6 rounded-full hover:bg-white/10 transition-colors"
                title="Clear selection"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {editModalOpen && (
        <BulkEditModal
          selectedCount={selectedCount}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </>
  )
}
