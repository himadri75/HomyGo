import React from 'react'
import { Calendar, MapPin, Clock, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import showConfirmToast from './showConfirmToast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();
  const { cancelBooking } = useContext(AppContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      CONFIRMED: 'bg-green-100 text-green-700 border-green-200',
      CANCELLED: 'bg-red-100 text-red-700 border-red-200',
      DONE: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return statusStyles[status] || statusStyles.PENDING;
  };

  const handleCancelBooking = () => {
    showConfirmToast({
      message: "Want to cancel your booking ?",
      onConfirm: () => cancelBooking(booking.booking_id),
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/20 hover:shadow-xl transition-all duration-300 mb-4 p-4 rounded-2xl">

      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">

        {/* LEFT SIDE */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">

          {/* Image */}
          <div className="w-full sm:w-40 h-40 sm:h-32 overflow-hidden shrink-0 rounded-lg">

            <img
              src={booking.image}
              alt={booking.title}
              className="w-full h-full object-cover"
            />

          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">

            {/* Title + Status */}
            <div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">

                <h3 className="text-md font-bold text-blue-900 dark:text-white">
                  {booking.title}
                </h3>

                <span
                  className={`w-fit px-3 py-0.5 text-xs border font-semibold rounded-full ${getStatusBadge(booking.status)}`}
                >
                  {booking.status}
                </span>

              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-blue-700 dark:text-gray-400 text-sm mb-2">

                <MapPin className="w-4 h-4" />
                {booking.location}

              </div>

              {/* Dates */}
              <div className="text-sm text-blue-900 dark:text-gray-200">

                <span className="font-medium">
                  {formatDate(booking.start_date)}
                </span>

                {" - "}

                <span className="font-medium">
                  {formatDate(booking.end_date)}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex md:flex-col items-stretch md:items-end gap-2 md:gap-3 w-full md:w-auto">

          {/* Action Group (desktop pill bar) */}
          <div className="flex md:flex-col gap-2 w-full md:w-auto">

            {/* View Details */}
            <button
              className="flex-1 md:w-36 px-3 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition rounded-lg"
              onClick={() =>
                navigate(`/homestays/${booking.category}/${booking.id}`)
              }
            >
              View
            </button>

            {/* Cancel */}
            {!["DONE", "CONFIRMED", "CANCELED"].includes(booking.status) && (
              <button
                onClick={handleCancelBooking}
                className="flex-1 md:w-36 px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/40 transition rounded-lg"
              >
                Cancel
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default BookingCard;