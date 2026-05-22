import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeStayCard = ({ stay }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 shadow-sm dark:shadow-black/20 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group h-full flex flex-col rounded-2xl hover:-translate-y-1"
      onClick={() => navigate(`/homestays/${stay.category}/${stay.id}`)}
    >

      {/* Image */}
      <div className="h-44 overflow-hidden">

        <img
          src={stay.image}
          alt={stay.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">

        {/* Title + Rating */}
        <div className="flex justify-between items-start mb-2">

          <h3 className="text-sm font-semibold text-blue-900 dark:text-white leading-snug line-clamp-2">

            {stay.title}

          </h3>

          <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs ml-2 shrink-0">

            <Star className="w-3 h-3 mr-1 fill-blue-500 dark:fill-blue-400" />

            {stay.rating}

          </div>

        </div>

        {/* Location */}
        <p className="text-xs text-blue-500 dark:text-gray-400 mb-3 line-clamp-1">

          {stay.location}

        </p>

        {/* Features */}
        {stay?.features && (
          <div className="flex flex-wrap gap-2 mb-4">

            {stay.features.slice(0, 3).map((f, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30 rounded-full"
              >
                {f}
              </span>
            ))}

          </div>
        )}

        {/* Price */}
        <div className="mt-auto flex items-end justify-between">

          <div className="text-sm font-semibold text-blue-800 dark:text-white">

            ₹{stay.price}

            <span className="text-xs text-blue-400 dark:text-gray-500 font-normal">
              {" "}
              / night
            </span>

          </div>

        </div>

      </div>
    </div>
  );
};

export default HomeStayCard;