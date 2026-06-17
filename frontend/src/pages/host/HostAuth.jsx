import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'

const HostAuth = () => {
  const { darkmode, hostLogin } = useContext(AppContext)

  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    aadhaar: '',
    pan: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (isLogin) {
      await hostLogin(formData.email, formData.password);
      console.log('Login Data:', {
        email: formData.email,
        password: formData.password
      })
    } else {
      console.log('Registration Data:', formData)
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-10 ${
        darkmode ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 ${
          darkmode
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-white border border-gray-200'
        }`}
      >
        <h1
          className={`text-3xl font-bold text-center mb-2 ${
            darkmode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {isLogin ? 'Host Login' : 'Host Registration'}
        </h1>

        <p
          className={`text-center mb-8 ${
            darkmode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {isLogin
            ? 'Login to manage your homestays'
            : 'Register as a homestay host'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              {/* Name */}
              <div>
                <label
                  className={`block mb-2 text-sm font-medium ${
                    darkmode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none ${
                    darkmode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className={`block mb-2 text-sm font-medium ${
                    darkmode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none ${
                    darkmode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                darkmode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg border outline-none ${
                darkmode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                darkmode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg border outline-none ${
                darkmode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          {!isLogin && (
            <>
              {/* Aadhaar */}
              <div>
                <label
                  className={`block mb-2 text-sm font-medium ${
                    darkmode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none ${
                    darkmode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* PAN */}
              <div>
                <label
                  className={`block mb-2 text-sm font-medium ${
                    darkmode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  PAN Card Number
                </label>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none ${
                    darkmode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          {isLogin ? (
            <p
              className={`${
                darkmode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Don't have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </button>
            </p>
          ) : (
            <p
              className={`${
                darkmode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HostAuth;