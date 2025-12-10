import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, COMPANY_INFO, CATEGORIES } from '../constants';

const apiKey = (process.env.GEMINI_API_KEY as string) || (import.meta.env.VITE_GEMINI_API_KEY as string);

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

Available Products and Categories:
${CATEGORIES.map(cat => `- ${cat.name}`).join('\n')}

You should help customers inquire about products, services, and company information. Be professional and helpful.`;
};

export const sendMessageToGemini = async (message, history) => {
  if (!apiKey) return "Server error: API key missing.";

  try {
    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7,
      },
      history
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "Temporary server issue. Please try again later.";
  }
};
