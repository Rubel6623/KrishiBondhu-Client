import type { Metadata } from "next";
export const metadata: Metadata = { title: "Equipment Details — KrishiBondhu" };
export default function EquipmentDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Equipment Details</div>
          <h1 className="section-h2">Equipment <em>Information</em></h1>
          <p className="section-desc">ID: {params.id}</p>
        </div>
      </section>
    </main>
  );
}
