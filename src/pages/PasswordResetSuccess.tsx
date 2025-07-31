import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import WelcomePane from "../components/welcomePane";
import { CheckCircle } from "lucide-react";

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <main className="flex-1 flex flex-col-reverse md:flex-row w-full">
        {/* Left: Welcome Pane */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
          <div className="w-full max-w-lg flex flex-col items-center justify-center text-center text-white h-full min-h-[400px] md:min-h-[500px] relative z-10 py-8 md:py-0">
            <WelcomePane />
          </div>
        </div>
        {/* Right: Success Message */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-8 md:p-0">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 flex flex-col items-center mx-auto min-h-[400px] md:min-h-[500px] justify-center text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6 shadow-lg">
              <CheckCircle className="text-green-600 dark:text-green-400 w-16 h-16" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900 dark:text-white">
              Congratulations!
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Your password has been reset successfully. You can now log in with your new password.
            </p>

            <div className="w-full space-y-4">
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                Sign In Now
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full flex items-center justify-center bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-white py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors font-medium shadow-sm"
              >
                <FaArrowLeft className="mr-2" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PasswordResetSuccess;
