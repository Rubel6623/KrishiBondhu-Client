import type { Metadata } from "next";
export const metadata: Metadata = { title: "Equipment Moderation — KrishiBondhu Admin" };
export default function AdminEquipmentPage() {
  return (
    <div>
      <div className="section-label">Admin · Equipment</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Equipment <em>Moderation</em></h1>
      <p className="section-desc">Review, approve, or reject equipment listings submitted by providers.</p>
    </div>
  );
}
