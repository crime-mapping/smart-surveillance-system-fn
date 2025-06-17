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
      <div className="p-4 bg-[var(--card-bg)] text-[var(--text-color)] shadow-md rounded-md text-center">
        <h2 className="text-xl font-semibold mb-2">Crime Distribution</h2>
        <p className="text-gray-500">No crime distribution data available.</p>
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
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#8B5CF6", // for "Others" if exists
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors.slice(0, values.length),
        hoverBackgroundColor: backgroundColors.slice(0, values.length),
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="py-2 px-8 bg-[var(--card-bg)] text-[var(--text-color)] shadow-md rounded-md flex flex-col items-left">
      <h2 className="text-left text-xl font-semibold mb-4">
        Crime Distribution
      </h2>
      <div className="flex items-center gap-8">
        <div className="flex flex-col mr-2">
          {labels.map((label, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className="w-4 h-4 mr-2"
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              />
              <p className="text-sm">
                {label} <span className="ml-2">{percentages[index]}%</span>
              </p>
            </div>
          ))}
        </div>
        <div className="w-[120px] h-[120px]">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default CrimeDistributionChart;
