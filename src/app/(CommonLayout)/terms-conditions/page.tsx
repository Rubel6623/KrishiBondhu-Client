import type { Metadata } from "next";
import { TermsContent } from "@/components/legal/LegalPagesContent";

export const metadata: Metadata = { 
  title: "Terms & Conditions — KrishiBondhu",
  description: "Read the terms and conditions governing your use of the KrishiBondhu platform."
};

export default function TermsConditionsPage() {
  return <TermsContent />;
}
