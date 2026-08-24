import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// In-memory store for captured leads in the preview environment
const capturedLeads: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.COMPANY_EMAIL_USER,
      pass: process.env.COMPANY_EMAIL_PASS
    }
  });

  // System instructions for the bot
  const systemInstruction = `You are the official AI assistant for ReliabilityIQ Ventures, an Enterprise IT Solutions company in Nigeria.
Your job is to assist visitors, answer questions about our services (Web Operations, AI Automations, GIS Mapping, Technical Reports, Content & Design), and capture leads.
Be professional, concise, and helpful. If a user wants a quote or consultation, ask for their name, email, and their requirements, and let them know a representative will contact them.`;

  // API route for custom Gemini Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array" });
      }

      // Format messages for Gemini SDK (using genai SDK format)
      // The SDK expects contents: [{ role: 'user', parts: [{ text: '...' }] }]
      const contents = messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Error in chat endpoint:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // API route for lead capture
  app.post("/api/lead", async (req, res) => {
    try {
      const { name, email, message, service } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const mailOptions = {
        from: process.env.COMPANY_EMAIL_USER,
        to: process.env.COMPANY_EMAIL_USER, // send to company's own email
        subject: `New Lead from ${name} via ReliabilityIQ Chatbot`,
        text: `You have received a new lead!\n\nName: ${name}\nEmail: ${email}\nService of Interest: ${service || 'N/A'}\nMessage: ${message || 'No specific message.'}`,
      };

      // Store in memory for the admin preview panel
      capturedLeads.push({
        id: Date.now().toString(),
        name,
        email,
        service: service || 'N/A',
        message: message || '',
        date: new Date().toISOString()
      });

      // Only send if configured, else just simulate success for dev environment
      if (process.env.COMPANY_EMAIL_USER && process.env.COMPANY_EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        console.warn("COMPANY_EMAIL_USER or COMPANY_EMAIL_PASS not set. Simulating email send for:", mailOptions);
      }

      res.json({ success: true, message: "Lead captured successfully!" });
    } catch (error) {
      console.error("Error capturing lead:", error);
      res.status(500).json({ error: "Failed to capture lead" });
    }
  });

  // Internal API route for Admin Panel to fetch leads
  app.get("/api/admin/leads", (req, res) => {
    // In a real app, verify admin session/token here.
    // For this preview, we'll just return the in-memory leads.
    const password = req.headers.authorization;
    if (password !== 'admin123') {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json({ leads: capturedLeads });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.mp4')) {
          res.setHeader('Content-Type', 'video/mp4');
          res.setHeader('Accept-Ranges', 'bytes');
        } else if (filePath.endsWith('.mp3')) {
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Accept-Ranges', 'bytes');
        }
      }
    }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
