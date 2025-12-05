import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client using the environment variable directly as required
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthTip = async (userQuery: string): Promise<string> => {
  try {
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