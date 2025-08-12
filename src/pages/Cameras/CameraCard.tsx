import React, { useState } from "react";
import { FiEye, FiTrash, FiLink, FiXCircle } from "react-icons/fi";
//import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import EditCameraModal from "./EditCameraModal";

export interface Camera {
  id: string;
  name: string;
  description:string;
  status: "Connected" | "Disconnected";
  dateAdded: string;
}

interface CameraCardProps {
  camera: Camera;
  onAction: () => void;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onAction }) => {
  //const navigate = useNavigate();
  const { name, status, description, dateAdded } = camera;
  const isConnected = status === "Connected";

  const [loading, setLoading] = useState(false);
  const [desactivating, setDesactivating] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);



  // const viewLiveFeed = () => {
  //   if (isConnected) {
  //     navigate(`/live-feed/${camera.id}`);
  //   }
  // };

  const connectCamera = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`/cameras/connect/${camera.id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(`${camera.name} Connected Successfully!`);
        onAction();
      } else {
        toast.error(`Failed to connect ${camera.name}!`);
      }
    } catch (err: any) {
      console.error("Error connecting camera:", err);
      toast.error(
        err?.response?.data?.error || `Failed to connect camera: ${camera.name}`
      );
    } finally {
      setLoading(false);
    }
  };

  const disconnectCamera = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`/cameras/disconnect/${camera.id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(`${camera.name} was disconnected Successfully!`);
        onAction();
      } else {
        toast.error(`Failed to disconnect ${camera.name}!`);
      }
    } catch (err: any) {
      console.error("Error disconnecting camera:", err);
      toast.error(
        err?.response?.data?.error ||
          `Failed to disconnect camera: ${camera.name}`
      );
    } finally {
      setLoading(false);
    }
  };

  const desactivateCamera = async () => {
    try {
      setDesactivating(true);
      const response = await axios.put(`/cameras/desactivate/${camera.id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(`${camera.name} was Desactivated Successfully!`);
        onAction();
      } else {
        toast.error(`Failed to desactivate ${camera.name}!`);
      }
    } catch (err: any) {
      console.error("Error desactivating camera:", err);
      toast.error(
        err?.response?.data?.error ||
          `Failed to desactivate camera: ${camera.name}`
      );
    } finally {
      setDesactivating(false);
    }
  };

  return (
    <div className="border rounded-xl bg-[var(--card-bg)] p-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg animate-fade-in">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-md text-italic mb-2">{description}</p>
      <div className="flex items-center mb-2">
        <span
          className={`h-2 w-2 rounded-full mr-2 ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <span>{status}</span>
      </div>
      <p className="text-sm text-gray-500 mb-4">Added On {dateAdded}</p>
      <div className="flex flex-wrap gap-2">
        <button
          className={`flex items-center space-x-1 px-3 py-1 rounded-md text-white transition duration-200 hover:opacity-90 ${
            isConnected ? "bg-red-200" : "bg-green-500"
          }`}
          onClick={() => {
            if (isConnected) {
              disconnectCamera();
            } else {
              connectCamera();
            }
          }}
        >
          {isConnected ? <FiXCircle /> : <FiLink />}
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>{isConnected ? "Disconnect" : "Connect"}</span>
          )}
        </button>
        {/* <button
          onClick={viewLiveFeed}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md transition duration-200 ${
            isConnected
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!isConnected}
        >
          <FiEye />
          <span>View Live Feed</span>
        </button> */}
        <button
  className="flex items-center space-x-1 px-3 py-1 rounded-md bg-yellow-500 text-white transition duration-200 hover:bg-yellow-600"
  onClick={() => setShowEditModal(true)}
>
  ✏️
  <span>Edit</span>
</button>

        <button
          className="flex items-center space-x-1 px-3 py-1 rounded-md bg-red-500 text-white transition duration-200 hover:bg-red-600"
          onClick={desactivateCamera}
        >
          <FiTrash />
          <span>{desactivating ? "Removing..." : "Remove"}</span>
        </button>
      </div>
          {showEditModal && (
  <EditCameraModal
    isOpen={showEditModal}
    cameraId={camera.id}
    onClose={() => setShowEditModal(false)}
    onUpdated={onAction} // refresh list
  />
)}
    </div>
    
  );
};

export default CameraCard;
