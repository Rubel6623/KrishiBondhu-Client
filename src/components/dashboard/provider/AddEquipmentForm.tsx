"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Tractor, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  DollarSign,
  MapPin,
  FileText,
  Tag
} from "lucide-react";
import { createEquipment } from "@/services/equipment";
import { getAllCategories } from "@/services/category";
import { toast } from "sonner";

export default function AddEquipmentForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerDay: "",
    location: "",
    categoryId: "",
    images: [] as string[]
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.success) setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        images: formData.images.length > 0 ? formData.images : ["https://images.unsplash.com/photo-1593110050241-ee7ce35e9701?auto=format&fit=crop&q=80&w=800"]
      };

      const res = await createEquipment(payload);
      if (res.success) {
        toast.success("Equipment listed successfully!");
        router.push("/dashboard/provider/equipment");
      } else {
        toast.error(res.message || "Failed to list equipment");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUrlAdd = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Basic Info */}
        <div className="space-y-6">
          <div className="bg-card border border-border p-8 rounded-[32px] shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-black text-foreground flex items-center gap-3">
               <FileText className="text-green-brand" size={20} /> Basic <em className="italic text-green-brand not-italic">Details</em>
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Equipment Title</label>
              <div className="relative group">
                <Tractor className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Modern Rice Harvester"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Category</label>
              <div className="relative group">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                <select 
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium appearance-none"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Description</label>
              <textarea 
                required
                rows={4}
                placeholder="Describe your equipment's features, condition, and any specific instructions..."
                className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Pricing & Media */}
        <div className="space-y-6">
          <div className="bg-card border border-border p-8 rounded-[32px] shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-black text-foreground flex items-center gap-3">
               <DollarSign className="text-green-brand" size={20} /> Pricing & <em className="italic text-green-brand not-italic">Location</em>
            </h3>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Price Per Day (৳)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="800"
                    className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Location</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-green-brand transition-colors w-4 h-4" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rajshahi"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-green-brand outline-none transition-all text-sm font-medium"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Equipment Images</label>
               <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((url, i) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-muted relative group">
                       <img src={url} alt="Equipment" className="w-full h-full object-cover" />
                       <button 
                         type="button"
                         onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                         className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                         <AlertCircle size={12} />
                       </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={handleImageUrlAdd}
                    className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-green-brand hover:bg-green-brand/5 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-green-brand transition-all"
                  >
                    <Upload size={20} />
                    <span className="text-[10px] font-black uppercase">Add Image</span>
                  </button>
               </div>
            </div>
          </div>

          <div className="p-6 bg-green-brand/5 rounded-[32px] border border-green-brand/10">
             <div className="flex gap-4">
                <div className="p-3 rounded-2xl bg-green-brand text-white shrink-0">
                   <CheckCircle2 size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-foreground">Verified Listing</h4>
                   <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      Your equipment will be reviewed by our team. Accurate details and high-quality images help you get booked 3x faster.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-border">
         <button 
           type="submit" 
           disabled={isLoading}
           className="px-12 py-4 bg-green-brand text-white rounded-full font-black text-sm hover:bg-green-bright transition-all shadow-xl shadow-green-brand/30 flex items-center gap-3 disabled:opacity-50"
         >
           {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Tractor size={20} />}
           List Equipment Now
         </button>
      </div>
    </form>
  );
}
