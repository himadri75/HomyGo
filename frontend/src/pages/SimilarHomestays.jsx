import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import HomeStayCard from '../components/HomestayCard';

const SimilarHomestays = () => {
  const { category } = useParams();

  const {
    categoryHomestays,
    fetchHomestaysByCategory
  } = useContext(AppContext);

  useEffect(() => {
    fetchHomestaysByCategory(category);
  }, [category]);

  /* Loading State */
  if (!categoryHomestays) {
    return (
      <div className="bg-blue-50 dark:bg-gray-950 min-h-screen flex items-center justify-center transition-colors duration-300">

        <div className="flex flex-col items-center gap-4">

          {/* Spinner */}
          <div className="w-10 h-10 border-4 border-blue-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>

          <p className="text-blue-900 dark:text-gray-200 text-lg font-medium">

            Loading homestays...

          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-10">

          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-white capitalize mb-3">
            {category} Homestays
          </h1>

          <p className="text-blue-700 dark:text-gray-400 max-w-2xl leading-relaxed">
            Explore handpicked stays with authentic local experiences,
            scenic views, and comfortable hospitality.
          </p>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {categoryHomestays.map((stay) => (
            <HomeStayCard key={stay.id} stay={stay} />
          ))}

        </div>

        {/* Empty State */}
        {categoryHomestays.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-gray-800 flex items-center justify-center mb-5">
              <span className="text-3xl">🏡</span>
            </div>

            <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-2">
              No homestays found
            </h3>

            <p className="text-blue-700 dark:text-gray-400 max-w-md">
              We couldn’t find any stays in this category right now.
              Try exploring other destinations.
            </p>

          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarHomestays;