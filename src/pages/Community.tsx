import { Link } from "react-router-dom";

function Community() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Community coming soon</h1>
      <Link to="/">
        <button className="px-6 mt-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105">
          Go to home
        </button>
      </Link>
    </div>
  );
}

export default Community;
