import BigLogo from "./BigLogo";
import { Shield, CheckCircle } from "lucide-react";

const WelcomePane = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 lg:p-12">
      {/* Logo Section */}
      <div className="mb-8">
        <BigLogo />
      </div>

      {/* Innovation Badge */}
      <div className="inline-flex items-center bg-blue-100/20 text-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200/30">
        <Shield className="w-4 h-4 mr-2" />
        AUCA Innovation Center
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 text-center leading-tight">
        Hi, Welcome to Crime Mapping & Smart Surveillance System
      </h1>

      {/* Description */}
      <p className="text-center mb-8 text-blue-100 text-lg lg:text-xl leading-relaxed max-w-md">
        Advanced surveillance system for easy crime mapping and smart surveillance system
      </p>

      {/* Feature Card */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8 w-full max-w-sm">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-white/20 rounded-lg p-4">
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
        </div>
        <div className="flex justify-center space-x-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
        </div>
      </div>

      {/* Features List */}
      <div className="flex flex-col space-y-2 mb-8">
        <div className="flex items-center text-blue-100">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm">Real-time Monitoring</span>
        </div>
        <div className="flex items-center text-blue-100">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm">AI-Powered Analysis</span>
        </div>
        <div className="flex items-center text-blue-100">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm">Instant Alerts</span>
        </div>
      </div>

      {/* Footer */}
      <p className="text-sm text-blue-200/70 text-center">
        © 2024 Crime Mapping System. All rights reserved.
      </p>
    </div>
  );
};

export default WelcomePane;
