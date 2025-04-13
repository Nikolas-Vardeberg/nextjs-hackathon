import Container from "@/common/components/atoms/layouts/Container";
import { requireAuth } from "@/lib/auth/requireAuth";
import { UserProfile } from "@clerk/nextjs";

export default async function SettingsPage() {
  await requireAuth();

  return (
    <Container className="mt-10">
      <UserProfile />
    </Container>
  );
}
