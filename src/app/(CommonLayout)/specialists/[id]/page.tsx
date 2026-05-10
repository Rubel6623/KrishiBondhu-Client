import { getSpecialistById } from "@/services/specialist";
import { 
  Stethoscope, 
  MapPin, 
  Star, 
  Award,
  Clock,
  ShieldCheck,
  CalendarDays,
  GraduationCap,
  Mail,
  Phone,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import BookAppointmentButton from "@/components/specialists/BookAppointmentButton";

export default async function SpecialistDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await getSpecialistById(id);
  
  if (!response?.success || !response?.data) {
    notFound();
  }

  const specialist = response.data;
  const user = specialist.user;

  return (
    <main className="min-h-screen pt-[120px] pb-20 relative overflow-hidden bg-slate-50 dark:bg-zinc-950">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      
      {/* Top Decor */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-green-brand/20 via-green-brand/5 to-transparent z-0" />
      
      <div className="max-w-[1000px] mx-auto px-[5%] relative z-10">
        
        {/* Back Button */}
        <Link href="/specialists" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-green-brand transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Specialists
        </Link>

        {/* Profile Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-[40px] md:rounded-[64px] border border-border shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="p-8 md:p-16 pb-0 md:pb-0 flex flex-col md:flex-row gap-8 items-start md:items-end border-b border-border mb-12">
            <div className="relative group shrink-0">
               <div className="w-32 h-32 md:w-48 md:h-48 rounded-[32px] md:rounded-[48px] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400"} 
                    alt={user?.name} 
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-green-brand border-[6px] border-white dark:border-zinc-900 z-20 flex items-center justify-center text-white shadow-lg">
                 <ShieldCheck size={20} />
               </div>
            </div>
            
            <div className="flex-1 pb-4 md:pb-8">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-green-brand/10 text-green-brand hover:bg-green-brand/20 border-none px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors">
                  {specialist.specialization || "Veterinary Expert"}
                </Badge>
                {user?.isVerified && (
                  <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-1">
                    <ShieldCheck size={14} /> Verified User
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-black text-foreground mb-4">
                Dr. {user?.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-green-brand" /> {user?.location || "Bangladesh"}</span>
                <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-border" />
                <span className="flex items-center gap-1.5 text-amber-500"><Star size={16} fill="currentColor" /> 4.9 (120+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-8 md:p-16 pt-0 md:pt-0 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
            
            {/* Left Column: Details */}
            <div className="space-y-12">
              <section>
                <h3 className="text-xl font-serif font-black mb-4 flex items-center gap-2">
                  <Stethoscope className="text-green-brand" /> About Specialist
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base">
                  {specialist.bio || `Dr. ${user?.name} is a highly dedicated agricultural and veterinary specialist with extensive experience in livestock health and crop diagnostics. Committed to providing farmers with actionable insights and effective treatments.`}
                </p>
              </section>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-950 border border-border">
                  <div className="w-10 h-10 rounded-full bg-green-brand/10 flex items-center justify-center text-green-brand mb-4">
                    <Award size={20} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Qualifications</p>
                  <p className="font-bold">{specialist.qualifications || "DVM Degree"}</p>
                </div>
                
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-950 border border-border">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                    <Clock size={20} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Experience</p>
                  <p className="font-bold">{specialist.experienceYears || "5+"} Years</p>
                </div>
              </div>

              <section>
                <h3 className="text-xl font-serif font-black mb-4 flex items-center gap-2">
                  <GraduationCap className="text-green-brand" /> Credentials
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-brand mt-2" />
                    <div>
                      <p className="font-bold">Registered Practitioner</p>
                      <p className="text-sm text-muted-foreground">Registration No: {specialist.registrationNo || "Pending Approval"}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-brand mt-2" />
                    <div>
                      <p className="font-bold">Educational Background</p>
                      <p className="text-sm text-muted-foreground">Certified Veterinary Diagnostics & Crop Sciences</p>
                    </div>
                  </li>
                </ul>
              </section>
            </div>

            {/* Right Column: Booking Card */}
            <div>
              <div className="sticky top-32 p-8 rounded-[40px] bg-slate-50 dark:bg-zinc-950 border border-border shadow-lg">
                <h3 className="text-lg font-serif font-black mb-6 border-b border-border pb-4">Consultation Info</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-muted-foreground">Consultation Fee</p>
                    <p className="text-2xl font-black text-green-brand">৳{specialist.consultationFee || 500}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-muted-foreground shadow-sm">
                        <Mail size={14} />
                      </div>
                      {user?.email}
                    </div>
                    {user?.phone && (
                      <div className="flex items-center gap-3 text-sm font-medium">
                        <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-muted-foreground shadow-sm">
                          <Phone size={14} />
                        </div>
                        {user?.phone}
                      </div>
                    )}
                  </div>
                </div>

                <BookAppointmentButton specialistId={specialist.id} />
                <p className="text-center text-[10px] font-bold text-muted-foreground mt-4 uppercase tracking-widest">
                  Secure & Instant Booking
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
