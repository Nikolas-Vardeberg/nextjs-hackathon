import { Skeleton } from "@/common/components/ui/Skeleton";
import SavedPanelHeader from "../saved-panel-header";

interface SavedPanelSkeletonProps {
  count?: number;
}

export default function SavedPanelSkeleton({
  count = 3,
}: SavedPanelSkeletonProps) {
  return (
    <div className="">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white border-gray-200">
        <SavedPanelHeader />
        <div className="p-6 pt-0">
          <div className="space-y-4">
            {[...Array(count)].map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-4 py-4 border-b border-gray-200 last:border-b-0"
              >
                <Skeleton className="relative w-16 h-16 rounded-md flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center min-w-0 w-3/5">
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex items-center text-sm flex-shrink-0 w-1/5">
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
