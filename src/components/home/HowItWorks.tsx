import { Layout, Search, Calendar, Leaf } from "lucide-react";
import SectionBackground from "./SectionBackground";

export default function HowItWorks() {
  const steps = [
    { num: "01", icon: <Layout />, title: "Create Account", desc: "Sign up as a Farmer or Equipment Provider. Verify your location and start exploring the marketplace." },
    { num: "02", icon: <Search />, title: "Find Equipment", desc: "Search by location, equipment type, or crop season. Compare prices and provider ratings easily." },
    { num: "03", icon: <Calendar />, title: "Book & Pay", desc: "Select your rental dates, confirm booking, and pay securely. Instant confirmation, zero hassle." },
    { num: "04", icon: <Leaf />, title: "Grow & Prosper", desc: "Equipment arrives at your farm. Use, return, review — and watch your yields improve season after season." },
  ];

  return (
    <section className="py-[100px] px-[5%] relative overflow-hidden" id="how">
      <SectionBackground />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2px] uppercase text-green-brand dark:text-green-light mb-4 before:content-[''] before:block before:w-6 before:h-0.5 before:bg-green-brand dark:before:bg-green-light before:rounded-sm">How It Works</div>
        <h2 className="font-serif text-[clamp(36px,4vw,54px)] font-extrabold leading-tight tracking-[-1.5px] text-green-deep dark:text-white mb-[18px]">From Field to Booking<br />in <em className="italic text-green-brand dark:text-green-bright not-italic">4 Simple Steps</em></h2>
        <p className="text-[16px] leading-relaxed text-text-muted max-w-[560px]">Get the equipment you need in minutes — no paperwork, no hidden fees, just seamless agricultural service.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 mt-14 relative rounded-3xl overflow-hidden group border border-black/5 dark:border-white/10">
          {steps.map((step, i) => (
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-sm p-9 relative transition-all duration-300 hover:bg-green-deep dark:hover:bg-green-brand group/step" key={step.num}>
              <div className="font-serif text-[48px] font-black leading-none text-green-pale/50 dark:text-green-bright/20 transition-colors group-hover/step:text-white/20">{step.num}</div>
              <div className="w-[52px] h-[52px] rounded-2xl bg-green-pale dark:bg-green-brand/30 flex items-center justify-center text-[24px] my-4 text-green-brand dark:text-green-bright transition-colors group-hover/step:bg-white/20 group-hover/step:text-white">{step.icon}</div>
              <div className="text-[18px] font-semibold text-green-deep dark:text-white mb-2.5 transition-colors group-hover/step:text-white">{step.title}</div>
              <div className="text-[14px] leading-relaxed text-text-muted transition-colors group-hover/step:text-white/60">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
