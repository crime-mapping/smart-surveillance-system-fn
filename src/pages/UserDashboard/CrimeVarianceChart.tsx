import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../../contexts/ThemeContext";
import { HiOutlineChartBar } from "react-icons/hi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CrimeVarianceChartProps {
  monthlyData: { _id: number; total: number }[];
}

const CrimeVarianceChart: React.FC<CrimeVarianceChartProps> = ({
  monthlyData,
}) => {
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

  const barData = {
    labels,
    datasets: [
      {
        label: "Total Crimes",
        data: monthlyData.map((item) => item.total),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "#3B82F6",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Crime Rate",
        data: monthlyData.map((item) =>
          parseFloat((item.total / 50).toFixed(2))
        ),
        fill: false,
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#EF4444",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
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
          <HiOutlineChartBar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Crime Variance Analysis
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">
            Total Crimes by Month
          </h3>
          <div className="h-[300px]">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">
            Crime Rate Trend
          </h3>
          <div className="h-[300px]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeVarianceChart;
