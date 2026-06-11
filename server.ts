import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cadastroHandler from "./api/cadastro.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.disable("x-powered-by");

  // Helmet for security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https://i.postimg.cc", "https://raw.githubusercontent.com", "https://avivahglobal.com"],
          frameAncestors: ["*"],
        },
      },
      crossOriginEmbedderPolicy: false,
      xFrameOptions: false,
    })
  );

  // Middleware to parse JSON bodies with strict limit
  app.use(express.json({ limit: "10kb" }));

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Muitas requisições, tente novamente mais tarde.' }
  });

  // API routes FIRST
  app.post("/api/cadastro", apiLimiter, async (req, res) => {
    try {
      await cadastroHandler(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Erro interno no servidor' });
    }
  });

  // Centralized Error handler for syntax errors (e.g., malformed JSON payload)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).json({ success: false, message: 'Payload inválido' });
    }
    next(err);
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
    app.use(express.static(distPath, { maxAge: "1d", setHeaders: (res, path) => {
      if (path.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
    }}));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
