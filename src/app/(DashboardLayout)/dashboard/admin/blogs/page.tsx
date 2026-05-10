import BlogForm from "@/components/dashboard/admin/BlogForm";
import type { Metadata } from "next";
import Link from "next/link";
import { ListRestart } from "lucide-react";

export const metadata: Metadata = { title: "Create Blog — KrishiBondhu Admin" };

export default function AdminBlogsPage() {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="section-label">Knowledge Hub</div>
          <h1 className="text-5xl font-serif font-black text-foreground tracking-tight leading-[1.1]">
            Draft New <em>Article</em>
          </h1>
          <p className="text-muted-foreground font-medium max-w-[500px]">
            Share insights, farming tips, or success stories with the KrishiBondhu community.
          </p>
        </div>
        <Link href="/dashboard/admin/blogs/manage">
          <button className="flex items-center gap-3 px-8 py-4 rounded-[24px] bg-zinc-950 text-white font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl shadow-black/10 group">
            <ListRestart className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Manage Existing Blogs
          </button>
        </Link>
      </div>

      <BlogForm />
    </div>
  );
}
