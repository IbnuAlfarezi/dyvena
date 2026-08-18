import { AdminGuard } from "@/components/guards/AdminGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>;
}
