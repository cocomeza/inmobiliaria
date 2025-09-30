const express = require('express');
const cors = require('cors');

const app = express();

// CORS
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:5001'],
  credentials: true
}));

app.use(express.json());

// Datos de prueba
const testProperties = [
  {
    _id: '1',
    title: 'Casa de prueba',
    description: 'Una casa de prueba para verificar que funciona',
    price: 150000,
    type: 'Casa',
    status: 'En venta',
    images: ['/uploads/test.jpg'],
    featured: true,
    bedrooms: 3,
    bathrooms: 2,
    address: 'Dirección de prueba'
  },
  {
    _id: '2',
    title: 'Departamento de prueba',
    description: 'Un departamento de prueba',
    price: 200000,
    type: 'Departamento',
    status: 'En venta',
    images: ['/uploads/test2.jpg'],
    featured: false,
    bedrooms: 2,
    bathrooms: 1,
    address: 'Otra dirección de prueba'
  },
  {
    _id: '3',
    title: 'Terreno de prueba',
    description: 'Un terreno de prueba',
    price: 80000,
    type: 'Terreno',
    status: 'En venta',
    images: ['/uploads/test3.jpg'],
    featured: true,
    bedrooms: 0,
    bathrooms: 0,
    address: 'Dirección del terreno'
  }
];

// Endpoint de propiedades
app.get('/api/properties', (req, res) => {
  console.log('GET /api/properties');
  res.json(testProperties);
});

// Endpoint de propiedades por ID
app.get('/api/properties/:id', (req, res) => {
  console.log('GET /api/properties/' + req.params.id);
  const property = testProperties.find(p => p._id === req.params.id);
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: 'Propiedad no encontrada' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor de prueba funcionando' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor de prueba ejecutándose en puerto ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Properties: http://localhost:${PORT}/api/properties`);
});