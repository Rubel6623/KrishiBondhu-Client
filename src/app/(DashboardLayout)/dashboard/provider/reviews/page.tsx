"use client";

import { useEffect, useState } from "react";
import { 
  Star, 
  MessageSquare, 
  User, 
  Calendar,
  Loader2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { getMyReviews } from "@/services/reviews";

export default function ProviderReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      const res = await getMyReviews();
      if (res.success) setReviews(res.data);
      setIsLoading(false);
    };
    fetchReviews();

    // Socket listener for real-time review updates
    const token = document.cookie
      .split("; ")
      .find((r) => r.startsWith("token="))
      ?.split("=")[1];
    
    if (token) {
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
        auth: { token },
        path: "/socket.io",
        transports: ["websocket"],
      });

      socket.on("new_review", (review: any) => {
        setReviews(prev => [review, ...prev]);
        toast.success("New Review Received!", {
          description: "A customer just left feedback for your equipment."
        });
        router.refresh();
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-green-brand" size={40} />
        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Loading feedback...</p>
      </div>
    );
  }

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
    : "0.0";

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            Customer <em className="italic text-green-brand not-italic">Reviews</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">See what farmers are saying about your equipment and services.</p>
        </div>
        
        <div className="bg-card border border-border px-8 py-4 rounded-3xl flex items-center gap-4 shadow-sm">
           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold shadow-inner">
              <Star className="w-7 h-7 fill-gold" />
           </div>
           <div>
              <p className="text-2xl font-black text-foreground">{avgRating}</p>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Global Rating</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="bg-card border border-border p-8 rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-green-brand/5 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-pale flex items-center justify-center text-green-brand font-bold text-lg">
                    {review.user?.name?.charAt(0) || "F"}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{review.user?.name || "Farmer"}</h4>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-1 mt-1">
                      <Calendar size={12} /> {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={14} 
                      className={star <= review.rating ? "text-gold fill-gold" : "text-gray-200 dark:text-white/10"} 
                    />
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 relative">
                 <MessageSquare className="absolute -top-3 -left-3 text-green-brand/20 w-10 h-10 -z-0" />
                 <p className="text-sm text-foreground leading-relaxed relative z-10 italic">
                   "{review.comment || "Great equipment and excellent service from the provider. Highly recommended!"}"
                 </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex items-center gap-2">
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Reviewed for:</p>
                 <span className="text-[10px] font-black text-green-brand uppercase tracking-widest bg-green-brand/10 px-2 py-1 rounded-md">
                   {review.equipment?.title || "Machinery"}
                 </span>
              </div>
            </div>
          ))
        ) : (
          <div className="lg:col-span-2 bg-card border border-border rounded-[40px] p-20 text-center flex flex-col items-center gap-6 shadow-sm">
            <div className="w-24 h-24 rounded-full bg-green-brand/5 flex items-center justify-center text-green-brand">
              <Star size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-black text-foreground">No Reviews Yet</h3>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">Provide excellent service and high-quality equipment to start receiving positive feedback.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
