import {
  ArrowUpRight
} from "lucide-react";
import { useContext } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Footer = () => {
  const { darkmode } = useContext(AppContext);
  const navigate = useNavigate();

  const linkClass = "cursor-pointer text-slate-500 dark:text-slate-400 hover:text-blue-650 dark:hover:text-blue-400 transition-colors duration-205 text-sm py-1 inline-block";

  return (
    <footer className="relative transition-colors duration-500 overflow-hidden bg-[var(--footer-sky-start)] text-slate-800 dark:text-slate-200 border-t border-slate-200/60 dark:border-slate-850/60">
      
      {/* Top Content Grid & Columns */}
      <div className="max-w-7xl mx-auto px-2 pt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand details (occupies 4 cols) */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100/70 dark:bg-emerald-950/45 border border-emerald-200/50 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2.2]">
                  <path d="M12 2C7 7 7 11 12 11C17 11 17 7 12 2Z" />
                  <path d="M12 11v11" />
                  <path d="M12 14c2.5 0 4.5-1.2 4.5-2.8" />
                  <path d="M12 17c-2.5 0-4.5-1.2-4.5-2.8" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-850 dark:text-white cursor-pointer" onClick={() => navigate("/")}>
                  HomyGo
                </h2>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-650 dark:text-blue-400 mt-0.5">
                  BRIDGING CULTURES • HONORING HERITAGE
                </p>
              </div>
            </div>
            
            <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Discover authentic India through verified local homestays, immersive cultural experiences, and smart AI-powered travel planning.
            </p>

            {/* Social Links under branding block */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: FaFacebookF, url: '#' },
                { icon: FaInstagram, url: '#' },
                { icon: FaTwitter, url: '#' }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.url}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow ${
                      darkmode 
                        ? 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white' 
                        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Column 2: Access Points */}
          <div className="md:col-span-2 col-span-6">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Access Points
            </h3>
            <ul className="space-y-2.5">
              <li><NavLink to="/host/dashboard" className={linkClass}>Host Portal</NavLink></li>
              <li><NavLink to="/admin/dashboard" className={linkClass}>Admin Panel</NavLink></li>
              <li><span className={linkClass}>Report Listing</span></li>
              <li><span className={linkClass}>Community Reviews</span></li>
            </ul>
          </div>

          {/* Column 3: Corporate Info */}
          <div className="md:col-span-2 col-span-6">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li><span className={linkClass}>About Us</span></li>
              <li><span className={linkClass}>Careers</span></li>
              <li><span className={linkClass}>Contact Support</span></li>
              <li><span className={linkClass}>Privacy Policy</span></li>
            </ul>
          </div>

          {/* Column 4: Founders / Developers */}
          <div className="md:col-span-3 col-span-12">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Founding Team
            </h3>
            <ul className="space-y-2.5">
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
                    className="group flex items-center justify-between text-slate-500 dark:text-slate-400 hover:text-blue-655 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    <span className="font-medium">{member.name}</span>
                    <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-305 hover:translate-x-0.5">
                      <FaLinkedinIn size={12} className="text-blue-500" />
                      <ArrowUpRight size={10} className="text-gray-400" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Landscape SVG & Floating Copyright Pill Bar */}
      <div className="relative w-full overflow-hidden block select-none bg-[var(--footer-sky-start)]">
        <svg 
          viewBox="0 0 1440 420" 
          width="100%" 
          height="auto" 
          className="w-full h-auto min-h-[240px] md:min-h-[320px] lg:min-h-[420px] block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--footer-sky-start)" />
              <stop offset="100%" stopColor="var(--footer-sky-end)" />
            </linearGradient>
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--footer-river-start)" />
              <stop offset="100%" stopColor="var(--footer-river-end)" />
            </linearGradient>
            
            {/* Pine Tree Vector */}
            <g id="pinetree">
              <rect x="-1.5" y="0" width="3" height="15" fill="#374151" opacity="0.8" />
              <polygon points="0,-35 -12,-15 -5,-15 -15,5 -7,5 -18,25 18,25 7,5 15,5 5,-15 12,-15" />
            </g>
            
            {/* Round Fluffy Tree Vector */}
            <g id="roundtree">
              <rect x="-2" y="0" width="4" height="20" fill="#374151" opacity="0.8" />
              <circle cx="0" cy="-15" r="16" />
              <circle cx="-10" cy="-10" r="12" />
              <circle cx="10" cy="-10" r="12" />
              <circle cx="0" cy="-25" r="10" />
            </g>

            {/* Leaf Vector */}
            <g id="leaf">
              <path d="M 0,0 C 8,-12 20,-8 24,4 C 16,16 4,12 0,0 Z" />
              <path d="M 0,0 C 8,-4 16,0 24,4" fill="none" strokeWidth="0.8" opacity="0.4" />
            </g>

            {/* Daisy Flower Vector */}
            <g id="flower">
              <line x1="0" y1="0" x2="0" y2="12" stroke="#4b5563" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="1.5" fill="#eab308" />
              <circle cx="-3" cy="0" r="1.5" fill="#ffffff" />
              <circle cx="3" cy="0" r="1.5" fill="#ffffff" />
              <circle cx="0" cy="-3" r="1.5" fill="#ffffff" />
              <circle cx="0" cy="3" r="1.5" fill="#ffffff" />
            </g>
          </defs>

          {/* Sky Canvas */}
          <rect width="1440" height="420" fill="url(#skyGradient)" />

          {/* Giant Watermark Logo/Text */}
          <text 
            x="50%" 
            y="230" 
            textAnchor="middle" 
            fontSize="180" 
            fontWeight="900" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fill="currentColor" 
            className="text-slate-900/[0.04] dark:text-white/[0.10] tracking-wider uppercase font-black"
          >
            HomyGo
          </text>

          {/* Birds in the sky */}
          <path d="M 450,90 Q 454,84 458,90 Q 462,84 466,90 Q 462,92 458,90 Q 454,92 450,90 Z" fill="currentColor" className="text-slate-355 dark:text-slate-700" />
          <path d="M 480,75 Q 483,70 486,75 Q 489,70 492,75 Q 489,77 486,75 Q 483,77 480,75 Z" fill="currentColor" className="text-slate-355 dark:text-slate-700" transform="scale(0.85) translate(80, 25)" />
          <path d="M 980,85 Q 984,79 988,85 Q 992,79 996,85 Q 992,87 988,85 Q 984,87 980,85 Z" fill="currentColor" className="text-slate-355 dark:text-slate-700" />
          <path d="M 1010,72 Q 1013,67 1016,72 Q 1019,67 1022,72 Q 1019,74 1016,72 Q 1013,74 1010,72 Z" fill="currentColor" className="text-slate-355 dark:text-slate-700" transform="scale(0.9) translate(10, 15)" />

          {/* Mountains Back */}
          <path 
            d="M 0,420 L 0,260 L 180,180 L 380,250 L 560,200 L 720,280 L 880,220 L 1080,160 L 1260,240 L 1440,190 L 1440,420 Z" 
            fill="var(--footer-mountain-back)" 
          />

          {/* Mountains Front */}
          <path 
            d="M 0,420 L 0,290 L 120,220 L 280,280 L 440,230 L 640,310 L 800,290 L 980,200 L 1180,270 L 1340,210 L 1440,260 L 1440,420 Z" 
            fill="var(--footer-mountain-front)" 
          />

          {/* River winding from center mountains to front right */}
          <path 
            d="M 716,310 C 716,310 680,325 660,340 C 640,355 690,375 730,385 C 770,395 840,405 860,420 L 930,420 C 880,405 800,395 760,385 C 720,375 680,355 690,340 C 700,325 724,315 724,310 Z" 
            fill="url(#riverGradient)" 
          />

          {/* Rolling Hills (Forest Slopes) */}
          <path 
            d="M 0,420 L 0,280 Q 250,320 660,350 L 660,420 Z" 
            fill="var(--footer-forest-back)" 
          />
          <path 
            d="M 1440,420 L 1440,290 Q 1150,330 760,370 L 760,420 Z" 
            fill="var(--footer-forest-back)" 
          />

          {/* Forest Trees: Back Left Slope */}
          <use href="#pinetree" x="40" y="295" transform="scale(0.85)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#roundtree" x="80" y="310" transform="scale(1.05)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#pinetree" x="120" y="305" transform="scale(0.75)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#roundtree" x="160" y="320" transform="scale(1.15)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#pinetree" x="220" y="315" transform="scale(0.95)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#roundtree" x="280" y="330" transform="scale(1.05)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#pinetree" x="350" y="325" transform="scale(0.8)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#roundtree" x="420" y="340" transform="scale(0.95)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#pinetree" x="480" y="335" transform="scale(0.7)" className="text-[var(--footer-forest-front)]" fill="currentColor" />

          {/* Forest Trees: Back Right Slope */}
          <use href="#pinetree" x="980" y="355" transform="scale(0.75)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#roundtree" x="1040" y="345" transform="scale(1.05)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#pinetree" x="1100" y="335" transform="scale(0.85)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#roundtree" x="1160" y="325" transform="scale(1.15)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#pinetree" x="1220" y="315" transform="scale(0.95)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#roundtree" x="1280" y="310" transform="scale(1.05)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#pinetree" x="1340" y="305" transform="scale(0.8)" className="text-[var(--footer-forest-front)]" fill="currentColor" />
          <use href="#roundtree" x="1390" y="295" transform="scale(0.95)" className="text-[var(--footer-forest-front)]" fill="currentColor" />

          {/* Left Foreground Hill */}
          <path 
            d="M 0,420 L 0,330 C 150,340 300,380 500,420 Z" 
            fill="var(--footer-forest-front)" 
          />
          {/* Right Foreground Hill */}
          <path 
            d="M 1440,420 L 1440,340 C 1250,350 1100,380 950,420 Z" 
            fill="var(--footer-forest-front)" 
          />

          {/* Detailed Foreground Trees (Left) */}
          <use href="#roundtree" x="30" y="360" transform="scale(1.7)" className="text-emerald-950 dark:text-slate-950" fill="currentColor" />
          <use href="#pinetree" x="110" y="380" transform="scale(1.4)" className="text-emerald-900 dark:text-emerald-955" fill="currentColor" />
          <use href="#roundtree" x="190" y="390" transform="scale(1.3)" className="text-emerald-955 dark:text-slate-955" fill="currentColor" />
          <use href="#pinetree" x="270" y="405" transform="scale(1.1)" className="text-emerald-900 dark:text-emerald-955" fill="currentColor" />

          {/* Detailed Foreground Trees (Right) */}
          <use href="#pinetree" x="1380" y="370" transform="scale(1.8)" className="text-emerald-900 dark:text-emerald-955" fill="currentColor" />
          <use href="#roundtree" x="1290" y="380" transform="scale(1.4)" className="text-emerald-955 dark:text-slate-955" fill="currentColor" />
          <use href="#pinetree" x="1200" y="395" transform="scale(1.3)" className="text-emerald-900 dark:text-emerald-955" fill="currentColor" />
          <use href="#roundtree" x="1110" y="405" transform="scale(1.1)" className="text-emerald-955 dark:text-slate-955" fill="currentColor" />

          {/* Foreground Wildflowers */}
          <use href="#flower" x="50" y="390" transform="scale(1.1)" />
          <use href="#flower" x="80" y="400" transform="scale(0.9)" />
          <use href="#flower" x="140" y="405" transform="scale(1.2)" />
          <use href="#flower" x="200" y="410" transform="scale(1.0)" />

          <use href="#flower" x="1220" y="412" transform="scale(1.0)" />
          <use href="#flower" x="1260" y="402" transform="scale(1.1)" />
          <use href="#flower" x="1310" y="398" transform="scale(0.9)" />
          <use href="#flower" x="1360" y="405" transform="scale(1.3)" />

          {/* Falling Leaves */}
          <use href="#leaf" x="350" y="160" transform="rotate(-15) scale(0.65)" className="text-emerald-600/70 dark:text-emerald-800/30" fill="currentColor" />
          <use href="#leaf" x="550" y="220" transform="rotate(25) scale(0.45)" className="text-emerald-650/70 dark:text-emerald-800/30" fill="currentColor" />
          <use href="#leaf" x="780" y="180" transform="rotate(-40) scale(0.55)" className="text-emerald-600/70 dark:text-emerald-800/30" fill="currentColor" />
          <use href="#leaf" x="920" y="240" transform="rotate(10) scale(0.45)" className="text-emerald-655/70 dark:text-emerald-800/30" fill="currentColor" />
        </svg>

        {/* Floating Pill bar overlayed at the bottom of the landscape */}
        <div className="absolute bottom-12 md:bottom-16 left-0 right-0 w-full px-6 z-20">
          <div className={`max-w-7xl mx-auto px-8 py-4 rounded-2xl border shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300 ${
            darkmode 
              ? 'bg-slate-900/90 border-slate-800/80 text-slate-400 shadow-slate-950/40 backdrop-blur-md' 
              : 'bg-white/95 border-slate-100/80 text-slate-500 shadow-slate-200/40 backdrop-blur-sm'
          }`}>
            <div className="text-xs font-semibold tracking-wide text-center md:text-left">
              © {new Date().getFullYear()} HomyGo. Built with love in India.
            </div>
            <div className="flex gap-6 text-xs font-bold tracking-wide">
              <span className="hover:text-blue-650 dark:hover:text-blue-400 transition cursor-pointer">Terms of Service</span>
              <span className="hover:text-blue-650 dark:hover:text-blue-400 transition cursor-pointer">Privacy Policy</span>
              <span className="hover:text-blue-650 dark:hover:text-blue-400 transition cursor-pointer">Support Desk</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;