import { Container, Row, Col, Button } from 'react-bootstrap'

export default function About() {
  return (
    <div className="py-5 bg-chino">
      <Container>
        <Row className="align-items-center g-4">
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
              alt="Oficina"
              className="img-fluid rounded shadow-sm"
            />
          </Col>
          <Col md={6}>
            <h2 className="mb-3">Nosotros</h2>
            <p className="text-secondary">
              Somos una inmobiliaria de Ramallo con trato humano, profesional y transparente. Nuestro objetivo es
              ayudarte a encontrar la propiedad ideal y acompañarte en cada decisión.
            </p>
            <Button className="btn-glacier">Conocé nuestras propiedades</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


