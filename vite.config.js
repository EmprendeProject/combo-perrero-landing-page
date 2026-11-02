import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssMinify: true,
    // No inlinear imágenes en base64: se cachean mejor como archivos
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 600,
  },
})
