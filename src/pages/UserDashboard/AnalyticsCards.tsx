import React from "react";
import { FiArrowUpRight, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { HiOutlineLocationMarker, HiOutlineShieldCheck } from "react-icons/hi";
import { RiCriminalLine } from "react-icons/ri";
import { BiBarChartAlt2 } from "react-icons/bi";

type AnalyticsCardProps = {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "purple" | "orange" | "red";
  isPositive?: boolean;
};

interface AnalyticsCardsProps {
  totalCrimes: number;
  monthlyCrimes: [];
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
  icon,
  color = "blue",
  isPositive = true,
}) => {
  const colorClasses: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
  };

  return (
    <div className="group relative p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700">
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-5 rounded-xl`}></div>

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}>
            {icon}
          </div>
          <FiArrowUpRight className="text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" />
        </div>

        {/* Title */}
        <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">
          {title}
        </h3>

        {/* Value */}
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>

          {/* Change indicator */}
          {change && (
            <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${isPositive
              ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
              : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
              }`}>
              {isPositive ? (
                <FiTrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <FiTrendingDown className="w-3 h-3 mr-1" />
              )}
              {change}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({
  totalCrimes,
  monthlyCrimes,
  crimeRate,
  mostPopularCrime,
  topLocation,
  crimeRateChange,
  totalCrimesChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
      <AnalyticsCard
        title="Total Crimes"
        value={totalCrimes}
        change={totalCrimesChange}
        icon={<RiCriminalLine className="w-5 h-5" />}
        color="blue"
        isPositive={false}
      />
      <AnalyticsCard
        title="Monthly Crimes"
        value={monthlyCrimes.length}
        change={`${crimeRate}%`}
        icon={<BiBarChartAlt2 className="w-5 h-5" />}
        color="purple"
        isPositive={false}
      />
      <AnalyticsCard
        title="Crime Rate"
        value={`${crimeRate}%`}
        change={crimeRateChange}
        icon={<FiTrendingUp className="w-5 h-5" />}
        color="orange"
        isPositive={false}
      />
      <AnalyticsCard
        title="Most Common Crime"
        value={mostPopularCrime}
        icon={<HiOutlineShieldCheck className="w-5 h-5" />}
        color="red"
      />
      <AnalyticsCard
        title="Top Location"
        value={topLocation}
        icon={<HiOutlineLocationMarker className="w-5 h-5" />}
        color="green"
      />
    </div>
  );
};

export default AnalyticsCards;
