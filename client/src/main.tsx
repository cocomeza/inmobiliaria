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
      staleTime: 5 * 60 * 1000, // 5 minutos - los datos se consideran frescos por 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos - caché en memoria por 10 minutos
      retry: 2, // Reintentar hasta 2 veces en caso de error
      refetchOnWindowFocus: false, // No refetch cuando la ventana gana foco
      refetchOnMount: false, // No refetch si los datos están en caché
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
