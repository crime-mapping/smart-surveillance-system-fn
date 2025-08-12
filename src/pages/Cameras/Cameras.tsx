import { useEffect, useState } from "react";
import CameraCard from "./CameraCard";
import AddCameraModal from "./AddCameraModel";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../Layout/DashboardLayout";
import CameraListSkeleton from "../../skeletons/CameraListSkeleton";
import NoCameraFound from "../../components/NoCameraFound";
import { Camera, Plus, Filter, Clock, Wifi, WifiOff } from "lucide-react";
import { describe } from "node:test";

export interface Camera {
  id: string;
  name: string;
  description:string;
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
        description: cam.description,
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

  const getCameraStats = () => {
    const connected = cameras.filter(cam => cam.status === 'Connected').length;
    const disconnected = cameras.filter(cam => cam.status === 'Disconnected').length;
    const total = cameras.length;

    return { connected, disconnected, total };
  };

  const stats = getCameraStats();

  return (
    <DashboardLayout>
      {loading ? (
        <CameraListSkeleton />
      ) : (
        <div className="min-h-screen p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Camera className="text-blue-600 h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Cameras</h1>
                    <p className="text-gray-600">Manage and monitor surveillance cameras across all locations</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Camera
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <Wifi className="text-green-600 h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Connected</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.connected}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <WifiOff className="text-red-600 h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Disconnected</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.disconnected}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Camera className="text-blue-600 h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Total Cameras</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "recent"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    onClick={() => setTab("recent")}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Recently Connected
                  </button>
                  <button
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "all"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    onClick={() => setTab("all")}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    All Cameras
                  </button>
                  <button
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "filter"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    onClick={() => setTab("filter")}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter by Location
                  </button>
                </div>

                {tab === "filter" && (
                  <div className="lg:w-64">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                    >
                      <option value="all">All Locations</option>
                      {locations.map((loc) => (
                        <option key={loc._id} value={loc._id}>
                          {loc.location}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {displayedCameras.length === 0
                    ? "No cameras found"
                    : `Showing ${displayedCameras.length} camera${displayedCameras.length !== 1 ? 's' : ''}`
                  }
                </h2>
                {displayedCameras.length > 0 && (
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Connected</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Disconnected</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cameras Grid */}
            {cameras.length === 0 ? (
              <NoCameraFound />
            ) : displayedCameras.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cameras found</h3>
                <p className="text-gray-500">
                  {tab === "filter" && selectedLocation !== "all"
                    ? "No cameras found for the selected location"
                    : "No cameras match your current filter criteria"
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCameras?.map((camera) => (
                  <CameraCard
                    key={camera.id}
                    camera={camera}
                    onAction={fetchCameras}
                  />
                ))}
              </div>
            )}
          </div>

          <AddCameraModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onCameraAdded={fetchCameras}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Cameras;
