import { useEffect } from 'react'
import tituloPng from './assets/titulo tcp.webp'
import mocup1 from './assets/mocup 1.webp'
import Carousel from './components/Carousel.jsx'
import { BagIcon, ArrowIcon, PinIcon, ClockIcon } from './components/icons.jsx'
import { YUMMY_URL, trackLead } from './constants.js'
import './App.css'

const trackCTAClick = (location) =>
  trackLead({ content_name: 'Pide por Yummy', cta_location: location, city: 'caracas' })

function Caracas() {
  useEffect(() => {
    document.title = 'Tu Combo Perrero Caracas – Pide por Yummy 🛵'
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Tu Combo Perrero en Caracas: pide tus combos para hot dogs y hamburguesas con delivery por Yummy.')
  }, [])

  return (
    <div className="page page--caracas">

      {/* Cintillo oferta */}
      <div className="oferta-cintillo">
        <span>🛵 ¡Pide delivery por Yummy!</span>
        <span>🛵 ¡Pide delivery por Yummy!</span>
        <span>🛵 ¡Pide delivery por Yummy!</span>
      </div>

      {/* Fondo decorativo */}
      <div className="caracas-bg" aria-hidden="true">
        <div className="caracas-blob cb-1" />
        <div className="caracas-blob cb-2" />
        <div className="caracas-blob cb-3" />
      </div>

      <main className="hero-section">

        {/* City Chip */}
        <div className="city-chip" aria-label="Sede Caracas">
          <span className="city-chip__pulse" aria-hidden="true" />
          <span className="city-chip__text">📍 CARACAS</span>
        </div>

        {/* Título */}
        <img
          src={tituloPng}
          width={1000}
          height={408}
          alt="Tu Combo Perrero – Ahorra en combos y disfruta en compañía"
          className="hero-title-img"
          fetchPriority="high"
          decoding="async"
          loading="eager"
        />

        {/* Carrusel */}
        <Carousel />

        {/* CTA Principal */}
        <div className="cta-wrap">
          <a
            id="cta-yummy"
            className="cta-btn cta-btn--yummy"
            onClick={() => trackCTAClick('cta_principal')}
            href={YUMMY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pide por Yummy"
          >
            <BagIcon />
            <span>Pide por Yummy</span>
            <ArrowIcon />
          </a>
          <p className="cta-hint">🚀 Delivery rápido en toda Caracas</p>
        </div>

        {/* Mockup */}
        <div className="hero-mockup-wrap">
          <a
            href={YUMMY_URL}
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

      {/* Info block */}
      <section className="info-block" aria-label="Información del local" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 200px' }}>
        <div className="info-card info-card--caracas">

          <div className="info-row">
            <span className="info-icon info-icon--brand" aria-hidden="true">
              <PinIcon />
            </span>
            <div className="info-text">
              <p className="info-label">UBICACIÓN</p>
              <p className="info-detail info-detail--strong">Caracas</p>
              <p className="info-detail">Edificio Fondo Común, frente a los quioscos de libros</p>
            </div>
          </div>

          <div className="info-divider" />

          <div className="info-row">
            <span className="info-icon info-icon--brand" aria-hidden="true">
              <ClockIcon />
            </span>
            <div className="info-text">
              <p className="info-label">HORARIOS</p>
              <p className="info-detail">Lunes a Sábado: 8:30 am – 5:00 pm</p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-final" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 160px' }}>
        <p className="cta-final__text">¿Listo para pedir? 🔥</p>
        <a
          id="cta-final-yummy"
          className="cta-btn cta-btn--yummy"
          onClick={() => trackCTAClick('cta_final')}
          href={YUMMY_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pide por Yummy"
        >
          <BagIcon />
          <span>Pide por Yummy</span>
          <ArrowIcon />
        </a>
      </section>

      <footer className="footer footer--caracas">
        <p>© 2026 Tu Combo Perrero · Caracas 🛵 Yummy</p>
      </footer>

      {/* Floating CTA */}
      <a
        href={YUMMY_URL}
        className="floating-wa-btn floating-wa-btn--yummy"
        onClick={() => trackCTAClick('floating_button')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pide por Yummy"
      >
        <BagIcon />
        <span className="floating-wa-text">Pide por Yummy</span>
      </a>
    </div>
  )
}

export default Caracas
