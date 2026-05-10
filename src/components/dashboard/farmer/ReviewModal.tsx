"use client";

import { useState } from "react";
import { Star, X, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createReview } from "@/services/reviews";
import { toast } from "sonner";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentId: string;
  equipmentTitle: string;
}

export default function ReviewModal({ isOpen, onClose, equipmentId, equipmentTitle }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please add a comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createReview({
        equipmentId,
        rating,
        comment
      });

      if (res.success) {
        toast.success("Thank you for your feedback!");
        onClose();
      } else {
        toast.error(res.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-zinc-950 rounded-[40px] border border-border shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-serif font-black text-foreground tracking-tight">Share your <em>Experience</em></h3>
                  <p className="text-sm text-muted-foreground mt-1">Reviewing: <span className="text-green-brand font-bold">{equipmentTitle}</span></p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Rate your rental</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="transition-transform active:scale-90"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
                            star <= (hover || rating)
                              ? "text-amber-500 fill-amber-500"
                              : "text-muted dark:text-zinc-800"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-lg font-black text-foreground">
                    {rating === 5 ? "Excellent! 🌟" : 
                     rating === 4 ? "Great! 👍" : 
                     rating === 3 ? "Average 😐" : 
                     rating === 2 ? "Poor 👎" : 
                     "Terrible 😠"}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Tell us more</p>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe your experience with this equipment..."
                    className="w-full h-32 rounded-[24px] bg-muted/50 border-none p-6 text-sm font-medium focus:ring-2 focus:ring-green-brand/20 outline-none resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-[24px] bg-green-brand text-white font-black uppercase tracking-widest text-sm hover:bg-green-deep transition-all shadow-lg shadow-green-brand/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Submit Review
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
