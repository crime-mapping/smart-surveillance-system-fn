import React from "react";
import { FaUser } from "react-icons/fa";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-300 animate-pulse rounded ${className}`} />
);

const ProfilePageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen mt-24 bg-gray-100 p-8 flex flex-col md:flex-row gap-8">
      {/* Left - Skeleton Profile Card */}
      <div className="bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg shadow-md p-6 w-full md:w-1/4 flex flex-col items-center text-center">
        <div className="w-48 h-48 rounded-full bg-gray-300 animate-pulse mb-4 flex items-center justify-center">
          <FaUser className="text-gray-400 text-5xl" />
        </div>

        <SkeletonBox className="h-5 w-32 mt-4" />
        <div className="mt-6 space-y-2">
          <SkeletonBox className="h-4 w-40 mx-auto" />
          <SkeletonBox className="h-4 w-32 mx-auto" />
        </div>
      </div>

      {/* Right - Skeleton Forms */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Update Profile Form Skeleton */}
        <div className="bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-black to-blue-900 text-white px-4 py-2 font-semibold text-md flex items-center gap-2">
            <FaUser /> Profile
          </div>
          <div className="p-6 space-y-6">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-10 w-full" />
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-10 w-full" />
            <SkeletonBox className="h-4 w-32" />
            <SkeletonBox className="h-10 w-full" />
            <SkeletonBox className="h-10 w-full mt-4" />
          </div>
        </div>

        {/* Update Password Form Skeleton */}
        <div className="bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-black to-blue-900 text-white px-4 py-2 font-semibold text-md flex items-center gap-2">
            <FaUser /> Change Password
          </div>
          <div className="p-6 space-y-6">
            <SkeletonBox className="h-4 w-32" />
            <SkeletonBox className="h-10 w-full" />
            <SkeletonBox className="h-4 w-32" />
            <SkeletonBox className="h-10 w-full" />
            <SkeletonBox className="h-10 w-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
