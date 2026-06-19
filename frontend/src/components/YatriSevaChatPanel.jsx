import {
    CalendarDays,
    ChevronDown,
    ExternalLink,
    Home,
    Loader2,
    Luggage,
    Map,
    MapPin,
    Maximize2,
    Mic,
    MicOff,
    Minimize2,
    Mountain,
    RotateCcw,
    Send,
    Star,
    WalletCards,
    X,
} from "lucide-react";
import { createElement, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import axiosInstance from "../config/axiosInstance";
import { appendHomestaySearchContext, clearChatHistory, sendChatMessage } from "../services/geminiChat";
import YatriSevaBotLogo from "./YatriSevaBotLogo";

const initialMessage = {
  id: "welcome",
  role: "assistant",
  isWelcome: true,
  title: "Hello I'm YatriSeva",
  content: "Plan homestays, routes, budgets, and local tips for your India trip.",
};

const typingPrompts = [
  "Search homestays at Manali",
  "Suggest a 5-day Kerala itinerary",
  "Best time to visit Sikkim",
  "Packing list for Ladakh",
];

const suggestions = [
  {
    icon: Home,
    label: "Find Homestays",
    prompt: "Find peaceful homestays in Manali for a family trip.",
  },
  {
    icon: Map,
    label: "Plan Itinerary",
    prompt: "Plan a 5-day Kerala itinerary with local homestays.",
  },
  {
    icon: WalletCards,
    label: "Estimate Budget",
    prompt: "Estimate a budget for a Goa vacation for two people.",
  },
  {
    icon: Luggage,
    label: "Packing List",
    prompt: "Create a packing guide for a Ladakh road trip.",
  },
  {
    icon: Mountain,
    label: "Explore Places",
    prompt: "Suggest underrated hill destinations in India.",
  },
  {
    icon: CalendarDays,
    label: "Trip Timeline",
    prompt: "Build a day-by-day Rajasthan trip timeline.",
  },
];

const FRIENDLY_CHAT_ERROR =
  "I'm having trouble responding right now — please try again in a moment.";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-cyan-300 dark:focus-visible:ring-offset-[#071327]";

// ─── Markdown + Structured Message Rendering ─────────────────────────────────
const emojiHeadingRegex =
  /^(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]\uFE0F?\s*)+/u;

const stripMarkdown = (text = "") =>
  text
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const normalizeMarkdown = (text = "") =>
  text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      const withoutEmoji = trimmed.replace(emojiHeadingRegex, "").trim();
      const boldHeading = withoutEmoji.match(/^\*\*([^*]+)\*\*:?\s*$/);

      if (trimmed !== withoutEmoji && withoutEmoji) {
        return `## ${withoutEmoji.replace(/^\*\*|\*\*$/g, "").replace(/:$/, "")}`;
      }

      if (boldHeading) {
        return `## ${boldHeading[1].replace(/:$/, "")}`;
      }

      return line;
    })
    .join("\n")
    .trim();

const getSectionIcon = (heading = "") => {
  const lowerHeading = heading.toLowerCase();

  if (/(homestay|stay|booking|where to stay|accommodation)/.test(lowerHeading)) {
    return Home;
  }
  if (/(budget|cost|price|spend|money)/.test(lowerHeading)) {
    return WalletCards;
  }
  if (/(pack|packing|carry|luggage)/.test(lowerHeading)) {
    return Luggage;
  }
  if (/(time|season|festival|event|timeline|day|month)/.test(lowerHeading)) {
    return CalendarDays;
  }
  if (/(route|getting|around|itinerary|transport|airport|train|road)/.test(lowerHeading)) {
    return Map;
  }

  return Mountain;
};

const parseMarkdownSections = (markdown = "") => {
  const lines = markdown.split("\n");
  const sections = [];
  const intro = [];
  let currentSection = null;

  lines.forEach((line) => {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);

    if (headingMatch) {
      if (currentSection) {
        sections.push({
          ...currentSection,
          body: currentSection.body.join("\n").trim(),
        });
      }

      currentSection = {
        title: stripMarkdown(headingMatch[2]).replace(/:$/, ""),
        body: [],
      };
      return;
    }

    if (currentSection) {
      currentSection.body.push(line);
    } else {
      intro.push(line);
    }
  });

  if (currentSection) {
    sections.push({
      ...currentSection,
      body: currentSection.body.join("\n").trim(),
    });
  }

  return {
    intro: intro.join("\n").trim(),
    sections,
  };
};

const isStructuredMarkdown = (markdown = "", sections = []) => {
  const listItems = markdown.split("\n").filter((line) => /^\s*[-*+]\s+/.test(line)).length;
  return sections.length >= 2 || (sections.length === 1 && listItems >= 3);
};

const markdownComponents = {
  p: ({ children }) => (
    <p className="my-2 leading-[1.6] first:mt-0 last:mb-0">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-950 dark:text-white">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1.5 pl-5 leading-[1.6] marker:text-cyan-600 dark:marker:text-cyan-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1.5 pl-5 leading-[1.6] marker:font-semibold marker:text-cyan-700 dark:marker:text-cyan-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  h1: ({ children }) => (
    <h3 className="mb-2 mt-3 text-base font-bold text-slate-950 first:mt-0 dark:text-white">{children}</h3>
  ),
  h2: ({ children }) => (
    <h3 className="mb-2 mt-3 text-sm font-bold text-slate-950 first:mt-0 dark:text-white">{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className="mb-2 mt-3 text-sm font-bold text-slate-900 first:mt-0 dark:text-white">{children}</h4>
  ),
};

const MarkdownBody = ({ markdown, className = "" }) => (
  <div className={`text-sm leading-[1.6] ${className}`}>
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {markdown}
    </ReactMarkdown>
  </div>
);

const getAssistantMessageContent = (content) => {
  const markdown = normalizeMarkdown(content);
  const { intro, sections } = parseMarkdownSections(markdown);

  if (!isStructuredMarkdown(markdown, sections)) {
    return {
      isStructured: false,
      node: <MarkdownBody markdown={markdown} />,
    };
  }

  return {
    isStructured: true,
    node: (
      <div className="space-y-4 text-slate-700 dark:text-[#E7F3FF]">
        {intro && (
          <MarkdownBody
            markdown={intro}
            className="rounded-2xl border border-cyan-300/25 bg-white/58 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-cyan-300/15 dark:bg-cyan-300/[0.06]"
          />
        )}

        <div className="space-y-3">
          {sections.map((section, index) => {
            const Icon = getSectionIcon(section.title);

            return (
              <section
                key={`${section.title}-${index}`}
                className="rounded-2xl border border-cyan-300/22 bg-white/48 px-4 py-3.5 shadow-sm backdrop-blur-xl dark:border-cyan-300/15 dark:bg-white/[0.035]"
              >
                <div className="mb-2.5 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-300/12 dark:text-cyan-200">
                    {createElement(Icon, { className: "h-4.5 w-4.5" })}
                  </span>
                  <h3 className="text-sm font-bold leading-5 text-slate-950 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                {section.body ? (
                  <MarkdownBody
                    markdown={section.body}
                    className="text-slate-700 dark:text-[#DDEAF7]"
                  />
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    ),
  };
};

const TypingIndicator = () => (
  <div className="flex items-start justify-start gap-3" aria-live="polite" aria-label="YatriSeva is thinking">
    <YatriSevaBotLogo
      size="sm"
      animated={false}
      className="mt-1 shrink-0 shadow-[0_10px_24px_rgba(37,99,235,0.18)]"
    />
    <div className="rounded-[1.35rem] rounded-bl-md border border-cyan-300/35 bg-cyan-50/80 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-cyan-300/20 dark:bg-cyan-300/[0.08]">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-2 w-2 rounded-full bg-cyan-600 motion-safe:animate-bounce dark:bg-cyan-300"
            style={{ animationDelay: `${dot * 120}ms` }}
          />
        ))}
      </div>
      <span className="sr-only">Planning with local context...</span>
    </div>
  </div>
);

// ─── Inline Homestay Result Cards ────────────────────────────────────────────
const getStayPricing = (stay) => {
  const basePrice = Number(stay.base_price ?? stay.price ?? 0);
  const discountPrice = Number(stay.discount_price ?? 0);
  const hasDiscount = discountPrice > 0 && discountPrice < basePrice;

  return {
    basePrice,
    displayPrice: hasDiscount ? discountPrice : basePrice,
    hasDiscount,
    savings: hasDiscount ? basePrice - discountPrice : 0,
  };
};

const getStayTags = (stay) => {
  const rawFeatures = Array.isArray(stay.features)
    ? stay.features
    : typeof stay.features === "string"
      ? stay.features.replace(/[[\]"{}]/g, "").split(/[,|]/)
      : [];
  const featureText = rawFeatures.join(" ").toLowerCase();
  const tags = [];

  if (getStayPricing(stay).hasDiscount) tags.push("Discounted");

  if (/family|kid|children|large|group/.test(featureText)) tags.push("Family-friendly");
  if (/peace|quiet|calm|serene|nature|garden/.test(featureText)) tags.push("Peaceful");
  if (/view|mountain|river|lake|beach|valley/.test(`${featureText} ${stay.category || ""}`.toLowerCase())) {
    tags.push("Scenic view");
  }
  if (/wifi|work|desk/.test(featureText)) tags.push("Work-ready");
  if (/local|culture|food|meal|host/.test(featureText)) tags.push("Local experience");

  if (tags.length < 2 && stay.category) {
    tags.push(stay.category.charAt(0).toUpperCase() + stay.category.slice(1));
  }

  if (tags.length < 2) {
    tags.push("Verified stay");
  }

  return [...new Set(tags)].slice(0, 2);
};

const HomestayResultCards = ({ cards, isMaximized, onCardNavigate }) => {
  const navigate = useNavigate();
  const { place, results } = cards;

  const handleCardClick = (path) => {
    onCardNavigate?.();
    navigate(path);
  };

  return (
    <div className="mt-4">
      <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-200">
        <MapPin className="h-3.5 w-3.5" />
        {results.length} homestay{results.length !== 1 ? "s" : ""} found in {place}
      </p>
      <div className={`grid gap-3.5 ${isMaximized ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
        {results.map((stay) => {
          const tags = getStayTags(stay);
          const pricing = getStayPricing(stay);
          const imageUrl = stay.image?.replace(/^"|"$/g, "");

          return (
            <button
              type="button"
              key={stay.id}
              onClick={() => handleCardClick(`/homestays/${stay.category}/${stay.id}`)}
              className={`group cursor-pointer rounded-2xl border border-blue-100 bg-white p-2 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-[0_16px_34px_rgba(37,99,235,0.16)] dark:border-white/[0.1] dark:bg-white/[0.06] dark:hover:border-cyan-300/25 ${focusRing}`}
            >
              <div className="relative h-32 overflow-hidden rounded-xl bg-blue-50 dark:bg-blue-900/20">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={stay.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Mountain className="h-8 w-8 text-blue-300" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold text-slate-900 shadow-sm backdrop-blur">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {stay.rating || "4.8"}
                </span>
                {pricing.hasDiscount ? (
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-green-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm">
                    Save ₹{pricing.savings}
                  </span>
                ) : null}
                <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold capitalize text-white backdrop-blur-sm">
                  {stay.category || "Homestay"}
                </span>
              </div>

              <div className="px-1 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="line-clamp-1 text-sm font-bold leading-5 text-slate-900 dark:text-white">
                      {stay.title}
                    </h4>
                    <p className="mt-1 line-clamp-1 text-xs font-medium text-slate-500 dark:text-slate-300">
                      {stay.location}
                    </p>
                  </div>
                  <span className="shrink-0 text-right text-sm font-bold text-blue-700 dark:text-blue-200">
                    {pricing.hasDiscount ? (
                      <>
                        <span className="block text-[10px] font-medium text-slate-400 line-through dark:text-slate-500">
                          ₹{pricing.basePrice}
                        </span>
                        ₹{pricing.displayPrice}
                      </>
                    ) : (
                      <>₹{pricing.displayPrice}</>
                    )}
                    <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400">/night</span>
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[10px] font-semibold text-cyan-800 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => handleCardClick(`/homestays?search=${encodeURIComponent(place)}`)}
        className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200 dark:hover:bg-blue-500/20 ${focusRing}`}
      >
        <ExternalLink className="h-3.5 w-3.5" />
        View all homestays in {place}
      </button>
    </div>
  );
};

// ─── No Homestays Found Card ──────────────────────────────────────────────────
const NoHomestaysCard = ({ place, onCardNavigate }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    onCardNavigate?.();
    navigate("/homestays");
  };
  return (
    <div
      className="mt-3 overflow-hidden rounded-2xl border border-amber-200/70 bg-amber-50/60 dark:border-amber-500/20 dark:bg-amber-900/10"
    >
      <div className="flex items-start gap-3 p-4">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">
          <Home className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            No homestays found in {place}
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-700/80 dark:text-amber-400/70">
            We currently don't have any registered homestays in <strong>{place}</strong>. Our network is growing — new stays are added regularly. In the meantime, explore our other beautiful destinations!
          </p>
          <button
            type="button"
            onClick={handleClick}
            className={`mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-200 dark:hover:bg-amber-500/30 ${focusRing}`}
          >
            <ExternalLink className="h-3 w-3" />
            Explore all available homestays
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Chat Panel ──────────────────────────────────────────────────────────
const YatriSevaChatPanel = ({
  isMaximized = false,
  onMaximize,
  onMinimize,
  onClose,
  onCardNavigate,
  onDragHandlePointerDown,
  className = "",
  // Optional lifted state — when provided by FloatingChatButton, messages survive minimize/close
  messages: externalMessages,
  setMessages: externalSetMessages,
}) => {
  const [input, setInput] = useState("");
  const [internalMessages, setInternalMessages] = useState([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingPlaceholder, setTypingPlaceholder] = useState("");
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Check Web Speech API support once on mount
  const SpeechRecognition =
    typeof window !== "undefined"
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;
  const speechSupported = Boolean(SpeechRecognition);

  // Use external state when provided (floating widget), otherwise use internal state (chatbot page)
  const messages = externalMessages ?? internalMessages;
  const setMessages = externalSetMessages ?? setInternalMessages;

  const hasConversationStarted = messages.some((message) => !message.isWelcome);
  const useExpandedLayout = isMaximized;

  useEffect(() => {
    if (hasConversationStarted) {
      return undefined;
    }

    let promptIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const typeNext = () => {
      const currentPrompt = typingPrompts[promptIndex];
      setTypingPlaceholder(currentPrompt.slice(0, charIndex));

      if (!isDeleting && charIndex < currentPrompt.length) {
        charIndex += 1;
        timeoutId = window.setTimeout(typeNext, 70);
        return;
      }

      if (!isDeleting && charIndex === currentPrompt.length) {
        isDeleting = true;
        timeoutId = window.setTimeout(typeNext, 1300);
        return;
      }

      if (isDeleting && charIndex > 0) {
        charIndex -= 1;
        timeoutId = window.setTimeout(typeNext, 35);
        return;
      }

      isDeleting = false;
      promptIndex = (promptIndex + 1) % typingPrompts.length;
      timeoutId = window.setTimeout(typeNext, 260);
    };

    typeNext();

    return () => window.clearTimeout(timeoutId);
  }, [hasConversationStarted]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  };

  useEffect(() => {
    const firstScroll = window.setTimeout(scrollToBottom, 60);
    const settleScroll = window.setTimeout(scrollToBottom, 260);

    return () => {
      window.clearTimeout(firstScroll);
      window.clearTimeout(settleScroll);
    };
  }, [messages, isLoading]);

  const resetChat = () => {
    clearChatHistory();
    setMessages([initialMessage]);
    setInput("");
    // Stop any active voice session on reset
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
      setIsListening(false);
    }
    inputRef.current?.focus();
  };

  const startVoiceInput = () => {
    if (!speechSupported) return;

    // If already listening, stop
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      inputRef.current?.focus();
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const applySuggestion = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const sendMessage = async (message = input) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      inputRef.current?.focus();
      return;
    }

    setInput("");
    setIsLoading(true);
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: crypto.randomUUID(), role: "user", content: trimmedMessage },
    ]);
    scrollToBottom();

    try {
      const { text, homestaySearch } = await sendChatMessage(trimmedMessage);

      // If AI detected a homestay search intent, fetch real cards from the backend
      let homestayCards = null;
      let noHomestays = null;
      if (homestaySearch?.place) {
        try {
          const res = await axiosInstance.get(
            `/api/v1/homestays/search?q=${encodeURIComponent(homestaySearch.place)}&limit=6`
          );
          if (res.data?.success && res.data.homestays?.length > 0) {
            homestayCards = {
              place: homestaySearch.place,
              results: res.data.homestays,
            };
            appendHomestaySearchContext(homestaySearch.place, res.data.homestays);
          } else {
            // No homestays in the database for this place
            noHomestays = { place: homestaySearch.place };
          }
        } catch (searchErr) {
          console.warn("Homestay search failed:", searchErr);
        }
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: text || "I'm ready to help plan that journey.",
          homestayCards,
          noHomestays,
        },
      ]);
    } catch (error) {
      console.error("YatriSeva chat request failed:", error);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: FRIENDLY_CHAT_ERROR,
        },
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <section
      className={`relative flex transform-gpu overflow-hidden border border-blue-100 bg-[#F8FBFF] text-slate-950 shadow-[0_28px_90px_rgba(37,99,235,0.18),0_18px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#071327] dark:text-white ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] dark:opacity-[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16px_16px,#2563eb_1.2px,transparent_1.2px)] bg-[length:58px_58px]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_48%_0%,rgba(59,130,246,0.18),transparent_58%)]" />

      <div className="relative z-10 flex min-h-0 w-full flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-blue-950/[0.06] bg-white/56 px-5 py-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03] sm:px-6">
          <div
            className={`flex min-w-0 flex-1 items-center gap-3 ${
              onDragHandlePointerDown && !isMaximized
                ? "cursor-grab touch-none select-none active:cursor-grabbing"
                : ""
            }`}
            onPointerDown={isMaximized ? undefined : onDragHandlePointerDown}
            title={onDragHandlePointerDown && !isMaximized ? "Drag to move chat" : undefined}
          >
            <YatriSevaBotLogo size="md" animated />
            <div className="min-w-0">
              <p className="text-[15px] font-bold leading-5 text-slate-950 dark:text-white">
                YatriSeva
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-blue-100/70">
                {onDragHandlePointerDown && !isMaximized ? "Drag header to move" : "HomyGo AI travel concierge"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={resetChat}
              aria-label="Start new trip"
              title="Start new trip"
              className={`rounded-full p-2 text-slate-600 transition hover:bg-slate-950/[0.06] hover:text-slate-950 dark:text-[#C7D0E0] dark:hover:bg-white/[0.08] dark:hover:text-white ${focusRing}`}
            >
              <RotateCcw className="h-4.5 w-4.5" />
            </button>
            {onMaximize && (
              <button
                type="button"
                onClick={onMaximize}
                aria-label={isMaximized ? "Minimize window" : "Maximize window"}
                title={isMaximized ? "Minimize window" : "Maximize window"}
                className={`rounded-full p-2 text-slate-600 transition hover:bg-slate-950/[0.06] hover:text-slate-950 dark:text-[#C7D0E0] dark:hover:bg-white/[0.08] dark:hover:text-white ${focusRing}`}
              >
                {isMaximized ? (
                  <Minimize2 className="h-4.5 w-4.5" />
                ) : (
                  <Maximize2 className="h-4.5 w-4.5" />
                )}
              </button>
            )}
            {onMinimize && (
              <button
                type="button"
                onClick={onMinimize}
                aria-label="Collapse chat"
                title="Collapse chat"
                className={`rounded-full p-2 text-slate-600 transition hover:bg-slate-950/[0.06] hover:text-slate-950 dark:text-[#C7D0E0] dark:hover:bg-white/[0.08] dark:hover:text-white ${focusRing}`}
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                title="Close chat"
                className={`rounded-full p-2 text-slate-600 transition hover:bg-slate-950/[0.06] hover:text-slate-950 dark:text-[#C7D0E0] dark:hover:bg-white/[0.08] dark:hover:text-white ${focusRing}`}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className={`mx-auto w-full space-y-5 ${useExpandedLayout ? "max-w-5xl" : ""}`}>
            {messages.map((message) => {
              const assistantContent =
                !message.isWelcome && message.role === "assistant"
                  ? getAssistantMessageContent(message.content)
                  : null;

              return (
                <div
                  key={message.id}
                  className={
                    message.isWelcome
                      ? "space-y-5"
                      : message.role === "user"
                        ? "flex justify-end"
                        : "flex items-start justify-start gap-3"
                  }
                >
                  {message.isWelcome ? (
                    <>
                      <div className="flex justify-center">
                        <div
                          className={`w-full overflow-hidden rounded-[1.45rem] border border-blue-950/[0.08] bg-white/94 text-slate-700 shadow-[0_16px_38px_rgba(15,23,42,0.1),0_2px_8px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.07] dark:text-blue-50 ${useExpandedLayout ? "max-w-5xl" : "max-w-2xl"
                            }`}
                        >
                          <div
                            className={`flex items-center bg-blue-50 dark:bg-blue-400/10 ${useExpandedLayout
                              ? "gap-5 px-6 py-5 sm:px-8 sm:py-6"
                              : "gap-4 px-5 py-4 sm:px-6"
                              }`}
                          >
                            <YatriSevaBotLogo size={useExpandedLayout ? "lg" : "md"} animated={false} />
                            <div>
                              <h2
                                className={`font-bold leading-tight text-slate-800 dark:text-white ${useExpandedLayout ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                                  }`}
                              >
                                {message.title}
                              </h2>
                              <p
                                className={`mt-1 font-medium text-slate-600 dark:text-blue-100/78 ${useExpandedLayout ? "text-base leading-7" : "text-sm leading-6"
                                  }`}
                              >
                                {message.content}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`grid gap-2 p-4 sm:p-5 ${useExpandedLayout
                              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
                              : "grid-cols-2 sm:grid-cols-3"
                              }`}
                          >
                            {suggestions.map(({ icon: Icon, label, prompt }) => (
                              <button
                                type="button"
                                key={label}
                                onClick={() => applySuggestion(prompt)}
                                className={`group rounded-2xl border border-blue-950/[0.07] bg-white p-3 text-left shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50/70 hover:shadow-[0_12px_28px_rgba(37,99,235,0.1)] active:translate-y-0 active:border-cyan-400 active:bg-cyan-100/70 active:shadow-inner dark:border-white/[0.08] dark:bg-white/[0.05] dark:hover:border-cyan-300/35 dark:hover:bg-cyan-300/[0.08] dark:active:bg-cyan-300/[0.14] ${focusRing}`}
                              >
                                {createElement(Icon, {
                                  className:
                                    "h-4.5 w-4.5 text-blue-700 transition group-hover:text-cyan-700 dark:text-cyan-300 dark:group-hover:text-cyan-200",
                                })}
                                <p className="mt-2 text-sm font-bold leading-5 text-slate-800 dark:text-white">
                                  {label}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      {hasConversationStarted && (
                        <div className="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent dark:via-cyan-200/20" />
                      )}
                    </>
                  ) : null}

                  {!message.isWelcome && message.role === "assistant" ? (
                    <YatriSevaBotLogo
                      size="sm"
                      animated={false}
                      className="mt-1 shrink-0 shadow-[0_10px_24px_rgba(37,99,235,0.18)]"
                    />
                  ) : null}

                  {!message.isWelcome ? (
                    <div className={message.role === "user" ? "w-full max-w-[82%]" : "min-w-0 flex-1 max-w-[92%]"}>
                      {message.role === "user" ? (
                        <div className="w-fit ml-auto rounded-[1.35rem] rounded-br-md bg-[#3F7FD6] px-4 py-3 text-sm leading-6 text-white shadow-[0_12px_28px_rgba(63,127,214,0.18)] dark:bg-[#6EA8FF] dark:text-[#071327]">
                          {message.content}
                        </div>
                      ) : assistantContent?.isStructured ? (
                        <div className="py-0.5">{assistantContent.node}</div>
                      ) : (
                        <div className="w-fit rounded-[1.35rem] rounded-bl-md border border-cyan-300/35 bg-cyan-50/70 px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm backdrop-blur-xl dark:border-cyan-300/20 dark:bg-cyan-300/[0.08] dark:text-[#E7F3FF]">
                          {assistantContent?.node}
                        </div>
                      )}

                      {/* Homestay Cards inline */}
                      {message.homestayCards && (
                        <HomestayResultCards
                          cards={message.homestayCards}
                          isMaximized={useExpandedLayout}
                          onCardNavigate={onCardNavigate}
                        />
                      )}

                      {/* No homestays found card */}
                      {message.noHomestays && (
                        <NoHomestaysCard
                          place={message.noHomestays.place}
                          onCardNavigate={onCardNavigate}
                        />
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

        </div>

        <div className="border-t border-blue-950/[0.06] bg-white/64 p-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#071327]/82">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className={`mx-auto w-full rounded-[1.6rem] border border-blue-950/[0.08] bg-white p-2 shadow-[0_18px_45px_rgba(37,99,235,0.14)] transition focus-within:border-blue-400/70 dark:border-white/[0.1] dark:bg-[#0E1B34] ${useExpandedLayout ? "max-w-5xl" : ""}`}
          >
            <div className="flex items-center gap-1.5">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                disabled={isLoading}
                placeholder={
                  isListening
                    ? "Listening..."
                    : hasConversationStarted
                      ? "Type your message..."
                      : typingPlaceholder || ""
                }
                className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 disabled:opacity-60 dark:text-white dark:placeholder:text-[#A7B0C0]"
              />
              {/* Voice button — only shown when SpeechRecognition is supported */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={startVoiceInput}
                  aria-label={isListening ? "Stop listening" : "Voice input"}
                  title={isListening ? "Stop listening" : "Speak your message"}
                  className={`relative flex h-10 w-10 shrink-0 items-center justify-center text-xs font-medium transition ${isListening
                    ? "text-red-600 hover:opacity-80 dark:text-red-400"
                    : "text-black hover:opacity-70 dark:text-white dark:hover:opacity-80"
                    } ${focusRing}`}
                >
                  {isListening && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-20" />
                  )}
                  {isListening ? (
                    <MicOff className="relative h-4.5 w-4.5" />
                  ) : (
                    <Mic className="h-4.5 w-4.5" />
                  )}
                </button>
              )}
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || isLoading}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3F7FD6] text-white transition hover:scale-105 hover:bg-[#2F6CC0] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#6EA8FF] dark:text-[#071327] ${focusRing}`}
              >
                {isLoading ? (
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                ) : (
                  <Send className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-[11px] text-slate-400 dark:text-[#A7B0C0]">
            YatriSeva can make mistakes. Verify important travel and booking details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default YatriSevaChatPanel;
