import { GoogleGenAI } from "@google/genai";

const getGeminiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new GoogleGenAI({
    apiKey,
  });
};

const langMap = {
  English: "en",
  Hindi: "hi",
  Bengali: "bn",
  Tamil: "ta",
  Telugu: "te",
  Marathi: "mr",
  Gujarati: "gu",
  Kannada: "kn",
  Malayalam: "ml",
  Punjabi: "pa"
};

const translateFallback = async (text, fromLanguage, toLanguage) => {
  const from = langMap[fromLanguage] || "en";
  const to = langMap[toLanguage] || "hi";
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fallback translation failed: ${res.statusText}`);
  }
  const json = await res.json();
  return json[0].map(item => item[0]).join('');
};

export const translateWithGemini = async (text, fromLanguage, toLanguage) => {
  try {
    const ai = getGeminiClient();

    if (!ai) {
      console.warn("Gemini is not configured. Falling back to Google Translate API...");
      return await translateFallback(text, fromLanguage, toLanguage);
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // updated model
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Translate from ${fromLanguage} to ${toLanguage}. Output only the translation with better way: ${text}`
            }
          ]
        }
      ],
      config: {
        systemInstruction: "You are a professional translator. Do not include explanations."
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Translation failed, trying fallback...", error);
    try {
      return await translateFallback(text, fromLanguage, toLanguage);
    } catch (fallbackError) {
      console.error("Fallback Translation Error:", fallbackError);
      return "Translation failed.";
    }
  }
};