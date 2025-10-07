import { useEffect } from 'react'
import { apiRequest } from '../lib/api'

/**
 * Hook para "despertar" el backend en Render si está dormido
 * Hace una petición inicial al health check para activar el servidor
 */
export function useWarmupBackend() {
  useEffect(() => {
    const warmupBackend = async () => {
      try {
        // Hacer una petición al health check para despertar el servidor
        // No importa si falla, es solo para despertar el backend
        await apiRequest('/api/health', {
          signal: AbortSignal.timeout(5000) // Timeout de 5 segundos
        })
        console.log('✅ Backend ready')
      } catch (error) {
        // Ignorar errores, el warmup es solo un bonus
        console.log('⚠️ Backend warmup timeout (esto es normal en el primer acceso)')
      }
    }

    // Ejecutar el warmup solo una vez al cargar la app
    warmupBackend()
  }, [])
}

