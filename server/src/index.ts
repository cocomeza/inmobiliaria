import app from './app'

// Solo inicializar servidor en desarrollo (no en Vercel)
const isProduction = process.env.NODE_ENV === 'production'
const isVercel = process.env.VERCEL === '1'
const PORT = process.env.PORT || 4000

// Solo crear servidor si NO estamos en Vercel
if (!isVercel) {
  console.log('✅ Variables disponibles:', {
    MONGO_URI: !!process.env.MONGO_URI,
    JWT_SECRET: !!process.env.JWT_SECRET,
    isVercel: !!isVercel,
    isProduction: !!isProduction
  })

  const server = app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 API escuchando en http://0.0.0.0:${PORT}`)
    console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`)
    console.log(`🔧 Plataforma: ${isVercel ? 'Vercel' : (isProduction ? 'Railway' : 'Development')}`)
    console.log(`💾 Base de datos: MongoDB Atlas`)
    
    if (!isProduction) {
      console.log(`🔄 Redirigiendo rutas no-API a http://localhost:5000`)
    }
    
    console.log(`✅ Servidor completamente iniciado y listo para recibir requests`)
  }).on('error', (err) => {
    console.error('❌ Error starting server:', err)
    process.exit(1)
  })

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🔄 Recibiendo SIGTERM, cerrando servidor...')
    server.close(() => {
      console.log('✅ Servidor cerrado correctamente')
      process.exit(0)
    })
  })

  // Keep-alive para Railway
  if (isProduction && !isVercel) {
    setInterval(() => {
      console.log(`❤️ Servidor activo en puerto ${PORT}`)
    }, 300000) // Cada 5 minutos
  }
} else {
  console.log('🚀 Modo Vercel: usando serverless functions')
}

// Exportar la aplicación para uso en serverless
export default app