import { Row, Col, Form, Button } from 'react-bootstrap'

export type PropertyType = 'Casa' | 'Campo' | 'Departamento' | 'Desarrollo' | 'Local' | 'Terreno'

export interface FiltersState {
  type: PropertyType | 'Todos'
  order: 'MasNuevo' | 'PrecioAsc' | 'PrecioDesc'
}

export default function Filters({ value, onChange }: { value: FiltersState; onChange: (v: FiltersState) => void }) {
  return (
    <Form className="bg-chino p-3 p-md-4 rounded">
      <Row className="g-3 align-items-end">
        <Col xs={12} sm={6} lg={4}>
          <Form.Label className="fw-semibold small">Tipo de propiedad</Form.Label>
          <Form.Select
            value={value.type}
            onChange={(e) => onChange({ ...value, type: e.target.value as FiltersState['type'] })}
            className="form-select-touch"
          >
            <option>Todos</option>
            <option>Casa</option>
            <option>Campo</option>
            <option>Departamento</option>
            <option>Desarrollo</option>
            <option>Local</option>
            <option>Terreno</option>
          </Form.Select>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Form.Label className="fw-semibold small">Ordenar por</Form.Label>
          <Form.Select
            value={value.order}
            onChange={(e) => onChange({ ...value, order: e.target.value as FiltersState['order'] })}
            className="form-select-touch"
          >
            <option value="MasNuevo">Más nuevo</option>
            <option value="PrecioAsc">Precio ascendente</option>
            <option value="PrecioDesc">Precio descendente</option>
          </Form.Select>
        </Col>
        <Col xs={12} lg={4} className="text-start text-lg-end">
          <Button 
            className="btn-glacier mt-3 mt-lg-0 w-100 w-lg-auto"
            size="sm"
          >
            Aplicar filtros
          </Button>
        </Col>
      </Row>
    </Form>
  )
}


