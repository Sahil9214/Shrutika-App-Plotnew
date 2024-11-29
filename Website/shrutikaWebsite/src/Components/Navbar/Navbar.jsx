import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white  sticky w-full top-0 z-50 h-[10vh] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            {/* You can replace the text with your logo image */}
            <div className="text-xl font-bold text-gray-800">Your Logo</div>
          </div>

          {/* Admin Login Button */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/admin/login")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm 
                           text-sm font-medium text-white bg-green-500 hover:bg-indigo-700 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                           transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
