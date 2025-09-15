# 🔧 SOLUCIÓN PARA LOGIN EN RAILWAY

## 🎯 PROBLEMA IDENTIFICADO:
El frontend de Railway está haciendo requests a sí mismo en lugar del backend separado.

## 📋 PASOS PARA SOLUCIONARLO:

### 1. CONFIGURAR FRONTEND EN RAILWAY
**Dashboard Railway → Servicio Frontend (inmobiliaria-react-ts-production) → Variables de entorno:**

Agregar esta variable:
```
VITE_API_URL = https://inmobiliaria-fullstack-production-069c.up.railway.app
```

### 2. VERIFICAR BACKEND EN RAILWAY  
**Dashboard Railway → Servicio Backend (inmobiliaria-fullstack-production) → Variables de entorno:**

Asegúrate de tener:
```
JWT_SECRET = inmob2024_secret_key_xyz
ADMIN_USERNAME = admin
ADMIN_PASSWORD = inmobiliaria123
NODE_ENV = production
```

### 3. REDEPLOY SERVICIOS
1. **Redeploy Frontend** después de agregar VITE_API_URL
2. **Redeploy Backend** si faltaban variables

### 4. PROBAR LOGIN
- Ve a: `https://inmobiliaria-react-ts-production.up.railway.app/login`
- Usuario: `admin`
- Contraseña: `inmobiliaria123`

## ✅ ¿POR QUÉ FUNCIONA EN DESARROLLO?
- En Replit/VS Code: Frontend y backend en mismo puerto (proxy de Vite)
- En Railway: Frontend y backend en URLs separadas → Necesita VITE_API_URL

## 🔧 EXPLICACIÓN TÉCNICA:
El archivo `client/src/lib/api.ts` usa `import.meta.env.VITE_API_URL` cuando está definida, sino usa rutas relativas que fallan en Railway con servicios separados.