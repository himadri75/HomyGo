import { ArrowRight, Play, Star } from "lucide-react";
import { assets } from "../assets/asset";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-blue-50 dark:bg-gray-950 transition-colors duration-300">

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-blue-100 to-white dark:from-blue-950/20 dark:to-gray-950 opacity-60 dark:opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">

        {/* Badge */}
        <div
          className="inline-flex items-center px-4 py-2 border border-blue-300 dark:border-blue-800 bg-white dark:bg-gray-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8 shadow-sm dark:shadow-blue-950/20 transition-all duration-700 opacity-0 translate-y-6"
        >
          <Star className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
          Trusted by 50,000+ travelers
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-blue-900 dark:text-white leading-tight mb-6 transition-all duration-700 opacity-0 translate-y-8"
        >
          Discover India{" "}
          <span className="text-blue-600 dark:text-blue-400">
            Like Never Before
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-blue-800 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-100 opacity-0 translate-y-8"
        >
          Stay with locals, explore hidden gems, and experience authentic culture.
          Travel smarter with AI-powered planning and real connections.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-700 delay-200 opacity-0 translate-y-8"
        >

          {/* Explore */}
          <button
            onClick={() => navigate("/homestays")}
            className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium tracking-wide hover:bg-blue-700 dark:hover:bg-blue-400 transition-all duration-300 flex items-center shadow-md hover:shadow-lg hover:scale-[1.03] rounded-lg"
          >
            Explore
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

          {/* Start Planning */}
          <button className="px-8 py-3 border border-blue-300 dark:border-gray-700 text-blue-800 dark:text-gray-200 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm text-sm font-medium tracking-wide hover:bg-blue-100 dark:hover:bg-gray-800 transition-all duration-300 flex items-center shadow-sm hover:shadow-md rounded-lg">
            <Play className="w-4 h-4 mr-2" />
            Start Planning
          </button>

        </div>

        {/* Trust note */}
        <p className="text-sm text-blue-700 dark:text-gray-400">
          No booking fees • Verified stays • Instant support
        </p>

        {/* Image Showcase */}
        <div
          className="mt-16 transition-all duration-700 delay-300 opacity-0 translate-y-10"
        >

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            {/* Main Image */}
            <div className="md:col-span-2 bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-lg dark:shadow-black/30 overflow-hidden rounded-2xl">

              <img
                src={assets.taj_mahal}
                alt="India travel"
                className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition duration-500"
              />

            </div>

            {/* Side Images */}
            <div className="hidden md:flex flex-col gap-6 h-full justify-between">

              <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/20 overflow-hidden rounded-2xl">

                <img
                  src={assets.sea_beach}
                  alt="Sea beach"
                  className="h-32 w-full object-cover hover:scale-105 transition duration-500"
                />

              </div>

              <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/20 overflow-hidden rounded-2xl">

                <img
                  src={assets.island}
                  alt="Island"
                  className="h-32 w-full object-cover hover:scale-105 transition duration-500"
                />

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
