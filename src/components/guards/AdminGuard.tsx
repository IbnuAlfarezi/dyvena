import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export async function AdminGuard({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (session?.user?.role !== "admin") {
    redirect("/dashboard/ecommerce");
  }

  return <>{children}</>;
}
