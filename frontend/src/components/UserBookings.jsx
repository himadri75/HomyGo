import React from 'react'
import { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { Calendar, MapPin, Clock, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import BookingCard from './BookingCard';

const UserBookings = () => {
  const { getAllBookings, bookings, user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      getAllBookings(user.id);
    }
  }, [user?.id]);

  if (!bookings) {
    return;
  }

  if (bookings.length === 0) {
    return;
  }

  return (
    <div className="mb-12">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-white mb-2">My Bookings {` (${bookings.length})`}</h2>
      </div>

      {/* Bookings List */}
      <div>
        {bookings.slice(0, 2).map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>

      {
        bookings.length > 2 && <div className='flex items-center justify-center'>
          <NavLink to="/user/bookings"
            className="py-1.5 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
            All bookings
          </NavLink>
        </div>
      }

    </div>
  );
};

export default UserBookings;
