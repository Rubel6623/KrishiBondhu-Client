import type { Metadata } from "next";
export const metadata: Metadata = { title: "Add Equipment — KrishiBondhu" };
export default function ProviderEquipmentCreatePage() {
  return (
    <div>
      <div className="section-label">Provider · Equipment</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Add New <em>Equipment</em></h1>
      <p className="section-desc">List a new piece of equipment to start receiving rental bookings.</p>
    </div>
  );
}
