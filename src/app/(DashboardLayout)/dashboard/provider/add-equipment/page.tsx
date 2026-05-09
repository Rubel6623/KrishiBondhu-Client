import AddEquipmentForm from "@/components/dashboard/provider/AddEquipmentForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Add Equipment — KrishiBondhu" };

export default function AddEquipmentPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-foreground">
          Add New <em className="italic text-green-brand not-italic">Equipment</em>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 font-medium">List your agricultural machinery and reach thousands of farmers.</p>
      </div>

      <AddEquipmentForm />
    </div>
  );
}
