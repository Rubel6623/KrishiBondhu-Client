"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/services/auth";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      const user = await getUser();
      if (user) {
        router.push(`/dashboard/${user.role.toLowerCase()}`);
      } else {
        router.push("/login");
      }
    };
    redirectUser();
  }, [router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-green-brand" />
      <p className="text-muted-foreground font-bold animate-pulse tracking-widest text-xs uppercase">
        Redirecting to your dashboard...
      </p>
    </div>
  );
}
