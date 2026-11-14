import { useState, useEffect, useCallback } from 'react'
import img1 from './assets/combos/1.webp'
import img2 from './assets/combos/2.webp'
import img3 from './assets/combos/3.webp'
import img4 from './assets/combos/4.webp'
import img5 from './assets/combos/5.webp'
import img6 from './assets/combos/6.webp'
import img7 from './assets/combos/7.webp'
import img9 from './assets/combos/9.webp'
import img10 from './assets/combos/10.webp'
import tituloPng from './assets/titulo tcp.webp'
import mocup1 from './assets/mocup 1.webp'
import './App.css'

// Meta Pixel: evento al hacer click en un CTA
function trackCTAClick(location) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: 'Pide por Yummy', cta_location: location, city: 'caracas' })
  }
}

const SLIDES = [
  { src: img1, alt: 'Combo Perrero 1' },
  { src: img2, alt: 'Combo Perrero 2' },
  { src: img3, alt: 'Combo Perrero 3' },
  { src: img4, alt: 'Combo Perrero 4' },
  { src: img5, alt: 'Combo Perrero 5' },
  { src: img6, alt: 'Combo Perrero 6' },
  { src: img7, alt: 'Combo Perrero 7' },
  { src: img9, alt: 'Combo Perrero 8' },
  { src: img10, alt: 'Combo Perrero 9' },
]

function Carousel() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback((index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((index + SLIDES.length) % SLIDES.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prev = () => goTo(current - 1)
  const next = () => goTo(current + 1)

  // Auto-advance every 4 seconds (pausado si la pestaña no está visible)
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.hidden) return
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Solo se descargan la slide actual, la siguiente y las ya vistas
  const [visited, setVisited] = useState(() => new Set([0, 1]))
  useEffect(() => {
    const next = (current + 1) % SLIDES.length
    setVisited((prevSet) => {
      if (prevSet.has(current) && prevSet.has(next)) return prevSet
      return new Set(prevSet).add(current).add(next)
    })
  }, [current])

  return (
    <div className="carousel" role="region" aria-label="Galería de combos">
      {/* Slides */}
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
                loading="eager"
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            )}
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        className="carousel-btn carousel-btn--prev"
        onClick={prev}
        aria-label="Imagen anterior"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="carousel-btn carousel-btn--next"
        onClick={next}
        aria-label="Siguiente imagen"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
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

function Caracas() {
  useEffect(() => {
    document.title = 'Tu Combo Perrero Caracas – Todo para tu comida rápida'
  }, [])

  return (
    <div className="page">
      {/* Cintillo oferta */}
      <div className="oferta-cintillo">
        <span>🔥 Oferta disponible hasta el domingo!</span>
        <span>🔥 Oferta disponible hasta el domingo!</span>
        <span>🔥 Oferta disponible hasta el domingo!</span>
      </div>

      {/* Ambient background blobs */}
      <div className="blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <main className="hero-section">

        {/* City Chip */}
        <div className="city-chip" aria-label="Sede Caracas">
          <span className="city-chip__pulse" aria-hidden="true" />
          <span className="city-chip__text">📍 CARACAS</span>
        </div>

        {/* Title */}
        <img src={tituloPng} width={1000} height={408} alt="Ahorra en combos y disfruta en compañía" className="hero-title-img" fetchPriority="high" decoding="async" />

        {/* Carousel */}
        <Carousel />

        {/* CTA */}
        <div className="cta-wrap">
          <a
            id="cta-yummy"
            className="cta-btn cta-btn--yummy"
            onClick={() => trackCTAClick('cta_principal')}
            href="https://yummysuperapp.onelink.me/pk3F/srbtbafr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pide por Yummy"
          >
            <svg className="yummy-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z"/>
            </svg>
            Pide por Yummy
          </a>
        </div>

        {/* Mockup 1 */}
        <div className="hero-mockup-wrap">
          <a
            href="https://yummysuperapp.onelink.me/pk3F/srbtbafr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('mockup_img')}
            aria-label="Pedir en Yummy"
            className="hero-mockup-link"
          >
            <img
              src={mocup1}
              alt="Tu Combo Perrero en Yummy"
              width={800}
              height={800}
              className="hero-mockup-img"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>

      </main>

      {/* Info block: ubicación + horario */}
      <section className="info-block" aria-label="Información del local">
        <div className="info-card">

          {/* Ubicación */}
          <div className="info-row">
            <span className="info-icon info-icon--brand" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </span>
            <div className="info-text">
              <p className="info-label">UBICACIÓN</p>
              <p className="info-detail">Caracas</p>
              <p className="info-detail">Edificio Fondo Común, frente a los quioscos de libros</p>
            </div>
          </div>

          <div className="info-divider" />

          {/* Horario */}
          <div className="info-row">
            <span className="info-icon info-icon--brand" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 11H11V7h1.5v5.25l4.5 2.67-.75 1.23L12.5 13z"/>
              </svg>
            </span>
            <div className="info-text">
              <p className="info-label">HORARIOS DE ATENCIÓN</p>
              <p className="info-detail">Lunes a Sábado: 8:30 am – 5:00 pm</p>
            </div>
          </div>

        </div>
      </section>


      {/* CTA final */}
      <section className="cta-final">
        <p className="cta-final__text">¿Listo para pedir?</p>
        <a
          id="cta-final-yummy"
          className="cta-btn cta-btn--yummy"
          onClick={() => trackCTAClick('cta_final')}
          href="https://yummysuperapp.onelink.me/pk3F/srbtbafr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pide por Yummy"
        >
          <svg className="yummy-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z"/>
          </svg>
          Pide por Yummy
        </a>
      </section>

      <footer className="footer">
        <p>© 2026 Tu Combo Perrero · Todos los derechos reservados</p>
      </footer>

      {/* Floating CTA Button */}
      <a
        href="https://yummysuperapp.onelink.me/pk3F/srbtbafr"
        className="floating-wa-btn floating-wa-btn--yummy"
        onClick={() => trackCTAClick('floating_button')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pide por Yummy"
      >
        <svg className="yummy-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z"/>
        </svg>
        <span className="floating-wa-text">Pide por Yummy</span>
      </a>
    </div>
  )
}

export default Caracas
