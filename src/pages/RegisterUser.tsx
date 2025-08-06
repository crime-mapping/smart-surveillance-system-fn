import { useState } from "react";
import Spinner from "../components/Spinners";
import axios from "../config/axios";
import { toast } from "react-toastify";
import DashboardLayout from "../Layout/DashboardLayout";
import { ArrowLeft, User, Lock, Mail, Phone, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IUser {
  email: string;
  names: string;
  phone: string;
  password: string;
}

const RegisterUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userInfo, setUserInfo] = useState<IUser>({
    email: "",
    names: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clearInputs = () => {
    setUserInfo({
      email: "",
      names: "",
      phone: "",
      password: "",
    });
    setConfirmPassword("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !userInfo?.password ||
      !userInfo?.names ||
      !userInfo?.email ||
      !userInfo?.phone
    ) {
      toast.error("All fields are required!");
      setIsLoading(false);
      return;
    }

    if (userInfo?.password !== confirmPassword) {
      toast.error("Password Mismatches!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("/users", userInfo, {
        withCredentials: true,
      });
      if (res.status == 201) {
        clearInputs();
        toast.success("New user was registered successfully!");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => navigate("/users")}
                className="inline-flex items-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Register New User</h1>
                <p className="text-gray-600">Create a new user account for the system</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <UserPlus className="text-green-600 h-4 w-4" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">User Registration</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    name="names"
                    value={userInfo?.names}
                    onChange={handleInputChange}
                    placeholder="Enter user's full name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    name="phone"
                    value={userInfo?.phone}
                    onChange={handleInputChange}
                    placeholder="Enter user's phone number"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="email"
                    name="email"
                    value={userInfo?.email}
                    onChange={handleInputChange}
                    placeholder="Enter user's email address"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="password"
                    name="password"
                    value={userInfo?.password}
                    onChange={handleInputChange}
                    placeholder="Enter user's password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm user's password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                {confirmPassword && userInfo?.password !== confirmPassword && (
                  <p className="mt-2 text-xs text-red-500">
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    <span className="ml-2">Registering User...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register User
                  </>
                )}
              </button>
            </form>

            {/* Information Card */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Registration Information
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        The new user will receive an email notification with their login credentials.
                        They will be able to access the system immediately after registration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegisterUserPage;
