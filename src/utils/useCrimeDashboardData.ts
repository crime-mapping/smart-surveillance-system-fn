import { useEffect, useState } from "react";
import axios from "../config/axios";

export const useCrimeDashboardData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("/crimes/statistics", {
        withCredentials: true,
      });
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};
