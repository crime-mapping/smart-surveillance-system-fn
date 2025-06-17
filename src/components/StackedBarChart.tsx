import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import LoadingSpinner from "./LoadingSpinner";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
type CrimeAnalyticsPoint = {
  month: string;
  [crimeType: string]: number | string;
};

const fetchMonthlyCrimeData = async () => {
  const res = await axios.get("/crimes/analytics");
  return res.data;
};

const StackedBarChart = () => {
  const [analytics, setAnalytics] = useState<CrimeAnalyticsPoint[]>([]);
  const [crimeTypes, setCrimeTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await fetchMonthlyCrimeData();
        setAnalytics(res.analytics || []);
        setCrimeTypes(res.crimeTypes || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  const months = analytics.map((entry) => entry.month);
  const datasets = crimeTypes.map((type, index) => {
    return {
      label: type,
      data: analytics.map((entry) => entry[type] || 0),
      backgroundColor: `hsl(${(index * 360) / crimeTypes.length}, 70%, 60%)`,
      stack: "stack1",
    };
  });

  return (
    <div className="w-full p-4 h-[400px]">
      {loading ? (
        <LoadingSpinner message="Fetching Crime Analytics data..." />
      ) : (
        <Bar
          data={{
            labels: months,
            datasets: datasets,
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default StackedBarChart;
