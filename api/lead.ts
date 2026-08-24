import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.COMPANY_EMAIL_USER,
    pass: process.env.COMPANY_EMAIL_PASS,
  },
});

export default async function handler(req: Request, res: Response) {
  // CORS handling for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message, details, service, gmailToken } = req.body || {};
    const clientAuthToken = req.headers.authorization?.replace('Bearer ', '') || gmailToken;

    const contactName = name || 'Anonymous Client';
    const contactEmail = email || 'not-provided@example.com';
    const formDetails = details || message || 'No specific details provided.';

    let gmailSent = false;

    // Direct Gmail API dispatch if OAuth token is provided
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
          console.error("Vercel Gmail API Error:", errJson);
        }
      } catch (gmailErr) {
        console.error("Failed to proxy Gmail dispatch on Vercel:", gmailErr);
      }
    }

    // SMTP Fallback
    if (!gmailSent && process.env.COMPANY_EMAIL_USER && process.env.COMPANY_EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: process.env.COMPANY_EMAIL_USER,
          to: process.env.COMPANY_EMAIL_USER,
          subject: `New Lead from ${contactName} via ReliabilityIQ Platform`,
          text: `You have received a new form submission!\n\nName: ${contactName}\nEmail: ${contactEmail}\nService: ${service || 'N/A'}\nDetails: ${formDetails}`,
        });
      } catch (e) {
        console.warn("SMTP email dispatch failed on Vercel:", e);
      }
    }

    return res.status(200).json({
      success: true,
      message: gmailSent ? "Form submission delivered directly to Gmail!" : "Lead captured successfully!",
      deliveredViaGmail: gmailSent
    });
  } catch (error) {
    console.error("Error capturing lead on Vercel:", error);
    return res.status(500).json({ error: "Failed to capture lead" });
  }
}
