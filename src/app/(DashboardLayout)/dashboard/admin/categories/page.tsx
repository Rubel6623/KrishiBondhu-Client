"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FolderOpen, 
  Search, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Loader2, 
  RefreshCw,
  MoreVertical,
  Layers,
  Leaf,
  XCircle
} from "lucide-react";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "@/services/category";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", description: "", icon: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.data);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category? All related equipment might be affected.")) return;
    
    try {
      const res = await deleteCategory(id);
      if (res.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
         toast.error(res.message || "Failed to delete category");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleOpenModal = (category: any = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name || "",
        description: category.description || "",
        icon: category.icon || "",
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "", icon: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let res;
      if (editingCategory) {
        res = await updateCategory(editingCategory.id, formData);
      } else {
        res = await createCategory(formData);
      }

      if (res.success) {
        toast.success(`Category ${editingCategory ? 'updated' : 'created'} successfully`);
        setIsModalOpen(false);
        fetchCategories();
      } else {
        toast.error(res.message || "Operation failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">Taxonomy Management</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
            Equipment <em>Categories</em>
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Organize and structure the platform's equipment catalog.</p>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={fetchCategories}
                className="p-4 rounded-2xl bg-muted hover:bg-muted/80 transition-all border border-border"
            >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button 
                onClick={() => handleOpenModal()}
                className="px-6 py-4 rounded-2xl bg-green-brand hover:bg-green-brand/90 text-white transition-all shadow-lg shadow-green-brand/20 font-bold flex items-center gap-2"
            >
                <PlusCircle className="w-5 h-5" />
                Add Category
            </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search categories by name or description..."
          className="w-full pl-12 pr-4 py-4 rounded-[24px] bg-white dark:bg-zinc-950 border border-border focus:ring-2 focus:ring-green-brand/20 outline-none transition-all font-medium shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((category, index) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-zinc-950 rounded-[32px] border border-border p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-brand/5 rounded-full blur-3xl group-hover:bg-green-brand/10 transition-colors" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center text-2xl border border-green-brand/20 group-hover:rotate-12 transition-transform">
                    {category?.icon && <img src={category.icon} alt={category.name} className="w-full h-full object-cover rounded-2xl" />}
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-xl text-foreground tracking-tight group-hover:text-green-brand transition-colors">{category.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">ID: {category.id.substring(0, 8)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => handleOpenModal(category)}
                        className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => handleDelete(category.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border relative z-10">
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                    {category.description || "No description provided for this category."}
                </p>
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted text-xs font-bold text-foreground">
                        <Layers className="w-3.5 h-3.5 text-green-brand" />
                        {category.equipment?.length || 0} Items
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCategories.length === 0 && (
        <div className="p-20 text-center bg-muted/20 rounded-[40px] border border-dashed border-border">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-serif font-black text-foreground">No categories found</h3>
          <p className="text-muted-foreground font-medium">Create a new category or adjust your search.</p>
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card w-full max-w-md rounded-[32px] border border-border shadow-2xl overflow-hidden"
            >
                <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                    <h2 className="font-serif font-black text-xl flex items-center gap-2">
                        {editingCategory ? <Edit3 className="w-5 h-5 text-blue-500" /> : <PlusCircle className="w-5 h-5 text-green-brand" />}
                        {editingCategory ? "Edit Category" : "New Category"}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-xl transition-all">
                        <XCircle className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category Name</label>
                            <input 
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-green-brand/20 outline-none transition-all font-medium"
                                placeholder="e.g., Tractors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Icon (Emoji or URL)</label>
                            <input 
                                type="text"
                                value={formData.icon}
                                onChange={e => setFormData({...formData, icon: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-green-brand/20 outline-none transition-all font-medium"
                                placeholder="e.g., 🚜 or URL"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                            <textarea 
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-green-brand/20 outline-none transition-all font-medium min-h-[100px] resize-none"
                                placeholder="Short description of this category..."
                            />
                        </div>
                        <div className="pt-4 flex gap-3">
                            <button 
                                type="button" 
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 rounded-xl border border-border font-bold text-foreground hover:bg-muted transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-3 rounded-xl bg-green-brand hover:bg-green-brand/90 text-white font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                {editingCategory ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
      )}
    </div>
  );
}
