import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

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
      <div className="p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold">Recent Crime</h2>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl text-left font-semibold">Recent Crime</h2>
      {!recent ? (
        <p className="text-gray-500 mt-4">No recent crime data found.</p>
      ) : (
        <>
          <div className="mt-2">
            <p className="italic">{recent.crimeLocation.location}</p>
            <p className="text-gray-500">
              {formatDate(recent.dateOfOccurrence)}
            </p>
            <p className="font-semibold">{recent.crimeType}</p>
          </div>
          <button
            onClick={handleViewDetails}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            View Details
          </button>
        </>
      )}
    </div>
  );
};

export default RecentCrime;
