import { ArrowRight } from "lucide-react";
import { assets } from "../assets/asset";
import { NavLink } from "react-router-dom"
const destinations = [
  {
    name: "Rajasthan",
    desc: "Royal palaces, desert safaris, and heritage stays.",
    img: assets.rajasthan_desart,
    redirectURL: "/homestays/deserts",
  },
  {
    name: "Kerala",
    desc: "Backwaters, beaches, and peaceful village life.",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    redirectURL: "/homestays/beaches",
  },
  {
    name: "Himachal Pradesh",
    desc: "Mountains, adventure, and scenic retreats.",
    img: assets.himachal_mountain,
    redirectURL: "/homestays/mountains",
  }
];

const Destinations = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-4">

            Explore Popular Destinations

          </h2>

          <p className="text-blue-800 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">

            Discover the most loved places for authentic homestay
            experiences across India.

          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {destinations.map((place, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/20 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl hover:-translate-y-2"
            >

              {/* Image */}
              <div className="h-56 overflow-hidden">

                <img
                  src={place.img}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

              {/* Content */}
              <div className="p-6">

                {/* Destination */}
                <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-3">

                  {place.name}

                </h3>

                {/* Description */}
                <p className="text-blue-800 dark:text-gray-400 text-sm mb-5 leading-relaxed">

                  {place.desc}

                </p>

                {/* CTA */}
                <NavLink
                  to={place.redirectURL}
                  className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                </NavLink>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Destinations;