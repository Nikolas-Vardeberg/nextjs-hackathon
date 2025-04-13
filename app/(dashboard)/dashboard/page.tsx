import Dashboard from "@/common/components/dashboard";
import { requireAuth } from "@/lib/auth/requireAuth";

export default async function DashboardPage() {
  await requireAuth();

  return <Dashboard />;
}
