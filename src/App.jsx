import { useState, useEffect, useCallback } from 'react'
import img1 from './assets/combos/1.png'
import img2 from './assets/combos/2.png'
import img3 from './assets/combos/3.png'
import img4 from './assets/combos/4.png'
import img5 from './assets/combos/5.png'
import img6 from './assets/combos/6.png'
import img7 from './assets/combos/7.png'
import logoImg from './assets/logo.png'
import logoHorizontal from './assets/logo horizontal tcp.png'
import brand1  from './assets/logos de marcas/1.png'
import brand2  from './assets/logos de marcas/2.png'
import brand3  from './assets/logos de marcas/3.png'
import brand4  from './assets/logos de marcas/4.png'
import brand6  from './assets/logos de marcas/6.png'
import brand7  from './assets/logos de marcas/7.png'
import brand8  from './assets/logos de marcas/8.png'
import brand9  from './assets/logos de marcas/9.png'
import brand10 from './assets/logos de marcas/10.png'
import brand11 from './assets/logos de marcas/11.png'
import brand12 from './assets/logos de marcas/12.jpg'
import ubicacion from './assets/ubicacion tcp.png'
import './App.css'

const BRANDS = [brand1, brand2, brand3, brand4, brand6, brand7, brand8, brand9, brand10, brand11, brand12]

function BrandStrip() {
  // Duplicate list so the scroll loop is seamless
  const doubled = [...BRANDS, ...BRANDS]
  return (
    <section className="brand-strip" aria-label="Marcas con las que trabajamos">
      <p className="brand-strip__label">Marcas con las que trabajamos</p>
      <div className="brand-strip__track-wrapper">
        <div className="brand-strip__track">
          {doubled.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Marca ${(i % BRANDS.length) + 1}`}
              className="brand-strip__logo"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const SLIDES = [
  { src: img1, alt: 'Combo Perrero 1' },
  { src: img2, alt: 'Combo Perrero 2' },
  { src: img3, alt: 'Combo Perrero 3' },
  { src: img4, alt: 'Combo Perrero 4' },
  { src: img5, alt: 'Combo Perrero 5' },
  { src: img6, alt: 'Combo Perrero 6' },
  { src: img7, alt: 'Combo Perrero 7' },
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

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

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
            <img
              src={slide.src}
              alt={slide.alt}
              className="carousel-img"
              draggable={false}
            />
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

function App() {
  return (
    <div className="page">
      {/* Ambient background blobs */}
      <div className="blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Navbar */}
      <header className="navbar">
        <img src={logoHorizontal} alt="Tu Combo Perrero" className="navbar-logo" />
      </header>

      <main className="hero-section">

        {/* Title */}
        <h1 className="hero-title">
          <span className="accent">Ahorra en combos</span>
          <br />
          y disfruta en compañía
        </h1>

        {/* Carousel */}
        <Carousel />

        {/* CTA */}
        <div className="cta-wrap">
          <a
            id="cta-whatsapp"
            className="cta-btn"
            href="https://wa.me/1234567890?text=Hola!%20Quiero%20hacer%20un%20pedido%20%F0%9F%8C%AD"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Comprar en WhatsApp"
          >
            <svg className="wa-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.655 4.83 1.8 6.855L2 30l7.345-1.776A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" fill="rgba(255,255,255,0.25)" />
              <path d="M22.5 19.5c-.35-.175-2.065-1.02-2.385-1.135-.32-.115-.553-.175-.785.175s-.9 1.135-1.103 1.368c-.203.232-.405.26-.755.085-.35-.175-1.478-.545-2.815-1.737-1.04-.927-1.743-2.072-1.947-2.422-.203-.35-.022-.54.153-.713.157-.156.35-.407.525-.61.175-.204.233-.35.35-.583.116-.233.058-.437-.03-.612-.087-.175-.785-1.893-1.075-2.593-.283-.68-.57-.588-.785-.598l-.668-.012c-.233 0-.612.087-.932.437-.32.35-1.223 1.195-1.223 2.913s1.252 3.38 1.427 3.612c.175.233 2.463 3.762 5.968 5.275.834.36 1.485.575 1.993.736.837.267 1.6.23 2.203.14.672-.1 2.065-.845 2.357-1.66.29-.815.29-1.515.203-1.66-.087-.146-.32-.232-.67-.407z" fill="#fff" />
            </svg>
            Comprar en WhatsApp
          </a>
          <span className="hint">Respuesta rápida · Pedidos al instante</span>
        </div>
      </main>

      {/* Brand strip */}
      <BrandStrip />

      {/* Ubicación */}
      <section className="ubicacion-section">
        <img
          src={ubicacion}
          alt="Nuestra ubicación"
          className="ubicacion-img"
        />
      </section>

      <footer className="footer">
        <p>© 2026 Tu Combo Perrero · Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default App
