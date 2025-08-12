import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { Loader2, Camera, MapPin, Link, FileText, User, X } from "lucide-react";

interface Location {
  _id: string;
  location: string;
  description: string;
}

interface EditCameraModalProps {
  isOpen: boolean;
  cameraId: string;
  onClose: () => void;
  onUpdated: () => void;
}

const EditCameraModal: React.FC<EditCameraModalProps> = ({
  isOpen,
  cameraId,
  onClose,
  onUpdated,
}) => {
  const [camera, setCamera] = useState({
    name: "",
    description: "",
    streamUrl: "",
    location: "",
  });
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCameraData();
      fetchLocations();
    }
  }, [isOpen, cameraId]);

  const fetchCameraData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/cameras/${cameraId}`, {
        withCredentials: true,
      });
      const { name, streamUrl, description, location } = res.data;
      setCamera({
        name,
        streamUrl,
        description: description || "",
        location:location._id || "",
      });
    } catch (err: any) {
      console.error("Error fetching camera:", err);
      toast.error("Failed to fetch camera details");
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get("/locations", {
        withCredentials: true,
      });
      setLocations(res.data);
    } catch (err: any) {
      console.error("Error fetching locations:", err);
      toast.error("Failed to fetch locations");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      const res = await axios.put(`/cameras/${cameraId}`, camera, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Camera updated successfully!");
        onUpdated();
        onClose();
      } else {
        toast.error("Failed to update camera");
      }
    } catch (err: any) {
      console.error("Error updating camera:", err);
      toast.error(err?.response?.data?.error || "Failed to update camera");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Camera className="text-yellow-600 h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Camera</h2>
              <p className="text-sm text-gray-600">Modify camera details</p>
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
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Camera Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={camera.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          </div>

          {/* Stream URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stream URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="url"
                name="streamUrl"
                value={camera.streamUrl}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <select
                name="location"
                value={camera.location}
                
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Select a location</option>
                {locations.map((loc) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
              </div>
              <textarea
                name="description"
                value={camera.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium flex justify-center items-center"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCameraModal;
