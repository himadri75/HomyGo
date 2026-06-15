import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import InteractiveAvatar from "../components/InteractiveAvatar";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaTransgender,
} from "react-icons/fa";

const AuthPage = () => {
  const { state } = useParams();
  const navigate = useNavigate();
  const { createUser, login, loading, darkmode } = useContext(AppContext);

  const mode =
    state === "create"
      ? "signup"
      : state === "login"
        ? "login"
        : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  // Interactive avatar states
  const [isFocusing, setIsFocusing] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  // Background hover spotlight states
  const [bgCoords, setBgCoords] = useState({ x: 0, y: 0 });
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    if (!mode) {
      navigate("/auth/login");
    }
  }, [mode, navigate]);

  const handleModeChange = (newMode) => {
    navigate(newMode === "signup" ? "/auth/create" : "/auth/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "signup") {
      if (!name || !email || !password || !gender || !dob) {
        return toast.error("Please fill all fields");
      }
      createUser(name, email, password, gender, dob);
    } else {
      if (!email || !password) {
        return toast.error("Please fill all fields");
      }
      login(email, password);
    }
  };

  const handleBgMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setBgCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setBgOpacity(1);
  };

  const handleBgMouseLeave = () => {
    setBgOpacity(0);
  };

  const handleInputFocus = (field) => {
    setIsFocusing(true);
    setFocusedField(field);
  };

  const handleInputBlur = () => {
    setIsFocusing(false);
    setFocusedField("");
  };

  return (
    <div
      onMouseMove={handleBgMouseMove}
      onMouseLeave={handleBgMouseLeave}
      className="min-h-screen relative flex items-center justify-center bg-blue-950/10 dark:bg-slate-950 px-4 py-12 transition-colors duration-300 overflow-hidden"
    >
      {/* Static Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12] dark:opacity-[0.15] z-0"
        style={{
          backgroundImage: darkmode
            ? "radial-gradient(circle, rgba(255, 255, 255, 0.12) 1.2px, transparent 1.2px)"
            : "radial-gradient(circle, rgba(59, 130, 246, 0.1) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Interactive Hover Glow Dot Grid Spotlight (Stitch-like) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${darkmode ? "#38bdf8" : "#2563eb"} 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
          WebkitMaskImage: `radial-gradient(circle 200px at ${bgCoords.x}px ${bgCoords.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
          maskImage: `radial-gradient(circle 200px at ${bgCoords.x}px ${bgCoords.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
          opacity: bgOpacity,
        }}
        aria-hidden="true"
      />

      {/* Glowing backdrop elements */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-950/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 dark:bg-cyan-950/20 blur-[100px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-5xl bg-white/70 dark:bg-[#091322]/90 backdrop-blur-xl shadow-2xl border border-blue-100/50 dark:border-blue-950/50 rounded-3xl overflow-hidden grid md:grid-cols-2 p-3 md:p-6 gap-6 md:gap-0">
        
        {/* LEFT COLUMN: BRAND DECK + INTERACTIVE AVATAR */}
        <div className="relative hidden md:flex items-center justify-end pl-24 pr-6 min-h-[550px]">
          {/* Cyan-to-blue gradient book cover deck */}
          <div className="w-full max-w-[340px] h-[520px] bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-lg border border-cyan-300/30">
            {/* Top Logo (Visme Clover style) */}
            <div className="flex justify-between items-start">
              <svg
                width="36"
                height="36"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white drop-shadow"
              >
                <path
                  d="M16 2C13.5 2 11.5 4 11.5 6.5C11.5 9 13.5 11 16 11C18.5 11 20.5 9 20.5 6.5C20.5 4 18.5 2 16 2Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                <path
                  d="M16 21C13.5 21 11.5 23 11.5 25.5C11.5 28 13.5 30 16 30C18.5 30 20.5 28 20.5 25.5C20.5 23 18.5 21 16 21Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                <path
                  d="M6.5 11.5C4 11.5 2 13.5 2 16C2 18.5 4 20.5 6.5 20.5C9 20.5 11 18.5 11 16C11 13.5 9 11.5 6.5 11.5Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                <path
                  d="M25.5 11.5C23 11.5 21 13.5 21 16C21 18.5 23 20.5 25.5 20.5C28 20.5 30 18.5 30 16C30 13.5 28 11.5 25.5 11.5Z"
                  fill="currentColor"
                  opacity="0.85"
                />
              </svg>
            </div>

            {/* Middle text (Dynamic Branding) */}
            <div className="my-auto pr-4">
              <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-3 drop-shadow-sm">
                HOMYGO
              </h2>
              <p className="text-cyan-50 font-medium text-lg leading-relaxed drop-shadow-sm">
                Discover authentic India through local stays and real experiences.
              </p>
            </div>

            {/* Bottom text */}
            <div className="flex justify-between items-center text-xs tracking-widest text-cyan-100 font-semibold uppercase opacity-85">
              <span>homygo.apps24.tech</span>
            </div>
          </div>

          {/* Overlapping Interactive Avatar */}
          <div className="absolute left-0 bottom-[-20px] z-20 pointer-events-none">
            <InteractiveAvatar isFocusing={isFocusing} focusedField={focusedField} />
          </div>
        </div>

        {/* RIGHT COLUMN: BLUE authentication FORM */}
        <div className="p-6 md:p-8 flex flex-col justify-center bg-blue-950/[0.02] dark:bg-[#0d1a2d]/80 border-l border-blue-50/10 dark:border-blue-950/20 rounded-2xl md:rounded-r-3xl">
          {/* Header Switch Tabs */}
          <div className="flex mb-8 border-b border-blue-100/50 dark:border-blue-950/40">
            <button
              onClick={() => handleModeChange("login")}
              className={`pb-2.5 mr-6 text-sm font-semibold transition-colors ${
                mode === "login"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400"
                  : "text-slate-400 dark:text-slate-500 hover:text-blue-500/80"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleModeChange("signup")}
              className={`pb-2.5 text-sm font-semibold transition-colors ${
                mode === "signup"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400"
                  : "text-slate-400 dark:text-slate-500 hover:text-blue-500/80"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">
              {mode === "login" ? "Welcome Back 👋" : "Create Account"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-blue-500/60 font-medium">
              {mode === "login"
                ? "Sign in to access your customized travel itinerary and saved homestays."
                : "Join HomyGo to experience authentic local hospitality and curated plans."}
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name input (SignUp only) */}
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                  Your Name *
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-blue-600/60 group-focus-within:text-blue-500 transition-colors">
                    <FaUser size={15} />
                  </span>
                  <input
                    type="text"
                    placeholder="First and Last name"
                    onFocus={() => handleInputFocus("name")}
                    onBlur={handleInputBlur}
                    className="w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-blue-950/80 bg-white dark:bg-[#132238] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-blue-800/60 text-sm rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 shadow-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Email input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                Your Email *
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-blue-600/60 group-focus-within:text-blue-500 transition-colors">
                  <FaEnvelope size={15} />
                </span>
                <input
                  type="email"
                  placeholder="Ex. you@example.com"
                  onFocus={() => handleInputFocus("email")}
                  onBlur={handleInputBlur}
                  className="w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-blue-950/80 bg-white dark:bg-[#132238] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-blue-800/60 text-sm rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                Your Password *
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-blue-600/60 group-focus-within:text-blue-500 transition-colors">
                  <FaLock size={15} />
                </span>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  onFocus={() => handleInputFocus("password")}
                  onBlur={handleInputBlur}
                  className="w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-blue-950/80 bg-white dark:bg-[#132238] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-blue-800/60 text-sm rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* GENDER + DOB ROW (SignUp only) */}
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                {/* Gender input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                    Gender *
                  </label>
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-blue-600/60 transition-colors pointer-events-none">
                      <FaTransgender size={15} />
                    </span>
                    <select
                      onFocus={() => handleInputFocus("gender")}
                      onBlur={handleInputBlur}
                      className="w-full pl-10 pr-3 py-3.5 border border-slate-200 dark:border-blue-950/80 bg-white dark:bg-[#132238] text-slate-900 dark:text-slate-100 text-sm rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 shadow-sm appearance-none cursor-pointer"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" disabled className="text-slate-400">
                        Select
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* DOB input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                    Birth Date *
                  </label>
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-blue-600/60 transition-colors pointer-events-none">
                      <FaCalendarAlt size={14} />
                    </span>
                    <input
                      type="date"
                      onFocus={() => handleInputFocus("dob")}
                      onBlur={handleInputBlur}
                      className="w-full pl-10 pr-3 py-3.5 border border-slate-200 dark:border-blue-950/80 bg-white dark:bg-[#132238] text-slate-900 dark:text-slate-100 text-sm rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 shadow-sm cursor-pointer"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-4 border-2 border-blue-500 hover:border-blue-400 dark:border-blue-500/80 dark:hover:border-blue-400 bg-transparent hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500/90 text-blue-600 dark:text-blue-400 text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md hover:shadow-lg"
              disabled={loading.createAccount || loading.login}
            >
              {loading.createAccount || loading.login ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                "SUBMIT"
              )}
            </button>
          </form>

          {/* Form Switch Link (under form) */}
          <p className="text-sm text-slate-500 dark:text-blue-500/40 mt-6 text-center font-medium">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => handleModeChange("signup")}
                  className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline"
                >
                  Create Account
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => handleModeChange("login")}
                  className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline"
                >
                  Sign In
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;