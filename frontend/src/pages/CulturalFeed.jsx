import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useEffect } from 'react';
import CulturalFeedCard from '../components/CulturalFeedCard';

const CulturalFeed = () => {
  const { culturalFeeds, fetchCulturalFeeds, page } = useContext(AppContext);
  const [isfeedsavailable, setIsfeedsavailable] = useState(true);

  useEffect(() => {
    if (culturalFeeds.length === 0) {
      fetchCulturalFeeds();
    }
  }, [])

  const handleLoadMore = async () => {
    const isfeeds = await fetchCulturalFeeds(page);
    console.log(isfeeds);
    setIsfeedsavailable(isfeeds);
  }

  if (!culturalFeeds || culturalFeeds.length === 0) {
    return (
      <div className="bg-blue-50 dark:bg-gray-950 min-h-screen flex items-center justify-center transition-colors duration-300">
        <p className="text-blue-900 dark:text-gray-300 text-base animate-pulse">
          Loading cultural feeds...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen py-12 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6">

        {/* Page Header */}
        <div className="mb-12">

          <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-3">
            Cultural Heritage & Traditions
          </h1>

          <p className="text-blue-800 dark:text-gray-300 text-sm max-w-3xl">
            Explore the rich cultural tapestry of India through stories of festivals, traditions, architecture, and heritage sites.
          </p>

        </div>

        {/* Feeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {culturalFeeds.map((feed) => (
            <CulturalFeedCard key={feed.id} feed={feed} />
          ))}

        </div>

        {/* Load More Button */}
        {isfeedsavailable && (
          <div className="flex justify-center mt-10">

            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition rounded"
            >
              Load More
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default CulturalFeed;
