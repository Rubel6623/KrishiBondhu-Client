import type { Metadata } from "next";
import { SupportContent } from "@/components/legal/LegalPagesContent";

export const metadata: Metadata = { 
  title: "Help & Support — KrishiBondhu",
  description: "Get assistance, read guides, and contact the KrishiBondhu support team."
};

export default function SupportPage() {
  return <SupportContent />;
}
