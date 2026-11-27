import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import nodemailer from "nodemailer";
import { RELIABILITY_IQ_SYSTEM_INSTRUCTION } from "./server/knowledgeBase";

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

interface CapturedLeadRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  date: string;
  source: "chat" | "form";
  deliveredViaGmail: boolean;
}

// In-memory store for captured leads in the preview environment
const capturedLeads: CapturedLeadRecord[] = [];

const isValidEmail = (value?: string) =>
  Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()));

const isValidPhone = (value?: string) =>
  Boolean(value && value.replace(/\D/g, "").length >= 7);

async function dispatchLeadRecord({
  name,
  email,
  phone,
  service,
  details,
  source,
  clientAuthToken,
}: {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  details?: string;
  source: "chat" | "form";
  clientAuthToken?: string;
}) {
  const contactName = name?.trim() || "Prospective Client";
  const cleanEmail = email?.trim() || "";
  const cleanPhone = phone?.trim() || "";
  const contactIdentifier = cleanEmail || (cleanPhone ? `WhatsApp/Phone: ${cleanPhone}` : "not-provided");
  const serviceName = service?.trim() || "General Advisory";
  const formDetails = [
    details?.trim() || "No specific details provided.",
    cleanPhone && cleanEmail ? `Phone / WhatsApp: ${cleanPhone}` : null,
    `Source: ${source === "chat" ? "ReliabilityIQ AI Conversational Lead Capture" : "Website Consultation Form"}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  // Deduplicate identical recent captures from chat turns
  const duplicate = capturedLeads.find(
    (item) =>
      item.email.toLowerCase() === contactIdentifier.toLowerCase() &&
      item.service === serviceName &&
      Date.now() - new Date(item.date).getTime() < 5 * 60 * 1000
  );
  if (duplicate) {
    return { lead: duplicate, emailSent: duplicate.deliveredViaGmail, deduplicated: true };
  }

  let emailSent = false;

  // 1. Direct Gmail API dispatch if OAuth token is provided
  if (clientAuthToken) {
    try {
      const rawEmail = [
        `To: info@reliabilityiqventures.com`,
        `Subject: [${source === "chat" ? "AI Chat Lead" : "Form Submission"}] New Inquiry from ${contactName}`,
        `Content-Type: text/plain; charset="UTF-8"`,
        `Content-Transfer-Encoding: 7bit`,
        ``,
        `NEW LEAD CAPTURED VIA ${source === "chat" ? "RELIABILITYIQ AI CHAT" : "WEBSITE FORM"}`,
        `=========================================`,
        `Name: ${contactName}`,
        `Contact: ${contactIdentifier}`,
        ...(cleanPhone ? [`Phone / WhatsApp: ${cleanPhone}`] : []),
        `Service Stream: ${serviceName}`,
        `Submission Date: ${new Date().toLocaleString()}`,
        ``,
        `REQUIREMENTS & BRIEF:`,
        `${details?.trim() || "No specific details provided."}`,
        ``,
        `=========================================`,
        `Delivered via ReliabilityIQ Ventures platform.`,
      ].join("\r\n");

      const base64Url = Buffer.from(rawEmail)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const gmailRes = await fetch("https://gmail.googleapis.com/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${clientAuthToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw: base64Url }),
      });

      if (gmailRes.ok) {
        emailSent = true;
      } else {
        const errJson = await gmailRes.json();
        console.error("Gmail API Error:", errJson);
      }
    } catch (gmailErr) {
      console.error("Failed to proxy Gmail dispatch:", gmailErr);
    }
  }

  // 2. Fallback Nodemailer if SMTP credentials are provided
  if (!emailSent && process.env.COMPANY_EMAIL_USER && process.env.COMPANY_EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.COMPANY_EMAIL_USER,
          pass: process.env.COMPANY_EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.COMPANY_EMAIL_USER,
        to: "info@reliabilityiqventures.com",
        subject: `[ReliabilityIQ ${source === "chat" ? "AI Lead" : "Inquiry"}] ${contactName}`,
        text: `You have received a new lead (${source})!\n\nName: ${contactName}\nContact: ${contactIdentifier}\nService: ${serviceName}\n\nDetails:\n${formDetails}`,
      });
      emailSent = true;
    } catch (e) {
      console.warn("SMTP email dispatch failed:", e);
    }
  }

  const newLead: CapturedLeadRecord = {
    id: Date.now().toString(),
    name: contactName,
    email: contactIdentifier,
    ...(cleanPhone ? { phone: cleanPhone } : {}),
    service: serviceName,
    message: formDetails,
    date: new Date().toISOString(),
    source,
    deliveredViaGmail: emailSent,
  };
  capturedLeads.push(newLead);

  return { lead: newLead, emailSent, deduplicated: false };
}

async function generateWithRetry<T>(fn: () => Promise<T>, maxRetries = 2): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.code;
      const isTransient = status === 429 || status === 503 || status === 500;
      if (!isTransient || attempt === maxRetries) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 450 * Math.pow(2, attempt)));
    }
  }
  throw lastError;
}

const CHAT_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    reply: {
      type: Type.STRING,
      description:
        "Clear, knowledgeable Markdown response grounded in ReliabilityIQ Ventures services, contact details, and consultation workflow.",
    },
    leadCaptured: {
      type: Type.BOOLEAN,
      description:
        "True ONLY when the user has provided valid contact details (email or phone/WhatsApp) AND project intent/inquiry in the conversation (and has not already been logged previously).",
    },
    lead: {
      type: Type.OBJECT,
      description: "Structured lead data extracted from the conversation.",
      properties: {
        name: { type: Type.STRING, description: "Prospect full name or first name if shared." },
        email: { type: Type.STRING, description: "Valid email address shared by the user, else empty string." },
        phone: { type: Type.STRING, description: "Phone or WhatsApp number shared by the user, else empty string." },
        company: { type: Type.STRING, description: "Company or organization name if shared, else empty string." },
        service: { type: Type.STRING, description: "Closest ReliabilityIQ service stream." },
        summary: { type: Type.STRING, description: "Concise summary of user goals, timeline, and requirements." },
        preferredSlot: { type: Type.STRING, description: "Preferred consultation date/time/timezone if mentioned." },
      },
      required: ["name", "email", "phone", "company", "service", "summary", "preferredSlot"],
    },
    leadStage: {
      type: Type.STRING,
      description: "One of: exploring, qualifying, ready_for_contact, captured",
    },
    suggestBookingModal: {
      type: Type.BOOLEAN,
      description:
        "True when the user wants a consultation, quote, or contact follow-up and has not yet shared contact details in chat.",
    },
    followUpSuggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2 to 3 concise follow-up suggestion chips (max 5 words each).",
    },
  },
  required: ["reply", "leadCaptured", "lead", "leadStage", "suggestBookingModal", "followUpSuggestions"],
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for trained Gemini Chatbot + conversational lead capture
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, gmailToken } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Invalid messages array" });
      }

      const ai = getAiClient();
      if (!ai) {
        return res.status(503).json({
          error:
            "AI Advisor is not configured yet. Please check that GEMINI_API_KEY is set in Settings > Secrets.",
        });
      }

      // Trim to most recent 18 turns & ensure alternating valid contents starting with user context
      const recentMessages = messages.slice(-18).map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: String(msg.content || "").slice(0, 4000) }],
      }));

      const response = await generateWithRetry(() =>
        ai.models.generateContent({
          model: "gemini-4-hydrogen",
          contents: recentMessages,
          config: {
            systemInstruction: RELIABILITY_IQ_SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: CHAT_RESPONSE_SCHEMA,
          },
        })
      );

      const rawText = (response.text ?? "").trim();
      let parsed: any = null;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        // Fallback if model returned plain text
        return res.json({
          text: rawText || "Thank you for reaching out to ReliabilityIQ Ventures. How can we help with your project?",
          leadCaptured: false,
          leadStage: "exploring",
          suggestBookingModal: false,
          followUpSuggestions: ["Explore Services", "Book Consultation", "WhatsApp Team"],
        });
      }

      const extracted = parsed?.lead || {};
      const hasReachableContact = isValidEmail(extracted.email) || isValidPhone(extracted.phone);
      let savedLeadRecord: CapturedLeadRecord | null = null;
      let emailSent = false;

      if (parsed?.leadCaptured && hasReachableContact) {
        const clientAuthToken = req.headers.authorization?.replace("Bearer ", "") || gmailToken;
        const summaryParts = [
          extracted.summary,
          extracted.company ? `Company: ${extracted.company}` : null,
          extracted.preferredSlot ? `Preferred Timing: ${extracted.preferredSlot}` : null,
        ]
          .filter(Boolean)
          .join("\n");

        const result = await dispatchLeadRecord({
          name: extracted.name,
          email: extracted.email,
          phone: extracted.phone,
          service: extracted.service,
          details: summaryParts || "Captured directly during ReliabilityIQ AI chat.",
          source: "chat",
          clientAuthToken,
        });

        savedLeadRecord = result.lead;
        emailSent = result.emailSent;
      }

      const suggestions = Array.isArray(parsed?.followUpSuggestions)
        ? parsed.followUpSuggestions.filter((s: unknown) => typeof s === "string" && s.trim()).slice(0, 3)
        : [];

      res.json({
        text:
          parsed?.reply ||
          "Thank you for contacting ReliabilityIQ Ventures. How can I assist with your infrastructure or automation goals?",
        leadCaptured: Boolean(savedLeadRecord),
        emailSent,
        capturedLead: savedLeadRecord
          ? {
              name: savedLeadRecord.name,
              email: isValidEmail(extracted.email) ? extracted.email : undefined,
              phone: isValidPhone(extracted.phone) ? extracted.phone : undefined,
              service: savedLeadRecord.service,
              summary: extracted.summary || savedLeadRecord.message,
            }
          : null,
        leadStage: parsed?.leadStage || "exploring",
        suggestBookingModal: Boolean(parsed?.suggestBookingModal && !savedLeadRecord),
        followUpSuggestions:
          suggestions.length > 0
            ? suggestions
            : ["99.99% Web Ops", "AI Automations", "Book Consultation"],
      });
    } catch (error: any) {
      console.error("Error in chat endpoint:", error);
      const status = Number(error?.status || error?.code);
      if (status === 400 || status === 403) {
        return res.status(status).json({
          error:
            "Unable to authenticate with the AI service. Please verify the API key in Settings > Secrets.",
        });
      }
      if (status === 429) {
        return res.status(429).json({
          error:
            "AI Advisor is experiencing high demand right now. Please try again in a moment or book a consultation directly.",
        });
      }
      res.status(500).json({
        error: "Unable to reach the AI Advisor right now. Please try again or book a consultation directly.",
      });
    }
  });

  // API route for lead capture & form submissions with optional Gmail API dispatch
  app.post("/api/lead", async (req, res) => {
    try {
      const { name, email, phone, message, details, service, gmailToken, source } = req.body;
      const clientAuthToken = req.headers.authorization?.replace("Bearer ", "") || gmailToken;

      const result = await dispatchLeadRecord({
        name,
        email,
        phone,
        service,
        details: details || message,
        source: source === "chat" ? "chat" : "form",
        clientAuthToken,
      });

      res.json({
        success: true,
        emailSent: result.emailSent,
        message: result.emailSent
          ? "Form submission delivered directly to info@reliabilityiqventures.com!"
          : "Lead captured successfully in platform database.",
      });
    } catch (error) {
      console.error("Error capturing lead:", error);
      res.status(500).json({ error: "Failed to capture lead" });
    }
  });

  // Internal API route for Admin Panel to fetch leads
  app.get("/api/admin/leads", (req, res) => {
    const password = req.headers.authorization;
    if (password !== "RIQV03") {
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(
      express.static(distPath, {
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".mp4")) {
            res.setHeader("Content-Type", "video/mp4");
            res.setHeader("Accept-Ranges", "bytes");
          } else if (filePath.endsWith(".mp3")) {
            res.setHeader("Content-Type", "audio/mpeg");
            res.setHeader("Accept-Ranges", "bytes");
          }
        },
      })
    );
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
