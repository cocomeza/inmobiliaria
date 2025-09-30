import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import 'leaflet/dist/leaflet.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Los datos se consideran frescos por 5 minutos
      gcTime: 1000 * 60 * 10, // Mantener en cache por 10 minutos (anteriormente cacheTime)
      refetchOnWindowFocus: false, // No refrescar automáticamente al cambiar de ventana
      retry: 1, // Solo reintentar una vez en caso de error
      retryDelay: 1000, // Esperar 1 segundo antes de reintentar
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
