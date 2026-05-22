import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import HomeStayCard from '../components/HomestayCard';
import { Heart, ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AllWishlist = () => {
  const { user, wishlist, getWishlist } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      getWishlist(user.id);
    }
  }, [user, getWishlist]);

  // Loading State
  if (!wishlist) {
    return (
      <div className="bg-blue-50 dark:bg-gray-950 min-h-screen flex items-center justify-center px-6 transition-colors duration-300">
        <div className="text-center">

          <div className="w-16 h-16 bg-blue-100 dark:bg-gray-900 border border-blue-200 dark:border-gray-800 flex items-center justify-center mx-auto mb-4 rounded-xl">
            <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          <p className="text-blue-900 dark:text-white text-base font-medium">
            Loading your wishlist...
          </p>

        </div>
      </div>
    );
  }

  // Empty State
  if (wishlist.length === 0) {
    return (
      <div className="bg-blue-50 dark:bg-gray-950 min-h-screen flex items-center justify-center px-6 transition-colors duration-300">
        <div className="text-center max-w-md">

          <div className="w-20 h-20 bg-blue-100 dark:bg-gray-900 border border-blue-200 dark:border-gray-800 flex items-center justify-center mx-auto mb-6 rounded-2xl">
            <Heart className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>

          <h2 className="text-2xl font-bold text-blue-900 dark:text-white mb-3">
            Your Wishlist is Empty
          </h2>

          <p className="text-blue-800 dark:text-gray-300 text-sm mb-8 leading-relaxed">
            Start adding your favorite homestays to build your collection.
            Explore amazing stays and save them for later!
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

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />

            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-white">
              My Wishlist
            </h1>

          </div>

          <p className="text-blue-800 dark:text-gray-300 text-sm">
            {wishlist.length}{" "}
            {wishlist.length === 1 ? "homestay" : "homestays"} saved
          </p>

        </div>

        <NavLink
          to="/"
          className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </NavLink>

      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {wishlist.map((stay) => (
          <HomeStayCard key={stay.id} stay={stay} />
        ))}

      </div>

    </div>
  );
};

export default AllWishlist;