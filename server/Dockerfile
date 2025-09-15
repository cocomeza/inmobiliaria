# Dockerfile para Railway - Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for TypeScript)
RUN npm ci

# Copiar código fuente
COPY . .

# Build del proyecto TypeScript
RUN npm run build

# Segunda etapa - Runtime
FROM node:18-alpine AS runtime

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Install solo production dependencies
RUN npm ci --only=production

# Copiar el código compilado desde la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data

# Crear directorio uploads
RUN mkdir -p uploads

# Variables de entorno para producción
ENV NODE_ENV=production

# Puerto estándar
EXPOSE 4000

# Comando de inicio
CMD ["npm", "start"]