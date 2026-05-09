"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Calendar, 
  Tractor, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Loader2,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { getMyBookings } from "@/services/bookings";
import { toast } from "sonner";
import Link from "next/link";

export default function FarmerBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getMyBookings();
      if (res.success) {
        setBookings(res.data);
      }
    } catch (error) {
      toast.error("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(b => 
    filterStatus === "ALL" || b.status === filterStatus
  );

  if (loading && bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Retrieving your bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">My Activity</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
            My <em>Bookings</em>
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Track and manage your equipment rental history.</p>
        </div>
        <button 
          onClick={fetchBookings}
          className="p-4 rounded-2xl bg-muted hover:bg-muted/80 transition-all border border-border"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {["ALL", "PENDING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              filterStatus === status 
              ? "bg-green-brand text-white shadow-lg shadow-green-brand/20" 
              : "bg-white dark:bg-zinc-950 border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-zinc-950 rounded-[32px] border border-border p-6 md:p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Equipment Image */}
                <div className="w-full md:w-48 h-32 rounded-[24px] overflow-hidden border border-border shrink-0">
                  <img 
                    src={booking.equipment?.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fee790ce?q=80&w=2000&auto=format&fit=crop"} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={booking.equipment?.title} 
                  />
                </div>

                {/* Main Info */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                   <div>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                         <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase ${
                            booking.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : 
                            booking.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500' : 
                            booking.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                            'bg-blue-500/10 text-blue-500'
                          }`}>
                            {booking.status}
                         </span>
                         <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1 rounded-md">ID: {booking.id.substring(0, 8)}</span>
                      </div>
                      <h3 className="text-2xl font-serif font-black text-foreground tracking-tight">{booking.equipment?.title}</h3>
                   </div>

                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-bold text-muted-foreground">
                      <div className="flex items-center gap-2">
                         <MapPin className="w-4 h-4 text-red-500" />
                         {booking.equipment?.location}
                      </div>
                      <div className="flex items-center gap-2">
                         <Calendar className="w-4 h-4 text-green-brand" />
                         {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </div>
                   </div>
                </div>

                {/* Price & Actions */}
                <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-4 shrink-0 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
                   <div className="text-center md:text-right">
                      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Rental</div>
                      <div className="text-3xl font-serif font-black text-green-brand">৳{booking.totalPrice.toLocaleString()}</div>
                   </div>
                   <Link href={`/equipment/${booking.equipmentId}`}>
                      <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-muted hover:bg-zinc-900 hover:text-white transition-all text-xs font-black uppercase tracking-widest">
                         Re-book <RefreshCw className="w-4 h-4" />
                      </button>
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredBookings.length === 0 && (
        <div className="p-20 text-center bg-muted/20 rounded-[40px] border border-dashed border-border">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-serif font-black text-foreground">No bookings found</h3>
          <p className="text-muted-foreground font-medium">Start exploring our equipment marketplace to rent gear for your farm.</p>
          <Link href="/equipment" className="mt-6 inline-block text-green-brand font-black text-sm hover:underline">Browse Equipment →</Link>
        </div>
      )}
    </div>
  );
}
