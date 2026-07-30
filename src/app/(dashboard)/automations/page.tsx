"use client";

import React, { useState } from "react";
import { Plus, Settings, Zap, ArrowRight, Save, Clock, Target, Box, Sparkles } from "lucide-react";

const automations = [
  { id: "1", name: "New Product Setup", trigger: "Product is Created", actions: 7, lastRun: "2h ago", runs: 124, active: true },
  { id: "2", name: "Leggings Auto-Config", trigger: "Category = Leggings", actions: 5, lastRun: "1d ago", runs: 856, active: true },
  { id: "3", name: "Low SEO Alert", trigger: "SEO Score < 60", actions: 2, lastRun: "5h ago", runs: 12, active: true },
  { id: "4", name: "Draft to Active Check", trigger: "Status changes to Active", actions: 3, lastRun: "1w ago", runs: 45, active: false },
];

export default function AutomationsPage() {
  const [selectedAuto, setSelectedAuto] = useState(automations[0]);

  return (
    <div className="flex h-full bg-[#FAFAFA] text-[#0A0A0A]">
      {/* Left Sidebar - List */}
      <div className="w-80 border-r border-[#E5E5E5] bg-white flex flex-col h-full">
        <div className="p-4 border-b border-[#E5E5E5] flex justify-between items-center bg-[#FAFAFA]">
          <h2 className="font-semibold text-sm">Automations</h2>
          <button className="text-[#0A0A0A] hover:bg-[#E5E5E5] p-1.5 rounded transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-3 space-y-2">
          {automations.map(auto => (
            <div 
              key={auto.id}
              onClick={() => setSelectedAuto(auto)}
              className={`p-3 rounded-md cursor-pointer border transition-all ${
                selectedAuto.id === auto.id ? 'border-[#0A0A0A] bg-white shadow-sm' : 'border-transparent hover:border-[#E5E5E5] bg-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-medium">{auto.name}</h3>
                <div className={`w-8 h-4 rounded-full relative cursor-pointer ${auto.active ? 'bg-[#16A34A]' : 'bg-[#E5E5E5]'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${auto.active ? 'right-0.5' : 'left-0.5'}`} />
                </div>
              </div>
              <p className="text-xs text-[#737373] mb-2 flex items-center">
                <Zap className="w-3 h-3 mr-1" /> {auto.trigger}
              </p>
              <div className="flex justify-between items-center text-[10px] text-[#737373] uppercase tracking-wider font-semibold">
                <span>{auto.actions} Actions</span>
                <span>{auto.runs} Runs</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Editor */}
      <div className="flex-1 flex flex-col h-full bg-[#FAFAFA]">
        <div className="h-14 border-b border-[#E5E5E5] bg-white px-6 flex items-center justify-between shrink-0">
          <h1 className="font-medium">{selectedAuto.name}</h1>
          <button className="bg-[#0A0A0A] text-white px-3 py-1.5 rounded text-sm font-medium flex items-center hover:bg-[#404040]">
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </button>
        </div>

        <div className="flex-1 overflow-auto p-12 flex flex-col items-center">
          
          {/* Trigger Block */}
          <div className="w-[450px] bg-white border border-[#E5E5E5] rounded-xl shadow-sm p-5 relative z-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0A0A0A] text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">Trigger</div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mr-4">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Product Created</h3>
                <p className="text-xs text-[#737373]">Runs when a new product is added</p>
              </div>
            </div>
          </div>

          <div className="w-px h-8 bg-[#E5E5E5]" />

          {/* Condition Block */}
          <div className="w-[450px] bg-white border border-[#E5E5E5] rounded-xl shadow-sm p-5 relative z-10 border-l-4 border-l-yellow-400">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">Condition (Optional)</div>
            <div className="space-y-3 mt-2">
              <div className="flex space-x-2">
                <select className="flex-1 border border-[#E5E5E5] rounded px-2 py-1.5 text-sm bg-[#FAFAFA]">
                  <option>Category</option>
                  <option>Price</option>
                </select>
                <select className="flex-1 border border-[#E5E5E5] rounded px-2 py-1.5 text-sm bg-[#FAFAFA]">
                  <option>Equals</option>
                  <option>Contains</option>
                </select>
                <input type="text" value="Leggings" className="flex-1 border border-[#E5E5E5] rounded px-2 py-1.5 text-sm bg-[#FAFAFA]" />
              </div>
              <button className="text-xs text-[#737373] hover:text-[#0A0A0A] font-medium">+ Add AND condition</button>
            </div>
          </div>

          <div className="w-px h-8 bg-[#E5E5E5]" />

          {/* Actions Container */}
          <div className="w-[450px] bg-[#FAFAFA] border border-[#E5E5E5] border-dashed rounded-xl p-4 relative flex flex-col space-y-4">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-[#E5E5E5] text-[#737373] text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">Then Do</div>
             
             {/* Action 1 */}
             <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 shadow-sm flex items-center group cursor-grab">
               <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-blue-600 mr-3">
                 <Target className="w-4 h-4" />
               </div>
               <div className="flex-1">
                 <h4 className="text-sm font-medium">Apply Template</h4>
                 <p className="text-xs text-[#737373]">Leggings Template</p>
               </div>
               <Settings className="w-4 h-4 text-[#E5E5E5] group-hover:text-[#737373] cursor-pointer" />
             </div>

             {/* Action 2 */}
             <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 shadow-sm flex items-center group cursor-grab">
               <div className="w-8 h-8 bg-purple-50 rounded flex items-center justify-center text-purple-600 mr-3">
                 <Sparkles className="w-4 h-4" />
               </div>
               <div className="flex-1">
                 <h4 className="text-sm font-medium">Generate SEO (AI)</h4>
                 <p className="text-xs text-[#737373]">Create title & meta based on description</p>
               </div>
               <Settings className="w-4 h-4 text-[#E5E5E5] group-hover:text-[#737373] cursor-pointer" />
             </div>

             <button className="w-full py-3 border-2 border-dashed border-[#E5E5E5] rounded-lg text-sm font-medium text-[#737373] hover:bg-white hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors flex items-center justify-center">
               <Plus className="w-4 h-4 mr-1" /> Add Action
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
