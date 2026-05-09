"use client";

import { useState, useEffect } from "react";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import FilterSection from "@/components/equipment/FilterSection";
import { getAllEquipment } from "@/services/equipment";
import { getAllCategories } from "@/services/category";
import SectionBackground from "@/components/home/SectionBackground";
import { Tractor, Loader2, PackageSearch } from "lucide-react";

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<any>({
    searchTerm: "",
    categoryId: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
    limit: 12
  });

  // Initial Fetch: Categories
  useEffect(() => {
    const fetchInitial = async () => {
      const catRes = await getAllCategories();
      if (catRes.success) setCategories(catRes.data);
    };
    fetchInitial();
  }, []);

  // Fetch Equipment on filter change
  useEffect(() => {
    const fetchEq = async () => {
      setIsLoading(true);
      const res = await getAllEquipment(filters);
      if (res.success) {
        setEquipment(res.data);
      }
      setIsLoading(false);
    };
    fetchEq();
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev: any) => ({ ...prev, ...newFilters, page: 1 }));
  };

  return (
    <main className="min-h-screen pt-[120px] pb-20 relative overflow-hidden">
      <SectionBackground />
      
      {/* Hero / Header */}
      <section className="px-[5%] mb-16 relative z-10">
        <div className="max-w-[1280px] mx-auto text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-brand/10 border border-green-brand/20 text-green-brand text-[12px] font-bold uppercase tracking-wider mb-6">
            <Tractor size={16} /> Marketplace
          </div>
          <h1 className="font-serif text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.1] text-green-deep dark:text-white mb-6">
            Agricultural <em className="italic text-green-brand dark:text-green-bright not-italic underline decoration-green-brand/30 decoration-8 underline-offset-8">Equipment</em>
          </h1>
          <p className="text-[17px] leading-relaxed text-text-muted max-w-[640px]">
            Access high-quality farming machinery from verified providers across Bangladesh. 
            Rent by the day or season with full support and maintenance included.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-[5%] relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
            
            {/* Sidebar Filters */}
            <aside>
              <FilterSection 
                categories={categories} 
                onFilterChange={handleFilterChange} 
              />
            </aside>

            {/* Results Grid */}
            <div>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-4">
                  <Loader2 className="animate-spin text-green-brand" size={40} />
                  <p className="text-text-muted font-medium">Harvesting latest listings...</p>
                </div>
              ) : equipment.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <p className="text-[14px] font-medium text-text-muted">
                      Showing <span className="text-green-brand font-bold">{equipment.length}</span> equipment found
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {equipment.map((item, index) => (
                      <div 
                        key={item.id} 
                        className="animate-[fadeUp_0.6s_ease-out_both]"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <EquipmentCard item={item} />
                      </div>
                    ))}
                  </div>
                  
                  {/* Pagination (Simplified) */}
                  <div className="mt-16 flex justify-center gap-2">
                    <button className="px-6 py-3 rounded-xl border border-black/10 dark:border-white/10 font-bold text-sm hover:bg-green-brand hover:text-white transition-all">Load More Listings</button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-40 text-center">
                  <div className="w-24 h-24 rounded-full bg-green-pale flex items-center justify-center text-green-brand mb-6">
                    <PackageSearch size={40} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-green-deep dark:text-white mb-2">No Equipment Found</h3>
                  <p className="text-text-muted max-w-[320px]">We couldn't find any equipment matching your current filters. Try adjusting your search.</p>
                  <button 
                    onClick={() => handleFilterChange({ searchTerm: "", categoryId: "", minPrice: "", maxPrice: "" })}
                    className="mt-8 px-8 py-3.5 bg-green-brand text-white font-bold rounded-full hover:bg-green-mid transition-all shadow-lg shadow-green-brand/20"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

