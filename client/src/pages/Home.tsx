import { Container, Row, Col } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import PropertyCard from '../components/PropertyCard'
import type { PropertyItem } from '../components/PropertyCard'
import { apiRequest } from '../lib/api'
import { QUERY_CONFIG } from '../config/performance'

export default function Home() {
  // Usar endpoint específico para propiedades destacadas
  const { data: properties = [] } = useQuery({
    queryKey: ['/api/properties/featured'],
    queryFn: async () => {
      const res = await apiRequest('/api/properties/featured?limit=6')
      const raw = await res.json()
      
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
      
      return mapped.filter(p => Boolean(p.id))
    },
    staleTime: QUERY_CONFIG.staleTime.featured,
  })

  // Mostrar las primeras 3 propiedades (ya filtradas como destacadas en el backend)
  const featured = properties.slice(0, 3)
  
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


