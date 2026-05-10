"use client";

import { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "@/services/blog";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Trash2, 
  Edit3, 
  Eye, 
  Plus, 
  Loader2, 
  Calendar, 
  User as UserIcon,
  Tag,
  AlertCircle,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      if (res.success) {
        setBlogs(res.data);
      }
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await deleteBlog(id);
      if (res.success) {
        toast.success("Article deleted successfully");
        fetchBlogs();
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Accessing Archives...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="section-label">Administration</div>
          <h1 className="text-5xl font-serif font-black text-foreground tracking-tight leading-[1.1]">
            Article <em>Archive</em>
          </h1>
          <p className="text-muted-foreground font-medium max-w-[500px]">
            Review, edit, or remove knowledge base articles and news updates.
          </p>
        </div>
        <Link href="/dashboard/admin/blogs">
          <button className="flex items-center gap-3 px-8 py-4 rounded-[24px] bg-green-brand text-white font-black uppercase tracking-widest text-[10px] hover:bg-green-deep transition-all shadow-xl shadow-green-brand/10 group">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Write New Article
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search by title, category, or author..."
          className="w-full pl-16 pr-6 py-5 rounded-[32px] bg-white dark:bg-zinc-950 border border-border focus:ring-2 focus:ring-green-brand/20 outline-none transition-all font-medium text-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.map((blog, index) => (
            <motion.div 
              key={blog.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white dark:bg-zinc-950 rounded-[40px] border border-border overflow-hidden shadow-sm hover:shadow-2xl transition-all relative flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={blog.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800"} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                   <Badge className="bg-white/90 text-zinc-900 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                     {blog.category}
                   </Badge>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex items-center gap-3 text-white/70 text-[10px] font-black uppercase tracking-widest">
                      <span className="flex items-center gap-1"><UserIcon size={12} /> {blog.authorName}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                   </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-serif font-black text-foreground leading-tight line-clamp-2 group-hover:text-green-brand transition-colors">
                    {blog.title}
                  </h3>
                  <Badge variant={blog.status === "PUBLISHED" ? "default" : "outline"} className={blog.status === "PUBLISHED" ? "bg-green-brand text-white" : ""}>
                    {blog.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-8 flex-1">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/admin/blogs/edit/${blog.id}`}>
                      <button className="w-10 h-10 rounded-xl bg-muted hover:bg-zinc-900 hover:text-white transition-all flex items-center justify-center text-muted-foreground" title="Edit Article">
                        <Edit3 size={18} />
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="w-10 h-10 rounded-xl bg-muted hover:bg-red-500 hover:text-white transition-all flex items-center justify-center text-muted-foreground" 
                      title="Delete Article"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <Link href={`/blogs/${blog.slug}`} target="_blank">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-green-brand hover:text-green-deep transition-all">
                      View Live <Eye size={14} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredBlogs.length === 0 && (
        <div className="py-40 text-center bg-muted/20 rounded-[40px] border border-dashed border-border">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-serif font-black text-foreground">No articles found</h3>
          <p className="text-muted-foreground font-medium mt-2 max-w-[320px] mx-auto">
            Your knowledge base is waiting for its first masterpiece. Start writing today!
          </p>
          <Link href="/dashboard/admin/blogs">
            <button className="mt-8 px-8 py-4 bg-zinc-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all">
              Write My First Blog
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
