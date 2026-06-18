import { ArrowRight, Compass, MapPinned, Play, Route, ShieldCheck, Star, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/asset";
import { AppContext } from "../context/AppContext";

const heroVideoSrc =
  "/homygo_bg.mp4";

const tripSignals = [
  { icon: ShieldCheck, label: "Verified stays", value: "50K+" },
  { icon: MapPinned, label: "Local routes", value: "120+" },
  { icon: Compass, label: "Cultural picks", value: "24/7" },
];

const routeStops = [
  { place: "Jaipur", detail: "Heritage homes and evening bazaars" },
  { place: "Alleppey", detail: "Backwater village stays" },
  { place: "Manali", detail: "Mountain hosts and local trails" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const { darkmode } = useContext(AppContext);

  // Background Spotlight State
  const [heroCoords, setHeroCoords] = useState({ x: 0, y: 0 });
  const [heroOpacity, setHeroOpacity] = useState(0);

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHeroOpacity(1);
  };

  const handleHeroMouseLeave = () => {
    setHeroOpacity(0);
  };

  // 3D Parallax Tilt State
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  });
  const [glowStyle, setGlowStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt up to 10 degrees
    const tiltX = ((centerY - y) / centerY) * 10;
    const tiltY = ((x - centerX) / centerX) * 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
    });
    
    setGlowStyle({
      "--mouse-x": `${(x / rect.width) * 100}%`,
      "--mouse-y": `${(y / rect.height) * 100}%`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    });
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section 
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className={`relative min-h-screen overflow-hidden ${darkmode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-800'} pt-[90px] flex items-center transition-colors duration-300`}
    >
      {/* Background Video */}
      <div className="hero-video-frame" aria-hidden="true">
        <video
          ref={videoRef}
          src={heroVideoSrc}
          title="HomyGo India travel background video"
          autoPlay
          muted={isMuted}
          loop
          playsInline
        />
      </div>

      {/* Overlays & Ambient Lighting Orbs */}
      <div className={`absolute inset-0 ${darkmode ? 'bg-slate-950/65' : 'bg-white/35'} z-0 transition-colors duration-300`} aria-hidden="true" />
      <div className={`absolute inset-0 ${darkmode ? 'home-grid-dark opacity-35' : 'home-grid-light opacity-60'} z-0 transition-opacity duration-300`} aria-hidden="true" />
      
      {/* Interactive Hover Glow Dot Grid Spotlight */}
      {darkmode && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-[1]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.18) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            WebkitMaskImage: `radial-gradient(circle at ${heroCoords.x}px ${heroCoords.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 240px)`,
            maskImage: `radial-gradient(circle at ${heroCoords.x}px ${heroCoords.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 240px)`,
            opacity: heroOpacity,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* 3D Ambient Light Spots */}
      <div className={`absolute top-[15%] left-[5%] w-[400px] h-[400px] blur-[140px] ${darkmode ? 'glow-spot-cyan' : 'glow-spot-blue-light'} pointer-events-none z-0`} />
      <div className={`absolute bottom-[10%] right-[10%] w-[450px] h-[450px] blur-[160px] ${darkmode ? 'glow-spot-amber' : 'glow-spot-rose-light'} pointer-events-none z-0`} />

      {/* Main Grid Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          
          {/* Left Content Side */}
          <div className="max-w-3xl">
            {darkmode ? (
              // Original Dark Mode Left Content
              <>
                {/* Animated Glow Pill Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-4 py-2 text-xs font-semibold text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400 animate-spin-slow" />
                  <span className="tracking-wide uppercase">Trusted by 50,000+ travelers</span>
                </div>

                {/* Premium Typography Gradient Title */}
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-200">
                    Authentic India
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-100 via-teal-100 to-amber-200">
                    Homestays
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl font-light">
                  Discover India like never before with local hosts, hidden gems, AI-powered planning,
                  and real cultural connections.
                </p>

                {/* Action Buttons */}
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={() => navigate("/homestays")}
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-4 text-sm font-bold text-slate-950 shadow-[0_15px_40px_rgba(34,211,238,0.25)] transition-all duration-300 hover:-translate-y-1 hover:scale-102 hover:shadow-[0_20px_50px_rgba(34,211,238,0.35)] cursor-pointer"
                  >
                    Explore stays
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/tour-plan")}
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/30 cursor-pointer"
                  >
                    <Play className="mr-2 h-4 w-4 text-cyan-300 fill-cyan-300/20" />
                    Start planning
                  </button>
                </div>

                {/* Bottom Glass Signals */}
                <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                  {tripSignals.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/8 hover:-translate-y-0.5"
                      >
                        {/* Tiny neon border line on hover */}
                        <div className="absolute top-0 left-0 w-0 h-0.75 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-500" />
                        
                        <Icon className="mb-3 h-5 w-5 text-amber-200 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-3xl font-black text-white tracking-tight">{item.value}</p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-300 transition-colors">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              // Premium White Mode Glass Dashboard Left Content
              <div className="relative transition-all duration-300">
                {/* Animated Glow Pill Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/80 px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="tracking-wide uppercase text-[10px] sm:text-[11px]">Trusted by 50,000+ travelers</span>
                </div>

                {/* Premium Typography Title */}
                <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  <span className="block text-slate-900 tracking-tight">
                    Authentic India
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800">
                    Homestays
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-base sm:text-lg leading-8 text-slate-700 font-medium max-w-xl">
                  Discover India like never before with local hosts, hidden gems, AI-powered planning,
                  and real cultural connections.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={() => navigate("/homestays")}
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_12px_24px_-8px_rgba(37,99,235,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(37,99,235,0.6)] px-8 py-4 text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    Explore stays
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/tour-plan")}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/95 text-slate-800 hover:bg-white hover:border-slate-400 shadow-sm px-8 py-4 text-sm font-bold tracking-wide backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <Play className="mr-2 h-4 w-4 text-blue-600 fill-blue-600/10" />
                    Start planning
                  </button>
                </div>

                {/* Bottom Stats Grid of separate floating glass cards */}
                <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                  {tripSignals.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="relative group overflow-hidden rounded-2xl border border-white/85 bg-white/55 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-blue-500/20 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1"
                      >
                        {/* Tiny accent border line on hover */}
                        <div className="absolute top-0 left-0 w-0 h-0.75 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-500" />
                        
                        <Icon className="mb-3 h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-3xl font-black text-slate-900 tracking-tight">{item.value}</p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 group-hover:text-slate-700 transition-colors">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right 3D Interactive Card Side */}
          <div className="depth-scene flex justify-center lg:justify-end">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ ...tiltStyle, ...glowStyle, transformStyle: "preserve-3d" }}
              className={`home-depth-card relative overflow-hidden rounded-3xl border ${darkmode ? 'border-white/15 bg-slate-900/40 text-white shadow-[0_30px_70px_rgba(0,0,0,0.4)]' : 'border-white/60 bg-white/40 text-slate-800 shadow-[0_32px_64px_-12px_rgba(15,23,42,0.08)]'} p-6 backdrop-blur-xl w-full max-w-lg h-[620px] transition-all duration-200 ease-out flex flex-col justify-between`}
            >
              {/* Dynamic light reflection glow layer */}
              <div className="card-3d-glow" />

              {/* Float Layer 1: Header */}
              <div 
                style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
                className={`mb-6 flex h-20 items-center justify-between gap-4 rounded-2xl border ${darkmode ? 'border-white/10 bg-slate-950/40 hover:border-white/20' : 'border-white/40 bg-white/40 hover:border-white/60 shadow-sm'} p-4 transition-all duration-300`}
              >
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.22em] ${darkmode ? 'text-cyan-300' : 'text-blue-600'}`}>
                    HomyGo trip deck
                  </p>
                  <h2 className={`mt-1 text-xl font-black leading-tight ${darkmode ? 'text-white' : 'text-slate-900'}`}>Plan with local depth</h2>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${darkmode ? 'border-white/10 bg-white/5 text-cyan-300' : 'border-blue-200 bg-blue-50/70 text-blue-600 shadow-sm'} transition-transform duration-300 hover:rotate-12`}>
                  <Route className="h-6 w-6" />
                </div>
              </div>

              {/* Float Layer 2: Interactive Route Stops */}
              <div 
                style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                className="grid gap-4"
              >
                {routeStops.map((stop, index) => (
                  <div
                    key={stop.place}
                    className={`group relative grid min-h-24 grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border ${darkmode ? 'border-white/8 bg-slate-950/20 hover:border-cyan-500/20 hover:bg-slate-950/45' : 'border-white/80 bg-white/80 hover:border-blue-500/30 hover:bg-white shadow-[0_4px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(59,130,246,0.12)]'} p-4 transition-all duration-300`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${darkmode ? 'from-cyan-400 to-teal-400 text-slate-950' : 'from-blue-500 to-indigo-600 text-white'} text-sm font-black transition-transform duration-300 group-hover:scale-110`}>
                      0{index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className={`font-bold ${darkmode ? 'text-white group-hover:text-cyan-200' : 'text-slate-900 group-hover:text-blue-600'} transition-colors`}>{stop.place}</p>
                      <p className={`mt-1 text-sm leading-6 ${darkmode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-600'} transition-colors`}>{stop.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Float Layer 3: Elevating Images at Bottom */}
              <div 
                style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
                className="mt-6 grid grid-cols-3 gap-3"
              >
                {[assets.taj_mahal, assets.sea_beach, assets.island].map((image, index) => {
                  const imageLabels = ["Agra", "Kerala", "Goa"];
                  return (
                    <div 
                      key={image}
                      className={`group relative overflow-hidden rounded-xl border ${darkmode ? 'border-white/10 shadow-2xl hover:border-cyan-400/50 hover:shadow-[0_20px_35px_rgba(0,0,0,0.6)]' : 'border-white/90 shadow-sm hover:border-blue-500/40 hover:shadow-[0_16px_30px_rgba(37,99,235,0.15)]'} transition-all duration-300 hover:scale-110 hover:translate-y-[-10px] cursor-pointer`}
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <img
                        src={image}
                        alt={`HomyGo preview ${index + 1}`}
                        className="h-24 w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-slate-900/70 py-1 text-center text-[10px] font-bold text-white uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-md">
                        {imageLabels[index]}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Mute/Unmute Control in the bottom left */}
      <div className="absolute bottom-6 left-6 z-20">
        <button
          onClick={toggleMute}
          className={`group flex items-center gap-3 rounded-full border ${darkmode ? 'border-white/20 bg-black/55 text-white hover:bg-black/75 shadow-2xl' : 'border-slate-200/50 bg-white/80 text-slate-800 hover:bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.05)]'} px-5 py-3 text-xs font-bold backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer`}
          aria-label={isMuted ? "Play background music" : "Mute background music"}
        >
          {/* Animated Equalizer Visualizer */}
          <div className="flex items-end gap-0.5 h-3.5 w-3.5 mb-[1px]">
            <span className={`w-[2.5px] ${darkmode ? 'bg-cyan-300' : 'bg-blue-600'} rounded-sm transition-all duration-300 ${isMuted ? 'h-[3px]' : 'animate-eq-bar-1'}`} />
            <span className={`w-[2.5px] ${darkmode ? 'bg-cyan-300' : 'bg-blue-600'} rounded-sm transition-all duration-300 ${isMuted ? 'h-[3px]' : 'animate-eq-bar-2'}`} />
            <span className={`w-[2.5px] ${darkmode ? 'bg-cyan-300' : 'bg-blue-600'} rounded-sm transition-all duration-300 ${isMuted ? 'h-[3px]' : 'animate-eq-bar-3'}`} />
          </div>
          <span className="tracking-wider uppercase">{isMuted ? "Play Music" : "Mute Music"}</span>
        </button>
      </div>

    </section>
  );
};

export default HeroSection;
