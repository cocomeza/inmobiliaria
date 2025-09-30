import { Container, Row, Col, Spinner } from 'react-bootstrap'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import PropertyCard from '../components/PropertyCard'
import { useFeaturedProperties } from '../hooks/useProperties'

export default function Home() {
  // Usar el hook optimizado para propiedades destacadas
  const { data, isLoading, error } = useFeaturedProperties(6)
  
  return (
    <>
      <Hero />
      <Container className="py-4 py-md-5">
        <h2 className="mb-3 mb-md-4 text-center text-md-start">Propiedades destacadas</h2>
        <Row className="g-3 g-md-4">
          {isLoading ? (
            <Col xs={12} className="text-center py-4">
              <Spinner animation="border" variant="primary" className="mb-3" />
              <p>Cargando propiedades destacadas...</p>
            </Col>
          ) : error ? (
            <Col xs={12} className="text-center py-4">
              <p className="text-muted">No se pudieron cargar las propiedades destacadas.</p>
            </Col>
          ) : data?.properties && data.properties.length > 0 ? (
            data.properties.slice(0, 3).map((property) => (
              <Col key={property.id} xs={12} sm={6} lg={4}>
                <PropertyCard item={property} />
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center py-4">
              <p className="text-muted">No hay propiedades destacadas disponibles.</p>
            </Col>
          )}
        </Row>
      </Container>
      <Services />
      <About />
    </>
  )
}


