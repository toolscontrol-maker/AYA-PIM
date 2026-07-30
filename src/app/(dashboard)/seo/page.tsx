"use client";

import React, { useState } from "react";
import { Sparkles, AlertCircle, ChevronDown, ChevronRight, Image as ImageIcon } from "lucide-react";

const mockProducts = [
  { id: "1", name: "Core Leggings", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=100&q=80", seoScore: 85, title: "AYA Core Performance Leggings - High Waist Workout Tights", titleLength: 56, metaLength: 145, missingAlt: 0, duplicateTitle: false, duplicateHandle: false, warnings: [] },
  { id: "2", name: "Studio Tank", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=80", seoScore: 55, title: "Studio Tank Top Womens Yoga Top Workout Shirt Breathable Cotton Blend Summer", titleLength: 76, metaLength: 0, missingAlt: 2, duplicateTitle: true, duplicateHandle: false, warnings: ["Title is 76 chars (max 60)", "Meta description is missing", "2 images missing ALT text", "Duplicate title detected"] },
  { id: "3", name: "Recover Joggers", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&q=80", seoScore: 72, title: "Recover Fleece Joggers", titleLength: 22, metaLength: 90, missingAlt: 1, duplicateTitle: false, duplicateHandle: false, warnings: ["Title is too short (min 30)", "Meta description is too short", "1 image missing ALT text"] },
];

export default function SEOPage() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#FAFAFA] text-[#0A0A0A] p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">SEO Manager</h1>
          <p className="text-[#737373] text-sm">Optimize your product discoverability</p>
        </div>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center shadow-sm hover:opacity-90 transition-opacity">
          <Sparkles className="w-4 h-4 mr-2" />
          Fix All with AI
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-lg border border-[#E5E5E5]">
          <p className="text-[#737373] text-sm mb-1">Average SEO Score</p>
          <div className="text-3xl font-bold">71<span className="text-[#737373] text-lg font-normal">/100</span></div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#16A34A] bg-green-50/10">
          <p className="text-[#737373] text-sm mb-1">Good (&gt;80)</p>
          <div className="text-3xl font-bold text-[#16A34A]">22</div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-yellow-400 bg-yellow-50/10">
          <p className="text-[#737373] text-sm mb-1">Needs Work (60-80)</p>
          <div className="text-3xl font-bold text-yellow-600">25</div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#EF4444] bg-red-50/10">
          <p className="text-[#737373] text-sm mb-1">Poor (&lt;60)</p>
          <div className="text-3xl font-bold text-[#EF4444]">13</div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#E5E5E5] flex space-x-4 bg-[#FAFAFA]">
          <select className="px-3 py-1.5 border border-[#E5E5E5] rounded text-sm bg-white min-w-[150px]">
            <option>Score: All</option>
            <option>Score: Good</option>
            <option>Score: Needs Work</option>
            <option>Score: Poor</option>
          </select>
          <select className="px-3 py-1.5 border border-[#E5E5E5] rounded text-sm bg-white min-w-[150px]">
            <option>Issue: All</option>
            <option>Missing Meta</option>
            <option>Long Title</option>
            <option>Missing ALT</option>
          </select>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-white text-[#737373] border-b border-[#E5E5E5]">
            <tr>
              <th className="w-8 px-4 py-3"></th>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Score</th>
              <th className="px-6 py-3 font-medium">Title Length</th>
              <th className="px-6 py-3 font-medium">Issues</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((prod) => (
              <React.Fragment key={prod.id}>
                <tr className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA]">
                  <td className="px-4 py-4 text-center cursor-pointer" onClick={() => toggleRow(prod.id)}>
                    {prod.warnings.length > 0 ? (
                      expandedRow === prod.id ? <ChevronDown className="w-4 h-4 text-[#737373]" /> : <ChevronRight className="w-4 h-4 text-[#737373]" />
                    ) : null}
                  </td>
                  <td className="px-6 py-4 font-medium flex items-center">
                    <img src={prod.image} alt="" className="w-10 h-10 rounded object-cover mr-3 border border-[#E5E5E5]" />
                    <div className="flex flex-col">
                      <span className="truncate w-48 block">{prod.name}</span>
                      <span className={`text-xs mt-0.5 truncate w-48 block ${prod.titleLength > 60 ? 'text-[#EF4444]' : 'text-[#737373]'}`}>{prod.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${prod.seoScore >= 80 ? 'text-[#16A34A]' : prod.seoScore >= 60 ? 'text-yellow-600' : 'text-[#EF4444]'}`}>{prod.seoScore}</span>
                      <div className="w-16 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${prod.seoScore >= 80 ? 'bg-[#16A34A]' : prod.seoScore >= 60 ? 'bg-yellow-400' : 'bg-[#EF4444]'}`} 
                          style={{ width: `${prod.seoScore}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={prod.titleLength > 60 ? 'text-[#EF4444] font-medium' : ''}>{prod.titleLength} / 60</span>
                  </td>
                  <td className="px-6 py-4">
                    {prod.warnings.length > 0 ? (
                      <span className="inline-flex items-center bg-red-50 text-red-600 text-xs px-2 py-1 rounded font-medium">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {prod.warnings.length} Warnings
                      </span>
                    ) : (
                      <span className="text-[#16A34A] text-xs font-medium">Perfect</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {prod.warnings.length > 0 && (
                      <button className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded hover:bg-indigo-100 transition-colors">
                        Fix with AI
                      </button>
                    )}
                    <button className="text-xs font-medium border border-[#E5E5E5] px-3 py-1.5 rounded hover:bg-[#FAFAFA]">Edit</button>
                  </td>
                </tr>
                {expandedRow === prod.id && prod.warnings.length > 0 && (
                  <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                    <td></td>
                    <td colSpan={5} className="px-6 py-4">
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-[#404040] uppercase tracking-wider mb-3">Identified Issues</h4>
                        {prod.warnings.map((warning, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white border border-[#E5E5E5] p-3 rounded text-sm">
                            <div className="flex items-center text-[#404040]">
                              <AlertCircle className="w-4 h-4 text-[#EF4444] mr-2" />
                              {warning}
                            </div>
                            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center">
                              <Sparkles className="w-3 h-3 mr-1" /> Fix Issue
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
