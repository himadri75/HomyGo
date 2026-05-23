import React from 'react'
import { FaHome, FaMapMarkedAlt, FaRobot, FaLanguage, FaCheckCircle, FaStar, FaClock, FaShieldAlt, FaUsers, FaGlobe } from "react-icons/fa";

const mainFeatures = [
  {
    icon: <FaHome className="text-3xl" />,
    title: "Authentic Homestays",
    desc: "Discover real local homes and stay with verified families across India.",
    details: "Experience genuine hospitality by staying in authentic homestays verified by our team. Connect with local families, learn their stories, and immerse yourself in real Indian culture.",
    highlight: "Verified & trusted stays",
    benefits: ["Verified hosts", "Real local experience", "Safe & secure", "Personal connections"]
  },
  {
    icon: <FaMapMarkedAlt className="text-3xl" />,
    title: "Local Experiences",
    desc: "Explore hidden gems, traditions, and unique cultural activities.",
    details: "Go beyond tourist attractions. Discover hidden gems, traditional crafts, local festivals, and authentic cultural experiences that make your trip unforgettable.",
    highlight: "Beyond tourist spots",
    benefits: ["Hidden destinations", "Traditional crafts", "Local festivals", "Authentic cuisine"]
  },
  {
    icon: <FaRobot className="text-3xl" />,
    title: "Smart Planning",
    desc: "AI-powered itineraries tailored to your travel style and budget.",
    details: "Get personalized itineraries powered by AI that adapt to your preferences, budget, and travel style. Save time and discover the best routes for your journey.",
    highlight: "Personalized routes",
    benefits: ["AI-powered planning", "Budget-friendly", "Customized routes", "Time-saving"]
  },
  {
    icon: <FaLanguage className="text-3xl" />,
    title: "Language Support",
    desc: "Communicate easily with real-time translation and assistance.",
    details: "No language barriers! Real-time translation support helps you communicate effortlessly with hosts and locals, making your experience seamless and enjoyable.",
    highlight: "No language barriers",
    benefits: ["Real-time translation", "Easy communication", "Local assistance", "Cultural bridge"]
  }
];

const additionalFeatures = [
  { icon: <FaStar />, title: "Rating & Reviews", desc: "Transparent ratings from real travelers" },
  { icon: <FaClock />, title: "24/7 Support", desc: "Round-the-clock customer assistance" },
  { icon: <FaShieldAlt />, title: "Safe & Secure", desc: "Verified hosts and secure payments" },
  { icon: <FaUsers />, title: "Community", desc: "Connect with fellow travelers" },
  { icon: <FaGlobe />, title: "Multi-language", desc: "Support in multiple languages" },
  { icon: <FaCheckCircle />, title: "Best Price Guarantee", desc: "Lowest rates guaranteed" }
];

const Features = () => {
  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">

      {/* Page Header */}
      <div className="bg-blue-600 dark:bg-gray-900 py-12 transition-colors duration-300">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Why Choose HomyGo
          </h1>

          <p className="text-blue-100 dark:text-gray-300 text-sm md:text-base max-w-3xl">
            Discover India authentically with our innovative platform combining local experiences, AI-powered planning, and community support.
          </p>

        </div>
      </div>

      {/* Main Features Section */}
      <div className="py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="space-y-12">

            {mainFeatures.map((feature, index) => (
              <div key={index}>

                {/* Feature Card */}
                <div className="mb-8">

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                    {/* Icon & Title */}
                    <div className="md:col-span-1">

                      <div className="flex items-start gap-4">

                        <div className="w-16 h-16 flex items-center justify-center bg-blue-100 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 shrink-0 text-blue-600 dark:text-blue-400 rounded-lg">

                          {feature.icon}

                        </div>

                        <div>

                          <h2 className="text-lg font-bold text-blue-900 dark:text-white mb-2">
                            {feature.title}
                          </h2>

                          <p className="text-xs font-semibold text-blue-600 dark:text-gray-400 uppercase">
                            ✨ {feature.highlight}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">

                      <p className="text-blue-800 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                        {feature.details}
                      </p>

                      {/* Benefits */}
                      <div className="grid grid-cols-2 gap-3">

                        {feature.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">

                            <FaCheckCircle className="text-blue-600 dark:text-blue-400 text-xs mt-0.5 shrink-0" />

                            <span className="text-xs text-blue-700 dark:text-gray-300 font-medium">
                              {benefit}
                            </span>

                          </div>
                        ))}

                      </div>

                    </div>

                  </div>

                  {/* Divider */}
                  {index < mainFeatures.length - 1 && (
                    <div className="border-t border-blue-200 dark:border-gray-800 mt-8" />
                  )}

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Additional Features Grid */}
      <div className="py-12 bg-white dark:bg-gray-900 border-t border-b border-blue-200 dark:border-gray-800 transition-colors duration-300">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-2xl font-bold text-blue-900 dark:text-white mb-8 text-center">
            More Features to Enhance Your Journey
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="border border-blue-200 dark:border-gray-800 bg-blue-50 dark:bg-gray-800 p-6 hover:shadow-md dark:hover:shadow-black/30 transition rounded-lg"
              >

                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-300 text-lg mb-4 rounded-md">
                  {feature.icon}
                </div>

                <h3 className="text-base font-semibold text-blue-900 dark:text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-blue-800 dark:text-gray-300 text-xs">
                  {feature.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* CTA Section */}
      <div className="py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/30 p-8 md:p-12 rounded-lg transition-colors duration-300">

            <div className="text-center max-w-3xl mx-auto">

              <h2 className="text-2xl font-bold text-blue-900 dark:text-white mb-3">
                Ready to Explore India Authentically?
              </h2>

              <p className="text-blue-800 dark:text-gray-300 text-sm mb-8 leading-relaxed">
                Join thousands of travelers who have discovered the real India through HomyGo. Start your journey today and create unforgettable memories with local communities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">

                <button className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold text-sm hover:bg-blue-700 dark:hover:bg-blue-400 transition rounded-md">
                  Browse Homestays
                </button>

                <button className="px-6 py-3 bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-gray-300 font-semibold text-sm border border-blue-200 dark:border-gray-700 hover:bg-blue-200 dark:hover:bg-gray-700 transition rounded-md">
                  Learn More
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Features