"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect } from "react";

interface FilterSectionProps {
  categories: any[];
  onFilterChange: (filters: any) => void;
}

export default function FilterSection({ categories, onFilterChange }: FilterSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ searchTerm, categoryId: selectedCategory, minPrice: priceRange.min, maxPrice: priceRange.max });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, priceRange]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
  };

  return (
    <div className="sticky top-[100px]">
      {/* Search Bar */}
      <div className="relative mb-8 group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-green-brand transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search equipment..."
          className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white dark:bg-white/5 border border-black/6 dark:border-white/10 outline-none focus:border-green-brand dark:focus:border-green-brand transition-all font-medium text-[15px] shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block space-y-10">
        {/* Categories */}
        <section>
          <h4 className="text-[13px] font-bold uppercase tracking-[2px] text-green-mid dark:text-green-brand mb-6">Equipment Category</h4>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setSelectedCategory("")}
              className={`text-left px-5 py-3 rounded-xl transition-all text-[14px] font-semibold ${
                selectedCategory === "" 
                  ? "bg-green-brand text-white shadow-lg shadow-green-brand/20" 
                  : "bg-white/50 dark:bg-white/5 text-text-mid hover:bg-green-pale dark:hover:bg-white/10"
              }`}
            >
              All Equipment
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-left px-5 py-3 rounded-xl transition-all text-[14px] font-semibold ${
                  selectedCategory === cat.id 
                    ? "bg-green-brand text-white shadow-lg shadow-green-brand/20" 
                    : "bg-white/50 dark:bg-white/5 text-text-mid hover:bg-green-pale dark:hover:bg-white/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Price Range */}
        <section>
          <h4 className="text-[13px] font-bold uppercase tracking-[2px] text-green-mid dark:text-green-brand mb-6">Price Range (৳)</h4>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              className="w-full h-12 px-4 rounded-xl bg-white dark:bg-white/5 border border-black/6 dark:border-white/10 outline-none focus:border-green-brand text-[14px]"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full h-12 px-4 rounded-xl bg-white dark:bg-white/5 border border-black/6 dark:border-white/10 outline-none focus:border-green-brand text-[14px]"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            />
          </div>
        </section>

        <button 
          onClick={clearFilters}
          className="w-full py-4 rounded-xl border border-dashed border-black/10 dark:border-white/10 text-[13px] font-bold uppercase tracking-wider text-text-muted hover:text-green-brand hover:border-green-brand/50 transition-all"
        >
          Reset All Filters
        </button>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex gap-4">
        <button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex-1 h-14 rounded-2xl bg-white dark:bg-white/5 border border-black/6 dark:border-white/10 flex items-center justify-center gap-2 font-bold text-green-brand"
        >
          <SlidersHorizontal size={18} /> Filters
        </button>
      </div>

      {/* Mobile Filter Overlay (Simplified for now) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md p-6 overflow-y-auto">
          <div className="bg-white dark:bg-cream-dark rounded-[32px] p-8 min-h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-serif text-2xl font-bold">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <X size={20} />
              </button>
            </div>
            {/* Repeat filter logic for mobile... */}
             <div className="space-y-8">
                {/* Categories */}
                <div>
                   <h4 className="text-[12px] font-bold uppercase tracking-widest text-green-brand mb-4">Categories</h4>
                   <div className="flex flex-wrap gap-2">
                     <button onClick={() => {setSelectedCategory(""); setIsMobileFilterOpen(false)}} className={`px-4 py-2 rounded-full text-xs font-bold border ${selectedCategory === "" ? "bg-green-brand text-white" : "border-black/10"}`}>All</button>
                     {categories.map(cat => (
                        <button key={cat.id} onClick={() => {setSelectedCategory(cat.id); setIsMobileFilterOpen(false)}} className={`px-4 py-2 rounded-full text-xs font-bold border ${selectedCategory === cat.id ? "bg-green-brand text-white" : "border-black/10"}`}>{cat.name}</button>
                     ))}
                   </div>
                </div>
                {/* Price */}
                <div>
                  <h4 className="text-[12px] font-bold uppercase tracking-widest text-green-brand mb-4">Price Range</h4>
                  <div className="flex gap-4">
                    <input type="number" placeholder="Min" className="flex-1 h-12 px-4 rounded-xl border border-black/10" value={priceRange.min} onChange={e => setPriceRange({...priceRange, min: e.target.value})} />
                    <input type="number" placeholder="Max" className="flex-1 h-12 px-4 rounded-xl border border-black/10" value={priceRange.max} onChange={e => setPriceRange({...priceRange, max: e.target.value})} />
                  </div>
                </div>
                <button onClick={() => {clearFilters(); setIsMobileFilterOpen(false)}} className="w-full py-4 bg-green-pale text-green-brand font-bold rounded-2xl mt-4">Reset All</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
