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
        ), // Example calculation
        fill: false,
        borderColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-md">
      <h2 className="text-center text-xl font-semibold mb-4">
        Crimes Variance
      </h2>
      <div className="flex gap-[10%]">
        <div className="mb-6 w-[45%]">
          <Bar
            data={barData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div className="mb-6 w-[45%]">
          <Line
            data={lineData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default CrimeVarianceChart;
