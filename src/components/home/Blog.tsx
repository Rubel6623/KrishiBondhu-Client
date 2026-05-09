import Link from "next/link";
import { Calendar } from "lucide-react";
import SectionBackground from "./SectionBackground";

export default function Blog() {
  const posts = [
    { emoji: "🌾", cat: "Rice Cultivation", title: "বোরো মৌসুমে ধান চাষে সর্বোচ্চ ফলন পাওয়ার সেরা কৌশল", excerpt: "এই বছরের বোরো মৌসুমে কীভাবে সঠিক সার প্রয়োগ, সেচ ব্যবস্থাপনা এবং রোগ প্রতিরোধ করে ফলন বাড়ানো যায় তার বিস্তারিত গাইড।", date: "May 2, 2025 · 8 min read", big: true },
    { emoji: "🚜", cat: "Equipment Guide", title: "Power Tiller vs Tractor: Which Is Right for Your Farm?", excerpt: "A practical comparison guide for Bangladeshi farmers choosing between power tillers and tractors based on farm size and crop type.", date: "April 28, 2025 · 5 min read" },
    { emoji: "🌱", cat: "Soil Health", title: "Soil Testing Made Simple: Why Every Farmer Needs It", excerpt: "Understanding your soil's NPK levels can transform your fertilizer strategy and save thousands in costs per season.", date: "April 20, 2025 · 6 min read" },
  ];

  return (
    <section className="py-[100px] px-[5%] relative overflow-hidden" id="blog">
      <SectionBackground />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2px] uppercase text-green-brand dark:text-green-light mb-4 before:content-[''] before:block before:w-6 before:h-0.5 before:bg-green-brand dark:before:bg-green-light before:rounded-sm">Knowledge Hub</div>
            <h2 className="font-serif text-[clamp(36px,4vw,54px)] font-extrabold leading-tight tracking-[-1.5px] text-green-deep dark:text-white">Farming Tips &<br /><em className="italic text-green-brand dark:text-green-bright not-italic">Seasonal Guides</em></h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-bold text-white bg-green-brand rounded-full hover:bg-green-mid hover:-translate-y-0.5 transition-all shadow-lg shadow-green-brand/10">View All Articles →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div className={`group bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 hover:shadow-2xl transition-all duration-300 ${post.big ? "md:col-span-2 lg:col-span-1" : ""}`} key={post.title}>
              <div className={`w-full bg-green-pale dark:bg-green-deep/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${post.big ? "h-[220px] text-[72px]" : "h-[180px] text-[48px]"}`}>{post.emoji}</div>
              <div className="p-7">
                <div className="inline-block text-[11px] font-bold tracking-[1.5px] uppercase text-green-brand dark:text-green-bright mb-3">{post.cat}</div>
                <div className={`font-serif font-bold text-green-deep dark:text-white leading-[1.3] mb-4 group-hover:text-green-brand transition-colors ${post.big ? "text-[24px]" : "text-[20px]"}`}>{post.title}</div>
                <div className="text-[14px] leading-relaxed text-text-muted mb-6">{post.excerpt}</div>
                <div className="text-[11px] text-text-muted flex items-center gap-1.5 font-medium"><Calendar size={12} /> {post.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
