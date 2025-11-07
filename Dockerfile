# Dockerfile multi-stage optimizado para Next.js 14
# Basado en las mejores prácticas de Next.js y Docker

# Stage 1: Dependencias
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci --only=production && \
    cp -R node_modules /tmp/node_modules && \
    npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependencias del stage anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables de entorno para el build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build de la aplicación
RUN npm run build

# Stage 3: Runner (imagen final)
FROM node:20-alpine AS runner
WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copiar archivos necesarios (ORDEN IMPORTANTE)
# 1. Primero standalone
COPY --from=builder /app/.next/standalone ./
# 2. Luego public
COPY --from=builder /app/public ./public
# 3. Finalmente static
COPY --from=builder /app/.next/static ./.next/static

# Cambiar permisos
RUN chown -R nextjs:nodejs /app

# Usar usuario no-root
USER nextjs

# Exponer puerto
EXPOSE 3000

# Health check simplificado (comentar si EasyPanel da problemas)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Comando de inicio
CMD ["node", "server.js"]
