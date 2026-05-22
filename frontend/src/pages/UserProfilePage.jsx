import React from 'react'
import Wishlist from '../components/Wishlist';
import UserBookings from '../components/UserBookings';
import SecuritySettings from '../components/SecuritySettings';
import UserProfileCard from '../components/UserProfileCard';

const UserProfilePage = () => {
  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Profile Header Card */}
        <UserProfileCard />

        {/* Wishlist */}
        <Wishlist />

        {/* Bookings */}
        <UserBookings />

        {/* Security Settings */}
        <SecuritySettings />

      </div>
    </div>
  );
}

export default UserProfilePage;
