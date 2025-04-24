import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen bg-primaryBackground flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-white shadow-lg rounded-xl p-8"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="p-4 bg-yellow-100 text-yellow-600 rounded-full"
          >
            <AlertTriangle className="w-10 h-10" />
          </motion.div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg font-medium text-gray-600 mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          It might have been moved or deleted.
        </p>

        <Link
          to="/"
          className="inline-block bg-primaryBackground text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
