import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CrimeDistributionChartProps {
  distribution: {
    _id: string;
    count: number;
  }[];
}

const CrimeDistributionChart: React.FC<CrimeDistributionChartProps> = ({
  distribution,
}) => {
  if (
    !distribution ||
    distribution.length === 0 ||
    distribution.every((item) => item.count === 0)
  ) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xs border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Crime Distribution</h2>
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">No crime distribution data available</p>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Sort by count
  const sorted = [...distribution].sort((a, b) => b.count - a.count);

  // Step 2: Take top 3, group the rest into "Others"
  const topCrimes = sorted.slice(0, 3);
  const others = sorted.slice(3);
  const othersCount = others.reduce((sum, curr) => sum + curr.count, 0);

  const finalCrimes = [...topCrimes];
  if (othersCount > 0) {
    finalCrimes.push({ _id: "Others", count: othersCount });
  }

  const labels = finalCrimes.map((item) => item._id);
  const values = finalCrimes.map((item) => item.count);
  const total = values.reduce((acc, value) => acc + value, 0);
  const percentages = values.map((value) => ((value / total) * 100).toFixed(1));

  const backgroundColors = [
    "#3B82F6", // blue-500
    "#EF4444", // red-500
    "#F59E0B", // amber-500
    "#8B5CF6", // violet-500
    "#10B981", // emerald-500
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors.slice(0, values.length),
        borderWidth: 0,
        hoverBorderWidth: 2,
        hoverBorderColor: "#ffffff",
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#3B82F6",
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    maintainAspectRatio: false,
    cutout: "70%",
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Crime Distribution
      </h2>

      <div className="flex items-center justify-between gap-6">
        {/* Legend */}
        <div className="flex-1 space-y-3">
          {labels.map((label, index) => (
            <div key={index} className="flex items-center justify-between group">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-3 shadow-sm"
                  style={{
                    backgroundColor: backgroundColors[index],
                  }}
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {label}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {percentages[index]}%
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  ({values[index]})
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{total}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeDistributionChart;
