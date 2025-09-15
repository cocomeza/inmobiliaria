import { useEffect, useState } from 'react'
import { useRoute } from 'wouter'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { apiRequest, getImageUrl } from '../lib/api'
import type { PropertyItem } from '../components/PropertyCard'


export default function PropertyDetail() {
  const [, params] = useRoute('/propiedad/:id')
  // Los hooks deben declararse antes de cualquier return condicional
  const [active, setActive] = useState(0)

  // Usar API para obtener propiedades actualizadas y mapear al shape del cliente
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['/api/properties'],
    queryFn: async () => {
      const res = await apiRequest('/api/properties')
      const raw = await res.json() as any[]
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
    }
  })

  const item = properties.find((p) => p.id === params?.id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (isLoading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando propiedad...</p>
        </div>
      </Container>
    )
  }

  if (!item) {
    return (
      <Container className="py-5">
        <h1>Propiedad no encontrada</h1>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col md={7}>
          {item.images?.length ? (
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
                {item.images.map((src, idx) => (
                  <Carousel.Item key={idx}>
                    <img src={getImageUrl(src)} alt={`${item.title} ${idx + 1}`} className="d-block w-100" />
                  </Carousel.Item>
                ))}
              </Carousel>

              <div className="mt-3 d-flex gap-2 flex-wrap">
                {item.images.map((src, idx) => (
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
            <img src={"https://placehold.co/1200x800/png"} alt={item.title} className="img-fluid rounded shadow-sm" />
          )}
          <div className="mt-3 text-secondary">{item.description}</div>
        </Col>
        <Col md={5}>
          <h1 className="h3">{item.title}</h1>
          <div className="mb-3">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.priceUsd)}</div>
          {/* Información de ubicación */}
          {item.address && (
            <div className="bg-light p-3 rounded mb-3">
              <h5 className="h6 text-muted mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                Ubicación
              </h5>
              <p className="mb-0">{item.address}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}


