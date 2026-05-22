import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { Mail, Calendar, User, Lock, LogOut, Edit2, Eye, EyeOff } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const SecuritySettings = () => {
  const { user } = useContext(AppContext);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  if (!user) {
    return;
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.error('All fields are required');
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.new.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // API call logic will be added here
    toast.success('Password updated successfully');
    setPasswordData({ current: '', new: '', confirm: '' });
    setIsEditingPassword(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/20 mb-6 rounded-2xl overflow-hidden transition-colors duration-300">

      {/* Header */}
      <div className="border-b border-blue-200 dark:border-gray-800 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">

          <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-bold text-blue-900 dark:text-white">
            Security Settings
          </h2>

        </div>

        {!isEditingPassword && (
          <button
            onClick={() => setIsEditingPassword(true)}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 transition font-medium text-sm rounded-xl"
          >
            Change Password
          </button>
        )}

      </div>

      {/* Password Form */}
      {isEditingPassword && (
        <div className="p-6">

          <p className="text-sm text-blue-800 dark:text-gray-400 mb-6">

            Update your password to keep your account secure.

          </p>

          {/* Current Password */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-blue-900 dark:text-gray-200 mb-2">

              Current Password

            </label>

            <div className="relative">

              <input
                type={showPassword.current ? "text" : "password"}
                name="current"
                value={passwordData.current}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
                className="w-full px-4 py-3 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-900 dark:text-white placeholder:text-blue-400 dark:placeholder:text-gray-500 text-sm outline-none rounded-xl focus:ring-2 focus:ring-blue-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(prev => ({
                    ...prev,
                    current: !prev.current
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >

                {showPassword.current ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}

              </button>

            </div>

          </div>

          {/* New Password */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-blue-900 dark:text-gray-200 mb-2">

              New Password

            </label>

            <div className="relative">

              <input
                type={showPassword.new ? "text" : "password"}
                name="new"
                value={passwordData.new}
                onChange={handlePasswordChange}
                placeholder="Enter your new password"
                className="w-full px-4 py-3 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-900 dark:text-white placeholder:text-blue-400 dark:placeholder:text-gray-500 text-sm outline-none rounded-xl focus:ring-2 focus:ring-blue-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(prev => ({
                    ...prev,
                    new: !prev.new
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >

                {showPassword.new ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}

              </button>

            </div>

          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-blue-900 dark:text-gray-200 mb-2">Confirm New Password</label>

            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirm"
                value={passwordData.confirm}
                onChange={handlePasswordChange}
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-900 dark:text-white placeholder:text-blue-400 dark:placeholder:text-gray-500 text-sm outline-none rounded-xl focus:ring-2 focus:ring-blue-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(prev => ({
                    ...prev,
                    confirm: !prev.confirm
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >

                {showPassword.confirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}

              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">

            <button
              onClick={handleUpdatePassword}
              className="flex-1 px-4 py-3 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 transition font-medium text-sm rounded-xl"
            >
              Update Password
            </button>

            <button
              onClick={() => {
                setIsEditingPassword(false);
                setPasswordData({
                  current: "",
                  new: "",
                  confirm: ""
                });
              }}
              className="flex-1 px-4 py-3 bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-gray-300 border border-blue-200 dark:border-gray-700 hover:bg-blue-200 dark:hover:bg-gray-700 transition font-medium text-sm rounded-xl"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* Non-editing State */}
      {!isEditingPassword && (
        <div className="p-6">

          <p className="text-sm text-blue-800 dark:text-gray-400 leading-relaxed">
            Keep your account secure by regularly updating your password.
            We recommend changing it every few months.
          </p>

        </div>
      )}

    </div>
  )
}

export default SecuritySettings;
