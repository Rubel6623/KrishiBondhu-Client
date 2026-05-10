"use client";

import { useState, useEffect, useRef } from "react";
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
  Loader2,
  Briefcase
} from "lucide-react";
import { getUser } from "@/services/auth";
import { getMySpecialistProfile, upsertSpecialistProfile } from "@/services/specialist";
import { toast } from "sonner";

export default function VeterinarianProfile() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    specialization: "",
    consultationFee: "",
    qualifications: "",
    registrationNo: "",
    experienceYears: "",
    bio: ""
  });

  useEffect(() => {
    const initData = async () => {
      const userData = await getUser();
      setUser(userData);
      
      const profileData = await getMySpecialistProfile();
      if (profileData.success && profileData.data) {
        setProfile(profileData.data);
        setFormData({
          specialization: profileData.data.specialization || "",
          consultationFee: profileData.data.consultationFee?.toString() || "",
          qualifications: profileData.data.qualifications || "",
          registrationNo: profileData.data.registrationNo || "",
          experienceYears: profileData.data.experienceYears?.toString() || "",
          bio: profileData.data.bio || ""
        });
      }
      setLoading(false);
    };
    initData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (data.success) {
        setUser({ ...user, avatar: data.data.url });
        toast.success("Profile picture updated successfully!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    const previousProfile = profile;
    const payload = {
      ...formData,
      consultationFee: parseFloat(formData.consultationFee) || 0,
      experienceYears: parseInt(formData.experienceYears) || 0
    };

    // Optimistic Update
    setProfile({ ...profile, ...payload });
    setIsSaving(true);
    
    try {
      const res = await upsertSpecialistProfile(payload);
      if (res.success) {
        toast.success("Professional profile updated successfully!");
        setProfile(res.data);
      } else {
        // Revert on failure
        setProfile(previousProfile);
        toast.error(res.message || "Failed to update profile");
      }
    } catch (error) {
      setProfile(previousProfile);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">Fetching professional credentials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            Professional <em>Identity</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">Complete your specialist profile to start receiving consultations.</p>
        </div>
        {!profile && (
          <div className="px-6 py-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
             <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500">Profile Incomplete</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-8">
           <div className="bg-card border border-border p-10 rounded-[40px] text-center shadow-sm">
              <div className="relative inline-block mb-6">
                 <div className="w-32 h-32 rounded-[40px] bg-green-brand/10 border-4 border-green-brand/20 flex items-center justify-center text-4xl font-black text-green-brand overflow-hidden shadow-inner">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : user?.name?.charAt(0)}
                 </div>
                 <input 
                   ref={fileInputRef}
                   type="file"
                   accept="image/*"
                   onChange={handleImageUpload}
                   className="hidden"
                   id="avatar-upload"
                 />
                 <button 
                   onClick={() => document.getElementById('avatar-upload')?.click()}
                   disabled={uploadingImage}
                   className="absolute bottom-0 right-0 p-3 bg-foreground text-background rounded-2xl shadow-xl hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {uploadingImage ? <Loader2 className="animate-spin" size={18} /> : <Camera size={18} />}
                 </button>
              </div>
              <h3 className="text-2xl font-serif font-black text-foreground">{user?.name}</h3>
              <p className="text-green-brand font-black uppercase tracking-widest text-[10px] mt-1">Certified Veterinarian</p>
              
              <div className="grid grid-cols-2 gap-4 mt-10">
                 <div className="p-4 rounded-3xl bg-muted/50 border border-border">
                    <p className="text-xl font-black text-foreground">{profile?.consultationsCount || 0}</p>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Consultations</p>
                 </div>
                 <div className="p-4 rounded-3xl bg-muted/50 border border-border">
                    <p className="text-xl font-black text-foreground">{profile?.rating || 5.0}</p>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Avg. Rating</p>
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[40px] bg-green-deep text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-brand/20 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <h4 className="font-serif font-black text-xl mb-4 relative z-10">Expert Status</h4>
              <p className="text-xs text-white/70 leading-relaxed mb-6 relative z-10">
                Your profile must be complete to appear in the public specialists directory.
              </p>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl w-fit relative z-10 ${profile ? "text-green-brand bg-white/10" : "text-amber-500 bg-white/5"}`}>
                 {profile ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />}
                 <span className="text-[10px] font-black uppercase tracking-widest">
                   {profile ? "Active Directory" : "Pending Completion"}
                 </span>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <div className="bg-card border border-border p-10 rounded-[40px] shadow-sm space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Specialization</label>
                    <div className="relative group">
                       <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                       <input 
                         type="text" 
                         value={formData.specialization}
                         onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                         className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                         placeholder="e.g. Livestock & Poultry Specialist"
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Consultation Fee (৳)</label>
                    <div className="relative group">
                       <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                       <input 
                         type="number" 
                         value={formData.consultationFee}
                         onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
                         className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                         placeholder="500"
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Academic Qualifications</label>
                    <div className="relative group">
                       <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                       <input 
                         type="text" 
                         value={formData.qualifications}
                         onChange={(e) => setFormData({...formData, qualifications: e.target.value})}
                         className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                         placeholder="e.g. DVM, MS (Pathology)"
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Registration Number</label>
                    <div className="relative group">
                       <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                       <input 
                         type="text" 
                         value={formData.registrationNo}
                         onChange={(e) => setFormData({...formData, registrationNo: e.target.value})}
                         className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                         placeholder="VET-REG-XXXX"
                       />
                    </div>
                 </div>

                 <div className="space-y-3 md:col-span-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Years of Experience</label>
                    <div className="relative group">
                       <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                       <input 
                         type="number" 
                         value={formData.experienceYears}
                         onChange={(e) => setFormData({...formData, experienceYears: e.target.value})}
                         className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                         placeholder="5"
                       />
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Professional Biography</label>
                 <textarea 
                    rows={6}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium resize-none leading-relaxed"
                    placeholder="Tell farmers about your expertise and how you can help them..."
                 />
              </div>

              <div className="flex justify-end pt-4">
                 <button 
                   onClick={handleSave}
                   disabled={isSaving}
                   className="px-10 py-4 bg-green-brand text-white rounded-full font-black text-sm hover:bg-green-mid transition-all shadow-xl shadow-green-brand/20 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                   {profile ? "Update Expert Profile" : "Create Specialist Profile"}
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
