import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy — KrishiBondhu" };
export default function PrivacyPolicyPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Legal</div>
          <h1 className="section-h2">Privacy <em>Policy</em></h1>
          <p className="section-desc">Learn how KrishiBondhu collects, uses, and protects your personal information.</p>
        </div>
      </section>
    </main>
  );
}
