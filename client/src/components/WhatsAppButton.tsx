import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5493407412471"
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-success rounded-pill whatsapp-fab shadow d-inline-flex align-items-center gap-2"
      aria-label="WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
      WhatsApp
    </a>
  )
}


