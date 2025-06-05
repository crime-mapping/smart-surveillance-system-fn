import React from "react";
import { FiInfo, FiArrowUpRight } from "react-icons/fi";

type AnalyticsCardProps = {
  title: string;
  value: string | number;
  change?: string;
  showSearch?: boolean;
  showInfo?: boolean;
};

interface AnalyticsCardsProps {
  totalCrimes: number;
  crimeRate: number;
  mostPopularCrime: string;
  crimeRateChange: string;
  totalCrimesChange: string;
  topLocation: string;
  change?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  change,
  showSearch,
  showInfo,
}) => {
  return (
    <div className="p-4 bg-[var(--card-bg)] text-[var(--text-color)] shadow-md rounded-lg flex gap-[30%] items-center">
      <div>
        <h2 className="text-sm text-[var(--text-color)] mb-1">{title}</h2>
        <div className="flex items-center">
          <p className="text-xl font-bold mr-2">{value}</p>
          {change && (
            <span className="text-s ml-2 font-semibold text-green-500 bg-green-100 px-2 py-1 rounded">
              {change}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {showSearch && (
          <FiArrowUpRight className="text-[var(--text-color)] mr-2" />
        )}
        {showInfo && <FiInfo className="text-[var(--text-color)]" />}
      </div>
    </div>
  );
};

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({
  totalCrimes,
  crimeRate,
  mostPopularCrime,
  topLocation,
  crimeRateChange,
  totalCrimesChange,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 my-4">
      <AnalyticsCard
        title="Total Crimes"
        value={totalCrimes}
        change={totalCrimesChange}
        showSearch
      />
      <AnalyticsCard
        title="Crime Rate"
        value={`${crimeRate}%`}
        change={crimeRateChange}
        showSearch
      />
      <AnalyticsCard
        title="Most Popular Crime"
        value={mostPopularCrime}
        showInfo
      />
      <AnalyticsCard title="Most Affected Place" value={topLocation} showInfo />
    </div>
  );
};

export default AnalyticsCards;
