import { useEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const BLINK_DOWN_MS = 80;   // lid closes
const BLINK_HOLD_MS = 40;   // lid stays closed
const BLINK_UP_MS   = 80;   // lid opens

// ─── Size tokens ──────────────────────────────────────────────────────────────
const sizeClasses = {
  sm: {
    shell: "h-10 w-10",
    head:  "h-7 w-8 rounded-[0.9rem]",
    face:  "h-5 w-6 rounded-[0.65rem]",
    eye:   "h-1.5 w-1.5",
    smile: "h-2 w-3.5",
  },
  md: {
    shell: "h-12 w-12",
    head:  "h-8 w-10 rounded-[1.05rem]",
    face:  "h-6 w-8 rounded-[0.8rem]",
    eye:   "h-2 w-2",
    smile: "h-2.5 w-4",
  },
  lg: {
    shell: "h-14 w-14",
    head:  "h-10 w-12 rounded-[1.25rem]",
    face:  "h-7 w-10 rounded-[0.95rem]",
    eye:   "h-2.5 w-2.5",
    smile: "h-3 w-5",
  },
};

const eyeBaseClasses =
  "relative block rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.95),0_0_14px_rgba(59,130,246,0.8)]";

// ─── BotEye ───────────────────────────────────────────────────────────────────
// Uses CSS `transition` (no @keyframes needed) so it works in every environment.
// `lidScale`: 0 = open, 1 = closed.
const BotEye = ({ side, animated, lidScale, eyeClass }) => {
  const position = side === "left" ? "left-[18%]" : "right-[18%]";

  if (!animated) {
    return (
      <span className={`absolute ${position} top-[31%] flex items-center justify-center`}>
        <span className={`${eyeBaseClasses} ${eyeClass}`} />
      </span>
    );
  }

  // Lid transition duration depends on whether closing or opening
  const transitionMs = lidScale > 0 ? BLINK_DOWN_MS : BLINK_UP_MS;

  return (
    <span className={`absolute ${position} top-[31%] overflow-hidden rounded-full ${eyeClass}`}>
      {/* glowing pupil */}
      <span className={`${eyeBaseClasses} h-full w-full`} />
      {/* eyelid — driven by lidScale prop, CSS transition handles the animation */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "9999px",
          backgroundColor: "#0b1220",
          transformOrigin: "top center",
          transform: `scaleY(${lidScale})`,
          transition: `transform ${transitionMs}ms ease-in-out`,
          pointerEvents: "none",
        }}
      />
    </span>
  );
};

// ─── Main Logo ────────────────────────────────────────────────────────────────
const YatriSevaBotLogo = ({ size = "md", className = "", animated = false }) => {
  const classes = sizeClasses[size] || sizeClasses.md;

  // lidScale: 0 = eye open, 1 = eye fully closed
  const [lidScale, setLidScale] = useState(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (!animated) return undefined;

    cancelledRef.current = false;

    let t1, t2, t3;

    /**
     * One full blink cycle:
     *   1. Set lid to 1 (closes — transition plays over BLINK_DOWN_MS)
     *   2. After DOWN + HOLD, set lid to 0 (opens — transition plays over BLINK_UP_MS)
     *   3. After everything settles, schedule the next blink
     */
    const doBlink = () => {
      if (cancelledRef.current) return;

      // Close the lid
      setLidScale(1);

      // Open the lid after close + hold
      t2 = setTimeout(() => {
        if (cancelledRef.current) return;
        setLidScale(0);
      }, BLINK_DOWN_MS + BLINK_HOLD_MS);

      // Schedule next blink after full cycle + random pause (2-6 s)
      const pause = 2200 + Math.random() * 3800;
      t3 = setTimeout(() => {
        if (cancelledRef.current) return;

        doBlink();

        // ~18% chance of a quick double blink
        if (Math.random() < 0.18) {
          const total = BLINK_DOWN_MS + BLINK_HOLD_MS + BLINK_UP_MS;
          setTimeout(() => {
            if (!cancelledRef.current) doBlink();
          }, total + 280);
        }
      }, BLINK_DOWN_MS + BLINK_HOLD_MS + BLINK_UP_MS + pause);
    };

    // First blink after 1 second so it feels alive immediately
    t1 = setTimeout(doBlink, 1000);

    return () => {
      cancelledRef.current = true;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setLidScale(0);
    };
  }, [animated]);

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

          <BotEye
            side="left"
            animated={animated}
            lidScale={lidScale}
            eyeClass={classes.eye}
          />
          <BotEye
            side="right"
            animated={animated}
            lidScale={lidScale}
            eyeClass={classes.eye}
          />

          <span
            className={`absolute left-1/2 top-[58%] -translate-x-1/2 rounded-b-full border-b-2 border-cyan-300 shadow-[0_4px_8px_rgba(34,211,238,0.7)] ${classes.smile}`}
          />
        </span>
      </span>
    </span>
  );
};

export default YatriSevaBotLogo;
