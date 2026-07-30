"use client";

import React, { useState } from "react";
import { BookOpen, Scissors, Wind, Droplets, CheckCircle, Copy, Link as LinkIcon } from "lucide-react";

const tabs = ["Materials", "Technologies", "Certifications", "Colors", "Templates"];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("Materials");

  return (
    <div className="flex-1 overflow-auto bg-[#FAFAFA] text-[#0A0A0A] p-8 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1 flex items-center">
          <BookOpen className="w-6 h-6 mr-3 text-[#404040]" />
          Brand Library
        </h1>
        <p className="text-[#737373] text-sm ml-9">The single source of truth for AYA brand assets and knowledge.</p>
      </div>

      <div className="border-b border-[#E5E5E5] mb-8">
        <nav className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab ? "text-[#0A0A0A]" : "text-[#737373] hover:text-[#404040]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A0A0A] rounded-t-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1">
        {activeTab === "Materials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Second Skin™ Fabric</h3>
                  <p className="text-sm text-[#737373]">78% Polyamide, 22% Elastane</p>
                </div>
                <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Core</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center text-xs bg-[#F3F4F6] px-2 py-1 rounded text-[#404040] font-medium"><Wind className="w-3 h-3 mr-1"/> Breathable</span>
                <span className="inline-flex items-center text-xs bg-[#F3F4F6] px-2 py-1 rounded text-[#404040] font-medium"><Scissors className="w-3 h-3 mr-1"/> 4-Way Stretch</span>
                <span className="inline-flex items-center text-xs bg-[#F3F4F6] px-2 py-1 rounded text-[#404040] font-medium"><Droplets className="w-3 h-3 mr-1"/> Moisture-Wicking</span>
              </div>
              <div className="pt-4 border-t border-[#E5E5E5] flex justify-between items-center text-sm">
                <a href="#" className="text-indigo-600 font-medium hover:underline flex items-center">
                  Used in 34 products <LinkIcon className="w-3 h-3 ml-1" />
                </a>
                <button className="text-[#737373] hover:text-[#0A0A0A]"><Copy className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Eco Recover™</h3>
                  <p className="text-sm text-[#737373]">85% Recycled Polyester, 15% Elastane</p>
                </div>
                <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Sustainable</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center text-xs bg-[#F3F4F6] px-2 py-1 rounded text-[#404040] font-medium">GRS Certified</span>
                <span className="inline-flex items-center text-xs bg-[#F3F4F6] px-2 py-1 rounded text-[#404040] font-medium">Durable</span>
              </div>
              <div className="pt-4 border-t border-[#E5E5E5] flex justify-between items-center text-sm">
                <a href="#" className="text-indigo-600 font-medium hover:underline flex items-center">
                  Used in 12 products <LinkIcon className="w-3 h-3 ml-1" />
                </a>
                <button className="text-[#737373] hover:text-[#0A0A0A]"><Copy className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Colors" && (
          <div>
            <h3 className="font-medium text-[#404040] mb-4 uppercase tracking-wider text-sm">Core Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
              <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden group">
                <div className="h-32 bg-[#0A0A0A] relative">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    <span className="bg-white/90 text-xs font-semibold px-2 py-1 rounded shadow-sm flex items-center"><Copy className="w-3 h-3 mr-1"/> Copy Hex</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm">Onyx Black</p>
                  <p className="text-xs text-[#737373] uppercase mt-1">#0A0A0A</p>
                </div>
              </div>
              
              <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden group">
                <div className="h-32 bg-[#F3F4F6] border-b border-[#E5E5E5] relative">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    <span className="bg-white/90 text-xs font-semibold px-2 py-1 rounded shadow-sm flex items-center"><Copy className="w-3 h-3 mr-1"/> Copy Hex</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm">Cloud Grey</p>
                  <p className="text-xs text-[#737373] uppercase mt-1">#F3F4F6</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-medium text-[#404040] mb-4 uppercase tracking-wider text-sm">Seasonal (SS24)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden group">
                <div className="h-32 bg-[#D4E0D7] relative">
                  <div className="absolute inset-0 bg-black/0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    <span className="bg-white/90 text-xs font-semibold px-2 py-1 rounded shadow-sm flex items-center"><Copy className="w-3 h-3 mr-1"/> Copy Hex</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm">Matcha</p>
                  <p className="text-xs text-[#737373] uppercase mt-1">#D4E0D7</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "Certifications" && (
          <div className="grid grid-cols-3 gap-6">
             <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 flex flex-col items-center text-center">
               <div className="w-20 h-20 bg-[#FAFAFA] border border-[#E5E5E5] rounded-full flex items-center justify-center mb-4">
                 <CheckCircle className="w-8 h-8 text-[#16A34A]" />
               </div>
               <h3 className="font-semibold mb-2">OEKO-TEX® Standard 100</h3>
               <p className="text-xs text-[#737373] mb-4">Valid until: Dec 2025</p>
               <button className="text-sm font-medium text-indigo-600 hover:underline">View Certificate</button>
             </div>
          </div>
        )}

        {(activeTab === "Technologies" || activeTab === "Templates") && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen className="w-12 h-12 text-[#E5E5E5] mb-4" />
            <h3 className="text-lg font-medium mb-2">Content coming soon</h3>
            <p className="text-[#737373] text-sm max-w-md">The brand team is still putting together the definitive copy and specifications for this section.</p>
          </div>
        )}

      </div>
    </div>
  );
}
