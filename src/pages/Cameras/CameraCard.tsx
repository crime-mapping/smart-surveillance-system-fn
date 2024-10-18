import React from 'react';


export interface Camera {
  id: number;
  name: string;
  status: 'Connected' | 'Disconnected';
  dateAdded: string;
}

interface CameraCardProps {
  camera: Camera; 
}

const CameraCard:React.FC<CameraCardProps> = ({ camera }) => {
  const { name, status, dateAdded } = camera;
  const isConnected = status === 'Connected';

  return (
    <div className="border rounded-md p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <div className="flex items-center mb-2">
        <span
          className={`h-2 w-2 rounded-full mr-2 ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
        <span>{status}</span>
      </div>
      <p className="text-sm text-gray-500 mb-4">Added On {dateAdded}</p>
      <div className="flex space-x-2">
        <button
          className={`px-3 py-1 rounded-md text-white ${
            isConnected ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
        <button className="px-3 py-1 rounded-md bg-blue-500 text-white">
          View Live Feed
        </button>
        <button className="px-3 py-1 rounded-md bg-red-500 text-white">Remove</button>
      </div>
    </div>
  );
};

export default CameraCard;
