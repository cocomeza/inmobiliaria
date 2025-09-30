import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import 'leaflet/dist/leaflet.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { QUERY_CONFIG } from './config/performance'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.staleTime.properties,
      gcTime: 10 * 60 * 1000, // 10 minutos
      refetchOnWindowFocus: QUERY_CONFIG.refetch.onWindowFocus,
      refetchOnMount: QUERY_CONFIG.refetch.onMount,
      refetchOnReconnect: QUERY_CONFIG.refetch.onReconnect,
      retry: QUERY_CONFIG.retry.count,
      retryDelay: QUERY_CONFIG.retry.delay,
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
