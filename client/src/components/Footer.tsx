import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="py-4 border-top mt-5">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <small className="text-secondary">© {new Date().getFullYear()} Diego Nadal Bienes y Raices</small>
        <div className="d-flex align-items-center gap-3">
          <a href="https://www.instagram.com/diegonadalbienesraices/" target="_blank" rel="noopener noreferrer" className="text-ship" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://www.facebook.com/diego.nadal" target="_blank" rel="noopener noreferrer" className="text-ship" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
        </div>
        <small className="text-secondary">
          Desarrollado por{' '}
          <a href="https://botoncreativo.onrender.com" target="_blank" rel="noopener noreferrer" className="text-ship">
            Botón Creativo
          </a>
        </small>
      </Container>
    </footer>
  )
}


