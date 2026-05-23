import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const AuthPage = () => {
  const { state } = useParams();
  const navigate = useNavigate();
  const { createUser, login, loading } = useContext(AppContext);

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
      login(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-950 px-6 transition-colors duration-300">

      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 shadow-xl dark:shadow-black/30 border border-blue-100 dark:border-gray-800 grid md:grid-cols-2 overflow-hidden rounded-2xl">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-blue-600 dark:bg-blue-950 text-white">

          <h2 className="text-3xl font-bold mb-4">
            HomyGo
          </h2>

          <p className="text-blue-100 dark:text-blue-200">
            Discover authentic India through local stays and real experiences.
          </p>

        </div>

        {/* RIGHT */}
        <div className="p-8 sm:p-10">

          {/* Tabs */}
          <div className="flex mb-8 border-b border-blue-100 dark:border-gray-800">

            <button
              onClick={() => handleModeChange("login")}
              className={`pb-2 mr-6 text-sm font-medium transition-colors ${mode === "login"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-blue-400 dark:text-gray-500"
                }`}
            >
              Login
            </button>

            <button
              onClick={() => handleModeChange("signup")}
              className={`pb-2 text-sm font-medium transition-colors ${mode === "signup"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-blue-400 dark:text-gray-500"
                }`}
            >
              Create Account
            </button>

          </div>

          <h3 className="text-2xl font-semibold text-blue-900 dark:text-white mb-6">
            {mode === "login" ? "Welcome Back 👋" : "Create Your Account"}
          </h3>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Name */}
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-blue-900 dark:text-gray-100 placeholder:text-blue-400 dark:placeholder:text-gray-500 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-blue-900 dark:text-gray-100 placeholder:text-blue-400 dark:placeholder:text-gray-500 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-blue-900 dark:text-gray-100 placeholder:text-blue-400 dark:placeholder:text-gray-500 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* GENDER + DOB ROW */}
            {mode === "signup" && (
              <div className="flex gap-4">

                {/* Gender */}
                <div className="w-1/2 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-2 py-3 flex items-center justify-evenly text-sm">

                  <div className="flex gap-3 text-blue-700 dark:text-gray-300">

                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      Male
                    </label>

                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      Female
                    </label>

                  </div>
                </div>

                {/* DOB */}
                <input
                  type="date"
                  className="w-1/2 px-4 py-3 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-blue-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />

              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg shadow-md hover:shadow-lg"
              disabled={loading.createAccount || loading.login}
            >
              {(loading.createAccount || loading.login) ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin text-white"
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
                mode === "login" ? "Login" : "Create Account"
              )}
            </button>

          </form>

          {/* Switch */}
          <p className="text-sm text-blue-500 dark:text-gray-400 mt-6 text-center">

            {mode === "login" ? (
              <>
                Don’t have an account?{" "}

                <span
                  onClick={() => handleModeChange("signup")}
                  className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}

                <span
                  onClick={() => handleModeChange("login")}
                  className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                >
                  Login
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