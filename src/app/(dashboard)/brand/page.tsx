"use client"

import React, { useState } from 'react'
import { 
  Sparkles, Search, Plus, Trash2, CheckCircle2, 
  Settings, Layers, Compass, HelpCircle, Save, Sliders, Info
} from 'lucide-react'
import { TAXONOMY, COLOR_LIBRARY, brainRules, addBrainRule, removeBrainRule, classifyProduct, type BrainRule } from '@/lib/brand/brain'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui.store'

export default function BrandBrainPage() {
  const [activeTab, setActiveTab] = useState<'taxonomy' | 'colors' | 'rules' | 'sandbox'>('taxonomy')
  const [rules, setRules] = useState<BrainRule[]>(brainRules)
  const [searchTax, setSearchTax] = useState('')
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved')
  const addNotification = useUIStore(s => s.addNotification)

  // Sandbox state
  const [testTitle, setTestTitle] = useState("Women's High Rise Leggings")
  const [sandboxResult, setSandboxResult] = useState(() => classifyProduct("Women's High Rise Leggings"))

  // Visual Rule Builder state
  const [whenGender, setWhenGender] = useState('Woman')
  const [whenSubcat, setWhenSubcat] = useState('LEGGINGS')
  const [thenCollection, setThenCollection] = useState("Women's Leggings")
  const [thenType, setThenType] = useState('Leggings')

  const handleTestSandbox = (val: string) => {
    setTestTitle(val)
    setSandboxResult(classifyProduct(val))
  }

  const handleAddRule = () => {
    const newRule = addBrainRule({
      when: { gender: whenGender, subcategory: whenSubcat },
      then: {
        collection: thenCollection,
        productType: thenType,
        generateSEO: true,
        generateTags: true,
        generateHandle: true,
        generateMetafields: true,
        generateALT: true
      }
    })
    setRules([...rules, newRule])
    addNotification({
      type: 'success',
      title: 'Rule added',
      message: 'New classification rule saved in Brand Brain.',
      duration: 3000
    })
  }

  const handleDeleteRule = (id: string) => {
    removeBrainRule(id)
    setRules(rules.filter(r => r.id !== id))
    addNotification({
      type: 'success',
      title: 'Rule removed',
      message: 'Classification rule deleted successfully.',
      duration: 3000
    })
  }

  const triggerSave = () => {
    setSaveStatus('saving')
    setTimeout(() => {
      setSaveStatus('saved')
      addNotification({
        type: 'success',
        title: 'Brand Brain Synced',
        message: 'All taxonomies and rules are actively running on PIM.',
        duration: 3000
      })
    }, 600)
  }

  return (
    <div className="flex-1 overflow-auto bg-white text-[#0A0A0A] font-sans h-full min-h-screen">
      {/* Top Banner - Apple Console Style */}
      <div className="border-b border-[#E5E5E5] sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A] animate-pulse" />
              <h1 className="text-lg font-semibold tracking-tight">AYA Brand Brain</h1>
            </div>
            <p className="text-xs text-[#737373] mt-0.5 font-mono">Knowledge Base & Semantic Processing Rules</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#737373] font-mono">
              {saveStatus === 'saving' ? "Syncing..." : "Status: Active & Synced"}
            </span>
            <button 
              onClick={triggerSave}
              className="bg-[#0A0A0A] text-white text-xs px-3.5 py-1.5 rounded font-medium hover:bg-[#262626] transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Sync Brain
            </button>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="max-w-6xl mx-auto px-8 flex gap-6 text-sm">
          {[
            { id: 'taxonomy', label: 'Taxonomy & Mappings' },
            { id: 'colors', label: 'Color Library' },
            { id: 'rules', label: 'Rule Builder' },
            { id: 'sandbox', label: 'AI Sandbox' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "py-3 font-medium transition-colors border-b-2 relative -mb-[1px]",
                activeTab === tab.id 
                  ? "text-[#0A0A0A] border-[#0A0A0A]" 
                  : "text-[#737373] border-transparent hover:text-[#0A0A0A]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Tab 1: Taxonomy */}
        {activeTab === 'taxonomy' && (
          <div className="space-y-10">
            {/* Intro */}
            <div className="p-5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg flex gap-4 items-start max-w-3xl">
              <Info className="w-5 h-5 text-[#737373] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Core Brand Taxonomy</h3>
                <p className="text-xs text-[#737373] mt-1 leading-relaxed">
                  These values are AYA's strict brand limits. The system prevents tagging products with external categories or running/gym tags. AI categorizes products automatically based on title semantic analysis.
                </p>
              </div>
            </div>

            {/* Taxonomy categories */}
            <div className="grid grid-cols-3 gap-8">
              {/* Gender */}
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#737373]">Gender</div>
                <div className="space-y-1">
                  {TAXONOMY.genders.map(g => (
                    <div key={g} className="px-3 py-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded text-sm font-medium">
                      {g}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Category */}
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#737373]">Main Category</div>
                <div className="space-y-1">
                  {TAXONOMY.mainCategories.map(m => (
                    <div key={m} className="px-3 py-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded text-sm font-medium flex justify-between">
                      {m}
                      <span className="text-[10px] text-[#737373] uppercase font-mono mt-0.5">Inferred</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subcategories (Scrollable/searchable) */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#737373]">Subcategory (19)</div>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTax}
                    onChange={(e) => setSearchTax(e.target.value)}
                    className="text-[11px] px-2 py-0.5 border border-[#E5E5E5] rounded w-28 bg-white focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto border border-[#E5E5E5] rounded p-2 bg-[#FAFAFA]">
                  {TAXONOMY.subcategories
                    .filter(s => s.toLowerCase().includes(searchTax.toLowerCase()))
                    .map(s => (
                      <div key={s} className="px-2 py-1.5 hover:bg-white rounded text-xs font-mono font-medium transition-colors flex justify-between items-center">
                        {s}
                        <span className="text-[9px] bg-[#E5E5E5] px-1 py-0.5 rounded text-gray-600">Active</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="h-px bg-[#E5E5E5]" />

            {/* Mappings */}
            <div className="grid grid-cols-2 gap-8 max-w-4xl">
              <div>
                <h3 className="text-sm font-semibold mb-4">Shopify Product Type Mapping</h3>
                <div className="border border-[#E5E5E5] rounded overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5] font-mono text-[#737373]">
                        <th className="p-3">AYA Subcategory</th>
                        <th className="p-3">Shopify Product Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E5] font-mono">
                      <tr><td className="p-3">SPORTS BRAS</td><td className="p-3">Sports Bra</td></tr>
                      <tr><td className="p-3">LEGGINGS</td><td className="p-3">Leggings</td></tr>
                      <tr><td className="p-3">TANK TOPS</td><td className="p-3">Tank Top</td></tr>
                      <tr><td className="p-3">HOODIES</td><td className="p-3">Hoodie</td></tr>
                      <tr><td className="p-3">JACKETS</td><td className="p-3">Jacket</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">Shopify Category Mapping</h3>
                <div className="border border-[#E5E5E5] rounded overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5] font-mono text-[#737373]">
                        <th className="p-3">AYA Subcategory</th>
                        <th className="p-3">Shopify Standard Category</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E5]">
                      <tr><td className="p-3 font-mono">SPORTS BRAS</td><td className="p-3 text-[#737373]">Clothing &gt; Activewear &gt; Sports Bras</td></tr>
                      <tr><td className="p-3 font-mono">LEGGINGS</td><td className="p-3 text-[#737373]">Clothing &gt; Activewear &gt; Leggings</td></tr>
                      <tr><td className="p-3 font-mono">TANK TOPS</td><td className="p-3 text-[#737373]">Clothing &gt; Activewear &gt; Tank Tops</td></tr>
                      <tr><td className="p-3 font-mono">JACKETS</td><td className="p-3 text-[#737373]">Clothing &gt; Outerwear &gt; Jackets &amp; Coats</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Colors */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold mb-1">Controlled Color Library</h2>
              <p className="text-xs text-[#737373]">Matches raw color values in titles/descriptions to AYA luxury terminology.</p>
            </div>
            
            <div className="border border-[#E5E5E5] rounded-lg overflow-hidden max-w-3xl bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5] font-mono text-[#737373] uppercase tracking-wider">
                    <th className="p-3.5">Color Swatch</th>
                    <th className="p-3.5">Display Name</th>
                    <th className="p-3.5">Luxury Name</th>
                    <th className="p-3.5">HEX Code</th>
                    <th className="p-3.5">Slug</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {COLOR_LIBRARY.map((color) => (
                    <tr key={color.slug} className="hover:bg-[#FAFAFA]/50 transition-colors">
                      <td className="p-3.5">
                        <div 
                          className="w-5 h-5 rounded-full border border-gray-300 shadow-inner" 
                          style={{ backgroundColor: color.hex }}
                        />
                      </td>
                      <td className="p-3.5 font-medium">{color.displayName}</td>
                      <td className="p-3.5 font-mono text-purple-600 font-semibold">{color.luxuryName}</td>
                      <td className="p-3.5 font-mono">{color.hex}</td>
                      <td className="p-3.5 font-mono text-[#737373]">{color.slug}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Rule Builder */}
        {activeTab === 'rules' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-base font-semibold mb-1">Visual Rule Builder</h2>
              <p className="text-xs text-[#737373]">Configure conditional settings to govern the categorization and metadata creation.</p>
            </div>

            {/* Rule Configurator */}
            <div className="p-6 border border-[#E5E5E5] rounded-lg bg-[#FAFAFA] space-y-4 max-w-4xl">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#404040]">Build New Classification Rule</h3>
              
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span>WHEN</span>
                <span className="font-semibold text-gray-500">Gender =</span>
                <select 
                  value={whenGender} 
                  onChange={(e) => setWhenGender(e.target.value)}
                  className="px-2.5 py-1.5 border border-[#E5E5E5] rounded bg-white font-medium"
                >
                  <option value="Woman">Woman</option>
                  <option value="Man">Man</option>
                  <option value="Unisex">Unisex</option>
                </select>

                <span>AND</span>
                <span className="font-semibold text-gray-500">Subcategory =</span>
                <select 
                  value={whenSubcat} 
                  onChange={(e) => setWhenSubcat(e.target.value)}
                  className="px-2.5 py-1.5 border border-[#E5E5E5] rounded bg-white font-mono"
                >
                  {TAXONOMY.subcategories.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <span>THEN</span>
                <span className="font-semibold text-gray-500">Assign Collection =</span>
                <input 
                  type="text"
                  value={thenCollection}
                  onChange={(e) => setThenCollection(e.target.value)}
                  className="px-2.5 py-1.5 border border-[#E5E5E5] rounded bg-white font-medium w-48 focus:outline-none focus:border-black"
                />

                <span>AND</span>
                <span className="font-semibold text-gray-500">Type =</span>
                <input 
                  type="text"
                  value={thenType}
                  onChange={(e) => setThenType(e.target.value)}
                  className="px-2.5 py-1.5 border border-[#E5E5E5] rounded bg-white font-medium w-32 focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-6 text-xs text-[#737373]">
                  <label className="flex items-center gap-1.5">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" /> Generate SEO
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" /> Generate ALT Texts
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" /> Generate Tags
                  </label>
                </div>

                <button 
                  onClick={handleAddRule}
                  className="bg-[#0A0A0A] text-white text-xs px-4 py-2 rounded font-medium hover:bg-[#262626] transition-colors"
                >
                  Create Rule
                </button>
              </div>
            </div>

            {/* List of Active Rules */}
            <div className="space-y-4 max-w-4xl">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#737373]">Active Rules ({rules.length})</h3>
              <div className="space-y-2">
                {rules.map(rule => (
                  <div key={rule.id} className="p-4 border border-[#E5E5E5] rounded-md bg-white flex justify-between items-center hover:border-black transition-colors">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div className="font-medium">
                        IF <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-xs">gender={rule.when.gender || '*'}</span> 
                        {rule.when.subcategory && (
                          <> and <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-xs">subcategory={rule.when.subcategory}</span></>
                        )}
                        <span className="mx-2 text-[#737373]">➔</span>
                        THEN assign <span className="font-semibold text-purple-600">"{rule.then.collection}"</span> & type <span className="font-mono">"{rule.then.productType}"</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDeleteRule(rule.id)}
                      className="text-[#737373] hover:text-red-600 transition-colors p-1"
                      title="Delete rule"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: AI Sandbox */}
        {activeTab === 'sandbox' && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <h2 className="text-base font-semibold mb-1">AI Classification Playground</h2>
              <p className="text-xs text-[#737373]">Test how the AYA Brand Brain parses product titles in real-time. Try typing different product names.</p>
            </div>

            <div className="grid grid-cols-[320px_1fr] gap-8">
              {/* Tester panel */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[#737373] uppercase tracking-wider mb-2">Simulate Title</label>
                  <input 
                    type="text" 
                    value={testTitle}
                    onChange={(e) => handleTestSandbox(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E5E5] rounded-md text-sm focus:outline-none focus:border-black bg-white"
                  />
                </div>

                <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-md space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#404040]">Confidence Score</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold tracking-tight">{sandboxResult.confidence}%</span>
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full border mb-1",
                      sandboxResult.confidence >= 80 ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                    )}>
                      {sandboxResult.confidence >= 80 ? "Pass" : "Flag for Review"}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#737373] leading-relaxed">
                    Decisions below 80% are automatically flagged inside the product manager to keep manual verification under control.
                  </p>
                </div>

                {/* Quick examples */}
                <div className="space-y-2">
                  <span className="text-xs text-[#737373] font-medium">Quick Presets:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Women's High Rise Leggings",
                      "Women's Quarter Zip Yoga Pullover",
                      "Men's Premium Hoodie",
                      "Women's Pleated Sports Bra",
                      "Cork Yoga Block"
                    ].map(title => (
                      <button 
                        key={title} 
                        onClick={() => handleTestSandbox(title)}
                        className="text-[11px] px-2 py-1 bg-white border border-[#E5E5E5] rounded hover:border-black transition-colors"
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resolution details */}
              <div className="border border-[#E5E5E5] rounded-lg bg-white overflow-hidden p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
                  <h3 className="font-semibold text-sm">Semantic Resolution Details</h3>
                  <span className="text-xs font-mono text-purple-600 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Brand Brain AI</span>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs">
                  <div>
                    <span className="text-[#737373] block mb-1">Inferred Gender</span>
                    <span className="font-medium text-sm text-[#0A0A0A]">{sandboxResult.gender}</span>
                  </div>

                  <div>
                    <span className="text-[#737373] block mb-1">Main Category</span>
                    <span className="font-medium text-sm text-[#0A0A0A]">{sandboxResult.mainCategory}</span>
                  </div>

                  <div>
                    <span className="text-[#737373] block mb-1">Subcategory</span>
                    <span className="font-mono text-xs text-purple-600 bg-purple-50 border border-purple-100 px-1.5 py-0.5 rounded font-semibold inline-block">{sandboxResult.subcategory}</span>
                  </div>

                  <div>
                    <span className="text-[#737373] block mb-1">Shopify Category</span>
                    <span className="font-medium text-sm text-[#0A0A0A]">{sandboxResult.shopifyCategory}</span>
                  </div>

                  <div>
                    <span className="text-[#737373] block mb-1">Resolved AYA Color</span>
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                      <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: sandboxResult.color.hex }} />
                      {sandboxResult.color.displayName} ({sandboxResult.color.luxuryName})
                    </span>
                  </div>

                  <div>
                    <span className="text-[#737373] block mb-1">Shopify Product Type</span>
                    <span className="font-medium text-sm text-[#0A0A0A]">{sandboxResult.shopifyProductType}</span>
                  </div>
                </div>

                <div className="h-px bg-[#E5E5E5]" />

                {/* SEO preview */}
                <div className="space-y-2">
                  <span className="text-xs text-[#737373] block">Generated SEO Meta Description (Luxury Tone)</span>
                  <div className="p-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded text-xs leading-relaxed text-[#404040]">
                    {sandboxResult.seo.description}
                  </div>
                </div>

                {/* Tags preview */}
                <div className="space-y-2">
                  <span className="text-xs text-[#737373] block">Auto-Generated Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {sandboxResult.tags.map(t => (
                      <span key={t} className="text-[10px] bg-[#FAFAFA] border border-[#E5E5E5] px-2 py-0.5 rounded font-mono text-gray-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
