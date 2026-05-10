import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { AIChatAssistant } from "@/components/AI_Features/KrishiBondhuChat";
import { getUser } from "@/services/auth";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {user && <AIChatAssistant />}
    </div>
  );
}
