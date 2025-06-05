import React from "react";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const LocationCardSkeleton = () => (
  <div className="bg-[var(--card-bg)] text-[var(--text-color)] p-6 rounded-lg shadow-md space-y-4">
    <SkeletonBox className="h-6 w-2/3" />
    <SkeletonBox className="h-4 w-1/2" />
    <SkeletonBox className="h-3 w-1/2" />
    <SkeletonBox className="h-3 w-1/2" />
    <div className="flex justify-between mt-4">
      <SkeletonBox className="h-8 w-20" />
      <div className="flex gap-3">
        <SkeletonBox className="h-8 w-8" />
        <SkeletonBox className="h-8 w-8" />
      </div>
    </div>
  </div>
);

const AllLocationsSkeleton: React.FC = () => {
  return (
    <div className="p-8 mt-20">
      <div className="flex justify-between mb-6">
        <SkeletonBox className="h-8 w-48" />
        <SkeletonBox className="h-10 w-36" />
      </div>
      <SkeletonBox className="h-10 w-full md:w-1/3 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <LocationCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default AllLocationsSkeleton;
