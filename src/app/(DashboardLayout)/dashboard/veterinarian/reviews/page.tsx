"use client";

import { motion } from "framer-motion";
import { 
  Star, 
  MessageSquare, 
  User, 
  Calendar,
  Quote,
  ThumbsUp,
  AlertCircle
} from "lucide-react";

const mockReviews = [
  { id: "r1", user: "Md. Abdul Karim", rating: 5, comment: "Dr. Sujon is very helpful. He diagnosed my cow's fever accurately via video call and the medicine worked within 2 days.", date: "May 08, 2026" },
  { id: "r2", user: "Rahima Khatun", rating: 5, comment: "Very professional. She explained everything clearly about the vaccination schedule for my goats.", date: "May 05, 2026" },
  { id: "r3", user: "Sujon Ahmed", rating: 4, comment: "Good experience. The connection was a bit laggy but the advice was solid.", date: "May 02, 2026" },
  { id: "r4", user: "Mofiz Uddin", rating: 5, comment: "Extremely knowledgeable. Saved my cattle during an emergency. Highly recommended!", date: "Apr 28, 2026" },
];

export default function VeterinarianReviews() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            Patient <em className="italic text-green-brand not-italic">Feedback</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">See how farmers value your expert consultations.</p>
        </div>
        
        <div className="bg-card border border-border px-8 py-5 rounded-[32px] flex items-center gap-6 shadow-sm">
           <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold shadow-inner">
              <Star className="w-8 h-8 fill-gold" />
           </div>
           <div>
              <p className="text-3xl font-black text-foreground">4.9</p>
              <div className="flex gap-0.5 mt-0.5">
                 {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-gold text-gold" />)}
              </div>
              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">Average Performance</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockReviews.map((review, index) => (
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
               <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-green-brand transition-colors">
                  <ThumbsUp size={14} />
                  Helpful Review
               </button>
               <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1">
                  <AlertCircle size={14} />
                  Report
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
