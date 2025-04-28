import { FiVideoOff } from "react-icons/fi";

const NoCameraFound = () => {
  return (
    <div className="flex mt-24 flex-col items-center justify-center h-96 text-center bg-white rounded-lg shadow-inner p-6">
      <FiVideoOff className="text-5xl text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No Cameras Found
      </h2>
      <p className="text-gray-500 mb-6">
        You haven't added any cameras yet. Start by connecting a new one.
      </p>
    </div>
  );
};

export default NoCameraFound;
