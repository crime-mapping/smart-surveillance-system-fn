import React from "react";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const CrimeReportsSkeleton: React.FC = () => {
  return (
    <div className="p-8 mt-20">
      {/* Header + Legend */}
      <div className="flex justify-between items-center mb-6">
        <SkeletonBox className="h-8 w-48" />
        <div className="flex gap-4">
          <SkeletonBox className="h-5 w-16" />
          <SkeletonBox className="h-5 w-16" />
          <SkeletonBox className="h-5 w-16" />
        </div>
      </div>

      {/* Search Bar */}
      <SkeletonBox className="h-10 w-full md:w-1/3 mb-6" />

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        <SkeletonBox className="h-10 w-32" />
        <SkeletonBox className="h-10 w-32" />
        <SkeletonBox className="h-10 w-36" />
        <SkeletonBox className="h-10 w-40" />
        <SkeletonBox className="h-10 w-44" />
      </div>

      {/* Filters (Date/Location/Level) */}
      <SkeletonBox className="h-10 w-48 mb-6" />

      {/* Crime Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow-md animate-pulse space-y-4"
          >
            <SkeletonBox className="h-6 w-3/4" /> {/* Report title */}
            <SkeletonBox className="h-5 w-1/2" /> {/* Crime type */}
            <SkeletonBox className="h-4 w-2/3" /> {/* Date */}
            <SkeletonBox className="h-4 w-1/2" /> {/* Location */}
            <SkeletonBox className="h-10 w-full" /> {/* Button */}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <SkeletonBox className="h-10 w-24" />
        <SkeletonBox className="h-6 w-32" />
        <SkeletonBox className="h-10 w-24" />
      </div>
    </div>
  );
};

export default CrimeReportsSkeleton;
