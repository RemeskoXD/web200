import { GoogleGenAI } from "@google/genai";

// We do NOT initialize the client globally anymore.
// This prevents the "Uncaught Error: An API Key must be set" crash on page load.

export const getHealthTip = async (userQuery: string): Promise<string> => {
  try {
    // Access the key inside the function
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("API Key is missing. Please set VITE_GOOGLE_GENAI_API_KEY in your environment variables.");
      return "Omlouvám se, momentálně nemohu odpovědět (chybí konfigurace systému). Zkuste to prosím později.";
    }

    // Initialize client only when needed
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      Jsi asistent pro web výživového poradce Ondřeje Hlatkého. 
      Odpověz stručně, motivačně a odborně (česky) na dotaz uživatele ohledně zdraví, hubnutí nebo cvičení.
      Odpověď by měla mít maximálně 2-3 věty.
      Pokud se uživatel zeptá na ceny nebo rezervaci, odkaž ho na kontaktní formulář nebo telefon.
      Tón komunikace: Přátelský, profesionální, povzbuzující.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Omlouvám se, momentálně nemohu odpovědět. Zkuste to prosím později.";
  } catch (error) {
    console.error("Chyba při komunikaci s AI:", error);
    return "Omlouvám se, došlo k chybě připojení. Kontaktujte nás prosím přímo.";
  }
};