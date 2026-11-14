import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SIZES } from './src/imageSizes.js'

// Inyecta <link rel="preload"> para la fuente y las imágenes de la primera pantalla,
// así el navegador las pide en paralelo con el JS en vez de esperar a que React renderice.
function preloadHero() {
  return {
    name: 'preload-hero',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, { bundle }) {
        if (!bundle) return html
        const assets = Object.values(bundle).filter((c) => c.type === 'asset')
        const nameOf = (a) => (a.names?.[0] ?? a.name ?? '')
        const srcset = (prefix) =>
          assets
            .map((a) => [nameOf(a).match(new RegExp(`^${prefix}-(\\d+)\\.avif$`)), a])
            .filter(([m]) => m)
            .sort(([a], [b]) => a[1] - b[1])
            .map(([m, a]) => `/${a.fileName} ${m[1]}w`)
            .join(', ')
        const font = assets.find((a) => nameOf(a) === 'outfit-latin-wght-normal.woff2')

        const tags = []
        if (font) {
          tags.push({ tag: 'link', attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${font.fileName}`, crossorigin: '' }, injectTo: 'head' })
        }
        for (const [prefix, sizes] of [['titulo', SIZES.titulo], ['combo-1', SIZES.combo]]) {
          const set = srcset(prefix)
          if (set) {
            tags.push({ tag: 'link', attrs: { rel: 'preload', as: 'image', type: 'image/avif', imagesrcset: set, imagesizes: sizes, fetchpriority: 'high' }, injectTo: 'head' })
          }
        }
        return { html, tags }
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadHero()],
  build: {
    target: 'es2020',
    cssMinify: true,
    // No inlinear imágenes en base64: se cachean mejor como archivos
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 600,
  },
})
