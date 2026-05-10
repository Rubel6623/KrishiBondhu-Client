import { getUser } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
