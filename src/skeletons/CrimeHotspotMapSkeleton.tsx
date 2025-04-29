import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-300 animate-pulse rounded ${className}`} />
);

const CrimeHotspotMapSkeleton: React.FC = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar Skeleton */}
      <div className="w-65 bg-primaryBackground p-6 flex flex-col space-y-6">
        <SkeletonBox className="h-10 w-32" /> {/* Logo */}
        <SkeletonBox className="h-10 w-10 rounded-full" /> {/* Back button */}
        <SkeletonBox className="h-6 w-48" /> {/* Title */}
        {/* Filter Section */}
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-10 w-full" />
        </div>
        {/* Statistics Section */}
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-20 w-full" />
          <SkeletonBox className="h-20 w-full" />
        </div>
        {/* Legend Section */}
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-6 w-24" />
          <SkeletonBox className="h-6 w-24" />
          <SkeletonBox className="h-6 w-24" />
        </div>
      </div>

      {/* Map Skeleton */}
      <div className="flex-1 relative">
        <MapContainer
          center={[-1.9441, 30.0619]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
        >
          {/* Light gray layer while loading */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="text-gray-700 font-semibold animate-pulse text-xl">
            Loading Map...
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeHotspotMapSkeleton;
