import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-light py-5 mt-5">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h5 className="text-primary mb-3">Inmobiliaria Ramallo</h5>
            <p className="text-secondary">
              Tu socio de confianza en el mercado inmobiliario. 
              Encontramos la propiedad perfecta para ti.
            </p>
            <div className="d-flex gap-3">
              <a href="https://www.instagram.com/diegonadalbienesraices/" target="_blank" rel="noopener noreferrer" className="text-primary">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://www.facebook.com/diego.nadal" target="_blank" rel="noopener noreferrer" className="text-primary">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h6 className="text-primary mb-3">Contacto</h6>
            <div className="d-flex align-items-center mb-2">
              <FontAwesomeIcon icon={faPhone} className="text-primary me-2" />
              <span className="text-secondary">+54 9 11 1234-5678</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-primary me-2" />
              <span className="text-secondary">info@inmobiliariaramallo.com</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary me-2" />
              <span className="text-secondary">Ramallo, Buenos Aires</span>
            </div>
          </Col>
          <Col md={4}>
            <h6 className="text-primary mb-3">Servicios</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-1">Venta de propiedades</li>
              <li className="mb-1">Alquileres</li>
              <li className="mb-1">Tasaciones</li>
              <li className="mb-1">Asesoramiento legal</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row className="align-items-center">
          <Col md={6}>
            <small className="text-secondary">
              © {new Date().getFullYear()} Inmobiliaria Ramallo. Todos los derechos reservados.
            </small>
          </Col>
          <Col md={6} className="text-md-end">
            <small className="text-secondary">
              Desarrollado por{' '}
              <a href="https://botoncreativo.onrender.com" target="_blank" rel="noopener noreferrer" className="text-primary">
                Botón Creativo
              </a>
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}


