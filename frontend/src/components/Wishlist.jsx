import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import HomeStayCard from './HomestayCard';
import { Heart, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Wishlist = () => {
  const { user, wishlist, getWishlist } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      getWishlist(user.id);
    }
  }, [user]);

  if (!wishlist) {
    return;
  }

  if (wishlist.length === 0) {
    return;
  }

  return (
    <div className="mb-12">

      {/* Header */}
      <div className="flex justify-between items-center gap-3 mb-4">
        {/* <Heart className="w-6 h-6 text-red-500 fill-red-500" /> */}
        <h2 className="text-xl font-semibold text-blue-900 dark:text-white">My Wishlist  {` (${wishlist.length})`}</h2>
        {
          wishlist.length > 4 && <NavLink to="/user/wishlist"
            className='text-sm text-blue-600 hover:underline cursor-pointer'>
            Show more →
          </NavLink>
        }
      </div>

      {/* Wishlist Grid (4 cards in a row with proper spacing) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.slice(0, 4).map((stay) => (
          <HomeStayCard key={stay.id} stay={stay} />
        ))}
      </div>

    </div>
  )
}

export default Wishlist;

/* Expected wishlist data = [
    {
      "id": 1,
      "title": "The Himalayan Orchard Home",
      "location": "Mukteshwar, Uttarakhand, India",
      "category": "mountains",
      "price": 8100,
      "rating": 4.9,
      "image": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800",
      "features": [
        "Mountain View",
        "Eco-Friendly",
        "Yoga Space",
        "Apple Orchard"
      ]
    },
    {
      "id": 7,
      "title": "Afsana Riverside Retreat",
      "location": "Pahalgam, Jammu & Kashmir, India",
      "category": "snows",
      "price": 3500,
      "rating": 4.8,
      "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/bf/27/89/caption.jpg?h=-1&s=1&w=700",
      "features": [
        "River Facing",
        "Snow Garden",
        "Persian Carpets",
        "Quiet Zone"
      ]
    }
  ]
*/

