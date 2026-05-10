"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Trash2, 
  MessageSquare, 
  Calendar, 
  Tractor, 
  Loader2, 
  RefreshCw 
} from "lucide-react";
import { getMyReviews, deleteReview } from "@/services/reviews";
import { toast } from "sonner";

export default function FarmerReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getMyReviews();
      if (res.success) {
        setReviews(res.data);
      }
    } catch (error) {
      toast.error("Failed to load your reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await deleteReview(id);
      if (res.success) {
        toast.success("Review deleted successfully");
        fetchReviews();
      }
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Accessing Feedback Log...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">Community Feedback</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
            My <em>Reviews</em>
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Review your contributions and shared experiences.</p>
        </div>
        <button 
          onClick={fetchReviews}
          className="p-4 rounded-2xl bg-muted hover:bg-muted/80 transition-all border border-border"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-zinc-950 rounded-[32px] border border-border p-8 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center shrink-0">
                      <Tractor className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-foreground text-lg leading-tight mb-1">{review.equipment?.title}</h4>
                      <p className="text-xs text-muted-foreground font-bold flex items-center gap-1">
                         <Calendar className="w-3 h-3" /> {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                   </div>
                </div>
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                >
                   <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}`} 
                  />
                ))}
                <span className="text-xs font-black ml-2 text-foreground">{review.rating}.0</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "{review.comment}"
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {reviews.length === 0 && (
        <div className="p-20 text-center bg-muted/20 rounded-[40px]">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-serif font-black text-foreground">No reviews yet</h3>
          <p className="text-muted-foreground font-medium">Your reviews of equipment will appear here.</p>
          <a href="/dashboard/farmer/bookings" className="mt-6 inline-block px-8 py-3 rounded-2xl bg-green-brand text-white font-black text-xs uppercase tracking-widest hover:bg-green-deep transition-all shadow-lg shadow-green-brand/20">
            Write a Review
          </a>
        </div>
      )}
    </div>
  );
}
