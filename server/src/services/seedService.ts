import { User } from '../models/User.js';
import { Property } from '../models/Property.js';
import { authService } from './authService.js';

export const seedService = {
  async seedDatabase() {
    try {
      // Only seed in development environment
      const isProduction = process.env.NODE_ENV === 'production';
      const allowSeeding = process.env.ALLOW_SEEDING === 'true';
      
      if (isProduction && !allowSeeding) {
        console.log('🚫 Seeding deshabilitado en producción');
        return;
      }

      console.log('🌱 Iniciando seed de base de datos...');

      // Verificar si ya existe un admin
      const existingAdmin = await User.findOne({ role: 'admin' });
      
      if (!existingAdmin) {
        // Get admin credentials from environment variables
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@inmobiliaria.com';
        const adminPassword = process.env.ADMIN_PASSWORD;
        
        if (!adminPassword) {
          console.error('❌ ADMIN_PASSWORD no está configurado en variables de entorno');
          return;
        }

        console.log('👤 Creando usuario administrador...');
        const adminResult = await authService.createUser({
          username: adminUsername,
          email: adminEmail,
          password: adminPassword,
          role: 'admin'
        });

        if (adminResult.success) {
          console.log('✅ Usuario administrador creado correctamente');
          console.log(`📧 Email: ${adminEmail}`);
          console.log(`👤 Username: ${adminUsername}`);
        } else {
          console.error('❌ Error creando administrador:', adminResult.message);
        }
      } else {
        console.log('👤 Usuario administrador ya existe');
      }

      // Verificar si ya existen propiedades
      const propertiesCount = await Property.countDocuments();
      
      if (propertiesCount === 0) {
        console.log('🏠 Creando propiedades de ejemplo...');
        
        const sampleProperties = [
          {
            title: 'Departamento en Palermo',
            description: '2 ambientes luminosos cerca de parques y polo gastronómico.',
            price: 150000,
            address: 'Cerviño 4800, Palermo, CABA',
            bedrooms: 2,
            bathrooms: 1,
            lat: -34.573,
            lng: -58.419,
            images: [
              'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1200&auto=format&fit=crop'
            ],
            featured: true,
            type: 'Departamento',
            status: 'En venta'
          },
          {
            title: 'Casa en barrio privado',
            description: '3 dormitorios, jardín y cochera. Seguridad 24 hs.',
            price: 260000,
            address: 'Barrio Las Lomas, Zona Norte',
            bedrooms: 3,
            bathrooms: 2,
            images: [
              'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?q=80&w=1200&auto=format&fit=crop'
            ],
            featured: false,
            type: 'Casa',
            status: 'En venta'
          },
          {
            title: 'Local comercial céntrico',
            description: 'Excelente vidriera y tránsito peatonal.',
            price: 1200,
            address: 'Av. Corrientes 1500, CABA',
            images: [
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop'
            ],
            featured: false,
            type: 'Local',
            status: 'En alquiler'
          },
          {
            title: 'Terreno en las afueras',
            description: 'Excelente ubicación para desarrollo inmobiliario.',
            price: 50000,
            address: 'Ruta 8, Zona Oeste',
            images: [
              'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop'
            ],
            featured: true,
            type: 'Terreno',
            status: 'En venta'
          }
        ];

        await Property.insertMany(sampleProperties);
        console.log(`✅ ${sampleProperties.length} propiedades de ejemplo creadas`);
      } else {
        console.log(`🏠 Ya existen ${propertiesCount} propiedades en la base de datos`);
      }

      console.log('🌱 Seed completado correctamente');
    } catch (error) {
      console.error('❌ Error en seed:', error);
    }
  }
};