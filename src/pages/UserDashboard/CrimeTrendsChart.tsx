import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "../../contexts/ThemeContext";

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
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#f3f4f6" : "#1f2937",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? "#f3f4f6" : "#1f2937",
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
        },
      },
      y: {
        ticks: {
          color: isDark ? "#f3f4f6" : "#1f2937",
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="p-4 bg-[var(--card-bg)] text-[var(--text-color)] shadow-md rounded-md">
      <h2 className="text-left text-lg font-semibold mb-4">
        Crime Trends Over Time
      </h2>
      <div className="w-1/2 h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CrimeTrendsChart;
