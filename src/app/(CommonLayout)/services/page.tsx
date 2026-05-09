import type { Metadata } from "next";
export const metadata: Metadata = { title: "Services — KrishiBondhu" };
export default function ServicesPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Services</div>
          <h1 className="section-h2">Everything Your <em>Farm Needs</em></h1>
          <p className="section-desc">From equipment rental to AI-powered crop assistance, we offer a complete suite of agricultural services.</p>
        </div>
      </section>
    </main>
  );
}
