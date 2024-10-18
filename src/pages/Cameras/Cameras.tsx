import { useState } from 'react';
import CameraCard from './CameraCard';
import { Camera } from './CameraCard';
import UserSidebar from '../../components/UserSideBar';
import AddCameraModal from './AddCameraModel';
import UserHeader from '../../components/userHeader';

const Cameras = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  // Sample data for the cameras
  const cameras:Camera[] = [
    {
      id: 1,
      name: 'Northern Corner Camera',
      status: 'Disconnected',
      dateAdded: '17th June 2024',
    },
    {
      id: 2,
      name: 'Garden Camera',
      status: 'Connected',
      dateAdded: '17th June 2024',
    },
    {
      id: 3,
      name: 'Main Gate Camera',
      status: 'Connected',
      dateAdded: '17th June 2024',
    },
    {
      id: 4,
      name: 'Northern Corner Camera',
      status: 'Disconnected',
      dateAdded: '17th June 2024',
      },
    
  ];

  return (
      <div className="w-[100vw] h-screen">
          <UserSidebar/>
        <div className="w-[85%] ml-[15%] p-4">
        <UserHeader/>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Recently Connected Cameras</h1>
        <button onClick={() => setModalOpen(true)}  className="bg-green-500 text-white px-4 py-2 rounded-md">+ Add Camera</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {cameras.map((camera) => (
          <CameraCard key={camera.id} camera={camera} />
        ))}
      </div>
      <AddCameraModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
    </div>
  );
};

export default Cameras;
