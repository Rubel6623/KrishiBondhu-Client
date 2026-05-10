import { getSingleEquipment } from "@/services/equipment";
import { 
  Tractor, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Clock, 
  Calendar, 
  CircleDollarSign, 
  Tag, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2,
  Phone,
  LayoutDashboard
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import BookingCard from "@/components/equipment/BookingCard";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: item } = await getSingleEquipment(id);
  return {
    title: `${item?.title || "Equipment Details"} — KrishiBondhu`,
    description: item?.description || "Modern agricultural equipment for rent in Bangladesh.",
  };
}

export default async function EquipmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: item } = await getSingleEquipment(id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <ShieldCheck className="w-16 h-16 text-red-500 mx-auto opacity-20" />
          <h2 className="text-2xl font-serif font-bold text-foreground">Equipment Not Found</h2>
          <p className="text-muted-foreground">The equipment you are looking for might have been removed or is unavailable.</p>
          <p className="text-xs text-muted-foreground">ID: {id}</p>
          <Link href="/equipment">
            <Button variant="outline" className="rounded-xl px-8">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const primaryImage = item.images?.[0] || "https://images.unsplash.com/photo-1593110050241-ee7ce35e9701?auto=format&fit=crop&q=80&w=800";

  return (
    <main className="min-h-screen bg-background pt-[var(--nav-h)] pb-20 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-green-brand/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} className="opacity-50" />
          <Link href="/equipment" className="hover:text-primary transition-colors">Marketplace</Link>
          <ChevronRight size={14} className="opacity-50" />
          <span className="text-foreground truncate max-w-[200px]">{item.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          {/* Left Column: Media & Details */}
          <div className="space-y-10">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[16/9] w-full rounded-[40px] overflow-hidden border-4 border-card shadow-2xl group">
                <Image
                  src={primaryImage}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-green-brand/90 backdrop-blur-md text-white border-none px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl">
                    Excellent Condition
                  </Badge>
                </div>
              </div>
              
              {/* Thumbnail strip (mocking additional images if they don't exist) */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {(item.images || [primaryImage, primaryImage, primaryImage]).map((img: string, idx: number) => (
                  <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-transparent hover:border-green-brand transition-all cursor-pointer shrink-0">
                    <Image src={img} alt={`${item.title} thumbnail`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Title & Stats */}
            <div className="bg-card border border-border rounded-[40px] p-8 md:p-10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-brand/5 blur-[60px] rounded-full -mr-16 -mt-16" />
               
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                 <div className="space-y-2">
                   <h1 className="text-[clamp(32px,4vw,48px)] font-serif font-black leading-tight text-foreground">
                     {item.title}
                   </h1>
                   <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-green-brand" />
                        <span className="text-sm font-bold">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Tag size={16} className="text-gold" />
                        <span className="text-sm font-bold uppercase tracking-widest">{item.category?.name || "Tillage"}</span>
                      </div>
                   </div>
                 </div>
                 
                 <div className="text-left md:text-right">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Rental Price</p>
                    <div className="flex items-baseline gap-2 md:justify-end">
                      <span className="text-4xl font-serif font-black text-green-brand">৳{item.pricePerDay}</span>
                      <span className="text-sm font-bold text-muted-foreground">/ Day</span>
                    </div>
                 </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-muted/30 rounded-3xl border border-border/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                       <Clock size={14} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Availability</span>
                    </div>
                    <p className="text-sm font-bold text-foreground">Instant</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                       <ShieldCheck size={14} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Safety</span>
                    </div>
                    <p className="text-sm font-bold text-foreground">Insured</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                       <CircleDollarSign size={14} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Deposit</span>
                       </div>
                    <p className="text-sm font-bold text-foreground">Ref. 5,000</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                       <Star size={14} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Rating</span>
                    </div>
                    <p className="text-sm font-bold text-foreground">4.9 (24)</p>
                  </div>
               </div>
            </div>

            {/* Description */}
            <div className="space-y-6 px-4">
               <h3 className="text-2xl font-serif font-bold text-foreground flex items-center gap-3">
                 Description
                 <div className="h-0.5 flex-1 bg-gradient-to-r from-green-brand/20 to-transparent rounded-full" />
               </h3>
               <div className="text-lg text-text-muted leading-relaxed space-y-4">
                 {item.description || "No description provided for this equipment. Please contact the provider for more details about capacity and technical specifications."}
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {[
                    "Regular maintenance performed",
                    "Operator included in price",
                    "Fuel costs are separate",
                    "Emergency support available 24/7"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl">
                      <CheckCircle2 className="text-green-brand shrink-0" size={18} />
                      <span className="text-sm font-bold text-foreground">{feature}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Column: Provider & Booking */}
          <div className="space-y-8">
            {/* Booking Card */}
            <BookingCard item={item} />

               <div className="mt-10 pt-10 border-t border-border">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-16 h-16 border-4 border-muted rounded-2xl">
                      <AvatarImage src={item.provider?.avatar} alt={item.provider?.name} />
                      <AvatarFallback className="bg-green-brand/10 text-green-brand text-2xl font-black">
                        {item.provider?.name?.[0] || 'P'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-serif font-black text-foreground">{item.provider?.name}</p>
                        <ShieldCheck size={14} className="text-green-brand" />
                      </div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Professional Provider</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full h-12 rounded-xl border-border hover:bg-muted font-bold flex gap-3">
                       <MessageSquare size={16} />
                       Message Provider
                    </Button>
                    <Button variant="ghost" className="w-full h-12 rounded-xl text-primary font-bold flex gap-3 hover:bg-primary/5">
                       <Phone size={16} />
                       Call Provider
                    </Button>
                  </div>
               </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-gold/5 border border-gold/20 rounded-[32px] p-6 space-y-4">
               <h5 className="text-sm font-black text-gold uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Safe Rental Tips
               </h5>
               <ul className="space-y-2 text-xs text-gold/80 font-medium">
                  <li className="flex gap-2"><span>•</span> Always inspect the machine on delivery</li>
                  <li className="flex gap-2"><span>•</span> Keep booking records within the platform</li>
                  <li className="flex gap-2"><span>•</span> Report any technical issues immediately</li>
               </ul>
            </div>
          </div>
        </div>
    </main>
  );
}

