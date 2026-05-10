import { getAllBlogs } from "@/services/blog";
import { ArrowRight, Calendar, Sprout } from "lucide-react";
import Link from "next/link";
import SectionBackground from "./SectionBackground";

export default async function Blog() {
  const { data: blogs = [] } = await getAllBlogs({ status: "PUBLISHED", limit: 3 });

  return (
    <section className="py-[100px] px-[5%] relative overflow-hidden" id="blog">
      <SectionBackground />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2px] uppercase text-green-brand dark:text-green-light mb-4 before:content-[''] before:block before:w-6 before:h-0.5 before:bg-green-brand dark:before:bg-green-light before:rounded-sm">Knowledge Hub</div>
            <h2 className="font-serif text-[clamp(36px,4vw,54px)] font-extrabold leading-tight tracking-[-1.5px] text-green-deep dark:text-white">Farming Tips &<br /><em className="italic text-green-brand dark:text-green-bright not-italic">Seasonal Guides</em></h2>
          </div>
          <Link href="/blogs" className="inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-bold text-white bg-green-brand rounded-full hover:bg-green-mid hover:-translate-y-0.5 transition-all shadow-lg shadow-green-brand/10">View All Articles →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post: any) => (
            <Link 
              href={`/blogs/${post.slug}`}
              className={`group bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm rounded-[32px] overflow-hidden border border-black/5 dark:border-white/10 hover:shadow-2xl transition-all duration-500 flex flex-col`} 
              key={post.id}
            >
              <div className={`relative w-full h-[240px] overflow-hidden`}>
                <img 
                  src={post.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800"} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-6 left-6">
                  <div className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-green-brand text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {post.category}
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  <Calendar size={12} className="text-green-brand" /> {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <h3 className={`font-serif font-black text-green-deep dark:text-white leading-[1.3] mb-4 group-hover:text-green-brand transition-colors text-[22px] line-clamp-2`}>
                  {post.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-text-muted mb-8 line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-green-brand pt-6 border-t border-border group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="py-20 text-center bg-muted/20 rounded-[40px] border border-dashed border-border">
            <Sprout className="w-12 h-12 text-green-brand/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">No articles found in the hub</p>
          </div>
        )}
      </div>
    </section>
  );
}
