import type { Metadata } from "next";
export const metadata: Metadata = { title: "Provider Profile — KrishiBondhu" };
export default function ProviderDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Provider Profile</div>
          <h1 className="section-h2">Provider <em>Details</em></h1>
          <p className="section-desc">ID: {params.id}</p>
        </div>
      </section>
    </main>
  );
}
