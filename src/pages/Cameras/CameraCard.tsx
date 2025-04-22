import React, { useState } from "react";
import { FiEye, FiTrash, FiLink, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export interface Camera {
  id: string;
  name: string;
  status: "Connected" | "Disconnected";
  dateAdded: string;
}

interface CameraCardProps {
  camera: Camera;
  onAction: () => void;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onAction }) => {
  const navigate = useNavigate();
  const { name, status, dateAdded } = camera;
  const isConnected = status === "Connected";

  const viewLiveFeed = () => {
    if (isConnected) {
      navigate(`/live-feed/${camera.id}`);
    }
  };

  const [loading, setLoading] = useState(false);
  const [desactivating, setDesactivating] = useState(false);

  const connectCamera = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`/cameras/connect/${camera.id}`, {
        withCredentials: true,
      });
      if (response.status == 200) {
        toast.success(`${camera.name} Connected Successfully !`);
        onAction();
      } else {
        toast.error(`Failed to connect ${camera.name}!`);
      }
    } catch (err: any) {
      console.error("Error connecting camera:", err);
      toast.error(
        err?.response?.data?.error ||
          `Failed to to connect camera : ${camera.name}`
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
      if (response.status == 200) {
        toast.success(`${camera.name} was disconnected Successfully !`);
        onAction();
      } else {
        toast.error(`Failed to disconnect ${camera.name}!`);
      }
    } catch (err: any) {
      console.error("Error disconnecting cameras:", err);
      toast.error(
        err?.response?.data?.error ||
          `Failed to to disconnect camera : ${camera.name}`
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
      if (response.status == 200) {
        toast.success(`${camera.name} was Desactivated Successfully !`);
        onAction();
      } else {
        toast.error(`Failed to desactivate ${camera.name}!`);
      }
    } catch (err: any) {
      console.error("Error disconnecting cameras:", err);
      toast.error(
        err?.response?.data?.error ||
          `Failed to to desactivate camera : ${camera.name}`
      );
    } finally {
      setDesactivating(false);
    }
  };

  return (
    <div className="border rounded-md p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <div className="flex items-center mb-2">
        <span
          className={`h-2 w-2 rounded-full mr-2 ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <span>{status}</span>
      </div>
      <p className="text-sm text-gray-500 mb-4">Added On {dateAdded}</p>
      <div className="flex space-x-2">
        <button
          className={`flex items-center space-x-1 px-3 py-1 rounded-md text-white ${
            isConnected ? "bg-red-500" : "bg-green-500"
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
            <Loader2 />
          ) : (
            <span>{isConnected ? "Disconnect" : "Connect"}</span>
          )}
        </button>
        <button
          onClick={viewLiveFeed}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
            isConnected
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!isConnected}
        >
          <FiEye />
          <span>View Live Feed</span>
        </button>
        <button
          className="flex items-center space-x-1 px-3 py-1 rounded-md bg-red-500 text-white"
          onClick={desactivateCamera}
        >
          <FiTrash />
          <span>{desactivating ? "Removing..." : "Remove"} </span>
        </button>
      </div>
    </div>
  );
};

export default CameraCard;
