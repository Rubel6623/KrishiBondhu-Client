import SectionBackground from "./SectionBackground";

export default function MarqueeStrip() {
  return (
    <div className="relative py-4 overflow-hidden border-t border-white/5">
      <SectionBackground />
      <div className="relative z-10 flex gap-12 w-max animate-[marqueeSlide_25s_linear_infinite]">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-12">
            {["🚜 Power Tiller", "🌾 Combine Harvester", "💧 Irrigation System", "🌱 Seeder Machine", "🔬 Soil Testing", "🤖 AI Crop Advisor", "📦 Pesticide Sprayer", "🏗️ Thresher Machine"].map((item, idx) => (
              <div className="flex items-center gap-2.5 whitespace-nowrap text-green-deep/60 dark:text-white/60 text-[13px] font-bold tracking-wide" key={idx}>
                <span>{item}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-brand dark:bg-green-bright" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
