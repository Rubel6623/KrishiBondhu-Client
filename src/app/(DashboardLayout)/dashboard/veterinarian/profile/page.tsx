"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Stethoscope, 
  GraduationCap, 
  Award, 
  DollarSign, 
  FileText,
  Save,
  CheckCircle2,
  Camera,
  Loader2
} from "lucide-react";
import { getUser } from "@/services/auth";

export default function VeterinarianProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">Fetching profile details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
          Expert <em className="italic text-green-brand not-italic">Profile</em>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 font-medium">Manage your professional credentials and consultation settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Avatar & Basic Stats */}
        <div className="space-y-8">
           <div className="bg-card border border-border p-10 rounded-[40px] text-center shadow-sm">
              <div className="relative inline-block mb-6">
                 <div className="w-32 h-32 rounded-[40px] bg-green-brand/10 border-4 border-green-brand/20 flex items-center justify-center text-4xl font-black text-green-brand overflow-hidden shadow-inner">
                    {user?.name?.charAt(0)}
                 </div>
                 <button className="absolute bottom-0 right-0 p-3 bg-foreground text-background rounded-2xl shadow-xl hover:scale-110 transition-transform">
                    <Camera size={18} />
                 </button>
              </div>
              <h3 className="text-2xl font-serif font-black text-foreground">{user?.name}</h3>
              <p className="text-green-brand font-black uppercase tracking-widest text-[10px] mt-1">Verified Specialist</p>
              
              <div className="grid grid-cols-2 gap-4 mt-10">
                 <div className="p-4 rounded-3xl bg-muted/50 border border-border">
                    <p className="text-xl font-black text-foreground">142</p>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Consultations</p>
                 </div>
                 <div className="p-4 rounded-3xl bg-muted/50 border border-border">
                    <p className="text-xl font-black text-foreground">4.9</p>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Avg. Rating</p>
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[40px] bg-green-deep text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-brand/20 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <h4 className="font-serif font-black text-xl mb-4 relative z-10">Trust Badge</h4>
              <p className="text-xs text-white/70 leading-relaxed mb-6 relative z-10">
                Your profile is verified and trusted by over 500+ local farmers across the country.
              </p>
              <div className="flex items-center gap-2 text-green-brand bg-white/10 px-4 py-2 rounded-xl w-fit relative z-10">
                 <CheckCircle2 size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Top Rated Expert</span>
              </div>
           </div>
        </div>

        {/* Right Column: Profile Form */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-card border border-border p-10 rounded-[40px] shadow-sm space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Specialization</label>
                    <div className="relative group">
                       <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                       <input 
                         type="text" 
                         className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                         defaultValue="Livestock & Poultry Specialist"
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Consultation Fee (৳)</label>
                    <div className="relative group">
                       <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                       <input 
                         type="number" 
                         className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                         defaultValue="500"
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Academic Qualifications</label>
                    <div className="relative group">
                       <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                       <input 
                         type="text" 
                         className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                         defaultValue="DVM, MS (Pathology), BAU"
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Registration Number</label>
                    <div className="relative group">
                       <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                       <input 
                         type="text" 
                         className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                         defaultValue="VET-REG-2024-883"
                       />
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Professional Biography</label>
                 <textarea 
                    rows={6}
                    className="w-full p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium resize-none leading-relaxed"
                    defaultValue="With over 10 years of experience in veterinary medicine, I specialize in the diagnosis and treatment of large animals and poultry. My goal is to ensure the health and productivity of local farms through evidence-based practice and modern consultation methods."
                 />
              </div>

              <div className="flex justify-end pt-4">
                 <button 
                   onClick={() => setIsSaving(true)}
                   className="px-10 py-4 bg-green-brand text-white rounded-full font-black text-sm hover:bg-green-mid transition-all shadow-xl shadow-green-brand/20 flex items-center gap-3"
                 >
                   {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                   Save Professional Profile
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
