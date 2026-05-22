import { useState } from "react";
import { FaClock, FaMapMarkerAlt, FaPlus, FaTrash } from "react-icons/fa";

const ItineraryPage = () => {
  const [location, setLocation] = useState("");
  const [tripLength, setTripLength] = useState(1);
  const [activities, setActivities] = useState([]);

  const [newActivity, setNewActivity] = useState({
    name: "",
    time: "",
    duration: 1,
  });

  const suggestedActivities = [
    "Local Market Visit",
    "Temple Tour",
    "Cooking Class",
    "Nature Walk",
    "Cultural Show",
    "Historical Sites",
  ];

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.time) {
      setActivities([...activities, { ...newActivity, id: Date.now() }]);
      setNewActivity({ name: "", time: "", duration: 1 });
    }
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <section className="bg-blue-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-900 mb-10">
          Smart Itinerary Planner
        </h1>

        {/* Trip Form */}
        <div className="bg-white border border-blue-200 shadow-md p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter destination"
                className="w-full p-3 border border-blue-200 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Trip Length (days)
              </label>

              <input
                type="number"
                value={tripLength}
                onChange={(e) => setTripLength(Number(e.target.value))}
                min="1"
                className="w-full p-3 border border-blue-200 focus:border-blue-500 outline-none"
              />
            </div>

          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Schedule Builder */}
          <div className="lg:col-span-2">

            <div className="bg-white border border-blue-200 shadow-md p-6">

              <h2 className="text-2xl font-semibold text-blue-900 mb-6">
                Schedule Builder
              </h2>

              {/* Add Activity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                <input
                  type="text"
                  placeholder="Activity name"
                  value={newActivity.name}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      name: e.target.value,
                    })
                  }
                  className="p-3 border border-blue-200 outline-none focus:border-blue-500"
                />

                <input
                  type="time"
                  value={newActivity.time}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      time: e.target.value,
                    })
                  }
                  className="p-3 border border-blue-200 outline-none focus:border-blue-500"
                />

                <div className="flex gap-2">

                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={newActivity.duration}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        duration: Number(e.target.value),
                      })
                    }
                    className="w-24 p-3 border border-blue-200 outline-none focus:border-blue-500"
                  />

                  <button
                    onClick={handleAddActivity}
                    className="flex-1 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <FaPlus /> Add
                  </button>

                </div>

              </div>

              {/* Activity List */}
              <div className="space-y-4">

                {activities.map((activity) => (

                  <div
                    key={activity.id}
                    className="flex justify-between items-center bg-blue-50 border border-blue-200 p-4"
                  >

                    <div>

                      <h3 className="font-semibold text-blue-900">
                        {activity.name}
                      </h3>

                      <div className="flex gap-4 text-sm text-blue-700 mt-1">

                        <span className="flex items-center gap-1">
                          <FaClock /> {activity.time}
                        </span>

                        <span className="flex items-center gap-1">
                          <FaClock /> {activity.duration}h
                        </span>

                      </div>

                    </div>

                    <button
                      onClick={() => handleDeleteActivity(activity.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Suggested */}
            <div className="bg-white border border-blue-200 shadow-md p-6">

              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Suggested Activities
              </h2>

              <div className="flex flex-wrap gap-2">

                {suggestedActivities.map((activity) => (

                  <button
                    key={activity}
                    onClick={() =>
                      setNewActivity({
                        ...newActivity,
                        name: activity,
                      })
                    }
                    className="border border-blue-200 px-4 py-2 text-sm text-blue-800 hover:bg-blue-100 transition"
                  >
                    {activity}
                  </button>

                ))}

              </div>

            </div>

            {/* Map */}
            <div className="bg-white border border-blue-200 shadow-md p-6">

              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Route Map
              </h2>

              <div className="bg-blue-100 border border-blue-200 h-64 flex items-center justify-center">

                <FaMapMarkerAlt className="text-3xl text-blue-400" />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ItineraryPage;
