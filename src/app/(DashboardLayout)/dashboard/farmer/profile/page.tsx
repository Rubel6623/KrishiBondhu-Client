import type { Metadata } from "next";
export const metadata: Metadata = { title: "Farmer Profile — KrishiBondhu" };
export default function FarmerProfilePage() {
  return (
    <div>
      <div className="section-label">Farmer · Profile</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Farmer <em>Profile</em></h1>
      <p className="section-desc">Update your personal details, location, and farm information.</p>
    </div>
  );
}
