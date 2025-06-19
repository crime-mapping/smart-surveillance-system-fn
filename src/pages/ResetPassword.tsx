import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import axios from "../config/axios";
import WelcomePane from "../components/welcomePane";
import { BsShieldLock } from "react-icons/bs";

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
        navigate("/verificationcode", { state: { email } });
      } else {
        toast.error("An expected error occurred !");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="flex lg:flex-row h-screen">
      <WelcomePane />
      <div className="p-8 flex flex-col items-center m-auto">
        <BsShieldLock className="text-7xl text-primaryBackground mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-2">
          <span className="text-red-800">Forgot</span>{" "}
          <span className="text-red-400">Password?</span>
        </h1>
        <p className="mb-4">
          Just enter your email below. We'll send you instructions
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 rounded-lg space-y-6"
        >
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="smartsurveillancesystem@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primaryBackground w-full text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              "Get Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
