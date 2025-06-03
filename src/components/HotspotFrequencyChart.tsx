import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "../config/axios";
import LoadingSpinner from "./LoadingSpinner";

type HotspotData = { location: string; totalCrimes: number };

const HotspotFrequencyChart = () => {
  const [hotspotData, setHotspotData] = useState<HotspotData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotspots = async () => {
      try {
        const res = await axios.get("crimes/crime-hotspot-frequency");
        setHotspotData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotspots();
  }, []);

  const chartData = {
    labels: hotspotData.map((d) => d.location),
    datasets: [
      {
        label: "Crime Frequency",
        data: hotspotData.map((d) => d.totalCrimes),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="w-[500px] h-[300px]">
      <h2 className="text-xl font-semibold mb-4">Top Crime Hotspots</h2>
      {loading ? (
        <LoadingSpinner message="Fetching Crime hotspots frequency data..." />
      ) : chartData && chartData.labels.length > 0 ? (
        <Bar data={chartData} options={{ indexAxis: "y", responsive: true }} />
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default HotspotFrequencyChart;
