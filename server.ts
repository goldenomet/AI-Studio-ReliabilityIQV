import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import jwt from "jsonwebtoken";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for Chatbase identity token
  app.get("/api/chatbase-token", (req, res) => {
    try {
      const secret = process.env.CHATBOT_IDENTITY_SECRET || 'pihr807n5lkn8ahmg52pyorn82oc26ev';
      
      // We use a mock user ID because there is no authentication system present in this marketing site template yet.
      // If you integrate an auth provider (like Firebase Auth or Supabase), replace this with the real signed-in user.
      const user = {
        id: "guest_" + Math.random().toString(36).substr(2, 9), 
        email: "guest@example.com",
        stripe_accounts: []
      };

      const token = jwt.sign(
        {
          user_id: user.id,
          email: user.email,
          stripe_accounts: user.stripe_accounts,
        },
        secret,
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (error) {
      console.error("Error generating chatbase token:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
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
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
