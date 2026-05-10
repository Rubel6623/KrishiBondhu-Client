"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  History, 
  Search, 
  Download, 
  ExternalLink,
  ChevronRight,
  User,
  Clock,
  Calendar,
  FileText,
  Loader2,
  X
} from "lucide-react";
import { getMyAppointments } from "@/services/appointments";
import { toast } from "sonner";

export default function ConsultationHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getMyAppointments();
        if (res.success) {
          // Filter completed appointments for history
          const completed = (res.data || []).filter((apt: any) => apt.status === "COMPLETED");
          setConsultations(completed);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        toast.error("Failed to load consultation history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredConsultations = consultations.filter(c => {
    const farmerName = c.farmer?.name || "";
    const problemDesc = c.problemDesc || "";
    return farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           problemDesc.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDownload = (consultation: any) => {
    const reportContent = `
CONSULTATION REPORT
=====================
Date: ${new Date(consultation.appointmentDate).toLocaleDateString()}
Patient: ${consultation.farmer?.name}
Case: Consultation
Description: ${consultation.problemDesc}
Fee: ৳${consultation.specialist?.consultationFee || 500}
    `.trim();

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(reportContent));
    element.setAttribute("download", `report-${consultation.id}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Report downloaded successfully");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">Loading Consultation History...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            Consultation <em>History</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">Review your past patient cases and medical reports.</p>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search history..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-green-brand transition-all text-sm font-medium shadow-sm"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-white/5 border-b border-border">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Patient & Case ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Animal</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Diagnosis Snippet</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Fee</th>
                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((history) => (
                  <tr key={history.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-green-brand/10 text-green-brand flex items-center justify-center font-black">
                            {history.farmer?.name?.charAt(0)}
                         </div>
                         <div>
                            <p className="font-bold text-foreground">{history.farmer?.name}</p>
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">#KB-CS-{history.id.slice(0, 8)}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-medium text-foreground">Consultation</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                         <Calendar size={14} className="text-green-brand" />
                         {new Date(history.appointmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-8 py-6 max-w-xs">
                      <p className="text-xs text-muted-foreground italic line-clamp-1">"{history.problemDesc || 'No problem description provided'}"</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-foreground">৳{history.specialist?.consultationFee || 500}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                         <button 
                           onClick={() => setSelectedReport(history)}
                           className="p-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-green-brand hover:text-white transition-all" 
                           title="View Report"
                         >
                            <FileText size={16} />
                         </button>
                         <button 
                           onClick={() => handleDownload(history)}
                           className="p-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-all" 
                           title="Download Summary"
                         >
                            <Download size={16} />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <History className="w-10 h-10 text-muted-foreground/30" />
                      <p className="text-muted-foreground font-bold">No consultation history found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedReport(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-[32px] max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-black text-foreground">Consultation Report</h2>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-2 rounded-xl hover:bg-muted transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-2">Patient Name</p>
                  <p className="font-black text-foreground text-lg">{selectedReport.farmer?.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-2">Type</p>
                  <p className="font-black text-foreground text-lg">Consultation</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-2">Consultation Date</p>
                  <p className="font-black text-foreground text-lg">{new Date(selectedReport.appointmentDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-2">Consultation Fee</p>
                  <p className="font-black text-foreground text-lg">৳{selectedReport.specialist?.consultationFee || 500}</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-muted/50 border border-border">
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-3">Problem Description</p>
                <p className="text-sm text-foreground leading-relaxed">{selectedReport.problemDesc || 'No problem description recorded'}</p>
              </div>

              <div className="p-6 rounded-3xl bg-green-brand/5 border border-green-brand/20">
                <p className="text-[10px] text-green-brand font-black uppercase tracking-widest mb-3">Recommendations</p>
                <p className="text-sm text-foreground leading-relaxed">{selectedReport.recommendations || 'Follow-up as needed. Contact for any concerns.'}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => handleDownload(selectedReport)}
                  className="flex-1 px-6 py-3 bg-green-brand text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-green-mid transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="flex-1 px-6 py-3 bg-card border border-border text-foreground rounded-2xl font-black text-sm hover:bg-muted transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
