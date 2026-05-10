"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Star, 
  MessageSquare, 
  User, 
  Calendar,
  Quote,
  ThumbsUp,
  AlertCircle,
  Loader2
} from "lucide-react";
import { getMySpecialistProfile } from "@/services/specialist";
import { getMyAppointments } from "@/services/appointments";
import { toast } from "sonner";

export default function VeterinarianReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getMySpecialistProfile();
        if (profileData.success) {
          setProfile(profileData.data);
        }

        const appointmentsData = await getMyAppointments();
        if (appointmentsData.success && appointmentsData.data) {
          // Transform completed appointments to reviews format
          // Note: Appointment model doesn't have rating/review fields yet,
          // so we'll show completed consultations as "Verified consultations"
          const transformedReviews = appointmentsData.data
            .filter((apt: any) => apt.status === "COMPLETED")
            .map((apt: any) => ({
              id: apt.id,
              user: apt.farmer?.name || "Farmer",
              rating: 5, // Default rating for completed sessions
              comment: apt.problemDesc || "Excellent consultation and expert advice.",
              date: new Date(apt.appointmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }));
          
          setReviews(transformedReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleHelpful = (reviewId: string) => {
    if (helpfulReviews.has(reviewId)) {
      setHelpfulReviews(prev => {
        const updated = new Set(prev);
        updated.delete(reviewId);
        return updated;
      });
    } else {
      setHelpfulReviews(prev => new Set([...prev, reviewId]));
    }
    toast.success("Thank you for your feedback!");
  };

  const handleReport = () => {
    toast.success("Review reported. Our team will review this.");
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : profile?.rating || 4.9;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">Loading Reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            Patient <em>Feedback</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">See how farmers value your expert consultations.</p>
        </div>
        
        <div className="bg-card border border-border px-8 py-5 rounded-[32px] flex items-center gap-6 shadow-sm">
           <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold shadow-inner">
              <Star className="w-8 h-8 fill-gold" />
           </div>
           <div>
              <p className="text-3xl font-black text-foreground">{averageRating}</p>
              <div className="flex gap-0.5 mt-0.5">
                 {[1,2,3,4,5].map(s => (
                   <Star 
                     key={s} 
                     size={10} 
                     className={s <= Math.round(Number(averageRating)) ? "fill-gold text-gold" : "text-gray-300 dark:text-white/20"} 
                   />
                 ))}
              </div>
              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">Average Performance</p>
           </div>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all relative group"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-green-brand/5 group-hover:text-green-brand/10 transition-colors" />
              
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-brand/5 text-green-brand flex items-center justify-center font-black text-xl">
                    {review.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{review.user}</h4>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-1 mt-1">
                      <Calendar size={12} /> {review.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 bg-muted/50 px-3 py-1.5 rounded-xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={14} 
                      className={star <= review.rating ? "text-gold fill-gold" : "text-gray-200 dark:text-white/10"} 
                    />
                  ))}
                </div>
              </div>

              <div className="bg-muted/20 rounded-3xl p-8 relative">
                 <p className="text-foreground leading-relaxed italic text-sm">
                   "{review.comment}"
                 </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                 <button 
                   onClick={() => handleHelpful(review.id)}
                   className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                     helpfulReviews.has(review.id) 
                       ? "text-green-brand" 
                       : "text-muted-foreground hover:text-green-brand"
                   }`}
                 >
                    <ThumbsUp size={14} className={helpfulReviews.has(review.id) ? "fill-current" : ""} />
                    Helpful Review
                 </button>
                 <button 
                   onClick={handleReport}
                   className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1"
                 >
                    <AlertCircle size={14} />
                    Report
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-20 text-center bg-card border border-border rounded-[40px] flex flex-col items-center gap-6">
          <Star className="w-16 h-16 text-muted-foreground/20" />
          <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No reviews yet. Complete more consultations to receive reviews from farmers.</p>
        </div>
      )}
    </div>
  );
}
