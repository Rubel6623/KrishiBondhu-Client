import Link from "next/link";
import { ArrowRight, Tractor, CheckCircle2 } from "lucide-react";
import SectionBackground from "./SectionBackground";

export default function CtaBanner() {
  return (
    <section className="py-[100px] px-[5%] relative overflow-hidden">
      <SectionBackground />
      
      {/* Modern Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15] text-green-deep dark:text-white" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='currentColor' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-green-brand/10 dark:bg-green-bright/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-gold/10 rounded-full blur-[80px]" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row justify-between items-center gap-12 shadow-2xl shadow-black/5 dark:shadow-none">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-brand/10 dark:bg-green-bright/20 border border-green-brand/20 dark:border-green-bright/30 text-green-brand dark:text-green-bright text-xs font-bold uppercase tracking-wider">
              <Tractor size={14} /> Partnerships Open
            </div>
            
            <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-black leading-[1.1] tracking-[-1px] text-green-deep dark:text-white">
              Are You an Equipment<br />
              <em className="italic text-green-brand dark:text-green-bright not-italic">Provider?</em>
            </h2>
            
            <p className="text-[18px] text-text-mid dark:text-white/70 max-w-[540px] leading-relaxed font-medium">
              Join Bangladesh&apos;s fastest growing agricultural network. List your machinery, manage bookings effortlessly, and maximize your equipment&apos;s earning potential.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "Reach 10,000+ Farmers",
                "Secure Digital Payments",
                "Seasonal Priority Booking",
                "Verified Provider Badge"
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-text-mid dark:text-white/80 text-sm font-bold">
                  <CheckCircle2 size={16} className="text-green-brand dark:text-green-bright" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full sm:w-auto shrink-0">
            <Link 
              href="/register?role=provider" 
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 text-[16px] font-bold text-white bg-green-brand dark:bg-green-bright dark:text-green-deep rounded-2xl hover:bg-green-deep dark:hover:bg-white hover:-translate-y-1 transition-all shadow-xl shadow-green-brand/20 dark:shadow-green-bright/10"
            >
              List Equipment Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/providers" 
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-[16px] font-bold text-green-deep dark:text-white bg-white/40 dark:bg-white/10 border border-green-brand/10 dark:border-white/20 rounded-2xl backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/20 transition-all"
            >
              How it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
