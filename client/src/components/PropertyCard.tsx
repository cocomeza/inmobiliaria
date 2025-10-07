import { memo, useState, useRef, useEffect } from 'react'
import { Card, Badge, Spinner } from 'react-bootstrap'
import { Link } from 'wouter'
import { getImageUrl } from '../lib/api'

export interface PropertyItem {
  id: string
  title: string
  description?: string
  priceUsd: number
  images: string[]
  type?: string
  status?: 'En venta' | 'En alquiler'
  address?: string
  bedrooms?: number
  bathrooms?: number
  featured?: boolean
}

interface PropertyCardProps {
  item: PropertyItem
}

function PropertyCard({ item }: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  const price = new Intl.NumberFormat('es-AR', { 
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 0 
  }).format(item.priceUsd)

  const cover = getImageUrl(item.images?.[0] || '/placeholder.jpg')

  // Lazy loading con Intersection Observer - más agresivo para cargar antes
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.01, // Detectar cuando solo el 1% es visible
        rootMargin: '200px' // Empezar a cargar 200px antes de que sea visible
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  return (
    <Link href={`/propiedad/${item.id}`}>
      <Card className="h-100 shadow-sm card-hover" data-aos="fade-up" as="div" role="button">
        <div style={{ position: 'relative' }} ref={imgRef}>
          {/* Mostrar spinner mientras carga */}
          {!imageLoaded && !imageError && (
            <div 
              className="d-flex align-items-center justify-content-center bg-light"
              style={{ height: '200px', position: imageLoaded ? 'absolute' : 'relative', width: '100%', top: 0 }}
            >
              <Spinner animation="border" size="sm" variant="secondary" />
            </div>
          )}
          
          {/* Imagen - cargar siempre, no solo cuando isInView */}
          <Card.Img 
            variant="top" 
            src={imageError ? 'https://placehold.co/400x300/f0f0f0/999999?text=Sin+imagen' : cover}
            alt={item.title} 
            className="card-img-responsive"
            style={{ 
              objectFit: 'cover', 
              height: '200px',
              width: '100%',
              display: imageLoaded || imageError ? 'block' : 'none'
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          
          <Badge bg="light" text="dark" className="position-absolute m-2 badge-status" style={{ top: 0, right: 0 }}>
            {item.status}
          </Badge>
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="mb-2 fs-5 fs-sm-4">{item.title}</Card.Title>
          <div className="text-muted small mb-2">{item.type}</div>
          <div className="fw-semibold text-armadillo mb-2 fs-6">{price}</div>
          
          <Card.Text className="mt-auto text-secondary small lh-sm" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '3.6em'
          }}>
            {item.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

// Memoizar el componente para evitar re-renders innecesarios
export default memo(PropertyCard)


