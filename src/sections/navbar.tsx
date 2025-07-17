import { Link } from "react-router-dom";

function navbar() {
  return (
    <header className=" inset-x-0 z-30 sticky top-0 mx-auto w-full max-w-screen-md border border-gray-400 bg-white/80 py-2 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <h3 className="text-2xl text-bold text-gray-800">OpenGit</h3>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Link
              className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              to="/signin"
            >
              Sign in
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default navbar;
