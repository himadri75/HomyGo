const sizeClasses = {
  sm: {
    shell: "h-10 w-10",
    head: "h-7 w-8 rounded-[0.9rem]",
    face: "h-5 w-6 rounded-[0.65rem]",
    eye: "h-1.5 w-1.5",
    smile: "h-2 w-3.5",
  },
  md: {
    shell: "h-12 w-12",
    head: "h-8 w-10 rounded-[1.05rem]",
    face: "h-6 w-8 rounded-[0.8rem]",
    eye: "h-2 w-2",
    smile: "h-2.5 w-4",
  },
  lg: {
    shell: "h-14 w-14",
    head: "h-10 w-12 rounded-[1.25rem]",
    face: "h-7 w-10 rounded-[0.95rem]",
    eye: "h-2.5 w-2.5",
    smile: "h-3 w-5",
  },
};

const YatriSevaBotLogo = ({ size = "md", className = "", animated = true }) => {
  const classes = sizeClasses[size] || sizeClasses.md;
  const eyeAnimation = animated
    ? "animate-[botLogoBlink_4s_ease-in-out_infinite]"
    : "";

  return (
    <span
      className={`relative isolate flex shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_20%,#ffffff_0%,#eef8ff_48%,#d8ecff_100%)] shadow-[0_14px_34px_rgba(37,99,235,0.24),inset_0_1px_0_rgba(255,255,255,0.96)] ${classes.shell} ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full border border-white/90" />
      <span className="absolute left-[4%] top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-cyan-300/80 shadow-[0_0_12px_rgba(34,211,238,0.85)]" />
      <span className="absolute right-[4%] top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-cyan-300/80 shadow-[0_0_12px_rgba(34,211,238,0.85)]" />

      <span
        className={`relative flex items-center justify-center border border-blue-100 bg-[linear-gradient(145deg,#ffffff_0%,#f5fbff_42%,#dbeafe_100%)] shadow-[inset_0_3px_6px_rgba(255,255,255,0.92),inset_0_-5px_10px_rgba(37,99,235,0.12)] ${classes.head}`}
      >
        <span className="absolute left-[22%] top-0 h-px w-3 rotate-[-18deg] bg-blue-200/80" />
        <span className="absolute right-[20%] top-0 h-px w-3 rotate-[18deg] bg-blue-200/80" />
        <span className="absolute bottom-0 h-1 w-5 rounded-t-full bg-blue-200/55" />

        <span
          className={`relative overflow-hidden border border-slate-950/70 bg-[radial-gradient(circle_at_32%_18%,rgba(148,163,184,0.3),transparent_22%),linear-gradient(145deg,#111827_0%,#020617_62%,#172033_100%)] shadow-[inset_0_2px_5px_rgba(255,255,255,0.12),0_4px_8px_rgba(15,23,42,0.16)] ${classes.face}`}
        >
          <span className="absolute inset-x-1 top-0 h-1 rounded-b-full bg-white/25" />
          <span className="absolute left-[18%] top-[31%] flex items-center justify-center">
            <span
              className={`relative block rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.95),0_0_14px_rgba(59,130,246,0.8)] ${eyeAnimation} ${classes.eye}`}
            />
          </span>
          <span className="absolute right-[18%] top-[31%] flex items-center justify-center">
            <span
              className={`relative block rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.95),0_0_14px_rgba(59,130,246,0.8)] ${eyeAnimation} ${classes.eye}`}
            />
          </span>
          <span
            className={`absolute left-1/2 top-[58%] -translate-x-1/2 rounded-b-full border-b-2 border-cyan-300 shadow-[0_4px_8px_rgba(34,211,238,0.7)] ${classes.smile}`}
          />
        </span>
      </span>
    </span>
  );
};

export default YatriSevaBotLogo;
