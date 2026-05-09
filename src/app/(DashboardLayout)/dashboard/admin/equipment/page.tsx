"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tractor, 
  Search, 
  Filter, 
  Trash2, 
  Eye,
  MapPin,
  Tag,
  Loader2,
  RefreshCw,
  User,
  AlertCircle
} from "lucide-react";
import { getAllEquipment, deleteEquipment } from "@/services/equipment";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminEquipmentPage() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const res = await getAllEquipment();
      if (res.success) {
        setEquipment(res.data);
      }
    } catch (error) {
      toast.error("Failed to load equipment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this equipment listing?")) return;
    
    try {
      const res = await deleteEquipment(id);
      if (res.success) {
        toast.success("Equipment removed successfully");
        fetchEquipment();
      }
    } catch (error) {
      toast.error("Failed to remove equipment");
    }
  };

  const filteredEquipment = equipment.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.provider?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && equipment.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Scanning Inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">Inventory Control</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
            Equipment <em>Listings</em>
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Manage all agricultural assets available for rent on the platform.</p>
        </div>
        <button 
          onClick={fetchEquipment}
          className="p-4 rounded-2xl bg-muted hover:bg-muted/80 transition-all border border-border"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search by equipment title or provider name..."
          className="w-full pl-12 pr-4 py-4 rounded-[24px] bg-white dark:bg-zinc-950 border border-border focus:ring-2 focus:ring-green-brand/20 outline-none transition-all font-medium shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredEquipment.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-zinc-950 rounded-[32px] border border-border overflow-hidden shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fee790ce?q=80&w=2000&auto=format&fit=crop"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={item.title} 
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-black tracking-widest uppercase border border-white/20">
                    {item.category?.name}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <div className="flex gap-2 w-full">
                     <Link href={`/equipment/${item.id}`} className="flex-1 bg-white text-black py-2 rounded-xl text-center text-xs font-black hover:bg-green-brand hover:text-white transition-all">View Details</Link>
                     <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif font-black text-xl text-foreground tracking-tight group-hover:text-green-brand transition-colors">{item.title}</h3>
                  <div className="text-green-brand font-black text-lg">৳{item.pricePerDay}</div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <User className="w-4 h-4 text-green-brand" />
                    Provider: <span className="text-foreground">{item.provider?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <MapPin className="w-4 h-4 text-red-500" />
                    {item.location}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                     <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${item.availability ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.availability ? 'bg-green-500' : 'bg-red-500'}`} />
                        {item.availability ? 'Available' : 'Booked'}
                     </div>
                     <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1 rounded-md">
                        ID: {item.id.substring(0, 8)}
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredEquipment.length === 0 && (
        <div className="p-20 text-center bg-muted/20 rounded-[40px] border border-dashed border-border">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Tractor className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-serif font-black text-foreground">No equipment found</h3>
          <p className="text-muted-foreground font-medium">Try broadening your search criteria.</p>
        </div>
      )}
    </div>
  );
}
