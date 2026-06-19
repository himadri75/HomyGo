import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import YatriSevaBotLogo from "./YatriSevaBotLogo";
import YatriSevaChatPanel from "./YatriSevaChatPanel";

const initialMessage = {
  id: "welcome",
  role: "assistant",
  isWelcome: true,
  title: "Hello I'm YatriSeva",
  content: "Plan homestays, routes, budgets, and local tips for your India trip.",
};

const VIEWPORT_MARGIN = 12;

const morphSpring = {
  type: "spring",
  stiffness: 420,
  damping: 38,
  mass: 0.45,
  restDelta: 0.5,
  restSpeed: 0.5,
};

const instantTransition = { duration: 0 };
const backdropTransition = { duration: 0.12, ease: [0.4, 0, 0.2, 1] };

const MotionDiv = motion.div;
const MotionButton = motion.button;

const getViewportSize = () => ({
  width: typeof window === "undefined" ? 1280 : window.innerWidth,
  height: typeof window === "undefined" ? 800 : window.innerHeight,
});

const getContentViewport = (viewport) => ({
  width: Math.max(0, viewport.width - VIEWPORT_MARGIN * 2),
  height: Math.max(0, viewport.height - VIEWPORT_MARGIN * 2),
});

const clampPosition = (left, top, width, height, contentViewport) => ({
  left: Math.min(
    Math.max(0, left),
    Math.max(0, contentViewport.width - width),
  ),
  top: Math.min(
    Math.max(0, top),
    Math.max(0, contentViewport.height - height),
  ),
});

const FloatingChatButton = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [viewport, setViewport] = useState(getViewportSize);
  const [compactPosition, setCompactPosition] = useState(null);
  const [canMorph, setCanMorph] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const constraintsRef = useRef(null);
  const wasOpenRef = useRef(false);
  const frozenCompactPositionRef = useRef(null);

  const [messages, setMessages] = useState([initialMessage]);

  const contentViewport = useMemo(() => getContentViewport(viewport), [viewport]);

  const expandedMargin = useMemo(() => {
    const isSmall = viewport.width < 640;
    const isMedium = viewport.width >= 768;
    if (isSmall) return 20;
    if (isMedium) return 32;
    return 24;
  }, [viewport.width]);

  const compactDimensions = useMemo(() => {
    const compactWidth = Math.min(contentViewport.width - 32, 430);
    const compactHeight = Math.min(720, contentViewport.height - 112);

    return {
      width: Math.max(320, compactWidth),
      height: Math.max(420, compactHeight),
    };
  }, [contentViewport.height, contentViewport.width]);

  const maximizedDimensions = useMemo(
    () => ({
      width: Math.max(320, contentViewport.width - expandedMargin * 2),
      height: Math.max(420, contentViewport.height - expandedMargin * 2),
    }),
    [contentViewport.height, contentViewport.width, expandedMargin],
  );

  const getDefaultCompactPosition = useCallback(() => {
    const isSmall = viewport.width < 640;
    const compactRight = isSmall ? 16 : 24;
    const compactBottom = isSmall ? 96 : 96;
    const { width, height } = compactDimensions;

    return clampPosition(
      contentViewport.width - width - compactRight,
      contentViewport.height - height - compactBottom,
      width,
      height,
      contentViewport,
    );
  }, [compactDimensions, contentViewport, viewport.width]);

  const resolvedCompactPosition = useMemo(() => {
    const base = compactPosition ?? getDefaultCompactPosition();
    return clampPosition(
      base.left,
      base.top,
      compactDimensions.width,
      compactDimensions.height,
      contentViewport,
    );
  }, [compactDimensions, compactPosition, contentViewport, getDefaultCompactPosition]);

  const activeDimensions = isMaximized ? maximizedDimensions : compactDimensions;
  const activePosition = isMaximized
    ? { left: expandedMargin, top: expandedMargin }
    : frozenCompactPositionRef.current ?? resolvedCompactPosition;

  useEffect(() => {
    if (!isMaximized) {
      frozenCompactPositionRef.current = null;
    }
  }, [isMaximized]);

  useEffect(() => {
    const handleResize = () => setViewport(getViewportSize());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      wasOpenRef.current = false;
      setCanMorph(false);
      return;
    }

    if (!wasOpenRef.current) {
      wasOpenRef.current = true;
      setCanMorph(false);
      const frame = requestAnimationFrame(() => setCanMorph(true));
      return () => cancelAnimationFrame(frame);
    }

    return undefined;
  }, [isOpen]);

  const handleOpen = () => {
    if (!compactPosition) {
      setCompactPosition(getDefaultCompactPosition());
    }
    setShowBubble(false);
    setIsOpen(true);
  };

  const handleDragHandlePointerDown = (event) => {
    if (isMaximized || event.button !== 0) {
      return;
    }

    event.preventDefault();

    const startX = event.clientX;
    const startY = event.clientY;
    const origin = { ...resolvedCompactPosition };

    const onPointerMove = (moveEvent) => {
      const nextPosition = clampPosition(
        origin.left + moveEvent.clientX - startX,
        origin.top + moveEvent.clientY - startY,
        compactDimensions.width,
        compactDimensions.height,
        contentViewport,
      );

      setCompactPosition(nextPosition);
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handleToggleMaximize = () => {
    if (!isMaximized) {
      const frozen = { ...resolvedCompactPosition };
      frozenCompactPositionRef.current = frozen;
      setCompactPosition(frozen);
      setIsMaximized(true);
      return;
    }

    frozenCompactPositionRef.current = null;
    setIsMaximized(false);
  };

  const handleMinimizeFromMaximized = () => {
    frozenCompactPositionRef.current = null;
    setIsMaximized(false);
  };

  if (location.pathname === "/chatbot") return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            ref={constraintsRef}
            key="chat-anchor"
            style={{ padding: VIEWPORT_MARGIN }}
            className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
          >
            <MotionDiv
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: isMaximized ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={backdropTransition}
              onClick={handleMinimizeFromMaximized}
              className={`absolute inset-0 bg-slate-950/45 ${isMaximized ? "pointer-events-auto" : "pointer-events-none"
                }`}
            />

            <MotionDiv
              initial={false}
              animate={{
                left: activePosition.left,
                top: activePosition.top,
                width: activeDimensions.width,
                height: activeDimensions.height,
              }}
              exit={{ opacity: 0 }}
              transition={{
                left: instantTransition,
                top: instantTransition,
                width: canMorph ? morphSpring : instantTransition,
                height: canMorph ? morphSpring : instantTransition,
                opacity: { duration: 0.1, ease: "easeOut" },
              }}
              className="pointer-events-auto absolute will-change-[width,height,left,top]"
            >
              <div
                className={`h-full w-full overflow-hidden ${isMaximized
                    ? "rounded-[28px] shadow-[0_22px_58px_rgba(15,23,42,0.20)]"
                    : "rounded-[32px] shadow-[0_18px_44px_rgba(37,99,235,0.16)]"
                  }`}
              >
                <YatriSevaChatPanel
                  isMaximized={isMaximized}
                  onMaximize={handleToggleMaximize}
                  onMinimize={() => setIsOpen(false)}
                  onClose={() => {
                    setIsOpen(false);
                    setIsMaximized(false);
                    frozenCompactPositionRef.current = null;
                  }}
                  onCardNavigate={handleMinimizeFromMaximized}
                  onDragHandlePointerDown={handleDragHandlePointerDown}
                  messages={messages}
                  setMessages={setMessages}
                  className="h-full"
                />
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <div
            className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 md:bottom-6 md:right-6"
            onMouseEnter={() => setShowBubble(true)}
            onMouseLeave={() => setShowBubble(false)}
          >
            {/* Speech bubble — shown on hover */}
            <AnimatePresence>
              {showBubble && (
                <MotionDiv
                  key="speech-bubble"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.4 }}
                  className="relative cursor-pointer select-none"
                  style={{ minWidth: 176 }}
                  onClick={handleOpen}
                >
                  {/* Bubble body */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.97)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(203,213,225,0.55)",
                      borderRadius: "16px 16px 4px 16px",
                      boxShadow:
                        "0 1px 4px rgba(15,23,42,0.06)," +
                        "0 6px 20px rgba(37,99,235,0.13)," +
                        "0 18px 44px rgba(37,99,235,0.09)," +
                        "inset 0 1px 0 rgba(255,255,255,0.95)",
                    }}
                    className="px-4 py-3"
                  >
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 13.5,
                        fontWeight: 650,
                        color: "#0f172a",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      How can I help you?
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#94a3b8",
                        margin: "4px 0 0",
                        lineHeight: 1.3,
                      }}
                    >
                      Click to start chatting
                    </p>
                  </div>

                  {/* Tail outer (border colour) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -11,
                      right: 14,
                      width: 0,
                      height: 0,
                      borderLeft: "11px solid transparent",
                      borderTop: "12px solid rgba(203,213,225,0.55)",
                    }}
                  />
                  {/* Tail inner (fill colour) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -8,
                      right: 16,
                      width: 0,
                      height: 0,
                      borderLeft: "9px solid transparent",
                      borderTop: "10px solid rgba(255,255,255,0.97)",
                    }}
                  />
                </MotionDiv>
              )}
            </AnimatePresence>

            {/* Robot face button */}
            <MotionButton
              key="fab"
              type="button"
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.92 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleOpen}
              className="flex items-center justify-center rounded-full p-0"
              aria-label="Open YatriSeva chat"
              style={{ background: "none", border: "none", boxShadow: "none" }}
            >
              <YatriSevaBotLogo size="lg" />
            </MotionButton>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatButton;
