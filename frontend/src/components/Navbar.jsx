import { useContext, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { ArrowRight, Menu, X, AlertTriangle } from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/asset";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, darkmode, toggleDarkmode } = useContext(AppContext);
  const isHome = location.pathname === "/";

  return (
    <nav className={`w-full ${isHome ? 'bg-transparent fixed left-0' : 'bg-blue-50/85 dark:bg-gray-950/80 backdrop-blur-md border-b border-blue-100/10 dark:border-gray-800/10 sticky'} top-0 z-50 transition-all duration-300`}>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">

          {/* Logo Image */}
          <NavLink to="/">
            {darkmode ?
              <img
                src="/homygo_dark.png"
                alt="Homygo Logo"
                className="h-10 w-auto object-contain"
              />
              :
              <img
                src="/homygo_light.png"
                alt="Homygo Logo"
                className="h-10 w-auto object-contain"
              />
            }
          </NavLink>

        </div>

        {/* Desktop Consolidated Glass Capsule */}
        <div className="hidden md:flex items-center gap-6 rounded-full border border-white/20 bg-white/20 dark:border-white/10 dark:bg-slate-900/30 backdrop-blur-md pl-6 pr-1.5 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          
          {/* Nav Links */}
          <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            <NavItem to="/homestays">Homestays</NavItem>
            <NavItem to="/features">Features</NavItem>
            <NavItem to="/tour-plan">Planning</NavItem>
            <NavItem to="/translate">Translate</NavItem>
            <NavItem to="/cultural-feed">Cultural Feed</NavItem>
          </div>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-slate-400/30 dark:bg-white/10" />

          {/* Actions inside capsule */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-blue-600 transition cursor-pointer"
                >
                  Sign In
                </button>

                <button
                  onClick={() => navigate("/auth/create")}
                  className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-white text-[11px] font-bold uppercase tracking-wider border border-white/10 rounded-full transition flex items-center shadow-md cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </>
            ) : (
              <div 
                onClick={() => navigate("/user/profile")}
                className="flex items-center gap-2 cursor-pointer rounded-full bg-slate-950/10 dark:bg-white/5 pl-2.5 pr-1.5 py-1 hover:bg-slate-950/20 dark:hover:bg-white/10 transition border border-white/10"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Profile</span>
                <img
                  src={
                    user.gender?.toLowerCase() === "male"
                      ? assets.male_avatar
                      : user.gender?.toLowerCase() === "female"
                        ? assets.female_avatar
                        : assets.male_avatar
                  }
                  alt="avatar"
                  className="w-7 h-7 rounded-full object-cover border border-white/20 bg-white"
                />
              </div>
            )}

            {/* Theme + SOS Toggle inside the capsule */}
            <div className="flex items-center gap-1 rounded-full bg-slate-950/15 dark:bg-white/5 border border-white/10 p-0.5">
              <button
                onClick={toggleDarkmode}
                className="p-1.5 text-slate-700 dark:text-yellow-300 hover:text-blue-600 transition rounded-full hover:bg-white/20 cursor-pointer"
              >
                {darkmode ? <FaSun size={12} /> : <FaMoon size={12} />}
              </button>

              <button
                onClick={() => navigate("/sos")}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white text-[9px] font-black hover:scale-105 transition shadow-sm cursor-pointer"
              >
                SOS
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Actions and Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <div 
              onClick={() => navigate("/user/profile")}
              className="p-0.5 rounded-full bg-blue-500 dark:bg-blue-400 cursor-pointer shadow-md"
            >
              <img
                src={
                  user.gender?.toLowerCase() === "male"
                    ? assets.male_avatar
                    : user.gender?.toLowerCase() === "female"
                      ? assets.female_avatar
                      : assets.male_avatar
                }
                alt="avatar"
                className="w-7 h-7 rounded-full object-cover bg-white dark:bg-gray-900"
              />
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-blue-800 dark:text-gray-200 transition p-1"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/25 dark:border-gray-800 bg-white/60 dark:bg-gray-950/95 backdrop-blur-lg transition-colors duration-300">

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
