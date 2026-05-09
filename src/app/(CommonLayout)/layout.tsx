import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { AIChatAssistant } from "@/components/AI_Features/KrishiBondhuChat";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AIChatAssistant />
    </div>
  );
}
