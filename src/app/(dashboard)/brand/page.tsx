"use client"

import React, { useState, useEffect } from 'react'
import { Plus, X, Check, Search, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BrandSystemPage() {
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved')
  const [copyText, setCopyText] = useState('')
  const [toneWords, setToneWords] = useState(['Elegant', 'Minimal', 'Calm', 'Premium', 'Editorial'])
  const [newToneWord, setNewToneWord] = useState('')

  const [neverUse, setNeverUse] = useState(['cheap', 'perfect', 'best', 'amazing', 'great'])
  const [alwaysUse, setAlwaysUse] = useState(['Engineered', 'Designed', 'Crafted', 'Premium', 'Refined'])
  const [newNeverWord, setNewNeverWord] = useState('')
  const [newAlwaysWord, setNewAlwaysWord] = useState('')

  // Mock autosave
  useEffect(() => {
    setSaveStatus('saving')
    const timer = setTimeout(() => {
      setSaveStatus('saved')
    }, 1000)
    return () => clearTimeout(timer)
  }, [toneWords, neverUse, alwaysUse, copyText])

  const findViolations = (text: string) => {
    if (!text) return []
    const words: string[] = text.toLowerCase().match(/\b(\w+)\b/g) || []
    return neverUse.filter(word => words.includes(word.toLowerCase()))
  }

  const violations = findViolations(copyText)

  return (
    <div className="max-w-4xl mx-auto p-8 pb-24 space-y-12">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-[#E5E5E5] pb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0A0A0A]">Brand System</h1>
          <p className="text-sm text-[#737373] mt-1">Define AYA once. Used everywhere, forever.</p>
        </div>
        <div className="text-xs text-[#737373] flex items-center gap-2">
          {saveStatus === 'saving' ? (
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#737373] animate-pulse" /> Saving...</span>
          ) : (
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Saved to cloud</span>
          )}
        </div>
      </div>

      {/* Section 1: Brand Identity */}
      <section className="space-y-6">
        <h2 className="text-sm font-medium text-[#404040] uppercase tracking-wider">Brand Identity</h2>
        <div className="grid grid-cols-[160px_1fr] gap-y-4 text-sm">
          <div className="text-[#737373] py-2">Brand Name</div>
          <div><input type="text" defaultValue="AYA" className="w-full bg-transparent border-0 border-b border-transparent hover:border-[#E5E5E5] focus:border-[#0A0A0A] focus:ring-0 px-0 py-2 outline-none transition-colors font-medium text-[#0A0A0A]" /></div>
          
          <div className="text-[#737373] py-2">Tagline</div>
          <div><input type="text" defaultValue="Luxury Activewear Inspired by Nature" className="w-full bg-transparent border-0 border-b border-transparent hover:border-[#E5E5E5] focus:border-[#0A0A0A] focus:ring-0 px-0 py-2 outline-none transition-colors text-[#0A0A0A]" /></div>
          
          <div className="text-[#737373] py-2">Mission</div>
          <div><textarea defaultValue="To create the most refined activewear on earth, blending technical performance with minimalist aesthetics." rows={2} className="w-full bg-transparent border-0 border-b border-transparent hover:border-[#E5E5E5] focus:border-[#0A0A0A] focus:ring-0 px-0 py-2 outline-none transition-colors resize-none text-[#0A0A0A]" /></div>
          
          <div className="text-[#737373] py-2">Luxury Level</div>
          <div className="flex items-center gap-1 text-[#0A0A0A]">
            {/* ★★★★★ */}
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ))}
          </div>

          <div className="text-[#737373] py-2">Founded</div>
          <div><input type="text" defaultValue="2024" className="w-24 bg-transparent border-0 border-b border-transparent hover:border-[#E5E5E5] focus:border-[#0A0A0A] focus:ring-0 px-0 py-2 outline-none transition-colors text-[#0A0A0A]" /></div>
          
          <div className="text-[#737373] py-2">Website</div>
          <div><input type="text" defaultValue="https://aya-active.com" className="w-full bg-transparent border-0 border-b border-transparent hover:border-[#E5E5E5] focus:border-[#0A0A0A] focus:ring-0 px-0 py-2 outline-none transition-colors font-mono text-[#0A0A0A]" /></div>
        </div>
      </section>

      <div className="h-px bg-[#E5E5E5]" />

      {/* Section 2: Target Audience */}
      <section className="space-y-6">
        <h2 className="text-sm font-medium text-[#404040] uppercase tracking-wider">Target Audience</h2>
        <div className="grid grid-cols-[160px_1fr] gap-y-6 text-sm items-center">
          <div className="text-[#737373]">Gender</div>
          <div className="flex gap-2">
            {['Women', 'Men', 'Unisex'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full text-[#404040]">{tag}</span>
            ))}
          </div>

          <div className="text-[#737373]">Activities</div>
          <div className="flex gap-2 flex-wrap">
            {['Yoga', 'Pilates', 'Running', 'Studio', 'Recovery'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full text-[#404040]">{tag}</span>
            ))}
          </div>

          <div className="text-[#737373]">Age Range</div>
          <div className="flex items-center gap-4">
            <span className="text-[#737373] font-mono">18</span>
            <div className="w-48 h-1 bg-[#E5E5E5] rounded-full relative">
              <div className="absolute left-0 right-[25%] top-0 bottom-0 bg-[#0A0A0A] rounded-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-[#0A0A0A] rounded-full shadow-sm" />
              <div className="absolute right-[25%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-[#0A0A0A] rounded-full shadow-sm" />
            </div>
            <span className="text-[#737373] font-mono">65+</span>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#E5E5E5]" />

      {/* Section 3: Brand Tone */}
      <section className="space-y-6">
        <h2 className="text-sm font-medium text-[#404040] uppercase tracking-wider">Brand Tone</h2>
        <div className="flex flex-wrap gap-2 items-center">
          {toneWords.map(word => (
            <span key={word} className="px-3 py-1.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-md text-sm text-[#404040] flex items-center gap-2 group">
              {word}
              <button onClick={() => setToneWords(w => w.filter(x => x !== word))} className="text-[#737373] hover:text-[#0A0A0A] opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          <div className="flex items-center gap-2 px-3 py-1.5 border border-dashed border-[#E5E5E5] rounded-md text-sm focus-within:border-[#0A0A0A] transition-colors">
            <Plus className="w-3.5 h-3.5 text-[#737373]" />
            <input 
              type="text" 
              placeholder="Add tone word" 
              className="bg-transparent outline-none w-28 text-[#0A0A0A] placeholder-[#737373]"
              value={newToneWord}
              onChange={e => setNewToneWord(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && newToneWord) {
                  setToneWords([...toneWords, newToneWord])
                  setNewToneWord('')
                }
              }}
            />
          </div>
        </div>
      </section>

      <div className="h-px bg-[#E5E5E5]" />

      {/* Section 4: Voice & Copy Rules */}
      <section className="space-y-6">
        <h2 className="text-sm font-medium text-[#404040] uppercase tracking-wider flex items-center justify-between">
          <span>Voice & Copy Rules</span>
          <span className="text-xs bg-[#0A0A0A] text-white px-2 py-0.5 rounded-full font-medium normal-case">Most Important</span>
        </h2>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-red-600">
              <X className="w-4 h-4" /> Never Use
            </div>
            <div className="flex flex-col gap-2">
              {neverUse.map(word => (
                <div key={word} className="px-3 py-2 bg-red-50/50 border border-red-100 rounded text-sm text-red-900 flex justify-between group">
                  {word}
                  <button onClick={() => setNeverUse(w => w.filter(x => x !== word))} className="opacity-0 group-hover:opacity-100"><X className="w-3.5 h-3.5 text-red-400 hover:text-red-600" /></button>
                </div>
              ))}
              <div className="flex items-center gap-2 px-3 py-2 border border-dashed border-[#E5E5E5] rounded text-sm focus-within:border-[#0A0A0A] transition-colors">
                <Plus className="w-3.5 h-3.5 text-[#737373]" />
                <input 
                  type="text" 
                  placeholder="Add word" 
                  className="bg-transparent outline-none w-full text-[#0A0A0A]"
                  value={newNeverWord}
                  onChange={e => setNewNeverWord(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newNeverWord) {
                      setNeverUse([...neverUse, newNeverWord])
                      setNewNeverWord('')
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-green-700">
              <Check className="w-4 h-4" /> Always Use
            </div>
            <div className="flex flex-col gap-2">
              {alwaysUse.map(word => (
                <div key={word} className="px-3 py-2 bg-green-50/50 border border-green-100 rounded text-sm text-green-900 flex justify-between group">
                  {word}
                  <button onClick={() => setAlwaysUse(w => w.filter(x => x !== word))} className="opacity-0 group-hover:opacity-100"><X className="w-3.5 h-3.5 text-green-500 hover:text-green-700" /></button>
                </div>
              ))}
              <div className="flex items-center gap-2 px-3 py-2 border border-dashed border-[#E5E5E5] rounded text-sm focus-within:border-[#0A0A0A] transition-colors">
                <Plus className="w-3.5 h-3.5 text-[#737373]" />
                <input 
                  type="text" 
                  placeholder="Add word" 
                  className="bg-transparent outline-none w-full text-[#0A0A0A]"
                  value={newAlwaysWord}
                  onChange={e => setNewAlwaysWord(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newAlwaysWord) {
                      setAlwaysUse([...alwaysUse, newAlwaysWord])
                      setNewAlwaysWord('')
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <div className="text-sm font-medium text-[#404040]">Live Copy Checker</div>
          <textarea 
            placeholder="Paste your copy here to check against brand rules..." 
            value={copyText}
            onChange={e => setCopyText(e.target.value)}
            className="w-full h-32 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-md outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all resize-none text-sm text-[#0A0A0A] font-mono"
          />
          {copyText && (
            <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-md p-4 text-sm">
              <div className="font-medium mb-2 flex items-center gap-2 text-[#0A0A0A]">
                {violations.length > 0 ? <AlertCircle className="w-4 h-4 text-red-500" /> : <Check className="w-4 h-4 text-green-500" />}
                {violations.length > 0 ? `Found ${violations.length} brand violation${violations.length === 1 ? '' : 's'}` : 'Copy looks pristine.'}
              </div>
              {violations.length > 0 && (
                <ul className="space-y-1 text-[#737373]">
                  {violations.map((v, i) => (
                    <li key={i}>
                      '{v}' found → <span className="text-[#0A0A0A]">Suggestion: '{alwaysUse[Math.floor(Math.random() * alwaysUse.length)]}'</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="h-px bg-[#E5E5E5]" />

      {/* Section 5: SEO Rules */}
      <section className="space-y-6">
        <h2 className="text-sm font-medium text-[#404040] uppercase tracking-wider">SEO Rules</h2>
        <div className="grid grid-cols-[160px_1fr] gap-y-4 text-sm">
          <div className="text-[#737373] py-2">Title Structure</div>
          <div><input type="text" defaultValue="AYA | {Product} | Luxury Activewear Inspired by Nature" className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded px-3 py-2 outline-none focus:border-[#0A0A0A] transition-colors font-mono text-xs text-[#0A0A0A]" /></div>
          
          <div className="text-[#737373] py-2">Meta Structure</div>
          <div><input type="text" defaultValue="{Description} | Shop at AYA" className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded px-3 py-2 outline-none focus:border-[#0A0A0A] transition-colors font-mono text-xs text-[#0A0A0A]" /></div>
          
          <div className="text-[#737373] py-2">Global Keywords</div>
          <div className="flex gap-2 flex-wrap py-1">
            {['Yoga', 'Pilates', 'Luxury Activewear', 'Premium Sportswear'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full text-xs text-[#404040]">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mt-4 border border-[#E5E5E5] rounded-md overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
              <tr>
                <th className="font-medium text-[#737373] px-4 py-3 w-1/3">Category</th>
                <th className="font-medium text-[#737373] px-4 py-3">Keywords</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              <tr>
                <td className="px-4 py-3 text-[#0A0A0A]">Leggings</td>
                <td className="px-4 py-3 text-[#737373]">yoga leggings, pilates leggings, luxury leggings</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-[#0A0A0A]">Bras</td>
                <td className="px-4 py-3 text-[#737373]">sports bra, yoga bra, luxury sports bra</td>
              </tr>
              <tr>
                <td colSpan={2} className="px-4 py-3 text-[#737373] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] cursor-pointer transition-colors flex items-center gap-2">
                  <Plus className="w-3.5 h-3.5" /> Add category
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="h-px bg-[#E5E5E5]" />

      {/* Section 6: Product Naming Rules */}
      <section className="space-y-6">
        <h2 className="text-sm font-medium text-[#404040] uppercase tracking-wider">Product Naming Rules</h2>
        <div className="border border-[#E5E5E5] rounded-md overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
              <tr>
                <th className="font-medium text-[#737373] px-4 py-3 w-1/3">Product Type</th>
                <th className="font-medium text-[#737373] px-4 py-3">Naming Pattern</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {[
                { type: 'Tank Tops', pattern: "Women's Flow Tank" },
                { type: 'Bras', pattern: "Women's Studio Bra" },
                { type: 'Leggings', pattern: "Women's Flow Leggings" },
                { type: 'Shorts', pattern: "Women's Studio Shorts" },
                { type: 'Jackets', pattern: "Women's Flow Jacket" },
                { type: 'Joggers', pattern: "Men's Flow Jogger" },
              ].map(rule => (
                <tr key={rule.type}>
                  <td className="px-4 py-3 text-[#0A0A0A]">{rule.type}</td>
                  <td className="px-4 py-3 text-[#737373] font-mono text-xs">{rule.pattern}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className="px-4 py-3 text-[#737373] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] cursor-pointer transition-colors flex items-center gap-2">
                  <Plus className="w-3.5 h-3.5" /> Add rule
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="h-px bg-[#E5E5E5]" />

      {/* Section 7: Color Vocabulary */}
      <section className="space-y-6">
        <h2 className="text-sm font-medium text-[#404040] uppercase tracking-wider">Color Vocabulary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { base: 'Black', custom: 'Noir', hex: '#0F0F0F' },
            { base: 'White', custom: 'Ivory', hex: '#FDFBF7', border: true },
            { base: 'Beige', custom: 'Stone', hex: '#8B8580' },
            { base: 'Grey', custom: 'Slate', hex: '#475569' },
            { base: 'Green', custom: 'Forest', hex: '#2D3A2E' },
            { base: 'Brown', custom: 'Clay', hex: '#B87D68' },
            { base: 'Cream', custom: 'Sand', hex: '#D5C5B5' },
            { base: 'Sage', custom: 'Sage', hex: '#9CAF88' },
          ].map(color => (
            <div key={color.base} className="flex items-center gap-3 p-3 border border-[#E5E5E5] rounded-md hover:border-[#0A0A0A] transition-colors">
              <div 
                className={cn("w-10 h-10 rounded-full flex-shrink-0 shadow-sm", color.border && "border border-[#E5E5E5]")} 
                style={{ backgroundColor: color.hex }} 
              />
              <div className="text-sm flex flex-col justify-center">
                <div className="text-[#0A0A0A] font-medium">{color.custom}</div>
                <div className="text-[#737373] text-xs flex gap-1"><span className="line-through opacity-50">{color.base}</span> <span className="font-mono text-[10px] uppercase">{color.hex}</span></div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 p-3 border border-dashed border-[#E5E5E5] rounded-md hover:border-[#0A0A0A] hover:bg-[#FAFAFA] cursor-pointer transition-colors justify-center text-[#737373] hover:text-[#0A0A0A]">
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Add Color</span>
          </div>
        </div>
      </section>
    </div>
  )
}
