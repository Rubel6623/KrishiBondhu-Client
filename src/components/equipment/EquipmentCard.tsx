"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Zap, Info } from "lucide-react";

interface EquipmentCardProps {
  item: {
    id: string;
    name: string;
    pricePerDay: number;
    location: string;
    images: string[];
    category: { name: string };
    provider: { name: string; avatar?: string };
    avgRating?: number;
    availabilityStatus: string;
  };
}

export default function EquipmentCard({ item }: EquipmentCardProps) {
  return (
    <div className="group relative bg-white dark:bg-white/5 backdrop-blur-md border border-black/6 dark:border-white/10 rounded-[28px] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(45,138,82,0.15)] hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-[240px] overflow-hidden">
        <Image
          src={item.images?.[0] || "https://images.unsplash.com/photo-1593110050241-ee7ce35e9701?auto=format&fit=crop&q=80&w=800"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-green-deep/80 backdrop-blur-md text-[11px] font-bold text-green-brand dark:text-green-bright uppercase tracking-wider shadow-sm">
            {item.category?.name}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-green-brand text-white px-5 py-2 rounded-2xl font-bold shadow-lg">
            ৳{item.pricePerDay}
            <span className="text-[10px] font-normal opacity-80 block leading-tight">per day</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-serif text-xl font-bold text-green-deep dark:text-white line-clamp-1 group-hover:text-green-brand transition-colors">
            {item.name}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-[13px] text-text-muted mb-5">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-green-brand" />
            {item.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-[#f5a623] fill-[#f5a623]" />
            {item.avgRating || "4.5"}
          </span>
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-green-pale">
               {item.provider?.avatar ? (
                  <Image src={item.provider.avatar} alt={item.provider.name} fill className="object-cover" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center text-green-brand font-bold text-xs">
                    {item.provider?.name?.charAt(0)}
                  </div>
               )}
            </div>
            <span className="text-[12px] font-medium text-text-mid dark:text-text-muted">
              {item.provider?.name}
            </span>
          </div>
          
          <Link 
            href={`/equipment/${item.id}`}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-pale dark:bg-white/5 text-green-brand hover:bg-green-brand hover:text-white transition-all duration-300 shadow-sm"
          >
            <Info size={18} />
          </Link>
        </div>
      </div>

      {/* Hover Status */}
      <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
         <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-bright text-white text-[10px] font-bold uppercase tracking-tighter">
            <Zap size={10} fill="white" />
            Available
         </div>
      </div>
    </div>
  );
}
