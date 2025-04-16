import { Skeleton } from "@/common/components/ui/Skeleton";

export default function SearchResultsSkeleton({
  count = 1,
}: {
  count?: number;
}) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden border-gray-200"
        >
          <div className="flex flex-col space-y-1.5 p-6 pb-2 pt-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-7 w-64 my-3" />
              </div>
            </div>
          </div>
          <div className="p-6 pt-0 pb-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative rounded-md border p-2 flex items-center gap-3 border-gray-300"
                >
                  <Skeleton className="w-12 h-12 rounded-md" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-5 max-w-32 mb-1" />
                    <Skeleton className="h-4 max-w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 pt-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
