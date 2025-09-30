/**
 * Configuración de rendimiento para la aplicación
 */

// Configuración de React Query
export const QUERY_CONFIG = {
  // Tiempos de caché
  staleTime: {
    properties: 2 * 60 * 1000, // 2 minutos
    featured: 5 * 60 * 1000,   // 5 minutos
    property: 10 * 60 * 1000,  // 10 minutos
  },
  
  // Configuración de retry
  retry: {
    count: 2,
    delay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
  
  // Configuración de refetch
  refetch: {
    onWindowFocus: false,
    onMount: false,
    onReconnect: true,
  }
} as const

// Configuración de paginación
export const PAGINATION_CONFIG = {
  itemsPerPage: 12,
  maxItemsPerPage: 50,
  preloadNextPage: true,
} as const

// Configuración de lazy loading
export const LAZY_LOADING_CONFIG = {
  threshold: 0.1,
  rootMargin: '50px',
  imageQuality: 75,
} as const

// Configuración de debounce para búsquedas
export const SEARCH_CONFIG = {
  debounceMs: 300,
  minQueryLength: 2,
} as const

// Métricas de rendimiento
export const PERFORMANCE_METRICS = {
  // Tiempo máximo aceptable para cargar propiedades (ms)
  maxLoadTime: 3000,
  
  // Número máximo de propiedades a renderizar sin virtualización
  maxItemsWithoutVirtualization: 100,
  
  // Tamaño máximo de imagen en KB
  maxImageSize: 500,
} as const

// Utilidad para medir rendimiento
export function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now()
  
  return fn().then(result => {
    const end = performance.now()
    const duration = end - start
    
    console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`)
    
    if (duration > PERFORMANCE_METRICS.maxLoadTime) {
      console.warn(`⚠️ ${name} tardó más de lo esperado: ${duration.toFixed(2)}ms`)
    }
    
    return result
  })
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}