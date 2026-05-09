import type { Metadata } from "next";
export const metadata: Metadata = { title: "Equipment Marketplace — KrishiBondhu" };
export default function EquipmentPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Equipment Marketplace</div>
          <h1 className="section-h2">Find Equipment <em>Near You</em></h1>
          <p className="section-desc">Browse 2,500+ agricultural equipment listings from verified providers across all 64 districts of Bangladesh.</p>
        </div>
      </section>
    </main>
  );
}
