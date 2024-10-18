import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const CrimeDistributionChart: React.FC = () => {
  const data = {
    labels: ['Robbery', 'Harassment', 'Others'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-center text-sm font-semibold">Crime Distribution</h2>
      <div className='w-[180px]'>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default CrimeDistributionChart;
