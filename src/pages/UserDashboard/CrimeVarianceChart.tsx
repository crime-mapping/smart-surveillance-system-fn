
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
  ArcElement, 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement 
);

const CrimeVarianceChart: React.FC = () => {
  const barData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Total Crimes',
        data: [30, 40, 35, 60, 45, 55, 70, 80, 65, 90, 100, 85],
        backgroundColor: '#4CAF50',
      },
    ],
  };

  const lineData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Crime Rate',
        data: [1.2, 1.3, 1.1, 1.4, 1.3, 1.5, 1.6, 1.8, 1.7, 1.9, 2.0, 1.8],
        fill: false,
        borderColor: '#FF6384',
      },
    ],
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-md">
      <h2 className="text-center text-xl font-semibold mb-4">Crimes Variance</h2>
      <div className='flex gap-[10%]'>
      <div className="mb-6 w-[45%]">
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <div className='mb-6 w-[45%]'>
        <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      </div>
    </div>
  );
};

export default CrimeVarianceChart;
