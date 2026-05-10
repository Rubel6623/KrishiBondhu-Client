import { getProviderById } from "@/services/providers";
import { 
  MapPin, 
  Star, 
  ShieldCheck,
  CalendarDays,
  Mail,
  Phone,
  ArrowLeft,
  Tractor,
  Package
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default async function ProviderDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await getProviderById(id);
  
  if (!response?.success || !response?.data) {
    notFound();
  }

  const provider = response.data;
  const equipmentList = provider.equipment || [];

  return (
    <main className="min-h-screen pt-[120px] pb-20 relative overflow-hidden bg-slate-50 dark:bg-zinc-950">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      
      {/* Top Decor */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-amber-500/20 via-amber-500/5 to-transparent z-0" />
      
      <div className="max-w-[1280px] mx-auto px-[5%] relative z-10">
        
        {/* Back Button */}
        <Link href="/equipment" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-amber-500 transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Equipment Marketplace
        </Link>

        {/* Profile Header Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-border shadow-2xl overflow-hidden mb-12">
          <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative group shrink-0">
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-[32px] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl relative z-10">
                  <img 
                    src={provider.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"} 
                    alt={provider.name} 
                    className="w-full h-full object-cover"
                  />
               </div>
               {provider.isVerified && (
                 <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-blue-500 border-4 border-white dark:border-zinc-900 z-20 flex items-center justify-center text-white shadow-lg">
                   <ShieldCheck size={18} />
                 </div>
               )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-none px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors">
                  Equipment Provider
                </Badge>
                <Badge className="bg-zinc-100 dark:bg-zinc-800 text-foreground border-none px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-1">
                  <Package size={14} /> {equipmentList.length} Items Listed
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-black text-foreground mb-4">
                {provider.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-amber-500" /> {provider.location || "Bangladesh"}</span>
                <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-border" />
                <span className="flex items-center gap-1.5"><CalendarDays size={16} /> Joined {new Date(provider.createdAt).getFullYear()}</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
              <button className="h-14 px-8 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black uppercase tracking-widest text-xs hover:bg-black dark:hover:bg-gray-200 transition-all shadow-xl flex items-center justify-center gap-2">
                <Mail size={16} /> Contact Provider
              </button>
              {provider.phone && (
                <button className="h-14 px-8 rounded-2xl bg-amber-500/10 text-amber-600 font-black uppercase tracking-widest text-xs hover:bg-amber-500/20 transition-all shadow-none flex items-center justify-center gap-2">
                  <Phone size={16} /> Call {provider.phone}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Equipment List Grid */}
        <div className="mb-8 flex items-center gap-3">
           <Tractor className="text-amber-500 w-8 h-8" />
           <h2 className="text-3xl font-serif font-black text-foreground">Available Equipment</h2>
        </div>

        {equipmentList.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-zinc-900 rounded-[40px] border border-border">
            <p className="text-muted-foreground font-medium">This provider has not listed any equipment yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {equipmentList.map((item: any) => (
              <Link href={`/equipment/${item.id}`} key={item.id} className="group flex flex-col bg-white dark:bg-zinc-900 rounded-[32px] border border-border overflow-hidden shadow-sm hover:shadow-2xl transition-all">
                <div className="h-[240px] relative overflow-hidden bg-muted">
                  <img 
                    src={item.images || "https://images.unsplash.com/photo-1592982537447-6f2a6a0a4c8f?q=80&w=600"} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <Badge className="bg-amber-500 text-white border-none font-black uppercase tracking-widest text-[9px]">
                      {item.category?.name || "Machinery"}
                    </Badge>
                    <div className="flex items-center gap-1 text-amber-400 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold">
                      <Star size={12} fill="currentColor" /> {item.rating || "4.8"}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-serif font-black text-foreground mb-4 group-hover:text-amber-500 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Price per day</p>
                    <p className="text-xl font-black text-foreground">৳{item.pricePerDay}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
