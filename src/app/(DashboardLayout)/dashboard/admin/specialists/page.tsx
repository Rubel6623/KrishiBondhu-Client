"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Search,
  Trash2,
  ShieldCheck,
  ShieldOff,
  Loader2,
  Star,
  MapPin,
  Phone,
  Mail,
  X,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Users,
  Award,
  GraduationCap,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { getAllSpecialists, deleteSpecialist, suspendSpecialistUser, activateSpecialistUser } from "@/services/specialists";

export default function AdminSpecialistsPage() {
  const [specialists, setSpecialists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVerified, setFilterVerified] = useState<"ALL" | "VERIFIED" | "UNVERIFIED">("ALL");
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchSpecialists = async () => {
    setLoading(true);
    try {
      const res = await getAllSpecialists();
      if (res.success) setSpecialists(res.data || []);
      else toast.error("Failed to load specialists");
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialists();
  }, []);

  const handleDelete = async (specialist: any) => {
    setActionLoading(specialist.id);
    try {
      const res = await deleteSpecialist(specialist.id);
      if (res.success) {
        setSpecialists((prev) => prev.filter((s) => s.id !== specialist.id));
        toast.success(`${specialist.user?.name} has been removed from the platform.`);
        setConfirmDelete(null);
      } else {
        toast.error(res.message || "Failed to remove specialist");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (specialist: any) => {
    const isCurrentlyActive = specialist.user?.isVerified;
    setActionLoading(specialist.id + "_status");
    try {
      const res = isCurrentlyActive
        ? await suspendSpecialistUser(specialist.user?.id)
        : await activateSpecialistUser(specialist.user?.id);

      if (res.success) {
        setSpecialists((prev) =>
          prev.map((s) =>
            s.id === specialist.id
              ? { ...s, user: { ...s.user, isVerified: !isCurrentlyActive } }
              : s
          )
        );
        toast.success(
          isCurrentlyActive
            ? `${specialist.user?.name} has been suspended.`
            : `${specialist.user?.name} has been activated.`
        );
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = specialists.filter((s) => {
    const name = s.user?.name?.toLowerCase() || "";
    const email = s.user?.email?.toLowerCase() || "";
    const spec = s.specialization?.toLowerCase() || "";
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      spec.includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterVerified === "ALL" ||
      (filterVerified === "VERIFIED" && s.user?.isVerified) ||
      (filterVerified === "UNVERIFIED" && !s.user?.isVerified);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: specialists.length,
    verified: specialists.filter((s) => s.user?.isVerified).length,
    unverified: specialists.filter((s) => !s.user?.isVerified).length,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">
          Loading Specialists...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            Specialist <em className="text-green-brand not-italic">Management</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Monitor, verify, and manage all veterinary specialists on the platform.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-card border border-border px-6 py-3 rounded-2xl shadow-sm">
          <Stethoscope className="text-green-brand w-5 h-5" />
          <span className="font-black text-2xl text-foreground">{stats.total}</span>
          <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
            Total Specialists
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total", value: stats.total, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Verified", value: stats.verified, icon: CheckCircle2, color: "text-green-brand", bg: "bg-green-brand/10" },
          { label: "Unverified", value: stats.unverified, icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-[24px] p-6 flex items-center gap-4 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {(["ALL", "VERIFIED", "UNVERIFIED"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterVerified(f)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                filterVerified === f
                  ? "bg-green-brand text-white shadow-lg shadow-green-brand/20"
                  : "bg-card border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, email, specialization..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-green-brand transition-all text-sm font-medium shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Specialists Table */}
      <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 px-8 py-4 border-b border-border bg-muted/30">
          <p className="col-span-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Specialist</p>
          <p className="col-span-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Specialization</p>
          <p className="col-span-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Fee / Day</p>
          <p className="col-span-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</p>
          <p className="col-span-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Actions</p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {filtered.length > 0 ? (
            filtered.map((specialist, index) => (
              <motion.div
                key={specialist.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="grid grid-cols-1 md:grid-cols-12 px-8 py-5 items-center gap-4 hover:bg-muted/20 transition-colors group"
              >
                {/* Name + Avatar */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center font-black text-lg overflow-hidden flex-shrink-0">
                    {specialist.user?.avatar ? (
                      <img src={specialist.user.avatar} alt={specialist.user.name} className="w-full h-full object-cover" />
                    ) : (
                      specialist.user?.name?.charAt(0) || "V"
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground leading-tight">Dr. {specialist.user?.name}</p>
                    <p className="text-[11px] text-muted-foreground font-medium mt-0.5 flex items-center gap-1">
                      <Mail size={10} /> {specialist.user?.email}
                    </p>
                  </div>
                </div>

                {/* Specialization */}
                <div className="col-span-3">
                  <p className="text-sm font-bold text-foreground">
                    {specialist.specialization || <span className="text-muted-foreground italic font-medium">Not set</span>}
                  </p>
                  {specialist.experienceYears && (
                    <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                      {specialist.experienceYears} yrs experience
                    </p>
                  )}
                </div>

                {/* Fee */}
                <div className="col-span-2">
                  <p className="text-sm font-black text-foreground">
                    {specialist.consultationFee
                      ? `৳${specialist.consultationFee}`
                      : <span className="text-muted-foreground font-medium italic">N/A</span>}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      specialist.user?.isVerified
                        ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                        : "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
                    }`}
                  >
                    {specialist.user?.isVerified ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center gap-2 justify-end">
                  <button
                    onClick={() => setSelectedSpecialist(specialist)}
                    title="View Details"
                    className="p-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-blue-500 hover:text-white transition-all"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(specialist)}
                    disabled={actionLoading === specialist.id + "_status"}
                    title={specialist.user?.isVerified ? "Suspend" : "Activate"}
                    className={`p-2.5 rounded-xl transition-all disabled:opacity-50 ${
                      specialist.user?.isVerified
                        ? "bg-orange-100 text-orange-600 dark:bg-orange-500/20 hover:bg-orange-500 hover:text-white"
                        : "bg-green-100 text-green-600 dark:bg-green-500/20 hover:bg-green-brand hover:text-white"
                    }`}
                  >
                    {actionLoading === specialist.id + "_status" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : specialist.user?.isVerified ? (
                      <ShieldOff className="w-4 h-4" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(specialist)}
                    title="Remove Specialist"
                    className="p-2.5 rounded-xl bg-red-100 text-red-500 dark:bg-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-20 text-center flex flex-col items-center gap-6">
              <Stethoscope className="w-16 h-16 text-muted-foreground/20" />
              <p className="text-muted-foreground font-black uppercase tracking-widest text-xs max-w-xs">
                No specialists found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      <AnimatePresence>
        {selectedSpecialist && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              className="bg-card border border-border w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="relative h-24 bg-gradient-to-br from-green-brand/30 via-green-brand/10 to-transparent flex items-end px-8 pb-0">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setSelectedSpecialist(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-20 h-20 rounded-2xl bg-card border-2 border-green-brand/20 shadow-xl overflow-hidden flex items-center justify-center text-green-brand font-black text-2xl translate-y-8">
                  {selectedSpecialist.user?.avatar ? (
                    <img src={selectedSpecialist.user.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    selectedSpecialist.user?.name?.charAt(0) || "V"
                  )}
                </div>
              </div>

              <div className="px-8 pt-12 pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-serif font-black text-foreground">Dr. {selectedSpecialist.user?.name}</h2>
                    <p className="text-sm text-green-brand font-bold mt-0.5">
                      {selectedSpecialist.specialization || "Veterinary Specialist"}
                    </p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    selectedSpecialist.user?.isVerified
                      ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                      : "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
                  }`}>
                    {selectedSpecialist.user?.isVerified ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="px-8 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Mail, label: "Email", value: selectedSpecialist.user?.email },
                    { icon: Phone, label: "Phone", value: selectedSpecialist.user?.phone || "Not provided" },
                    { icon: MapPin, label: "Location", value: selectedSpecialist.user?.location || "Not provided" },
                    { icon: DollarSign, label: "Consultation Fee", value: selectedSpecialist.consultationFee ? `৳${selectedSpecialist.consultationFee}` : "Not set" },
                    { icon: Briefcase, label: "Experience", value: selectedSpecialist.experienceYears ? `${selectedSpecialist.experienceYears} years` : "Not set" },
                    { icon: Award, label: "Reg. Number", value: selectedSpecialist.registrationNo || "Not provided" },
                  ].map((item) => (
                    <div key={item.label} className="bg-muted/50 p-4 rounded-2xl">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-1">
                        <item.icon size={10} /> {item.label}
                      </p>
                      <p className="text-sm font-bold text-foreground truncate">{item.value}</p>
                    </div>
                  ))}
                </div>

                {selectedSpecialist.qualifications && (
                  <div className="bg-muted/50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1">
                      <GraduationCap size={10} /> Qualifications
                    </p>
                    <p className="text-sm font-medium text-foreground">{selectedSpecialist.qualifications}</p>
                  </div>
                )}

                {selectedSpecialist.bio && (
                  <div className="bg-muted/50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Bio</p>
                    <p className="text-sm font-medium text-foreground leading-relaxed italic">
                      "{selectedSpecialist.bio}"
                    </p>
                  </div>
                )}
              </div>

              <div className="px-8 pb-8 flex gap-3">
                <button
                  onClick={() => { handleToggleStatus(selectedSpecialist); setSelectedSpecialist(null); }}
                  className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    selectedSpecialist.user?.isVerified
                      ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white"
                      : "bg-green-brand/10 text-green-brand hover:bg-green-brand hover:text-white"
                  }`}
                >
                  {selectedSpecialist.user?.isVerified ? <><ShieldOff size={14}/> Suspend</> : <><ShieldCheck size={14}/> Activate</>}
                </button>
                <button
                  onClick={() => { setConfirmDelete(selectedSpecialist); setSelectedSpecialist(null); }}
                  className="flex-1 py-3 bg-red-500/10 text-red-500 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              className="bg-card border border-border w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-serif font-black text-foreground mb-2">Remove Specialist?</h3>
              <p className="text-sm text-muted-foreground font-medium mb-8 leading-relaxed">
                You are about to permanently remove{" "}
                <strong className="text-foreground">Dr. {confirmDelete.user?.name}</strong> from the platform.
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-3 bg-muted text-foreground rounded-xl font-black text-xs uppercase tracking-widest hover:bg-muted/80 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  disabled={actionLoading === confirmDelete.id}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {actionLoading === confirmDelete.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <><Trash2 size={14} /> Confirm Remove</>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
