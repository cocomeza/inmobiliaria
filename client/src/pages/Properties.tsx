import { useState, useMemo } from 'react'
import { Container, Row, Col, Pagination, Spinner, Alert } from 'react-bootstrap'
import Filters from '../components/Filters'
import type { FiltersState } from '../components/Filters'
import PropertyCard from '../components/PropertyCard'
import { useProperties } from '../hooks/useProperties'

export default function Properties() {
  const [filters, setFilters] = useState<FiltersState>({ type: 'Todos', order: 'MasNuevo' })
  const [currentPage, setCurrentPage] = useState(1)

  // Convertir filtros del UI a filtros de API
  const apiFilters = useMemo(() => {
    const apiFilter: any = {
      page: currentPage,
      limit: 12
    }

    // Tipo de propiedad
    if (filters.type !== 'Todos') {
      apiFilter.type = filters.type
    }

    // Ordenamiento
    switch (filters.order) {
      case 'PrecioAsc':
        apiFilter.sort = 'price'
        apiFilter.order = 'asc'
        break
      case 'PrecioDesc':
        apiFilter.sort = 'price'
        apiFilter.order = 'desc'
        break
      case 'MasNuevo':
      default:
        apiFilter.sort = 'createdAt'
        apiFilter.order = 'desc'
        break
    }

    return apiFilter
  }, [filters, currentPage])

  const { data, isLoading, error } = useProperties(apiFilters)

  // Resetear página cuando cambien los filtros
  const handleFiltersChange = (newFilters: FiltersState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const renderPagination = () => {
    if (!data?.pagination || data.pagination.totalPages <= 1) return null

    const { currentPage, totalPages, hasPrevPage, hasNextPage } = data.pagination
    const items = []

    // Botón anterior
    items.push(
      <Pagination.Prev 
        key="prev" 
        disabled={!hasPrevPage}
        onClick={() => hasPrevPage && setCurrentPage(currentPage - 1)}
      />
    )

    // Números de página
    const startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, currentPage + 2)

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      )
    }

    // Botón siguiente
    items.push(
      <Pagination.Next 
        key="next" 
        disabled={!hasNextPage}
        onClick={() => hasNextPage && setCurrentPage(currentPage + 1)}
      />
    )

    return (
      <div className="d-flex justify-content-center mt-4">
        <Pagination>{items}</Pagination>
      </div>
    )
  }

  return (
    <Container className="py-4 py-md-5">
      <h1 className="mb-3 mb-md-4 text-center text-md-start">Propiedades</h1>
      
      <div className="mb-4">
        <Filters value={filters} onChange={handleFiltersChange} />
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          Error al cargar las propiedades. Por favor, intenta nuevamente.
        </Alert>
      )}

      <Row className="g-3 g-md-4">
        {isLoading ? (
          <Col xs={12} className="text-center py-5">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Cargando propiedades...</p>
          </Col>
        ) : !data?.properties || data.properties.length === 0 ? (
          <Col xs={12} className="text-center py-5">
            <p>No se encontraron propiedades con los filtros seleccionados.</p>
          </Col>
        ) : (
          data.properties.map((property) => (
            <Col key={property.id} xs={12} sm={6} lg={4}>
              <PropertyCard item={property} />
            </Col>
          ))
        )}
      </Row>

      {renderPagination()}
    </Container>
  )
}


