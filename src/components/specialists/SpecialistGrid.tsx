import { getAllSpecialists } from "@/services/specialist";
import { 
  Stethoscope, 
  MapPin, 
  Star, 
  Award,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BookAppointmentButton from "./BookAppointmentButton";

export default async function SpecialistGrid() {
  const { data: specialists = [] } = await getAllSpecialists();

  if (specialists.length === 0) {
    return (
      <div className="py-40 text-center bg-white dark:bg-zinc-950 rounded-[64px] border border-border shadow-xl">
        <div className="w-24 h-24 rounded-full bg-green-pale flex items-center justify-center text-green-brand mx-auto mb-8">
          <Stethoscope size={48} />
        </div>
        <h3 className="text-3xl font-serif font-black text-foreground mb-4">No Specialists Found</h3>
        <p className="text-muted-foreground max-w-[400px] mx-auto font-medium">
          We are currently onboarding certified veterinarians and agricultural experts. Check back soon!
        </p>
        <Link href="/register-specialist">
          <button className="mt-8 px-10 py-4 bg-zinc-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl">
            Become a Specialist
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {specialists.map((specialist: any) => (
        <div 
          key={specialist.id}
          className="group bg-white dark:bg-zinc-950 rounded-[40px] border border-border overflow-hidden shadow-sm hover:shadow-2xl transition-all relative flex flex-col"
        >
          <div className="absolute top-6 right-6 z-20">
            <Badge className="bg-green-brand text-white border-none px-3 py-1 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck size={12} /> Verified Expert
            </Badge>
          </div>

          <div className="p-8 pb-0">
             <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                   <div className="w-20 h-20 rounded-[24px] overflow-hidden border-2 border-green-brand/20">
                      <img 
                        src={specialist.user?.avatar || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400"} 
                        alt={specialist.user?.name} 
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-brand border-4 border-white dark:border-zinc-950" />
                </div>
                <div>
                   <h3 className="text-xl font-serif font-black text-foreground group-hover:text-green-brand transition-colors">
                      Dr. {specialist.user?.name}
                   </h3>
                   <p className="text-[11px] font-bold text-green-brand uppercase tracking-widest mt-1">
                      {specialist.specialization || "Veterinary Generalist"}
                   </p>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                   <Award className="w-4 h-4 text-green-brand" />
                   {specialist.qualifications || "DVM Degree"}
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                   <Clock className="w-4 h-4 text-green-brand" />
                   {specialist.experienceYears || "5"}+ Years Professional Experience
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                   <MapPin className="w-4 h-4 text-green-brand" />
                   {specialist.user?.location || "Dhaka, Bangladesh"}
                </div>
             </div>
          </div>

          <div className="p-8 flex-1">
             <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {specialist.bio || "Dedicated agricultural specialist providing top-tier veterinary services and crop diagnostics to help farmers succeed."}
             </p>
          </div>

          <div className="p-8 pt-0 mt-auto">
             <div className="flex items-center justify-between py-6 border-t border-border mb-6">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Consultation Fee</p>
                   <p className="text-xl font-black text-foreground">৳{specialist.consultationFee || "500"}</p>
                </div>
                <div className="text-right">
                   <div className="flex items-center gap-1 justify-end text-amber-500 mb-1">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-black">4.9</span>
                   </div>
                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">120+ Reviews</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-3">
                <Link href={`/specialists/${specialist.id}`} className="flex-1">
                   <button className="w-full h-12 rounded-2xl bg-muted hover:bg-zinc-900 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                      View Profile
                   </button>
                </Link>
                <BookAppointmentButton 
                   specialistId={specialist.id} 
                   className="flex-1 h-12 rounded-2xl bg-green-brand text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-green-brand/20 hover:scale-105 transition-all" 
                />
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SpecialistSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white dark:bg-zinc-950 rounded-[40px] border border-border overflow-hidden h-[500px] animate-pulse">
          <div className="p-8 h-full flex flex-col">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-20 h-20 bg-muted rounded-[24px]" />
              <div className="space-y-3 flex-1">
                <div className="h-6 bg-muted rounded-full w-3/4" />
                <div className="h-4 bg-muted rounded-full w-1/2" />
              </div>
            </div>
            <div className="space-y-4 mb-10">
              <div className="h-4 bg-muted rounded-full w-2/3" />
              <div className="h-4 bg-muted rounded-full w-1/2" />
              <div className="h-4 bg-muted rounded-full w-3/4" />
            </div>
            <div className="h-20 bg-muted rounded-3xl mb-10" />
            <div className="mt-auto pt-6 border-t border-border flex justify-between">
              <div className="h-10 bg-muted rounded-2xl w-[100px]" />
              <div className="h-10 bg-muted rounded-2xl w-[120px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
