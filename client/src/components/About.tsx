import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'wouter'

export default function About() {
  return (
    <div className="py-5">
      <Container>
        <Row className="align-items-center g-4">
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
              alt="Oficina de Inmobiliaria Ramallo"
              className="img-fluid rounded shadow-sm"
            />
          </Col>
          <Col md={6}>
            <h2 className="text-primary mb-4">Sobre Nosotros</h2>
            <p className="text-secondary mb-4">
              Somos una inmobiliaria con más de 10 años de experiencia en Ramallo y la región. 
              Nuestro compromiso es brindar un servicio profesional, transparente y personalizado 
              para ayudarte a encontrar la propiedad ideal o vender tu inmueble al mejor precio.
            </p>
            <p className="text-secondary mb-4">
              Conocemos el mercado local como nadie y trabajamos con pasión para hacer realidad 
              tus sueños inmobiliarios. Nuestro equipo de profesionales está siempre disponible 
              para asesorarte en cada paso del proceso.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Button as={Link} href="/propiedades" variant="primary" size="lg">
                Ver Propiedades
              </Button>
              <Button as={Link} href="/contacto" variant="outline-primary" size="lg">
                Contactanos
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


