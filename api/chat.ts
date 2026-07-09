import { GoogleGenAI } from "@google/genai";

// Lazy-loaded Gemini Client following security instructions
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing. Please configure it in your Settings > Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are "ReliabilityBot", the official AI Chatbot of ReliabilityIQ Ventures (located in Ipaja, Lagos State, Nigeria).
Your purpose is to answer questions about the company, its services, team, and help guide potential clients.

Information about ReliabilityIQ Ventures:
1. Core Focus: Leading enterprise IT solutions in Nigeria and globally. We specialize in high-availability web operations, AI workflow automation, and resilient digital infrastructure for scaling businesses.
2. Slogan/Mantra: "Lagos to London — IT Infrastructure for Global Scale." Bridging Nigerian technical ingenuity with international execution standards.
3. Founders:
   - Rufus: Lead systems architect.
   - Theophilus: Operational director.
   - Kika: Full-stack engineer & product design expert.
4. Core Services:
   - High-Availability Web Operations: Global standard, 99.99% system uptime, resilient cloud infrastructure.
   - AI Workflow Automation: Streamlining complex enterprise operations.
   - Resilient Digital Infrastructure: Custom network, cloud, and scaling architectures from Lagos-edge to London clouds.
   - Motion Graphic & Product Concept Animations: Featuring cutting-edge 3D concepts (including showcase video animations with IDs "dLOiPM_mLW8" and "sQZl3wKzIPE").
   - GIS & Map Systems: Custom geospatial intelligence tools.
   - Growth Architecture: Enterprise scaling consulting.
5. Location: Ipaja, Lagos State, Nigeria.
6. Year of Establishment: Active since 2024.

Tone & Persona:
- Professional, technically astute, highly supportive, and clear.
- Be friendly, humble, and display a standard of pride in Nigerian engineering excellence.
- Keep responses concise, useful, and formatted in clear, easy-to-read Markdown. Use bullet points when listing services or founders.
- Prompt users to reach out via the Contact Form on the website or message us directly on WhatsApp if they wish to discuss a custom project!`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload. 'messages' must be an array." });
    }

    const ai = getGeminiClient();

    // Map message history to Gemini API format
    const contents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I am here to assist you with any questions about ReliabilityIQ Ventures. Could you please rephrase your request?";

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({ 
      error: error.message || "An internal error occurred while processing your request to the AI Chatbot." 
    });
  }
}
