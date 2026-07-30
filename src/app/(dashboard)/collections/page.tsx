"use client";

import React, { useState } from "react";
import { Search, Plus, Grid2X2, List, MoreHorizontal, Edit, X, Save } from "lucide-react";
// import { mockCollections } from "@/lib/mock/collections";

// Fallback mock data if import fails
const mockCollections = [
  { id: "1", name: "Summer 2024", type: "Manual", productCount: 45, updated: "2024-05-12", status: "Published", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80" },
  { id: "2", name: "Core Leggings", type: "Smart", productCount: 12, updated: "2024-05-10", status: "Published", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80" },
  { id: "3", name: "Sale", type: "Smart", productCount: 89, updated: "2024-05-01", status: "Draft", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80" },
];

export default function CollectionsPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [selectedCollection, setSelectedCollection] = useState<any | null>(null);

  return (
    <div className="flex-1 overflow-auto bg-[#FAFAFA] text-[#0A0A0A] p-8 h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Collections</h1>
          <p className="text-[#737373] text-sm">{mockCollections.length} collections</p>
        </div>
        <button 
          onClick={() => setSelectedCollection({ name: "", type: "Manual" })}
          className="bg-[#0A0A0A] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-[#404040] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Collection
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#737373]" />
          <input
            type="text"
            placeholder="Search collections..."
            className="w-full pl-9 pr-4 py-2 border border-[#E5E5E5] rounded-md text-sm bg-white focus:outline-none focus:border-[#0A0A0A] transition-colors"
          />
        </div>
        <div className="flex items-center bg-white border border-[#E5E5E5] rounded-md p-1">
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 rounded-sm ${view === "grid" ? "bg-[#F3F4F6] text-[#0A0A0A]" : "text-[#737373] hover:text-[#0A0A0A]"}`}
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-1.5 rounded-sm ${view === "table" ? "bg-[#F3F4F6] text-[#0A0A0A]" : "text-[#737373] hover:text-[#0A0A0A]"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCollections.map((col) => (
            <div 
              key={col.id} 
              className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden group hover:border-[#0A0A0A] transition-all cursor-pointer relative"
              onClick={() => setSelectedCollection(col)}
            >
              <div className="h-40 bg-[#F3F4F6] relative overflow-hidden">
                {col.image && <img src={col.image} alt={col.name} className="w-full h-full object-cover" />}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <span className="bg-white/90 backdrop-blur text-xs px-2 py-1 rounded-md font-medium">
                    {col.productCount} products
                  </span>
                </div>
                <div className="absolute top-3 left-3 flex items-center bg-white/90 backdrop-blur px-2 py-1 rounded-md">
                  <div className={`w-2 h-2 rounded-full mr-1.5 ${col.status === 'Published' ? 'bg-[#16A34A]' : 'bg-[#737373]'}`} />
                  <span className="text-xs font-medium">{col.status}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[15px]">{col.name}</h3>
                    <p className="text-[#737373] text-sm mt-1">Updated {col.updated}</p>
                  </div>
                  <span className={`text-[11px] uppercase tracking-wider font-semibold px-2 py-1 rounded ${col.type === 'Smart' ? 'bg-blue-50 text-blue-600' : 'bg-[#F3F4F6] text-[#404040]'}`}>
                    {col.type}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <button className="bg-white text-[#0A0A0A] shadow-sm px-4 py-2 rounded-md text-sm font-medium flex items-center pointer-events-auto opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#FAFAFA] text-[#737373] border-b border-[#E5E5E5]">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Products</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Updated</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCollections.map((col) => (
                <tr key={col.id} className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA] transition-colors cursor-pointer" onClick={() => setSelectedCollection(col)}>
                  <td className="px-6 py-4 font-medium flex items-center">
                    {col.image && <img src={col.image} alt="" className="w-8 h-8 rounded object-cover mr-3" />}
                    {col.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] uppercase tracking-wider font-semibold px-2 py-1 rounded ${col.type === 'Smart' ? 'bg-blue-50 text-blue-600' : 'bg-[#F3F4F6] text-[#404040]'}`}>
                      {col.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#404040]">{col.productCount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${col.status === 'Published' ? 'bg-[#16A34A]' : 'bg-[#737373]'}`} />
                      {col.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#737373]">{col.updated}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#737373] hover:text-[#0A0A0A]">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Panel */}
      {selectedCollection && (
        <>
          <div className="absolute inset-0 bg-black/20 z-10" onClick={() => setSelectedCollection(null)} />
          <div className="absolute top-0 right-0 bottom-0 w-[500px] bg-white shadow-xl z-20 border-l border-[#E5E5E5] flex flex-col transform transition-transform">
            <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5]">
              <h2 className="text-xl font-semibold">{selectedCollection.name ? "Edit Collection" : "New Collection"}</h2>
              <button onClick={() => setSelectedCollection(null)} className="text-[#737373] hover:text-[#0A0A0A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#404040] mb-2">Title</label>
                <input type="text" defaultValue={selectedCollection.name} className="w-full px-3 py-2 border border-[#E5E5E5] rounded-md text-sm focus:outline-none focus:border-[#0A0A0A]" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#404040] mb-2">Description</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-[#E5E5E5] rounded-md text-sm focus:outline-none focus:border-[#0A0A0A]"></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#404040] mb-2">Collection Image</label>
                <div className="border-2 border-dashed border-[#E5E5E5] rounded-lg p-8 flex flex-col items-center justify-center text-[#737373] hover:bg-[#FAFAFA] cursor-pointer transition-colors">
                  <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-2">
                    <Plus className="w-5 h-5 text-[#404040]" />
                  </div>
                  <span className="text-sm">Click or drag image to upload</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#404040] mb-2">Collection Type</label>
                <div className="flex bg-[#F3F4F6] p-1 rounded-md">
                  <button className="flex-1 bg-white shadow-sm text-sm font-medium py-1.5 rounded text-[#0A0A0A]">Manual</button>
                  <button className="flex-1 text-[#737373] text-sm font-medium py-1.5 hover:text-[#0A0A0A]">Automated</button>
                </div>
              </div>
              
              {selectedCollection.type === 'Smart' && (
                <div className="bg-[#FAFAFA] p-4 rounded-lg border border-[#E5E5E5] space-y-3">
                  <h4 className="text-sm font-medium">Conditions</h4>
                  <div className="flex space-x-2">
                    <select className="flex-1 px-2 py-1.5 border border-[#E5E5E5] rounded text-sm bg-white">
                      <option>Product Tag</option>
                      <option>Category</option>
                      <option>Price</option>
                    </select>
                    <select className="flex-1 px-2 py-1.5 border border-[#E5E5E5] rounded text-sm bg-white">
                      <option>is equal to</option>
                      <option>contains</option>
                    </select>
                    <input type="text" placeholder="Value" className="flex-1 px-2 py-1.5 border border-[#E5E5E5] rounded text-sm" />
                  </div>
                  <button className="text-sm text-blue-600 font-medium">+ Add another condition</button>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[#E5E5E5] bg-[#FAFAFA] flex justify-end space-x-3">
              <button onClick={() => setSelectedCollection(null)} className="px-4 py-2 border border-[#E5E5E5] bg-white rounded-md text-sm font-medium hover:bg-[#FAFAFA]">Cancel</button>
              <button className="px-4 py-2 bg-[#0A0A0A] text-white rounded-md text-sm font-medium flex items-center hover:bg-[#404040]">
                <Save className="w-4 h-4 mr-2" />
                Save Collection
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
