import { Container } from 'react-bootstrap'

export default function Hero() {
  // Imagen original enviada por el usuario (ahora en public)
  const heroImage = '/fotoHero.jpg'
  const bg = `url(${heroImage})`
  return (
    <div className="hero" style={{ backgroundImage: bg, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Solo imagen de fondo, sin overlay */}
    </div>
  )
}


