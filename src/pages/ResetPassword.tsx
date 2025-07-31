import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "../config/axios";
import WelcomePane from "../components/welcomePane";
import { BsShieldLock } from "react-icons/bs";
import { AxiosError } from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/users/request-reset", {
        email,
      });
      if (response.status == 404) {
        toast.error("User With Such Email Is Not Found !");
        return;
      }
      if (response.status == 200) {
        toast.success(response.data.message);
        navigate("/verify", { state: { email } });
      } else {
        toast.error("An expected error occurred !");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error || "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
    }
    setLoading(false);
  };

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
        {/* Right: Reset Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-8 md:p-0">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 flex flex-col items-center mx-auto min-h-[400px] md:min-h-[500px] justify-center">
            <BsShieldLock className="text-5xl sm:text-6xl text-blue-600 dark:text-blue-400 mx-auto mb-6" />

            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-slate-900 dark:text-white">
              <span className="text-blue-600 dark:text-blue-400">Forgot</span>{" "}
              <span className="text-slate-900 dark:text-white">Password?</span>
            </h1>
            <p className="mb-6 text-center text-slate-600 dark:text-slate-400">
              Just enter your email below. We'll send you instructions
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-5"
            >
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Sending...
                  </div>
                ) : (
                  "Get Code"
                )}
              </button>
            </form>
            <div className="mt-4 w-full">
              <button
                onClick={() => navigate("/")}
                disabled={loading}
                className="w-full flex items-center justify-center bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-white py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors font-medium shadow-sm"
              >
                <FaArrowLeft className="mr-2" />
                Go Home
              </button>
            </div>
            <div className="mt-4 w-full flex flex-col sm:flex-row justify-center items-center text-center">
              <span className="text-slate-600 dark:text-slate-400">
                Remember your password?{' '}
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Sign In
                </button>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
