import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '../lib/api'

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

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalCount: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PropertiesResponse {
  properties: PropertyItem[]
  pagination: PaginationInfo
}

export interface PropertiesFilters {
  type?: string
  status?: string
  featured?: boolean
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export function useProperties(filters: PropertiesFilters = {}) {
  return useQuery({
    queryKey: ['/api/properties', filters],
    queryFn: async (): Promise<PropertiesResponse> => {
      const searchParams = new URLSearchParams()
      
      // Agregar filtros a los parámetros de búsqueda
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })

      const endpoint = `/api/properties${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
      const res = await apiRequest(endpoint)
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }
      
      const data = await res.json()
      
      // Mapear las propiedades al formato esperado
      const mappedProperties: PropertyItem[] = (data.properties || []).map((p: any) => ({
        id: String(p._id || p.id || ''),
        title: p.title,
        description: p.description,
        priceUsd: typeof p.price === 'number' ? p.price : Number(p.priceUsd ?? 0) || 0,
        images: Array.isArray(p.images) ? p.images : [],
        type: p.type,
        status: p.status,
        address: p.address,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        featured: Boolean(p.featured)
      }))

      return {
        properties: mappedProperties.filter(p => Boolean(p.id)),
        pagination: data.pagination
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutos para propiedades (más frecuente que el default)
    gcTime: 5 * 60 * 1000, // 5 minutos de caché
  })
}

// Hook para obtener solo las propiedades destacadas (para la página principal)
export function useFeaturedProperties(limit: number = 6) {
  return useProperties({
    featured: true,
    limit,
    sort: 'createdAt',
    order: 'desc'
  })
}