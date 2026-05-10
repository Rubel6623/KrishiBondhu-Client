import AiAnalyticsDashboard from "@/components/admin/AiAnalyticsDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "AI Analytics — KrishiBondhu Admin",
  description: "Monitor AI usage and performance across the platform."
};

export default function AdminAIAnalyticsPage() {
  return (
    <main className="min-h-screen">
      <AiAnalyticsDashboard />
    </main>
  );
}
