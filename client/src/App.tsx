import './App.css'
import './theme.css'
import './styles/responsive.css'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Route, Router, Switch } from 'wouter'
import Navbar from './components/Navbar'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Properties from './pages/Properties'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import PropertyDetail from './pages/PropertyDetail'
import Footer from './components/Footer'
import Admin from './pages/Admin'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { useWarmupBackend } from './hooks/useWarmupBackend'

function App() {
  // Despertar el backend al cargar la app (Render free tier se duerme)
  useWarmupBackend()
  
  useEffect(() => {
    AOS.init({ duration: 700, once: true })
  }, [])

  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/propiedades" component={Properties} />
        <Route path="/servicios" component={Services} />
        <Route path="/nosotros" component={About} />
        <Route path="/contacto" component={Contact} />
        <Route path="/propiedad/:id" component={PropertyDetail} />
        <Route path="/login" component={Login} />
        <Route path="/admin">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
      </Switch>

      <Footer />
      <WhatsAppButton />
    </Router>
  )
}

export default App
