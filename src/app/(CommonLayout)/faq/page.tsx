import type { Metadata } from "next";
export const metadata: Metadata = { title: "FAQ — KrishiBondhu" };
export default function FaqPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">FAQ</div>
          <h1 className="section-h2">Frequently Asked <em>Questions</em></h1>
          <p className="section-desc">Find answers to common questions about renting equipment, booking processes, and provider registration.</p>
        </div>
      </section>
    </main>
  );
}
