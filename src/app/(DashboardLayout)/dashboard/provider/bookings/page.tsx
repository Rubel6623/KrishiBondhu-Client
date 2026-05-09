import type { Metadata } from "next";
export const metadata: Metadata = { title: "Booking Requests — KrishiBondhu" };
export default function ProviderBookingsPage() {
  return (
    <div>
      <div className="section-label">Provider · Bookings</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Booking <em>Requests</em></h1>
      <p className="section-desc">Review and manage all incoming equipment rental requests.</p>
    </div>
  );
}
