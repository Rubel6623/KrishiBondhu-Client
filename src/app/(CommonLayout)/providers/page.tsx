"use client";

import { useState, useEffect } from "react";
import ProviderCard from "@/components/providers/ProviderCard";
import { getAllProviders } from "@/services/providers";
import SectionBackground from "@/components/home/SectionBackground";
import { Users, Loader2, Search, MapPin, SearchX } from "lucide-react";

export default function ProvidersPage() {
  const [providers, setProviders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  
  // Debounced filters
  const [filters, setFilters] = useState<any>({
    searchTerm: "",
    location: "",
    page: 1,
    limit: 12
  });

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev: any) => ({ ...prev, searchTerm, location, page: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, location]);

  useEffect(() => {
    const fetchProviders = async () => {
      setIsLoading(true);
      const res = await getAllProviders(filters);
      if (res.success || res.data) {
        // Backend returns { meta: {...}, data: [...] } inside res.data usually if standard response, 
        // but let's handle if res.data is the array or res.data.data is the array
        const list = res.data?.data || res.data || [];
        setProviders(Array.isArray(list) ? list : []);
      }
      setIsLoading(false);
    };
    fetchProviders();
  }, [filters]);

  return (
    <main className="min-h-screen pt-[120px] pb-20 relative overflow-hidden">
      <SectionBackground />
      
      {/* Hero / Header */}
      <section className="px-[5%] mb-16 relative z-10">
        <div className="max-w-[1280px] mx-auto text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-brand/10 border border-green-brand/20 text-green-brand text-[12px] font-bold uppercase tracking-wider mb-6">
            <Users size={16} /> Directory
          </div>
          <h1 className="font-serif text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.1] text-green-deep dark:text-white mb-6">
            Verified <em className="italic text-green-brand dark:text-green-bright not-italic underline decoration-green-brand/30 decoration-8 underline-offset-8">Partners</em>
          </h1>
          <p className="text-[17px] leading-relaxed text-text-muted max-w-[640px]">
            Connect with our network of certified equipment providers across Bangladesh. 
            Find reliable partners for your agricultural needs.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-[5%] relative z-10">
        <div className="max-w-[1280px] mx-auto">
          
          {/* Filters Bar */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/6 dark:border-white/10 rounded-3xl p-6 mb-12 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-green-brand transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by provider name..."
                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white dark:bg-card-bg border border-black/6 dark:border-white/10 outline-none focus:border-green-brand dark:focus:border-green-brand transition-all font-medium text-[15px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative flex-1 md:max-w-[300px] group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-green-brand transition-colors">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                placeholder="Filter by location (e.g. Dhaka)"
                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white dark:bg-card-bg border border-black/6 dark:border-white/10 outline-none focus:border-green-brand dark:focus:border-green-brand transition-all font-medium text-[15px]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            {(searchTerm || location) && (
               <button 
                 onClick={() => { setSearchTerm(""); setLocation(""); }}
                 className="h-14 px-8 rounded-2xl border border-dashed border-black/10 dark:border-white/10 font-bold text-text-muted hover:text-green-brand hover:border-green-brand transition-all"
               >
                 Clear
               </button>
            )}
          </div>

          {/* Results Grid */}
          <div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="animate-spin text-green-brand" size={40} />
                <p className="text-text-muted font-medium">Finding the best providers...</p>
              </div>
            ) : providers.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <p className="text-[14px] font-medium text-text-muted">
                    Showing <span className="text-green-brand font-bold">{providers.length}</span> verified providers
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {providers.map((provider, index) => (
                    <div 
                      key={provider.id} 
                      className="animate-[fadeUp_0.6s_ease-out_both]"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProviderCard provider={provider} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 text-center">
                <div className="w-24 h-24 rounded-full bg-green-pale flex items-center justify-center text-green-brand mb-6">
                  <SearchX size={40} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-green-deep dark:text-white mb-2">No Providers Found</h3>
                <p className="text-text-muted max-w-[320px]">We couldn't find any partners matching your criteria. Try adjusting your search.</p>
                <button 
                  onClick={() => { setSearchTerm(""); setLocation(""); }}
                  className="mt-8 px-8 py-3.5 bg-green-brand text-white font-bold rounded-full hover:bg-green-mid transition-all shadow-lg shadow-green-brand/20"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}

