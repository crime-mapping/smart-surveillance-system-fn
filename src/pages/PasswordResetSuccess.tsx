import { useNavigate } from "react-router-dom";
import WelcomePane from "../components/welcomePane";
import { CheckCircle } from "lucide-react";

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex lg:flex-row h-screen">
      <WelcomePane />
      <div className="flex flex-col m-auto items-center justify-center bg-white text-center">
        <div className="bg-green-100 p-4 rounded-full mb-6 shadow-md">
          <CheckCircle className="text-green-600 w-16 h-16" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Congratulations!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Your password has been reset successfully.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <span className="text-lg">←</span> Login
        </button>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
