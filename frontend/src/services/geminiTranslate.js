import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const translateWithGemini = async (text, fromLanguage, toLanguage) => {
  try {

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
    console.error("Translation Error:", error);
    return "Translation failed.";
  }
};