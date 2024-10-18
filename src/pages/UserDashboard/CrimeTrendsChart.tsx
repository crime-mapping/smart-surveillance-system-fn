import React from 'react';
import { Line } from 'react-chartjs-2';

const CrimeTrendsChart: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Crime Rate',
        data: [30, 45, 28, 60, 55, 70, 65],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-left text-lg font-semibold mb-4">Crime Trends Over Time</h2>
      <div className="w-1/2">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CrimeTrendsChart;
