import type { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/LegalPagesContent";

export const metadata: Metadata = { 
  title: "Privacy Policy — KrishiBondhu",
  description: "Learn how KrishiBondhu collects, uses, and protects your personal information."
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
