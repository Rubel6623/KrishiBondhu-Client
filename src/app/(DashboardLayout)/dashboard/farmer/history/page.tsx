import type { Metadata } from "next";
export const metadata: Metadata = { title: "Activity History — KrishiBondhu" };
export default function FarmerHistoryPage() {
  return (
    <div>
      <div className="section-label">Farmer · History</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Activity <em>History</em></h1>
      <p className="section-desc">A full log of your past bookings, payments, and platform activity.</p>
    </div>
  );
}
