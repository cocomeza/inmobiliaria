import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faScaleBalanced, faBriefcase } from '@fortawesome/free-solid-svg-icons'

export default function Services() {
  return (
    <div className="py-5" style={{ background: '#042644' }}>
  <Container>
    <h2 className="text-white mb-4">Servicios</h2>
    <Row className="g-4">
      <Col md={4}>
        <div className="service-icon mb-3"><FontAwesomeIcon icon={faHandshake} /></div>
        <h5 className="text-white">Pasión</h5>
        <p className="text-white-50">Acompañamos cada operación con cercanía y compromiso.</p>
      </Col>
      <Col md={4}>
        <div className="service-icon mb-3"><FontAwesomeIcon icon={faBriefcase} /></div>
        <h5 className="text-white">Profesionalismo</h5>
        <p className="text-white-50">Gestiones claras, seguras y eficientes en todo momento.</p>
      </Col>
      <Col md={4}>
        <div className="service-icon mb-3"><FontAwesomeIcon icon={faScaleBalanced} /></div>
        <h5 className="text-white">Honestidad</h5>
        <p className="text-white-50">Transparencia y confianza como pilares del servicio.</p>
      </Col>
    </Row>
  </Container>
</div>
  )
}


