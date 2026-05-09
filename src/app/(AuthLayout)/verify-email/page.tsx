import type { Metadata } from "next";
export const metadata: Metadata = { title: "Verify Email — KrishiBondhu" };
export default function VerifyEmailPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--green-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", borderRadius: "24px", padding: "48px", width: "100%", maxWidth: "440px", textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>📧</div>
        <h1 className="section-h2" style={{ fontSize: "28px", marginBottom: "12px" }}>Verify Your <em>Email</em></h1>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "28px" }}>We&apos;ve sent a verification link to your email. Please check your inbox and click the link to activate your account.</p>
        <a href="/login" className="btn-primary" style={{ display: "inline-flex", justifyContent: "center", padding: "14px 28px" }}>Go to Login →</a>
      </div>
    </main>
  );
}
