import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'wouter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function About() {
  const features = [
    "Más de 20 años de experiencia en el mercado",
    "Atención personalizada y profesional",
    "Amplia cartera de propiedades en Ramallo y zona",
    "Asesoramiento legal y financiero integral"
  ]

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6} data-aos="fade-right">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
                alt="Diego Nadal Bienes Raíces"
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
              />
              <div className="position-absolute bottom-0 start-0 m-3 bg-white rounded p-3 shadow">
                <h5 className="mb-1 text-boston">+20 años</h5>
                <small className="text-muted">de experiencia</small>
              </div>
            </div>
          </Col>
          <Col lg={6} data-aos="fade-left">
            <h2 className="mb-4">Sobre Diego Nadal Bienes Raíces</h2>
            <p className="text-muted mb-4">
              Con más de dos décadas de trayectoria en el mercado inmobiliario de Ramallo y la región, 
              nos hemos consolidado como referentes en el sector, brindando soluciones integrales 
              y personalizadas para cada cliente.
            </p>
            <p className="text-muted mb-4">
              Nuestro compromiso es acompañarte en cada paso del proceso, desde la búsqueda inicial 
              hasta la concreción de tu objetivo, ya sea comprar, vender, alquilar o invertir en propiedades.
            </p>
            
            <ul className="list-unstyled mb-4">
              {features.map((feature, index) => (
                <li key={index} className="mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                  <span className="text-muted">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="d-flex gap-3 flex-wrap">
              <Button as={Link} href="/propiedades" size="lg" className="btn-primary">
                Ver Propiedades
              </Button>
              <Button as={Link} href="/contacto" size="lg" variant="outline-primary">
                Contactanos
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}


