"use client";

import React, { useState } from "react";
import { Search, Tag, MoreHorizontal, Edit2, Merge, Trash2, LayoutGrid, List } from "lucide-react";

const mockTags = [
  { id: "1", name: "Leggings", category: "Type", count: 145 },
  { id: "2", name: "Summer", category: "Season", count: 89 },
  { id: "3", name: "Yoga", category: "Activity", count: 210 },
  { id: "4", name: "Second Skin", category: "Material", count: 56 },
  { id: "5", name: "High Rise", category: "Misc", count: 134 },
  { id: "6", name: "Womens", category: "Gender", count: 320 },
  { id: "7", name: "Core Collection", category: "Brand", count: 45 },
];

const categories = ["All Tags", "Gender", "Type", "Season", "Material", "Activity", "Brand", "Misc"];

export default function TagsPage() {
  const [view, setView] = useState<"cloud" | "table">("table");
  const [activeCategory, setActiveCategory] = useState("All Tags");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredTags = activeCategory === "All Tags" 
    ? mockTags 
    : mockTags.filter(t => t.category === activeCategory);

  const toggleSelect = (id: string) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter(t => t !== id));
    } else {
      setSelectedTags([...selectedTags, id]);
    }
  };

  return (
    <div className="flex h-full bg-[#FAFAFA] text-[#0A0A0A]">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-[#E5E5E5] bg-white p-6 flex flex-col">
        <h2 className="text-sm font-semibold text-[#404040] mb-4 uppercase tracking-wider">Categories</h2>
        <nav className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                activeCategory === cat 
                  ? "bg-[#F3F4F6] text-[#0A0A0A] font-medium" 
                  : "text-[#737373] hover:bg-[#FAFAFA] hover:text-[#0A0A0A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Tags</h1>
            <p className="text-[#737373] text-sm">{filteredTags.length} tags in {activeCategory}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#737373]" />
              <input
                type="text"
                placeholder="Search tags..."
                className="w-full pl-9 pr-4 py-2 border border-[#E5E5E5] rounded-md text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
              />
            </div>
            
            <div className="flex items-center bg-white border border-[#E5E5E5] rounded-md p-1">
              <button onClick={() => setView("cloud")} className={`p-1.5 rounded-sm ${view === "cloud" ? "bg-[#F3F4F6]" : "text-[#737373]"}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setView("table")} className={`p-1.5 rounded-sm ${view === "table" ? "bg-[#F3F4F6]" : "text-[#737373]"}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {selectedTags.length > 0 && (
          <div className="bg-[#F3F4F6] border border-[#E5E5E5] rounded-md p-3 mb-6 flex items-center justify-between">
            <span className="text-sm font-medium">{selectedTags.length} tags selected</span>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 bg-white border border-[#E5E5E5] rounded text-sm font-medium flex items-center hover:bg-[#FAFAFA]">
                <Merge className="w-4 h-4 mr-2" /> Merge
              </button>
              <button className="px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded text-sm font-medium flex items-center hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </button>
            </div>
          </div>
        )}

        {view === "cloud" ? (
          <div className="flex flex-wrap gap-4 items-center">
            {filteredTags.sort((a,b) => b.count - a.count).map(tag => {
              // rough size scale based on count
              const size = Math.max(0.8, Math.min(2, tag.count / 100));
              return (
                <div 
                  key={tag.id}
                  style={{ fontSize: `${size}rem` }}
                  className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-full shadow-sm hover:border-[#0A0A0A] hover:shadow-md transition-all cursor-pointer flex items-center space-x-2 group"
                >
                  <Tag className="w-[0.8em] h-[0.8em] text-[#737373]" />
                  <span>{tag.name}</span>
                  <span className="text-[#737373] text-[0.7em]">({tag.count})</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#FAFAFA] text-[#737373] border-b border-[#E5E5E5]">
                <tr>
                  <th className="px-4 py-3 w-12 text-center">
                    <input type="checkbox" onChange={(e) => setSelectedTags(e.target.checked ? filteredTags.map(t=>t.id) : [])} checked={selectedTags.length === filteredTags.length && filteredTags.length > 0} />
                  </th>
                  <th className="px-6 py-3 font-medium">Tag Name</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Products</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTags.map((tag) => (
                  <tr key={tag.id} className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA]">
                    <td className="px-4 py-4 text-center">
                      <input type="checkbox" checked={selectedTags.includes(tag.id)} onChange={() => toggleSelect(tag.id)} />
                    </td>
                    <td className="px-6 py-4 font-medium">{tag.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-[#F3F4F6] text-[#404040] px-2 py-1 rounded text-xs">{tag.category}</span>
                    </td>
                    <td className="px-6 py-4 text-[#737373]">{tag.count}</td>
                    <td className="px-6 py-4 text-right flex justify-end space-x-3">
                      <button className="text-[#737373] hover:text-[#0A0A0A]" title="Rename"><Edit2 className="w-4 h-4" /></button>
                      <button className="text-[#737373] hover:text-[#0A0A0A]" title="Merge"><Merge className="w-4 h-4" /></button>
                      <button className="text-[#737373] hover:text-red-500" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
