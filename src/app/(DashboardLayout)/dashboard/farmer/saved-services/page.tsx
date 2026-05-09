import type { Metadata } from "next";
export const metadata: Metadata = { title: "Saved Services — KrishiBondhu" };
export default function FarmerSavedServicesPage() {
  return (
    <div>
      <div className="section-label">Farmer · Saved</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Saved <em>Services</em></h1>
      <p className="section-desc">Quickly re-book your favourite equipment and services.</p>
    </div>
  );
}
