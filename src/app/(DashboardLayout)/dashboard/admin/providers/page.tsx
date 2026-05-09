"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Search, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Mail,
  MapPin,
  Tractor,
  Loader2,
  RefreshCw,
  Award,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import { getAllUsers, updateUserStatus, deleteUser } from "@/services/user";
import { toast } from "sonner";

export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      if (res.success) {
        // Filter only PROVIDERS from the user list
        const filtered = res.data.filter((u: any) => u.role === "PROVIDER");
        setProviders(filtered);
      }
    } catch (error) {
      toast.error("Failed to load providers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleStatusUpdate = async (id: string, currentStatus: boolean) => {
    const newStatus = currentStatus ? "BANNED" : "ACTIVE";
    try {
      const res = await updateUserStatus(id, newStatus);
      if (res.success) {
        toast.success(`Provider ${newStatus === "ACTIVE" ? "verified" : "suspended"} successfully`);
        fetchProviders();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredProviders = providers.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && providers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Verifying Credentials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">Partner Ecosystem</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
            Service <em>Providers</em>
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Manage verified equipment owners and their business credentials.</p>
        </div>
        <button 
          onClick={fetchProviders}
          className="p-4 rounded-2xl bg-muted hover:bg-muted/80 transition-all border border-border"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[32px] bg-green-brand/5 border border-green-brand/10">
           <div className="text-[10px] font-black uppercase tracking-widest text-green-brand mb-2">Verified Partners</div>
           <div className="text-4xl font-serif font-black text-foreground">{providers.filter(p => p.isVerified).length}</div>
        </div>
        <div className="p-8 rounded-[32px] bg-amber-500/5 border border-amber-500/10">
           <div className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Pending Approval</div>
           <div className="text-4xl font-serif font-black text-foreground">{providers.filter(p => !p.isVerified).length}</div>
        </div>
        <div className="p-8 rounded-[32px] bg-muted/30 border border-border">
           <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Total Capacity</div>
           <div className="text-4xl font-serif font-black text-foreground">{providers.length} Entities</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search by provider name, business email or phone..."
          className="w-full pl-12 pr-4 py-4 rounded-[24px] bg-white dark:bg-zinc-950 border border-border focus:ring-2 focus:ring-green-brand/20 outline-none transition-all font-medium shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProviders.map((provider, index) => (
            <motion.div 
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-zinc-950 rounded-[40px] border border-border p-8 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-3xl bg-muted border border-border flex items-center justify-center font-black text-3xl overflow-hidden group-hover:scale-105 transition-transform">
                    {provider.avatar ? (
                        <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
                    ) : (
                        provider.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-black text-foreground tracking-tight flex items-center gap-2">
                       {provider.name}
                       {provider.isVerified && <Award className="w-5 h-5 text-green-brand" />}
                    </h3>
                    <p className="text-xs text-muted-foreground font-bold flex items-center gap-1 mt-1">
                       <Mail className="w-3 h-3" /> {provider.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                   <button 
                      onClick={() => handleStatusUpdate(provider.id, provider.isVerified)}
                      className={`p-3 rounded-2xl transition-all ${
                        provider.isVerified ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'
                      }`}
                   >
                     {provider.isVerified ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Location</p>
                    <p className="text-sm font-bold text-foreground flex items-center gap-1">
                       <MapPin className="w-3 h-3 text-red-500" />
                       {provider.location || "Remote"}
                    </p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Verification</p>
                    <p className={`text-sm font-black uppercase tracking-widest ${provider.isVerified ? 'text-green-brand' : 'text-amber-500'}`}>
                       {provider.isVerified ? 'Trust Verified' : 'Pending Review'}
                    </p>
                 </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-muted text-muted-foreground">
                       <Tractor className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">8 Active Equipments</span>
                 </div>
                 <button className="text-[10px] font-black uppercase tracking-widest text-green-brand hover:underline flex items-center gap-1">
                    Full Profile <ExternalLink className="w-3 h-3" />
                 </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProviders.length === 0 && (
        <div className="p-20 text-center bg-muted/20 rounded-[40px]">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-serif font-black text-foreground">No providers match</h3>
          <p className="text-muted-foreground font-medium">Verify your search criteria or add new partners.</p>
        </div>
      )}
    </div>
  );
}
