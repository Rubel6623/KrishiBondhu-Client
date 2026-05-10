"use client";

import { useState, useEffect } from "react";
import { getAllBlogs } from "@/services/blog";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  BookOpen, 
  Tractor, 
  Sprout, 
  CloudRain,
  Loader2,
  SortAsc,
  Filter as FilterIcon,
  X
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import SectionBackground from "@/components/home/SectionBackground";
import Newsletter from "@/components/blogs/Newsletter";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "ALL", name: "All Articles", icon: <BookOpen size={16} /> },
  { id: "RICE", name: "Rice Farming", icon: <Sprout size={16} /> },
  { id: "WHEAT", name: "Wheat", icon: <Sprout size={16} /> },
  { id: "POTATO", name: "Potato", icon: <Sprout size={16} /> },
  { id: "VEGETABLE", name: "Vegetables", icon: <Sprout size={16} /> },
  { id: "FRUIT", name: "Fruits", icon: <Sprout size={16} /> },
  { id: "SOIL", name: "Soil", icon: <FilterIcon size={16} /> },
  { id: "FERTILIZER", name: "Fertilizers", icon: <FilterIcon size={16} /> },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const query: any = {
        status: "PUBLISHED",
        sortBy,
        sortOrder,
      };
      if (searchTerm) query.searchTerm = searchTerm;
      if (selectedCategory !== "ALL") query.category = selectedCategory;

      const res = await getAllBlogs(query);
      if (res.success) {
        setBlogs(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBlogs();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  return (
    <main className="min-h-screen pt-[120px] pb-20 relative overflow-hidden">
      <SectionBackground />
      
      {/* Hero Header */}
      <section className="px-[5%] mb-12 relative z-10">
        <div className="max-w-[1280px] mx-auto text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-brand/10 border border-green-brand/20 text-green-brand text-[12px] font-bold uppercase tracking-wider mb-6">
            <BookOpen size={16} /> Knowledge Hub
          </div>
          <h1 className="font-serif text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.1] text-green-deep dark:text-white mb-6">
            Agricultural <em className="italic text-green-brand dark:text-green-bright not-italic underline decoration-green-brand/30 decoration-8 underline-offset-8">Insights</em>
          </h1>
          <p className="text-[17px] leading-relaxed text-text-muted max-w-[640px]">
            Explore expert advice, success stories, and technical guides designed to empower 
            farmers across Bangladesh with modern knowledge.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-[5%] mb-16 relative z-10">
        <div className="max-w-[1280px] mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            {/* Search Input */}
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-green-brand transition-colors" />
              <input 
                type="text" 
                placeholder="Search for articles, tips, or crop guides..."
                className="w-full pl-16 pr-6 py-5 rounded-[32px] bg-white dark:bg-zinc-950 border border-border focus:ring-4 focus:ring-green-brand/10 focus:border-green-brand outline-none transition-all font-medium shadow-sm text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted text-muted-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative group">
              <SortAsc className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-green-brand" />
              <select 
                className="w-full pl-16 pr-8 py-5 rounded-[32px] bg-white dark:bg-zinc-950 border border-border focus:ring-4 focus:ring-green-brand/10 focus:border-green-brand outline-none transition-all font-bold text-sm appearance-none cursor-pointer shadow-sm"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="title-asc">Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-[5%] px-[5%] md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full border text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all shadow-sm ${
                  selectedCategory === cat.id 
                    ? "bg-green-brand text-white border-green-brand scale-105" 
                    : "bg-white dark:bg-zinc-900 border-border text-muted-foreground hover:bg-green-brand/5 hover:border-green-brand/30"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="px-[5%] relative z-10 min-h-[400px]">
        <div className="max-w-[1280px] mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
              <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs animate-pulse">Scanning Knowledge Base...</p>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {blogs.map((blog: any, index: number) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={blog.id}
                  >
                    <Link 
                      href={`/blogs/${blog.slug}`} 
                      className="group flex flex-col bg-white dark:bg-zinc-950 rounded-[40px] border border-border overflow-hidden shadow-sm hover:shadow-2xl transition-all h-full"
                    >
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={blog.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800"} 
                          alt={blog.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        <div className="absolute top-6 left-6">
                          <Badge className="bg-white/90 dark:bg-green-brand text-zinc-900 dark:text-white border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                            {blog.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">
                          <span className="flex items-center gap-1.5"><Calendar size={12} className="text-green-brand" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                          <span className="flex items-center gap-1.5"><Clock size={12} className="text-green-brand" /> 5 Min</span>
                        </div>

                        <h3 className="text-2xl font-serif font-black text-foreground leading-tight mb-4 group-hover:text-green-brand transition-colors line-clamp-2">
                          {blog.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-8 flex-1">
                          {blog.excerpt}
                        </p>

                        <div className="pt-6 border-t border-border flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-green-brand flex items-center justify-center text-white text-xs font-black">
                                {blog.authorName?.charAt(0)}
                             </div>
                             <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{blog.authorName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-green-brand group-hover:translate-x-1 transition-transform">
                            Read More <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-40 text-center bg-white dark:bg-zinc-950 rounded-[48px] border border-border shadow-xl">
               <div className="w-24 h-24 rounded-full bg-green-pale flex items-center justify-center text-green-brand mx-auto mb-8">
                  <BookOpen size={48} />
               </div>
               <h3 className="text-3xl font-serif font-black text-foreground mb-4">No Articles Found</h3>
               <p className="text-muted-foreground max-w-[400px] mx-auto font-medium">
                  We couldn't find any articles matching your current filters. Try broadening your search.
               </p>
               <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("ALL");
                }}
                className="mt-8 px-8 py-3.5 bg-green-brand text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-green-deep transition-all"
               >
                Clear All Filters
               </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <Newsletter />
    </main>
  );
}
