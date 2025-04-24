import React from "react";
import { CalendarDays, MapPin, User, Camera } from "lucide-react";

const SingleCrimeSkeleton: React.FC = () => {
  return (
    <div className="p-6 my-4 bg-white shadow rounded-md animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4 mx-auto" />

      <div className="h-5 bg-gray-300 rounded w-1/2 mb-2" />

      <div className="bg-gray-300 text-white px-4 py-4 rounded shadow mt-2 mb-4 w-40" />

      <div className="flex items-center text-gray-400 mb-2">
        <CalendarDays className="w-5 h-5 mr-2" />
        <div className="h-4 bg-gray-300 rounded w-1/4" />
      </div>

      <div className="flex items-center text-gray-400 mb-4">
        <MapPin className="w-5 h-5 mr-2" />
        <div className="h-4 bg-gray-300 rounded w-1/3" />
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-1">Description</h4>
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-4/5" />
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-1">Suspect Information</h4>
        <div className="flex items-center text-gray-400">
          <User className="w-5 h-5 mr-2" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-1">Evidences</h4>
        <div className="flex items-center text-gray-400">
          <Camera className="w-5 h-5 mr-2" />
          <div className="h-4 bg-gray-300 rounded w-1/3" />
        </div>
      </div>

      <div className="h-10 bg-gray-300 rounded w-40" />
    </div>
  );
};

export default SingleCrimeSkeleton;
