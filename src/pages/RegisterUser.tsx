import { useState } from "react";
import Spinner from "../components/Spinners";
import axios from "../config/axios";
import { toast } from "react-toastify";
import DashboardLayout from "../Layout/DashboardLayout";
import { FiArrowLeft, FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";
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
      <div className="flex justify-between mt-24 items-center my-4">
        <span
          onClick={() => {
            navigate("/users");
          }}
          className="cursor-pointer rounded-md"
        >
          <FiArrowLeft className="w-16 h-10" />
        </span>
      </div>
      <div className="w-1/2 mx-auto my-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register New User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiUser className="w-5 h-5" />
            </span>

            <input
              type="text"
              name="names"
              value={userInfo?.names}
              onChange={handleInputChange}
              placeholder="Enter user's names"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiPhone className="w-5 h-5" />
            </span>

            <input
              type="text"
              name="phone"
              value={userInfo?.phone}
              onChange={handleInputChange}
              placeholder="Enter user's phone number"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiMail className="w-5 h-5" />
            </span>

            <input
              type="email"
              name="email"
              value={userInfo?.email}
              onChange={handleInputChange}
              placeholder="Enter user's Email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiLock className="w-5 h-5" />
            </span>

            <input
              type="password"
              name="password"
              value={userInfo?.password}
              onChange={handleInputChange}
              placeholder="Enter user's password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiLock className="w-5 h-5" />
            </span>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm user's password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
          >
            {isLoading ? "Registering User..." : "Register"}
          </button>
        </form>
        {isLoading && <Spinner />}
      </div>
    </DashboardLayout>
  );
};

export default RegisterUserPage;
