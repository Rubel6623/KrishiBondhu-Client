"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ListTodo, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock,
  User,
  Tractor,
  CreditCard,
  Calendar,
  Loader2,
  RefreshCw,
  MoreHorizontal,
  MapPin,
  ExternalLink
} from "lucide-react";
import { getMyBookings, updateBookingStatus } from "@/services/bookings";
import { toast } from "sonner";

export default function AdminBookingsPage() {
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
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const res = await updateBookingStatus(id, status);
      if (res.success) {
        toast.success(`Booking ${status.toLowerCase()} successfully`);
        fetchBookings();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredBookings = bookings.filter(b => 
    filterStatus === "ALL" || b.status === filterStatus
  );

  if (loading && bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Accessing Booking Ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">Transaction Oversight</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
            Global <em>Bookings</em>
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Review and manage all rental activities across the platform.</p>
        </div>
        <button 
          onClick={fetchBookings}
          className="p-4 rounded-2xl bg-muted hover:bg-muted/80 transition-all border border-border"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filter */}
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

      {/* Bookings Table */}
      <div className="bg-white dark:bg-zinc-950 border border-border rounded-[40px] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Order Info</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Parties</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Schedule</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Amount</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence mode="popLayout">
                {filteredBookings.map((booking, index) => (
                  <motion.tr 
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/20 transition-all group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-muted border border-border flex flex-col items-center justify-center group-hover:bg-green-brand/10 transition-colors">
                           <Tractor className="w-6 h-6 text-green-brand" />
                        </div>
                        <div>
                          <p className="font-black text-foreground">{booking.equipment?.title}</p>
                          <div className={`mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                            booking.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : 
                            booking.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500' : 
                            booking.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                            'bg-blue-500/10 text-blue-500'
                          }`}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-2">
                         <div className="flex items-center gap-2 text-xs font-bold">
                            <span className="text-muted-foreground uppercase text-[9px]">Farmer:</span>
                            <span className="text-foreground">{booking.farmer?.name}</span>
                         </div>
                         <div className="flex items-center gap-2 text-xs font-bold">
                            <span className="text-muted-foreground uppercase text-[9px]">Provider:</span>
                            <span className="text-foreground">{booking.equipment?.provider?.name}</span>
                         </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-foreground flex items-center gap-2">
                           <Calendar className="w-3 h-3 text-green-brand" />
                           {new Date(booking.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-[10px] font-bold text-muted-foreground pl-5 uppercase">To</p>
                        <p className="text-xs font-bold text-foreground flex items-center gap-2">
                           <Calendar className="w-3 h-3 text-red-500" />
                           {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                           <CreditCard className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-black text-foreground tracking-tight">৳{booking.totalPrice.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         {booking.status === 'PENDING' && (
                           <>
                             <button 
                                onClick={() => handleStatusUpdate(booking.id, "ACCEPTED")}
                                className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                             >
                               <CheckCircle2 className="w-5 h-5" />
                             </button>
                             <button 
                                onClick={() => handleStatusUpdate(booking.id, "CANCELLED")}
                                className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                             >
                               <XCircle className="w-5 h-5" />
                             </button>
                           </>
                         )}
                         <button className="p-2 bg-muted text-muted-foreground rounded-xl hover:bg-zinc-900 hover:text-white transition-all">
                           <MoreHorizontal className="w-5 h-5" />
                         </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {filteredBookings.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <ListTodo className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-serif font-black text-foreground">No bookings recorded</h3>
            <p className="text-muted-foreground font-medium">Platform activity will appear here once farmers start renting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
