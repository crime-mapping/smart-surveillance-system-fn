import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinners";

interface AddCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCameraAdded: () => void;
}

interface Location {
  _id: string;
  location: string;
  description: string;
}

const AddCameraModal: React.FC<AddCameraModalProps> = ({
  isOpen,
  onClose,
  onCameraAdded,
}) => {
  const [camera, setCamera] = useState({
    name: "",
    description: "",
    streamUrl: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/locations", {
        withCredentials: true,
      });
      setLocations(response.data);
    } catch (err: any) {
      console.error("Error retrieving locations:", err);
      toast.error(err?.response?.data?.error || "Failed to retrieve locations");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Optional: validate fields here before sending

      setLoading(true);
      const response = await axios.post("/cameras", camera, {
        withCredentials: true,
      });
      if (response.status == 201) {
        toast.success("Camera added successfully!");
        onClose();
        onCameraAdded();
      }
    } catch (err: any) {
      console.error("Error adding camera:", err);
      toast.error(err?.response?.data?.error || "Failed to add camera");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCamera((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add New Camera</h2>
          <button
            onClick={onClose}
            className="bg-[var(--card-bg)] text-[var(--text-color)] hover:text-gray-700"
          >
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={camera.name}
              name="name"
              placeholder="Camera Name"
              onChange={handleInputChange}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={camera.streamUrl}
              placeholder="Camera Stream Url"
              name="streamUrl"
              onChange={handleInputChange}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <select
              name="location"
              className="border rounded-md w-full p-2"
              required
              value={camera.location}
              onChange={handleInputChange}
            >
              <option value="">Please select location</option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.location}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Camera Description(Optional)"
              name="description"
              value={camera.description}
              onChange={handleInputChange}
              className="border rounded-md w-full p-2 h-20"
            />
          </div>
          <button
            type="submit"
            className="bg-primaryGradientStart w-full text-white px-4 py-2 rounded-md"
          >
            {loading ? "Adding Camera..." : "Add Camera"}
          </button>
          {loading && <Spinner />}
        </form>
      </div>
    </div>
  );
};

export default AddCameraModal;
