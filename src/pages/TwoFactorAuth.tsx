import React, { useState, useRef, useEffect } from "react";
import WelcomePane from "../components/welcomePane";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinners";
import axios from "../config/axios";
import { toast } from "react-toastify";

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
    <div className="w-[100vw] gap-0 flex">
      <WelcomePane />
      <div className="w-1/2 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md text-[var(--text-color)] rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Two Factor Authentication
          </h2>
          <p className="text-left mb-6">
            Please enter the 6-digit code we just sent to your email.
          </p>
          <div className="flex justify-between mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="w-12 h-12 text-center text-2xl border bg-[var(--card-bg)] border-[var(--text-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              />
            ))}
          </div>
          <button
            onClick={() => handleSubmit()}
            disabled={isLoading}
            className="w-full text-[var(--card-bg)] bg-[var(--text-color)] py-3 rounded-md transition duration-300"
          >
            {isLoading ? "Verifying..." : "Continue"}
          </button>
          {isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
