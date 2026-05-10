import { 
  Stethoscope, 
  Search, 
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import SectionBackground from "@/components/home/SectionBackground";
import type { Metadata } from "next";
import { Suspense } from "react";
import SpecialistGrid, { SpecialistSkeleton } from "@/components/specialists/SpecialistGrid";

export const metadata: Metadata = { 
  title: "Agricultural Specialists — KrishiBondhu",
  description: "Connect with certified veterinarians and agricultural experts for your livestock and crops."
};

export default function SpecialistsPage() {
  return (
    <main className="min-h-screen pt-[120px] pb-20 relative overflow-hidden">
      <SectionBackground />
      
      {/* Hero Header */}
      <section className="px-[5%] mb-16 relative z-10">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-brand/10 border border-green-brand/20 text-green-brand text-[12px] font-bold uppercase tracking-wider mb-6">
            <Stethoscope size={16} /> Certified Specialists
          </div>
          <h1 className="font-serif text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.1] text-green-deep dark:text-white mb-6">
            Expert Care for Your <em className="italic text-green-brand dark:text-green-bright not-italic underline decoration-green-brand/30 decoration-8 underline-offset-8">Livestock</em>
          </h1>
          <p className="text-[17px] leading-relaxed text-text-muted max-w-[700px] mx-auto">
            Connect with top-tier veterinarians and crop specialists across Bangladesh. 
            Get remote consultations, diagnostics, and prescriptions from certified experts.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-[5%] mb-16 relative z-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by specialization, name, or location..."
              className="w-full pl-16 pr-6 py-5 rounded-[32px] bg-white dark:bg-zinc-950 border border-border focus:ring-2 focus:ring-green-brand/20 outline-none transition-all font-medium shadow-sm"
            />
          </div>
          <button className="h-[64px] rounded-[32px] bg-zinc-950 text-white font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl">
            Filter Specialists
          </button>
        </div>
      </section>

      {/* Specialists Grid - Streaming via Suspense */}
      <section className="px-[5%] relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <Suspense fallback={<SpecialistSkeleton />}>
            <SpecialistGrid />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] mt-32 relative z-10">
        <div className="max-w-[1280px] mx-auto bg-green-brand rounded-[64px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-green-brand/20">
           <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -ml-48 -mt-48" />
           <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif font-black text-white mb-8 leading-tight">
                Are you a certified <br /><em className="text-green-bright">Veterinarian?</em>
              </h2>
              <p className="text-white/80 text-xl max-w-[700px] mx-auto mb-12 font-medium">
                Join our platform to reach thousands of farmers and provide digital consultations across the nation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Link href="/register" className="h-16 px-12 rounded-2xl bg-white text-green-brand font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl flex items-center justify-center">
                   Register as Specialist
                 </Link>
                 <Link href="/about" className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:underline">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}

