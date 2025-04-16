import SearchesView from "@/common/components/dashboard/searches";
import { requireAuth } from "@/lib/auth/requireAuth";

export default async function SearchDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();
  const { id } = await params;

  return <SearchesView id={id} />;
}
