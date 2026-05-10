"use client";

import { useState, useEffect } from "react";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import EquipmentCardSkeleton from "@/components/equipment/EquipmentCardSkeleton";
import FilterSection from "@/components/equipment/FilterSection";
import { getAllEquipment } from "@/services/equipment";
import { getAllCategories } from "@/services/category";
import SectionBackground from "@/components/home/SectionBackground";
import { Tractor, PackageSearch, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 8;

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<any>({
    searchTerm: "",
    categoryId: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Initial Fetch: Categories
  useEffect(() => {
    const fetchInitial = async () => {
      const catRes = await getAllCategories();
      if (catRes.success) setCategories(catRes.data);
    };
    fetchInitial();
  }, []);

  // Fetch Equipment on filter/page change
  useEffect(() => {
    const fetchEq = async () => {
      setIsLoading(true);
      const res = await getAllEquipment({
        ...filters,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });
      if (res.success) {
        setEquipment(res.data);
        // Support both meta.total and direct count from API
        setTotalCount(res.meta?.total ?? res.data?.length ?? 0);
      }
      setIsLoading(false);
    };
    fetchEq();
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev: any) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

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
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            
            {/* Sidebar Filters */}
            <aside>
              <FilterSection 
                categories={categories} 
                onFilterChange={handleFilterChange}
                sortBy={filters.sortBy}
                sortOrder={filters.sortOrder}
              />
            </aside>

            {/* Results Grid */}
            <div>
              {/* Results count + sort bar */}
              <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
                {!isLoading && (
                  <p className="text-[14px] font-medium text-text-muted">
                    Showing <span className="text-green-brand font-bold">{equipment.length}</span> of <span className="text-green-brand font-bold">{totalCount}</span> equipment
                  </p>
                )}
                <div className="flex items-center gap-3 ml-auto">
                  <label className="text-[12px] font-bold uppercase tracking-wider text-text-muted">Sort:</label>
                  <select
                    value={`${filters.sortBy}:${filters.sortOrder}`}
                    onChange={(e) => {
                      const [sortBy, sortOrder] = e.target.value.split(":");
                      handleFilterChange({ sortBy, sortOrder });
                    }}
                    className="h-10 px-4 rounded-xl bg-white dark:bg-white/5 border border-black/6 dark:border-white/10 outline-none focus:border-green-brand text-sm font-semibold cursor-pointer"
                  >
                    <option value="createdAt:desc">Newest First</option>
                    <option value="createdAt:asc">Oldest First</option>
                    <option value="price:asc">Price: Low to High</option>
                    <option value="price:desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                // Skeleton Card Grid (matches card layout)
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                    <EquipmentCardSkeleton key={i} />
                  ))}
                </div>
              ) : equipment.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {equipment.map((item, index) => (
                      <div 
                        key={item.id} 
                        className="animate-[fadeUp_0.6s_ease-out_both]"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <EquipmentCard item={item} />
                      </div>
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  <div className="mt-16 flex justify-center items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="w-12 h-12 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-sm hover:bg-green-brand hover:text-white hover:border-green-brand transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                      .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, i) =>
                        p === "..." ? (
                          <span key={`ellipsis-${i}`} className="px-2 text-text-muted">…</span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p as number)}
                            className={`w-12 h-12 rounded-xl border font-bold text-sm transition-all ${
                              currentPage === p
                                ? "bg-green-brand text-white border-green-brand shadow-lg shadow-green-brand/20"
                                : "border-black/10 dark:border-white/10 hover:bg-green-brand hover:text-white hover:border-green-brand"
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="w-12 h-12 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-sm hover:bg-green-brand hover:text-white hover:border-green-brand transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={18} />
                    </button>
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
                    onClick={() => {
                      handleFilterChange({ searchTerm: "", categoryId: "", minPrice: "", maxPrice: "", sortBy: "createdAt", sortOrder: "desc" });
                    }}
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
