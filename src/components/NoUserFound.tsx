import { Slash, Users } from "lucide-react";

const NoUserFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center bg-white rounded-lg shadow-inner p-6">
      <div className="relative w-6 h-6">
        <Users className="absolute text-gray-400" />
        <Slash className="absolute text-red-500" />
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No Users Found
      </h2>
      <p className="text-gray-500 mb-6">
        We can't find any registered users by now. Start by registering a new
        one.
      </p>
    </div>
  );
};

export default NoUserFound;
