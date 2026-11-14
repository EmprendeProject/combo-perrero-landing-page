// Atributo `sizes` de cada imagen responsiva. Se comparte con vite.config.js
// para que el <link rel="preload"> elija exactamente el mismo archivo que el <img>.
export const SIZES = {
  titulo: '(max-width: 480px) 90vw, (max-width: 768px) 88vw, 680px',
  combo: '(max-width: 768px) calc(100vw - 48px), 720px',
  mocup: '(max-width: 480px) 320px, 440px',
}
