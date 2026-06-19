import { useState } from "react";
import { Link } from "react-router-dom";
import YatriSevaBotLogo from "../components/YatriSevaBotLogo";
import YatriSevaChatPanel from "../components/YatriSevaChatPanel";

const Chatbot = () => {
  const [isMaximized, setIsMaximized] = useState(true);

  return (
    <main className="min-h-screen overflow-hidden bg-[#071327] px-4 py-5 text-white sm:px-6">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.24),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.09),transparent_28%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col">
        <header className="mb-5 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <YatriSevaBotLogo size="sm" className="transition group-hover:scale-105" />
            <span>
              <span className="block text-[15px] font-bold leading-5 text-white">
                YatriSeva
              </span>
              <span className="text-xs font-medium text-blue-100/70">
                AI travel concierge
              </span>
            </span>
          </Link>
        </header>

        <YatriSevaChatPanel
          isMaximized={isMaximized}
          onMaximize={() => setIsMaximized((current) => !current)}
          className={`min-h-0 flex-1 ${
            isMaximized ? "rounded-[2rem]" : "mx-auto max-h-[760px] max-w-[460px] rounded-[2rem]"
          }`}
        />
      </div>
    </main>
  );
};

export default Chatbot;
