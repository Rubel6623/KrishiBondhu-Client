"use client";

import React, { useState } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/services/bookings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BookingCard({ item }: { item: any }) {
  const [isBooking, setIsBooking] = useState(false);
  const router = useRouter();

  const handleBook = async () => {
    setIsBooking(true);
    
    // For a simple booking, we'll assume a 1-day rental starting tomorrow.
    // In a full implementation, you'd have a date picker here.
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const bookingData = {
      equipmentId: item.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    const result = await createBooking(bookingData);
    
    if (result.success) {
      toast.success("Booking Request Sent!", {
        description: "The provider will review and accept your request soon."
      });
      router.push("/dashboard/farmer"); // Or wherever the farmer tracks bookings
    } else {
      toast.error("Booking Failed", {
        description: result.message || "Something went wrong."
      });
    }
    
    setIsBooking(false);
  };

  return (
    <div className="bg-card border-2 border-green-brand/20 rounded-[40px] p-8 shadow-2xl shadow-green-brand/5 sticky top-32">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-lg font-serif font-black text-foreground">Secure Booking</h4>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-green-brand animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-green-brand/40" />
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="p-4 bg-muted/30 rounded-2xl border border-border space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Price</p>
            <p className="text-2xl font-black text-foreground">৳{item.pricePerDay || item.price} <span className="text-sm font-medium text-muted-foreground">per day</span></p>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-green-brand/5 border border-green-brand/10 rounded-2xl">
          <Calendar size={18} className="text-green-brand" />
          <div>
            <p className="text-xs font-bold text-green-deep">Estimated Delivery</p>
            <p className="text-[10px] font-medium text-green-brand/70">Within 12-24 Hours</p>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleBook}
        disabled={isBooking}
        className="w-full h-16 rounded-[20px] bg-green-brand hover:bg-green-deep text-white text-lg font-black uppercase tracking-[0.2em] shadow-xl shadow-green-brand/30 transition-all hover:-translate-y-1 mb-4 disabled:opacity-70 disabled:pointer-events-none"
      >
        {isBooking ? <Loader2 className="animate-spin w-6 h-6 mx-auto" /> : "Proceed to Book"}
      </Button>
      
      <p className="text-[10px] text-center text-muted-foreground font-medium">
        No payment will be charged yet. You can discuss details with the provider first.
      </p>
    </div>
  );
}
