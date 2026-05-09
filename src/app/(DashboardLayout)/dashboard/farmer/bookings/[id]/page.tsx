import type { Metadata } from "next";
export const metadata: Metadata = { title: "Booking Details — KrishiBondhu" };
export default function FarmerBookingDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="section-label">Farmer · Booking Details</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Booking <em>#{params.id}</em></h1>
      <p className="section-desc">Full details for this equipment rental booking.</p>
    </div>
  );
}
