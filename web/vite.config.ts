import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'node:fs'

// ── Dev-only annotations file API ────────────────────────────────────────────
// Stores annotations in web/annotations.json so they survive browser cache clears.
// Only active during `vite dev`; has no effect in the production build.
const ANNOTATIONS_FILE = path.join(__dirname, 'annotations.json')

// ── Dev-only: serve Slidev static builds for /slides/{id}/* ──────────────────
// Vite's SPA fallback would otherwise intercept /slides/M01/ and serve the
// React app's index.html, causing an infinite iframe loop.
// This middleware runs BEFORE the SPA fallback and serves the pre-built
// Slidev HTML directly from public/slides/{id}/.
function slidesStaticPlugin() {
  return {
    name: 'slides-static',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        // Match /slides/{id} or /slides/{id}/  (but NOT /slides/{id}/assets/...)
        const rootMatch = url.match(/^\/slides\/(M\d+)\/?$/)
        if (rootMatch) {
          const slideId = rootMatch[1]
          const indexFile = path.join(__dirname, 'public', 'slides', slideId, 'index.html')
          if (fs.existsSync(indexFile)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(fs.readFileSync(indexFile))
            return
          }
        }
        next()
      })
    },
  }
}

function annotationsPlugin() {
  return {
    name: 'annotations-api',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use('/api/annotations', (req, res) => {
        res.setHeader('Content-Type', 'application/json')

        if (req.method === 'GET') {
          try {
            const data = fs.existsSync(ANNOTATIONS_FILE)
              ? fs.readFileSync(ANNOTATIONS_FILE, 'utf-8')
              : '{}'
            res.end(data)
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: String(e) }))
          }
          return
        }

        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: Buffer) => { body += chunk.toString() })
          req.on('end', () => {
            try {
              JSON.parse(body) // validate
              fs.writeFileSync(ANNOTATIONS_FILE, body, 'utf-8')
              res.end('{"ok":true}')
            } catch (e) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: String(e) }))
            }
          })
          return
        }

        res.statusCode = 405
        res.end('{"error":"Method Not Allowed"}')
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), slidesStaticPlugin(), annotationsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
