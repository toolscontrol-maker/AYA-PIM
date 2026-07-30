'use client'

import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  RowSelectionState
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { InlineCell } from './InlineCell'
import { SEOScoreCell } from './SEOScoreCell'
import { StatusBadge } from './StatusBadge'
import { ContextMenu, ContextMenuItem } from './ContextMenu'
import Link from 'next/link'
import { Edit2, Copy, Tag, Trash2, Settings, FolderPlus, RefreshCw } from 'lucide-react'
import { mockProducts as fallbackProducts } from '@/lib/mock/products'
import { useUIStore } from '@/lib/store/ui.store'

interface TableProduct {
  id: string
  name: string
  shortName: string
  image: string
  gender: string
  category: string
  subcategory: string
  collection: string
  season: string
  color: string
  sizes: string[]
  price: number
  status: string
  seoScore: number
  lastUpdated: string
  published: boolean
}

const mapProductToTableRow = (p: any): TableProduct => ({
  id: p.id,
  name: p.title || p.name || 'Untitled Product',
  shortName: p.shortName || (p.title ? p.title.split(' ')[0] : 'Item'),
  image: p.images?.[0]?.src || p.image || `https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&q=80`,
  gender: p.gender ? p.gender.charAt(0).toUpperCase() + p.gender.slice(1) : 'Unisex',
  category: p.category || 'Activewear',
  subcategory: p.subcategory || 'General',
  collection: p.collection || 'Core Collection',
  season: p.season || 'Core',
  color: p.color || 'Noir',
  sizes: p.sizes || ['XS', 'S', 'M', 'L', 'XL'],
  price: p.price || 0,
  status: p.status || 'active',
  seoScore: p.seo?.score || p.seoScore || 85,
  lastUpdated: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : 'Just now',
  published: p.status === 'active',
})

const columnHelper = createColumnHelper<TableProduct>()

export function ProductTableView() {
  const [data, setData] = useState<TableProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<'shopify' | 'mock'>('mock')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, rowId: string } | null>(null)

  const { toggleProductSelection, clearSelection, selectAllProducts } = useUIStore()

  // Fetch products from Shopify sync endpoint
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/shopify/sync')
      const json = await res.json()
      if (json.success && json.products && json.products.length > 0) {
        const mapped = json.products.map(mapProductToTableRow)
        setData(mapped)
        setSource(json.source || 'mock')
      } else {
        setData(fallbackProducts.map(mapProductToTableRow))
      }
    } catch {
      setData(fallbackProducts.map(mapProductToTableRow))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSave = useCallback((id: string, field: keyof TableProduct, value: any) => {
    setData(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }, [])

  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false
      if (globalFilter) {
        const query = globalFilter.toLowerCase()
        return (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.collection.toLowerCase().includes(query)
        )
      }
      return true
    })
  }, [data, statusFilter, globalFilter])

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="w-4 h-4 rounded border-[#E5E5E5] text-black focus:ring-black accent-black cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 rounded border-[#E5E5E5] text-black focus:ring-black accent-black cursor-pointer"
        />
      ),
      size: 40,
    }),
    columnHelper.accessor('image', {
      header: 'IMG',
      cell: info => <img src={info.getValue()} alt="" className="w-10 h-10 object-cover rounded-sm border border-[#E5E5E5]" />,
      size: 56,
    }),
    columnHelper.accessor('name', {
      header: 'Product',
      cell: info => (
        <div className="flex flex-col truncate px-2 w-full">
          <Link href={`/products/${info.row.original.id}`} className="text-[13px] font-semibold text-[#0A0A0A] hover:underline truncate">
            {info.getValue()}
          </Link>
          <span className="text-[11px] text-[#737373] truncate">{info.row.original.shortName}</span>
        </div>
      ),
      size: 240,
    }),
    columnHelper.accessor('gender', {
      header: 'Gender',
      cell: info => <InlineCell value={info.getValue()} onSave={(v) => handleSave(info.row.original.id, 'gender', v)} type="select" options={[{label:'Women', value:'Women'}, {label:'Men', value:'Men'}, {label:'Unisex', value:'Unisex'}]} />,
      size: 100,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => <InlineCell value={info.getValue()} onSave={(v) => handleSave(info.row.original.id, 'category', v)} />,
      size: 120,
    }),
    columnHelper.accessor('subcategory', {
      header: 'Subcategory',
      cell: info => <InlineCell value={info.getValue()} onSave={(v) => handleSave(info.row.original.id, 'subcategory', v)} className="text-[#737373]" />,
      size: 120,
    }),
    columnHelper.accessor('collection', {
      header: 'Collection',
      cell: info => <InlineCell value={info.getValue()} onSave={(v) => handleSave(info.row.original.id, 'collection', v)} />,
      size: 130,
    }),
    columnHelper.accessor('season', {
      header: 'Season',
      cell: info => (
        <span className="px-2 py-0.5 text-[11px] font-medium bg-[#FAFAFA] border border-[#E5E5E5] rounded text-[#404040]">
          {info.getValue()}
        </span>
      ),
      size: 90,
    }),
    columnHelper.accessor('color', {
      header: 'Color',
      cell: info => (
        <div className="flex items-center gap-1.5 px-2 w-full">
          <div className="w-2.5 h-2.5 rounded-full border border-[#E5E5E5] shrink-0" style={{ background: info.getValue().toLowerCase() === 'noir' ? '#0F0F0F' : info.getValue().toLowerCase() }} />
          <InlineCell value={info.getValue()} onSave={(v) => handleSave(info.row.original.id, 'color', v)} className="px-0" />
        </div>
      ),
      size: 110,
    }),
    columnHelper.accessor('sizes', {
      header: 'Sizes',
      cell: info => <span className="text-[12px] text-[#404040] truncate px-2">{Array.isArray(info.getValue()) ? info.getValue().join(', ') : ''}</span>,
      size: 110,
    }),
    columnHelper.accessor('price', {
      header: () => <div className="text-right w-full px-2">Price</div>,
      cell: info => <InlineCell value={info.getValue()} onSave={(v) => handleSave(info.row.original.id, 'price', Number(v))} type="number" formatter={(v) => `€${Number(v).toFixed(2)}`} className="text-right tabular-nums w-full" />,
      size: 100,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => <div className="px-2"><StatusBadge status={info.getValue()} /></div>,
      size: 100,
    }),
    columnHelper.accessor('seoScore', {
      header: 'SEO',
      cell: info => <div className="px-2 h-full"><SEOScoreCell score={info.getValue()} issues={['Needs meta description optimization']} /></div>,
      size: 90,
    }),
    columnHelper.accessor('lastUpdated', {
      header: 'Updated',
      cell: info => <span className="text-[12px] text-[#737373] px-2">{info.getValue()}</span>,
      size: 110,
    }),
  ], [handleSave])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  // Sync selection to Zustand store
  useEffect(() => {
    const selectedIds = table.getSelectedRowModel().flatRows.map(row => row.original.id)
    if (selectedIds.length > 0) {
      selectAllProducts(selectedIds)
    } else {
      clearSelection()
    }
  }, [rowSelection, data, selectAllProducts, clearSelection])

  const tableContainerRef = useRef<HTMLDivElement>(null)
  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 48,
    overscan: 10,
  })

  // Compute dynamic stats
  const stats = useMemo(() => {
    const total = data.length
    const active = data.filter(p => p.status === 'active').length
    const draft = data.filter(p => p.status === 'draft').length
    const archived = data.filter(p => p.status === 'archived').length
    return { total, active, draft, archived }
  }, [data])

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Dynamic Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#E5E5E5]">
        <div>
          <h1 className="text-[15px] font-semibold tracking-tight">Products</h1>
          <p className="text-[12px] text-[#737373] mt-0.5">
            {loading ? (
              <span>Calculating catalog statistics...</span>
            ) : (
              <span>
                {stats.total} products · {stats.active} active · {stats.draft > 0 ? `${stats.draft} draft · ` : ''}{stats.archived} archived
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-[#404040] border border-[#E5E5E5] rounded hover:bg-[#FAFAFA] transition-colors">
            Columns
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] bg-[#0A0A0A] text-white rounded hover:bg-[#262626] transition-colors">
            + New Product
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-[#E5E5E5] bg-white text-[13px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#FAFAFA] p-0.5 rounded border border-[#E5E5E5]">
            {['all', 'active', 'draft', 'archived'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded text-[12px] font-medium capitalize transition-colors ${
                  statusFilter === st ? 'bg-white text-[#0A0A0A] shadow-xs' : 'text-[#737373] hover:text-[#0A0A0A]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {source === 'shopify' ? (
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 text-[11px] font-medium rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live Shopify Catalog
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#FAFAFA] text-[#737373] border border-[#E5E5E5] text-[11px] font-medium rounded-full">
              Local Mock Catalog
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#E5E5E5] text-[#404040] hover:bg-[#FAFAFA] transition-colors disabled:opacity-50"
            title="Refresh catalog from Shopify"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
          
          <input
            type="text"
            placeholder="Search..."
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            className="px-2.5 py-1 text-[12px] border border-[#E5E5E5] rounded bg-white focus:outline-none focus:border-[#0A0A0A] w-48"
          />
          <span className="text-[12px] text-[#737373]">
            {filteredData.length} items
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div ref={tableContainerRef} className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-[13px] text-[#737373] gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Loading catalog from Shopify...
          </div>
        ) : (
          <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
            <thead className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5]">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="px-2 py-2 text-[11px] font-semibold text-[#737373] uppercase tracking-wider select-none"
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const row = rows[virtualRow.index]
                if (!row) return null

                return (
                  <tr
                    key={row.id}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      setContextMenu({ x: e.clientX, y: e.clientY, rowId: row.original.id })
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className={`border-b border-[#E5E5E5] flex items-center transition-colors ${
                      row.getIsSelected() ? 'bg-[#FAFAFA] border-l-2 border-l-[#0A0A0A]' : 'hover:bg-[#FAFAFA]'
                    }`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className="px-2 py-1 text-[13px] flex items-center overflow-hidden h-full"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          items={[
            { label: 'Edit Product', onClick: () => window.location.href = `/products/${contextMenu.rowId}` },
            { label: 'Duplicate', onClick: () => {} },
            { label: 'Add to Collection', onClick: () => {} },
            { label: 'Generate Tags with AI', onClick: () => {} },
            { separator: true, label: '' },
            { label: 'Delete', onClick: () => {}, danger: true },
          ]}
        />
      )}
    </div>
  )
}
