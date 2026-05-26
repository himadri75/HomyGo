import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext'; 
import { Clock, AlertCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import BookingCard from '../components/BookingCard';

const AllBookings = () => {
  const { getAllBookings, bookings, user } = useContext(AppContext);
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    if (user) {
      getAllBookings(status);
    }
  }, [user, status]);

  const isLoading = !bookings;

  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen px-4 sm:px-6 lg:px-10 py-8">

      {/* HEADER (ALWAYS VISIBLE) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-white mb-2">
            My Bookings
          </h1>

          <p className="text-blue-800 dark:text-gray-300 text-sm">
            {bookings?.length ?? 0} bookings total
          </p>
        </div>

        {/* STATUS DROPDOWN (ALWAYS VISIBLE) */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-blue-900 dark:text-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CANCELED">CANCELED</option>
          <option value="DONE">DONE</option>
          <option value="ALL">ALL</option>
        </select>

      </div>

      {/* CONTENT AREA */}
      <div className="space-y-6">

        {/* LOADING */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 text-center">
            <div>
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <p className="text-blue-900 dark:text-white">
                Loading your bookings...
              </p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && bookings?.length === 0 && (
          <div className="text-center max-w-md mx-auto py-20">

            <AlertCircle className="w-10 h-10 text-blue-500 mx-auto mb-4" />

            <h2 className="text-xl font-bold text-blue-900 dark:text-white mb-2">
              No Bookings Found
            </h2>

            <p className="text-sm text-blue-800 dark:text-gray-300 mb-6">
              No bookings found for this status.
            </p>

            <NavLink
              to="/homestays"
              className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
              Explore Homestays
            </NavLink>

          </div>
        )}

        {/* LIST */}
        {!isLoading && bookings?.length > 0 && (
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}

      </div>
    </div>
  );
};

export default AllBookings;
