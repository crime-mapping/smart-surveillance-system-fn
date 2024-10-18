import React from 'react';

type AnalyticsCardProps = {
  title: string;
  value: string | number;
  change: string;
};

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, change }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md text-center">
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-green-500">{change}</p>
    </div>
  );
};

const AnalyticsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      <AnalyticsCard title="Total Crimes" value={150} change="+10%" />
      <AnalyticsCard title="Crime Rate" value="1.5%" change="+10%" />
      <AnalyticsCard title="Most Popular Crime" value="Child Abuse" change="" />
    </div>
  );
};

export default AnalyticsCards;
