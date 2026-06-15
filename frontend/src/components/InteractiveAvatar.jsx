import { useEffect, useRef } from "react";

const InteractiveAvatar = ({ isFocusing, focusedField }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!svgRef.current || isFocusing) return;

      const rect = svgRef.current.getBoundingClientRect();
      const avatarCenterX = rect.left + rect.width / 2;
      const avatarCenterY = rect.top + rect.height * 0.22; // approx head position

      const dx = e.clientX - avatarCenterX;
      const dy = e.clientY - avatarCenterY;

      // Max displacements in pixels
      const maxMoveX = 8;
      const maxMoveY = 6;
      
      const moveX = (dx / (window.innerWidth / 2)) * maxMoveX;
      const moveY = (dy / (window.innerHeight / 2)) * maxMoveY;

      // Cap displacement
      const headDx = Math.max(-maxMoveX, Math.min(maxMoveX, moveX));
      const headDy = Math.max(-maxMoveY, Math.min(maxMoveY, moveY));
      const rot = headDx * 1.2;

      // Apply styling using CSS variables for optimal 60fps performance
      const svg = svgRef.current;
      svg.style.setProperty("--head-dx", `${headDx}px`);
      svg.style.setProperty("--head-dy", `${headDy}px`);
      svg.style.setProperty("--head-rot", `${rot}deg`);
      svg.style.setProperty("--eye-dx", `${headDx * 0.4}px`);
      svg.style.setProperty("--eye-dy", `${headDy * 0.4}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFocusing]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;

    if (isFocusing) {
      // Look to the right where the inputs are located
      let headDx = 9;
      let headDy = 0;
      let rot = 6;

      // Adjust eye tilt depending on which input field is focused (top-to-bottom layout)
      if (focusedField === "name") {
        headDy = -3;
      } else if (focusedField === "email") {
        headDy = -1;
      } else if (focusedField === "password") {
        headDy = 1;
      } else if (focusedField === "gender") {
        headDy = 3;
      } else if (focusedField === "dob") {
        headDy = 5;
      }

      svg.style.setProperty("--head-dx", `${headDx}px`);
      svg.style.setProperty("--head-dy", `${headDy}px`);
      svg.style.setProperty("--head-rot", `${rot}deg`);
      svg.style.setProperty("--eye-dx", `${headDx * 0.35}px`);
      svg.style.setProperty("--eye-dy", `${headDy * 0.35}px`);
    } else {
      // Reset values if cursor is not moving yet
      svg.style.setProperty("--head-dx", `0px`);
      svg.style.setProperty("--head-dy", `0px`);
      svg.style.setProperty("--head-rot", `0deg`);
      svg.style.setProperty("--eye-dx", `0px`);
      svg.style.setProperty("--eye-dy", `0px`);
    }
  }, [isFocusing, focusedField]);

  return (
    <div className="relative w-full max-w-[280px] h-[480px] mx-auto select-none">
      {/* Dynamic 3D Leaning Shadow underneath feet */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-4 bg-black/20 dark:bg-black/40 rounded-full blur-sm pointer-events-none" />

      <svg
        ref={svgRef}
        viewBox="0 0 250 500"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-transform duration-300 pointer-events-none"
        style={{
          "--head-dx": "0px",
          "--head-dy": "0px",
          "--head-rot": "0deg",
          "--eye-dx": "0px",
          "--eye-dy": "0px",
        }}
      >
        <defs>
          {/* Shirt vertical stripe pattern */}
          <pattern
            id="shirt-stripes"
            width="12"
            height="24"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(4)"
          >
            <rect width="6" height="24" fill="#2d4944" />
            <rect x="6" width="6" height="24" fill="#365751" />
          </pattern>
        </defs>

        {/* ==================== LEGS (Always crossed posture) ==================== */}
        <g id="avatar-legs">
          {/* Back leg (Right leg leaning back) */}
          <path
            d="M 92,285 L 105,455 L 123,455 L 118,285 Z"
            fill="#181819"
          />
          {/* Front leg (Left leg crossing in front) */}
          <path
            d="M 116,285 C 123,320 115,390 137,455 L 155,455 C 130,390 134,320 134,285 Z"
            fill="#202022"
          />

          {/* Shoes - Right */}
          <path
            d="M 98,455 C 92,455 90,468 107,468 L 121,468 C 124,462 122,455 119,455 Z"
            fill="#8b5235"
          />
          <path
            d="M 98,468 L 121,468 L 121,471 L 98,471 Z"
            fill="#f3f4f6"
          />

          {/* Shoes - Left */}
          <path
            d="M 131,455 C 125,455 123,468 140,468 L 154,468 C 157,462 155,455 152,455 Z"
            fill="#9b5e3d"
          />
          <path
            d="M 131,468 L 154,468 L 154,471 L 131,471 Z"
            fill="#ffffff"
          />
        </g>

        {/* ==================== NECK (Behind Torso, follows head slightly) ==================== */}
        <g
          id="avatar-neck"
          className="transition-transform duration-75 ease-out"
          style={{
            transform: "translate(calc(var(--head-dx) * 0.75), calc(var(--head-dy) * 0.75)) rotate(calc(var(--head-rot) * 0.5))",
            transformOrigin: "122px 130px",
          }}
        >
          <path
            d="M 112,190 L 112,128 C 112,128 122,124 132,128 L 132,190 Z"
            fill="#df9d72"
          />
          {/* Neck shadow */}
          <path
            d="M 112,142 C 120,146 128,146 132,142 L 132,190 L 112,190 Z"
            fill="#c98a60"
            opacity="0.35"
          />
        </g>

        {/* ==================== TORSO (Leaning) ==================== */}
        <g id="avatar-torso">
          {/* Belt */}
          <rect
            x="88"
            y="280"
            width="50"
            height="9"
            rx="2"
            fill="#121213"
          />
          <rect
            x="108"
            y="277"
            width="12"
            height="15"
            rx="2"
            fill="#dca535"
            stroke="#a6771d"
            strokeWidth="1"
          />

          {/* Shirt */}
          <path
            d="M 85,175 L 122,158 L 158,172 L 138,280 L 92,280 Z"
            fill="url(#shirt-stripes)"
          />

          {/* Buttons down the shirt */}
          <circle cx="118" cy="185" r="2" fill="#0f0f10" />
          <circle cx="116" cy="208" r="2" fill="#0f0f10" />
          <circle cx="113" cy="231" r="2" fill="#0f0f10" />
          <circle cx="111" cy="254" r="2" fill="#0f0f10" />

          {/* V-neck skin reveal */}
          <path
            d="M 112,158 L 122,158 L 120,178 Z"
            fill="#e29f73"
          />
          {/* Collar flaps */}
          <path
            d="M 102,158 L 114,158 L 112,168 Z"
            fill="#233b37"
          />
          <path
            d="M 132,158 L 120,158 L 124,168 Z"
            fill="#233b37"
          />
        </g>

        {/* ==================== ARMS (Pose depends on focus state) ==================== */}
        {/* State A: Arms Crossed (Idle) */}
        <g
          id="arms-crossed"
          className="transition-all duration-500 ease-in-out"
          style={{
            opacity: isFocusing ? 0 : 1,
            pointerEvents: "none",
            transform: isFocusing ? "scale(0.9) translateY(10px)" : "scale(1) translateY(0)",
            transformOrigin: "120px 180px",
          }}
        >
          {/* Right sleeve */}
          <path
            d="M 85,175 C 75,200 75,220 80,230 L 95,225 C 90,215 90,195 95,173 Z"
            fill="url(#shirt-stripes)"
          />
          {/* Left sleeve */}
          <path
            d="M 158,172 C 168,197 165,218 160,228 L 145,224 C 150,214 150,192 148,170 Z"
            fill="url(#shirt-stripes)"
          />

          {/* Crossed Arms Body */}
          <path
            d="M 78,230 C 78,245 152,245 158,228 C 150,230 115,232 90,228 Z"
            fill="#233b37"
            stroke="#1c2f2c"
            strokeWidth="1.5"
          />
          {/* Left Hand tucked */}
          <path
            d="M 82,226 C 82,220 92,220 92,226 Z"
            fill="#e29f73"
          />
          {/* Right Hand tucked under bicep */}
          <path
            d="M 152,222 C 155,222 158,226 155,230 Z"
            fill="#e29f73"
          />
        </g>

        {/* State B: Hand on Hip (Active/Focusing) */}
        <g
          id="arms-focused"
          className="transition-all duration-500 ease-in-out"
          style={{
            opacity: isFocusing ? 1 : 0,
            pointerEvents: "none",
            transform: isFocusing ? "scale(1) translateY(0)" : "scale(0.9) translateY(10px)",
            transformOrigin: "120px 180px",
          }}
        >
          {/* Right Arm (hanging / leaning on side) */}
          <path
            d="M 85,175 C 80,200 83,230 87,255 L 97,253 C 94,230 90,200 95,173 Z"
            fill="url(#shirt-stripes)"
          />
          {/* Right Hand */}
          <circle cx="89" cy="261" r="5" fill="#e29f73" />

          {/* Left Arm (Hand on Hip) */}
          {/* Upper Arm Sleeve */}
          <path
            d="M 158,172 C 172,192 188,208 190,215 L 178,223 C 170,212 160,195 148,170 Z"
            fill="url(#shirt-stripes)"
          />
          {/* Forearm skin */}
          <path
            d="M 190,215 L 152,243 L 148,235 L 178,210 Z"
            fill="#e29f73"
          />
          {/* Left hand resting on hip */}
          <path
            d="M 152,243 C 145,243 143,235 152,233 Z"
            fill="#df9d72"
          />
        </g>

        {/* ==================== HEAD (Tiltable / Rotatable) ==================== */}
        <g
          id="avatar-head"
          className="transition-transform duration-75 ease-out"
          style={{
            transform: "translate(var(--head-dx), var(--head-dy)) rotate(var(--head-rot))",
            transformOrigin: "122px 115px",
          }}
        >
          {/* Head Base */}
          <path
            d="M 92,110 C 92,72 152,72 152,110 C 152,140 92,140 92,110 Z"
            fill="#e29f73"
          />

          {/* Ears */}
          <circle cx="91" cy="112" r="6.5" fill="#e29f73" />
          <circle cx="153" cy="112" r="6.5" fill="#df9d72" />

          {/* Hair (Volume with side part) */}
          <path
            d="M 89,102 C 89,68 155,68 155,102 C 160,102 157,87 147,82 C 137,76 111,76 101,82 C 91,87 87,102 89,102 Z"
            fill="#1c120c"
          />
          {/* Sideburns */}
          <rect x="90" y="102" width="3.5" height="11" fill="#1c120c" />
          <rect x="150.5" y="102" width="3.5" height="11" fill="#1c120c" />

          {/* Nose */}
          <path
            d="M 120,110 Q 123,116 120,118"
            fill="none"
            stroke="#b3764c"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Dynamic Parallax Sunglasses & Mustache Group */}
          <g
            id="avatar-face-features"
            className="transition-transform duration-75 ease-out"
            style={{
              transform: "translate(var(--eye-dx), var(--eye-dy))",
            }}
          >
            {/* Sunglasses (Aviators) */}
            {/* Right Lens (screen left) */}
            <path
              d="M 98,105 C 98,99 116,99 116,105 C 116,116 98,116 98,105 Z"
              fill="#181819"
              stroke="#d1a13b"
              strokeWidth="1"
            />
            {/* Left Lens (screen right) */}
            <path
              d="M 124,105 C 124,99 142,99 142,105 C 142,116 124,116 124,105 Z"
              fill="#181819"
              stroke="#d1a13b"
              strokeWidth="1"
            />
            {/* Glasses Bridge */}
            <line
              x1="116"
              y1="104"
              x2="124"
              y2="104"
              stroke="#d1a13b"
              strokeWidth="1.5"
            />
            {/* Sunglasses top bar */}
            <path
              d="M 99,101 Q 120,97 141,101"
              fill="none"
              stroke="#d1a13b"
              strokeWidth="1"
            />

            {/* Mustache (Thick Chevron) */}
            <path
              d="M 108,124 C 113,119 121,119 121,123 C 121,119 129,119 134,124 C 137,126 132,128 121,125 C 110,128 105,126 108,124 Z"
              fill="#1c120c"
            />

            {/* Mouth */}
            <path
              d="M 115,130 Q 121,133 127,130"
              fill="none"
              stroke="#9e6640"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default InteractiveAvatar;
