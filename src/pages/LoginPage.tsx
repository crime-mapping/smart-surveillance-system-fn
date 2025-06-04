import { FaGoogle } from "react-icons/fa";
import WelcomePane from "../components/welcomePane";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import Spinner from "../components/Spinners";
import axios from "../config/axios";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Email and Password are required!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });

      const { token, user, tempToken } = res.data;

      if (token) {
        document.cookie = `jwt=${token}; path=/`;
        sessionStorage.setItem("token", token);
      }

      if (tempToken) {
        toast.success("Please enter the 2-factor code we sent to your email.");
        navigate("/2f-auth");
      } else {
        toast.success("Login successful!");
        sessionStorage.setItem("userRole", user.role);
        navigate("/user-dashboard");
      }
    } catch (err: any) {
      console.log(err);
      handleErrors(err, "Incorrect email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        const accessToken = response.access_token;

        // Replace with your actual backend endpoint
        const res = await axios.post("/users/google-login", {
          accessToken,
        });

        const { token, user, tempToken } = res.data;
        // Save to localStorage or cookies (your choice)
        localStorage.setItem("userInfo", JSON.stringify(user));
        if (token) {
          document.cookie = `jwt=${token}; path=/`;
          sessionStorage.setItem("token", token);
        }

        if (tempToken) {
          // handle 2FA flow
          toast.success("Please enter the 2FA code sent to your email.");
          navigate("/2f-auth");
        } else {
          toast.success("Login Successful");
          sessionStorage.setItem("userRole", user.role);
          navigate("/user-dashboard");
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Google Login Failed");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.log("Google Sign-In failed:", error);
      toast.error("Google Sign-In failed");
    },
  });

  const handleErrors = (err: any, defaultMessage: string) => {
    console.log(err);
    if (err.status == 403) {
      toast.info(err.response.data.message);
      return;
    }
    const message =
      err.response.data.message ||
      (err.status === 401 || err.status === 404
        ? defaultMessage
        : "An unexpected error occurred. Please try again later");
    toast.error(message);
  };

  return (
    <div className="w-[100vw] gap-0 flex">
      <WelcomePane />

      <div className="w-1/2 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome Back! <span className="text-2xl">👋</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="crimemapping@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          {isLoading && <Spinner />}
          <div className="mt-4">
            <button
              onClick={() => handleGoogleSignIn()}
              className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition duration-300"
            >
              <FaGoogle className="mr-2" />
              Continue with Google
            </button>
          </div>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password? Click here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
