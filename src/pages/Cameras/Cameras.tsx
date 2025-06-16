import { useEffect, useState } from "react";
import CameraCard from "./CameraCard";
import AddCameraModal from "./AddCameraModel";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../Layout/DashboardLayout";
import CameraListSkeleton from "../../skeletons/CameraListSkeleton";
import NoCameraFound from "../../components/NoCameraFound";

export interface Camera {
  id: string;
  name: string;
  status: "Connected" | "Disconnected";
  dateAdded: string;
  location?: string;
}

interface Location {
  _id: string;
  location: string;
}

const Cameras = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"recent" | "all" | "filter">("recent");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  useEffect(() => {
    fetchCameras();
    fetchLocations();
  }, []);

  const fetchCameras = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/cameras", {
        headers: {
          "model-api-key": import.meta.env.VITE_MODEL_API_KEY,
        },
        withCredentials: true,
      });
      const mapped = response.data.map((cam: any) => ({
        id: cam._id,
        name: cam.name,
        status: cam.isConnected ? "Connected" : "Disconnected",
        dateAdded: new Date(cam.createdAt).toLocaleDateString(),
        location: cam.location?._id || cam.location,
      }));
      setCameras(mapped);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to retrieve cameras");
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get("/locations", { withCredentials: true });
      setLocations(res.data);
    } catch (error) {
      toast.error("Failed to load locations");
    }
  };

  const getDisplayedCameras = () => {
    if (tab === "recent") return cameras.slice(0, 10);

    if (tab === "filter" && selectedLocation !== "all") {
      return cameras.filter((cam) => cam.location === selectedLocation);
    }

    return cameras;
  };

  const displayedCameras = getDisplayedCameras();

  return (
    <DashboardLayout>
      {loading ? (
        <CameraListSkeleton />
      ) : (
        <>
          <div className="flex justify-between mt-24 items-center my-4">
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 text-[var(--text-color)] rounded ${
                  tab === "recent"
                    ? "bg-blue-600 text-white"
                    : " bg-[var(--card-bg)]"
                }`}
                onClick={() => setTab("recent")}
              >
                Recently Connected
              </button>
              <button
                className={`px-4 py-2 text-[var(--text-color)] rounded ${
                  tab === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-[var(--card-bg)]"
                }`}
                onClick={() => setTab("all")}
              >
                All Cameras
              </button>
              <button
                className={`px-4 py-2 text-[var(--text-color)] rounded ${
                  tab === "filter"
                    ? "bg-blue-600 text-white"
                    : "bg-[var(--card-bg)]"
                }`}
                onClick={() => setTab("filter")}
              >
                Filtered by Location
              </button>
            </div>

            {tab === "filter" && (
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border px-3 bg-[var(--card-bg)] py-2 rounded"
              >
                <option value="all">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.location}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={() => setModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              + Add Camera
            </button>
          </div>
          {cameras.length == 0 ? (
            <NoCameraFound />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {displayedCameras.map((camera) => (
                <CameraCard
                  key={camera.id}
                  camera={camera}
                  onAction={fetchCameras}
                />
              ))}
            </div>
          )}
          <AddCameraModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onCameraAdded={fetchCameras}
          />{" "}
        </>
      )}
    </DashboardLayout>
  );
};

export default Cameras;
