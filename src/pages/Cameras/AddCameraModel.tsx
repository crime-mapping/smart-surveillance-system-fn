import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface AddCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCameraModal: React.FC<AddCameraModalProps> = ({ isOpen, onClose }) => {
  const [cameraName, setCameraName] = useState('');
  const [cameraResolution, setCameraResolution] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [ipAddress, setIpAdress] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add New Camera</h2>
          <button onClick={onClose} className="bg-white hover:text-gray-700">
            <CloseIcon/>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={cameraName}
              placeholder='Camera Name'
              onChange={(e) => setCameraName(e.target.value)}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
           <div className="mb-4">
            <input
              type="text"
              value={cameraResolution}
              placeholder='Camera Resolution'
              onChange={(e) => setCameraResolution(e.target.value)}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
           <div className="mb-4">
            <input
              type="number"
              value={modelNumber}
              placeholder='Model Number'
              onChange={(e) => setModelNumber(e.target.value)}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
           <div className="mb-4">
            <input
              type="text"
              placeholder='IP Address (e.g 192.168.10.3)'
              value={ipAddress}
              onChange={(e) => setIpAdress(e.target.value)}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
           <div className="mb-4">
            <input
              type="text"
              value={streamUrl}
              placeholder='Stream URL'
              onChange={(e) => setStreamUrl(e.target.value)}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
            <button
              type="submit"
              className="bg-primaryGradientStart w-full text-white px-4 py-2 rounded-md"
            >
              Add Camera
            </button>
        </form>
      </div>
    </div>
  );
};

export default AddCameraModal;
