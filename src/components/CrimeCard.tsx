import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Calendar, MapPin } from "lucide-react";
import { formatDate } from "../utils/formatDate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

interface CrimeCardProps {
  crime: {
    _id: string;
    crimeType: string;
    dateOfOccurrence: string;
    emergencyLevel: string;
    crimeLocation: { location: string };
  };
}

const CrimeCard: React.FC<CrimeCardProps> = ({ crime }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  const chartData = {
    labels: ["W1", "W2", "W3", "W4"],
    datasets: [
      {
        data: [3, 6, 9, 8],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  const levelStyle = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-[var(--card-bg)] text-[var(--text-color)] p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">
          Report #...{crime._id.slice(12)}
        </h2>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
            levelStyle[crime.emergencyLevel as "HIGH" | "MEDIUM" | "LOW"]
          }`}
        >
          {crime.emergencyLevel}
        </span>
      </div>

      <div className="mb-2 text-sm space-y-2 text-[var(--text-color)]">
        <div className="flex items-center gap-2">
          <Calendar size={16} /> {formatDate(crime.dateOfOccurrence)}
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} /> {crime.crimeLocation?.location}
        </div>
        <p className="text-base font-semibold mt-2">{crime.crimeType}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => navigate(`/crime/${crime._id}`)}
          className={`${
            isDark
              ? "bg-primaryBackground hover:bg-primaryGradientEnd text-white"
              : "bg-gray-300 hover:bg-gray-200 text-gray-500"
          }  px-4 py-2 rounded-md text-sm font-medium transition`}
        >
          View Details
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:underline"
        >
          {open ? "Hide More" : "Show More"}{" "}
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {open && (
        <div className="mt-4 border-t pt-4 border-gray-300  text-sm space-y-2">
          <p className="text-gray-600">Additional info coming soon...</p>
          <div className="mt-3 h-20">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CrimeCard;
