import { requireAuth } from "@/lib/auth/requireAuth";

export default async function DashboardPage() {
  await requireAuth();

  return <div>Dashboard Page</div>;
}
