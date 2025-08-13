import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs mb-4">
          Not Found
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-lg text-gray-400 mb-6">Oops! Page not found</p>
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
