import { Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'
import { Link, useRoute } from 'wouter'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isActive] = useRoute(href)
  return (
    <Nav.Link as={Link} href={href} className={isActive ? 'active' : ''}>
      {children}
    </Nav.Link>
  )
}

export default function Navbar() {
  return (
    <BsNavbar expand="lg" className="navbar-custom sticky-top">
      <Container>
        <BsNavbar.Brand as={Link} href="/" className="fw-semibold d-block">
          <span className="d-none d-sm-inline">Diego Nadal Inmobiliaria</span>
          <span className="d-inline d-sm-none">DN Inmobiliaria</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink href="/">Inicio</NavLink>
            <NavLink href="/propiedades">Propiedades</NavLink>
            <NavLink href="/servicios">Servicios</NavLink>
            <NavLink href="/nosotros">Nosotros</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
            <NavLink href="/admin">Admin</NavLink>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}


