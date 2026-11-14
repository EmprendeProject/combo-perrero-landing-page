import { useState, useEffect, useCallback } from 'react'
import img1 from '../assets/combos/1.webp'
import img2 from '../assets/combos/2.webp'
import img3 from '../assets/combos/3.webp'
import img4 from '../assets/combos/4.webp'
import img5 from '../assets/combos/5.webp'
import img6 from '../assets/combos/6.webp'
import img7 from '../assets/combos/7.webp'
import img9 from '../assets/combos/9.webp'
import img10 from '../assets/combos/10.webp'

const SLIDES = [img1, img2, img3, img4, img5, img6, img7, img9, img10].map((src, i) => ({
  src,
  alt: `Combo Perrero ${i + 1}`,
}))

export default function Carousel({ interval = 4500 }) {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback((index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((index + SLIDES.length) % SLIDES.length)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating])

  // Auto-avance; se reinicia tras una navegación manual y se pausa con la pestaña oculta
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.hidden) return
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, interval)
    return () => clearInterval(timer)
  }, [interval, current])

  // Solo se montan la slide actual, la siguiente y las ya vistas
  const [visited, setVisited] = useState(() => new Set([0, 1]))
  useEffect(() => {
    const nxt = (current + 1) % SLIDES.length
    setVisited((prev) => {
      if (prev.has(current) && prev.has(nxt)) return prev
      return new Set(prev).add(current).add(nxt)
    })
  }, [current])

  return (
    <div className="carousel" role="region" aria-label="Galería de combos">
      <div className="carousel-track">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`carousel-slide ${i === current ? 'active' : ''}`}
            aria-hidden={i !== current}
          >
            {(i === current || visited.has(i)) && (
              <img
                src={slide.src}
                alt={slide.alt}
                width={800}
                height={1067}
                className="carousel-img"
                draggable={false}
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            )}
          </div>
        ))}
      </div>

      <button className="carousel-btn carousel-btn--prev" onClick={() => goTo(current - 1)} aria-label="Imagen anterior">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="carousel-btn carousel-btn--next" onClick={() => goTo(current + 1)} aria-label="Siguiente imagen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="carousel-dots" role="tablist">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'dot--active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
