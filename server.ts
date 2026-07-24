import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client Lazily/Safely so it doesn't crash on boot if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Gemini Assistant Endpoint
app.post("/api/gemini/assistant", async (req, res) => {
  try {
    const { messages, medicationContext } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    let ai;
    try {
      ai = getAiClient();
    } catch (keyError: any) {
      // Graceful error response so the user knows they need to configure their key without crashing
      res.json({
        reply: `Hello! I'm your Medicare AI Companion. I notice that your GEMINI_API_KEY is not configured yet. 
        Please go to the Settings menu (Secrets panel) in AI Studio and add GEMINI_API_KEY to start using the smart AI advice features. 
        In the meantime, I'm running in offline/simulation mode! 😊`
      });
      return;
    }

    // Format chat history for Gemini
    // We'll construct a structured prompt with the user's current medications as system context
    const medString = medicationContext && medicationContext.length > 0
      ? medicationContext.map((m: any) => `- ${m.name} (${m.dosage}, ${m.frequency}) - ${m.instructions || "No special instructions"}`).join("\n")
      : "No medications registered yet.";

    const systemInstruction = `You are "Medicare AI", an empathetic, highly professional clinical AI health companion.
Your tone is trustworthy, clear, accessible, and structured.
You assist the patient (User) in understanding their medications, managing their schedules, and sticking to their health goals.

The patient is currently taking the following medications:
${medString}

IMPORTANT GUIDELINES:
1. Always be supportive, safe, and helpful.
2. If the user asks for clinical diagnoses or exhibits severe symptoms, kindly remind them to consult a medical professional, while providing comforting and practical general guidance.
3. Keep answers relatively concise and easy to read (use formatting like lists or bold text where appropriate) to avoid overwhelming the patient.
4. Refuse requests unrelated to health, medicine, nutrition, wellness, and medical scheduling.`;

    const contents = messages.map((m: any) => {
      return {
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      };
    });

    // Add system instruction in the config block
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, but I could not formulate a response. Please try again.";
    res.json({ reply });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// Vite server middleware integration or static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
