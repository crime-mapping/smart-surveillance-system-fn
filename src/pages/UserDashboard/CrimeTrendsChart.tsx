import React from "react";
import { Line } from "react-chartjs-2";

interface CrimeTrendsChartProps {
  trendData: { _id: number; total: number }[];
}

const CrimeTrendsChart: React.FC<CrimeTrendsChartProps> = ({ trendData }) => {
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
      },
    },
  };

  return (
    <div className="p-4 bg-[var(--card-bg)] text-[var(--text-color)] shadow-md rounded-md">
      <h2 className="text-left text-lg font-semibold mb-4">
        Crime Trends Over Time
      </h2>
      <div className="w-1/2">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CrimeTrendsChart;
