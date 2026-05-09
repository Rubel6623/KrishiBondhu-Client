import SectionBackground from "./SectionBackground";

export default function Stats() {
  const stats = [
    { num: "10K+", label: "Farmers Empowered" },
    { num: "2.5K", label: "Equipment Listed" },
    { num: "৳4Cr", label: "Saved in Equipment Costs" },
    { num: "64", label: "Districts Covered" },
  ];

  return (
    <section className="relative overflow-hidden p-0">
      <SectionBackground />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-black/5 dark:bg-white/10 relative z-10">
        {stats.map((item, i) => (
          <div className="p-14 bg-green-brand/90 dark:bg-green-brand/80 backdrop-blur-md text-center reveal" key={i}>
            <span className="font-serif text-[56px] font-black leading-none text-white tracking-[-2px] block">{item.num}</span>
            <div className="text-[14px] text-white/70 mt-2 font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
