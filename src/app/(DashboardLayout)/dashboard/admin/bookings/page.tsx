import type { Metadata } from "next";
export const metadata: Metadata = { title: "Booking Management — KrishiBondhu Admin" };
export default function AdminBookingsPage() {
  return (
    <div>
      <div className="section-label">Admin · Bookings</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Booking <em>Management</em></h1>
      <p className="section-desc">Monitor and moderate all equipment rental bookings across the platform.</p>
    </div>
  );
}
