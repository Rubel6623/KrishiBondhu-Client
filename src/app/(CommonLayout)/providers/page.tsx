import type { Metadata } from "next";
export const metadata: Metadata = { title: "Providers — KrishiBondhu" };
export default function ProvidersPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Providers</div>
          <h1 className="section-h2">Verified &amp; Trusted <em>Equipment Partners</em></h1>
          <p className="section-desc">Browse our network of certified equipment providers across Bangladesh.</p>
        </div>
      </section>
    </main>
  );
}
