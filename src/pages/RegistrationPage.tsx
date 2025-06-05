import { FaGoogle } from "react-icons/fa";
import WelcomePane from "../components/welcomePane";

const RegistrationPage: React.FC = () => {
  return (
    <div className="w-[100vw] gap-0 flex">
      <WelcomePane />

      <div className="w-1/2 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register Here! <span className="text-2xl">👋</span>
          </h2>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Your Full Names Here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-4">
            <button className="w-full flex items-center justify-center bg-[var(--card-bg)] text-[var(--text-color)] border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition duration-300">
              <FaGoogle className="mr-2" />
              Continue with Google
            </button>
          </div>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Already have an account ? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
