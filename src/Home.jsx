import brand1  from './assets/logos de marcas/1.webp'
import brand2  from './assets/logos de marcas/2.webp'
import brand3  from './assets/logos de marcas/3.webp'
import brand4  from './assets/logos de marcas/4.webp'
import brand6  from './assets/logos de marcas/6.webp'
import brand7  from './assets/logos de marcas/7.webp'
import brand8  from './assets/logos de marcas/8.webp'
import brand9  from './assets/logos de marcas/9.webp'
import brand10 from './assets/logos de marcas/10.webp'
import brand11 from './assets/logos de marcas/11.webp'
import brand12 from './assets/logos de marcas/12.webp'
import brand13 from './assets/logos de marcas/13.webp'
import ubicacion from './assets/ubicacion tcp.webp'
import tituloPng from './assets/titulo tcp.webp'
import prod1  from './assets/productos/1.webp'
import prod2  from './assets/productos/2.webp'
import prod3  from './assets/productos/3.webp'
import prod4  from './assets/productos/4.webp'
import prod5  from './assets/productos/5.webp'
import prod6  from './assets/productos/6.webp'
import prod7  from './assets/productos/7.webp'
import prod8  from './assets/productos/8.webp'
import prod9  from './assets/productos/9.webp'
import prod10 from './assets/productos/10.webp'
import prod11 from './assets/productos/11.webp'
import prod12 from './assets/productos/12.webp'
import Carousel from './components/Carousel.jsx'
import Picture from './components/Picture.jsx'
import { SIZES } from './imageSizes.js'
import { WhatsAppIcon, PinIcon, ClockIcon } from './components/icons.jsx'
import { WHATSAPP_URL, trackLead } from './constants.js'
import './App.css'

const trackWhatsAppClick = (location) =>
  trackLead({ content_name: 'WhatsApp CTA', cta_location: location })

// [src, width, height] — dimensiones intrínsecas para evitar saltos de layout (CLS)
const BRANDS = [
  [brand1, 300, 196], [brand2, 300, 197], [brand3, 300, 172], [brand4, 300, 184],
  [brand6, 300, 176], [brand7, 300, 300], [brand8, 300, 190], [brand9, 300, 300],
  [brand10, 300, 300], [brand11, 300, 300], [brand12, 300, 300], [brand13, 300, 232],
]

function BrandStrip() {
  // Duplicate list so the scroll loop is seamless (la copia es decorativa)
  const doubled = [...BRANDS, ...BRANDS]
  return (
    <section className="brand-strip" aria-label="Marcas con las que trabajamos">
      <p className="brand-strip__label">Marcas con las que trabajamos</p>
      <div className="brand-strip__track-wrapper">
        <div className="brand-strip__track">
          {doubled.map(([src, width, height], i) => {
            const isCopy = i >= BRANDS.length
            return (
              <img
                key={i}
                src={src}
                width={width}
                height={height}
                alt={isCopy ? '' : `Marca ${i + 1}`}
                aria-hidden={isCopy || undefined}
                className="brand-strip__logo"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

const PHOTOS = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12]

function PhotoStrip() {
  const doubled = [...PHOTOS, ...PHOTOS]
  return (
    <section className="photo-strip" aria-label="Galería de fotos">
      <p className="photo-strip__label">Nuestros Productos</p>
      <div className="photo-strip__track-wrapper">
        <div className="photo-strip__track">
          {doubled.map((src, i) => {
            const isCopy = i >= PHOTOS.length
            return (
              <img
                key={i}
                src={src}
                width={400}
                height={533}
                alt={isCopy ? '' : `Producto ${i + 1}`}
                aria-hidden={isCopy || undefined}
                className="photo-strip__img"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Home() {
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

        {/* Title */}
        <Picture avif="titulo" sizes={SIZES.titulo} src={tituloPng} width={1000} height={408} alt="Ahorra en combos y disfruta en compañía" className="hero-title-img" fetchPriority="high" />

        {/* Carousel */}
        <Carousel interval={4000} />

        {/* CTA */}
        <div className="cta-wrap">
          <a
            id="cta-whatsapp"
            className="cta-btn"
            onClick={() => trackWhatsAppClick('cta_principal')}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Comprar en WhatsApp"
          >
            <WhatsAppIcon />
            Comprar en WhatsApp
          </a>
        </div>

        {/* Photo strip de productos */}
        {/* <PhotoStrip /> */}

      </main>

      {/* Brand strip */}
      <div className="brand-heading-wrap">
        <h2 className="brand-heading">Todo lo que necesitas para tu negocio de comida rápida</h2>
      </div>
      {/* <BrandStrip /> */}

      {/* Ubicación */}
      <section className="ubicacion-section">
        <h2 className="ubicacion-visita">¡Visítanos hoy!</h2>
        <img
          src={ubicacion}
          alt="Nuestra ubicación"
          className="ubicacion-img"
          width={1000}
          height={752}
          loading="lazy"
          decoding="async"
        />
        <div className="ubicacion-card">
          <div className="ubicacion-header">
            <span className="ubicacion-icon">📍</span>
            <h2 className="ubicacion-title">Maracay — Centro</h2>
            <a
              className="ubicacion-directions-btn"
              href="https://www.google.com/maps/dir/?api=1&destination=Tu+Combo+Perrero,+7C22%2BVWH,+Maracay+2101,+Aragua"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar →
            </a>
          </div>
          <div className="map-wrapper">
            <iframe
              title="Ubicación Tu Combo Perrero"
              src="https://maps.google.com/maps?q=7C22%2BVWH+Maracay+2101+Aragua+Venezuela&output=embed&hl=es&z=17"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Info block: ubicación + horario */}
      <section className="info-block" aria-label="Información del local">
        <div className="info-card">

          {/* Ubicación */}
          <div className="info-row">
            <span className="info-icon info-icon--red" aria-hidden="true">
              <PinIcon />
            </span>
            <div className="info-text">
              <p className="info-label">UBICACIÓN</p>
              <p className="info-detail">Maracay — Centro</p>
              <p className="info-detail">Calle Santo Michelena / Sucre</p>
            </div>
          </div>

          <div className="info-divider" />

          {/* Horario */}
          <div className="info-row">
            <span className="info-icon info-icon--red" aria-hidden="true">
              <ClockIcon />
            </span>
            <div className="info-text">
              <p className="info-label">HORARIOS DE ATENCIÓN</p>
              <p className="info-detail">Lunes a Sábado: 8:30 am – 5:00 pm</p>
              <p className="info-detail">Domingos: 9:00 am – 1:00 pm</p>
            </div>
          </div>

        </div>
      </section>


      {/* CTA final */}
      <section className="cta-final">
        <p className="cta-final__text">¿Listo para pedir?</p>
        <a
          className="cta-btn"
          onClick={() => trackWhatsAppClick('cta_final')}
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Comprar en WhatsApp"
        >
          <WhatsAppIcon />
          Comprar en WhatsApp
        </a>
      </section>

      <footer className="footer">
        <p>© 2026 Tu Combo Perrero · Todos los derechos reservados</p>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        className="floating-wa-btn"
        onClick={() => trackWhatsAppClick('floating_button')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon />
        <span className="floating-wa-text">Escríbenos por WhatsApp</span>
      </a>
    </div>
  )
}

export default Home
