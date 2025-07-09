import React from "react";

interface CrimeStatisticsSummaryProps {
  total: number;
  mostCommonType: string;
  topLocation: string;
  emergencyDistribution: { _id: string; count: number }[];
}

const CrimeStatisticsSummary: React.FC<CrimeStatisticsSummaryProps> = ({
  total,
  emergencyDistribution,
}) => {
  return (
    <div className="p-4 border bg-[var(--card-bg)] text-[var(--text-color)] shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg animate-fade-in rounded-md">
      <h2 className="text-left text-xl font-semibold mb-4">Crime Statistics</h2>
      <ul className="space-y-2">
        <li className="flex text-sm justify-between">
          <span>Total Crimes:</span>
          <span className="font-bold">{total}</span>
        </li>
        {emergencyDistribution.map((item) => (
          <li key={item._id} className="flex text-sm  justify-between">
            <span>{item._id} Emergency:</span>
            <span className="font-bold">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrimeStatisticsSummary;
