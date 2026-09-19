import express from 'express';
import path from 'path';
import http from 'http';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Stream proxy route to safely serve http://5.189.189.39:8000/shimafm.mp3 over HTTPS
  app.get('/api/stream', (req, res) => {
    const streamUrl = 'http://5.189.189.39:8000/shimafm.mp3';

    const clientReq = http.get(
      streamUrl,
      {
        headers: {
          'User-Agent': 'ShimaFM-WebPlayer/1.0',
          Accept: '*/*',
        },
      },
      (streamRes) => {
        res.writeHead(streamRes.statusCode || 200, {
          'Content-Type': 'audio/mpeg',
          'Accept-Ranges': 'none',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          'Access-Control-Allow-Origin': '*',
          Connection: 'keep-alive',
        });
        streamRes.pipe(res);
      }
    );

    clientReq.on('error', (err) => {
      console.error('Radio stream proxy error:', err.message);
      if (!res.headersSent) {
        res.status(502).send('Flux Shima FM momentanément indisponible');
      }
    });

    req.on('close', () => {
      clientReq.destroy();
    });
  });

  // Health / Status check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', stream: 'http://5.189.189.39:8000/shimafm.mp3' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Radio Shima FM Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
