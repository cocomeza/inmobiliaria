import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table, Navbar, Nav, Badge, Card } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { useLocation } from 'wouter'
import { apiRequest, getApiUrl } from '../lib/api'

type Property = {
  id: string
  title: string
  description?: string
  priceUsd: number
  type?: string
  status?: string
  images: string[]
  featured?: boolean
}

export default function Admin() {
  const [items, setItems] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Property | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const { user, logout } = useAuth()
  const [, setLocation] = useLocation()

  // Helper para obtener headers de autenticación
  function getAuthHeaders() {
    const token = localStorage.getItem('adminToken')
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  async function fetchItems() {
    setLoading(true)
    setError(null)
    try {
      const res = await apiRequest('/api/properties')
      const raw = (await res.json()) as any[]
      const mapped: Property[] = (raw || []).map((p: any) => ({
        id: p.id || p._id,
        title: p.title,
        description: p.description,
        priceUsd: typeof p.priceUsd === 'number' ? p.priceUsd : Number(p.price ?? 0),
        type: p.type,
        status: p.status,
        images: Array.isArray(p.images) ? p.images : [],
        featured: Boolean(p.featured)
      }))
      setItems(mapped)
    } catch (e) {
      setError('No se pudieron cargar las propiedades')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  function startNew() {
    setEditing({ id: '', title: '', priceUsd: 0, images: [], featured: false })
  }

  async function saveItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!editing) return
    setError(null)
    if (!editing.title?.trim()) {
      setError('El título es requerido')
      return
    }
    const priceValue = Number(editing.priceUsd)
    if (Number.isNaN(priceValue) || priceValue < 0) {
      setError('El precio debe ser un número válido')
      return
    }
    try {
      const method = editing.id ? 'PUT' : 'POST'
      const url = editing.id ? `/api/properties/${editing.id}` : '/api/properties'
      const token = localStorage.getItem('adminToken')
      const res = await apiRequest(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: editing.title,
          description: editing.description,
          priceUsd: priceValue,
          type: editing.type,
          status: editing.status,
          images: editing.images ?? [],
          featured: Boolean(editing.featured),
        }),
      })
      if (!res.ok) {
        try {
          const err = await res.json()
          throw new Error(err?.message || 'Error al guardar')
        } catch {
          throw new Error('Error al guardar')
        }
      }
      setEditing(null)
      await fetchItems()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar la propiedad')
    }
  }

  async function deleteItem(id: string) {
    if (!confirm('¿Eliminar propiedad?')) return
    try {
      const token = localStorage.getItem('adminToken')
      const res = await apiRequest(`/api/properties/${id}`, { 
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok && res.status !== 204) throw new Error('Error')
      await fetchItems()
    } catch (e) {
      setError('No se pudo eliminar la propiedad')
    }
  }

  async function uploadImage() {
    if (!file) return
    try {
      const fd = new FormData()
      fd.append('image', file)
      const token = localStorage.getItem('adminToken')
      const headers: Record<string, string> = {}
      if (token) headers.Authorization = `Bearer ${token}`
      
      const res = await fetch(`${getApiUrl()}/api/upload`, { 
        method: 'POST', 
        headers,
        body: fd 
      })
      const json = (await res.json()) as { url: string }
      if (editing) {
        setEditing({ ...editing, images: [...(editing.images ?? []), json.url] })
        setFile(null)
      }
    } catch (e) {
      setError('No se pudo subir la imagen')
    }
  }

  const baseApi = getApiUrl()

  function handleLogout() {
    logout()
    setLocation('/login')
  }

  return (
    <>
      {/* Header de administración */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>
            🏠 Admin Panel
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Item className="d-flex align-items-center me-3">
              <span className="text-light">
                Bienvenido, <strong>{user?.username}</strong>
              </span>
            </Nav.Item>
            <Nav.Item>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-3 py-md-4">
        <Row className="align-items-center mb-3 mb-md-4">
          <Col xs={12} sm="auto" className="mb-2 mb-sm-0">
            <h1 className="mb-0 fs-3 fs-md-2">Panel de administración</h1>
          </Col>
          <Col xs={12} sm="auto" className="ms-sm-auto">
            <Button 
              onClick={startNew}
              className="w-100 w-sm-auto"
              size="sm"
            >
              + Nueva propiedad
            </Button>
          </Col>
        </Row>

      {error && <div className="alert alert-danger">{error}</div>}

      {!editing && (
        <div>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2 text-muted">Cargando propiedades...</p>
            </div>
          ) : (
            <>
              {/* Vista de tabla para escritorio */}
              <div className="d-none d-lg-block">
                <div className="card">
                  <div className="card-body">
                    <Table responsive striped hover>
                      <thead className="table-dark">
                        <tr>
                          <th>Título</th>
                          <th>Precio USD</th>
                          <th>Tipo</th>
                          <th>Estado</th>
                          <th>Imágenes</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((p) => (
                          <tr key={p.id}>
                            <td className="fw-semibold">{p.title}</td>
                            <td>${p.priceUsd.toLocaleString()}</td>
                            <td>{p.type ?? '-'}</td>
                            <td>
                              <Badge bg={p.status === 'En venta' ? 'success' : p.status === 'En alquiler' ? 'info' : 'secondary'}>
                                {p.status ?? '-'}
                              </Badge>
                            </td>
                            <td>
                              <Badge bg="secondary">{p.images?.length ?? 0} fotos</Badge>
                            </td>
                            <td className="text-nowrap">
                              <Button 
                                size="sm" 
                                variant="outline-primary" 
                                className="me-2" 
                                onClick={() => setEditing(p)}
                              >
                                Editar
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline-danger" 
                                onClick={() => deleteItem(p.id)}
                              >
                                Eliminar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* Vista de tarjetas para móvil/tablet */}
              <div className="d-lg-none">
                <Row className="g-3">
                  {items.map((p) => (
                    <Col xs={12} key={p.id}>
                      <Card className="border">
                        <Card.Body className="p-3">
                          <Row className="align-items-center">
                            <Col xs={12} sm={8}>
                              <h5 className="mb-1 fs-6">{p.title}</h5>
                              <div className="text-muted small mb-2">
                                {p.type ?? 'Sin tipo'} • ${p.priceUsd.toLocaleString()}
                              </div>
                              <div className="d-flex gap-2 flex-wrap">
                                <Badge bg={p.status === 'En venta' ? 'success' : p.status === 'En alquiler' ? 'info' : 'secondary'}>
                                  {p.status ?? 'Sin estado'}
                                </Badge>
                                <Badge bg="secondary">{p.images?.length ?? 0} fotos</Badge>
                              </div>
                            </Col>
                            <Col xs={12} sm={4} className="mt-2 mt-sm-0">
                              <div className="d-flex gap-2 flex-sm-column">
                                <Button 
                                  size="sm" 
                                  className="flex-fill"
                                  onClick={() => setEditing(p)}
                                >
                                  Editar
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline-danger"
                                  className="flex-fill"
                                  onClick={() => deleteItem(p.id)}
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </>
          )}
        </div>
      )}

      {editing && (
        <div className="card mt-4">
          <div className="card-header">
            <Row className="align-items-center">
              <Col>
                <h5 className="mb-0">
                  {editing.id ? 'Editar Propiedad' : 'Nueva Propiedad'}
                </h5>
              </Col>
              <Col xs="auto">
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  onClick={() => setEditing(null)}
                >
                  ✕ Cancelar
                </Button>
              </Col>
            </Row>
          </div>
          <div className="card-body">
            <Form onSubmit={saveItem}>
              <Row className="g-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Título *</Form.Label>
                    <Form.Control 
                      value={editing.title} 
                      onChange={(e) => setEditing({ ...(editing as Property), title: e.target.value })} 
                      required 
                      placeholder="Ej: Casa 3 dormitorios en centro"
                      className="form-control-lg"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Precio USD *</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={editing.priceUsd} 
                      onChange={(e) => setEditing({ ...(editing as Property), priceUsd: Number(e.target.value) })} 
                      required 
                      placeholder="150000"
                      className="form-control-lg"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Tipo</Form.Label>
                    <Form.Select 
                      value={editing.type ?? ''} 
                      onChange={(e) => setEditing({ ...(editing as Property), type: e.target.value })}
                      className="form-select-lg"
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="Casa">Casa</option>
                      <option value="Departamento">Departamento</option>
                      <option value="Terreno">Terreno</option>
                      <option value="Campo">Campo</option>
                      <option value="Local">Local</option>
                      <option value="Desarrollo">Desarrollo</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Descripción</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      value={editing.description ?? ''} 
                      onChange={(e) => setEditing({ ...(editing as Property), description: e.target.value })} 
                      placeholder="Descripción detallada de la propiedad..."
                      className="form-control-lg"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Estado</Form.Label>
                    <Form.Select 
                      value={editing.status ?? ''} 
                      onChange={(e) => setEditing({ ...(editing as Property), status: e.target.value })}
                      className="form-select-lg"
                    >
                      <option value="">Seleccionar estado</option>
                      <option value="En venta">En venta</option>
                      <option value="En alquiler">En alquiler</option>
                      <option value="Reservado">Reservado</option>
                      <option value="Vendido">Vendido</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Opciones</Form.Label>
                    <div className="d-flex align-items-center gap-3 mt-2">
                      <Form.Check 
                        type="switch"
                        id="featured-switch"
                        label="⭐ Destacada (aparece en Home)"
                        checked={Boolean(editing.featured)}
                        onChange={(e) => setEditing({ ...(editing as Property), featured: e.target.checked })}
                        className="form-check-lg"
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Subir imagen</Form.Label>
                    <div className="d-flex gap-2 flex-column flex-sm-row">
                      <Form.Control 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const target = e.target as HTMLInputElement
                          setFile(target.files?.[0] ?? null)
                        }} 
                        className="form-control-lg"
                      />
                      <Button 
                        variant="secondary" 
                        onClick={uploadImage} 
                        disabled={!file}
                        className="flex-shrink-0"
                      >
                        📷 Subir
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Label className="fw-semibold">Imágenes actuales</Form.Label>
                  <div className="d-flex flex-wrap gap-3">
                    {(editing.images ?? []).length === 0 ? (
                      <div className="text-muted small">Sin imágenes</div>
                    ) : (
                      (editing.images ?? []).map((url, i) => (
                        <div key={i} className="border rounded p-2 bg-light">
                          <div className="d-flex flex-column align-items-center gap-2">
                            <img 
                              src={`${url.startsWith('http') ? url : baseApi + url}`} 
                              alt={`Imagen ${i + 1}`} 
                              style={{ width: 100, height: 75, objectFit: 'cover' }} 
                              className="rounded"
                            />
                            <Button 
                              size="sm" 
                              variant="outline-danger" 
                              onClick={() => setEditing({ 
                                ...(editing as Property), 
                                images: (editing.images ?? []).filter((u) => u !== url) 
                              })}
                              className="w-100"
                            >
                              🗑️ Quitar
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Col>
                <Col xs={12} className="d-flex gap-2 justify-content-end flex-column flex-sm-row">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setEditing(null)}
                    className="order-2 order-sm-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary"
                    className="order-1 order-sm-2"
                    size="lg"
                  >
                    💾 {editing.id ? 'Actualizar' : 'Crear'} Propiedad
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      )}
      </Container>
    </>
  )
}


