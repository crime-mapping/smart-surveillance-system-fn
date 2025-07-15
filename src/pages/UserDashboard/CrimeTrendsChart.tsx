import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "../../contexts/ThemeContext";
import { HiOutlineTrendingUp } from "react-icons/hi";

interface CrimeTrendsChartProps {
  trendData: { _id: number; total: number }[];
}

const CrimeTrendsChart: React.FC<CrimeTrendsChartProps> = ({ trendData }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Crime Rate",
        data: trendData.map((item) => item.total),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#f3f4f6" : "#1f2937",
          font: {
            size: 12,
            weight: "normal" as const,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: isDark ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)",
        titleColor: isDark ? "#f3f4f6" : "#1f2937",
        bodyColor: isDark ? "#f3f4f6" : "#1f2937",
        borderColor: "#3B82F6",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? "#9ca3af" : "#6b7280",
          font: {
            size: 11,
          },
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
          borderColor: isDark ? "#4b5563" : "#d1d5db",
        },
      },
      y: {
        ticks: {
          color: isDark ? "#9ca3af" : "#6b7280",
          font: {
            size: 11,
          },
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
          borderColor: isDark ? "#4b5563" : "#d1d5db",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
          <HiOutlineTrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Crime Trends Over Time
        </h2>
      </div>

      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
        <div className="h-[400px]">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Peak Month</span>
          </div>
          <p className="text-lg font-bold text-blue-700 dark:text-blue-400 mt-1">
            {labels[trendData.findIndex(item => item.total === Math.max(...trendData.map(d => d.total)))]}
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Lowest Month</span>
          </div>
          <p className="text-lg font-bold text-green-700 dark:text-green-400 mt-1">
            {labels[trendData.findIndex(item => item.total === Math.min(...trendData.map(d => d.total)))]}
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Average</span>
          </div>
          <p className="text-lg font-bold text-purple-700 dark:text-purple-400 mt-1">
            {(trendData.reduce((sum, item) => sum + item.total, 0) / trendData.length).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrimeTrendsChart;
