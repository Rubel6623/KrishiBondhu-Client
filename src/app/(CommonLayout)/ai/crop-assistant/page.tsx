import type { Metadata } from "next";
import { AIFarmingAdvisor } from "@/components/AI_Features/KrishiBondhuChat";

export const metadata: Metadata = { 
  title: "AI Crop Advisor — KrishiBondhu",
  description: "Get professional agricultural advice and equipment recommendations from KrishiBondhu AI."
};

export default function AICropAssistantPage() {
  return (
    <main className="min-h-screen bg-background pt-[var(--nav-h)] pb-20 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-green-brand/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 mt-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-brand/10 dark:bg-green-bright/15 border border-green-brand/20 dark:border-green-bright/30 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-brand dark:bg-green-bright animate-pulse" />
            <span className="text-xs font-bold text-green-deep dark:text-green-light uppercase tracking-wider">Expert AI Farming Guidance</span>
          </div>
          <h1 className="text-[clamp(32px,5vw,56px)] font-serif font-black leading-tight text-foreground mb-6">
            Your Personal <br />
            <span className="text-green-brand italic">Agricultural Specialist</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Describe your crop issues or equipment needs. Our professional AI advisor will analyze your situation and provide modern, actionable solutions for Bangladeshi farmers.
          </p>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <AIFarmingAdvisor />
        </div>
      </div>
    </main>
  );
}
