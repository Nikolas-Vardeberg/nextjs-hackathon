import { requireAuth } from "@/lib/auth/requireAuth";

export default async function SettingsPage() {
  await requireAuth();

  return <div>Settings</div>;
}
