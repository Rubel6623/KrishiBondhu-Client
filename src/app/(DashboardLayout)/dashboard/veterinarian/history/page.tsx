"use client";

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
  FileText
} from "lucide-react";

const consultationHistory = [
  { id: "101", patient: "Abul Hossain", animal: "Cattle (Jersey)", date: "May 05, 2026", status: "COMPLETED", diagnosis: "Mastitis - prescribed intramammary antibiotics.", fee: "৳500" },
  { id: "102", patient: "Kulsum Bibi", animal: "Goat", date: "May 04, 2026", status: "COMPLETED", diagnosis: "PPR vaccination and nutrition advice.", fee: "৳300" },
  { id: "103", patient: "Zakir Rahman", animal: "Poultry", date: "May 03, 2026", status: "COMPLETED", diagnosis: "Fowl Pox detected - isolate flock.", fee: "৳800" },
  { id: "104", patient: "Mofiz Uddin", animal: "Cattle", date: "May 01, 2026", status: "COMPLETED", diagnosis: "Foot and Mouth Disease (FMD) recovery check.", fee: "৳500" },
  { id: "105", patient: "Saleha Khanam", animal: "Duck", date: "Apr 28, 2026", status: "COMPLETED", diagnosis: "Duck Plague vaccination.", fee: "৳400" },
];

export default function ConsultationHistory() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            Consultation <em className="italic text-green-brand not-italic">History</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">Review your past patient cases and medical reports.</p>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search history..." 
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
              {consultationHistory.map((history, index) => (
                <tr key={history.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-green-brand/10 text-green-brand flex items-center justify-center font-black">
                          {history.patient.charAt(0)}
                       </div>
                       <div>
                          <p className="font-bold text-foreground">{history.patient}</p>
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">#KB-CS-{history.id}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-foreground">{history.animal}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                       <Calendar size={14} className="text-green-brand" />
                       {history.date}
                    </div>
                  </td>
                  <td className="px-8 py-6 max-w-xs">
                    <p className="text-xs text-muted-foreground italic line-clamp-1">"{history.diagnosis}"</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-foreground">{history.fee}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                       <button className="p-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-green-brand hover:text-white transition-all" title="View Report">
                          <FileText size={16} />
                       </button>
                       <button className="p-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-all" title="Download Summary">
                          <Download size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-center">
         <div className="flex gap-2">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${p === 1 ? 'bg-green-brand text-white shadow-lg shadow-green-brand/20' : 'bg-card border border-border text-muted-foreground hover:bg-muted'}`}>
                {p}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
}
