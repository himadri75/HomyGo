import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "USA",
    text: "TourMate helped me find an amazing homestay in Kerala. The experience felt truly authentic and personal.",
  },
  {
    name: "Marco Rodriguez",
    location: "Spain",
    text: "The language support feature made my Rajasthan trip so smooth. I could connect with locals easily.",
  },
  {
    name: "Priya Patel",
    location: "India",
    text: "As a host, TourMate brings travelers who genuinely respect and enjoy our culture.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-blue-50 dark:bg-gray-950 transition-colors duration-300"
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-4">

            What Travelers Say

          </h2>

          <p className="text-blue-800 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">

            Real experiences from people exploring India with TourMate.

          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 p-8 shadow-md dark:shadow-black/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl"
            >

              {/* Stars */}
              <div className="flex mb-5">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-1 fill-current"
                  />
                ))}

              </div>

              {/* Quote */}
              <p className="text-blue-800 dark:text-gray-300 text-sm leading-relaxed mb-6 italic">

                “{item.text}”

              </p>

              {/* User */}
              <div className="border-t border-blue-100 dark:border-gray-800 pt-4">

                <p className="font-semibold text-blue-900 dark:text-white">

                  {item.name}

                </p>

                <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">

                  {item.location}

                </p>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Testimonials;