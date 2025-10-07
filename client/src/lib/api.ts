/**
 * Configuración de la URL base del API
 * En desarrollo: usa rutas relativas (proxy de Vite)
 * En producción: usa rutas relativas (mismo dominio)
 */
export function getApiUrl(): string {
  // Si hay VITE_API_URL definida, usarla (para casos especiales)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // Siempre usar rutas relativas para que funcione el proxy
  return ''
}

/**
 * Helper para hacer requests al API con la URL correcta
 */
export async function apiRequest(endpoint: string, options?: RequestInit) {
  const baseUrl = getApiUrl()
  const url = `${baseUrl}${endpoint}`
  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  })
}

/**
 * Helper para convertir URLs relativas de imágenes a URLs completas del backend
 */
export function getImageUrl(imagePath: string): string {
  if (!imagePath) return 'https://placehold.co/800x600/png'
  
  // Si es una URL de Unsplash, optimizarla para carga rápida
  if (imagePath.includes('unsplash.com')) {
    // Agregar parámetros de optimización si no los tiene
    const url = new URL(imagePath)
    if (!url.searchParams.has('w')) {
      url.searchParams.set('w', '600') // Ancho máximo para tarjetas
      url.searchParams.set('q', '80') // Calidad 80%
      url.searchParams.set('fm', 'webp') // Formato WebP (más ligero)
      url.searchParams.set('fit', 'crop') // Recortar para ajustar
    }
    return url.toString()
  }
  
  // Si ya es una URL completa (placeholder, etc.), devolverla tal como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // En desarrollo: usar proxy de Vite para servir imágenes desde el backend
  // En producción: usar la URL base del API
  const baseUrl = getApiUrl()
  
  // Si no hay base URL (desarrollo con proxy), las imágenes también usan proxy
  if (!baseUrl) {
    return imagePath // Proxy maneja /uploads/...
  }
  
  // En producción: URL completa del backend
  return `${baseUrl}${imagePath}`
}