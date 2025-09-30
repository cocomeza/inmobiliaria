import { Container, Button } from 'react-bootstrap'
import { Link } from 'wouter'

export default function Hero() {
  const heroImage = '/fotoHero.jpg'
  const bg = `url(${heroImage})`
  
  return (
    <div className="hero" style={{ backgroundImage: bg }}>
      <div className="hero-overlay">
        <Container>
          <div className="text-white">
            <h1 className="display-4 fw-bold mb-3">
              Tu hogar ideal te está esperando
            </h1>
            <p className="lead mb-4">
              Más de 20 años ayudando a familias a encontrar la propiedad perfecta en Ramallo y alrededores
            </p>
            <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-md-start">
              <Button as={Link} href="/propiedades" size="lg" className="btn-primary">
                Ver Propiedades
              </Button>
              <Button as={Link} href="/contacto" size="lg" variant="outline-light">
                Contactanos
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}


