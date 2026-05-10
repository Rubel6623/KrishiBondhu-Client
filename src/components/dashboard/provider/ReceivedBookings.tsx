"use client";

import { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  Banknote,
  Search,
  Loader2,
  AlertCircle
} from "lucide-react";
import { getMyBookings, updateBookingStatus } from "@/services/bookings";
import { toast } from "sonner";
import ChatButton from "@/components/chat/ChatButton";

export default function ReceivedBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      const filter = statusFilter === "ALL" ? {} : { status: statusFilter };
      const res = await getMyBookings(filter);
      if (res.success) setBookings(res.data);
      setIsLoading(false);
    };
    fetchBookings();
  }, [statusFilter]);

  const handleStatusUpdate = async (id: string, status: string) => {
    const res = await updateBookingStatus(id, status);
    if (res.success) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
      toast.success(`Booking ${status.toLowerCase()} successfully`);
    } else {
      toast.error(res.message || "Failed to update booking status");
    }
  };

  const statuses = ["ALL", "PENDING", "ACCEPTED", "COMPLETED", "CANCELLED"];

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              statusFilter === status 
                ? "bg-green-brand text-white shadow-lg shadow-green-brand/20" 
                : "bg-card border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="animate-spin text-green-brand" size={40} />
          <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Fetching bookings...</p>
        </div>
      ) : bookings.length > 0 ? (
        <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-white/5 border-b border-border">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Farmer & Equipment</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Duration</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Price</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center font-bold text-lg">
                          {booking.farmer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{booking.equipment.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <User size={12} /> {booking.farmer.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-foreground flex items-center gap-2">
                           <Calendar size={14} className="text-green-brand" /> 
                           {new Date(booking.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest ml-5">To {new Date(booking.endDate).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-lg font-black text-foreground">৳{booking.totalPrice}</p>
                       <p className="text-[10px] font-black text-green-brand uppercase tracking-widest">Paid via Wallet</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block ${
                        booking.status === "PENDING" ? "bg-orange-100 text-orange-600" :
                        booking.status === "ACCEPTED" ? "bg-blue-100 text-blue-600" :
                        booking.status === "COMPLETED" ? "bg-green-100 text-green-600" :
                        "bg-red-100 text-red-600"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {booking.status === "PENDING" && (
                          <>
                            <button 
                              onClick={() => handleStatusUpdate(booking.id, "ACCEPTED")}
                              className="p-2.5 rounded-xl bg-green-brand text-white hover:bg-green-bright transition-colors shadow-sm"
                              title="Accept Booking"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(booking.id, "CANCELLED")}
                              className="p-2.5 rounded-xl bg-red-500 text-white hover:bg-red-400 transition-colors shadow-sm"
                              title="Cancel Booking"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        {booking.status === "ACCEPTED" && (
                           <div className="flex items-center gap-2">
                              <button 
                                 onClick={() => handleStatusUpdate(booking.id, "COMPLETED")}
                                 className="px-4 py-2 rounded-xl bg-green-pale text-green-brand font-black text-[10px] uppercase tracking-widest hover:bg-green-brand hover:text-white transition-all shadow-sm"
                              >
                                Complete
                              </button>
                              <ChatButton
                                contextType="BOOKING"
                                contextId={booking.id}
                                participantName={booking.farmer?.name || "Farmer"}
                                label="Chat"
                              />
                           </div>
                        )}
                        {booking.status === "COMPLETED" && (
                           <ChatButton
                             contextType="BOOKING"
                             contextId={booking.id}
                             participantName={booking.farmer?.name || "Farmer"}
                             label="Chat"
                           />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-[40px] p-20 text-center flex flex-col items-center gap-6 shadow-sm">
          <div className="w-24 h-24 rounded-full bg-orange-500/5 flex items-center justify-center text-orange-500">
            <Clock size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-black text-foreground">No Bookings Yet</h3>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">When farmers rent your equipment, they will appear here for your approval.</p>
          </div>
        </div>
      )}
    </div>
  );
}
