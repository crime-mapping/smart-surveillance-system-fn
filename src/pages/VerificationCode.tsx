import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "../config/axios";
import WelcomePane from "../components/welcomePane";
import { PiLockKeyOpenFill } from "react-icons/pi";
import { AxiosError } from "axios";

const VerificationCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(6).fill(null)
  );

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value)) || value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all boxes are filled
    if (newCode.every((num) => num !== "")) {
      handleSubmit(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && index > 0 && code[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (resetCode: string) => {
    if (loading || code.some((num) => num === "")) return;

    setLoading(true);
    try {
      const response = await axios.post("/users/verify-reset", {
        email,
        resetCode,
      });
      toast.success(response.data.message);
      navigate("/passwordconfirmation", { state: { email, resetCode } });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error || "Invalid code. Try again!");
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
        {/* Right: Verification Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-8 md:p-0">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 flex flex-col items-center mx-auto min-h-[400px] md:min-h-[500px] justify-center">
            <PiLockKeyOpenFill className="text-5xl sm:text-6xl text-blue-600 dark:text-blue-400 mx-auto mb-6" />

            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-slate-900 dark:text-white">
              Enter Verification Code
            </h1>
            <p className="mb-6 text-center text-slate-600 dark:text-slate-400">
              Please enter the 6-digit code we sent to your email
            </p>

            {/* 6-digit input field */}
            <div className="flex space-x-2 justify-center mb-8">
              {code.map((num, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={num}
                  maxLength={1}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-slate-900 dark:text-white text-xl font-semibold"
                />
              ))}
            </div>

            <div className="flex w-full gap-x-4 mb-4">
              <button
                onClick={() => navigate("/password-reset")}
                disabled={loading}
                className="py-3 px-6 w-1/2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors font-medium shadow-sm"
              >
                Resend Code
              </button>
              <button
                type="submit"
                className={`py-3 px-6 w-1/2 rounded-lg font-medium transition-colors shadow-lg ${code.some((num) => num === "") || loading
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl transform hover:scale-105"
                  }`}
                disabled={code.some((num) => num === "") || loading}
                onClick={() => handleSubmit(code.join(""))}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Verifying...
                  </div>
                ) : (
                  "Verify"
                )}
              </button>
            </div>

            <div className="w-full">
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
                Need help?{' '}
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Contact Support
                </button>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerificationCode;
