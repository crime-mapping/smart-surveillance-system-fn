import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import axios from "../config/axios";
import WelcomePane from "../components/welcomePane";
import { PiLockKeyOpenFill } from "react-icons/pi";

const VerificationCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(6).fill(null)
  );

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value)) || value.length > 1) return;

    let newCode = [...code];
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
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Invalid code. Try again!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <WelcomePane />
      <div className="flex flex-col items-center m-auto">
        <PiLockKeyOpenFill className="text-7xl text-primaryBackground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Please Enter Reset Password Code Below
        </h1>
        <p>Please enter 6 digits we jsut sent to your email.</p>
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
              className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xl"
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className={`py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition ${
              code.some((num) => num === "")
                ? "bg-gray-400 text-gray-700 w-full cursor-not-allowed"
                : "bg-primaryBackground w-full text-white hover:bg-blue-700"
            }`}
            disabled={code.some((num) => num === "")}
            onClick={() => handleSubmit(code.join(""))}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
