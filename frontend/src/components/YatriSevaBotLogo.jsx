import { useEffect, useState } from "react";

const BLINK_DURATION_MS = 200;
const blinkMotion = `botLogoEyelidClose ${BLINK_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`;

// Inject the keyframe into <head> once so it survives production CSS purging.
// Inline style `animation` props cannot reference @keyframes from external
// stylesheets when those keyframes are stripped by the build tool (Tailwind v4).
const KEYFRAME_ID = "bot-logo-eyelid-keyframe";
if (typeof document !== "undefined" && !document.getElementById(KEYFRAME_ID)) {
  const style = document.createElement("style");
  style.id = KEYFRAME_ID;
  style.textContent = `
    @keyframes botLogoEyelidClose {
      0%   { transform: scaleY(0); }
      50%  { transform: scaleY(1); }
      100% { transform: scaleY(0); }
    }
  `;
  document.head.appendChild(style);
}

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

const eyeClasses =
  "relative block rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.95),0_0_14px_rgba(59,130,246,0.8)]";

const BotEye = ({ side, animated, blinkTick, eyeClass }) => {
  const position = side === "left" ? "left-[18%]" : "right-[18%]";
  const animationDelay = side === "right" ? "14ms" : undefined;

  if (!animated) {
    return (
      <span className={`absolute ${position} top-[31%] flex items-center justify-center`}>
        <span className={`${eyeClasses} ${eyeClass}`} />
      </span>
    );
  }

  return (
    <span
      className={`absolute ${position} top-[31%] overflow-hidden rounded-full ${eyeClass}`}
    >
      <span className={`${eyeClasses} h-full w-full`} />
      <span
        key={`${side}-lid-${blinkTick}`}
        style={{ animation: blinkMotion, animationDelay }}
        className="pointer-events-none absolute inset-0 origin-top rounded-full bg-[#0b1220]"
      />
    </span>
  );
};

const YatriSevaBotLogo = ({ size = "md", className = "", animated = false }) => {
  const classes = sizeClasses[size] || sizeClasses.md;
  const [blinkTick, setBlinkTick] = useState(0);

  useEffect(() => {
    if (!animated) return undefined;

    let cancelled = false;
    let blinkTimeout;
    let doubleBlinkTimeout;

    // const scheduleNextBlink = () => {
    //   const pause = 2200 + Math.random() * 3800;
    //   blinkTimeout = setTimeout(() => {
    //     if (cancelled) return;

    //     setBlinkTick((tick) => tick + 1);

    //     if (Math.random() < 0.18) {
    //       doubleBlinkTimeout = setTimeout(() => {
    //         if (!cancelled) setBlinkTick((tick) => tick + 1);
    //       }, 280);
    //     }

    //     scheduleNextBlink();
    //   }, pause);
    // };
      const scheduleNextBlink = () => {
    blinkTimeout = setTimeout(() => {
      if (cancelled) return;

      setBlinkTick((tick) => tick + 1);

      // Optional double blink
      if (Math.random() < 0.18) {
        doubleBlinkTimeout = setTimeout(() => {
          if (!cancelled) setBlinkTick((tick) => tick + 1);
        }, 280);
      }

      scheduleNextBlink();
    }, 1000); // blink every 1 second
  };
    const initialDelay = 1000;
    blinkTimeout = setTimeout(() => {
      if (!cancelled) {
        setBlinkTick((tick) => tick + 1);
        scheduleNextBlink();
      }
    }, initialDelay);

    return () => {
      cancelled = true;
      clearTimeout(blinkTimeout);
      clearTimeout(doubleBlinkTimeout);
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
            blinkTick={blinkTick}
            eyeClass={classes.eye}
          />
          <BotEye
            side="right"
            animated={animated}
            blinkTick={blinkTick}
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
