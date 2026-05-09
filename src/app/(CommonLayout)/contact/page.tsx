import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contact — KrishiBondhu" };
export default function ContactPage() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Contact Us</div>
          <h1 className="section-h2">Get In <em>Touch</em></h1>
          <p className="section-desc">Have a question? Our team is ready to help you with equipment rentals, provider onboarding, or any other queries.</p>
        </div>
      </section>
    </main>
  );
}
