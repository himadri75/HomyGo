import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/asset';
import { Mail, Calendar, User, Lock, LogOut, Edit2, Eye, EyeOff, Phone } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import showConfirmToast from './showConfirmToast';

const UserProfileCard = () => {
  const { user, updateEmergencyDetails, loading, logout } = useContext(AppContext);
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  if (!user) {
    return (
      <div className="bg-blue-50 dark:bg-gray-950 min-h-screen flex flex-col items-center justify-center px-6 transition-colors duration-300">

        <p className="text-blue-900 dark:text-gray-200 text-base mb-6">Please login or create an account to view your profile.</p>
        <div className="flex gap-3">

          <NavLink
            to="/auth/signup"
            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition text-sm"
          >
            Create Account
          </NavLink>

          <NavLink
            to="/auth/login"
            className="px-6 py-2 bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-gray-200 border border-blue-200 dark:border-gray-700 font-medium hover:bg-blue-200 dark:hover:bg-gray-700 transition text-sm"
          >
            Login
          </NavLink>

        </div>
      </div>
    );
  }

  const getAvatarImage = () => {
    if (user.gender && user.gender.toLowerCase() === 'male') {
      return assets.male_avatar;
    }
    return assets.female_avatar;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleEmergencyEmailAndPhoneUpdate = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emergencyEmail || !emailRegex.test(emergencyEmail)) {
      toast.error("Invalid email.");
      return;
    }

    if (emergencyEmail === user.email) {
      toast.error("Use a different email.");
      return;
    }

    if (!emergencyPhone || !phoneRegex.test(emergencyPhone)) {
      toast.error("Invalid phone number.");
      return;
    }

    const payload = {
      userId: user.id,
      email: emergencyEmail,
      phone: emergencyPhone
    }

    updateEmergencyDetails(payload);
  };

  const handleLogout = () => {
    showConfirmToast({
      message: "Logout now?",
      onConfirm: logout,
    });
  };

  const age = calculateAge(user.dob);

  return (
    <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/20 p-8 mb-6 rounded-2xl transition-colors duration-300">

      {/* Avatar & Basic Info */}
      <div className="flex flex-col sm:flex-row gap-8 mb-8">

        {/* Avatar */}
        <div className="flex flex-col items-center">

          <div className="w-32 h-32 flex items-center justify-center mb-4 rounded-full overflow-hidden border-4 border-blue-200 dark:border-gray-700 shadow-md">

            <img
              src={getAvatarImage()}
              alt={user.name}
              className="w-full h-full object-cover"
            />

          </div>

          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide">{user.status}</p>

        </div>

        {/* User Info */}
        <div className="flex-1">

          <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-3">{user.name}</h1>
          <div className="space-y-4 mb-6">

            {/* Email */}
            <div className="flex items-center gap-3">

              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />

              <div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">
                  Email
                </p>

                <p className="text-sm text-blue-900 dark:text-gray-200">
                  {user.email}
                </p>
              </div>

            </div>

            {/* Gender */}
            <div className="flex items-center gap-3">

              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />

              <div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">
                  Gender
                </p>

                <p className="text-sm text-blue-900 dark:text-gray-200 capitalize">
                  {user.gender || "Not specified"}
                </p>
              </div>

            </div>

            {/* DOB */}
            {user.dob && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />

                <div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">
                    Date of Birth
                  </p>

                  <p className="text-sm text-blue-900 dark:text-gray-200">
                    {formatDate(user.dob)}{" "}
                    {age > 0 && `(${age} years)`}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Account Info */}
          <div className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 p-4 text-sm text-blue-800 dark:text-gray-300 mb-5 rounded-xl">
            <p>Member since {formatDate(user.created_at)}</p>
          </div>

          {/* SOS Info */}
          {!user.is_sos_active ? (
            <div className="bg-yellow-50 dark:bg-gray-800 border border-yellow-200 dark:border-gray-700 p-5 rounded-xl mb-5">

              <h3 className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 mb-4 uppercase tracking-wide">
                Emergency Contact Details
              </h3>

              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">

                {/* Emergency Email */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 font-semibold uppercase tracking-wide">
                      Emergency Email
                    </p>
                  </div>

                  <input
                    type="email"
                    value={emergencyEmail}
                    onChange={(e) => setEmergencyEmail(e.target.value)}
                    placeholder="Enter emergency email"
                    className="w-full px-4 py-2 rounded-xl border border-yellow-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Emergency Phone */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 font-semibold uppercase tracking-wide">
                      Emergency Phone
                    </p>
                  </div>

                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="Enter 10-digit emergency phone"
                    className="w-full px-4 py-2 rounded-xl border border-yellow-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Button */}
                <button
                  onClick={handleEmergencyEmailAndPhoneUpdate}
                  disabled={loading.emergencyDetailsLoading}
                  className="w-full md:w-auto px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-xl transition"
                >
                  {loading.emergencyDetailsLoading ? "Saving..." : "Add"}
                </button>

              </div>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 p-5 rounded-xl mb-5">

              <h3 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-3 uppercase tracking-wide">
                SOS Emergency Contact Active
              </h3>

              <div className="text-sm space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Email:</span>{" "}
                  {user.emergency_email || "Not set"}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Phone:</span>{" "}
                  {user.emergency_phone || "Not set"}
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">

            {/* <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/40 transition font-medium text-sm rounded-xl">

              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button> */}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/40 transition font-medium text-sm rounded-xl"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

          </div>

        </div>
      </div>

    </div>
  )
}

export default UserProfileCard;