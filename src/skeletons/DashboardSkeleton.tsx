import React from "react";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-slate-200 dark:bg-slate-700 animate-pulse rounded ${className}`} />
);

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Analytics cards row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-6 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700 space-y-3"
          >
            <SkeletonBox className="h-4 w-1/3" />
            <SkeletonBox className="h-8 w-1/2" />
            <SkeletonBox className="h-3 w-1/4" />
          </div>
        ))}
      </div>

      {/* Chart & Statistics row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Donut chart */}
        <div className="p-6 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700">
          <SkeletonBox className="h-6 w-1/2 mb-6" />
          <div className="flex gap-6 items-center">
            <div className="flex flex-col gap-3 flex-1">
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <SkeletonBox className="w-3 h-3 rounded-full mr-3" />
                    <SkeletonBox className="h-4 w-20" />
                  </div>
                  <SkeletonBox className="h-4 w-12" />
                </div>
              ))}
            </div>
            <SkeletonBox className="w-32 h-32 rounded-full flex-shrink-0" />
          </div>
        </div>

        {/* Statistics */}
        <div className="p-6 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700">
          <SkeletonBox className="h-6 w-1/2 mb-6" />
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <SkeletonBox className="h-4 w-1/3 mb-2" />
              <SkeletonBox className="h-6 w-1/4" />
            </div>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <SkeletonBox className="h-4 w-1/3" />
                  <SkeletonBox className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent crime */}
        <div className="p-6 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700">
          <SkeletonBox className="h-6 w-1/2 mb-6" />
          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <SkeletonBox className="h-4 w-1/3 mb-2" />
              <SkeletonBox className="h-6 w-2/3" />
            </div>
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <SkeletonBox className="h-3 w-1/4 mb-1" />
                <SkeletonBox className="h-4 w-1/2" />
              </div>
            ))}
            <SkeletonBox className="h-12 w-full rounded-lg bg-blue-200 dark:bg-blue-800" />
          </div>
        </div>
      </div>

      {/* Bottom chart */}
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <SkeletonBox className="h-6 w-1/3 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <SkeletonBox className="h-4 w-1/3 mb-4" />
            <SkeletonBox className="h-64 w-full" />
          </div>
          <div>
            <SkeletonBox className="h-4 w-1/3 mb-4" />
            <SkeletonBox className="h-64 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
