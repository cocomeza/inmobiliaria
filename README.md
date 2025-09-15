# 🏠 Aplicación Inmobiliaria Web

Una aplicación web completa para gestionar propiedades inmobiliarias, desarrollada con React y Node.js. Perfecta para inmobiliarias que quieren mostrar sus propiedades en línea y gestionarlas fácilmente.

## 🌟 Características Principales

- **🏡 Catálogo de Propiedades**: Muestra todas las propiedades disponibles con imágenes, precios y detalles
- **🔧 Panel de Administración**: Gestiona propiedades fácilmente (crear, editar, eliminar)
- **🔐 Autenticación Segura**: Login protegido con JWT para acceder al panel de admin
- **📸 Subida de Imágenes**: Agrega fotos a tus propiedades
- **💰 Filtros de Búsqueda**: Los usuarios pueden filtrar por precio, tipo, etc.
- **📱 Diseño Responsivo**: Funciona perfectamente en móviles, tablets, notebooks y PCs
- **🗺️ Mapas Interactivos**: Muestra la ubicación de las propiedades
- **📞 Contacto Directo**: Botón de WhatsApp y formulario de contacto

## 🛠️ Tecnologías Utilizadas

### Frontend (Cliente)
- **React 19** - Biblioteca para interfaces de usuario
- **TypeScript** - JavaScript con tipos para mayor seguridad
- **Bootstrap 5** - Framework de CSS para diseño responsivo
- **Vite** - Herramienta de desarrollo rápida
- **Wouter** - Router ligero para navegación
- **AOS** - Animaciones suaves
- **Leaflet** - Mapas interactivos

### Backend (Servidor)
- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web para APIs
- **TypeScript** - Para código más seguro
- **JWT (jsonwebtoken)** - Autenticación segura con tokens
- **Multer** - Manejo de archivos subidos
- **CORS** - Permite conexiones entre dominios

## 📥 Cómo Descargar y Usar la Aplicación

### Prerequisitos

Antes de empezar, necesitás tener instalado en tu computadora:
- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **Git** - [Descargar aquí](https://git-scm.com/)

### 1. Descargar el Proyecto

Abrí una terminal (Command Prompt en Windows, Terminal en Mac/Linux) y ejecutá:

```bash
# Clonar el repositorio
git clone [URL_DE_TU_REPOSITORIO]

# Entrar a la carpeta del proyecto
cd nombre-del-proyecto
```

### 2. Instalar Dependencias

```bash
# Instalar dependencias principales
npm install
```

**¡Importante!** Con este comando se instalan automáticamente todas las dependencias necesarias tanto para el cliente como para el servidor.

### 3. Ejecutar la Aplicación

```bash
# Ejecutar tanto el cliente como el servidor
npm run dev
```

Esto va a iniciar:
- **Servidor (Backend)**: http://localhost:4000
- **Cliente (Frontend)**: http://localhost:5000

### 4. Acceder a la Aplicación

- **Página Principal**: Abrí tu navegador y andá a `http://localhost:5000`
- **Panel de Admin**: Andá a `http://localhost:5000/admin` (requiere login)

## 📖 Cómo Usar la Aplicación

### Para Visitantes (Página Principal)
1. **Ver Propiedades**: En la página principal podés ver todas las propiedades disponibles
2. **Filtrar**: Usá los filtros para encontrar propiedades por precio, tipo, etc.
3. **Ver Detalles**: Hacé click en cualquier propiedad para ver más información y ubicación en el mapa
4. **Contactar**: Usá el formulario de contacto o el botón de WhatsApp flotante

### Para Administradores (Panel de Admin)

#### 🔐 Acceso al Panel de Administración
1. **Ir al Login**: Andá a `http://localhost:5000/admin` (serás redirigido automáticamente al login)
2. **Credenciales de Acceso**:
   - **Usuario**: `admin`
   - **Contraseña**: `inmobiliaria2024`
3. **Iniciar Sesión**: Completá el formulario y hacé click en "Ingresar"
4. **Panel de Admin**: Una vez autenticado, tendrás acceso completo para gestionar propiedades

#### Gestión de Propiedades
Después de iniciar sesión, vas a ver una tabla con todas las propiedades existentes y podrás:

#### Crear Nueva Propiedad
1. Hacé click en **"Nueva propiedad"**
2. Completá el formulario:
   - **Título**: Nombre de la propiedad (obligatorio)
   - **Precio USD**: Precio en dólares (obligatorio)
   - **Tipo**: Casa, Departamento, Local, etc.
   - **Descripción**: Detalles de la propiedad
   - **Estado**: En venta, En alquiler, Reservado, Vendido
3. **Subir Imágenes** (opcional):
   - Seleccioná una imagen desde tu computadora
   - Hacé click en "Subir"
   - Repetí para agregar más imágenes
4. Hacé click en **"Guardar"**

#### Editar Propiedad Existente
1. En la tabla de propiedades, hacé click en **"Editar"** en la fila de la propiedad que querés modificar
2. Modificá los campos que quieras cambiar
3. Para las imágenes:
   - **Agregar**: Subí nuevas imágenes como en el paso anterior
   - **Quitar**: Hacé click en "Quitar" al lado de la imagen que querés eliminar
4. Hacé click en **"Guardar"** para guardar los cambios

#### Eliminar Propiedad
1. En la tabla de propiedades, hacé click en **"Eliminar"**
2. Confirmá la eliminación en el diálogo que aparece
3. La propiedad será eliminada permanentemente

## 📁 Estructura del Proyecto

```
├── client/                 # Aplicación React (Frontend)
│   ├── src/
│   │   ├── components/    # Componentes reutilizables (Navbar, Footer, etc.)
│   │   ├── pages/         # Páginas de la aplicación
│   │   │   ├── Home.tsx   # Página principal
│   │   │   ├── Admin.tsx  # Panel de administración
│   │   │   └── ...        # Otras páginas
│   │   ├── data/          # Datos de ejemplo
│   │   └── assets/        # Imágenes y recursos
│   ├── public/            # Archivos públicos
│   └── package.json       # Dependencias del cliente
│
├── server/                # Servidor Node.js (Backend)
│   ├── src/
│   │   └── index.ts       # Código principal del servidor
│   ├── data/              # Base de datos (archivos JSON)
│   │   └── properties.json # Propiedades guardadas
│   ├── uploads/           # Imágenes subidas
│   └── package.json       # Dependencias del servidor
│
├── package.json           # Scripts principales
└── README.md             # Este archivo
```

## 🔧 Scripts Disponibles

```bash
# Ejecutar en desarrollo (cliente + servidor)
npm run dev

# Construir para producción
npm run build

# Solo servidor backend
npm run start:server

# Solo cliente frontend
npm run build:client

# Preview de la versión construida
npm run preview
```

## 🚀 Poner en Producción

### Para Replit (Recomendado para principiantes)
1. **Creá una cuenta** en [Replit.com](https://replit.com)
2. **Subí tu código** a GitHub primero
3. **Importá el proyecto** desde GitHub en Replit
4. **Ejecutá** `npm install` (Replit lo hace automáticamente)
5. **Iniciá** la aplicación con `npm run dev`
6. **Publicá** usando el botón "Publish" de Replit

### Para Netlify (Solo Frontend)
1. **Construí** la aplicación: `npm run build:client`
2. **Subí** la carpeta `client/dist` a Netlify
3. **Configurá** redirects para las rutas de la SPA

### Para Vercel
1. **Conectá** tu repositorio de GitHub
2. **Configurá** Build Command: `npm run build:client`
3. **Configurá** Output Directory: `client/dist`

## 🐛 Solución de Problemas Comunes

### Error "Cannot GET /admin"
**Problema**: La página del admin no carga
**Solución**: 
- Asegurate de que ambos servidores estén ejecutándose con `npm run dev`
- Verificá que no haya errores en la terminal

### Las imágenes no se muestran
**Problema**: Las fotos subidas no aparecen
**Solución**: 
- Verificá que la carpeta `server/uploads/` exista
- Reiniciá la aplicación con `npm run dev`

### Error "Cannot find module"
**Problema**: Faltan dependencias
**Solución**: 
- Ejecutá `npm install` en el directorio raíz
- Si persiste el error, borrá `node_modules` y `package-lock.json`, luego ejecutá `npm install` de nuevo

### Puerto ocupado
**Problema**: Error "Port already in use"
**Solución**: 
- En Windows: `taskkill /f /im node.exe`
- En Mac/Linux: `pkill node`
- O reiniciá tu computadora

### Página en blanco
**Problema**: La aplicación no carga nada
**Solución**:
- Abrí las herramientas de desarrollador (F12)
- Revisá la consola en busca de errores
- Asegurate de ir a `http://localhost:5000` (no 4000)

## 🎨 Personalización

### Cambiar Colores y Estilos
- **Colores principales**: Editá `client/src/theme.css`
- **Estilos adicionales**: Modificá `client/src/App.css`
- **Logo**: Reemplazá `client/public/logo.png`

### Cambiar Información de Contacto
1. **WhatsApp**: Editá `client/src/components/WhatsAppButton.tsx`
2. **Datos de contacto**: Modificá `client/src/pages/Contact.tsx`

### Agregar Nuevos Campos a las Propiedades
1. **Backend**: Actualizá el tipo `Property` en `server/src/index.ts`
2. **Frontend**: Modificá `client/src/pages/Admin.tsx` para agregar los campos al formulario

### Cambiar Textos
- Todos los textos están en español argentino
- Podés cambiarlos directamente editando los archivos de componentes
- Buscá las palabras que querés cambiar en los archivos `.tsx`

## 🔒 Seguridad

### ✅ Características de Seguridad Implementadas
- **🔐 Autenticación JWT**: El panel de admin está protegido con login seguro
- **🛡️ Rutas Protegidas**: Solo usuarios autenticados pueden crear, editar o eliminar propiedades
- **⏰ Tokens con Expiración**: Los tokens de autenticación expiran después de 24 horas
- **🚪 Logout Seguro**: Función de cierre de sesión que limpia todos los datos

### 🔧 Configuración de Seguridad para Producción

**Para mayor seguridad en producción, considerá:**

1. **Cambiar Credenciales por Defecto**:
   ```bash
   # Variables de entorno recomendadas
   ADMIN_USERNAME=tu_usuario_seguro
   ADMIN_PASSWORD=tu_contraseña_muy_segura
   JWT_SECRET=tu_clave_secreta_muy_larga_y_compleja
   ```

2. **Configuraciones Adicionales**:
   - Usar HTTPS en producción
   - Configurar CORS para dominios específicos
   - Agregar límites de intentos de login
   - Implementar logs de auditoría

### 🛡️ Credenciales por Defecto
- **Usuario**: `admin`
- **Contraseña**: `inmobiliaria2024`
- **Recomendación**: ¡Cambiá estas credenciales antes de poner la aplicación en producción!

## 📞 Soporte y Ayuda

Si tenés problemas:

1. **Revisá** la sección "Solución de Problemas Comunes"
2. **Verificá** que Node.js esté instalado: `node --version`
3. **Asegurate** de haber ejecutado `npm install`
4. **Comprobá** que ambos servidores estén ejecutándose
5. **Buscá** errores en la terminal donde ejecutaste `npm run dev`

### Comandos Útiles para Debuggear

```bash
# Ver versión de Node.js
node --version

# Ver versión de npm
npm --version

# Limpiar cache de npm
npm cache clean --force

# Ver puertos ocupados (Linux/Mac)
lsof -i :4000
lsof -i :5000

# Ver puertos ocupados (Windows)
netstat -ano | findstr :4000
netstat -ano | findstr :5000
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT. Podés usarlo, modificarlo y distribuirlo libremente.

---

**¡Listo! Tu aplicación inmobiliaria está funcionando.** 🎉

**Próximos pasos sugeridos:**
- Personalizá los colores y estilos
- Agregá tus propias propiedades desde el panel de admin
- Configurá tu información de contacto
- Subí la aplicación a un hosting para que esté disponible en internet

¿Necesitás ayuda con algo específico? ¡Revisá la sección de soporte o buscá en los archivos del proyecto!
