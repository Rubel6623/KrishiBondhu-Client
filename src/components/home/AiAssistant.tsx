import { Leaf, Calendar, Quote } from "lucide-react";
import SectionBackground from "./SectionBackground";
import { AIFarmingAdvisor } from "@/components/AI_Features/KrishiBondhuChat";

export default function AiAssistant() {
  const features = [
    { icon: <Leaf />, title: "Crop Disease Detection", desc: "Upload a photo of your crop and get instant diagnosis with treatment recommendations in Bangla or English." },
    { icon: <Calendar />, title: "Smart Seasonal Planning", desc: "AI recommends optimal sowing and harvesting windows based on your location, soil type, and weather forecasts." },
    { icon: <Quote />, title: "Cost & Yield Analytics", desc: "Track per-acre costs, predict yield, and get smart recommendations to maximize your seasonal profit margin." },
  ];

  return (
    <section className="py-[100px] px-[5%] relative overflow-hidden" id="ai">
      <SectionBackground />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[60px] items-center mt-14">
          <div className="animate-in fade-in slide-in-from-left duration-1000">
             <AIFarmingAdvisor />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2px] uppercase text-green-brand dark:text-green-light mb-4 before:content-[''] before:block before:w-6 before:h-0.5 before:bg-green-brand dark:before:bg-green-light before:rounded-sm">AI-Powered Features</div>
            <h2 className="font-serif text-[clamp(36px,4vw,54px)] font-extrabold leading-tight tracking-[-1.5px] text-green-deep dark:text-white mb-[18px]">Your Smartest<br /><em className="italic text-green-brand dark:text-green-bright not-italic">Farming Partner</em></h2>
            <p className="text-[16px] leading-relaxed text-text-muted max-w-[560px] mb-10">KrishiAI understands Bangladeshi agriculture — local crops, local climate, local challenges.</p>
            <div className="flex flex-col gap-6">
              {features.map((feat, i) => (
                <div className="flex gap-5 p-5 bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/10 rounded-2xl hover:border-green-brand hover:shadow-md transition-all group" key={feat.title}>
                  <div className="w-14 h-14 rounded-2xl bg-green-pale dark:bg-green-brand/20 flex items-center justify-center text-[24px] text-green-brand shrink-0 group-hover:bg-green-brand group-hover:text-white transition-colors">{feat.icon}</div>
                  <div>
                    <div className="text-[16px] font-bold text-green-deep dark:text-white mb-1">{feat.title}</div>
                    <div className="text-[13px] leading-relaxed text-text-muted">{feat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
