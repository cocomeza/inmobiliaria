// @ts-nocheck
/// <reference types="node" />
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Configuración de variables de entorno
const isProduction = process.env.NODE_ENV === 'production'
const isVercel = process.env.VERCEL === '1'

// Compatibilidad ESM para __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

if (isProduction && !isVercel) {
  console.log('🚀 Producción: usando variables de entorno de Railway')
} else if (!isProduction) {
  // En desarrollo, configurar dotenv con la ruta correcta
  const envPath = path.resolve(__dirname, '../../../.env')
  console.log('🔧 Desarrollo: cargando variables de entorno desde:', envPath)
  const result = dotenv.config({ path: envPath })

  // Fallback: también intentar desde la raíz del workspace
  if (result.error) {
    const workspaceEnvPath = path.resolve(process.cwd(), '.env')
    console.log('🔧 Intentando cargar desde workspace:', workspaceEnvPath)
    dotenv.config({ path: workspaceEnvPath })
  }
}

import connectDB from '../server/src/config/database'
import { authenticateToken, requireAdmin, AuthRequest } from '../server/src/middleware/auth'
import { authService } from '../server/src/services/authService'
import { seedService } from '../server/src/services/seedService'
import { Property } from '../server/src/models/Property'
import { User } from '../server/src/models/User'

const app = express()

// Configuración CORS actualizada para Vercel
const corsOptions = {
  origin: isProduction 
    ? [
        /\.vercel\.app$/, 
        /\.vercel\.dev$/, 
        /\.railway\.app$/, 
        /\.onrender\.com$/, 
        /\.replit\.dev$/, 
        /\.replit\.app$/,
      ]
    : [
        'http://localhost:5000', 
        'http://localhost:5001', 
        'http://127.0.0.1:5000', 
        /\.replit\.dev$/, 
        /\.replit\.app$/, 
        /\.railway\.app$/, 
        /\.vercel\.app$/, 
        /\.vercel\.dev$/
      ],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))

// Security middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false
}))

// Rate limiting for login endpoint
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Demasiados intentos de login. Intenta nuevamente en 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Inicialización de base de datos para serverless
let dbConnected = false

const initializeDB = async () => {
  if (!dbConnected) {
    try {
      await connectDB()
      await seedService.seedDatabase()
      dbConnected = true
      console.log('✅ Base de datos inicializada correctamente')
    } catch (error) {
      console.error('Error inicializando la base de datos:', error)
      throw error
    }
  }
}

// Middleware para inicializar DB en cada request (solo en Vercel)
if (isVercel) {
  app.use(async (req, res, next) => {
    try {
      await initializeDB()
      next()
    } catch (error) {
      console.error('Error en middleware de inicialización DB:', error)
      res.status(500).json({ message: 'Error de conexión a la base de datos' })
    }
  })
} else {
  // En desarrollo/Railway, inicializar DB solo una vez al startup
  if (process.env.MONGO_URI && process.env.JWT_SECRET) {
    initializeDB().catch((error) => {
      console.error('Error inicializando DB en startup:', error)
      // No salir del proceso en desarrollo para permitir frontend funcionar
      if (!isProduction) {
        console.log('🔄 Continuando sin base de datos en modo desarrollo')
      }
    })
  } else {
    console.log('⚠️  Sin variables de entorno de MongoDB - funcionando sin base de datos')
  }
}

// ========================
// RUTAS DE AUTENTICACIÓN
// ========================

app.post('/api/login', loginLimiter, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Usuario y contraseña son requeridos' 
      })
    }

    const result = await authService.login(username.trim(), password)
    
    if (result.success) {
      res.json(result)
    } else {
      res.status(401).json({ message: result.message })
    }
  } catch (error) {
    console.error('Error en /api/login:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

app.get('/api/auth-check', authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({ 
    success: true, 
    user: {
      id: ((req.user as any)!._id as any).toString(),
      username: (req.user as any)!.username,
      email: (req.user as any)!.email,
      role: (req.user as any)!.role
    }
  })
})

// ========================
// RUTAS DE PROPIEDADES
// ========================

// Obtener todas las propiedades (público)
app.get('/api/properties', async (req: Request, res: Response) => {
  try {
    const { type, status, featured, minPrice, maxPrice } = req.query

    // Construir filtros
    const filters: any = {}
    
    if (type && type !== '') {
      filters.type = type
    }
    
    if (status && status !== '') {
      filters.status = status
    }
    
    if (featured !== undefined && featured !== '') {
      filters.featured = featured === 'true'
    }
    
    if (minPrice || maxPrice) {
      filters.price = {}
      if (minPrice) filters.price.$gte = Number(minPrice)
      if (maxPrice) filters.price.$lte = Number(maxPrice)
    }

    const properties = await Property.find(filters).sort({ createdAt: -1 })
    res.json(properties)
  } catch (error) {
    console.error('Error obteniendo propiedades:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Obtener propiedad por ID (público)
app.get('/api/properties/:id', async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id)
    
    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada' })
    }
    
    res.json(property)
  } catch (error) {
    console.error('Error obteniendo propiedad:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Crear propiedad (solo admin)
app.post('/api/properties', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      priceUsd, // Mapear desde el frontend
      address,
      bedrooms,
      bathrooms,
      images,
      featured,
      type,
      status,
      lat,
      lng
    } = (req as any).body

    if (!title || typeof priceUsd !== 'number') {
      return res.status(400).json({ 
        message: 'Título y precio son requeridos' 
      })
    }

    const newProperty = new Property({
      title,
      description,
      price: priceUsd, // Guardar como price en la BD
      address,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      bathrooms: bathrooms ? Number(bathrooms) : undefined,
      images: Array.isArray(images) ? images : [],
      featured: Boolean(featured),
      type,
      status,
      lat: lat ? Number(lat) : undefined,
      lng: lng ? Number(lng) : undefined
    })

    const savedProperty = await newProperty.save()
    res.status(201).json(savedProperty)
  } catch (error) {
    console.error('Error creando propiedad:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Actualizar propiedad (solo admin)
app.put('/api/properties/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      priceUsd,
      address,
      bedrooms,
      bathrooms,
      images,
      featured,
      type,
      status,
      lat,
      lng
    } = (req as any).body

    const updateData: any = {}
    
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (priceUsd !== undefined) updateData.price = Number(priceUsd)
    if (address !== undefined) updateData.address = address
    if (bedrooms !== undefined) updateData.bedrooms = Number(bedrooms)
    if (bathrooms !== undefined) updateData.bathrooms = Number(bathrooms)
    if (images !== undefined) updateData.images = Array.isArray(images) ? images : []
    if (featured !== undefined) updateData.featured = Boolean(featured)
    if (type !== undefined) updateData.type = type
    if (status !== undefined) updateData.status = status
    if (lat !== undefined) updateData.lat = Number(lat)
    if (lng !== undefined) updateData.lng = Number(lng)

    const updatedProperty = await Property.findByIdAndUpdate(
      (req as any).params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Propiedad no encontrada' })
    }

    res.json(updatedProperty)
  } catch (error) {
    console.error('Error actualizando propiedad:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Eliminar propiedad (solo admin)
app.delete('/api/properties/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete((req as any).params.id)
    
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Propiedad no encontrada' })
    }
    
    res.status(204).send()
  } catch (error) {
    console.error('Error eliminando propiedad:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// ========================
// RUTAS ADICIONALES
// ========================

// Contacto (público)
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Datos incompletos' })
    }
    
    // Aquí podrías guardar el mensaje en la BD o enviar email
    console.log('Mensaje de contacto recibido:', { name, email, message })
    
    res.json({ ok: true, message: 'Mensaje enviado correctamente' })
  } catch (error) {
    console.error('Error en contacto:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Health check
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    // Verificar conexión a la BD
    const propertiesCount = await Property.countDocuments()
    const usersCount = await User.countDocuments()
    
    res.status(200).json({ 
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      platform: isVercel ? 'Vercel' : (isProduction ? 'Railway' : 'Development'),
      database: {
        connected: dbConnected,
        properties: propertiesCount,
        users: usersCount
      }
    })
  } catch (error) {
    console.error('Error en health check:', error)
    res.status(500).json({ 
      status: 'ERROR',
      message: 'Error de conexión a la base de datos'
    })
  }
})

// Endpoint de debug solo en desarrollo
if (!isProduction) {
  app.get('/api/debug-auth', async (req: Request, res: Response) => {
    try {
      const users = await User.find({}, 'username email role createdAt')
      const properties = await Property.countDocuments()
      
      res.json({
        isProduction,
        isVercel,
        environment: process.env.NODE_ENV,
        hasJwtSecret: !!process.env.JWT_SECRET,
        hasMongoUri: !!process.env.MONGO_URI,
        users: users.length,
        properties,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo información de debug' })
    }
  })
}

export default app