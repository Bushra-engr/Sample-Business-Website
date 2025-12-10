import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, COMPANY_INFO, CATEGORIES } from '../constants';

const apiKey = process.env.API_KEY || '';

// System prompt generation to give context to the AI
const getSystemInstruction = () => {
  const productList = PRODUCTS.map(p => `- ${p.name} (${p.category}): ${p.description}. Specs: ${JSON.stringify(p.specifications)}`).join('\n');
  const categoryList = CATEGORIES.map(c => c.name).join(', ');

  return `You are "IronBot", the expert AI sales assistant for ${COMPANY_INFO.name}.
  
  Company Details:
  - Address: ${COMPANY_INFO.address}
  - Phone: ${COMPANY_INFO.phone}
  - Email: ${COMPANY_INFO.email}
  - GST: ${COMPANY_INFO.gst}
  - Established: ${COMPANY_INFO.established}
  - Tagline: ${COMPANY_INFO.tagline}

  We specialize in: ${categoryList}.

  Product Catalog:
  ${productList}

  Your Goal:
  - Answer questions about our products, specs, and materials accurately.
  - If a user asks for a price that lists "Get Quote", ask them to provide their contact details or direct them to the contact page/WhatsApp.
  - Be professional, polite, and use an "industrial but friendly" tone.
  - If asked about "Process", explain: Design -> Fabrication -> Assembly -> Quality Check -> Delivery.
  - Keep answers concise (under 150 words) unless detailed specs are asked.
  `;
};

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[]) => {
  if (!apiKey) {
    console.error("API Key not found");
    return "I'm sorry, I cannot connect to the server right now. Please try again later or contact us via phone.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // We create a chat session. Note: For a real persistent chat, we'd manage history more carefully.
    // Here we just take the last few messages or start fresh with system instruction.
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble retrieving that information momentarily. Please contact our support team.";
  }
};
