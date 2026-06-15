import { useEffect, useState } from "react";
import {
  FaBookmark,
  FaCopy,
  FaExchangeAlt,
  FaLanguage,
  FaMicrophone,
  FaSpinner,
  FaVolumeUp,
  FaCheck,
} from "react-icons/fa";

import { translateWithGemini } from "../services/geminiTranslate";

const TranslatorPage = () => {

  /* ---------------- STATE ---------------- */
  const [fromLanguage, setFromLanguage] = useState("English");
  const [toLanguage, setToLanguage] = useState("Hindi");

  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const [isTranslating, setIsTranslating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const [activeCategory, setActiveCategory] = useState("greetings");

  const [translationHistory, setTranslationHistory] = useState([]);
  const [savedPhrases, setSavedPhrases] = useState([]);

  const [recognition, setRecognition] = useState(null);
  const [copied, setCopied] = useState(false);


  /* ---------------- INDIAN LANGUAGES ---------------- */
  const languages = [
    "English",
    "Hindi",
    "Bengali",
    "Tamil",
    "Telugu",
    "Marathi",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Punjabi"
  ];

  /* ---------------- SPEECH ---------------- */
  const speechCodes = {
    English: "en-IN",
    Hindi: "hi-IN",
    Bengali: "bn-IN",
    Tamil: "ta-IN",
    Telugu: "te-IN",
    Marathi: "mr-IN",
    Gujarati: "gu-IN",
    Kannada: "kn-IN",
    Malayalam: "ml-IN",
    Punjabi: "pa-IN"
  };

  /* ---------------- TRANSLATE ---------------- */
  const handleTranslate = async (text = inputText) => {

    if (!text.trim()) return;

    setIsTranslating(true);

    try {

      const result = await translateWithGemini(
        text,
        fromLanguage,
        toLanguage
      );

      setTranslatedText(result);

      setTranslationHistory(prev => [

        {
          id: Date.now(),
          from: text,
          to: result
        },

        ...prev.slice(0, 6)

      ]);

    }

    catch (err) {

      console.error(err);
      setTranslatedText("Translation failed");

    }

    setIsTranslating(false);

  };

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();

    rec.lang = speechCodes[fromLanguage] || "en-IN";

    rec.onstart = () => setIsRecording(true);
    rec.onend = () => setIsRecording(false);

    rec.onresult = (e) => {

      const text = e.results[0][0].transcript;

      setInputText(text);

      handleTranslate(text);

    };

    setRecognition(rec);

  }, [fromLanguage]);

  const handleVoiceInput = () => {

    if (!recognition) {
      alert("Voice not supported");
      return;
    }

    isRecording
      ? recognition.stop()
      : recognition.start();

  };

  /* ---------------- COMMON PHRASES ---------------- */
  const commonPhrases = {

    greetings: [
      "Hello",
      "Thank you",
      "How are you?",
      "Good morning"
    ],

    travel: [
      "Where is the station?",
      "I need taxi",
      "Where is hotel?",
      "How much ticket?"
    ],

    food: [
      "Water please",
      "No spicy",
      "Vegetarian food",
      "Bill please"
    ]

  };

  const swapLanguages = () => {

    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);

    setInputText(translatedText);
    setTranslatedText(inputText);

  };

  const playAudio = (text) => {

    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);

    utter.lang = speechCodes[toLanguage];

    speechSynthesis.speak(utter);

  };

  const toggleSavePhrase = () => {
    if (!translatedText) return;
    const exists = savedPhrases.find(p => p.text === translatedText);
    if (exists) {
      setSavedPhrases(savedPhrases.filter(p => p.id !== exists.id));
    } else {
      setSavedPhrases(prev => [
        {
          id: Date.now(),
          text: translatedText,
          fromText: inputText,
          fromLang: fromLanguage,
          toLang: toLanguage
        },
        ...prev
      ]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPhraseSaved = savedPhrases.some(p => p.text === translatedText);

  /* ---------------- UI ---------------- */
  return (
    <section className="relative bg-gradient-to-tr from-blue-50 via-indigo-50 to-emerald-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/20 min-h-screen py-16 transition-colors duration-500 overflow-hidden">
      
      {/* Glow Spots */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-400/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">

        {/* Title Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/30 mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
            AI Translation Labs
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-none">
            AI Translator
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Translate instantly across 10 major Indian languages. Powered by Gemini, with support for live speech recognition and audio playbacks.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* MAIN TRANSLATOR */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6 transition-all duration-300">

              {/* LANGUAGE SELECT */}
              <div className="flex items-center gap-4 mb-6">
                
                {/* From Language select wrapper */}
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
                    <FaLanguage className="w-4 h-4" />
                  </span>
                  <select
                    value={fromLanguage}
                    onChange={e => setFromLanguage(e.target.value)}
                    className="w-full p-4 pl-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none cursor-pointer"
                  >
                    {languages.map(l => (
                      <option key={l} value={l} className="dark:bg-slate-900 dark:text-slate-100">{l}</option>
                    ))}
                  </select>
                </div>

                {/* Swap Button */}
                <button
                  onClick={swapLanguages}
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/15 active:scale-95 hover:rotate-180 duration-500 transition-all cursor-pointer shrink-0"
                  title="Swap Languages"
                >
                  <FaExchangeAlt className="w-4 h-4" />
                </button>

                {/* To Language select wrapper */}
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
                    <FaLanguage className="w-4 h-4" />
                  </span>
                  <select
                    value={toLanguage}
                    onChange={e => setToLanguage(e.target.value)}
                    className="w-full p-4 pl-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none cursor-pointer"
                  >
                    {languages.map(l => (
                      <option key={l} value={l} className="dark:bg-slate-900 dark:text-slate-100">{l}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* INPUT BOX */}
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value.slice(0, 5000))}
                  placeholder="Type or paste text here to translate..."
                  className="w-full h-44 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-base"
                />
                {inputText && (
                  <button
                    onClick={() => setInputText("")}
                    className="absolute right-4 top-4 w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    title="Clear Text"
                  >
                    &times;
                  </button>
                )}
                <div className="absolute right-4 bottom-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded">
                  {inputText.length} / 5000
                </div>
              </div>

              {/* CONTROLS ROW */}
              <div className="flex items-center gap-3 mt-4">
                
                {/* Voice Input */}
                <div className="relative">
                  {isRecording && (
                    <>
                      <span className="absolute -inset-1.5 rounded-xl bg-red-500/20 animate-ping"></span>
                      <span className="absolute -inset-3 rounded-xl bg-red-500/10 animate-pulse"></span>
                    </>
                  )}
                  <button
                    onClick={handleVoiceInput}
                    className={`h-14 w-14 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                      isRecording
                        ? "bg-red-500 border-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                    title={isRecording ? "Stop Recording" : "Voice Input"}
                  >
                    <FaMicrophone className={isRecording ? "animate-pulse" : "w-4 h-4"} />
                  </button>
                </div>

                {/* Translate Button */}
                <button
                  onClick={() => handleTranslate()}
                  disabled={!inputText.trim() || isTranslating}
                  className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isTranslating ? (
                    <>
                      <FaSpinner className="animate-spin w-4 h-4" />
                      <span>Translating...</span>
                    </>
                  ) : (
                    <>
                      <FaLanguage className="w-5 h-5" />
                      <span>Translate Text</span>
                    </>
                  )}
                </button>

              </div>

              {/* OUTPUT BOX */}
              <div className="relative mt-6">
                <textarea
                  readOnly
                  value={translatedText}
                  placeholder="Translation will appear here..."
                  className="w-full h-44 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/30 text-slate-850 dark:text-slate-100 placeholder-slate-400 outline-none resize-none text-base"
                />
                
                {translatedText && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    
                    {/* Speak Button */}
                    <button
                      onClick={() => playAudio(translatedText)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs transition-colors cursor-pointer"
                      title="Listen"
                    >
                      <FaVolumeUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={handleCopy}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors shadow-xs cursor-pointer ${
                        copied
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                      title="Copy"
                    >
                      {copied ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
                    </button>

                    {/* Save Button */}
                    <button
                      onClick={toggleSavePhrase}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors shadow-xs cursor-pointer ${
                        isPhraseSaved
                          ? "bg-amber-500 border-amber-500 text-white"
                          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                      title="Save to Travel Book"
                    >
                      <FaBookmark className="w-3.5 h-3.5" />
                    </button>

                  </div>
                )}
              </div>

            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">

            {/* COMMON PHRASES */}
            <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6 transition-all duration-300">
              
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-blue-500"></span>
                Common Phrases
              </h3>

              <div className="flex gap-1 mb-4 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl">
                {Object.keys(commonPhrases).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {commonPhrases[activeCategory].map((text, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setInputText(text);
                      handleTranslate(text);
                    }}
                    className="group border border-slate-100 dark:border-slate-800/40 p-3 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:border-blue-200/50 dark:hover:border-blue-900/30 cursor-pointer rounded-xl transition flex items-center justify-between"
                  >
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {text}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Translate <FaLanguage className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* TRAVEL BOOK (SAVED PHRASES) */}
            <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6 transition-all duration-300">
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-amber-500"></span>
                  Travel Book
                </h3>
                {savedPhrases.length > 0 && (
                  <button
                    onClick={() => setSavedPhrases([])}
                    className="text-[9px] font-black uppercase tracking-wider text-red-500 hover:text-red-600 transition cursor-pointer"
                    title="Clear Travel Book"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {savedPhrases.length === 0 ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <FaBookmark className="w-6 h-6 text-slate-300 dark:text-slate-700 mb-2" />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-[180px] leading-relaxed">
                    Your Travel Book is empty. Bookmark translations to access key terms quickly.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {savedPhrases.map(item => (
                    <div
                      key={item.id}
                      className="group border border-slate-100 dark:border-slate-800/40 p-3 bg-slate-50/50 dark:bg-slate-900/40 rounded-xl transition flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">
                          {item.fromLang || "EN"} → {item.toLang || "HI"}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => playAudio(item.text)}
                            className="w-6 h-6 rounded-md flex items-center justify-center bg-white dark:bg-slate-800 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs transition-colors cursor-pointer"
                            title="Play Audio"
                          >
                            <FaVolumeUp className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSavedPhrases(savedPhrases.filter(p => p.id !== item.id));
                            }}
                            className="w-6 h-6 rounded-md flex items-center justify-center bg-white dark:bg-slate-800 text-slate-555 hover:text-red-500 shadow-xs transition-colors cursor-pointer"
                            title="Delete"
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                      <div>
                        {item.fromText && (
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">"{item.fromText}"</p>
                        )}
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* TRANSLATION HISTORY (CHAT BUBBLES) */}
            {translationHistory.length > 0 && (
              <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6 transition-all duration-300">
                
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-4 rounded-full bg-emerald-500"></span>
                    History
                  </h3>
                  <button
                    onClick={() => setTranslationHistory([])}
                    className="text-[9px] font-black uppercase tracking-wider text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 transition cursor-pointer"
                  >
                    Clear
                  </button>
                </div>

                <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
                  {translationHistory.map(item => (
                    <div key={item.id} className="flex flex-col gap-2">
                      
                      {/* Input Text Bubble (Right-aligned) */}
                      <div className="flex justify-end">
                        <div className="max-w-[85%] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs shadow-xs font-medium">
                          {item.from}
                        </div>
                      </div>

                      {/* Output Text Bubble (Left-aligned) */}
                      <div className="flex justify-start">
                        <div className="max-w-[85%] bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100/50 dark:border-blue-900/20 text-blue-800 dark:text-blue-300 px-4 py-2.5 rounded-2xl rounded-tl-sm text-xs shadow-xs font-semibold">
                          {item.to}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );

};

export default TranslatorPage;