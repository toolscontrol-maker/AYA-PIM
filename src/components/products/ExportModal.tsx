'use client'

import React, { useState } from 'react'
import { X, Download, FileText, Code, Database, Table, FileSpreadsheet, CheckSquare, Square } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: any[]
}

const AVAILABLE_FIELDS = [
  { key: 'id', label: 'ID del Producto' },
  { key: 'name', label: 'Nombre' },
  { key: 'handle', label: 'Handle (URL)' },
  { key: 'price', label: 'Precio (€)' },
  { key: 'status', label: 'Estado (Status)' },
  { key: 'category', label: 'Categoría' },
  { key: 'subcategory', label: 'Subcategoría' },
  { key: 'gender', label: 'Género' },
  { key: 'collection', label: 'Colección' },
  { key: 'color', label: 'Color' },
  { key: 'seoScore', label: 'Puntuación SEO' },
  { key: 'lastUpdated', label: 'Última Actualización' }
]

type ExportFormat = 'csv' | 'json' | 'markdown' | 'excel' | 'pdf'

export function ExportModal({ isOpen, onClose, selectedProducts }: ExportModalProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>(AVAILABLE_FIELDS.map(f => f.key))
  const [format, setFormat] = useState<ExportFormat>('csv')
  const [isExporting, setIsExporting] = useState(false)

  if (!isOpen) return null

  const handleToggleField = (key: string) => {
    setSelectedFields(prev => 
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    )
  }

  const handleSelectAll = () => {
    setSelectedFields(AVAILABLE_FIELDS.map(f => f.key))
  }

  const handleSelectNone = () => {
    setSelectedFields([])
  }

  const generateExportData = () => {
    setIsExporting(true)
    
    // Filter product keys based on selected fields
    const exportRows = selectedProducts.map(prod => {
      const row: Record<string, any> = {}
      selectedFields.forEach(field => {
        row[field] = prod[field] ?? ''
      })
      return row
    })

    const headers = AVAILABLE_FIELDS.filter(f => selectedFields.includes(f.key))
    let content = ''
    let mimeType = 'text/plain'
    let filename = `aya-export-${new Date().toISOString().slice(0, 10)}`

    switch (format) {
      case 'csv':
        mimeType = 'text/csv;charset=utf-8;'
        filename += '.csv'
        // Create CSV Header
        content = headers.map(h => `"${h.label}"`).join(',') + '\n'
        // Create CSV Body
        content += exportRows.map(row => 
          headers.map(h => {
            const val = row[h.key]
            return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : `"${val}"`
          }).join(',')
        ).join('\n')
        break

      case 'json':
        mimeType = 'application/json'
        filename += '.json'
        content = JSON.stringify(exportRows, null, 2)
        break

      case 'markdown':
        mimeType = 'text/markdown'
        filename += '.md'
        // Create Markdown Header
        content = `# AYA Catalog Export - ${new Date().toLocaleDateString()}\n\n`
        content += `Exported ${selectedProducts.length} products.\n\n`
        content += `| ` + headers.map(h => h.label).join(' | ') + ` |\n`
        content += `| ` + headers.map(() => '---').join(' | ') + ` |\n`
        // Create Markdown Body
        content += exportRows.map(row => 
          `| ` + headers.map(h => {
            const val = row[h.key]
            if (h.key === 'price') return `€${Number(val).toFixed(2)}`
            return val
          }).join(' | ') + ` |`
        ).join('\n')
        break

      case 'excel':
        mimeType = 'application/vnd.ms-excel'
        filename += '.xls'
        content = `
          <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
          <head>
            <meta charset="utf-8">
            <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>AYA PIM Export</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            <style>
              th { background-color: #7C3AED; color: #FFFFFF; font-weight: bold; }
              td, th { border: 1px solid #E5E5E5; padding: 6px; text-align: left; }
            </style>
          </head>
          <body>
            <h2>AYA PIM Export - ${new Date().toLocaleDateString()}</h2>
            <table>
              <thead>
                <tr>${headers.map(h => `<th>${h.label}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${exportRows.map(row => 
                  `<tr>${headers.map(h => {
                    const val = row[h.key]
                    if (h.key === 'price') return `<td>${Number(val).toFixed(2)}</td>`
                    return `<td>${val}</td>`
                  }).join('')}</tr>`
                ).join('')}
              </tbody>
            </table>
          </body>
          </html>
        `
        break

      case 'pdf':
        // We will output a beautifully styled, print-ready HTML catalog.
        mimeType = 'text/html'
        filename += '-catalog.html'
        content = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>AYA Brand Catalog</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');
              body { font-family: 'Inter', sans-serif; color: #0A0A0A; margin: 0; padding: 40px; background-color: #FFFFFF; }
              .header { border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
              .logo { font-family: 'Playfair Display', serif; font-size: 28px; letter-spacing: 0.3em; font-weight: bold; }
              .subtitle { font-size: 11px; text-transform: uppercase; tracking: 0.1em; color: #737373; font-mono; }
              .title-group h1 { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: normal; margin: 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 30px; }
              th { border-bottom: 2px solid #000; padding: 12px 8px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; color: #737373; }
              td { padding: 12px 8px; border-bottom: 1px solid #E5E5E5; font-size: 13px; }
              .price { font-weight: 600; }
              .status-active { color: #16A34A; }
              .status-draft { color: #D97706; }
              .status-archived { color: #DC2626; }
              @media print {
                body { padding: 0; }
                button { display: none; }
                @page { size: A4 landscape; margin: 1.5cm; }
              }
            </style>
          </head>
          <body>
            <div style="max-width: 1200px; margin: 0 auto;">
              <div class="header">
                <div class="title-group">
                  <div class="subtitle">AYA PIM Exports</div>
                  <h1>Brand Products Catalog</h1>
                </div>
                <div class="logo">A Y A</div>
              </div>
              <p style="font-size: 13px; color: #525252;">Este catálogo contiene una exportación oficial de los ${selectedProducts.length} productos seleccionados el ${new Date().toLocaleDateString()}.</p>
              
              <button onclick="window.print()" style="padding: 8px 16px; background-color: #0A0A0A; color: white; border: none; font-size: 12px; font-weight: 500; border-radius: 4px; cursor: pointer; margin-bottom: 20px;">
                Guardar / Imprimir PDF
              </button>

              <table>
                <thead>
                  <tr>
                    ${headers.map(h => `<th>${h.label}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${selectedProducts.map(p => `
                    <tr>
                      ${headers.map(h => {
                        const val = p[h.key] ?? ''
                        if (h.key === 'price') return `<td class="price">€${Number(val).toFixed(2)}</td>`
                        if (h.key === 'status') return `<td><span class="status-${val}">${val.toUpperCase()}</span></td>`
                        return `<td>${val}</td>`
                      }).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </body>
          </html>
        `
        break
    }

    // Trigger download
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setTimeout(() => {
      setIsExporting(false)
      onClose()
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0A0A0A] border border-purple-950/40 rounded-xl overflow-hidden shadow-2xl aya-pattern-dark aya-pattern-glow flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-purple-950/40 bg-gradient-to-r from-[#0C0A0F] to-[#120D1A] shrink-0">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-purple-400" /> Exportar Selección de Productos
            </h2>
            <p className="text-xs text-purple-300/50 mt-1">
              Exportando {selectedProducts.length} producto{selectedProducts.length === 1 ? '' : 's'} en el formato deseado
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 text-purple-400/60 hover:text-white hover:bg-purple-950/30 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Formato */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">1. Seleccionar Formato</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: 'csv', label: 'CSV Shopify', desc: 'Para importar', icon: <Table className="w-4 h-4" /> },
                { id: 'excel', label: 'Excel (XLS)', desc: 'Hoja cálculo', icon: <FileSpreadsheet className="w-4 h-4" /> },
                { id: 'markdown', label: 'Markdown', desc: 'Tabla texto', icon: <FileText className="w-4 h-4" /> },
                { id: 'json', label: 'JSON API', desc: 'Datos crudos', icon: <Code className="w-4 h-4" /> },
                { id: 'pdf', label: 'PDF Catalog', desc: 'Ficha bonita', icon: <Database className="w-4 h-4" /> },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setFormat(opt.id as ExportFormat)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all cursor-pointer",
                    format === opt.id
                      ? "bg-purple-900/40 border-purple-500 text-white shadow-md shadow-purple-950/30"
                      : "bg-[#120D1A]/50 border-purple-950/30 text-purple-300/60 hover:border-purple-800/40 hover:text-purple-200"
                  )}
                >
                  <span className="text-purple-400 mb-1.5">{opt.icon}</span>
                  <span className="text-xs font-bold block">{opt.label}</span>
                  <span className="text-[9px] opacity-60 block mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Campos */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">2. Seleccionar Atributos a Exportar</h3>
              <div className="flex gap-2 text-[10px] font-bold">
                <button onClick={handleSelectAll} className="text-purple-300 hover:text-white cursor-pointer">Seleccionar Todos</button>
                <span className="text-purple-950">|</span>
                <button onClick={handleSelectNone} className="text-purple-300 hover:text-white cursor-pointer">Deseleccionar Todos</button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#120D1A]/30 border border-purple-950/40 rounded-lg">
              {AVAILABLE_FIELDS.map(f => {
                const active = selectedFields.includes(f.key)
                return (
                  <button
                    key={f.key}
                    onClick={() => handleToggleField(f.key)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded text-left transition-colors text-xs cursor-pointer select-none",
                      active 
                        ? "text-white" 
                        : "text-purple-300/40 hover:text-purple-300/70"
                    )}
                  >
                    {active ? (
                      <CheckSquare className="w-4 h-4 text-purple-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-purple-950 shrink-0" />
                    )}
                    <span className="truncate">{f.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-purple-950/40 bg-[#0C0A0F] shrink-0 flex items-center justify-between">
          <div className="text-[11px] text-purple-400/50">
            {selectedFields.length} atributos seleccionados
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onClose} 
              className="px-4 py-2 border border-purple-950/80 bg-[#120D1A] text-purple-300 rounded-md text-xs font-semibold hover:bg-purple-950 hover:text-white transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={generateExportData}
              disabled={selectedFields.length === 0 || isExporting}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 border border-purple-500/30 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              {isExporting ? 'Exportando...' : 'Descargar Archivo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
