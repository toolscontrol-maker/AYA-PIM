"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowRight, FolderInput, Tag, DollarSign, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BulkEditModalProps {
  onClose: () => void
  selectedCount: number
}

const actions = [
  { id: 'collection', label: 'Change Collection', icon: FolderInput },
  { id: 'tags-add', label: 'Add Tags', icon: Tag },
  { id: 'tags-replace', label: 'Replace Tags', icon: RefreshCw },
  { id: 'price-increase', label: 'Increase Price', icon: DollarSign },
  { id: 'status', label: 'Change Status', icon: RefreshCw },
  { id: 'ai-seo', label: 'Generate SEO', icon: Sparkles, ai: true },
  { id: 'ai-desc', label: 'Generate Description', icon: Sparkles, ai: true },
]

export function BulkEditModal({ onClose, selectedCount }: BulkEditModalProps) {
  const [selectedAction, setSelectedAction] = useState(actions[0].id)
  const [isExecuting, setIsExecuting] = useState(false)


  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
            <h2 className="text-lg font-medium text-[#0A0A0A]">Bulk Edit {selectedCount} Products</h2>
            <button onClick={onClose} className="p-2 -mr-2 text-[#737373] hover:text-[#0A0A0A] transition-colors rounded-lg hover:bg-[#FAFAFA]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-1 min-h-0">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-[#E5E5E5] bg-[#FAFAFA] overflow-y-auto">
              <div className="p-3">
                <div className="text-[11px] uppercase tracking-wider text-[#737373] font-medium mb-2 px-3">Actions</div>
                <div className="space-y-0.5">
                  {actions.map(action => (
                    <button
                      key={action.id}
                      onClick={() => setSelectedAction(action.id)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors text-left",
                        selectedAction === action.id 
                          ? "bg-white border border-[#E5E5E5] text-[#0A0A0A] font-medium shadow-sm" 
                          : "text-[#404040] hover:bg-[#E5E5E5]/50 border border-transparent"
                      )}
                    >
                      <action.icon className={cn("w-4 h-4", action.ai ? "text-[#A855F7]" : "text-[#737373]")} />
                      <span className="flex-1">{action.label}</span>
                      {action.ai && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#A855F7]/10 text-[#A855F7]">AI</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Config */}
            <div className="w-2/3 p-6 overflow-y-auto bg-white flex flex-col">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#0A0A0A] mb-4">
                  {actions.find(a => a.id === selectedAction)?.label}
                </h3>
                
                {/* Dummy config area */}
                {selectedAction === 'collection' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] text-[#737373] mb-1.5">Select Collection</label>
                      <select className="w-full h-[36px] px-3 text-[13px] border border-[#E5E5E5] rounded focus:outline-none focus:border-[#0A0A0A] bg-white">
                        <option>Summer Collection</option>
                        <option>Essentials</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                  </div>
                )}
                
                {selectedAction === 'ai-seo' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5]">
                      <div className="flex gap-3 text-sm text-[#404040]">
                        <Sparkles className="w-5 h-5 text-[#A855F7] shrink-0" />
                        <div>
                          <p className="font-medium text-[#0A0A0A] mb-1">AI SEO Generation</p>
                          <p>This will automatically generate optimized SEO titles and descriptions for all {selectedCount} selected products based on their current names, descriptions, and materials.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E5E5]">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#737373]">
                    This will affect <strong className="text-[#0A0A0A]">{selectedCount}</strong> products
                  </div>
                  <button 
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                      "bg-[#0A0A0A] text-white hover:bg-[#404040]"
                    )}
                    onClick={() => {
                      setIsExecuting(true)
                      setTimeout(() => { setIsExecuting(false); onClose() }, 2000)
                    }}
                  >
                    {isExecuting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Applying...
                      </>
                    ) : (
                      <>
                        Apply changes
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
