import type { Metadata } from "next";
export const metadata: Metadata = { title: "System Logs — KrishiBondhu Admin" };
export default function AdminLogsPage() {
  return (
    <div>
      <div className="section-label">Admin · Logs</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>System <em>Logs</em></h1>
      <p className="section-desc">Audit trail of all critical system events, errors, and admin actions.</p>
    </div>
  );
}
