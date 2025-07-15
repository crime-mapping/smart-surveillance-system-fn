import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, MapPin, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import DashboardLayout from "../Layout/DashboardLayout";
import axios from "../config/axios";
import AllLocationsSkeleton from "../skeletons/AllLocationsSkeleton";

interface ICamera {
  _id: string;
  name: string;
}

interface ILocation {
  _id: string;
  location: string;
  description: string;
  coordinates: [number, number];
  cameras: ICamera[];
}

const ITEMS_PER_PAGE = 6;

const AllLocations: React.FC = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCamerasModal, setShowCamerasModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<ILocation | null>(
    null
  );

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get("/locations", { withCredentials: true });
      setLocations(res.data);
    } catch (error) {
      toast.error("Failed to load locations");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setLatitude("");
    setLongitude("");
    setSelectedLocation(null);
  };

  const handleSave = async () => {
    if (!name || !latitude || !longitude) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (
      isNaN(lat) ||
      isNaN(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      toast.error("Please enter valid latitude and longitude.");
      return;
    }

    try {
      if (selectedLocation) {
        // Update
        await axios.put(
          `/locations/${selectedLocation._id}`,
          {
            location: name,
            description,
            coordinates: [lat, lng],
          },
          { withCredentials: true }
        );

        toast.success("Location updated successfully");
      } else {
        // Create
        await axios.post(
          "/locations",
          {
            location: name,
            description,
            coordinates: [lat, lng],
          },
          { withCredentials: true }
        );

        toast.success("Location created successfully");
      }

      fetchLocations();
      setShowModal(false);
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to save location");
    }
  };

  const handleDeleteClick = (location: ILocation) => {
    setLocationToDelete(location);
    setConfirmDeleteModal(true);
  };

  const deleteLocation = async () => {
    if (!locationToDelete) return;
    try {
      const response = await axios.delete(
        `/locations/${locationToDelete._id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        toast.success("Location deleted successfully");
      } else {
        toast.error("Location was not deleted successfully");
      }
      fetchLocations(); // reload list
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to delete location");
    } finally {
      setConfirmDeleteModal(false);
      setLocationToDelete(null);
    }
  };

  const filteredLocations = locations.filter((loc) =>
    loc.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentLocations = filteredLocations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLocations.length / ITEMS_PER_PAGE);

  return (
    <DashboardLayout>
      {loading ? (
        <AllLocationsSkeleton />
      ) : (
        <div className="py-8 mt-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Supervised Locations</h1>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={() => {
                setShowModal(true);
                resetForm();
              }}
            >
              <Plus size={18} /> Add Location
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border bg-[var(--card-bg)] text-[var(--text-color)] px-3 py-2 rounded w-full md:w-1/3"
            />
          </div>

          {/* Locations List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentLocations.map((loc) => (
              <div
                key={loc._id}
                className="bg-[var(--card-bg)] border text-[var(--text-color)] rounded-lg p-6 flex flex-col justify-between shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg animate-fade-in"
              >
                <div>
                  <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <MapPin size={18} /> {loc.location}
                  </h2>
                  <p className="text-[var(--text-color)] text-sm mb-2">
                    {loc.description || "No description"}
                  </p>
                  <p className="text-[var(--text-color)] text-xs">
                    Latitude: {loc.coordinates[0]}
                  </p>
                  <p className="text-[var(--text-color)] text-xs mb-4">
                    Longitude: {loc.coordinates[1]}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    title="View Cameras"
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowCamerasModal(true);
                    }}
                    className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Camera size={16} /> {loc.cameras.length}
                  </button>
                  <div className="flex space-x-3">
                    <button
                      title="Edit Location"
                      onClick={() => {
                        setSelectedLocation(loc);
                        setName(loc.location);
                        setDescription(loc.description);
                        setLatitude(loc.coordinates[0]?.toString());
                        setLongitude(loc.coordinates[1]?.toString());
                        setShowModal(true);
                      }}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      title="Delete Location"
                      onClick={() => handleDeleteClick(loc)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

          {confirmDeleteModal && locationToDelete && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg p-6 shadow-md w-full max-w-sm text-center"
              >
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p className="text-[var(--text-color)] mb-4">
                  Are you sure you want to delete{" "}
                  <strong>{locationToDelete.location}</strong>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={deleteLocation}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setConfirmDeleteModal(false)}
                    className="bg-[var(--card-bg)] text-[var(--text-color)] px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Create / Edit Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 bg-[var(--card-bg)] text-[var(--text-color)] bg-opacity-30 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg p-8 w-full max-w-md"
              >
                <h2 className="text-xl font-bold mb-6">
                  {selectedLocation ? "Edit Location" : "Add New Location"}
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Location Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border bg-[var(--card-bg)] text-[var(--text-color)] w-full p-2 rounded"
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border bg-[var(--card-bg)] text-[var(--text-color)] w-full p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Latitude (-90 to 90)"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="border bg-[var(--card-bg)] text-[var(--text-color)] w-full p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Longitude (-180 to 180)"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="border bg-[var(--card-bg)] text-[var(--text-color)] w-full p-2 rounded"
                  />
                </div>
                <div className="flex justify-end mt-6 space-x-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-[var(--card-bg)] text-[var(--text-color)] px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-primaryBackground text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {selectedLocation ? "Update" : "Create"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* View Cameras Modal */}
          {showCamerasModal && selectedLocation && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg p-8 w-full max-w-md"
              >
                <h2 className="text-xl font-bold mb-4">
                  Cameras at {selectedLocation.location}
                </h2>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  {selectedLocation.cameras.length > 0 ? (
                    selectedLocation.cameras.map((cam) => (
                      <li key={cam._id} className="text-gray-700">
                        {cam.name}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">No cameras found.</p>
                  )}
                </ul>
                <button
                  onClick={() => setShowCamerasModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AllLocations;
