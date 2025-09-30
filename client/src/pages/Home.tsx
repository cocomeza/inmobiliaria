import { Container, Row, Col } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import PropertyCard from '../components/PropertyCard'
import type { PropertyItem } from '../components/PropertyCard'
import { apiRequest } from '../lib/api'

export default function Home() {
  // Usar API en lugar de archivo estático para mostrar propiedades actualizadas
  const { data: properties = [] } = useQuery({
    queryKey: ['/api/properties'],
    queryFn: async () => {
      const res = await apiRequest('/api/properties')
      const raw = await res.json() as any[]
      // Mapear desde el backend (price, _id) al shape del cliente (priceUsd, id)
      const mapped: PropertyItem[] = (raw || []).map((p: any) => ({
        id: String(p.id || p._id || ''),
        title: p.title,
        description: p.description,
        priceUsd: typeof p.priceUsd === 'number' ? p.priceUsd : Number(p.price ?? 0) || 0,
        images: Array.isArray(p.images) ? p.images : [],
        type: p.type,
        status: p.status,
        address: p.address,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        featured: Boolean(p.featured)
      }))
      // Filtrar items sin id válido
      return mapped.filter(p => Boolean(p.id))
    }
  })

  // Mostrar propiedades destacadas o las primeras 3 si no hay destacadas
  const featuredList = properties.filter(p => p.featured)
  const featured = featuredList.length > 0 ? featuredList.slice(0, 3) : properties.slice(0, 3)
  
  return (
    <>
      <Hero />
      <Container className="py-4 py-md-5">
        <h2 className="mb-3 mb-md-4 text-center text-md-start">Propiedades destacadas</h2>
        <Row className="g-3 g-md-4">
          {featured.map((p, idx) => (
            <Col key={`${p.id}-${idx}`} xs={12} sm={6} lg={4}>
              <PropertyCard item={p} />
            </Col>
          ))}
        </Row>
      </Container>
      <Services />
      <About />
    </>
  )
}


