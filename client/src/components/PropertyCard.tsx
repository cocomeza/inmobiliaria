import { Card, Badge } from 'react-bootstrap'
import { Link } from 'wouter'
import { getImageUrl } from '../lib/api'
import { useState, useRef, useEffect } from 'react'
import { getOptimizedImageUrl, getPlaceholderUrl, createLazyImageObserver } from '../utils/imageOptimization'


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

// Hook personalizado para lazy loading optimizado
function useLazyImage(src: string, placeholder: string) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!src || isLoaded) return

    const observer = createLazyImageObserver((entry) => {
      if (entry.isIntersecting && !isLoaded) {
        const img = new Image()
        
        img.onload = () => {
          setImageSrc(src)
          setIsLoaded(true)
          setHasError(false)
        }
        
        img.onerror = () => {
          setImageSrc(placeholder)
          setIsLoaded(true)
          setHasError(true)
        }
        
        img.src = src
        observer.disconnect()
      }
    })

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [src, placeholder, isLoaded])

  return { imageSrc, imgRef, isLoaded, hasError }
}

export default function PropertyCard({ item }: { item: PropertyItem }) {
  const price = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.priceUsd)
  
  // Optimizar imagen para tarjetas
  const originalImageUrl = getImageUrl(item.images?.[0] || '')
  const optimizedImageUrl = getOptimizedImageUrl(originalImageUrl, 'card', 75)
  const placeholderUrl = getPlaceholderUrl('card', 'Cargando...')
  
  const { imageSrc, imgRef, isLoaded, hasError } = useLazyImage(optimizedImageUrl, placeholderUrl)
  
  return (
    <Link href={`/propiedad/${item.id}`}>
      <Card className="h-100 shadow-sm card-hover" data-aos="fade-up" as="div" role="button">
        <div style={{ position: 'relative' }}>
          <Card.Img 
            ref={imgRef}
            variant="top" 
            src={imageSrc} 
            alt={item.title} 
            className="card-img-responsive"
            style={{ 
              objectFit: 'cover', 
              height: '200px',
              width: '100%',
              transition: 'opacity 0.3s ease',
              opacity: isLoaded ? 1 : 0.7
            }} 
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


