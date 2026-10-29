import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_MODELS = new Set([
  'gemini-flash-latest',
  'gemini-3.8-flash',
  'gemini-3.1-flash-lite',
]);

function resolveSafeModel(requested: unknown): string {
  const raw = String(requested || 'gemini-flash-latest').trim().replace(/^models\//, '');
  if (!raw) return 'gemini-flash-latest';
  if (/^gemini-(1\.5|2\.0)/i.test(raw)) return 'gemini-flash-latest';
  if (ALLOWED_MODELS.has(raw) || /^gemini-[234]/i.test(raw)) return raw;
  return 'gemini-flash-latest';
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
  });

  app.post('/api/ai/gemini', async (req, res) => {
    const apiKey = (process.env.GEMINI_API_KEY || '').trim();
    if (!apiKey) {
      res.status(503).json({
        error: { message: 'GEMINI_API_KEY no configurada en el servidor' },
      });
      return;
    }

    try {
      const model = resolveSafeModel(req.body?.model);
      const systemInstruction = String(req.body?.systemInstruction || '').slice(0, 4000);
      const rawContents = Array.isArray(req.body?.contents) ? req.body.contents.slice(-18) : [];
      const contents = rawContents
        .map((item: { role?: string; parts?: Array<{ text?: string }> }) => ({
          role: item?.role === 'model' ? 'model' : 'user',
          parts: [
            {
              text: String(item?.parts?.[0]?.text || '').slice(0, 1600),
            },
          ],
        }))
        .filter((c) => c.parts[0].text.trim().length > 0);

      if (!contents.length) {
        res.status(400).json({ error: { message: 'Pregunta vacía' } });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.5,
          maxOutputTokens: 2048,
        },
      });

      const text = (response.text || '').trim();
      if (!text) {
        res.status(502).json({ error: { message: 'Respuesta vacía del modelo' } });
        return;
      }

      res.json({ text, model });
    } catch (err: unknown) {
      const status =
        typeof (err as { status?: number })?.status === 'number'
          ? (err as { status: number }).status
          : 502;
      const rawMsg =
        err instanceof Error ? err.message : 'Error consultando Gemini';
      const shortMsg =
        status === 429 || /RESOURCE_EXHAUSTED|quota/i.test(rawMsg)
          ? 'Cuota temporal agotada en Gemini (429)'
          : rawMsg.slice(0, 140);
      res.status(status >= 400 && status < 600 ? status : 502).json({
        error: { message: shortMsg },
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
