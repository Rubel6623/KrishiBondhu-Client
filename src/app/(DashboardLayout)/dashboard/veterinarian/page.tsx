"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  Stethoscope, 
  Clock, 
  TrendingUp, 
  Star,
  ChevronRight,
  Video
} from "lucide-react";
import { getMyAppointments } from "@/services/appointments";
import { getMySpecialistProfile } from "@/services/specialist";
import { Loader2 } from "lucide-react";

export default function VeterinarianDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsData = await getMyAppointments();
        if (appointmentsData.success) {
          setBookings(appointmentsData.data || []);
        }

        const profileData = await getMySpecialistProfile();
        if (profileData.success) {
          setProfile(profileData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Specialist Dashboard...</p>
      </div>
    );
  }

  const todayAppointments = bookings.filter(b => {
    const bookingDate = new Date(b.appointmentDate).toDateString();
    return bookingDate === new Date().toDateString();
  }).length;

  const stats = [
    { label: "Today's Appointments", value: todayAppointments.toString(), icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Consultations", value: bookings.length.toString(), icon: Stethoscope, color: "text-green-brand", bg: "bg-green-brand/10" },
    { label: "Active Patients", value: bookings.filter(b => b.status === "ACCEPTED").length.toString(), icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Avg. Rating", value: profile?.rating || "4.9", icon: Star, color: "text-gold", bg: "bg-gold/10" },
  ];

  const upcomingAppointments = bookings
    .filter(b => b.status === "ACCEPTED" && new Date(b.appointmentDate) > new Date())
    .slice(0, 3)
    .map(b => ({
      id: b.id,
      patient: b.farmer?.name,
      animal: "Consultation",
      time: new Date(b.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "Online",
      status: b.status
    }));

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

      {/* Upcoming Appointments */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-black text-foreground">Upcoming Consultations</h2>
          <a href="/dashboard/veterinarian/appointments" className="flex items-center gap-1 text-green-brand font-bold text-sm hover:gap-2 transition-all">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingAppointments.map((apt, index) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border p-6 rounded-[32px] hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-black text-foreground">{apt.patient}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{apt.animal}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest ${
                    apt.type === 'Online' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {apt.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-green-brand" />
                  {apt.time}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-card border border-border rounded-[32px]">
            <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground font-bold">No upcoming consultations scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
