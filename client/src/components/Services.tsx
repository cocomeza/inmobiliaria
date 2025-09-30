import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHandshake, faChartLine, faGavel, faKey, faFileContract } from '@fortawesome/free-solid-svg-icons'

export default function Services() {
  const services = [
    {
      icon: faHome,
      title: "Compra y Venta",
      description: "Asesoramiento integral en la compra y venta de propiedades. Tasaciones profesionales y análisis de mercado."
    },
    {
      icon: faKey,
      title: "Alquileres",
      description: "Gestión completa de alquileres. Contratos seguros y administración de propiedades."
    },
    {
      icon: faChartLine,
      title: "Inversiones",
      description: "Consultoría para inversores. Análisis de rentabilidad y oportunidades de negocio."
    },
    {
      icon: faGavel,
      title: "Asesoría Legal",
      description: "Respaldo jurídico en todas las operaciones. Verificación de documentación y escrituras."
    },
    {
      icon: faFileContract,
      title: "Gestión Integral",
      description: "Tramitación completa de documentación. Acompañamiento en todo el proceso."
    },
    {
      icon: faHandshake,
      title: "Atención Personalizada",
      description: "Servicio exclusivo adaptado a tus necesidades. Más de 20 años de experiencia en el mercado."
    }
  ]

  return (
    <section className="py-5" style={{ background: 'linear-gradient(135deg, #042644 0%, #418ebd 100%)' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="text-white mb-3">Nuestros Servicios</h2>
          <p className="text-white-50 lead">
            Soluciones integrales para todas tus necesidades inmobiliarias
          </p>
        </div>
        <Row className="g-4">
          {services.map((service, index) => (
            <Col key={index} md={6} lg={4} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="text-center">
                <div className="service-icon mb-3">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h5 className="text-white mb-3">{service.title}</h5>
                <p className="text-white-50">{service.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}


