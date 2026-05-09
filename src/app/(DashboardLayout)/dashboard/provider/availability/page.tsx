import type { Metadata } from "next";
export const metadata: Metadata = { title: "Availability — KrishiBondhu" };
export default function ProviderAvailabilityPage() {
  return (
    <div>
      <div className="section-label">Provider · Availability</div>
      <h1 className="section-h2" style={{ fontSize: "32px" }}>Availability <em>Management</em></h1>
      <p className="section-desc">Set blackout dates, availability windows, and seasonal schedules for your equipment.</p>
    </div>
  );
}
