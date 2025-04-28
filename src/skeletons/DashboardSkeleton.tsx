import React from "react";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 mt-24">
      {/* Analytics cards row */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="p-4 bg-white shadow rounded-lg space-y-2">
            <SkeletonBox className="h-4 w-1/3" />
            <SkeletonBox className="h-6 w-1/2" />
          </div>
        ))}
      </div>

      {/* Chart & Statistics row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Donut chart */}
        <div className="p-4 bg-white shadow rounded-lg flex gap-6 items-center">
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((_, idx) => (
              <SkeletonBox key={idx} className="h-4 w-24" />
            ))}
          </div>
          <SkeletonBox className="w-24 h-24 rounded-full" />
        </div>

        {/* Statistics */}
        <div className="p-4 bg-white shadow rounded-lg space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <SkeletonBox className="h-4 w-1/3" />
              <SkeletonBox className="h-4 w-1/4" />
            </div>
          ))}
        </div>

        {/* Recent crime */}
        <div className="p-4 bg-white shadow rounded-lg space-y-3">
          <SkeletonBox className="h-6 w-1/2" />
          <SkeletonBox className="h-4 w-2/3" />
          <SkeletonBox className="h-4 w-1/3" />
          <SkeletonBox className="h-8 w-1/3 rounded-md bg-blue-200" />
        </div>
      </div>

      {/* Variance charts */}
      <div className="p-4 bg-white shadow rounded-lg grid grid-cols-2 gap-6">
        <SkeletonBox className="h-48 w-full" />
        <SkeletonBox className="h-48 w-full" />
      </div>

      {/* Trends chart */}
      <div className="p-4 bg-white shadow rounded-lg">
        <SkeletonBox className="h-48 w-1/2" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
