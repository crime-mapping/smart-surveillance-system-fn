import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import axios from "../config/axios";
import WelcomePane from "../components/welcomePane";
import { PiLockKeyOpenFill } from "react-icons/pi";
import Spinner from "../components/Spinners";

const TwoFactorAuth: React.FC = () => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
    inputRefs.current[0]?.focus(); // Autofocus first input
  }, []);

  const handleChange = (index: number, value: string) => {
    const numeric = value.replace(/\D/g, "");
    if (!numeric) return;

    const updatedCode = [...code];
    updatedCode[index] = numeric[0];
    setCode(updatedCode);

    if (index < 5 && numeric.length > 0) {
      inputRefs.current[index + 1]?.focus();
    }

    // Only submit when user types and all are filled
    if (updatedCode.every((char) => char !== "")) {
      setTimeout(() => handleSubmit(updatedCode.join("")), 100);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("Text").replace(/\D/g, "");
    if (pasted.length === 6) {
      const split = pasted.split("").slice(0, 6);
      setCode(split);
      inputRefs.current[5]?.focus();
      setTimeout(() => handleSubmit(split.join("")), 100);
    } else {
      toast.error("Please paste a 6-digit code.");
    }
  };

  const handleSubmit = async (submittedCode?: string) => {
    const finalCode = submittedCode || code.join("");

    if (finalCode.length !== 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/users/two-factor", {
        tempToken: finalCode,
      });

      const { token, user } = res.data;
      sessionStorage.setItem("token", JSON.stringify(token));
      document.cookie = `jwt=${token}; path=/`;

      toast.success("Two-factor authentication successful!");
      sessionStorage.setItem("userRole", user.role);
      navigate("/user-dashboard");
    } catch (error: any) {
      console.error("2FA Error:", error);
      toast.error(error?.response?.data?.message || "Invalid 2FA code.");
    } finally {
      setIsLoading(false);
    }
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
        {/* Right: Two-Factor Auth Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-8 md:p-0">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 flex flex-col items-center mx-auto min-h-[400px] md:min-h-[500px] justify-center">
            <PiLockKeyOpenFill className="text-5xl sm:text-6xl text-blue-600 dark:text-blue-400 mx-auto mb-6" />

            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">
              Two-Factor Authentication
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="w-full space-y-5">
              <div>
                <p className="mb-4 text-center text-slate-600 dark:text-slate-400">
                  Please enter the 6-digit code we just sent to your email.
                </p>
                {/* 6-digit input field */}
                <div className="flex space-x-2 justify-center">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          const newCode = [...code];
                          if (code[index] === "" && index > 0) {
                            inputRefs.current[index - 1]?.focus();
                          } else {
                            newCode[index] = "";
                            setCode(newCode);
                          }
                        }
                      }}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 text-center bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-slate-900 dark:text-white text-xl font-semibold"
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? "Verifying..." : "Continue"}
              </button>
            </form>
            {isLoading && <div className="mt-4"><Spinner /></div>}

            <div className="mt-4 w-full">
              <button
                onClick={() => navigate("/login")}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-white py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors font-medium shadow-sm"
              >
                <FaArrowLeft className="mr-2" />
                Back to Login
              </button>
            </div>

            <div className="mt-4 w-full flex flex-col sm:flex-row justify-between items-center text-center">
              <span className="text-slate-600 dark:text-slate-400">
                Need help?{' '}
                <button
                  onClick={() => navigate("/help")}
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

export default TwoFactorAuth;
