"use client"

import React from 'react'
import { Sparkles, ArrowRight, Activity, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto p-8 pb-24 space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-[#E5E5E5] pb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0A0A0A]">Analytics</h1>
          <p className="text-sm text-[#737373] mt-1">Product Health Dashboard</p>
        </div>
        <div className="text-xs text-[#737373] flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" /> Last synced: just now
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard value="60" label="Total Products" desc="All products in catalog" accentColor="border-l-[#0A0A0A]" />
        <KpiCard value="45" label="Active Products" desc="Published to Shopify" accentColor="border-l-green-600" />
        <KpiCard value="10" label="Draft Products" desc="Not yet published" accentColor="border-l-yellow-600" />
        <KpiCard value="5" label="Archived" desc="Hidden from store" accentColor="border-l-[#737373]" />
        
        <KpiCard value="12" label="Without SEO" desc="Missing title or meta" accentColor="border-l-red-500" alert />
        <KpiCard value="3" label="Without Images" desc="No product images" accentColor="border-l-red-500" alert />
        <KpiCard value="8" label="Without Tags" desc="Need tagging" accentColor="border-l-orange-500" alert />
        <KpiCard value="6" label="Without Collection" desc="Uncollected products" accentColor="border-l-orange-500" alert />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Catalog Completeness Score */}
        <div className="border border-[#E5E5E5] bg-white rounded-xl p-6">
          <h2 className="text-base font-semibold text-[#0A0A0A] mb-6">Catalog Completeness</h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
            <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#FAFAFA" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" stroke="#0A0A0A" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`} 
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - 0.73)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#0A0A0A]">73%</span>
              </div>
            </div>
            
            <div className="flex-1 w-full space-y-4">
              <ProgressBar label="Product Name" percentage={100} fraction="60/60" />
              <ProgressBar label="Images" percentage={95} fraction="57/60" />
              <ProgressBar label="SEO Title" percentage={80} fraction="48/60" />
              <ProgressBar label="Meta Description" percentage={75} fraction="45/60" />
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
            <ProgressBar label="Tags" percentage={87} fraction="52/60" />
            <ProgressBar label="Collections" percentage={90} fraction="54/60" />
            <ProgressBar label="Category" percentage={85} fraction="51/60" />
            <ProgressBar label="Material" percentage={70} fraction="42/60" />
          </div>
        </div>

        <div className="space-y-8 flex flex-col">
          {/* SEO Health Chart */}
          <div className="border border-[#E5E5E5] bg-white rounded-xl p-6 flex-1">
            <h2 className="text-base font-semibold text-[#0A0A0A] mb-6">SEO Health Score</h2>
            <div className="h-48 flex items-end justify-between gap-2 pt-4">
              {[
                { range: '0-20', count: 4, height: '20%' },
                { range: '21-40', count: 8, height: '40%' },
                { range: '41-60', count: 12, height: '60%' },
                { range: '61-80', count: 25, height: '100%' },
                { range: '81-100', count: 11, height: '50%' },
              ].map(bucket => (
                <div key={bucket.range} className="flex flex-col items-center flex-1 gap-2 group">
                  <span className="text-xs font-mono text-[#737373] opacity-0 group-hover:opacity-100 transition-opacity">{bucket.count}</span>
                  <div className="w-full bg-[#FAFAFA] rounded-t-sm border-t border-l border-r border-[#E5E5E5] relative flex items-end justify-center group-hover:bg-[#E5E5E5] transition-colors" style={{ height: '150px' }}>
                    <div className="w-full bg-[#0A0A0A] rounded-t-sm transition-all duration-500" style={{ height: bucket.height }} />
                  </div>
                  <span className="text-[10px] text-[#737373] mt-1">{bucket.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border border-[#E5E5E5] bg-[#FAFAFA] rounded-xl p-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#0A0A0A]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#0A0A0A]">Let AI fix your catalog</h3>
                  <p className="text-xs text-[#737373] mt-1">Automatically generate missing SEO titles, descriptions, and tags for the 12 products that need attention.</p>
                </div>
             </div>
             <div className="mt-4 flex justify-end">
               <Link href="/ai-studio" className="px-4 py-2 bg-[#0A0A0A] text-white rounded-md text-sm font-medium hover:bg-[#404040] transition-colors flex items-center gap-2">
                  Fix All with AI <ArrowRight className="w-4 h-4" />
               </Link>
             </div>
          </div>
        </div>
      </div>

      {/* Products Needing Attention */}
      <div className="border border-[#E5E5E5] bg-white rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#0A0A0A]">Products Needing Attention</h2>
          <Link href="/products" className="text-sm text-[#737373] hover:text-[#0A0A0A] transition-colors">View all products</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
              <tr>
                <th className="font-medium text-[#737373] px-6 py-3">Product Name</th>
                <th className="font-medium text-[#737373] px-6 py-3">Missing Fields</th>
                <th className="font-medium text-[#737373] px-6 py-3">SEO Score</th>
                <th className="font-medium text-[#737373] px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {[
                { name: "Women's Studio Tank", missing: ['SEO Title', 'Meta Description', 'Material'], score: 12 },
                { name: "Flow Jogger", missing: ['Images', 'Tags'], score: 25 },
                { name: "Recovery Hoodie", missing: ['Collection', 'Category'], score: 38 },
                { name: "Everyday Legging", missing: ['Meta Description'], score: 45 },
                { name: "Essential Bra", missing: ['Material'], score: 55 },
              ].map((product, i) => (
                <tr key={i} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-6 py-3 font-medium text-[#0A0A0A]">{product.name}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      {product.missing.map(m => (
                        <span key={m} className="px-2 py-0.5 bg-red-50 text-red-700 text-xs border border-red-100 rounded">{m}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className={cn(
                      "font-mono",
                      product.score < 40 ? "text-red-600" : product.score < 70 ? "text-orange-600" : "text-green-600"
                    )}>{product.score}/100</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link href={`/products`} className="text-xs font-medium text-[#0A0A0A] hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ value, label, desc, accentColor, alert }: { value: string, label: string, desc: string, accentColor: string, alert?: boolean }) {
  return (
    <div className={cn("bg-white border border-[#E5E5E5] rounded-xl p-5 border-l-4 flex flex-col justify-between hover:border-[#E5E5E5] hover:shadow-sm transition-all cursor-pointer group", accentColor)}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-3xl font-bold text-[#0A0A0A] font-mono">{value}</div>
          <div className="text-sm font-medium text-[#404040] mt-1 flex items-center gap-1.5">
            {alert && <AlertCircle className="w-3.5 h-3.5 text-red-500" />} {label}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-[#737373]">{desc}</span>
        <span className="text-[#0A0A0A] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">View <ArrowRight className="w-3 h-3" /></span>
      </div>
    </div>
  )
}

function ProgressBar({ label, percentage, fraction }: { label: string, percentage: number, fraction: string }) {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-[#404040]">{label}</span>
        <span className="text-[#737373] font-mono">{percentage}% <span className="opacity-50">({fraction})</span></span>
      </div>
      <div className="w-full h-1.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-1000 ease-out",
            percentage === 100 ? "bg-green-600" : percentage > 75 ? "bg-[#0A0A0A]" : percentage > 50 ? "bg-orange-500" : "bg-red-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
