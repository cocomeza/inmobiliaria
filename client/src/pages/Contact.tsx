import { Container } from 'react-bootstrap'

export default function Contact() {
  return (
    <Container className="py-5">
      <h1>Contacto</h1>
      <p className="text-secondary">Escribinos por WhatsApp para una respuesta rápida.</p>
      <div className="ratio ratio-16x9 mt-3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.087951976268!2d-60.06567572545429!3d-33.499088773370275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b9e370700a471f%3A0x40c71e9083743252!2sBelgrano%20938%2C%20B2914%20Villa%20Ramallo%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1757591393054!5m2!1ses-419!2sar"
          title="Ubicación - Belgrano 938, Villa Ramallo, Buenos Aires"
          loading="lazy"
          style={{border: 0}}
          allowFullScreen={true}
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Container>
  )
}


