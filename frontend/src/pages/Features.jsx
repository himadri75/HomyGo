import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  FaHome,
  FaMapMarkedAlt,
  FaRobot,
  FaLanguage,
  FaCheckCircle,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaUsers,
  FaGlobe,
  FaChevronRight,
  FaUserCheck,
} from "react-icons/fa";
import { assets } from '../assets/asset';

const mainFeatures = [
  {
    icon: <FaHome className="text-2xl" />,
    title: "Authentic Homestays",
    desc: "Discover real local homes and stay with verified families across India.",
    details: "Experience genuine hospitality by staying in authentic homestays verified by our team. Connect with local families, learn their stories, and immerse yourself in real Indian culture.",
    highlight: "Verified & trusted stays",
    benefits: ["Verified hosts", "Real local experience", "Safe & secure", "Personal connections"],
    color: "from-blue-500 to-indigo-500",
    glow: "rgba(59,130,246,0.15)",
    textAccent: "text-blue-600 dark:text-blue-400",
    borderAccent: "group-hover:border-blue-500/40 dark:group-hover:border-blue-400/40",
    badgeGlow: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/30"
  },
  {
    icon: <FaMapMarkedAlt className="text-2xl" />,
    title: "Local Experiences",
    desc: "Explore hidden gems, traditions, and unique cultural activities.",
    details: "Go beyond tourist attractions. Discover hidden gems, traditional crafts, local festivals, and authentic cultural experiences that make your trip unforgettable.",
    highlight: "Beyond tourist spots",
    benefits: ["Hidden destinations", "Traditional crafts", "Local festivals", "Authentic cuisine"],
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.15)",
    textAccent: "text-emerald-600 dark:text-emerald-400",
    borderAccent: "group-hover:border-emerald-500/40 dark:group-hover:border-emerald-400/40",
    badgeGlow: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/30"
  },
  {
    icon: <FaRobot className="text-2xl" />,
    title: "Smart Planning",
    desc: "AI-powered itineraries tailored to your travel style and budget.",
    details: "Get personalized itineraries powered by AI that adapt to your preferences, budget, and travel style. Save time and discover the best routes for your journey.",
    highlight: "Personalized routes",
    benefits: ["AI-powered planning", "Budget-friendly", "Customized routes", "Time-saving"],
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.15)",
    textAccent: "text-amber-600 dark:text-amber-400",
    borderAccent: "group-hover:border-amber-500/40 dark:group-hover:border-amber-400/40",
    badgeGlow: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30"
  },
  {
    icon: <FaLanguage className="text-2xl" />,
    title: "Language Support",
    desc: "Communicate easily with real-time translation and assistance.",
    details: "No language barriers! Real-time translation support helps you communicate effortlessly with hosts and locals, making your experience seamless and enjoyable.",
    highlight: "No language barriers",
    benefits: ["Real-time translation", "Easy communication", "Local assistance", "Cultural bridge"],
    color: "from-violet-500 to-fuchsia-500",
    glow: "rgba(139,92,246,0.15)",
    textAccent: "text-violet-600 dark:text-violet-400",
    borderAccent: "group-hover:border-violet-500/40 dark:group-hover:border-violet-400/40",
    badgeGlow: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-200/50 dark:border-violet-900/30"
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
  const navigate = useNavigate();
  const { darkmode } = useContext(AppContext);
  const [activeSimulator, setActiveSimulator] = useState(0);
  
  const [bgCoords, setBgCoords] = useState({ x: 0, y: 0 });
  const [bgOpacity, setBgOpacity] = useState(0);

  const handleBgMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setBgCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setBgOpacity(1);
  };

  const handleBgMouseLeave = () => {
    setBgOpacity(0);
  };

  /* ---------------- 3D Parallax Tilt Effect ---------------- */
  const handleMouseMove = (event, index) => {
    const card = document.getElementById(`feature-card-${index}`);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--y", `${(y / rect.height) * 100}%`);

    const deepLayer = card.querySelector(".parallax-layer-deep");
    if (deepLayer) {
      const moveX = ((x - centerX) / centerX) * 12;
      const moveY = ((y - centerY) / centerY) * 12;
      deepLayer.style.transform = `translateZ(30px) translateX(${moveX}px) translateY(${moveY}px)`;
    }

    const midLayer = card.querySelector(".parallax-layer-mid");
    if (midLayer) {
      const moveX = ((x - centerX) / centerX) * 6;
      const moveY = ((y - centerY) / centerY) * 6;
      midLayer.style.transform = `translateZ(15px) translateX(${moveX}px) translateY(${moveY}px)`;
    }
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`feature-card-${index}`);
    if (!card) return;

    card.style.transition = "transform 0.5s ease-out";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    const deepLayer = card.querySelector(".parallax-layer-deep");
    if (deepLayer) {
      deepLayer.style.transition = "transform 0.5s ease-out";
      deepLayer.style.transform = "translateZ(30px) translateX(0px) translateY(0px)";
    }

    const midLayer = card.querySelector(".parallax-layer-mid");
    if (midLayer) {
      midLayer.style.transition = "transform 0.5s ease-out";
      midLayer.style.transform = "translateZ(15px) translateX(0px) translateY(0px)";
    }

    setTimeout(() => {
      if (!card) return;
      card.style.transition = "none";
      if (deepLayer) deepLayer.style.transition = "none";
      if (midLayer) midLayer.style.transition = "none";
    }, 500);
  };

  const handleMouseEnter = (index) => {
    const card = document.getElementById(`feature-card-${index}`);
    if (!card) return;
    card.style.transition = "none";
    const deepLayer = card.querySelector(".parallax-layer-deep");
    if (deepLayer) deepLayer.style.transition = "none";
    const midLayer = card.querySelector(".parallax-layer-mid");
    if (midLayer) midLayer.style.transition = "none";
  };

  return (
    <div 
      onMouseMove={handleBgMouseMove}
      onMouseLeave={handleBgMouseLeave}
      className="relative bg-gradient-to-tr from-blue-50 via-indigo-50 to-emerald-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/20 min-h-screen py-16 transition-colors duration-500 overflow-hidden"
    >
      
      {/* Static Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.14] dark:opacity-[0.16] z-0"
        style={{
          backgroundImage: darkmode 
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 1.2px, transparent 1.2px)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Interactive Hover Glow Dot Grid Spotlight (Stitch-like) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${darkmode ? '#38bdf8' : '#2563eb'} 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
          WebkitMaskImage: `radial-gradient(circle 180px at ${bgCoords.x}px ${bgCoords.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
          maskImage: `radial-gradient(circle 180px at ${bgCoords.x}px ${bgCoords.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
          opacity: bgOpacity,
        }}
        aria-hidden="true"
      />

      {/* Background glow animations */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-400/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">

        {/* Header Section */}
        <div className="relative mb-16 text-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/60 dark:border-slate-800/40 rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] overflow-hidden">
          {/* Subtle grid pattern inside header card */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          {/* Neon glow spot behind the header */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-blue-500/10 dark:bg-blue-400/5 blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/30 mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse-ring"></span>
              AI Travel Platform Capabilities
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-none bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-200 bg-clip-text text-transparent">
              Why Choose HomyGo
            </h1>

            <p className="text-sm md:text-base text-slate-650 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover India authentically with our innovative platform combining verified local homestays, AI-powered route planning, and real-time cultural connections.
            </p>
          </div>
        </div>

        {/* 3D Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              id={`feature-card-${index}`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              className={`group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.2)] p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default ${feature.borderAccent}`}
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            >
              {/* Backlight Glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                style={{
                  background: `radial-gradient(circle 250px at var(--x, 50%) var(--y, 50%), ${feature.glow}, transparent 80%)`
                }}
              />

              <div style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
                {/* Icon Wrapper */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${feature.color} text-white shadow-lg transition-transform duration-500 group-hover:scale-105 parallax-layer-deep`}>
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-full border border-slate-200/40 dark:border-slate-700/40">
                    Feature 0{index + 1}
                  </span>
                </div>

                {/* Header info */}
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-transform duration-500 group-hover:translate-x-1 parallax-layer-mid">
                  {feature.title}
                </h2>
                
                <p className={`text-[10px] font-black uppercase tracking-wider ${feature.textAccent} mb-4 flex items-center gap-1.5`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {feature.highlight}
                </p>

                {/* Description details */}
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed font-medium">
                  {feature.details}
                </p>
              </div>

              {/* Benefits checklist */}
              <div 
                className="grid grid-cols-2 gap-3.5 pt-4 border-t border-slate-200/50 dark:border-slate-800/50"
                style={{ transform: "translateZ(20px)" }}
              >
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FaCheckCircle className={`w-3.5 h-3.5 ${feature.textAccent} shrink-0`} />
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Simulator Playground */}
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-8 mb-20 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            
            {/* Left Console */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-blue-500/10 dark:bg-blue-400/10 text-[9px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-2 border border-blue-200/30 dark:border-blue-900/30">
                  Interactive Playground
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Feature Live Simulator
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Click on the capabilities below to simulate how HomyGo resolves travelers' requests in real-time.
                </p>
              </div>

              {/* Tab options */}
              <div className="flex flex-col gap-2.5">
                {mainFeatures.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSimulator(idx)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer group relative overflow-hidden ${
                      activeSimulator === idx
                        ? "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                        : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/20"
                    }`}
                  >
                    {activeSimulator === idx && (
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color}`} />
                    )}
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all duration-300 ${
                        activeSimulator === idx
                          ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:scale-105"
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold transition-colors ${
                          activeSimulator === idx
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-600 dark:text-slate-400"
                        }`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1 font-medium">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    <FaChevronRight className={`w-3 h-3 text-slate-400 transition-transform ${
                      activeSimulator === idx ? "translate-x-1 text-slate-900 dark:text-white" : "group-hover:translate-x-0.5"
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Display Board */}
            <div className="lg:col-span-3 h-[360px] bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative shadow-inner">
              
              {/* Grid Background Mock */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

              {/* Display Content based on activeSimulator */}
              {activeSimulator === 0 && (
                <div className="relative h-full flex flex-col justify-between z-10 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative">
                        <span className="absolute inset-0 w-full h-full rounded-full bg-emerald-500/50 animate-ping"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Live Booking Simulator</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      <FaStar className="w-2.5 h-2.5" /> 4.9 Superhost
                    </div>
                  </div>

                  <div className="my-auto flex flex-col sm:flex-row items-center gap-5 bg-white/50 dark:bg-slate-900/50 border border-slate-200/30 dark:border-slate-800/40 p-4 rounded-2xl backdrop-blur-md">
                    {/* Left side: homestay picture */}
                    <div className="w-28 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden relative group/img shrink-0 shadow-sm">
                      <img 
                        src={assets.himachal_mountain} 
                        alt="Himachal Cottage" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-white bg-black/35 backdrop-blur-xs px-1.5 py-0.5 rounded">₹3,200/n</span>
                    </div>
                    {/* Right side: Host avatar speech bubble & info */}
                    <div className="flex-grow space-y-2 text-left w-full">
                      <div className="flex items-center gap-2">
                        <img 
                          src={assets.female_avatar} 
                          alt="Kavita Sharma" 
                          className="w-7 h-7 rounded-full border border-emerald-500/40 object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1">
                            Kavita Sharma
                            <span className="text-[9px] text-emerald-500 bg-emerald-500/10 px-1 py-0.2 rounded font-black">HOST</span>
                          </h4>
                          <p className="text-[8px] text-slate-400 uppercase tracking-widest font-black">Manali, Himachal</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 italic font-medium">
                        "Namaste! Welcome to our family homestay. Cozy rooms, home-cooked Rajma Chawal, and clear trails await you."
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-white/70 dark:bg-slate-900/80 border border-slate-200/40 dark:border-slate-700/40 p-3 rounded-xl shadow-xs">
                    <div className="text-left">
                      <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">STATUS</span>
                      <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                        Host Verified & Active
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">AMENITIES</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">WiFi, Hot Water, Organic Meals</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSimulator === 1 && (
                <div className="relative h-full flex flex-col justify-between z-10 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative">
                        <span className="absolute inset-0 w-full h-full rounded-full bg-emerald-500/50 animate-ping"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Cultural Experience Deck</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Local Traditions</span>
                  </div>

                  <div className="my-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center w-full">
                    {/* Left side details */}
                    <div className="space-y-2.5">
                      {[
                        { title: "Traditional Pottery Session", duration: "2 Hours", host: "Rajesh Kumar (Potter)" },
                        { title: "Kathak Dance Workshop", duration: "3 Hours", host: "Sushma Sen (Guru)" },
                        { title: "Village Kitchen Spice Tasting", duration: "1.5 Hours", host: "Kavita's Kitchen" }
                      ].map((act, i) => (
                        <div 
                          key={i} 
                          className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:-translate-y-0.5 hover:border-emerald-500/30 transition-all duration-200 shadow-xs cursor-pointer group/item"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                              ✓
                            </span>
                            <div className="text-left">
                              <h5 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight group-hover/item:text-emerald-500 transition-colors">{act.title}</h5>
                              <p className="text-[9px] text-slate-400">{act.host}</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                            {act.duration}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Right side visual representation */}
                    <div className="h-[180px] w-full rounded-2xl overflow-hidden relative group/img shadow-md hidden md:block">
                      <img 
                        src={assets.rajasthan_desart} 
                        alt="Pottery / Traditional" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <span className="text-[8px] font-black uppercase text-emerald-400 tracking-wider">TODAY'S HIGHLIGHT</span>
                        <h4 className="text-[11px] font-bold text-white leading-tight">Live Folk Music & Bonfire</h4>
                        <p className="text-[9px] text-slate-300">Hosted in the Sam Dunes of Jaisalmer</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2">
                    ★ Authentic interactions hosted by actual local residents
                  </div>
                </div>
              )}

              {activeSimulator === 2 && (
                <div className="relative h-full flex flex-col justify-between z-10 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse relative">
                        <span className="absolute inset-0 w-full h-full rounded-full bg-amber-500/50 animate-ping"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">AI Route Optimiser</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Vite Engine v2.5</span>
                  </div>

                  <div className="my-auto flex items-center justify-between gap-4 relative py-6 w-full max-w-lg mx-auto">
                    {/* Connecting path line with flow animation */}
                    <div className="absolute top-1/2 left-8 right-8 h-[2px] border-t-2 border-dashed border-amber-400/50 dark:border-amber-700/50 -translate-y-1/2 z-0" />
                    
                    {[
                      { name: "Homestay", dist: "Start", time: "08:30 AM", icon: <FaHome /> },
                      { name: "Taj Mahal", dist: "2.5 km", time: "09:00 AM", icon: <FaStar /> },
                      { name: "Agra Fort", dist: "3.2 km", time: "01:30 PM", icon: <FaMapMarkedAlt /> }
                    ].map((step, i) => (
                      <div key={i} className="flex flex-col items-center relative z-10 bg-white/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800 p-3 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] min-w-[100px] text-center hover:scale-105 transition-transform duration-300">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white mb-2 shadow-sm shadow-amber-500/20">
                          {step.icon}
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{step.name}</span>
                        <span className="text-[9px] font-semibold text-amber-600 dark:text-amber-400 mt-1">{step.dist}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">{step.time}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between bg-white/70 dark:bg-slate-900/80 border border-slate-200/40 dark:border-slate-700/40 p-3 rounded-xl shadow-xs">
                    <div className="text-left">
                      <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">TOTAL DISTANCE</span>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">5.7 Kilometres</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">EST. TRAVEL TIME</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">14 Mins (Cab)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSimulator === 3 && (
                <div className="relative h-full flex flex-col justify-between z-10 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse relative">
                        <span className="absolute inset-0 w-full h-full rounded-full bg-violet-500/50 animate-ping"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Real-Time Conversation Stream</span>
                    </div>
                    <span className="text-[9px] font-bold text-violet-500 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">Translation Active</span>
                  </div>

                  <div className="my-auto space-y-3 max-w-sm mx-auto w-full">
                    {/* Message 1 (Host in Hindi) */}
                    <div className="flex gap-2.5 items-start justify-start text-left">
                      <img 
                        src={assets.female_avatar} 
                        alt="Host" 
                        className="w-7 h-7 rounded-full border border-emerald-500/30 object-cover shrink-0 mt-0.5"
                      />
                      <div className="bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-700/40 p-3 rounded-2xl rounded-tl-sm text-[11px] shadow-sm max-w-[80%] font-medium">
                        <span className="block text-[8px] font-black text-slate-400 uppercase mb-1">HOST (HINDI)</span>
                        आइए, आपका स्वागत है! अंदर आएं।
                      </div>
                    </div>

                    {/* Speech Waveform Simulation */}
                    <div className="flex items-center justify-center gap-1.5 py-1">
                      <div className="w-1.5 h-3 bg-violet-500/60 rounded-full animate-eq-bar-1" />
                      <div className="w-1.5 h-5 bg-violet-500 rounded-full animate-eq-bar-2" />
                      <div className="w-1.5 h-4 bg-fuchsia-500 rounded-full animate-eq-bar-3" />
                      <div className="w-1.5 h-2 bg-violet-400/40 rounded-full animate-eq-bar-1" />
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-2">Translating...</span>
                    </div>

                    {/* Message 2 (AI Translation in English) */}
                    <div className="flex gap-2.5 items-start justify-end text-right">
                      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-3 rounded-2xl rounded-tr-sm text-[11px] shadow-md max-w-[80%] font-medium text-left">
                        <span className="block text-[8px] font-black text-violet-200 uppercase mb-1">AI TRANSLATION (ENGLISH)</span>
                        Come in, you are welcome! Please come inside.
                      </div>
                      <img 
                        src={assets.male_avatar} 
                        alt="Guest" 
                        className="w-7 h-7 rounded-full border border-blue-500/30 object-cover shrink-0 mt-0.5"
                      />
                    </div>
                  </div>

                  <div className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2">
                    🌐 Supports 22+ regional Indian languages and global dialects
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Additional Features Grid */}
        <div className="py-16 bg-white/40 dark:bg-slate-900/30 backdrop-blur-xl border border-white/60 dark:border-slate-800/40 rounded-3xl shadow-sm p-8 mb-20">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 text-center tracking-tight">
            More Features to Enhance Your Journey
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="group border border-slate-200/40 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md p-6 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 text-lg mb-4 rounded-xl group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white dark:group-hover:bg-blue-400 dark:group-hover:text-slate-950 transition-all duration-300">
                    {feature.icon}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Container */}
        <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-950 border border-blue-100/70 dark:border-slate-800/80 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          {/* Subtle grid pattern inside CTA */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-45 dark:opacity-20" />

          {/* Sphere overlay */}
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-10 dark:opacity-20 blur-3xl pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 opacity-10 dark:opacity-20 blur-3xl pointer-events-none" />

          <div className="relative text-center max-w-3xl mx-auto z-10">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Join the Expedition
            </div>

            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
              Ready to Explore India Authentically?
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
              Join thousands of travelers who have discovered the real India through HomyGo. Start your journey today and create unforgettable memories with local families.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate('/homestays')}
                className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/20 text-white font-bold text-xs rounded-xl active:scale-97 transition-all cursor-pointer shadow-md"
              >
                Browse Homestays
              </button>

              <button 
                onClick={() => navigate('/tour-plan')}
                className="w-full sm:w-auto px-7 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 hover:shadow-md dark:hover:shadow-black/30 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 active:scale-97 transition-all cursor-pointer shadow-xs"
              >
                Try Itinerary Planner
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Features;