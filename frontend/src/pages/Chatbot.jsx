import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, MessageCircle, MapPin, Star, ArrowRight, Home, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { sendChatMessage } from '../services/geminiChat';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';

const INITIAL_VISIBLE = 4;

// ─── Homestay Result Card ────────────────────────────────────────────────────
const HomestayResultCard = ({ stay }) => {
  const navigate = useNavigate();

  const imageUrl = stay.image
    ? stay.image.replace(/^"|"$/g, '')
    : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400';

  const features = (() => {
    try {
      if (Array.isArray(stay.features)) return stay.features;
      if (typeof stay.features === 'string') return JSON.parse(stay.features);
      return [];
    } catch { return []; }
  })();

  return (
    <div className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={imageUrl}
          alt={stay.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400';
          }}
        />
        <span className="absolute top-2 left-2 bg-blue-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize">
          {stay.category}
        </span>
        {stay.rating && (
          <span className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
            {stay.rating}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-1 mb-1">
          {stay.title}
        </h3>
        <p className="flex items-center gap-1 text-[11px] text-blue-500 dark:text-blue-400 mb-2">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="line-clamp-1">{stay.location}</span>
        </p>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {features.slice(0, 3).map((f, i) => (
              <span key={i} className="text-[9px] px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800 rounded-full">
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              ₹{Number(stay.price).toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-1">/night</span>
          </div>
          <button
            onClick={() => navigate(`/homestays/${stay.category}/${stay.id}`)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200 shrink-0"
          >
            Book <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Homestay Results Panel ──────────────────────────────────────────────────
const HomestayResultsPanel = ({ place }) => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setStays([]);
    setMessage('');
    setShowAll(false);

    axiosInstance
      .get(`/api/v1/homestays/search?q=${encodeURIComponent(place)}&limit=100`)
      .then((res) => {
        if (res.data.success) {
          setStays(res.data.homestays);
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage('Could not load homestays. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [place]);

  const visibleStays = showAll ? stays : stays.slice(0, INITIAL_VISIBLE);
  const hiddenCount = stays.length - INITIAL_VISIBLE;

  return (
    <div className="w-full mt-3 bg-blue-50 dark:bg-gray-800/50 border border-blue-100 dark:border-gray-700 rounded-2xl p-4">

      {/* Panel header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-bold text-gray-800 dark:text-white">
            Homestays in{' '}
            <span className="text-blue-600 dark:text-blue-400">{place}</span>
          </span>
          {!loading && stays.length > 0 && (
            <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
              {stays.length} found
            </span>
          )}
        </div>
        {!loading && stays.length > 0 && (
          <button
            onClick={() => navigate('/homestays')}
            className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1"
          >
            Browse all <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-52 animate-pulse" />
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && stays.length === 0 && (
        <div className="text-center py-6">
          <Home className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {message || `No homestays found in "${place}" yet.`}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Try a broader region like the state name.
          </p>
        </div>
      )}

      {/* Cards grid */}
      {!loading && stays.length > 0 && (
        <>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3">{message}</p>

          <div className="grid grid-cols-2 gap-3">
            {visibleStays.map((stay) => (
              <HomestayResultCard key={stay.id} stay={stay} />
            ))}
          </div>

          {/* Show more / Show less toggle */}
          {stays.length > INITIAL_VISIBLE && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  Show {hiddenCount} more homestay{hiddenCount !== 1 ? 's' : ''}
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

// ─── Message Bubble ──────────────────────────────────────────────────────────
const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  const renderText = (text) =>
    text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className={i > 0 ? 'mt-1' : ''}>
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j}>{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    });

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-sm'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm'
        }`}
      >
        <div className="whitespace-pre-wrap">{renderText(message.text)}</div>
      </div>

      {/* Homestay results panel shown below the bot message */}
      {!isUser && message.homestaySearch && (
        <div className="w-full">
          <HomestayResultsPanel place={message.homestaySearch.place} />
        </div>
      )}

      <span className="text-[10px] text-gray-400 dark:text-gray-600 px-1">
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </div>
  );
};

// ─── Chatbot Page ────────────────────────────────────────────────────────────
const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm HomyGo AI Assistant. Tell me which place in India you'd like to visit and I'll show you the best homestays to book — whether it's Himachal, Goa, Rajasthan, Kerala or anywhere else! 🏡",
      sender: 'bot',
      timestamp: new Date(),
      homestaySearch: null,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const suggestions = [
    { label: '🏔️ Himachal Pradesh', query: 'Show me homestays in Himachal Pradesh' },
    { label: '🌊 Kerala',            query: 'I want a homestay in Kerala backwaters' },
    { label: '🏜️ Rajasthan',         query: 'Find desert homestays in Rajasthan' },
    { label: '🏖️ Goa',               query: 'Beach homestays in Goa' },
    { label: '❄️ Uttarakhand',        query: 'Snow homestays in Uttarakhand' },
    { label: '🌿 Sikkim',             query: 'Homestays in Sikkim' },
  ];

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, sender: 'user', timestamp: new Date(), homestaySearch: null },
    ]);
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = '42px';
    setIsLoading(true);

    try {
      const { text: botText, homestaySearch } = await sendChatMessage(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: botText, sender: 'bot', timestamp: new Date(), homestaySearch },
      ]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: err.message || 'Sorry, I encountered an error. Please try again.',
          sender: 'bot',
          timestamp: new Date(),
          homestaySearch: null,
        },
      ]);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen flex justify-center items-start pt-6 px-4 pb-6">
      <div className="w-full max-w-3xl">
        <div
          className="w-full bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 shadow-xl rounded-2xl flex flex-col overflow-hidden"
          style={{ minHeight: '85vh' }}
        >
          {/* ── Header ── */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 shrink-0 rounded-t-2xl">
            <div className="p-2 bg-white/20 rounded-xl">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-sm font-bold text-white">HomyGo AI Assistant</h1>
              <p className="text-[11px] text-blue-100">Search homestays by any place in India</p>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] text-white/80 bg-white/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Online
            </span>
          </div>

          {/* ── Error banner ── */}
          {error && (
            <div className="mx-4 mt-3 flex items-start gap-2 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* ── Messages ── */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

            {/* Quick suggestion chips — only on fresh start */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pb-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s.query)}
                    disabled={isLoading}
                    className="text-[11px] px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors disabled:opacity-50"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
          </div>

          {/* ── Input ── */}
          <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-gray-900 shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. Show me homestays in Manali…"
                rows={1}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 leading-relaxed"
                style={{ minHeight: '42px', maxHeight: '120px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900/50 transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 dark:text-gray-600 mt-2">
              AI may make mistakes. Verify important info before booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
