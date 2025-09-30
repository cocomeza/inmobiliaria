/**
 * Utilidades para optimización de imágenes
 */

// Configuración de tamaños de imagen
export const IMAGE_SIZES = {
  thumbnail: { width: 300, height: 200 },
  card: { width: 400, height: 300 },
  detail: { width: 800, height: 600 },
  hero: { width: 1200, height: 800 }
} as const

// Generar URL optimizada para imágenes
export function getOptimizedImageUrl(
  originalUrl: string, 
  size: keyof typeof IMAGE_SIZES = 'card',
  quality: number = 80
): string {
  if (!originalUrl || originalUrl.includes('placehold.co')) {
    return originalUrl
  }

  // Si es una imagen de Unsplash, usar sus parámetros de optimización
  if (originalUrl.includes('unsplash.com')) {
    const { width, height } = IMAGE_SIZES[size]
    return `${originalUrl}&w=${width}&h=${height}&q=${quality}&fit=crop&auto=format`
  }

  // Si es una imagen local subida, mantener la URL original por ahora
  // En el futuro se podría implementar un servicio de redimensionamiento
  return originalUrl
}

// Precargar imagen crítica
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Hook para lazy loading con Intersection Observer
export function createLazyImageObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  }

  return new IntersectionObserver((entries) => {
    entries.forEach(callback)
  }, defaultOptions)
}

// Generar placeholder con dimensiones específicas
export function getPlaceholderUrl(
  size: keyof typeof IMAGE_SIZES = 'card',
  text: string = 'Cargando...'
): string {
  const { width, height } = IMAGE_SIZES[size]
  return `https://placehold.co/${width}x${height}/e9ecef/6c757d?text=${encodeURIComponent(text)}`
}