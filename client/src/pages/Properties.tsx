import { useMemo, useState, useCallback, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Filters from '../components/Filters'
import type { FiltersState } from '../components/Filters'
import PropertyCard from '../components/PropertyCard'
import type { PropertyItem } from '../components/PropertyCard'
import { apiRequest } from '../lib/api'
import { PAGINATION_CONFIG, QUERY_CONFIG } from '../config/performance'

const ITEMS_PER_PAGE = PAGINATION_CONFIG.itemsPerPage

export default function Properties() {
  const [filters, setFilters] = useState<FiltersState>({ type: 'Todos', order: 'MasNuevo' })
  const [page, setPage] = useState(1)

  // Función para construir query params
  const buildQueryParams = useCallback((currentPage: number, currentFilters: FiltersState) => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())
    params.set('limit', ITEMS_PER_PAGE.toString())
    
    if (currentFilters.type !== 'Todos') {
      params.set('type', currentFilters.type)
    }
    
    // Ordenamiento se maneja en el frontend para mejor UX
    return params.toString()
  }, [])

  // Definir tipo para la respuesta de la API
  type PropertiesResponse = {
    items: PropertyItem[]
    total: number
    hasMore: boolean
    page: number
  }

  // Usar API para obtener propiedades con paginación
  const { data, isLoading, isFetching } = useQuery<PropertiesResponse>({
    queryKey: ['/api/properties', page, filters.type],
    queryFn: async (): Promise<PropertiesResponse> => {
      const queryParams = buildQueryParams(page, filters)
      const res = await apiRequest(`/api/properties?${queryParams}`)
      const response = await res.json()
      
      // Manejar respuesta paginada o array simple
      const raw = response.properties || response
      const total = response.total || raw.length
      const hasMore = response.hasMore ?? (page * ITEMS_PER_PAGE < total)
      
      const mapped: PropertyItem[] = (raw || []).map((p: any) => ({
        id: String(p.id || p._id || ''),
        title: p.title,
        description: p.description,
        priceUsd: typeof p.priceUsd === 'number' ? p.priceUsd : Number(p.price ?? 0) || 0,
        images: Array.isArray(p.images) ? p.images : [],
        type: p.type,
        status: p.status,
        address: p.address,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        featured: Boolean(p.featured)
      }))
      
      return {
        items: mapped.filter(p => Boolean(p.id)),
        total,
        hasMore,
        page
      }
    },
    staleTime: QUERY_CONFIG.staleTime.properties,
    placeholderData: (previousData) => previousData, // Reemplaza keepPreviousData en v5
  })

  // Resetear página cuando cambian los filtros
  const handleFiltersChange = useCallback((newFilters: FiltersState) => {
    setFilters(newFilters)
    setPage(1)
  }, [])

  // Cargar más propiedades
  const loadMore = useCallback(() => {
    if (data && data.hasMore && !isFetching) {
      setPage(prev => prev + 1)
    }
  }, [data, isFetching])

  // Acumular todas las propiedades cargadas
  const [allItems, setAllItems] = useState<PropertyItem[]>([])
  
  // Actualizar items acumulados cuando llegan nuevos datos
  useEffect(() => {
    if (data && data.items) {
      if (page === 1) {
        // Primera página o filtros cambiados
        setAllItems(data.items)
      } else {
        // Páginas adicionales - agregar a los existentes
        setAllItems(prev => [...prev, ...data.items])
      }
    }
  }, [data, page])

  const filtered = useMemo(() => {
    let list = [...allItems]
    // El filtro por tipo ya se aplica en el backend
    if (filters.order === 'PrecioAsc') list.sort((a, b) => a.priceUsd - b.priceUsd)
    if (filters.order === 'PrecioDesc') list.sort((a, b) => b.priceUsd - a.priceUsd)
    return list
  }, [allItems, filters.order])

  return (
    <Container className="py-4 py-md-5">
      <h1 className="mb-3 mb-md-4 text-center text-md-start">Propiedades</h1>
      <div className="mb-4">
        <Filters value={filters} onChange={handleFiltersChange} />
      </div>

      <Row className="g-3 g-md-4">
        {isLoading && page === 1 ? (
          <Col xs={12} className="text-center py-4">
            <Spinner animation="border" role="status" className="me-2" />
            <span>Cargando propiedades...</span>
          </Col>
        ) : filtered.length === 0 ? (
          <Col xs={12} className="text-center py-4">
            <p>No se encontraron propiedades con los filtros seleccionados.</p>
          </Col>
        ) : (
          <>
            {filtered.map((p, idx) => (
              <Col key={`${p.id}-${idx}`} xs={12} sm={6} lg={4}>
                <PropertyCard item={p} />
              </Col>
            ))}
            
            {/* Botón cargar más */}
            {data && data.hasMore && (
              <Col xs={12} className="text-center py-4">
                <Button 
                  variant="outline-primary" 
                  onClick={loadMore}
                  disabled={isFetching}
                  size="lg"
                >
                  {isFetching ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Cargando...
                    </>
                  ) : (
                    'Cargar más propiedades'
                  )}
                </Button>
              </Col>
            )}
          </>
        )}
      </Row>
    </Container>
  )
}


