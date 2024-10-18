
import React from 'react';
import { FiInfo,FiArrowUpRight } from 'react-icons/fi';

type AnalyticsCardProps = {
  title: string;
  value: string | number;
  change?: string;
  showSearch?: boolean;
  showInfo?: boolean;
};

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, change, showSearch, showInfo }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-[50%] items-center">
      <div>
        <h2 className="text-sm text-gray-500 mb-1">{title}</h2>
        <div className="flex items-center">
          <p className="text-xl font-bold mr-2">{value}</p>
          {change && (
            <span className="text-s ml-4 font-semibold text-green-500 bg-green-100 px-2 py-1 rounded">
              {change}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {showSearch && <FiArrowUpRight className="text-gray-400 mr-2" />}
        {showInfo && <FiInfo className="text-gray-400" />}
      </div>
    </div>
  );
};

const AnalyticsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      <AnalyticsCard title="Total Crimes" value={138} change="+10%" showSearch />
      <AnalyticsCard title="Crime Rate" value="1.5%" change="+10%" showSearch />
      <AnalyticsCard title="Most Popular Crime" value="Child Abuse" showInfo />
    </div>
  );
};

export default AnalyticsCards;