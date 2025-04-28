import React from "react";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const CameraCardSkeleton = () => (
  <div className="p-4 mt-24 bg-white rounded-md shadow-md w-full space-y-3">
    <SkeletonBox className="h-4 w-1/3" /> {/* Title */}
    <SkeletonBox className="h-3 w-1/4" /> {/* Status */}
    <SkeletonBox className="h-3 w-1/2" /> {/* Date */}
    <div className="flex gap-2 mt-2">
      <SkeletonBox className="h-8 w-20" />
      <SkeletonBox className="h-8 w-28" />
      <SkeletonBox className="h-8 w-20" />
    </div>
  </div>
);

const CameraListSkeleton: React.FC = () => {
  return (
    <div className="px-4 py-6 space-y-4">
      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <SkeletonBox className="h-10 w-40" />
        <SkeletonBox className="h-10 w-36" />
        <SkeletonBox className="h-10 w-48" />
        <div className="ml-auto">
          <SkeletonBox className="h-10 w-32" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        <CameraCardSkeleton />
        <CameraCardSkeleton />
        <CameraCardSkeleton />
        <CameraCardSkeleton />
        <CameraCardSkeleton />
        <CameraCardSkeleton />
      </div>
    </div>
  );
};

export default CameraListSkeleton;
