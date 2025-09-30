import { Card, Placeholder } from 'react-bootstrap'

export default function PropertySkeleton() {
  return (
    <Card className="h-100 shadow-sm">
      <div style={{ position: 'relative' }}>
        <Placeholder as="div" animation="glow">
          <div 
            style={{ 
              height: '200px',
              width: '100%',
              backgroundColor: '#e0e0e0'
            }} 
          />
        </Placeholder>
      </div>
      <Card.Body className="d-flex flex-column">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={8} />
        </Placeholder>
        <Placeholder as="div" animation="glow" className="mb-2">
          <Placeholder xs={4} />
        </Placeholder>
        <Placeholder as="div" animation="glow" className="mb-2">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow" className="mt-auto">
          <Placeholder xs={12} />
          <Placeholder xs={10} />
          <Placeholder xs={8} />
        </Placeholder>
      </Card.Body>
    </Card>
  )
}