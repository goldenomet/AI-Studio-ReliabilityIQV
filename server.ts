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

  // API route for lead capture & form submissions with optional Gmail API dispatch
  app.post("/api/lead", async (req, res) => {
    try {
      const { name, email, message, details, service, gmailToken } = req.body;
      const clientAuthToken = req.headers.authorization?.replace('Bearer ', '') || gmailToken;

      const contactName = name || 'Anonymous Client';
      const contactEmail = email || 'not-provided@example.com';
      const formDetails = details || message || 'No specific details provided.';

      // Store in memory for the admin preview panel
      const newLead = {
        id: Date.now().toString(),
        name: contactName,
        email: contactEmail,
        service: service || 'N/A',
        message: formDetails,
        date: new Date().toISOString(),
        deliveredViaGmail: Boolean(clientAuthToken)
      };
      capturedLeads.push(newLead);

      let gmailSent = false;
      // If user/admin provided a Gmail OAuth Token, send directly via Gmail API!
      if (clientAuthToken) {
        try {
          const rawEmail = [
            `To: reliabilityiqventures@gmail.com`,
            `Subject: [Form Submission] New Inquiry from ${contactName}`,
            `Content-Type: text/plain; charset="UTF-8"`,
            `Content-Transfer-Encoding: 7bit`,
            ``,
            `NEW FORM SUBMISSION VIA GMAIL INTEGRATION`,
            `=========================================`,
            `Name: ${contactName}`,
            `Sender Email: ${contactEmail}`,
            `Service Stream: ${service || 'General Inquiry'}`,
            `Submission Date: ${new Date().toLocaleString()}`,
            ``,
            `TRANSMISSION PACKET:`,
            `${formDetails}`,
            ``,
            `=========================================`,
            `Delivered via ReliabilityIQ Gmail OAuth API.`
          ].join('\r\n');

          const base64Url = Buffer.from(rawEmail)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

          const gmailRes = await fetch('https://gmail.googleapis.com/v1/users/me/messages/send', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${clientAuthToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ raw: base64Url })
          });

          if (gmailRes.ok) {
            gmailSent = true;
          } else {
            const errJson = await gmailRes.json();
            console.error("Gmail API Error:", errJson);
          }
        } catch (gmailErr) {
          console.error("Failed to proxy Gmail dispatch:", gmailErr);
        }
      }

      // Fallback Nodemailer if SMTP credentials are provided
      if (!gmailSent && process.env.COMPANY_EMAIL_USER && process.env.COMPANY_EMAIL_PASS) {
        try {
          await transporter.sendMail({
            from: process.env.COMPANY_EMAIL_USER,
            to: process.env.COMPANY_EMAIL_USER,
            subject: `New Lead from ${contactName} via ReliabilityIQ Platform`,
            text: `You have received a new form submission!\n\nName: ${contactName}\nEmail: ${contactEmail}\nService: ${service || 'N/A'}\nDetails: ${formDetails}`,
          });
        } catch (e) {
          console.warn("SMTP email dispatch failed:", e);
        }
      }

      res.json({ 
        success: true, 
        message: gmailSent ? "Form submission delivered directly to Gmail!" : "Lead captured successfully!",
        deliveredViaGmail: gmailSent 
      });
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
