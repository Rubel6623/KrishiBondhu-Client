import type { Metadata } from "next";
export const metadata: Metadata = { title: "Edit Equipment — KrishiBondhu" };
export default function ProviderEquipmentEditPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="section-label">Provider · Equipment</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Edit <em>Equipment</em></h1>
      <p className="section-desc">Update details for equipment ID: {params.id}</p>
    </div>
  );
}
