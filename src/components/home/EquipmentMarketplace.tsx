"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Zap, Star, Tractor, Layout, Droplets, Leaf, Box } from "lucide-react";
import SectionBackground from "./SectionBackground";

export default function EquipmentMarketplace() {
  const [activeEq, setActiveEq] = useState(0);

  const equipment = [
    { emoji: "🚜", icon: Tractor, name: "Power Tiller (18 HP)", location: "Rajshahi, Dhaka, Khulna", price: "৳800", tags: ["Plowing", "Cultivation", "Versatile"], avail: "24/7 Support", rating: "4.8", meta: "Rajshahi · 47 listings" },
    { emoji: "🌾", icon: Layout, name: "Combine Harvester", location: "All Divisions", price: "৳3,500", tags: ["Harvesting", "Threshing", "Fast"], avail: "Seasonal Peak", rating: "4.9", meta: "All Divisions · 23 listings" },
    { emoji: "💧", icon: Droplets, name: "Irrigation Pump (5 HP)", location: "Sylhet, Chittagong", price: "৳450", tags: ["Irrigation", "Drainage", "Portable"], avail: "Available now", rating: "4.7", meta: "Sylhet · 89 listings" },
    { emoji: "🌱", icon: Leaf, name: "Rice Transplanter", location: "Mymensingh, Rangpur", price: "৳1,200", tags: ["Planting", "Precision", "Efficient"], avail: "Pre-booking open", rating: "4.6", meta: "Mymensingh · 18 listings" },
    { emoji: "📦", icon: Box, name: "Pesticide Sprayer", location: "Nationwide", price: "৳300", tags: ["Spraying", "Drone Option", "Chemical-safe"], avail: "Wide coverage", rating: "4.5", meta: "Nationwide · 134 listings" },
  ];

  return (
    <section className="py-[100px] px-[5%] relative overflow-hidden" id="equipment">
      <SectionBackground />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2px] uppercase text-green-brand dark:text-green-light mb-4 before:content-[''] before:block before:w-6 before:h-0.5 before:bg-green-brand dark:before:bg-green-light before:rounded-sm">Equipment Marketplace</div>
        <h2 className="font-serif text-[clamp(36px,4vw,54px)] font-extrabold leading-tight tracking-[-1.5px] text-green-deep dark:text-white mb-[18px]">Rent What You Need,<br /><em className="italic text-green-brand dark:text-green-bright not-italic">When You Need It</em></h2>
        <p className="text-[16px] leading-relaxed text-text-muted max-w-[560px]">Browse hundreds of equipment listings across Bangladesh. Filter by location, type, and availability.</p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[60px] items-center mt-14">
          <div className="flex flex-col gap-4">
            {equipment.map((item, i) => (
              <div 
                className={`flex items-center gap-4 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-black/6 dark:border-white/10 rounded-[18px] p-4 cursor-pointer transition-all duration-250 hover:border-green-brand hover:shadow-lg ${activeEq === i ? "border-green-brand bg-green-pale dark:bg-green-brand/20 shadow-md" : ""}`} 
                key={item.name}
                onClick={() => setActiveEq(i)}
              >
                <div className="text-[28px] shrink-0">{item.emoji}</div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-green-deep dark:text-white">{item.name}</div>
                  <div className="text-[12px] text-text-muted mt-1">{item.meta}</div>
                </div>
                <div className="text-[14px] font-semibold text-green-brand dark:text-green-bright whitespace-nowrap">{item.price}/day</div>
              </div>
            ))}
          </div>
          
          <div className="bg-white/80 dark:bg-card-bg backdrop-blur-md rounded-[24px] p-8 border border-black/6 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <div className="w-full h-[220px] bg-green-pale dark:bg-green-deep/40 rounded-2xl mb-6 flex items-center justify-center text-[80px]">{equipment[activeEq].emoji}</div>
            <div className="font-serif text-[28px] font-bold text-green-deep dark:text-white mb-2">{equipment[activeEq].name}</div>
            <div className="text-[13px] text-text-muted flex items-center gap-1.5 mb-4">
              <MapPin size={14} className="text-green-brand" /> {equipment[activeEq].location}
            </div>
            <div className="flex gap-2 flex-wrap mb-6">
              {equipment[activeEq].tags.map(tag => (
                <span key={tag} className="text-[11px] font-semibold px-3.5 py-1.5 rounded-full bg-green-pale dark:bg-green-brand/20 text-green-mid dark:text-green-brand tracking-[0.3px] uppercase">{tag}</span>
              ))}
            </div>
            <div className="text-[13px] text-text-muted mb-8 flex items-center gap-4">
              <span className="flex items-center gap-1"><Zap size={14} className="text-green-brand" /> {equipment[activeEq].avail}</span>
              <span className="flex items-center gap-1"><Star size={14} className="text-[#f5a623] fill-[#f5a623]" /> {equipment[activeEq].rating} rating</span>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-black/6 dark:border-white/10">
              <div>
                <div className="font-serif text-[32px] font-bold text-green-deep dark:text-green-bright">{equipment[activeEq].price}</div>
                <div className="text-[13px] text-text-muted">per day, all-inclusive</div>
              </div>
              <Link href={`/products/eq-${activeEq}`} className="inline-flex items-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white bg-green-brand rounded-full hover:bg-green-mid hover:-translate-y-0.5 transition-all shadow-lg shadow-green-brand/20">Book Now →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
