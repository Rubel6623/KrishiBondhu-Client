import type { Metadata } from "next";
export const metadata: Metadata = { title: "Earnings — KrishiBondhu" };
export default function ProviderEarningsPage() {
  return (
    <div>
      <div className="section-label">Provider · Earnings</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Earnings <em>Analytics</em></h1>
      <p className="section-desc">Track revenue, payout history, and income trends for your equipment fleet.</p>
    </div>
  );
}
