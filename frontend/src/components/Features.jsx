import { FaHome, FaMapMarkedAlt, FaRobot, FaLanguage } from "react-icons/fa";

const features = [
  {
    icon: <FaHome />,
    title: "Authentic Homestays",
    desc: "Discover real local homes and stay with verified families across India.",
    highlight: "Verified & trusted stays"
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Local Experiences",
    desc: "Explore hidden gems, traditions, and unique cultural activities.",
    highlight: "Beyond tourist spots"
  },
  {
    icon: <FaRobot />,
    title: "Smart Planning",
    desc: "AI-powered itineraries tailored to your travel style and budget.",
    highlight: "Personalized routes"
  },
  {
    icon: <FaLanguage />,
    title: "Language Support",
    desc: "Communicate easily with real-time translation and assistance.",
    highlight: "No language barriers"
  }
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 bg-blue-50 dark:bg-gray-950 transition-colors duration-300"
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-4">

            Why Choose{" "}

            <span className="text-blue-600 dark:text-blue-400">
              HomyGo
            </span>

          </h2>

          <p className="text-blue-800 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">

            Everything you need to explore India in a smarter,
            more authentic way.

          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 p-8 shadow-md dark:shadow-black/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl"
            >

              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-2xl mb-6 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">

                {feature.icon}

              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-3">

                {feature.title}

              </h3>

              {/* Description */}
              <p className="text-blue-800 dark:text-gray-400 text-sm leading-relaxed mb-5">

                {feature.desc}

              </p>

              {/* Highlight */}
              <div className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">

                ✨ {feature.highlight}

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Features;