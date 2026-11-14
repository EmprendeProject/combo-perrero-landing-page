import { useEffect } from 'react'
import tituloPng from './assets/titulo tcp.webp'
import mocup1 from './assets/mocup 1.webp'
import Carousel from './components/Carousel.jsx'
import Picture from './components/Picture.jsx'
import { SIZES } from './imageSizes.js'
import { BagIcon, ArrowIcon, PinIcon, ClockIcon } from './components/icons.jsx'
import { YUMMY_URL, trackLead } from './constants.js'
import './App.css'
import './yummy.css'

// Datos de cada sede. Para agregar otra ciudad: añadir una entrada aquí y su ruta en App.jsx
const CITIES = {
  caracas: {
    name: 'Caracas',
    address: ['Caracas', 'Edificio Fondo Común, frente a los quioscos de libros'],
    hours: ['Lunes a Sábado: 8:30 am – 5:00 pm'],
  },
  maracay: {
    name: 'Maracay',
    address: ['Maracay — Centro', 'Calle Santo Michelena / Sucre'],
    hours: ['Lunes a Sábado: 8:30 am – 5:00 pm', 'Domingos: 9:00 am – 1:00 pm'],
  },
}

function YummyLanding({ city }) {
  const { name, address, hours } = CITIES[city]

  const trackCTAClick = (location) =>
    trackLead({ content_name: 'Pide por Yummy', cta_location: location, city })

  useEffect(() => {
    document.title = `Tu Combo Perrero ${name} – Pide por Yummy 🛵`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', `Tu Combo Perrero en ${name}: pide tus combos para hot dogs y hamburguesas con delivery por Yummy.`)
  }, [name])

  return (
    <div className="page page--yummy">

      {/* Cintillo oferta */}
      <div className="oferta-cintillo">
        <span>🛵 ¡Pide delivery por Yummy!</span>
        <span>🛵 ¡Pide delivery por Yummy!</span>
        <span>🛵 ¡Pide delivery por Yummy!</span>
      </div>

      {/* Fondo decorativo */}
      <div className="y-bg" aria-hidden="true">
        <div className="y-blob y-blob--1" />
        <div className="y-blob y-blob--2" />
        <div className="y-blob y-blob--3" />
      </div>

      <main className="hero-section">

        {/* City Chip */}
        <div className="city-chip" aria-label={`Sede ${name}`}>
          <span className="city-chip__pulse" aria-hidden="true" />
          <span className="city-chip__text">{name}</span>
        </div>

        {/* Título */}
        <Picture
          avif="titulo"
          sizes={SIZES.titulo}
          src={tituloPng}
          width={1000}
          height={408}
          alt="Tu Combo Perrero – Ahorra en combos y disfruta en compañía"
          className="hero-title-img"
          fetchPriority="high"
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
          <ul className="y-perks" aria-label="Beneficios">
            <li>🛵 Delivery rápido en {name}</li>
            <li>🔥 Combos de ahorro</li>
          </ul>
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
            <Picture
              avif="mocup"
              sizes={SIZES.mocup}
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
        <div className="info-card info-card--yummy">

          <div className="info-row">
            <span className="info-icon info-icon--brand" aria-hidden="true">
              <PinIcon />
            </span>
            <div className="info-text">
              <p className="info-label">UBICACIÓN</p>
              <p className="info-detail info-detail--strong">{address[0]}</p>
              <p className="info-detail">{address[1]}</p>
            </div>
          </div>

          <div className="info-divider" />

          <div className="info-row">
            <span className="info-icon info-icon--brand" aria-hidden="true">
              <ClockIcon />
            </span>
            <div className="info-text">
              <p className="info-label">HORARIOS</p>
              {hours.map((h) => (
                <p key={h} className="info-detail">{h}</p>
              ))}
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

      <footer className="footer footer--yummy">
        <p>© 2026 Tu Combo Perrero · {name} 🛵 Yummy</p>
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

export default YummyLanding
