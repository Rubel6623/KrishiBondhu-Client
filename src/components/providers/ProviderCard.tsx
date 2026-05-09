"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Package, CheckCircle2 } from "lucide-react";

interface ProviderCardProps {
  provider: {
    id: string;
    name: string;
    email: string;
    location?: string;
    avatar?: string;
    isVerified?: boolean;
    equipment?: any[];
  };
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const equipmentCount = provider.equipment?.length || 0;
  
  // Calculate avg rating from equipment if available (mocking for now if not present)
  const avgRating = "4.8";
  
  return (
    <div className="group bg-white dark:bg-card-bg backdrop-blur-md border border-black/6 dark:border-white/10 rounded-[28px] p-6 hover:shadow-[0_20px_50px_rgba(45,138,82,0.15)] hover:-translate-y-1 transition-all duration-500">
      <div className="flex items-start gap-4 mb-6">
        <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-green-pale">
          {provider.avatar ? (
            <Image src={provider.avatar} alt={provider.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-green-brand font-serif text-2xl">
              {provider.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif text-[18px] font-bold text-green-deep dark:text-white line-clamp-1 group-hover:text-green-brand transition-colors">
              {provider.name}
            </h3>
            {provider.isVerified && (
              <CheckCircle2 size={16} className="text-green-brand fill-green-pale" />
            )}
          </div>
          <p className="text-[13px] text-text-muted flex items-center gap-1.5 mb-2">
            <MapPin size={14} className="text-green-brand" />
            {provider.location || "Bangladesh"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-green-pale/50 dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
           <div className="text-[20px] font-bold text-green-deep dark:text-white flex items-center gap-1">
              <Star size={16} className="text-[#f5a623] fill-[#f5a623]" /> {avgRating}
           </div>
           <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mt-1">Rating</div>
        </div>
        <div className="bg-green-pale/50 dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
           <div className="text-[20px] font-bold text-green-deep dark:text-white flex items-center gap-1">
              <Package size={16} className="text-green-brand" /> {equipmentCount}
           </div>
           <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mt-1">Equipment</div>
        </div>
      </div>

      <Link 
        href={`/providers/${provider.id}`}
        className="w-full py-3.5 rounded-xl border border-black/10 dark:border-white/10 text-center font-bold text-[14px] text-green-deep dark:text-white hover:bg-green-brand hover:text-white hover:border-green-brand transition-all block"
      >
        View Profile
      </Link>
    </div>
  );
}
