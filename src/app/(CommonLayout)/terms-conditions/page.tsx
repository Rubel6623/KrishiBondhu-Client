import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms & Conditions — KrishiBondhu" };
export default function TermsConditionsPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Legal</div>
          <h1 className="section-h2">Terms &amp; <em>Conditions</em></h1>
          <p className="section-desc">Read the terms and conditions governing your use of the KrishiBondhu platform.</p>
        </div>
      </section>
    </main>
  );
}
