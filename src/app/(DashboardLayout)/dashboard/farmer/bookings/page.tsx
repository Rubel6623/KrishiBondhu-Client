import type { Metadata } from "next";
export const metadata: Metadata = { title: "My Bookings — KrishiBondhu" };
export default function FarmerBookingsPage() {
  return (
    <div>
      <div className="section-label">Farmer · Bookings</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>My <em>Bookings</em></h1>
      <p className="section-desc">Track the status of all your equipment rental bookings.</p>
    </div>
  );
}
