"use client";

import { useEffect, useState, use } from "react";
import BlogForm from "@/components/dashboard/admin/BlogForm";
import { getBlogById } from "@/services/blog";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        if (res.success) {
          setBlog(res.data);
        } else {
          toast.error("Failed to load blog details");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Article Content...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <h2 className="text-3xl font-serif font-black">Article Not Found</h2>
        <p className="text-muted-foreground">The article you are trying to edit does not exist or has been removed.</p>
        <Link href="/dashboard/admin/blogs/manage">
          <button className="flex items-center gap-2 px-8 py-4 bg-zinc-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all">
            <ArrowLeft size={16} /> Back to Archive
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="section-label">Edit Article</div>
          <h1 className="text-5xl font-serif font-black text-foreground tracking-tight leading-[1.1]">
            Refining the <em>Masterpiece</em>
          </h1>
          <p className="text-muted-foreground font-medium max-w-[500px]">
            Updating: <span className="text-foreground font-bold">{blog.title}</span>
          </p>
        </div>
        <Link href="/dashboard/admin/blogs/manage">
          <button className="flex items-center gap-2 px-8 py-4 rounded-[24px] bg-muted text-foreground font-black uppercase tracking-widest text-[10px] hover:bg-border transition-all group border border-border">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Cancel & Return
          </button>
        </Link>
      </div>

      <BlogForm initialData={blog} isEditing={true} />
    </div>
  );
}
