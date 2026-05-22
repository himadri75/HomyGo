import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/asset";

const FloatingChatButton = () => {
  const location = useLocation();
  if (location.pathname === "/chatbot") {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 md:bottom-6 md:right-6 group">

      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
        Chat with YatriSeva
      </div>

      <Link
        to="/chatbot"
        aria-label="Open chatbot"
        className="
          relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center 
          rounded-full 
          bg-white/70 backdrop-blur-xl
          border border-blue-200
          shadow-[0_10px_30px_rgba(59,130,246,0.25),0_4px_10px_rgba(0,0,0,0.05)]
          
          transition-all duration-300 ease-out
          hover:scale-110 hover:shadow-[0_15px_40px_rgba(59,130,246,0.35)]
          active:scale-95
          
          focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300
        "
      >
        {/* Pulse Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping"></span>

        {/* Icon */}
        <img
          src={assets.chatbot_icon}
          alt="chatbot icon"
          className="relative h-7 w-7 md:h-8 md:w-8 object-contain"
        />
      </Link>
    </div>
  );
};

export default FloatingChatButton;