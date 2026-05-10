"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBlog, updateBlog } from "@/services/blog";
import { Loader2, Send, Image as ImageIcon, FileText, Type, Hash, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(5, "Slug must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  image: z.string().url("Invalid image URL"),
  category: z.enum(["RICE", "WHEAT", "POTATO", "VEGETABLE", "FRUIT", "SOIL", "FERTILIZER", "OTHER"]),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing }: BlogFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData || {
      status: "DRAFT",
      category: "OTHER",
    },
  });

  const onSubmit = async (data: BlogFormValues) => {
    setIsLoading(true);
    try {
      // Add required author info (usually handled by backend from token, but schema has it as required fields)
      // Check server blogs.validation.ts to see what it expects
      const payload = {
        ...data,
        authorName: "Admin", // Fallback, backend usually fills this
        authorEmail: "admin@gmail.com", // Fallback
      };

      const res = isEditing 
        ? await updateBlog(initialData.id, payload)
        : await createBlog(payload);

      if (res.success) {
        toast.success(`Blog ${isEditing ? "updated" : "published"} successfully!`);
        router.push("/dashboard/admin/blogs/manage");
      } else {
        toast.error(res.message || "Failed to save blog");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeUp">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        {/* Main Content */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-bold uppercase tracking-wider">Blog Title</Label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="title"
                  placeholder="e.g. Modern Irrigation Techniques for Rice Farming"
                  className="pl-12 h-14 rounded-2xl border-border bg-muted/20 focus:bg-background transition-all font-serif text-xl font-bold"
                  {...register("title")}
                  onChange={(e) => {
                    register("title").onChange(e);
                    if (!isEditing) setValue("slug", generateSlug(e.target.value));
                  }}
                />
              </div>
              {errors.title && <p className="text-xs text-destructive font-medium">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-bold uppercase tracking-wider">Slug (URL)</Label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="slug"
                  placeholder="modern-irrigation-rice"
                  className="pl-12 h-12 rounded-xl border-border bg-muted/10 font-mono text-xs"
                  {...register("slug")}
                />
              </div>
              {errors.slug && <p className="text-xs text-destructive font-medium">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-sm font-bold uppercase tracking-wider">Short Excerpt</Label>
              <textarea
                id="excerpt"
                placeholder="A brief summary of the article..."
                className="w-full min-h-[100px] p-4 rounded-2xl border border-border bg-muted/20 focus:bg-background transition-all outline-none text-sm leading-relaxed"
                {...register("excerpt")}
              />
              {errors.excerpt && <p className="text-xs text-destructive font-medium">{errors.excerpt.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-bold uppercase tracking-wider">Article Content</Label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                <textarea
                  id="content"
                  placeholder="Write your article here..."
                  className="w-full min-h-[400px] pl-12 pr-4 py-4 rounded-2xl border border-border bg-muted/20 focus:bg-background transition-all outline-none text-base leading-relaxed font-serif"
                  {...register("content")}
                />
              </div>
              {errors.content && <p className="text-xs text-destructive font-medium">{errors.content.message}</p>}
            </div>
          </div>
        </div>

        {/* Sidebar: Settings */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Featured Image URL</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="https://images.unsplash.com/..."
                  className="pl-10 h-12 rounded-xl border-border bg-muted/20"
                  {...register("image")}
                />
              </div>
              {watch("image") && (
                <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-border bg-muted">
                  <img src={watch("image")} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  className="w-full pl-10 pr-4 h-12 rounded-xl border border-border bg-muted/20 outline-none text-sm font-bold appearance-none cursor-pointer"
                  {...register("category")}
                >
                  <option value="OTHER">Other</option>
                  <option value="RICE">Rice Farming</option>
                  <option value="WHEAT">Wheat Farming</option>
                  <option value="POTATO">Potato Farming</option>
                  <option value="VEGETABLE">Vegetables</option>
                  <option value="FRUIT">Fruits</option>
                  <option value="SOIL">Soil Management</option>
                  <option value="FERTILIZER">Fertilizers</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setValue("status", "DRAFT")}
                  className={`flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    watch("status") === "DRAFT" ? "bg-zinc-900 text-white border-zinc-900" : "bg-transparent text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setValue("status", "PUBLISHED")}
                  className={`flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    watch("status") === "PUBLISHED" ? "bg-green-brand text-white border-green-brand" : "bg-transparent text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  Publish
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-green-brand hover:bg-green-deep text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-green-brand/20 flex items-center justify-center gap-3 group transition-all hover:-translate-y-1"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isEditing ? "Update Article" : "Launch Article"}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
