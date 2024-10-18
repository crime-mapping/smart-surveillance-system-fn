import React from 'react';

const RecentCrime: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="mt-4">
        <h2 className="text-sm font-semibold">Recent Crime</h2>
        <p className="text-gray-500">June 15, 2024, 10:30 PM</p>
        <p className="font-semibold">KK 230 St, Kigali</p>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        View Details
      </button>
    </div>
  );
};

export default RecentCrime;
