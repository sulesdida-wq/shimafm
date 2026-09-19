import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import http from 'http';
import {defineConfig, Plugin} from 'vite';

function audioStreamProxyPlugin(): Plugin {
  return {
    name: 'audio-stream-proxy',
    configureServer(server) {
      server.middlewares.use('/api/stream', (req, res) => {
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
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: '0',
              'Access-Control-Allow-Origin': '*',
            });
            streamRes.pipe(res);
          }
        );

        clientReq.on('error', (err) => {
          console.error('Vite audio proxy error:', err.message);
          if (!res.headersSent) {
            res.statusCode = 502;
            res.end('Flux Shima FM indisponible');
          }
        });

        req.on('close', () => {
          clientReq.destroy();
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), audioStreamProxyPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
