import ReceivedBookings from "@/components/dashboard/provider/ReceivedBookings";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Booking Requests — KrishiBondhu" };

export default function ProviderBookingsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
          Booking <em className="italic text-green-brand not-italic">Requests</em>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 font-medium">Manage incoming rental requests, approve or decline them based on availability.</p>
      </div>

      <ReceivedBookings />
    </div>
  );
}
