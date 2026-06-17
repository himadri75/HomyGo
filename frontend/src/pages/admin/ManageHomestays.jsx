import React, { useContext, useState } from 'react'
import { Check, X, Clock, Star, MapPin, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import { AppContext } from '../../context/AppContext'

const ManageHomestays = () => {
  const { darkmode } = useContext(AppContext)

  const [homestays, setHomestays] = useState([
    {
      id: 1,
      title: 'The Himalayan Orchard Home',
      location: 'Mukteshwar, Uttarakhand, India',
      host: 'Anshu Rawat',
      base_price: 8100,
      discount_price: 5600,
      rating: 4.9,
      review_count: 42,
      category: 'mountains',
      image:
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
      created_at: '2026-06-10'
    },
    {
      id: 2,
      title: 'Beachside Paradise Villa',
      location: 'Goa, India',
      host: 'Priya Singh',
      base_price: 6500,
      discount_price: 4800,
      rating: 4.7,
      review_count: 28,
      category: 'beach',
      image:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
      created_at: '2026-06-09'
    }
  ])

  const handleApprove = (id) => {
    toast.success('Homestay approved!')
    setHomestays((prev) => prev.filter((item) => item.id !== id))
  }

  const handleReject = (id) => {
    toast.error('Homestay rejected!')
    setHomestays((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div
      className={`min-h-screen p-4 ${darkmode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${darkmode ? 'text-white' : 'text-gray-900'
              }`}
          >
            Manage Homestays
          </h1>

          <p
            className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'
              }`}
          >
            Approve or reject newly submitted homestays
          </p>
        </div>

        {/* Main Card */}
        <div
          className={`rounded-xl shadow-lg border overflow-hidden ${darkmode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}
        >
          {/* Header */}
          <div
            className={`p-6 border-b ${darkmode
                ? 'border-gray-700 bg-gray-800'
                : 'border-gray-200 bg-gray-50'
              }`}
          >
            <h2
              className={`text-xl font-semibold flex items-center gap-2 ${darkmode ? 'text-white' : 'text-gray-900'
                }`}
            >
              <Clock size={22} className="text-blue-600" />
              Pending Homestays
            </h2>

            <p
              className={`text-sm mt-1 ${darkmode ? 'text-gray-400' : 'text-gray-600'
                }`}
            >
              {homestays.length} pending approval
            </p>
          </div>

          {/* List */}
          {homestays.length === 0 ? (
            <div className="p-10 text-center">
              <p
                className={`${darkmode ? 'text-gray-400' : 'text-gray-600'
                  }`}
              >
                No pending homestays 🎉
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {homestays.map((homestay) => (
                <div
                  key={homestay.id}
                  className={`p-6 transition ${darkmode ? 'hover:bg-gray-700/40' : 'hover:bg-gray-50'
                    }`}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    <div className="lg:w-56">
                      <img
                        src={homestay.image}
                        alt={homestay.title}
                        className="w-full h-44 object-cover rounded-lg"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold mb-3 ${darkmode ? 'text-white' : 'text-gray-900'
                          }`}
                      >
                        {homestay.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-2">
                        <MapPin
                          size={16}
                          className={
                            darkmode ? 'text-gray-400' : 'text-gray-500'
                          }
                        />
                        <span
                          className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                        >
                          {homestay.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <Calendar
                          size={16}
                          className={
                            darkmode ? 'text-gray-400' : 'text-gray-500'
                          }
                        />
                        <span
                          className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                        >
                          Added on{' '}
                          {new Date(
                            homestay.created_at
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <div
                        className={`grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-lg ${darkmode ? 'bg-gray-700/40' : 'bg-gray-100'
                          }`}
                      >
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Host</p>
                          <p
                            className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'
                              }`}
                          >
                            {homestay.host}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-1">Price</p>
                          <p
                            className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'
                              }`}
                          >
                            ₹
                            {homestay.discount_price ||
                              homestay.base_price}
                            /night
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-1">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star
                              size={14}
                              className="text-yellow-500 fill-yellow-500"
                            />
                            <span
                              className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'
                                }`}
                            >
                              {homestay.rating}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({homestay.review_count})
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Category
                          </p>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                            {homestay.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-3 lg:justify-center">
                      <button
                        onClick={() => handleApprove(homestay.id)}
                        className="flex-1 lg:flex-none px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                      >
                        <Check size={18} />
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(homestay.id)}
                        className="flex-1 lg:flex-none px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
                      >
                        <X size={18} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageHomestays;