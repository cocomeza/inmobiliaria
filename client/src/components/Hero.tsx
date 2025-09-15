import { Container } from 'react-bootstrap'

export default function Hero() {
  const bg = 'url(/fotoHero.jpeg)'
  return (
    <div className="hero" style={{ backgroundImage: bg }}>
      <div className="w-100 hero-overlay py-4 py-md-5">
        <Container className="py-3 py-md-5 text-white">
          <h1 className="display-6 display-md-5 fw-semibold mb-3 mb-md-4">
            <span className="d-none d-md-inline">Inmobiliaria cercana y profesional</span>
            <span className="d-md-none">Inmobiliaria profesional</span>
          </h1>
          <p className="lead mb-4 fs-6 fs-md-5" style={{ maxWidth: '100%' }}>
            <span className="d-none d-md-inline">
              Conocé nuestras propiedades y recibí asesoramiento personalizado para comprar, vender o alquilar en Ramallo.
            </span>
            <span className="d-md-none">
              Propiedades en Ramallo y alrededores. Asesoramiento personalizado para comprar, vender o alquilar.
            </span>
          </p>
        </Container>
      </div>
    </div>
  )
}


