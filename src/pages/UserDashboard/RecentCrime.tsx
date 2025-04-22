import React from "react";

interface RecentCrimeProps {
  recent: {
    crimeType: string;
    crimeLocation: string;
    dateOfOccurrence: string;
  };
}

const RecentCrime: React.FC<RecentCrimeProps> = ({ recent }) => {
  if (!recent) {
    return (
      <div className="p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold">Recent Crime</h2>
      </div>
    );
  }

  const formattedDate = new Date(recent?.dateOfOccurrence).toLocaleString();

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl text-left font-semibold">Recent Crime</h2>
      {!recent ? (
        <p className="text-gray-500 mt-4">No recent crime data found.</p>
      ) : (
        <>
          <div className="mt-4">
            <p className="text-gray-500">{formattedDate}</p>
            <p className="font-semibold">{recent.crimeLocation}</p>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            View Details
          </button>
        </>
      )}
    </div>
  );
};

export default RecentCrime;
