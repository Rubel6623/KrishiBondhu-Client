"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Search,
  Filter,
  Plus,
  Loader2,
  Info
} from "lucide-react";
import { getMyAppointments, updateAppointmentStatus } from "@/services/appointments";
import { toast } from "sonner";
import ChatButton from "@/components/chat/ChatButton";

export default function VeterinarianAppointments() {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedApt, setSelectedApt] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getMyAppointments();
        if (res.success) {
          setAppointments(res.data || []);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      const res = await updateAppointmentStatus(id, newStatus);
      if (res.success) {
        setAppointments(appointments.map(apt => 
          apt.id === id ? { ...apt, status: newStatus } : apt
        ));
        toast.success(`Appointment ${newStatus.toLowerCase()}`);
        router.refresh();
      } else {
        toast.error("Failed to update appointment");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setUpdating(null);
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === "ALL" || apt.status === filter;
    const farmerName = apt.farmer?.name || "";
    const problemDesc = apt.problemDesc || "";
    const matchesSearch = farmerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         problemDesc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statuses = ["ALL", "PENDING", "ACCEPTED", "COMPLETED", "CANCELLED"];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">Loading Appointments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            Appointment <em>Manager</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">Review and manage your consultation schedule.</p>
        </div>
        <button className="px-6 py-3 bg-green-brand text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-green-mid transition-all shadow-lg shadow-green-brand/20">
          <Calendar className="w-5 h-5" />
          Update Availability
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === s 
                  ? "bg-green-brand text-white shadow-lg shadow-green-brand/20" 
                  : "bg-card border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search farmer or animal..." 
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-green-brand transition-all text-sm font-medium shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card border border-border rounded-[32px] overflow-hidden hover:shadow-xl hover:shadow-green-brand/5 transition-all p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-8"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl bg-green-brand/10 text-green-brand flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform">
                  <Video className="w-8 h-8" />
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-serif font-black text-foreground">{apt.farmer?.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest bg-blue-500/10 text-blue-500`}>
                        ONLINE
                      </span>
                   </div>
                   <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                     Consultation • <Clock className="inline w-3 h-3 mb-0.5" /> {new Date(apt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(apt.appointmentDate).toLocaleDateString()}
                   </p>
                </div>
              </div>

              <div className="flex-1 max-w-md hidden md:block">
                 <p className="text-sm text-muted-foreground italic leading-relaxed line-clamp-2">
                   &quot;{apt.problemDesc || 'No problem description provided'}&quot;
                 </p>
              </div>

              <div className="flex items-center gap-4 border-t xl:border-t-0 pt-6 xl:pt-0">
                <div className="flex flex-col items-end mr-4">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                     apt.status === "PENDING" ? "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400" :
                     apt.status === "ACCEPTED" ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" :
                     apt.status === "COMPLETED" ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400" :
                     "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                   }`}>
                     {apt.status}
                   </span>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                   {apt.status === "PENDING" && (
                     <>
                       <button 
                         onClick={() => handleStatusUpdate(apt.id, "ACCEPTED")}
                         disabled={updating === apt.id}
                         className="p-3 rounded-xl bg-green-brand text-white hover:bg-green-mid shadow-lg shadow-green-brand/20 transition-all disabled:opacity-50"
                       >
                         {updating === apt.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                       </button>
                       <button 
                         onClick={() => handleStatusUpdate(apt.id, "CANCELLED")}
                         disabled={updating === apt.id}
                         className="p-3 rounded-xl bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/20 transition-all disabled:opacity-50"
                       >
                         {updating === apt.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                       </button>
                     </>
                   )}
                   {apt.status === "ACCEPTED" && (
                     <>
                       <button 
                         onClick={() => handleStatusUpdate(apt.id, "COMPLETED")}
                         disabled={updating === apt.id}
                         className="px-6 py-3 bg-green-pale text-green-brand rounded-xl font-black text-xs uppercase tracking-widest hover:bg-green-brand hover:text-white transition-all disabled:opacity-50"
                       >
                         {updating === apt.id ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> : null}
                         Complete Session
                       </button>
                       <ChatButton
                         contextType="APPOINTMENT"
                         contextId={apt.id}
                         participantName={apt.farmer?.name || apt.provider?.name || "Patient"}
                         label="Chat"
                       />
                     </>
                   )}
                   <button 
                     onClick={() => setSelectedApt(apt)}
                     className="px-6 py-3 bg-muted text-foreground rounded-xl font-black text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-all flex items-center gap-2"
                   >
                     <Info size={14} /> View Details
                   </button>
                 </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-20 text-center flex flex-col items-center gap-6 bg-card border border-border rounded-[40px] shadow-inner">
             <Calendar className="w-16 h-16 text-muted-foreground/20" />
             <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No appointments found matching your search.</p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl relative"
          >
            <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
              <h2 className="text-xl font-serif font-black text-foreground">Consultation Details</h2>
              <button 
                onClick={() => setSelectedApt(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-red-500 hover:text-white transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <div className="w-16 h-16 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center overflow-hidden">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Farmer</p>
                  <p className="text-xl font-black text-foreground">{selectedApt.farmer?.name}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-1"><Calendar size={12}/> Date</p>
                    <p className="font-bold text-sm text-foreground">{new Date(selectedApt.appointmentDate).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-1"><Clock size={12}/> Time</p>
                    <p className="font-bold text-sm text-foreground">{new Date(selectedApt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block ${
                     selectedApt.status === "PENDING" ? "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400" :
                     selectedApt.status === "ACCEPTED" ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" :
                     selectedApt.status === "COMPLETED" ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400" :
                     "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                   }`}>
                     {selectedApt.status}
                   </span>
                </div>

                <div className="bg-muted/50 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Problem Description</p>
                  <p className="text-sm font-medium text-foreground italic">
                    "{selectedApt.problemDesc || 'No problem description provided.'}"
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border bg-muted/30">
              <button 
                onClick={() => setSelectedApt(null)}
                className="w-full py-3 bg-foreground text-background rounded-xl font-black text-xs uppercase tracking-widest hover:bg-green-brand hover:text-white transition-all"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
