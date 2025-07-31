import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Calendar, MapPin } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  // const chartData = {
  //   labels: ["W1", "W2", "W3", "W4"],
  //   datasets: [
  //     {
  //       data: [3, 6, 9, 8],
  //       borderColor: "#4F46E5",
  //       backgroundColor: "rgba(99, 102, 241, 0.2)",
  //       tension: 0.4,
  //       fill: true,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: { legend: { display: false }, tooltip: { enabled: false } },
  //   scales: {
  //     x: { display: false },
  //     y: { display: false },
  //   },
  // };

  const levelStyle = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  };

  return (
    <div
      className={`
        text-[var(--text-color)] p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg animate-fade-in border border-gray-300
        ${crime.emergencyLevel === "HIGH"
          ? "bg-red-50 dark:bg-red-900/40 border-red-500"
          : crime.emergencyLevel === "MEDIUM"
            ? "bg-yellow-50 dark:bg-yellow-900/40 border-yellow-500"
            : "bg-green-50 dark:bg-green-900/40 border-green-500"
        }
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-1">Severity Level:</span>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm
              ${levelStyle[crime.emergencyLevel as "HIGH" | "MEDIUM" | "LOW"]}
            `}
            aria-label={`Severity Level: ${crime?.emergencyLevel}`}
          >
            {crime?.emergencyLevel}
          </span>
        </div>
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
          className={`${isDark
            ? "bg-primaryBackground hover:bg-primaryGradientEnd text-white"
            : "bg-blue-600 hover:bg-blue-500 text-white"
            }  px-4 py-2 rounded-md text-sm font-medium transition`}
        >
          View Details
        </button>
        {/* <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:underline"
        >
          {open ? "Hide More" : "Show More"}{" "}
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button> */}
      </div>

      {/* {open && (
        <div className="mt-4 border-t pt-4 border-gray-300  text-sm space-y-2">
          <p className="text-gray-600">Additional info coming soon...</p>
          <div className="mt-3 h-20">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CrimeCard;
