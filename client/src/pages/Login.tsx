import { useState } from 'react'
import { Button, Col, Container, Form, Row, Alert, InputGroup } from 'react-bootstrap'
import { useLocation } from 'wouter'
import { apiRequest } from '../lib/api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [, setLocation] = useLocation()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!username.trim() || !password.trim()) {
      setError('Por favor completá todos los campos')
      setLoading(false)
      return
    }

    try {
      // Normalizar datos antes de enviar para evitar problemas con móviles
      const normalizedUsername = username.trim().toLowerCase()
      const normalizedPassword = password.trim()
      
      const res = await apiRequest('/api/login', {
        method: 'POST',
        body: JSON.stringify({ 
          username: normalizedUsername, 
          password: normalizedPassword 
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Error de autenticación' }))
        throw new Error(errorData.message || 'Usuario o contraseña incorrectos')
      }

      const data = await res.json()
      
      // Guardar token de autenticación
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminUser', JSON.stringify(data.user))
      
      // Redirigir al admin
      setLocation('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={11} sm={10} md={8} lg={6} xl={5} xxl={4}>
          <div className="card shadow-lg border-0">
            <div className="card-body p-3 p-sm-4 p-md-5 p-lg-4 p-xl-5">
              <div className="text-center mb-3 mb-md-4 mb-lg-5">
                <h2 className="mb-2 fs-4 fs-md-3">🏠 Admin Login</h2>
                <p className="text-muted mb-0 small">Panel de Administración</p>
              </div>
              
              {error && (
                <Alert variant="danger" className="mb-4">
                  <small>{error}</small>
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small mb-2">Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresá tu usuario"
                    required
                    disabled={loading}
                    className="form-control-lg py-3"
                    autoComplete="username"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    data-testid="input-username"
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold small mb-2">Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresá tu contraseña"
                      required
                      disabled={loading}
                      className="form-control-lg py-3"
                      autoComplete="current-password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck="false"
                      data-testid="input-password"
                    />
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      className="px-3"
                      title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? "👁️" : "🙈"}
                    </Button>
                  </InputGroup>
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 btn-lg py-3 fs-6" 
                  disabled={loading}
                  style={{ minHeight: '48px' }}
                >
                  {loading ? 'Ingresando...' : 'Ingresar'}
                </Button>
              </Form>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <small className="text-muted">
              Solo para administradores autorizados
            </small>
          </div>
        </Col>
      </Row>
    </Container>
  )
}