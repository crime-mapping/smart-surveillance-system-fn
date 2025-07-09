import BigLogo from "./BigLogo";

const WelcomePane = () => {
  return (
    <div className="w-1/2 h-screen bg-primaryBackground text-white flex flex-col m-0 items-center justify-center p-16">
      <div className="mb-8">
        <BigLogo />
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">
        Hi, Welcome to Crime Mapping & Smart Surveillance System
      </h1>

      <p className="text-center mb-8">
        System for easy crime mapping and smart surveillance system
      </p>

      <div className="bg-[var(--card-bg)] text-[var(--text-color)] p-4 rounded-lg mb-8">
        <div className="flex items-center justify-center mb-2">
          <svg
            className="w-32 h-32 text-gray-900"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        </div>
        <div className="flex justify-between">
          <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
          <span className="w-4 h-4 bg-red-500 rounded-full"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
          <span className="w-4 h-4 bg-gray-700 rounded-full"></span>
        </div>
      </div>

      <p className="text-sm text-gray-400">
        © 2024 Crime Mapping System. All rights reserved.
      </p>
    </div>
  );
};

export default WelcomePane;
