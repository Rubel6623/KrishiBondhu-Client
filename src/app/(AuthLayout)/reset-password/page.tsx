import type { Metadata } from "next";
export const metadata: Metadata = { title: "Reset Password — KrishiBondhu" };
export default function ResetPasswordPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--green-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", borderRadius: "24px", padding: "48px", width: "100%", maxWidth: "440px", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔑</div>
          <h1 className="section-h2" style={{ fontSize: "28px", marginBottom: "8px" }}>Reset <em>Password</em></h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Enter your new password below</p>
        </div>
        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input type="password" placeholder="New password" style={{ padding: "12px 16px", borderRadius: "12px", border: "1.5px solid rgba(0,0,0,0.1)", fontSize: "14px", outline: "none" }} />
          <input type="password" placeholder="Confirm new password" style={{ padding: "12px 16px", borderRadius: "12px", border: "1.5px solid rgba(0,0,0,0.1)", fontSize: "14px", outline: "none" }} />
          <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>Update Password →</button>
        </form>
      </div>
    </main>
  );
}
