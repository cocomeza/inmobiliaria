import { Container } from 'react-bootstrap'

export default function Hero() {
  const heroImage = (import.meta as any).env?.VITE_HERO_IMAGE_URL || 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1920&auto=format&fit=crop'
  const bg = `url(${heroImage})`
  return (
    <div className="hero" style={{ backgroundImage: bg, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-100 hero-overlay py-4 py-md-5">
        {/* Solo imagen de fondo, sin títulos ni textos */}
      </div>
    </div>
  )
}


