
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

  const options = {
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
  const percentages = data.datasets[0].data.map((value) =>
    ((value / total) * 100).toFixed(1)
  );

  return (
    <div className="py-2 px-8 bg-white shadow-md rounded-md flex flex-col items-left">
      <h2 className="text-left text-xl font-semibold mb-4">Crime Distribution</h2>
      <div className="flex items-center gap-8">
        <div className="flex flex-col mr-2">
          {data.labels.map((label, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              />
              <p className="text-sm">{label} <span className='ml-2'>{percentages[index]}%</span> </p>
            </div>
          ))}
        </div>
        <div className="w-[120px]">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CrimeDistributionChart;
