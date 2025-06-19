import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import axios from "../config/axios";
import WelcomePane from "../components/welcomePane";
import { ImUnlocked } from "react-icons/im";

const PasswordConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const resetCode = location.state?.resetCode || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      toast.error("Passwords must be at least 6  characters");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/users/reset-password", {
        email,
        resetCode,
        newPassword: password,
      });
      toast.success(response.data.message);
      navigate("/password-reset-success");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen m-auto">
      <WelcomePane />
      <div className="flex flex-col m-auto items-center">
        <ImUnlocked className="text-7xl text-primaryBackground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Reset Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 rounded-lg space-y-6"
        >
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-primaryGradientStart hover:bg-primaryGradientEnd text-white py-3 px-6 rounded-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordConfirmation;
