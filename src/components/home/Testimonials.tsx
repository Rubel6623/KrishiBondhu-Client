"use client";

import { useEffect, useState } from "react";
import { Star, MapPin, Loader2 } from "lucide-react";
import SectionBackground from "./SectionBackground";
import { getAllReviews } from "@/services/reviews";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackTestimonials = [
    { id: "fallback-1", stars: 5, text: "KrishiBondhu-তে পাওয়ার টিলার ভাড়া নিয়ে আমার জমি চাষে ৬০% খরচ বেঁচে গেছে। এখন আর ট্র্যাক্টরের জন্য মাসের পর মাস অপেক্ষা করতে হয় না।", avatar: "রহ", name: "রহিম উদ্দিন মোল্লা", loc: "Rajshahi, 4.2 acres farmer" },
    { id: "fallback-2", stars: 5, text: "The AI assistant diagnosed a fungal infection in my wheat crop early enough to save the entire yield. I would have lost ৳80,000 without it.", avatar: "MH", name: "Mohammad Hossain", loc: "Mymensingh, Wheat farmer" },
    { id: "fallback-3", stars: 4, text: "As an equipment provider, I've tripled my rental income through KrishiBondhu. The booking system is smooth and the farmer community is very trustworthy.", avatar: "KC", name: "Kamal Chowdhury", loc: "Sylhet, Equipment Provider" },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getAllReviews();
        if (res.success && res.data && res.data.length > 0) {
          const mapped = res.data.slice(0, 6).map((r: any) => ({
            id: r.id,
            stars: r.rating,
            text: r.comment,
            avatar: r.user?.name?.charAt(0) || "U",
            name: r.user?.name || "Anonymous User",
            loc: r.equipment?.title || "Platform User"
          }));
          setTestimonials(mapped);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
     return (
       <div className="py-20 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-green-brand" />
          <p className="text-muted-foreground font-bold animate-pulse text-xs uppercase tracking-widest">Loading Stories...</p>
       </div>
     );
  }

  return (
    <section className="py-[100px] px-[5%] relative overflow-hidden">
      <SectionBackground />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2px] uppercase text-green-brand dark:text-green-light mb-4 before:content-[''] before:block before:w-6 before:h-0.5 before:bg-green-brand dark:before:bg-green-light before:rounded-sm">Farmer Stories</div>
          <h2 className="font-serif text-[clamp(36px,4vw,54px)] font-extrabold leading-tight tracking-[-1.5px] text-green-deep dark:text-white">Real Farmers,<br /><em className="italic text-green-brand dark:text-green-bright not-italic">Real Results</em></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {testimonials.map((t, i) => (
            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-black/5 dark:border-white/10 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300" key={t.id || i}>
              <div className="text-[#f5a623] text-[12px] mb-4 flex gap-0.5">
                {[...Array(5)].map((_, si) => <Star key={si} size={14} className={si < t.stars ? "fill-[#f5a623]" : "text-gray-300"} />)}
              </div>
              <div className="font-serif text-[42px] text-green-brand dark:text-green-bright leading-none mb-4">&quot;</div>
              <div className="text-[15px] leading-relaxed text-text-mid dark:text-text-muted mb-8 italic font-medium">
                {t.text}
              </div>
              <div className="flex items-center gap-3 mt-auto pt-6 border-t border-black/5 dark:border-white/5">
                <div className="w-12 h-12 rounded-full bg-green-brand flex items-center justify-center text-[16px] font-bold text-white shrink-0 shadow-md shadow-green-brand/20">{t.avatar}</div>
                <div>
                  <div className="text-[15px] font-bold text-green-deep dark:text-white">{t.name}</div>
                  <div className="text-[12px] text-text-muted mt-0.5 flex items-center gap-1"><MapPin size={10} /> {t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
