"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Leaf, 
  Award, 
  MessageCircle, 
  Video, 
  Clock, 
  ShieldCheck,
  Star,
  ArrowUpRight,
  Sparkles,
  Loader2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllSpecialists } from "@/services/specialist";

const staticSpecialists = [
  {
    name: "Dr. Rakibul Hasan",
    title: "Senior Veterinarian",
    expertise: "Livestock Healthcare",
    experience: "12+ Years",
    rating: "4.9",
    reviews: 1240,
    status: "Online",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop",
    tags: ["Cattle", "Poultry", "Surgery"]
  },
  {
    name: "Dr. Sumaiya Akter",
    title: "Plant Pathologist",
    expertise: "Crop Disease Specialist",
    experience: "8 Years",
    rating: "4.8",
    reviews: 890,
    status: "Consulting",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=1000&auto=format&fit=crop",
    tags: ["Rice", "Wheat", "Organic"]
  },
  {
    name: "Dr. Amitav Ghosh",
    title: "Soil Scientist",
    expertise: "Soil Fertility & Health",
    experience: "15+ Years",
    rating: "5.0",
    reviews: 2100,
    status: "Online",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1000&auto=format&fit=crop",
    tags: ["Ph Tests", "Nutrient Mgmt", "Fertilizer"]
  }
];

export default function SpecialistsSection() {
  const [specialistList, setSpecialistList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const res = await getAllSpecialists({ limit: 3 });
        const dataArray = res.data?.data || res.data || [];

        if (res.success && Array.isArray(dataArray) && dataArray.length > 0) {
          const mapped = dataArray.slice(0, 3).map((item: any, idx: number) => ({
            id: item.id,
            name: item.user?.name || "Expert Specialist",
            title: item.specialization || "Agricultural Expert",
            expertise: item.qualifications || "Farming Consultant",
            experience: `${item.experienceYears || 5}+ Years`,
            rating: "4.9", // Static for now
            reviews: Math.floor(Math.random() * 1000) + 100,
            status: idx % 2 === 0 ? "Online" : "Consulting",
            image: item.user?.avatar || staticSpecialists[idx % staticSpecialists.length].image,
            tags: item.specialization ? item.specialization.split(',').slice(0, 3) : ["Expert", "Farming"]
          }));
          setSpecialistList(mapped);
        } else {
          setSpecialistList(staticSpecialists);
        }
      } catch (error) {
        console.error("Failed to fetch specialists:", error);
        setSpecialistList(staticSpecialists);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecialists();
  }, []);
  return (
    <section className="py-24 px-[5%] relative overflow-hidden bg-background">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-brand/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-green-brand mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Expert Support
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif font-black text-foreground leading-tight"
            >
              VETERINARIAN <br />
              <span className="text-green-deep dark:text-green-light">SPECIALIST</span> <em className="italic text-gold not-italic">Consultation</em>
            </motion.h2>
            <p className="mt-6 text-lg text-muted-foreground font-medium max-w-lg">
              Get professional advice from certified veterinarians and agricultural experts to ensure your farm's health and productivity.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/specialists">
              <button className="px-8 py-4 rounded-2xl bg-muted border border-border hover:bg-zinc-950 hover:text-white transition-all font-black text-xs uppercase tracking-widest flex items-center gap-2 group">
                View All Experts
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Specialists Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-green-brand w-10 h-10" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialistList.map((specialist, index) => (
              <motion.div
                key={specialist.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-zinc-950 rounded-[40px] border border-border p-8 hover:shadow-2xl hover:border-green-brand/30 transition-all relative flex flex-col justify-between"
              >
                {/* Profile Image & Status */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-[32px] overflow-hidden border-2 border-green-brand/20 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    <img 
                      src={specialist.image} 
                      alt={specialist.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                    specialist.status === 'Online' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {specialist.status}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-4 flex-1 flex flex-col">
                  <div>
                     <h3 className="text-2xl font-serif font-black text-foreground group-hover:text-green-brand transition-colors">{specialist.name}</h3>
                     <p className="text-sm font-bold text-green-brand/80 mt-1">{specialist.title}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                     {specialist.tags.map((tag: string) => (
                       <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-muted text-muted-foreground group-hover:bg-green-brand/10 group-hover:text-green-brand transition-colors">
                         {tag}
                       </span>
                     ))}
                  </div>

                  <div className="pt-6 border-t border-border grid grid-cols-2 gap-4 mt-auto">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Experience</p>
                        <p className="text-sm font-bold text-foreground">{specialist.experience}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rating</p>
                        <p className="text-sm font-bold text-foreground flex items-center gap-1">
                          <Star className="w-3 h-3 text-gold fill-gold" /> {specialist.rating} ({specialist.reviews})
                        </p>
                     </div>
                  </div>

                  <Link href={`/specialists/${specialist.id || ''}`}>
                    <button className="w-full py-4 mt-6 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black font-black text-xs uppercase tracking-widest hover:bg-green-brand dark:hover:bg-green-brand hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg shadow-green-brand/20">
                       <MessageCircle className="w-4 h-4" />
                       Start Consultation
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { icon: Video, label: "Video Call Support", color: "bg-blue-500" },
             { icon: ShieldCheck, label: "Certified Experts", color: "bg-green-500" },
             { icon: Clock, label: "24/7 Availability", color: "bg-amber-500" },
             { icon: Leaf, label: "Organic Solutions", color: "bg-emerald-500" },
           ].map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="flex items-center gap-4 p-6 rounded-3xl bg-muted/50 border border-border/50 hover:bg-white dark:hover:bg-zinc-900 transition-all shadow-sm"
             >
               <div className={`p-3 rounded-2xl ${item.color} text-white`}>
                  <item.icon className="w-5 h-5" />
               </div>
               <span className="text-xs font-black uppercase tracking-widest text-foreground/80">{item.label}</span>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
