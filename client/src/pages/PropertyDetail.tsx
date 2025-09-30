import { useEffect, useState } from 'react'
import { useRoute } from 'wouter'
import { Container, Row, Col, Carousel, Spinner } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { apiRequest, getImageUrl } from '../lib/api'
import type { PropertyItem } from '../components/PropertyCard'

export default function PropertyDetail() {
  const [, params] = useRoute('/propiedad/:id')
  const [active, setActive] = useState(0)

  // Consulta específica para una propiedad por ID (más eficiente)
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['/api/properties', params?.id],
    queryFn: async (): Promise<PropertyItem> => {
      const res = await apiRequest(`/api/properties/${params?.id}`)
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }
      const p = await res.json()
      
      return {
        id: String(p._id || p.id || ''),
        title: p.title,
        description: p.description,
        priceUsd: typeof p.price === 'number' ? p.price : Number(p.priceUsd ?? 0) || 0,
        images: Array.isArray(p.images) ? p.images : [],
        type: p.type,
        status: p.status,
        address: p.address,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        featured: Boolean(p.featured)
      }
    },
    enabled: !!params?.id, // Solo ejecutar si hay un ID
    staleTime: 5 * 60 * 1000, // 5 minutos de caché para detalles
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (isLoading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <p>Cargando propiedad...</p>
        </div>
      </Container>
    )
  }

  if (error || !property) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Propiedad no encontrada</h2>
          <p>La propiedad que buscas no existe o ha sido eliminada.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col md={7}>
          {property.images?.length ? (
            <>
              <Carousel
                className="rounded overflow-hidden shadow-sm"
                activeIndex={active}
                onSelect={(idx) => setActive(idx)}
                controls
                indicators
                interval={4000}
                pause="hover"
                fade={false}
              >
                {property.images.map((src, idx) => (
                  <Carousel.Item key={idx}>
                    <img src={getImageUrl(src)} alt={`${property.title} ${idx + 1}`} className="d-block w-100" />
                  </Carousel.Item>
                ))}
              </Carousel>

              <div className="mt-3 d-flex gap-2 flex-wrap">
                {property.images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`p-0 border-0 bg-transparent ${active === idx ? 'opacity-100' : 'opacity-75'}`}
                    aria-label={`Ver imagen ${idx + 1}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={getImageUrl(src)}
                      alt={`thumb ${idx + 1}`}
                      style={{ width: 96, height: 64, objectFit: 'cover', borderRadius: 6, border: active === idx ? '2px solid var(--color-glacier)' : '2px solid transparent' }}
                    />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <img src={"https://placehold.co/1200x800/png"} alt={property.title} className="img-fluid rounded shadow-sm" />
          )}
          <div className="mt-3 text-secondary">{property.description}</div>
        </Col>
        <Col md={5}>
          <h1 className="h3">{property.title}</h1>
          <div className="mb-3">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(property.priceUsd)}</div>
          {/* Información de ubicación */}
          {property.address && (
            <div className="bg-light p-3 rounded mb-3">
              <h5 className="h6 text-muted mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                Ubicación
              </h5>
              <p className="mb-0">{property.address}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}


