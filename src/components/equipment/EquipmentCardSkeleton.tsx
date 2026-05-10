export default function EquipmentCardSkeleton() {
  return (
    <div className="group relative bg-white dark:bg-white/5 border border-black/6 dark:border-white/10 rounded-[28px] overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-[240px] bg-gray-200 dark:bg-white/10" />

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-5 bg-gray-200 dark:bg-white/10 rounded-lg w-3/4" />
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-lg w-1/3" />
          <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-lg w-1/4" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10" />
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-20" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}
