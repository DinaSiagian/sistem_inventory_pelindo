import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Coba load SSL cert jika sudah ada (setelah jalankan mkcert)
const certPath = path.resolve('./localhost+1.pem')
const keyPath  = path.resolve('./localhost+1-key.pem')
const hasCert  = fs.existsSync(certPath) && fs.existsSync(keyPath)

const httpsConfig = hasCert
  ? { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) }
  : undefined  // fallback ke HTTP kalau cert belum ada

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=*, microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'Cross-Origin-Resource-Policy': 'cross-origin',
    'Content-Security-Policy': [
      "default-src 'self' data: blob: 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "connect-src 'self' ws: wss:",
      "frame-ancestors 'self'",
    ].join('; '),
}

export default defineConfig({
  plugins: [react()],

  server: {
    https: httpsConfig,
    headers: securityHeaders,
    // Proxy semua request /api ke PHP backend (HTTP di belakang layar)
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },

  preview: {
    https: httpsConfig,
    headers: securityHeaders,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
