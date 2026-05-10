import { getBlogBySlug, getAllBlogs } from "@/services/blog";
import type { Metadata } from "next";
import { Calendar, User, Clock, ChevronLeft, Share2, Link2, BookOpen } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import SectionBackground from "@/components/home/SectionBackground";
import { BiLogoFacebook, BiLogoTwitter,  } from "react-icons/bi";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: blog } = await getBlogBySlug(slug);
  return {
    title: `${blog?.title || "Blog Article"} — KrishiBondhu Knowledge Hub`,
    description: blog?.excerpt || "Expert farming tips and agricultural insights from KrishiBondhu.",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: blog } = await getBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-3xl font-serif font-black mb-4">Article Not Found</h2>
        <p className="text-muted-foreground mb-8">The requested article could not be located.</p>
        <Link href="/blogs">
          <button className="px-8 py-4 bg-green-brand text-white rounded-2xl font-black uppercase tracking-widest text-xs">
            Back to Hub
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-[120px] pb-20 relative overflow-hidden">
      <SectionBackground />
      
      <div className="max-w-[1280px] mx-auto px-[5%] relative z-10">
        {/* Back Link */}
        <Link href="/blogs" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-green-brand transition-all mb-10 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Knowledge Hub
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
          {/* Main Article */}
          <article className="space-y-12">
            {/* Header */}
            <header className="space-y-6">
              <Badge className="bg-green-brand text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {blog.category}
              </Badge>
              <h1 className="text-[clamp(32px,5vw,56px)] font-serif font-black text-foreground leading-[1.1] tracking-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-[11px] font-black uppercase tracking-widest text-muted-foreground pt-4 border-t border-border">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-brand" /> {blog.authorName}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-brand" /> {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-brand" /> 6 Min Read
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-[21/9] rounded-[48px] overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-900">
               <img 
                 src={blog.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200"} 
                 alt={blog.title} 
                 className="w-full h-full object-cover"
               />
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-black prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Footer / Share */}
            <div className="pt-12 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Share Article:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-muted hover:bg-green-brand hover:text-white transition-all flex items-center justify-center"><BiLogoFacebook size={16} /></button>
                    <button className="w-10 h-10 rounded-full bg-muted hover:bg-green-brand hover:text-white transition-all flex items-center justify-center"><BiLogoTwitter size={16} /></button>
                    <button className="w-10 h-10 rounded-full bg-muted hover:bg-green-brand hover:text-white transition-all flex items-center justify-center"><Link2 size={16} /></button>
                  </div>
               </div>
               <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl">
                 Updated: {new Date(blog.updatedAt).toLocaleDateString()}
               </Badge>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-12">
            {/* Author Card */}
            <div className="bg-white dark:bg-zinc-950 p-8 rounded-[40px] border border-border shadow-xl">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">About the Author</h4>
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-green-brand flex items-center justify-center text-white font-black text-2xl">
                    {blog.authorName.charAt(0)}
                  </div>
                  <div>
                     <p className="font-serif font-black text-foreground">{blog.authorName}</p>
                     <p className="text-[10px] font-bold text-green-brand uppercase tracking-widest">Agricultural Expert</p>
                  </div>
               </div>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Dedicated to sharing modern farming techniques and sustainable agricultural practices with farmers across Bangladesh.
               </p>
            </div>

            {/* Newsletter */}
            <div className="bg-zinc-950 text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-brand/20 blur-[60px] rounded-full -mr-16 -mt-16" />
               <BookOpen className="w-12 h-12 text-green-brand mb-6" />
               <h3 className="text-2xl font-serif font-black mb-4 leading-tight">Join the Knowledge <em className="text-green-brand">Circle</em></h3>
               <p className="text-sm text-zinc-400 mb-8 leading-relaxed">Get weekly agricultural insights and marketplace trends delivered to your inbox.</p>
               <div className="space-y-4">
                  <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 px-6 text-sm outline-none focus:border-green-brand transition-all" />
                  <button className="w-full h-12 bg-green-brand text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-green-deep transition-all">Subscribe Now</button>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
