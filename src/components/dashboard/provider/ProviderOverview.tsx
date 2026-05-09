"use client";

import { useEffect, useState } from "react";
import { 
  Tractor, 
  ListTodo, 
  Wallet, 
  Star,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  PlusCircle
} from "lucide-react";
import { getProviderStats } from "@/services/analytics";
import { getMyBookings } from "@/services/bookings";
import Link from "next/link";

export default function ProviderOverview() {
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          getProviderStats(),
          getMyBookings({ limit: 5 })
        ]);
        
        if (statsRes.success) setStats(statsRes.data);
        if (bookingsRes.success) setRecentBookings(bookingsRes.data);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-3xl bg-gray-100 dark:bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  const statCards = [
    { label: "Total Equipment", value: stats?.totalEquipment || 0, icon: Tractor, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Bookings", value: stats?.activeBookings || 0, icon: ListTodo, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Total Earnings", value: `৳${stats?.totalEarnings || 0}`, icon: Wallet, color: "text-green-brand", bg: "bg-green-brand/10" },
    { label: "Average Rating", value: stats?.avgRating || "4.8", icon: Star, color: "text-gold", bg: "bg-gold/10" },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-green-brand/5 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-green-brand bg-green-brand/10 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp size={10} /> +12%
              </span>
            </div>
            <p className="text-muted-foreground text-xs font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-serif font-black text-foreground mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Bookings List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-black text-foreground flex items-center gap-3">
              Recent <em className="italic text-green-brand not-italic">Bookings</em>
            </h2>
            <button className="text-xs font-black text-green-brand uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
            {recentBookings.length > 0 ? (
              <div className="divide-y divide-border">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-green-pale flex items-center justify-center text-green-brand font-bold text-lg">
                        {booking.equipment.title.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{booking.equipment.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <User size={12} /> {booking.farmer.name} • <Clock size={12} /> {new Date(booking.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="font-black text-foreground">৳{booking.totalPrice}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black">Total Price</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        booking.status === "PENDING" ? "bg-orange-100 text-orange-600" :
                        booking.status === "ACCEPTED" ? "bg-blue-100 text-blue-600" :
                        booking.status === "COMPLETED" ? "bg-green-100 text-green-600" :
                        "bg-red-100 text-red-600"
                      }`}>
                        {booking.status}
                      </span>
                      <ArrowUpRight className="text-muted-foreground w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-20 text-center flex flex-col items-center gap-4">
                <AlertCircle size={48} className="text-muted-foreground/30" />
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No recent bookings found</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-black text-foreground">
            Quick <em className="italic text-green-brand not-italic">Actions</em>
          </h2>
          <div className="space-y-4">
            <Link 
              href="/dashboard/provider/add-equipment"
              className="w-full bg-green-brand text-white p-6 rounded-[24px] flex items-center justify-between group shadow-lg shadow-green-brand/20 hover:-translate-y-1 transition-all"
            >
              <div className="text-left">
                <p className="font-black text-sm">Add New Listing</p>
                <p className="text-[10px] opacity-80 uppercase tracking-widest font-black mt-1">List your machinery</p>
              </div>
              <PlusCircle className="w-8 h-8 group-hover:rotate-90 transition-transform" />
            </Link>
            
            <div className="p-6 rounded-[24px] border border-border bg-card space-y-4 shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                  <p className="text-sm font-bold">Profile Verification</p>
               </div>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 Complete your verification to appear higher in search results and gain trust from farmers.
               </p>
               <div className="w-full h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gold" />
               </div>
               <p className="text-[10px] font-black text-gold uppercase tracking-widest">75% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
