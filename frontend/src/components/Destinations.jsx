import { ArrowRight, Compass, MapPin } from "lucide-react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/asset";

const destinations = [
  {
    name: "Rajasthan",
    desc: "Royal palaces, desert safaris, artisan homes, and heritage stays.",
    img: assets.rajasthan_desart,
    redirectURL: "/homestays/deserts",
    terrain: "Desert",
    accent: "#facc15",
  },
  {
    name: "Kerala",
    desc: "Backwaters, beaches, village kitchens, and peaceful slow travel.",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop",
    redirectURL: "/homestays/beaches",
    terrain: "Coast",
    accent: "#34d399",
  },
  {
    name: "Himachal Pradesh",
    desc: "Mountain homes, orchard trails, local hosts, and scenic retreats.",
    img: assets.himachal_mountain,
    redirectURL: "/homestays/mountains",
    terrain: "Hills",
    accent: "#22d3ee",
  },
];

const Destinations = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (event, index) => {
    const card = cardRefs.current[index];

    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--y", `${(y / rect.height) * 100}%`);

    const deepLayers = card.querySelectorAll(".parallax-layer-deep");
    deepLayers.forEach((layer) => {
      const moveX = ((x - centerX) / centerX) * 15;
      const moveY = ((y - centerY) / centerY) * 15;
      layer.style.transform = `translateZ(40px) translateX(${moveX}px) translateY(${moveY}px)`;
    });

    const parallaxLayers = card.querySelectorAll(".parallax-layer");
    parallaxLayers.forEach((layer) => {
      const moveX = ((x - centerX) / centerX) * 8;
      const moveY = ((y - centerY) / centerY) * 8;
      layer.style.transform = `translateZ(20px) translateX(${moveX}px) translateY(${moveY}px)`;
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];

    if (!card) return;

    card.style.transition = "transform 0.5s ease-out";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    const deepLayers = card.querySelectorAll(".parallax-layer-deep");
    deepLayers.forEach((layer) => {
      layer.style.transition = "transform 0.5s ease-out";
      layer.style.transform = "translateZ(40px) translateX(0px) translateY(0px)";
    });

    const parallaxLayers = card.querySelectorAll(".parallax-layer");
    parallaxLayers.forEach((layer) => {
      layer.style.transition = "transform 0.5s ease-out";
      layer.style.transform = "translateZ(20px) translateX(0px) translateY(0px)";
    });

    window.setTimeout(() => {
      card.style.transition = "transform 0.1s ease-out";
      deepLayers.forEach((layer) => {
        layer.style.transition = "none";
      });
      parallaxLayers.forEach((layer) => {
        layer.style.transition = "none";
      });
    }, 500);
  };

  return (
    <section className="destination-shell relative overflow-hidden py-24 text-slate-950 transition-colors duration-300 dark:text-white">
      <div className="destination-orb destination-orb-left" aria-hidden="true" />
      <div className="destination-orb destination-orb-right" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="section-tag mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-emerald-700 shadow-sm backdrop-blur-md transition-colors duration-300 dark:border-emerald-400/20 dark:bg-white/10 dark:text-emerald-200">
              <Compass className="h-4 w-4" />
              Destination layers
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl dark:text-white">
              Popular places,
              <br />
              redesigned like a travel
              <br />
              control room.
            </h2>
          </div>

          <div className="destination-summary rounded-r8 border border-white/70 bg-white/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/75">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300">
              Regional signal
            </p>

            <p className="mt-3 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Each region gives travelers a different texture of India, from desert craft routes to
              backwater homes and Himalayan retreats.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-r8 border border-slate-200 bg-slate-50 px-3 py-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-lg font-black text-slate-950 dark:text-white">03</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  routes
                </p>
              </div>

              <div className="rounded-r8 border border-slate-200 bg-slate-50 px-3 py-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-lg font-black text-slate-950 dark:text-white">120+</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  stays
                </p>
              </div>

              <div className="rounded-r8 border border-slate-200 bg-slate-50 px-3 py-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-lg font-black text-slate-950 dark:text-white">24/7</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  support
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="tilt-card-container grid grid-cols-1 gap-7 md:grid-cols-3">
          {destinations.map((place, index) => (
            <article
              key={place.name}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              onMouseMove={(event) => handleMouseMove(event, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="tilt-card group overflow-hidden rounded-[10px] border border-white/70 bg-white/85 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-md transition-transform duration-100 dark:border-white/10 dark:bg-slate-900/85"
            >
              <div className="tilt-shine" aria-hidden="true" />

              <div className="relative h-72 overflow-hidden">
                <img
                  src={place.img}
                  alt={place.name}
                  className="parallax-layer-deep h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-slate-950/15 to-transparent dark:from-black/75 dark:via-black/20" />
                <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/10 mix-blend-overlay opacity-70" />

                <div className="parallax-layer absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  {place.terrain}
                </div>

                <div
                  className="parallax-layer absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-r8 border border-white/20 shadow-lg backdrop-blur-md"
                  style={{ backgroundColor: place.accent }}
                >
                  <MapPin className="h-5 w-5 text-slate-950" />
                </div>
              </div>

              <div className="relative bg-white p-6 transition-colors duration-300 dark:bg-slate-900">
                <p className="parallax-layer text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                  Stop 0{index + 1}
                </p>

                <h3 className="parallax-layer mt-3 text-2xl font-black text-slate-950 transition-colors duration-300 dark:text-white">
                  {place.name}
                </h3>

                <p className="parallax-layer mt-3 text-sm leading-7 text-slate-600 transition-colors duration-300 dark:text-slate-300">
                  {place.desc}
                </p>

                <div className="parallax-layer mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                  local experience
                  <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                </div>

                <NavLink
                  to={place.redirectURL}
                  className="parallax-layer mt-6 inline-flex items-center rounded-md bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-300"
                >
                  Explore region
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
