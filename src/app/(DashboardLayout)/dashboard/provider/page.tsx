import ProviderOverview from "@/components/dashboard/provider/ProviderOverview";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Provider Dashboard — KrishiBondhu" };

export default function ProviderDashboardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
          Provider <em className="italic text-green-brand not-italic">Dashboard</em>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 font-medium">Manage your equipment, view booking requests, and track your performance.</p>
      </div>

      <ProviderOverview />
    </div>
  );
}
