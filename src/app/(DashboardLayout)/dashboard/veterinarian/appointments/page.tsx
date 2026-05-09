"use client";

import { useState } from "react";
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
  Plus
} from "lucide-react";

const mockAppointments = [
  { id: "1", farmer: "Md. Abdul Karim", animal: "Cattle (Brahma)", date: "2026-05-10", time: "10:30 AM", type: "Online", status: "PENDING", desc: "Coughing and loss of appetite for 2 days." },
  { id: "2", farmer: "Rahima Khatun", animal: "Goat (Black Bengal)", date: "2026-05-10", time: "11:45 AM", type: "On-site", status: "ACCEPTED", desc: "Routine health checkup and vaccination." },
  { id: "3", farmer: "Sujon Ahmed", animal: "Poultry (Broiler)", date: "2026-05-11", time: "09:00 AM", type: "Online", status: "PENDING", desc: "Sudden drop in egg production." },
  { id: "4", farmer: "Kashem Ali", animal: "Sheep", date: "2026-05-11", time: "02:30 PM", type: "On-site", status: "COMPLETED", desc: "Wound treatment on left leg." },
];

export default function VeterinarianAppointments() {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = mockAppointments.filter(apt => {
    const matchesFilter = filter === "ALL" || apt.status === filter;
    const matchesSearch = apt.farmer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         apt.animal.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statuses = ["ALL", "PENDING", "ACCEPTED", "COMPLETED", "CANCELLED"];

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            Appointment <em className="italic text-green-brand not-italic">Manager</em>
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
                  {apt.type === "Online" ? <Video className="w-8 h-8" /> : <MapPin className="w-8 h-8" />}
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-serif font-black text-foreground">{apt.farmer}</h3>
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest ${
                        apt.type === 'Online' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {apt.type.toUpperCase()}
                      </span>
                   </div>
                   <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                     {apt.animal} • <Clock className="inline w-3 h-3 mb-0.5" /> {apt.time} • {new Date(apt.date).toLocaleDateString()}
                   </p>
                </div>
              </div>

              <div className="flex-1 max-w-md hidden md:block">
                 <p className="text-sm text-muted-foreground italic leading-relaxed line-clamp-2">
                   "{apt.desc}"
                 </p>
              </div>

              <div className="flex items-center gap-4 border-t xl:border-t-0 pt-6 xl:pt-0">
                <div className="flex flex-col items-end mr-4">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                     apt.status === "PENDING" ? "bg-orange-100 text-orange-600" :
                     apt.status === "ACCEPTED" ? "bg-blue-100 text-blue-600" :
                     apt.status === "COMPLETED" ? "bg-green-100 text-green-600" :
                     "bg-red-100 text-red-600"
                   }`}>
                     {apt.status}
                   </span>
                </div>
                
                <div className="flex gap-2">
                  {apt.status === "PENDING" && (
                    <>
                      <button className="p-3 rounded-xl bg-green-brand text-white hover:bg-green-mid shadow-lg shadow-green-brand/20 transition-all">
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button className="p-3 rounded-xl bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/20 transition-all">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  {apt.status === "ACCEPTED" && (
                     <button className="px-6 py-3 bg-green-pale text-green-brand rounded-xl font-black text-xs uppercase tracking-widest hover:bg-green-brand hover:text-white transition-all">
                        Complete Session
                     </button>
                  )}
                  <button className="p-3 rounded-xl bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-20 text-center flex flex-col items-center gap-6 bg-card border border-border rounded-[40px] shadow-inner">
             <Calendar className="w-16 h-16 text-muted-foreground/20" />
             <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No appointments found matches your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
