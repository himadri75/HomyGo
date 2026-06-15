import { Bot, Home, Languages, MapPinned, Sparkles } from "lucide-react";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const features = [
  {
    icon: Home,
    title: "Host-led stays",
    desc: "Book homes with verified families, regional meals, and hospitality that feels personal.",
    stat: "50K+ travelers",
    accent: "from-cyan-300 to-emerald-300",
  },
  {
    icon: MapPinned,
    title: "Hidden local routes",
    desc: "Find markets, trails, ceremonies, and experiences that rarely show up in guidebooks.",
    stat: "120+ routes",
    accent: "from-amber-300 to-orange-300",
  },
  {
    icon: Bot,
    title: "AI trip planning",
    desc: "Shape a day-by-day plan around your budget, travel pace, and favorite type of stay.",
    stat: "Smart itineraries",
    accent: "from-sky-300 to-cyan-300",
  },
  {
    icon: Languages,
    title: "Language support",
    desc: "Use translation assistance to make host conversations smoother in new regions.",
    stat: "Travel with ease",
    accent: "from-rose-300 to-amber-200",
  },
];

const Features = () => {
  const { darkmode } = useContext(AppContext);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <section
      id="features"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#f7fbff] py-24 text-slate-950 transition-colors duration-300 dark:bg-[#050914] dark:text-white"
    >
      {/* Static Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Interactive Hover Glow Dot Grid Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(circle, ${darkmode ? '#38bdf8' : '#2563eb'} 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
          WebkitMaskImage: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 130px)`,
          maskImage: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 130px)`,
          opacity: opacity,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-cyan-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 shadow-sm dark:border-cyan-400/20 dark:bg-white/10 dark:text-cyan-200">
              <Sparkles className="h-4 w-4" />
              Built for real travel
            </div>

            <h2 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl">
              A travel home page with more depth than a booking grid.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              HomyGo combines stays, culture, planning, and language help into one practical travel
              layer for exploring India with more confidence.
            </p>
          </div>

          <div className="depth-scene">
            <div className="home-depth-card rounded-lg border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-white/10">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Verified hosts", "Trust checks before the stay"],
                  ["No booking fees", "Cleaner prices for travelers"],
                  ["Instant support", "Help when plans shift"],
                ].map(([title, detail]) => (
                  <div key={title} className="border-l-2 border-cyan-300 pl-4">
                    <p className="font-black text-slate-950 dark:text-white">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="depth-scene mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="home-depth-card rounded-lg border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-900/80"
              >
                <div
                  className={`mb-6 h-1.5 w-24 rounded-md bg-linear-to-r ${feature.accent}`}
                />

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-white shadow-lg shadow-slate-950/20 dark:bg-cyan-300 dark:text-slate-950">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-black text-slate-950 dark:text-white">{feature.title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {feature.desc}
                </p>

                <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-cyan-100">
                  {feature.stat}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
