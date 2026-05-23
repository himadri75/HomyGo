import { useContext, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { ArrowRight, Menu, X, AlertTriangle } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/asset";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, darkmode, toggleDarkmode } = useContext(AppContext);

  return (
    <nav className="w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">

          {/* PNG Logo Image */}
          <img
            src="/homygo.jpg"   // put your PNG inside public folder
            alt="Homygo Logo"
            className="w-10 h-10 object-contain"
          />

          <Link
            to="/"
            className="text-xl font-bold text-blue-900 dark:text-white tracking-wide transition"
          >
            HomyGo
          </Link>

        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-blue-800 dark:text-gray-200">

          <NavItem to="/homestays">Homestays</NavItem>
          <NavItem to="/features">Features</NavItem>
          <NavItem to="/tour-plan">Planning</NavItem>
          <NavItem to="/translate">Translate</NavItem>
          <NavItem to="/cultural-feed">Cultural Feed</NavItem>

        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">

          {!user ? (
            <>
              {/* Sign In - Desktop Only */}
              <button
                onClick={() => navigate("/auth/login")}
                className="hidden md:block px-4 py-2 text-blue-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm font-medium"
              >
                Sign In
              </button>

              {/* Get Started */}
              <button
                onClick={() => navigate("/auth/create")}
                className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium tracking-wide hover:bg-blue-700 dark:hover:bg-blue-400 transition flex items-center shadow-md hover:shadow-lg rounded-lg"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </>
          ) : (
            <div className="flex items-center">

              <div className="p-0.5 rounded-full bg-blue-500 dark:bg-blue-400 hover:bg-blue-600 dark:hover:bg-blue-300 transition cursor-pointer shadow-md hover:shadow-lg">

                <img
                  src={
                    user.gender?.toLowerCase() === "male"
                      ? assets.male_avatar
                      : user.gender?.toLowerCase() === "female"
                        ? assets.female_avatar
                        : assets.male_avatar
                  }
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover bg-white dark:bg-gray-900"
                  onClick={() => navigate("/user/profile")}
                />

              </div>
            </div>
          )}

          {/* Theme + SOS */}
          <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded-full bg-blue-50 dark:bg-gray-900 border border-blue-100 dark:border-gray-700 transition">

            {/* Dark Mode */}
            <button
              onClick={toggleDarkmode}
              className="p-2 text-blue-700 dark:text-yellow-300 hover:text-blue-500 dark:hover:text-yellow-200 transition rounded-full hover:bg-blue-100 dark:hover:bg-gray-800"
            >
              {darkmode ? <FaSun /> : <FaMoon />}
            </button>

            {/* SOS */}
            <button
              onClick={() => navigate("/sos")}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-linear-to-br from-red-500 via-red-600 to-red-700 text-white text-xs font-bold shadow-sm hover:scale-105 hover:shadow-md transition"
            >
              SOS
            </button>

          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-blue-800 dark:text-gray-200 transition"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-blue-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md transition-colors duration-300">

          <div className="flex flex-col px-6 py-6 gap-6 text-blue-900 dark:text-gray-200 font-medium">

            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Home
            </NavLink>

            <NavLink
              to="/homestays"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Homestays
            </NavLink>

            <Link
              to="/features"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Features
            </Link>

            <Link
              to="/translate"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Translate
            </Link>

            <Link
              to="/cultural-feed"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Cultural Feed
            </Link>

            {!user && (
              <button
                onClick={() => {
                  navigate("/auth/login");
                  setMobileOpen(false);
                }}
                className="w-full px-4 py-3 border border-blue-300 dark:border-gray-700 rounded-lg text-blue-800 dark:bg-blue-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-900 transition"
              >
                Sign In
              </button>
            )}

            {/* Emergency button */}
            <button
              onClick={() => {
                navigate("/sos");
                setMobileOpen(false);
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-red-500 via-red-600 to-red-700 text-white font-semibold shadow-md hover:shadow-lg transition rounded-lg"
            >
              <AlertTriangle size={18} />
              Emergency
            </button>

            {/* Theme toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-blue-200 dark:border-gray-800">

              <span className="text-sm text-blue-800 dark:text-gray-300">
                Theme
              </span>

              <button
                onClick={toggleDarkmode}
                className="p-2 text-blue-700 dark:text-yellow-300 hover:text-blue-500 dark:hover:text-yellow-200 transition rounded-full hover:bg-blue-100 dark:hover:bg-gray-800"
              >
                {darkmode ? <FaSun /> : <FaMoon />}
              </button>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
