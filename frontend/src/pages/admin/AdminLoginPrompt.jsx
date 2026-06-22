import { useContext, useEffect, useState } from "react";
import { ShieldAlert, Lock, User } from "lucide-react";
import { AppContext } from "../../context/AppContext";

function AdminLoginPrompt({ role, login, loading }) {
  const { darkmode } = useContext(AppContext);

  const [loginId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const storeAdmincredentials = () => {
    localStorage.setItem("adminId", loginId);
    localStorage.setItem("adminPassword", password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(loginId, password);
    storeAdmincredentials();
  };

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    const adminPassword = localStorage.getItem("adminPassword");

    if (adminId && adminPassword) {
      setAdminId(adminId);
      setPassword(adminPassword);
    }
  }, [])

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-6 ${darkmode ? "bg-gray-950 text-white" : "bg-blue-50 text-slate-900"}`}
    >
      <div
        className={`max-w-md w-full rounded-3xl border p-8 shadow-xl ${darkmode
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-blue-200"
          }`}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`p-4 rounded-full ${darkmode
              ? "bg-blue-950/40"
              : "bg-blue-100"
              }`}
          >
            <ShieldAlert className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2">
          {role === "ADMIN" ? "Admin" : "Host"} Login
        </h1>

        <p
          className={`text-center mb-8 ${darkmode
            ? "text-gray-400"
            : "text-slate-600"
            }`}
        >
          Enter your administrator credentials to continue.
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Admin ID */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {role === "ADMIN" ? "Admin" : "Host"} ID
            </label>

            <div
              className={`flex items-center rounded-xl border px-4 ${darkmode
                ? "border-gray-700 bg-gray-800"
                : "border-blue-200 bg-white"
                }`}
            >
              <User className="w-4 h-4 text-blue-500" />

              <input
                type="text"
                value={loginId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter ID"
                className="w-full bg-transparent px-3 py-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div
              className={`flex items-center rounded-xl border px-4 ${darkmode
                ? "border-gray-700 bg-gray-800"
                : "border-blue-200 bg-white"
                }`}
            >
              <Lock className="w-4 h-4 text-blue-500" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full bg-transparent px-3 py-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p
          className={`mt-6 text-center text-sm ${darkmode
            ? "text-gray-500"
            : "text-slate-500"
            }`}
        >
          Secure access for authorized administrators only.
        </p>
      </div>
    </section>
  );
}

export default AdminLoginPrompt;