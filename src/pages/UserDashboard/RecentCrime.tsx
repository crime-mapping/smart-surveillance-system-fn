import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { HiOutlineClock, HiOutlineLocationMarker, HiOutlineEye } from "react-icons/hi";
import { RiCriminalLine } from "react-icons/ri";

interface Location {
  _id: string;
  location: string;
}

interface RecentCrimeProps {
  recent: {
    _id: string;
    crimeType: string;
    crimeLocation: Location;
    dateOfOccurrence: string;
  };
}

const RecentCrime: React.FC<RecentCrimeProps> = ({ recent }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/crime/${recent._id}`);
  };

  if (!recent) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
            <RiCriminalLine className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Crime</h2>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <RiCriminalLine className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">No recent crime data found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
          <RiCriminalLine className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Crime</h2>
      </div>

      <div className="space-y-4">
        {/* Crime Type */}
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Crime Type</span>
          </div>
          <p className="text-lg font-bold text-red-700 dark:text-red-400 mt-1">
            {recent.crimeType}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <HiOutlineLocationMarker className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-3" />
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Location</span>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {recent.crimeLocation.location}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <HiOutlineClock className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-3" />
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Date</span>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {formatDate(recent.dateOfOccurrence)}
            </p>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <HiOutlineEye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default RecentCrime;
