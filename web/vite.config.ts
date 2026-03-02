import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'node:fs'

// ── Dev-only annotations file API ────────────────────────────────────────────
// Stores annotations in web/annotations.json so they survive browser cache clears.
// Only active during `vite dev`; has no effect in the production build.
const ANNOTATIONS_FILE = path.join(__dirname, 'annotations.json')

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
  plugins: [react(), tailwindcss(), annotationsPlugin()],
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
