// AVIF responsivo (≈60% más liviano) con el WebP original como respaldo
const AVIF = import.meta.glob('../assets/avif/*.avif', { eager: true, query: '?url', import: 'default' })

function avifSrcSet(name) {
  return Object.entries(AVIF)
    .map(([path, url]) => [path.match(new RegExp(`/${name}-(\\d+)\\.avif$`)), url])
    .filter(([m]) => m)
    .sort(([a], [b]) => a[1] - b[1])
    .map(([m, url]) => `${url} ${m[1]}w`)
    .join(', ')
}

export default function Picture({ avif, sizes, src, ...imgProps }) {
  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet(avif)} sizes={sizes} />
      <img src={src} {...imgProps} />
    </picture>
  )
}
