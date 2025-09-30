import { Container } from 'react-bootstrap'

export default function Hero() {
  const heroImage = '/fotoHero.jpg'
  const bg = `url(${heroImage})`
  
  return (
    <div className="hero" style={{ backgroundImage: bg, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="hero-overlay">
        <Container className="hero-content">
          <h1 className="display-4 fw-bold mb-4">Inmobiliaria Ramallo</h1>
          <p className="lead mb-4">
            Tu hogar ideal te está esperando. Encontramos la propiedad perfecta para ti.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-primary btn-lg px-4">
              Ver Propiedades
            </button>
            <button className="btn btn-outline-light btn-lg px-4">
              Contactar
            </button>
          </div>
        </Container>
      </div>
    </div>
  )
}


