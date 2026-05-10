"use client";

import { useState } from "react";
import { CalendarDays, Loader2 } from "lucide-react";
import { createAppointment } from "@/services/appointments";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BookAppointmentButton({ specialistId, className }: { specialistId: string, className?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBook = async () => {
    setIsLoading(true);
    
    // Defaulting to tomorrow's date for simplicity, can be expanded with a date picker
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + 1);

    const result = await createAppointment({
      specialistId,
      appointmentDate: appointmentDate.toISOString(),
      problemDesc: "Initial consultation for farming needs."
    });

    if (result.success) {
      toast.success("Appointment Booked!", {
        description: "The specialist will review and confirm your request soon."
      });
      router.push("/dashboard/farmer");
    } else {
      toast.error(result.message || "Failed to book appointment");
    }
    
    setIsLoading(false);
  };

  return (
    <button 
      onClick={handleBook}
      disabled={isLoading}
      className={className || "w-full h-16 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black uppercase tracking-widest text-xs hover:bg-black dark:hover:bg-gray-200 transition-all shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"}
    >
      {isLoading ? (
        <Loader2 size={18} className="ml-8 text-center  animate-spin" />
      ) : (
        <>
          Book Appointment
        </>
      )}
    </button>
  );
}
