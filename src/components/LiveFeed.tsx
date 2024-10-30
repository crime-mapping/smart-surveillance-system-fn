import React from 'react';
import UserSidebar from './UserSideBar';
import { useParams } from 'react-router-dom';

const LiveFeed: React.FC = () => {

  const { cameraId } = useParams();  
  return (
    <div className="w-[100vw] h-screen">
       <UserSidebar/>
      <div className="w-[85%] h-4/5 ml-[15%] p-4">
      <h1 className="text-2xl font-bold mb-4">Live Feed for Camera {cameraId}</h1>
      <div className="video-container">
        {/* <video src="https://www.youtube.com/watch?v=iiacb1YFKW0" controls autoPlay className="w-[100%] rounded-lg">
          Your browser does not support the video tag.
        </video> */}
         <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // replace with any YouTube video URL
          title="Live Video Feed"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      </div>
    </div>
  );
};

export default LiveFeed;
