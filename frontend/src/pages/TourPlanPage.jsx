import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaRoute,
  FaStar,
  FaLocationArrow,
  FaDirections
} from "react-icons/fa";
import { dummyPlaces } from "../assets/asset";

const TourPlanPage = () => {

  const [location, setLocation] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  
  /* ---------------- Location Fetch ---------------- */

  const detectLocation = () => {

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(

      (position) => {

        // for demo purpose convert coords → nearest dummy city
        const lat = position.coords.latitude;

        if (lat > 20 && lat < 25) {

          setLocation("kolkata");
          setPlaces(dummyPlaces.kolkata);

        } else {

          setLocation("delhi");
          setPlaces(dummyPlaces.delhi);

        }

        setSelectedPlaces([]);
        setPlan(null);
        setLoadingLocation(false);

      },

      () => {
        alert("Location permission denied");
        setLoadingLocation(false);
      }

    );

  };

  const searchLocation = () => {

    const key = location.toLowerCase().trim();

    if (dummyPlaces[key]) {

      setPlaces(dummyPlaces[key]);
      setSelectedPlaces([]);
      setPlan(null);

    } else {

      alert("Try: Kolkata or Delhi");

    }

  };

  const togglePlace = (place) => {

    const exists = selectedPlaces.find(p => p.id === place.id);

    if (exists) {

      setSelectedPlaces(selectedPlaces.filter(p => p.id !== place.id));

    } else {

      setSelectedPlaces([...selectedPlaces, place]);

    }

  };

  const generatePlan = () => {

    if (selectedPlaces.length === 0) {

      alert("Select places first");
      return;

    }

    const sorted = [...selectedPlaces].sort(
      (a, b) => a.distance - b.distance
    );

    setPlan({

      morning: sorted.slice(0, 2),
      afternoon: sorted.slice(2, 4),

      totalDistance:
        sorted.reduce((sum, p) => sum + p.distance, 0)

    });

  };

  /* ---------------- UI ---------------- */

  return (

    <section className="bg-blue-50 min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}

        <h1 className="text-4xl font-bold text-blue-900 mb-10">
          AI Tour Planner
        </h1>

        {/* Search Bar */}

        <div className="bg-white border border-blue-200 shadow-md p-6 mb-10">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              placeholder="Enter city (Kolkata / Delhi)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 p-3 border border-blue-200 focus:border-blue-500 outline-none"
            />

            <button
              onClick={searchLocation}
              className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition flex items-center gap-2 shadow-md"
            >
              <FaSearch />
              Search
            </button>

            <button
              onClick={detectLocation}
              className="border border-blue-300 px-6 py-3 text-blue-800 hover:bg-blue-100 transition flex items-center gap-2"
            >
              <FaLocationArrow />

              {loadingLocation
                ? "Detecting..."
                : "Use My Location"}
            </button>

          </div>

        </div>

        {/* Layout */}

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Places */}

          <div className="lg:col-span-2">

            <div className="bg-white border border-blue-200 shadow-md p-6">

              <h2 className="text-2xl font-semibold text-blue-900 mb-6">
                Nearby Places
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                {places.map(place => {

                  const selected =
                    selectedPlaces.find(p => p.id === place.id);

                  return (

                    <div
                      key={place.id}
                      onClick={() => togglePlace(place)}
                      className={`cursor-pointer border shadow-sm transition hover:shadow-md

                      ${selected
                          ? "border-blue-600"
                          : "border-blue-200"
                        }
                      `}

                    >

                      <img
                        src={place.img}
                        className="h-44 w-full object-cover"
                      />

                      <div className="p-4">

                        <h3 className="font-semibold text-blue-900">
                          {place.name}
                        </h3>

                        <div className="flex justify-between mt-2 text-sm text-blue-700">

                          <span className="flex gap-1 items-center">
                            <FaMapMarkerAlt />
                            {place.distance} km
                          </span>

                          <span className="flex gap-1 items-center">
                            <FaStar />
                            {place.rating}
                          </span>

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          </div>

          {/* Plan */}

          <div className="space-y-6">

            <div className="bg-white border border-blue-200 shadow-md p-6">

              <button
                onClick={generatePlan}
                className="w-full bg-blue-600 text-white py-3 hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md"
              >
                <FaRoute />
                Generate Plan
              </button>

              <p className="text-sm text-blue-700 mt-3">

                Selected: {selectedPlaces.length}

              </p>

            </div>

            {plan && (

              <div className="bg-white border border-blue-200 shadow-md p-6">

                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Your Plan
                </h2>

                <div className="mb-4">

                  <h3 className="text-blue-800 mb-2">
                    Morning
                  </h3>

                  {plan.morning.map(p => (
                    <div
                      key={p.id}
                      className="bg-blue-50 border border-blue-200 p-3 mb-2"
                    >
                      {p.name}
                    </div>
                  ))}

                </div>

                <div>

                  <h3 className="text-blue-800 mb-2">
                    Afternoon
                  </h3>

                  {plan.afternoon.map(p => (
                    <div
                      key={p.id}
                      className="bg-blue-50 border border-blue-200 p-3 mb-2"
                    >
                      {p.name}
                    </div>
                  ))}

                </div>

                <div className="border-t border-blue-200 mt-4 pt-4 text-blue-800">

                  Total distance:
                  {" "}
                  {plan.totalDistance.toFixed(1)} km

                </div>

                <button
                  className="mt-4 w-full border border-blue-300 py-3 text-blue-800 hover:bg-blue-100 transition flex items-center justify-center gap-2"
                >
                  <FaDirections />
                  View Route
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </section>

  );

};

export default TourPlanPage;