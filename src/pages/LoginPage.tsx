import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FaArrowLeft, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinners";
import WelcomePane from "../components/welcomePane";
import axios from "../config/axios";

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
    } catch (err: unknown) {
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
        const res = await axios.post("/users/google-login", {
          accessToken,
        });
        const { token, user, tempToken } = res.data;
        localStorage.setItem("userInfo", JSON.stringify(user));
        if (token) {
          document.cookie = `jwt=${token}; path=/`;
          sessionStorage.setItem("token", token);
        }
        if (tempToken) {
          toast.success("Please enter the 2FA code sent to your email.");
          navigate("/2f-auth");
        } else {
          toast.success("Login Successful");
          sessionStorage.setItem("userRole", user.role);
          navigate("/user-dashboard");
        }
      } catch (err: unknown) {
        if (err && typeof err === "object" && "response" in err) {
          // @ts-expect-error Accessing dynamic error object from axios
          toast.error((err as Record<string, unknown>)?.response?.data?.message || "Google Login Failed");
        } else {
          toast.error("Google Login Failed");
        }
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error: unknown) => {
      console.log("Google Sign-In failed:", error);
      toast.error("Google Sign-In failed");
    },
  });

  const handleErrors = (err: unknown, defaultMessage: string) => {
    console.log(err);
    if (err && typeof err === "object" && "status" in err && "response" in err) {
      const errObj = err as { status?: number; response?: { data?: { message?: string } } };
      if (errObj.status === 403) {
        toast.info(errObj.response?.data?.message);
        return;
      }
      const message = errObj.response?.data?.message ||
        (errObj.status === 401 || errObj.status === 404
          ? defaultMessage
          : "An unexpected error occurred. Please try again later");
      toast.error(message);
    } else {
      toast.error(defaultMessage);
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
        {/* Right: Login Card */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-8 md:p-0">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 flex flex-col items-center mx-auto min-h-[400px] md:min-h-[500px] justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">
              Welcome Back! <span className="text-2xl">👋</span>
            </h2>
            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            {isLoading && <div className="mt-4"><Spinner /></div>}
            <div className="mt-4 w-full">
              <button
                onClick={() => handleGoogleSignIn()}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-white py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors font-medium shadow-sm"
              >
                <FaGoogle className="mr-2" />
                Continue with Google
              </button>
              <button
                onClick={() => navigate("/")}
                disabled={isLoading}
                className="w-full flex mt-4 items-center justify-center bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-white py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors font-medium shadow-sm"
              >
                <FaArrowLeft className="mr-2" />
                Go Home
              </button>
            </div>
            <div className="mt-4 w-full flex flex-col sm:flex-row justify-between items-center text-center">
              <span className="text-slate-600 dark:text-slate-400">
                Forgot Password?{' '}
                <a
                  href="/password-reset"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Click here
                </a>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
