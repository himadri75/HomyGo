import HomeStayCard from "../components/HomestayCard";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

const Section = ({ title, data, category }) => {
  return (
    <div className="mb-12">

      {/* Section Header */}
      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold text-blue-900 dark:text-white transition-colors duration-300">

          {title}

        </h2>

        <NavLink
          to={`/homestays/${category}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition font-medium"
        >
          Show more →
        </NavLink>

      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {data.map((stay) => (
          <HomeStayCard key={stay.id} stay={stay} />
        ))}

      </div>

    </div>
  );
};

const Homestays = () => {
  const { fetchHomestays, homestays, errorMessage, loading } = useContext(AppContext);

  useEffect(() => {
    if (!homestays) {
      fetchHomestays();
    }
  }, []);

  /* Loading State */
  if (!homestays) {
    return (
      <div className="bg-blue-50 dark:bg-gray-950 min-h-screen flex items-center justify-center transition-colors duration-300">

        <div className="flex flex-col items-center gap-4">

          {/* Loader */}
          {loading.homestaysFetching ? <div className="w-10 h-10 border-4 border-blue-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div> : ""}

          <p className="text-blue-900 dark:text-gray-200 text-lg font-medium">

            {loading.homestaysFetching ? "Loading homestays..." : errorMessage.homestaysFetching}

          </p>

        </div>
      </div>
    );
  }

  const sections = [
    { title: "Mountain View", key: "mountains" },
    { title: "Snow Stays", key: "snows" },
    { title: "River Side", key: "rivers" },
    { title: "Royal Deserts", key: "deserts" },
    { title: "Sea Beaches", key: "beaches" }
  ];

  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Page Title */}
        <div className="mb-12">

          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-white mb-3">
            Explore Homestays
          </h1>

          <p className="text-blue-700 dark:text-gray-400 max-w-3xl leading-relaxed">
            Discover authentic stays across mountains, rivers,
            beaches, snow regions, and royal deserts of India.
          </p>

        </div>

        {/* Sections */}
        {homestays && (
          <>
            {sections.map((sec) => (
              <Section
                key={sec.key}
                title={sec.title}
                data={homestays[sec.key] || []}
                category={sec.key}
              />
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default Homestays;