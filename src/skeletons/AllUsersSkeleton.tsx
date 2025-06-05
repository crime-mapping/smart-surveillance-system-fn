import React from "react";

// Reusable skeleton box
const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

// Single user card skeleton
const UserCardSkeleton = () => (
  <div className="p-4 mt-24 bg-[var(--card-bg)] text-[var(--text-color)] rounded-md shadow-sm space-y-3 w-full">
    <div className="flex justify-between items-center">
      <SkeletonBox className="h-4 w-1/3" /> {/* Name */}
      <div className="flex gap-2">
        <SkeletonBox className="h-8 w-8 rounded-full" /> {/* Eye */}
        <SkeletonBox className="h-8 w-8 rounded-full" /> {/* Pencil */}
        <SkeletonBox className="h-8 w-8 rounded-full" /> {/* Ban */}
        <SkeletonBox className="h-8 w-8 rounded-full" /> {/* Trash */}
      </div>
    </div>
    <SkeletonBox className="h-3 w-1/2" /> {/* Email */}
    <SkeletonBox className="h-3 w-1/4" /> {/* Phone */}
    <SkeletonBox className="h-3 w-1/5" /> {/* Role */}
    <SkeletonBox className="h-3 w-1/6" /> {/* Status */}
  </div>
);

// Main skeleton layout
const AllUsersSkeleton: React.FC = () => {
  return (
    <div className="px-4 py-6 space-y-6">
      {/* Top actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <SkeletonBox className="h-10 w-60" /> {/* Search */}
        <SkeletonBox className="h-10 w-40" /> {/* Role Filter */}
        <SkeletonBox className="h-10 w-40" /> {/* Status Filter */}
        <SkeletonBox className="h-10 w-32" /> {/* Export */}
      </div>

      {/* User cards grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 pt-6">
        <SkeletonBox className="h-8 w-10" />
        <SkeletonBox className="h-8 w-10" />
        <SkeletonBox className="h-8 w-10" />
      </div>
    </div>
  );
};

export default AllUsersSkeleton;
