import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaArrowRight,
  FaPaperPlane,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { darkmode } = useContext(AppContext);
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter a valid email");
    toast.success("Thank you for subscribing! ✈️");
    setEmail("");
  };

  const linkClass = "cursor-pointer text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative py-1 inline-block after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 hover:after:w-full after:bg-blue-600 dark:after:bg-blue-400 after:transition-all after:duration-300";

  return (
    <footer
      className="relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-20 pb-10 border-t border-slate-200/50 dark:border-slate-900 transition-colors duration-300 overflow-hidden"
    >
      {/* Backdrop glowing blurs */}
      <div className="absolute top-0 -left-40 w-96 h-96 rounded-full bg-blue-500/5 dark:bg-blue-600/3 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-cyan-500/5 dark:bg-cyan-600/3 blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Top Grid Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          
          {/* Brand & Description */}
          <div className="md:col-span-2 pr-0 md:pr-10">
            <h2 className="text-3xl font-extrabold mb-4 tracking-tight bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              HomyGo
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Discover authentic India through verified local homestays, immersive cultural experiences, and smart AI-powered travel planning.
            </p>

            {/* Social Icons with custom glass hover cards */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200/40 dark:bg-slate-900/40 border border-slate-300/30 dark:border-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300 shadow-sm"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200/40 dark:bg-slate-900/40 border border-slate-300/30 dark:border-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-linear-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-pink-500 transition duration-300 shadow-sm"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200/40 dark:bg-slate-900/40 border border-slate-300/30 dark:border-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition duration-300 shadow-sm"
              >
                <FaTwitter size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Access
            </h3>
            <ul className="space-y-2 flex flex-col items-start text-sm">
              <li><NavLink to="/host/dashboard" className={linkClass}>Host Access</NavLink></li>
              <li><NavLink to="/admin/dashboard" className={linkClass}>Admin</NavLink></li>
              <li><span className={linkClass}>Report</span></li>
              <li><span className={linkClass}>Reviews</span></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Company
            </h3>
            <ul className="space-y-2 flex flex-col items-start text-sm">
              <li><span className={linkClass}>About Us</span></li>
              <li><span className={linkClass}>Careers</span></li>
              <li><span className={linkClass}>Contact</span></li>
              <li><span className={linkClass}>Privacy Policy</span></li>
            </ul>
          </div>

          {/* Column 4: Team */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Team
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Himadri Karan", link: "https://www.linkedin.com/in/himadri516/" },
                { name: "Sourik Das", link: "https://www.linkedin.com/in/sourik-das/" },
                { name: "Anish Kar", link: "https://www.linkedin.com/in/anish-kar-b6764b259/" },
                { name: "Arka Roy", link: "https://www.linkedin.com/in/arka-roy-76b1561b2/" },
                { name: "Arpan Santra", link: "https://www.linkedin.com/in/arpansantra/" },
              ].map((member) => (
                <li key={member.name}>
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
                  >
                    <span>{member.name}</span>
                    <FaLinkedinIn size={11} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition duration-200 text-blue-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Newsletter / Join Section */}
        <div className="relative mb-12 p-6 md:p-8 bg-slate-200/20 dark:bg-slate-900/30 border border-slate-300/20 dark:border-slate-800/40 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-size-[14px_24px] pointer-events-none" />
          
          <div className="text-center md:text-left max-w-lg relative z-10">
            <h4 className="text-lg font-bold mb-1.5 text-slate-800 dark:text-white">
              Stay inspired on your next journey
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Subscribe to HomyGo's newsletter for unique local stories, travel guides, and exclusive homestay deals.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 border border-slate-300/60 dark:border-slate-800 bg-white/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm rounded-xl outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-w-60 shadow-sm transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="py-3 px-6 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>Subscribe</span>
              <FaPaperPlane size={11} />
            </button>
          </form>
        </div>

        {/* Bottom copyright & legal block */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 dark:text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HomyGo. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-blue-500 transition cursor-pointer">Terms of Service</span>
            <span className="hover:text-blue-500 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-blue-500 transition cursor-pointer">Support</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;