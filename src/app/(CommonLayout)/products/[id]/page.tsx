"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Leaf, 
  MapPin, 
  Star, 
  Zap, 
  ShieldCheck, 
  ChevronLeft, 
  Share2, 
  Heart,
  Calendar,
  Clock,
  CheckCircle2,
  Tractor,
  Droplets,
  Wrench,
  Info
} from "lucide-react";
import { Button } from "../../../../components/ui/button";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data for the demonstration
  const product = {
    id: id as string,
    name: "Kubota MU4501 2WD Tractor",
    emoji: "🚜",
    price: 1200,
    unit: "day",
    rating: 4.9,
    reviews: 128,
    location: "Rajshahi Sadar, Rajshahi",
    provider: {
      name: "Agro Solutions BD",
      rating: 4.9,
      isVerified: true,
      memberSince: "2023",
      avatar: "🚜"
    },
    images: ["🚜", "🚜", "🚜"],
    description: "The Kubota MU4501 is a versatile and powerful tractor designed for high performance in Bangladeshi fields. Perfect for plowing, tilling, and heavy-duty transportation. Equipped with a fuel-efficient engine and easy-to-operate controls.",
    specs: [
      { label: "Engine Power", value: "45 HP" },
      { label: "Fuel Tank", value: "60 Liters" },
      { label: "Transmission", value: "8 Forward + 4 Reverse" },
      { label: "Lift Capacity", value: "1640 kg" },
      { label: "Drive Type", value: "2WD" }
    ],
    features: [
      "Low Fuel Consumption",
      "Power Steering",
      "Dual Clutch",
      "Oil Immersed Brakes"
    ],
    amenities: [
      { icon: <Clock size={16} />, label: "Instant Booking" },
      { icon: <ShieldCheck size={16} />, label: "Insurance Covered" },
      { icon: <Wrench size={16} />, label: "Maintenance Included" }
    ]
  };

  return (
    <main className="min-h-screen pt-[var(--nav-h)] bg-cream dark:bg-surface-1 pb-20">
      <div className="max-w-[1280px] mx-auto px-[5%]">
        {/* Breadcrumbs */}
        <div className="py-6 flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-green-brand transition-colors">Home</Link>
          <ChevronLeft size={14} className="rotate-180" />
          <Link href="/equipment" className="hover:text-green-brand transition-colors">Equipment</Link>
          <ChevronLeft size={14} className="rotate-180" />
          <span className="text-text-dark dark:text-white font-medium truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
          {/* Left Column: Visuals & Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-card-bg rounded-[32px] overflow-hidden border border-black/5 dark:border-white/5 shadow-sm">
              <div className="relative aspect-video bg-green-pale dark:bg-green-deep/20 flex items-center justify-center text-[120px]">
                {product.images[selectedImage]}
                <div className="absolute top-6 right-6 flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md flex items-center justify-center text-text-dark dark:text-white shadow-sm hover:scale-110 transition-transform">
                    <Share2 size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md flex items-center justify-center text-red-500 shadow-sm hover:scale-110 transition-transform">
                    <Heart size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4 flex gap-4 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`shrink-0 w-24 h-20 rounded-xl flex items-center justify-center text-4xl border-2 transition-all ${selectedImage === idx ? "border-green-brand bg-green-pale/50" : "border-transparent bg-gray-50 dark:bg-white/5"}`}
                  >
                    {img}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-serif font-black text-text-dark dark:text-white mb-4">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-green-brand font-bold bg-green-pale px-3 py-1 rounded-full">
                    <Star size={14} className="fill-green-brand" /> {product.rating} ({product.reviews} reviews)
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <MapPin size={16} /> {product.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-green-mid font-medium">
                    <Zap size={16} /> 24/7 Support Available
                  </div>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold text-text-dark dark:text-white flex items-center gap-2">
                  <Info size={20} className="text-green-brand" /> Description
                </h3>
                <p className="text-text-muted leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5">
                    <div className="text-xs text-text-muted uppercase tracking-wider mb-1">{spec.label}</div>
                    <div className="text-base font-bold text-text-dark dark:text-white">{spec.value}</div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-bold text-text-dark dark:text-white mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-text-mid dark:text-text-muted">
                      <CheckCircle2 size={18} className="text-green-brand" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:sticky lg:top-[100px] h-fit">
            <div className="p-8 rounded-[32px] border-none shadow-2xl bg-white dark:bg-card-bg overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-green-brand" />
              
              <div className="flex justify-between items-end mb-8">
                <div>
                  <div className="text-[32px] font-serif font-black text-green-deep dark:text-green-bright leading-none">৳{product.price}</div>
                  <div className="text-text-muted text-sm mt-1">per {product.unit}, inclusive of tax</div>
                </div>
                <div className="text-xs bg-gold/10 text-gold font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                  Price Match Guarantee
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-2xl bg-cream dark:bg-surface-1 border border-black/5 dark:border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-muted flex items-center gap-2">
                      <Calendar size={16} /> Rental Period
                    </span>
                    <span className="text-sm font-bold text-green-brand underline cursor-pointer">Edit</span>
                  </div>
                  <div className="text-[15px] font-bold text-text-dark dark:text-white">
                    May 15, 2025 - May 18, 2025 (3 Days)
                  </div>
                </div>

                <div className="space-y-3">
                  {product.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-text-mid dark:text-text-muted">
                      <div className="w-8 h-8 rounded-full bg-green-pale flex items-center justify-center text-green-brand shrink-0">
                        {item.icon}
                      </div>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full h-14 rounded-2xl bg-green-brand hover:bg-green-mid text-white text-lg font-bold shadow-lg shadow-green-brand/20 transition-all active:scale-[0.98] mb-4">
                Confirm Booking
              </Button>
              <p className="text-center text-xs text-text-muted">
                You won&apos;t be charged yet
              </p>

              <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-pale flex items-center justify-center text-2xl">
                    {product.provider.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-text-dark dark:text-white text-sm">{product.provider.name}</span>
                      {product.provider.isVerified && <ShieldCheck size={14} className="text-green-brand" />}
                    </div>
                    <div className="text-xs text-text-muted">Member since {product.provider.memberSince} · ⭐ {product.provider.rating}</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6 rounded-xl border-green-brand/30 text-green-brand font-semibold hover:bg-green-brand hover:text-white">
                  Contact Provider
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
