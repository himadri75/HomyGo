import { ArrowRight, Quote, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "USA",
    text: "HomyGo helped me find an amazing homestay in Kerala. The experience felt truly authentic and personal.",
    initials: "SJ",
  },
  {
    name: "Marco Rodriguez",
    location: "Spain",
    text: "The language support feature made my Rajasthan trip smooth. I could connect with locals easily.",
    initials: "MR",
  },
  {
    name: "Priya Patel",
    location: "India",
    text: "As a host, HomyGo brings travelers who genuinely respect and enjoy our culture.",
    initials: "PP",
  },
];

const Testimonials = () => {
  const navigate = useNavigate();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 text-slate-950 transition-colors duration-300 dark:bg-black dark:text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(52,211,153,0.10),transparent_28%),linear-gradient(180deg,rgba(245,249,248,0.98),rgba(232,242,240,0.98))] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_28%),linear-gradient(180deg,rgba(5,9,20,0.99),rgba(7,16,15,0.99))]" aria-hidden="true" />
      <div className="absolute inset-0 home-grid-light opacity-35 dark:home-grid-dark dark:opacity-35" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-cyan-200 bg-white/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 shadow-sm backdrop-blur-md transition-colors duration-300 dark:border-white/15 dark:bg-white/10 dark:text-cyan-100">
            <Quote className="h-4 w-4" />
            Traveler stories
          </div>

          <h2 className="text-4xl font-black leading-tight tracking-normal text-slate-950 dark:text-white sm:text-5xl">
            Stories from travelers who found India through local doors.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Travelers use HomyGo to find stays that feel personal, practical, and rooted in the
            places they came to explore.
          </p>
        </div>

        <div className="depth-scene grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className={`home-depth-card rounded-r8 border border-white/70 bg-white/85 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.10)] backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-white/10 dark:shadow-2xl ${
                index === 1 ? "home-tilt-forward" : ""
              }`}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-300 text-sm font-black text-slate-950">
                  {item.initials}
                </div>

                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="mr-1 h-4 w-4 fill-amber-300 text-amber-300" />
                  ))}
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-700 dark:text-slate-100">"{item.text}"</p>

              <div className="mt-6 border-t border-slate-200 pt-5 dark:border-white/10">
                <p className="font-black text-slate-950 dark:text-white">{item.name}</p>
                <p className="mt-1 text-sm font-semibold text-cyan-700 dark:text-cyan-200">{item.location}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="depth-scene mt-14">
          <div className="home-depth-card rounded-r8 border border-cyan-300/20 bg-linear-to-r from-cyan-300 to-emerald-300 p-8 text-slate-950 shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:p-10 dark:shadow-2xl">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
                  Ready for your route
                </p>
                <h3 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                  Build a smarter India trip with stays, planning, and local context in one place.
                </h3>
              </div>

              <button
                onClick={() => navigate("/tour-plan")}
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-slate-950 px-7 py-3 text-sm font-bold text-white shadow-2xl shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-slate-950"
              >
                Plan my trip
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
