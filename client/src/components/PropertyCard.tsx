import { Card, Badge } from 'react-bootstrap'
import { Link } from 'wouter'
import { getImageUrl } from '../lib/api'
import { useState, useEffect, useRef } from 'react'


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

export default function PropertyCard({ item }: { item: PropertyItem }) {
  const price = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.priceUsd)
  const cover = getImageUrl(item.images?.[0] || '/placeholder.jpg')
  
  // Lazy loading de imágenes
  const [imageSrc, setImageSrc] = useState<string>('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg==')
  const [isLoading, setIsLoading] = useState(true)
  const imgRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Pre-cargar la imagen
            const img = new Image()
            img.src = cover
            img.onload = () => {
              setImageSrc(cover)
              setIsLoading(false)
            }
            img.onerror = () => {
              setImageSrc('https://placehold.co/800x600/png')
              setIsLoading(false)
            }
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )
    
    if (imgRef.current) {
      observer.observe(imgRef.current)
    }
    
    return () => observer.disconnect()
  }, [cover])
  
  return (
    <Link href={`/propiedad/${item.id}`}>
      <Card className="h-100 shadow-sm card-hover" data-aos="fade-up" as="div" role="button">
        <div ref={imgRef} style={{ position: 'relative' }}>
          <Card.Img 
            variant="top" 
            src={imageSrc} 
            alt={item.title} 
            className={`card-img-responsive ${isLoading ? 'opacity-50' : ''}`}
            style={{ 
              objectFit: 'cover', 
              height: '200px',
              width: '100%',
              transition: 'opacity 0.3s ease-in-out'
            }} 
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


