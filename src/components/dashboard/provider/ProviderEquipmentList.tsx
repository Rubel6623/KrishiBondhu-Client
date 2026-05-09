"use client";

import { useEffect, useState } from "react";
import { 
  Tractor, 
  Edit3, 
  Trash2, 
  Plus, 
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { getAllEquipment, deleteEquipment } from "@/services/equipment";
import { getUser } from "@/services/auth";
import Link from "next/link";
import Image from "next/image";

export default function ProviderEquipmentList() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMyEquipment = async () => {
      setIsLoading(true);
      const user = await getUser();
      if (user) {
        const res = await getAllEquipment({ providerId: user.id });
        if (res.success) setEquipment(res.data);
      }
      setIsLoading(false);
    };
    fetchMyEquipment();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this equipment?")) {
      const res = await deleteEquipment(id);
      if (res.success) {
        setEquipment(equipment.filter(item => item.id !== id));
      }
    }
  };

  const filteredEquipment = equipment.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-green-brand transition-colors" />
          <input 
            type="text" 
            placeholder="Search my equipment..." 
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-green-brand transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link 
          href="/dashboard/provider/add-equipment"
          className="w-full sm:w-auto px-6 py-3 bg-green-brand text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-green-bright transition-all shadow-lg shadow-green-brand/20"
        >
          <Plus size={18} /> Add Equipment
        </Link>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="animate-spin text-green-brand" size={40} />
          <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Loading listings...</p>
        </div>
      ) : filteredEquipment.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-[32px] overflow-hidden hover:shadow-xl hover:shadow-green-brand/5 transition-all group">
              <div className="relative h-48">
                <Image 
                  src={item.images?.[0] || "https://images.unsplash.com/photo-1593110050241-ee7ce35e9701?auto=format&fit=crop&q=80&w=800"} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-xl text-muted-foreground hover:text-green-brand shadow-sm transition-colors">
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-xl text-muted-foreground hover:text-red-500 shadow-sm transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm ${item.availability ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                     {item.availability ? 'Available' : 'Booked'}
                   </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <h3 className="text-lg font-serif font-black text-foreground line-clamp-1">{item.title}</h3>
                      <p className="text-[10px] font-black text-green-brand uppercase tracking-widest mt-1">{item.category?.name || "Equipment"}</p>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Daily Rate</p>
                    <p className="text-xl font-black text-foreground">৳{item.pricePerDay}</p>
                  </div>
                  <Link 
                    href={`/equipment/${item.id}`}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                  >
                    <MoreVertical size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-[40px] p-20 text-center flex flex-col items-center gap-6 shadow-sm">
          <div className="w-24 h-24 rounded-full bg-green-brand/5 flex items-center justify-center text-green-brand">
            <Tractor size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-black text-foreground">No Equipment Listed Yet</h3>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">Start earning by listing your agricultural machinery. It's quick and easy.</p>
          </div>
          <Link 
            href="/dashboard/provider/add-equipment"
            className="px-8 py-4 bg-green-brand text-white rounded-full font-black text-sm hover:bg-green-bright transition-all shadow-lg shadow-green-brand/20"
          >
            Add Your First Equipment
          </Link>
        </div>
      )}
    </div>
  );
}
