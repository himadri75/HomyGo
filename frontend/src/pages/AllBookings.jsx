import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Clock,
  AlertCircle,
  MapPin,
  ArrowLeft,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import BookingCard from '../components/BookingCard';
import { useState } from 'react';

// MAIN PAGE
const AllBookings = () => {
  const { getAllBookings, bookings, user } = useContext(AppContext);
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    if (user) {
      getAllBookings(user.id);
    }
  }, [user]);

  // LOADING STATE
  if (!bookings) {
    return (
      <div className="bg-blue-50 dark:bg-gray-950 min-h-screen flex items-center justify-center px-6 transition-colors duration-300">
        <div className="text-center">

          <div className="w-16 h-16 bg-blue-100 dark:bg-gray-900 border border-blue-200 dark:border-gray-800 flex items-center justify-center mx-auto mb-4 rounded-xl">
            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          <p className="text-blue-900 dark:text-white text-base font-medium">
            Loading your bookings...
          </p>

        </div>
      </div>
    );
  }

  // EMPTY STATE
  if (bookings.length === 0) {
    return (
      <div className="bg-blue-50 dark:bg-gray-950 min-h-screen flex items-center justify-center px-6 transition-colors duration-300">
        <div className="text-center max-w-md">

          <div className="w-20 h-20 bg-blue-100 dark:bg-gray-900 border border-blue-200 dark:border-gray-800 flex items-center justify-center mx-auto mb-6 rounded-2xl">
            <AlertCircle className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>

          <h2 className="text-2xl font-bold text-blue-900 dark:text-white mb-3">
            No Bookings Yet
          </h2>

          <p className="text-blue-800 dark:text-gray-300 text-sm mb-8 leading-relaxed">
            You haven’t booked any homestays yet. Explore amazing stays and
            start your next trip.
          </p>

          <NavLink
            to="/homestays"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition text-sm rounded-lg"
          >
            Explore Homestays
          </NavLink>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen px-4 sm:px-6 lg:px-10 py-8 transition-colors duration-300">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-white mb-2">
            My Bookings
          </h1>

          <p className="text-blue-800 dark:text-gray-300 text-sm">
            {bookings.length}{" "}
            {bookings.length === 1 ? "booking" : "bookings"} total
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* STATUS DROPDOWN */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-blue-900 dark:text-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="DONE">DONE</option>
            <option value="PENDING">ALL</option>
          </select>

        </div>
      </div>

      {/* BOOKINGS LIST */}
      <div className="space-y-6">

        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}

      </div>
    </div>
  );
};

export default AllBookings;