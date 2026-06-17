import React, { useContext, useState } from 'react'
import { Home, Users, UserCheck, Check, X, Clock, Star, MapPin, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import { AppContext } from '../../context/AppContext';

const AdminDashboard = () => {
  const { darkmode } = useContext(AppContext)

  // Stats
  const stats = [
    {
      title: 'Total Homestays',
      value: '245',
      icon: Home,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Users',
      value: '1,842',
      icon: Users,
      color: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Hosts',
      value: '389',
      icon: UserCheck,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ]

  return (
    <div className={`min-h-screen pt-1 pb-12 px-4 ${darkmode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkmode ? 'text-white' : 'text-gray-900'}`}>
            Dashboard
          </h1>
          <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
            Monitor platform activity and manage homestay listings
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`rounded-xl shadow-lg border p-6 transition hover:shadow-xl ${darkmode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm font-medium mb-1 ${darkmode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold ${darkmode ? 'text-white' : 'text-gray-900'
                      }`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${darkmode ? 'bg-gray-700' : stat.lightBg
                    }`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard