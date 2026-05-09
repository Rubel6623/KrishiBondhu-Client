import ProviderEquipmentList from "@/components/dashboard/provider/ProviderEquipmentList";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Equipment — KrishiBondhu" };

export default function ProviderEquipmentPage() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
            My <em className="italic text-green-brand not-italic">Equipment</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">Manage your listings, update prices, and track availability.</p>
        </div>
      </div>

      <ProviderEquipmentList />
    </div>
  );
}
