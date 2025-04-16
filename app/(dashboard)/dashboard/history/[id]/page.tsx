import HistoryDetailsView from "@/common/components/dashboard/history-details";
import { requireAuth } from "@/lib/auth/requireAuth";

export default async function HistoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();
  const { id } = await params;

  return <HistoryDetailsView id={id} />;
}
