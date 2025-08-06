import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function NotesLoading() {
  return (
    <div className="space-y-8 px-4 py-6">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b pb-6">
        <Skeleton className="h-8 w-40 mb-4 md:mb-0" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>

      {/* Action button skeleton */}
      <div className="flex justify-end">
        <Button disabled>
          <Skeleton className="h-5 w-28 bg-white" />
        </Button>
      </div>

      {/* Notes grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="border border-border rounded-xl p-4 bg-background shadow-sm h-full flex flex-col justify-between"
          >
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-4 w-24 mt-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
