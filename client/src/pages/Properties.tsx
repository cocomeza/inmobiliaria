import { useMemo, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useInfiniteQuery } from '@tanstack/react-query'
import Filters from '../components/Filters'
import type { FiltersState } from '../components/Filters'
import PropertyCard from '../components/PropertyCard'
import type { PropertyItem } from '../components/PropertyCard'
import { apiRequest } from '../lib/api'

export default function Properties() {
  const [filters, setFilters] = useState<FiltersState>({ type: 'Todos', order: 'MasNuevo' })

  // Paginated properties
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['properties'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await apiRequest(`/api/properties?page=${pageParam}&limit=12`)
      const json = await res.json() as { items: any[]; total: number; page: number; limit: number }
      const mapped: PropertyItem[] = json.items.map((p: any) => ({
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
      return { items: mapped.filter(p => Boolean(p.id)), total: json.total }
    },
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.flatMap(p => p.items).length
      if (fetched < lastPage.total) {
        return allPages.length + 1 // next page number
      }
      return undefined
    }
  })

  const items = data ? data.pages.flatMap(p => p.items) : []

  const filtered = useMemo(() => {
    let list = [...items]
    if (filters.type !== 'Todos') list = list.filter((i) => i.type === filters.type)
    if (filters.order === 'PrecioAsc') list.sort((a, b) => a.priceUsd - b.priceUsd)
    if (filters.order === 'PrecioDesc') list.sort((a, b) => b.priceUsd - a.priceUsd)
    return list
  }, [items, filters])

  return (
    <Container className="py-4 py-md-5">
      <h1 className="mb-3 mb-md-4 text-center text-md-start">Propiedades</h1>
      <div className="mb-4">
        <Filters value={filters} onChange={setFilters} />
      </div>

      <Row className="g-3 g-md-4">
        {isLoading ? (
          <Col xs={12} className="text-center py-4">
            <p>Cargando propiedades...</p>
          </Col>
        ) : filtered.length === 0 ? (
          <Col xs={12} className="text-center py-4">
            <p>No se encontraron propiedades con los filtros seleccionados.</p>
          </Col>
        ) : (
          filtered.map((p, idx) => (
            <Col key={`${p.id}-${idx}`} xs={12} sm={6} lg={4}>
              <PropertyCard item={p} />
            </Col>
          ))
        )}
        {hasNextPage && (
          <Col xs={12} className="text-center mt-4">
            <button className="btn btn-outline-primary" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
            </button>
          </Col>
        )}
      </Row>
    </Container>
  )
}


