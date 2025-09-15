# 🏠 Aplicación Inmobiliaria Web

Una aplicación web completa para publicar y gestionar propiedades inmobiliarias. Incluye un sitio público con listado y detalle de propiedades, y un panel de administración protegido para crear, editar y eliminar propiedades con subida de imágenes.

Esta guía está pensada para principiantes absolutos en Node.js, React y Git. Vas a encontrar pasos simples, tips y solución de problemas comunes.

## 🧭 ¿Qué es este proyecto?

- **Sitio público (Frontend)**: Catálogo con tarjetas, filtros, detalle con imágenes y precios, y contacto.
- **Panel de administración (Backend + Frontend protegido)**: Login con JWT y pantallas para gestionar propiedades (CRUD), incluyendo subida de imágenes.

## 🌟 Características

- **Catálogo con imágenes, precio y estado**
- **Búsqueda y filtros (tipo, precio, destacados)**
- **Detalle de propiedad**
- **Panel Admin con login**
- **Crear/Editar/Eliminar propiedades**
- **Subida de imágenes**
- **Diseño responsive (celular, tablet, PC)**

## 🛠️ Tecnologías utilizadas

### Frontend
- React + TypeScript (Vite)
- Bootstrap 5
- Wouter (router ligero)
- React Query (datos del API)

### Backend
- Node.js + Express
- TypeScript
- JWT para autenticación
- Multer para uploads
- MongoDB (a través de Mongoose)

## 📦 Requisitos previos (Windows, Mac o Linux)

- Node.js 18 o superior: `https://nodejs.org` (LTS recomendado)
- Git: `https://git-scm.com/downloads`

Verificá la instalación:
```bash
node --version
npm --version
git --version
```

## 🚀 Empezar en 5 pasos

1) Cloná el repositorio
```bash
git clone [URL_DE_TU_REPO]
cd inmobiliaria
```

2) Instalá dependencias (raíz)
```bash
npm install
```

3) Variables de entorno mínimas (opcional en dev)
- En desarrollo, el proyecto funciona sin Mongo si no configurás `.env`.
- Para usar base de datos y login real, creá `server/.env` con:
```bash
MONGO_URI=mongodb+srv://usuario:password@cluster/db
JWT_SECRET=una_clave_larga_y_segura
ADMIN_PASSWORD=tu_password_admin
ALLOW_SEEDING=true
```

4) Iniciá todo en modo desarrollo
```bash
npm run dev
```
- Frontend: `http://localhost:5000`
- Backend: `http://localhost:4000`

5) Entrá al panel de administración
- Navegá a `http://localhost:5000/admin`
- Logueate con el admin creado por seed (si configuraste `.env` con `ALLOW_SEEDING=true` y `ADMIN_PASSWORD`) o con tus propios usuarios.

## 📖 Uso rápido

- Página principal: lista propiedades destacadas y últimas.
- Propiedades: filtros por tipo y orden por precio.
- Detalle: fotos, descripción y precio.
- Admin: crear, editar, eliminar propiedades y subir imágenes.

## 📁 Estructura del proyecto (simplificada)

```
client/              # React (Vite)
  src/
    components/
    pages/
    lib/
server/              # Express + Mongoose
  src/
    models/
    services/
    middleware/
    app.ts
```

## 🔧 Scripts útiles

```bash
# Dev: frontend + backend
npm run dev

# Build producción
npm run build

# Solo backend (start prod)
npm run start:server

# Solo build del cliente
npm run build:client

# Preview del cliente (dist)
npm run preview
```

## 🧑‍💻 Guía express de Git y GitHub (para empezar rápido)

1) Inicializar Git dentro del proyecto
```bash
git init
```

2) Crear .gitignore básico (evitar subir `node_modules`, `dist`, `.env`)
```bash
echo node_modules/>>.gitignore
echo dist/>>.gitignore
echo .env>>.gitignore
echo server/uploads/>>.gitignore
```

3) Primer commit
```bash
git add .
git commit -m "Inicial: proyecto inmobiliaria funcionando"
git branch -M main
```

4) Crear el repo en GitHub
- Web: creá el repo vacío en tu cuenta.
- O con GitHub CLI: `gh repo create cocomeza/inmobiliaria --private --source . --remote origin --push`

5) Conectar y subir
```bash
git remote add origin https://github.com/USUARIO/REPO.git
git push -u origin main
```

Tips:
- En Windows PowerShell, corré comandos uno por uno (evitá `&&`).
- Si Git pide nombre/email: `git config user.name "Tu Nombre"` y `git config user.email "tu@email"`.

## 🔒 Seguridad y producción (resumen)

- Cambiá las credenciales por defecto antes de publicar.
- Definí variables de entorno seguras (`JWT_SECRET`, `ADMIN_*`, `MONGO_URI`).
- Habilitá HTTPS en tu hosting.

## 🐛 Problemas frecuentes y soluciones rápidas

- Pantalla en blanco: abrí consola del navegador (F12) y revisá errores.
- Puerto ocupado: reiniciá `npm run dev` o tu PC; en Windows `netstat -ano | findstr :5000`.
- No suben imágenes: verificá permisos de `server/uploads/` y reiniciá backend.
- Login falla: asegurate de tener `JWT_SECRET` y usuarios válidos o `ALLOW_SEEDING=true`.

## 📚 Explicación técnica en breve

- El cliente consulta `/api/properties` y mapea `_id`→`id` y `price`→`priceUsd`.
- Admin usa JWT en `Authorization: Bearer <token>` para crear/editar/eliminar.
- En el servidor, el modelo `Property` define enums para `type` y `status` y guarda `price`.
- Al crear/editar, el backend traduce `priceUsd` del cliente a `price` en MongoDB.

## ️ Subida de imágenes en producción (Cloudinary)

- Se usa Cloudinary, no el disco de Vercel (efímero). El backend sube el archivo a Cloudinary y guarda solo la URL en MongoDB.
- Endpoint: `POST /api/upload` (requiere token admin). Acepta `FormData('image', file)`.
- Validaciones: formatos permitidos `JPG/PNG/WEBP`, tamaño máximo `8MB`, límite de resolución y miniatura automática (400x300).
- Variables necesarias en Vercel:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

