import { useState } from "react";
import { FaClock, FaMapMarkerAlt, FaPlus, FaTrash, FaCalendarAlt, FaCompass } from "react-icons/fa";

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
    <section className="relative bg-gradient-to-tr from-blue-50 via-indigo-50 to-emerald-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/20 min-h-screen py-16 transition-colors duration-500 overflow-hidden">
      
      {/* Glow Spots */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-400/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">

        {/* Title Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/30 mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
            Itinerary Designer
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-none">
            Smart Itinerary Planner
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Organize and schedule your daily travel activities. Enter your destination and duration, then build your custom agenda step by step.
          </p>
        </div>

        {/* Trip Form capsule */}
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6 mb-10 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Destination Location
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter destination (e.g. Goa, Manali)"
                  className="w-full p-4 pl-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Trip Length (Days)
              </label>

              <div className="relative">
                <input
                  type="number"
                  value={tripLength}
                  onChange={(e) => setTripLength(Number(e.target.value))}
                  min="1"
                  className="w-full p-4 pl-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
                <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Schedule Builder Block */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6 transition-all duration-300">

              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                Schedule Builder
              </h2>

              {/* Add Activity Deck */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/40">

                <input
                  type="text"
                  placeholder="Activity name (e.g. Lunch, Museum)"
                  value={newActivity.name}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      name: e.target.value,
                    })
                  }
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-blue-500 dark:focus:border-blue-400 text-sm"
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
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-blue-500 dark:focus:border-blue-400 [color-scheme:dark] text-sm"
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
                    className="w-20 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-blue-500 dark:focus:border-blue-400 text-sm text-center"
                  />

                  <button
                    onClick={handleAddActivity}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <FaPlus className="w-3.5 h-3.5" /> 
                    Add
                  </button>
                </div>

              </div>

              {/* Activity Timeline Path List */}
              {activities.length === 0 ? (
                <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <FaClock className="text-2xl text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No activities scheduled</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Type an activity name and time above, or click suggested ideas from the side deck to customize your agenda.
                  </p>
                </div>
              ) : (
                <div className="relative border-l-2 border-dashed border-blue-200 dark:border-slate-800 ml-4 pl-6 space-y-4 my-2">
                  {activities.map((activity, idx) => (
                    <div
                      key={activity.id}
                      className="relative flex justify-between items-center bg-white/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800/60 p-4 rounded-xl shadow-xs transition-colors group"
                    >
                      {/* Timeline circle node */}
                      <div className="absolute -left-[32px] top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950 shadow-sm flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      </div>

                      <div>
                        <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-0.5">Stop {idx + 1}</span>
                        <h3 className="font-bold text-slate-800 dark:text-white text-base">
                          {activity.name}
                        </h3>

                        <div className="flex gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 mt-1.5">
                          <span className="flex items-center gap-1.5">
                            <FaClock className="text-blue-500 w-3 h-3" /> 
                            {activity.time}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <FaClock className="text-indigo-500 w-3 h-3" /> 
                            {activity.duration}h duration
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 cursor-pointer"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Suggested Activities capsule */}
            <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                Recommended Ideas
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
                    className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-200 dark:hover:border-slate-600 transition shadow-xs cursor-pointer active:scale-95"
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            {/* Route Map Design */}
            <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                Itinerary Path
              </h2>

              <div className="relative rounded-xl overflow-hidden bg-slate-950 dark:bg-slate-950 h-64 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner group">
                
                {/* Tech grid backdrop */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent blur-lg" />
                
                <div className="relative flex flex-col items-center gap-3 z-10">
                  <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/5 group-hover:scale-105 transition-transform duration-300">
                    <FaCompass className="text-2xl text-blue-500 animate-spin-slow" />
                  </div>
                  
                  <div className="text-center">
                    <span className="text-xs font-black text-slate-200 uppercase tracking-widest block">Interactive Radar</span>
                    <span className="text-[10px] text-slate-500 font-bold block mt-1">
                      {location ? `Plotting route for ${location}...` : "Waiting for destination..."}
                    </span>
                  </div>
                </div>

                {/* Pulsing Pin spot */}
                {location && (
                  <div className="absolute top-1/3 left-1/3 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ItineraryPage;
