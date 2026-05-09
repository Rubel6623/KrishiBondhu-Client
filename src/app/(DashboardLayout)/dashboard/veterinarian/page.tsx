"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  Stethoscope, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Star,
  ChevronRight,
  Video,
  FileText,
  MapPin
} from "lucide-react";
import { getUser } from "@/services/auth";
import { Loader2 } from "lucide-react";

export default function VeterinarianDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Specialist Dashboard...</p>
      </div>
    );
  }

  const stats = [
    { label: "Today's Appointments", value: "8", icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Consultations", value: "142", icon: Stethoscope, color: "text-green-brand", bg: "bg-green-brand/10" },
    { label: "Active Patients", value: "24", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Avg. Rating", value: "4.9", icon: Star, color: "text-gold", bg: "bg-gold/10" },
  ];

  const upcomingAppointments = [
    { id: 1, patient: "Md. Abdul Karim", animal: "Cattle (Brahma)", time: "10:30 AM", type: "Online", status: "Upcoming" },
    { id: 2, patient: "Rahima Khatun", animal: "Goat (Black Bengal)", time: "11:45 AM", type: "On-site", status: "Upcoming" },
    { id: 3, patient: "Sujon Ahmed", animal: "Poultry Farm", time: "02:15 PM", type: "Online", status: "Upcoming" },
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">Professional Hub</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
             Specialist <em>Overview</em>
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Manage your appointments and provide expert care to farmers.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 rounded-2xl bg-green-brand text-white font-bold shadow-lg shadow-green-brand/20 hover:bg-green-mid transition-all flex items-center gap-2">
            <Video className="w-5 h-5" />
            Start Consultation
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-[32px] bg-white dark:bg-zinc-950 border border-border shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-2 h-full opacity-10 ${stat.color.replace('text-', 'bg-')} transition-opacity group-hover:opacity-30`} />
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg bg-green-500/10 text-green-500">
                <TrendingUp className="w-3 h-3" />
                +12%
              </div>
            </div>
            <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-serif font-black text-foreground tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Appointments Table */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="p-10 rounded-[40px] bg-white dark:bg-zinc-950 border border-border shadow-xl h-[550px] flex flex-col"
        >
          <div className="flex items-center justify-between mb-8 shrink-0">
            <h3 className="text-2xl font-serif font-black text-foreground flex items-center gap-3">
                <Calendar className="w-6 h-6 text-green-brand" />
                Upcoming Appointments
            </h3>
            <button className="text-xs font-black text-green-brand uppercase tracking-widest hover:underline">View Schedule</button>
          </div>
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {upcomingAppointments.map((apt, i) => (
              <div key={apt.id} className="flex items-center justify-between p-6 rounded-[24px] bg-muted/30 hover:bg-muted/60 transition-all border border-transparent hover:border-green-brand/20 group">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border border-border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {apt.type === "Online" ? "💻" : "🏥"}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg leading-none mb-1">{apt.patient}</h4>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                      {apt.animal} • {apt.time}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest ${
                    apt.type === 'Online' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {apt.type.toUpperCase()}
                  </span>
                  <button className="p-2 rounded-xl bg-green-brand/10 text-green-brand hover:bg-green-brand hover:text-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Profile Card / Quick Actions */}
        <div className="space-y-8">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="p-10 rounded-[40px] bg-green-deep text-white shadow-2xl relative overflow-hidden"
           >
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-brand/20 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2" />
             
             <div className="flex items-center gap-6 mb-8 relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-3xl font-black">
                   {user?.name?.charAt(0)}
                </div>
                <div>
                   <h3 className="text-2xl font-serif font-black">{user?.name}</h3>
                   <p className="text-green-brand font-bold text-xs uppercase tracking-widest">Certified Veterinarian</p>
                </div>
             </div>

             <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 text-sm text-white/70">
                   <CheckCircle2 className="w-5 h-5 text-green-brand" />
                   Verified Specialist
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                   <Clock className="w-5 h-5 text-green-brand" />
                   Available for Emergencies
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                   <MapPin className="w-5 h-5 text-green-brand" />
                   Dhaka, Bangladesh
                </div>
             </div>

             <button className="w-full mt-10 py-4 bg-white text-green-deep rounded-2xl font-black hover:bg-green-light transition-all active:scale-95">
                Update Expert Profile
             </button>
           </motion.div>

           {/* Quick Stats / Info */}
           <div className="p-8 rounded-[40px] bg-white dark:bg-zinc-950 border border-border shadow-xl">
              <h4 className="font-serif font-black text-xl mb-6 flex items-center gap-2">
                 <AlertCircle className="w-5 h-5 text-gold" />
                 Platform Alerts
              </h4>
              <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                       <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                       Farmer demand for <span className="text-foreground">Livestock Consultations</span> has increased by 15% this week.
                    </p>
                 </div>
                 <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                       <FileText className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                       New <span className="text-foreground">Animal Health Guidelines</span> published for cattle in flood-prone areas.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
