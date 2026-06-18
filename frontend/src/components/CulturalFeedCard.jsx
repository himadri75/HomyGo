import React, { useState } from 'react'
import { Heart, Share2, MapPin, User, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom';

const CulturalFeedCard = ({ feed }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(feed.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    toast.success('Feed link copied to clipboard!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const location = `${feed.city}${feed.district ? ', ' + feed.district : ''}, ${feed.state}`;

  return (
    <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md hover:shadow-lg dark:shadow-black/30 transition rounded-lg overflow-hidden">

      {/* Image Section */}
      <NavLink to={`/cultural-feed/${feed.id}`}>
        <div className="h-64 overflow-hidden group">
          <img
            src={feed.image_url}
            alt={feed.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      </NavLink>

      {/* Content Section */}
      <div className="p-5">

        {/* Title */}
        <h3 className="text-lg font-bold text-blue-900 dark:text-white mb-2 line-clamp-2">
          {feed.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 mb-3 text-xs text-blue-600 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        {/* About */}
        <p className="text-sm text-blue-800 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {feed.about}
        </p>

        {/* Tags */}
        {feed.tags && feed.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">

            {feed.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-gray-300 border border-blue-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 transition cursor-pointer rounded"
              >
                #{tag}
              </span>
            ))}

          </div>
        )}

        {/* Footer */}
        <div className="border-t border-blue-100 dark:border-gray-800 pt-4 mb-4">

          <div className="flex items-center justify-between mb-3">

            {/* Author & Date */}
            <div className="flex gap-3">

              <div className="flex items-center gap-1 text-xs text-blue-700 dark:text-gray-300">
                <User className="w-3 h-3" />
                <span className="font-medium">{feed.author_name}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(feed.created_at)}</span>
              </div>

            </div>

            {/* Likes */}
            <div className="flex items-center gap-1 text-xs text-blue-700 dark:text-gray-300 font-medium">
              <Heart className="w-3 h-3 text-red-500" />
              <span>{likeCount}</span>
            </div>

          </div>

          {/* Actions */}
          <div className="flex gap-2">

            <button
              onClick={handleLike}
              className={`flex-1 flex items-center justify-center gap-2 py-2 border transition text-xs font-medium rounded ${isLiked
                ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40"
                : "bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-gray-300 border-blue-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700"
                }`}
            >
              <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
              {isLiked ? "Liked" : "Like"}
            </button>

            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-gray-300 border border-blue-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 transition text-xs font-medium rounded"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CulturalFeedCard;
