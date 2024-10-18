import React from 'react';

const CrimeStatisticsSummary: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-left text-xl font-semibold mb-4">Crime Statistics</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>Total Crimes:</span>
          <span className="font-bold">150</span>
        </li>
        <li className="flex justify-between">
          <span>Resolved Cases:</span>
          <span className="font-bold">100</span>
        </li>
        <li className="flex justify-between">
          <span>Pending Investigations:</span>
          <span className="font-bold">50</span>
        </li>
        <li className="flex justify-between">
          <span>Average Resolution Time:</span>
          <span className="font-bold">7 days</span>
        </li>
      </ul>
    </div>
  );
};

export default CrimeStatisticsSummary;
