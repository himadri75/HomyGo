import { useEffect, useState } from "react";
import {
  FaBookmark,
  FaCopy,
  FaExchangeAlt,
  FaLanguage,
  FaMicrophone,
  FaSpinner,
  FaVolumeUp,
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

  const savePhrase = () => {

    if (!translatedText) return;

    setSavedPhrases(prev => [

      {
        id: Date.now(),
        text: translatedText
      },

      ...prev

    ]);

  };

  /* ---------------- UI ---------------- */
  return (
    <section className="bg-blue-50 dark:bg-gray-950 min-h-screen py-16 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-blue-900 dark:text-white mb-10">
          AI Translator
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* MAIN */}
          <div className="lg:col-span-2">

            <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/30 p-6 transition-colors duration-300">

              {/* LANGUAGE SELECT */}
              <div className="flex gap-4 mb-6">

                <select
                  value={fromLanguage}
                  onChange={e => setFromLanguage(e.target.value)}
                  className="flex-1 p-3 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-900 dark:text-gray-200 rounded"
                >
                  {languages.map(l => (
                    <option key={l}>{l}</option>
                  ))}
                </select>

                <button
                  onClick={swapLanguages}
                  className="px-4 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 transition rounded"
                >
                  <FaExchangeAlt />
                </button>

                <select
                  value={toLanguage}
                  onChange={e => setToLanguage(e.target.value)}
                  className="flex-1 p-3 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-900 dark:text-gray-200 rounded"
                >
                  {languages.map(l => (
                    <option key={l}>{l}</option>
                  ))}
                </select>

              </div>

              {/* INPUT */}
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Enter text..."
                className="w-full h-40 p-4 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-900 dark:text-gray-200 mb-4 rounded"
              />

              <div className="flex gap-3 mb-6">

                <button
                  onClick={handleVoiceInput}
                  className="px-4 py-2 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition rounded text-blue-700 dark:text-gray-300"
                >
                  <FaMicrophone />
                </button>

                <button
                  onClick={() => handleTranslate()}
                  className="flex-1 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 transition flex items-center justify-center gap-2 rounded"
                >
                  {isTranslating ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Translating
                    </>
                  ) : (
                    <>
                      <FaLanguage />
                      Translate
                    </>
                  )}
                </button>

              </div>

              {/* OUTPUT */}
              <textarea
                readOnly
                value={translatedText}
                className="w-full h-40 p-4 border border-blue-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-800 text-blue-900 dark:text-gray-200 rounded"
              />

              {translatedText && (
                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => playAudio(translatedText)}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded"
                  >
                    <FaVolumeUp />
                  </button>

                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(translatedText)
                    }
                    className="px-4 py-2 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-700 dark:text-gray-300 rounded"
                  >
                    <FaCopy />
                  </button>

                  <button
                    onClick={savePhrase}
                    className="px-4 py-2 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-700 dark:text-gray-300 rounded"
                  >
                    <FaBookmark />
                  </button>

                </div>
              )}

            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">

            {/* PHRASES */}
            <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/30 p-6">

              <h3 className="text-lg font-semibold text-blue-900 dark:text-white mb-4">
                Common Phrases
              </h3>

              <div className="flex gap-2 mb-4">

                {Object.keys(commonPhrases).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 border rounded transition
                    ${activeCategory === cat
                        ? "bg-blue-600 dark:bg-blue-500 text-white"
                        : "border-blue-200 dark:border-gray-700 text-blue-800 dark:text-gray-300"
                      }`}
                  >
                    {cat}
                  </button>
                ))}

              </div>

              <div className="space-y-2">

                {commonPhrases[activeCategory].map((text, i) => (
                  <div
                    key={i}
                    onClick={() => setInputText(text)}
                    className="border border-blue-200 dark:border-gray-700 p-3 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer rounded"
                  >
                    <p className="text-blue-900 dark:text-gray-200">
                      {text}
                    </p>
                  </div>
                ))}

              </div>

            </div>

            {/* HISTORY */}
            {translationHistory.length > 0 && (
              <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/30 p-6">

                <h3 className="text-lg font-semibold text-blue-900 dark:text-white mb-4">
                  History
                </h3>

                <div className="space-y-2">

                  {translationHistory.map(item => (
                    <div
                      key={item.id}
                      className="border border-blue-200 dark:border-gray-700 p-3 text-sm rounded"
                    >
                      <p className="text-blue-900 dark:text-gray-200">
                        {item.from}
                      </p>
                      <p className="text-blue-600 dark:text-gray-400">
                        {item.to}
                      </p>
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