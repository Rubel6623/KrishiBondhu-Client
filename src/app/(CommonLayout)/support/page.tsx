import type { Metadata } from "next";
export const metadata: Metadata = { title: "Support — KrishiBondhu" };
export default function SupportPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Help Center</div>
          <h1 className="section-h2">Help &amp; <em>Support</em></h1>
          <p className="section-desc">Our support team is available 7 days a week to assist you with any issues.</p>
        </div>
      </section>
    </main>
  );
}
