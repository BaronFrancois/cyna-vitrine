import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize conditionally to avoid errors if key is missing in dev (though required by prompt)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const chatWithCyna = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  if (!ai) return "Clé API non configurée.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `Tu es Cyna, un assistant support IA professionnel et utile pour une entreprise de cybersécurité SaaS premium.
        Ton ton est à la Apple : calme, concis, professionnel et rassurant.
        Tu aides les utilisateurs à comprendre des produits comme EDR, XDR et SOC Managé.
        Réponds toujours en Français. Garde les réponses courtes et bien formatées.`,
      },
      history: history
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "J'ai du mal à me connecter au serveur sécurisé pour le moment. Veuillez réessayer plus tard.";
  }
};