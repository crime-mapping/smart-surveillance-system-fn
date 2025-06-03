import { useEffect, useState } from "react";
import axios from "../config/axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import LoadingSpinner from "./LoadingSpinner";

ChartJS.register(Tooltip, Legend, ArcElement);

const CrimeLocationPieChart = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("/crimes/crimes-per-location");

        const labels = res.data.map((item: any) => item.location);
        const data = res.data.map((item: any) => item.totalCrimes);

        const backgroundColors = labels.map(
          (_: any, i: any) => `hsl(${(i * 360) / labels.length}, 70%, 60%)`
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Crimes",
              data,
              backgroundColor: backgroundColors,
              borderColor: "#ffffff",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("❌ Error loading crime location data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Crime Distribution by Location
      </h2>
      <div className="w-[300px] h-[300px] mx-auto">
        {loading ? (
          <LoadingSpinner message="Fetching Crime distribution data..." />
        ) : chartData ? (
          <Pie data={chartData} />
        ) : (
          <p className="text-gray-500 text-center">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default CrimeLocationPieChart;
