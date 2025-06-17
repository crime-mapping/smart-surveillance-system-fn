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
        backgroundColor: "#4CAF50",
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
        borderColor: "#FF6384",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
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
    <div className="w-full mt-4 p-4 bg-[var(--card-bg)] text-[var(--text-color)] shadow-md rounded-md">
      <h2 className="text-center text-xl font-semibold mb-4">
        Crimes Variance
      </h2>
      <div className="flex gap-[10%]">
        <div className="mb-6 w-[45%] h-[300px]">
          <Bar data={barData} options={chartOptions} />
        </div>
        <div className="mb-6 w-[45%] h-[300px]">
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default CrimeVarianceChart;
