import { useContext } from "react";
import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const { darkmode, toggleDarkmode, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    toast.success("Logout successfull.");
  };

  return (
    <nav className="w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="h-16 px-6 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <NavLink to="/admin/dashboard">
            {darkmode ? (
              <img
                src="/homygo_dark.png"
                alt="Homygo Logo"
                className="h-10 w-auto object-contain"
              />
            ) : (
              <img
                src="/homygo_light.png"
                alt="Homygo Logo"
                className="h-10 w-auto object-contain"
              />
            )}
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkmode}
            className="p-2 rounded-full text-blue-700 dark:text-yellow-300 hover:bg-blue-100 dark:hover:bg-gray-800 transition"
          >
            {darkmode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;