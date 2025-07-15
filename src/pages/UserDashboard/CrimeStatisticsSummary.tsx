import React from "react";
import { HiOutlineClipboardList, HiOutlineExclamationCircle, HiOutlineShieldCheck } from "react-icons/hi";

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
  const getEmergencyIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return <HiOutlineExclamationCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <HiOutlineExclamationCircle className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <HiOutlineShieldCheck className="w-4 h-4 text-green-500" />;
      default:
        return <HiOutlineClipboardList className="w-4 h-4 text-blue-500" />;
    }
  };

  const getEmergencyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'medium':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
          <HiOutlineClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Crime Statistics
        </h2>
      </div>

      <div className="space-y-4">
        {/* Total Crimes */}
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Total Crimes
            </span>
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {total}
          </span>
        </div>

        {/* Emergency Distribution */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            Emergency Levels
          </h3>
          {emergencyDistribution.map((item) => (
            <div
              key={item._id}
              className={`flex items-center justify-between p-3 rounded-lg border ${getEmergencyColor(item._id)}`}
            >
              <div className="flex items-center">
                {getEmergencyIcon(item._id)}
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-2 capitalize">
                  {item._id} Emergency
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.count}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  ({((item.count / total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
          <div className="flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">
            <div className="w-1 h-1 bg-slate-400 rounded-full mr-2"></div>
            Updated in real-time
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeStatisticsSummary;
