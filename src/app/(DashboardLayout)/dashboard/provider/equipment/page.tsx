import type { Metadata } from "next";
export const metadata: Metadata = { title: "My Equipment — KrishiBondhu" };
export default function ProviderEquipmentPage() {
  return (
    <div>
      <div className="section-label">Provider · Equipment</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>My <em>Equipment</em></h1>
      <p className="section-desc">Manage all your listed equipment, pricing, and availability.</p>
    </div>
  );
}
