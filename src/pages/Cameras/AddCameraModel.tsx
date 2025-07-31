import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { X, Camera, MapPin, Link, FileText, User, Loader2 } from "lucide-react";

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
    if (isOpen) {
      fetchLocations();
    }
  }, [isOpen]);

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
      setLoading(true);
      const response = await axios.post("/cameras", camera, {
        withCredentials: true,
      });
      if (response.status == 201) {
        toast.success("Camera added successfully!");
        onClose();
        onCameraAdded();
        // Reset form
        setCamera({
          name: "",
          description: "",
          streamUrl: "",
          location: "",
        });
      }
    } catch (err: any) {
      console.error("Error adding camera:", err);
      toast.error(err?.response?.data?.error || "Failed to add camera");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCamera((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Camera className="text-blue-600 h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Camera</h2>
              <p className="text-sm text-gray-600">Configure camera settings and location</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Camera Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Camera Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={camera.name}
                name="name"
                placeholder="Enter camera name"
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>
          </div>

          {/* Stream URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Camera Stream URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="url"
                value={camera.streamUrl}
                placeholder="https://example.com/stream"
                name="streamUrl"
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Enter the RTSP or HTTP stream URL for the camera
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <select
                name="location"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white appearance-none"
                required
                value={camera.location}
                onChange={handleInputChange}
              >
                <option value="">Select a location</option>
                {locations.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.location}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
              </div>
              <textarea
                placeholder="Enter camera description..."
                name="description"
                value={camera.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding Camera...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4 mr-2" />
                  Add Camera
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCameraModal;
