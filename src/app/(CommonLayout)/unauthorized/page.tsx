import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Unauthorized — KrishiBondhu" };
export default function UnauthorizedPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--green-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "white" }}>
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>🚫</div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "48px", fontWeight: 900, marginBottom: "12px" }}>403</h1>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", marginBottom: "32px" }}>You don&apos;t have permission to access this page.</p>
        <Link href="/" className="btn-hero-primary">← Back to Home</Link>
      </div>
    </main>
  );
}
