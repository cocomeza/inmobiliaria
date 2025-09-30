import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faScaleBalanced, faBriefcase, faHome, faKey, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default function Services() {
  return (
    <div className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="text-primary mb-3">Nuestros Servicios</h2>
          <p className="text-secondary lead">
            Ofrecemos una amplia gama de servicios inmobiliarios para satisfacer todas tus necesidades
          </p>
        </div>
        <Row className="g-4">
          <Col md={4}>
            <div className="text-center">
              <div className="service-icon mx-auto mb-3">
                <FontAwesomeIcon icon={faHome} />
              </div>
              <h5 className="text-primary mb-3">Venta de Propiedades</h5>
              <p className="text-secondary">
                Encontramos el comprador ideal para tu propiedad con el mejor precio del mercado.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <div className="service-icon mx-auto mb-3">
                <FontAwesomeIcon icon={faKey} />
              </div>
              <h5 className="text-primary mb-3">Alquileres</h5>
              <p className="text-secondary">
                Gestionamos el alquiler de tu propiedad con inquilinos confiables y seguros.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <div className="service-icon mx-auto mb-3">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h5 className="text-primary mb-3">Tasaciones</h5>
              <p className="text-secondary">
                Evaluamos el valor real de tu propiedad con métodos profesionales y actualizados.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <div className="service-icon mx-auto mb-3">
                <FontAwesomeIcon icon={faHandshake} />
              </div>
              <h5 className="text-primary mb-3">Asesoramiento</h5>
              <p className="text-secondary">
                Te acompañamos en cada paso del proceso con profesionalismo y transparencia.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <div className="service-icon mx-auto mb-3">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
              <h5 className="text-primary mb-3">Gestión Legal</h5>
              <p className="text-secondary">
                Nos encargamos de toda la documentación y trámites legales necesarios.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <div className="service-icon mx-auto mb-3">
                <FontAwesomeIcon icon={faScaleBalanced} />
              </div>
              <h5 className="text-primary mb-3">Inversiones</h5>
              <p className="text-secondary">
                Te ayudamos a encontrar oportunidades de inversión inmobiliaria rentables.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


