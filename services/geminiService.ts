import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, COMPANY_INFO, CATEGORIES } from "../constants";

// Resolve API key from Vite or environment (support multiple forms)
const apiKey =
  (import.meta as any).env?.VITE_GEMINI_API_KEY ||
  (import.meta as any).env?.VITE_API_KEY ||
  process.env.GEMINI_API_KEY ||
  process.env.VITE_GEMINI_API_KEY;

const getSystemInstruction = () => {
  return `You are a helpful customer service assistant for ${COMPANY_INFO.name}.
${COMPANY_INFO.tagline}

Company Information:
- Name: ${COMPANY_INFO.name}
- Contact Person: ${COMPANY_INFO.contactPerson}
- Phone: ${COMPANY_INFO.phone}
- Email: ${COMPANY_INFO.email}
- Address: ${COMPANY_INFO.address}
- Established: ${COMPANY_INFO.established}

Available Products:
${CATEGORIES.map(c => `• ${c.name}`).join("\n")}

Be professional and concise.`;
};

export const sendMessageToGemini = async (message: string, history: any[] = []) => {
  if (!apiKey) return "API key missing in environment.";

  try {
    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7,
      },
      history,
    });

    const result = await chat.sendMessage({ message });

    // `result.text` is the typical simple accessor; fall back to nested fields if needed
    return (result as any).text || (result as any).response?.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong, please try again in a moment.";
  }
};
