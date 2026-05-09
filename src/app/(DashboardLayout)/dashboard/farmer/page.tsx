"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  CreditCard, 
  Clock, 
  ArrowRight, 
  Loader2, 
  Leaf,
  Tractor,
  Calendar,
  ChevronRight
} from "lucide-react";
import { getFarmerStats } from "@/services/analytics";
import Link from "next/link";

export default function FarmerDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await getFarmerStats();
        if (res.success) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Harvest...</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Bookings", value: data?.bookingsCount || "0", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Spent", value: `৳${data?.totalSpent?.toLocaleString() || "0"}`, icon: CreditCard, color: "text-green-brand", bg: "bg-green-brand/10" },
    { label: "Active Requests", value: data?.recentBookings?.filter((b: any) => b.status === 'PENDING').length || "0", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">Farmer Overview</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
            Welcome, <em>Farmer</em> 🌾
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Manage your equipment rentals and agricultural activities.</p>
        </div>
        <Link href="/equipment">
          <button className="px-8 py-4 rounded-2xl bg-green-brand text-white font-black shadow-lg shadow-green-brand/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
            Rent New Equipment <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-[32px] bg-white dark:bg-zinc-950 border border-border shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-2 h-full opacity-10 ${stat.color.replace('text-', 'bg-')} transition-opacity group-hover:opacity-30`} />
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-serif font-black text-foreground tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Recent Activity */}
        <div className="p-10 rounded-[40px] bg-white dark:bg-zinc-950 border border-border shadow-xl h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif font-black text-foreground flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-brand" />
                Recent Bookings
            </h3>
            <Link href="/dashboard/farmer/bookings" className="text-xs font-black text-green-brand uppercase tracking-widest hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {data?.recentBookings?.map((booking: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-[24px] bg-muted/30 hover:bg-muted/60 transition-all group">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-border">
                    <img src={booking.equipment?.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fee790ce?q=80&w=2000&auto=format&fit=crop"} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg leading-none mb-1">{booking.equipment?.title}</h4>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                       {new Date(booking.createdAt).toLocaleDateString()} • ৳{booking.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest ${
                  booking.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : 
                  booking.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500' : 
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
            {!data?.recentBookings?.length && (
              <div className="flex flex-col items-center justify-center py-10 opacity-30">
                <ShoppingBag className="w-12 h-12 mb-4" />
                <p className="font-bold italic">No bookings yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Quick Access */}
        <div className="p-10 rounded-[40px] bg-green-deep text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-brand/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-serif font-black mb-4">AI Crop <br /><span className="text-green-brand italic">Assistant</span></h3>
            <p className="text-white/70 leading-relaxed max-w-xs mb-8">
              Analyze soil health, predict yields, and get disease alerts using our neural farming models.
            </p>
            <div className="space-y-3">
               {["Soil Analysis", "Yield Prediction", "Pest Control"].map(item => (
                 <div key={item} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="w-8 h-8 rounded-lg bg-green-brand/20 flex items-center justify-center">
                       <Leaf className="w-4 h-4 text-green-brand" />
                    </div>
                    <span className="text-sm font-bold">{item}</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-white/30" />
                 </div>
               ))}
            </div>
          </div>
          
          <Link href="/ai/crop-assistant" className="relative z-10 mt-10 w-full py-4 bg-white text-green-deep rounded-2xl font-black text-center hover:bg-green-light transition-all">
             Launch Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}
