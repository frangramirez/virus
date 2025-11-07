# 🚨 Guía de Troubleshooting para EasyPanel

## Estado Amarillo/Unhealthy en EasyPanel

Si el servicio aparece en amarillo en EasyPanel, sigue estos pasos:

---

## 🔍 PASO 1: Ver logs inmediatamente

En EasyPanel o por SSH:

```bash
# Ver logs del contenedor (últimas 100 líneas)
docker logs <NOMBRE_CONTENEDOR> --tail 100

# Ver logs en tiempo real
docker logs <NOMBRE_CONTENEDOR> -f
```

**Busca estos errores comunes:**
- `Error: Cannot find module`
- `EADDRINUSE` (puerto ya en uso)
- `permission denied`
- `Module not found`
- Build errors

---

## 🔍 PASO 2: Verificar que el contenedor está corriendo

```bash
# Ver todos los contenedores
docker ps -a

# Busca el estado (STATUS):
# - "Up X minutes" = Corriendo ✅
# - "Restarting" = Fallo cíclico ❌
# - "Exited" = Murió ❌
```

---

## 🔍 PASO 3: Probar el puerto manualmente

```bash
# Desde el servidor, probar el puerto
curl http://localhost:3000
# o
curl http://localhost:3000/api/health

# Si responde JSON = Funciona ✅
# Si no responde = Problema ❌
```

---

## 🔧 SOLUCIÓN 1: Deshabilitar Health Check

Si el contenedor está corriendo pero EasyPanel lo marca como unhealthy:

### Opción A: En EasyPanel
1. Ve a la configuración del servicio
2. Busca "Health Check"
3. Deshabilítalo temporalmente

### Opción B: En Dockerfile
Comenta la línea del health check:

```dockerfile
# HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
#   CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1
```

Luego rebuild:
```bash
docker compose down
docker compose up -d --build
```

---

## 🔧 SOLUCIÓN 2: Verificar variables de entorno en EasyPanel

En EasyPanel, asegúrate que estas variables estén configuradas:

```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

---

## 🔧 SOLUCIÓN 3: Verificar mapeo de puertos en EasyPanel

En EasyPanel:
1. Ve a "Domains" o "Routing"
2. Verifica que el puerto interno sea **3000**
3. El puerto externo puede ser cualquiera (80, 443, etc.)

Ejemplo correcto:
```
External: 80 → Internal: 3000
```

---

## 🔧 SOLUCIÓN 4: Entrar al contenedor y debuguear

```bash
# Entrar al contenedor
docker exec -it <NOMBRE_CONTENEDOR> sh

# Dentro del contenedor, verificar:

# 1. Ver archivos
ls -la

# 2. Verificar que existe server.js
ls server.js

# 3. Verificar node
node --version

# 4. Probar el servidor manualmente
node server.js &
wget http://localhost:3000/api/health

# 5. Ver procesos
ps aux

# Salir
exit
```

---

## 🔧 SOLUCIÓN 5: Rebuild desde cero

```bash
# Detener y eliminar todo
docker compose down -v

# Limpiar imágenes
docker system prune -a -f

# Rebuild sin cache
docker compose build --no-cache

# Levantar
docker compose up -d
```

---

## 🔧 SOLUCIÓN 6: Usar Dockerfile sin health check

Si nada funciona, usa este Dockerfile simplificado:

```dockerfile
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 📊 Checklist de Diagnóstico

- [ ] Ver logs: `docker logs <NOMBRE> --tail 100`
- [ ] Contenedor corriendo: `docker ps`
- [ ] Puerto responde: `curl http://localhost:3000`
- [ ] Health check deshabilitado (si da problemas)
- [ ] Variables de entorno configuradas
- [ ] Puertos mapeados correctamente (3000 interno)
- [ ] Rebuild sin cache

---

## 🆘 Si nada funciona

**Pasame esta información:**

1. **Logs completos:**
```bash
docker logs <NOMBRE_CONTENEDOR> --tail 200 > logs.txt
```

2. **Estado del contenedor:**
```bash
docker ps -a
```

3. **Inspect del contenedor:**
```bash
docker inspect <NOMBRE_CONTENEDOR> > inspect.txt
```

4. **Build logs (si rebuildeaste):**
```bash
docker compose build --no-cache 2>&1 | tee build.txt
```

Enviame esos archivos y te ayudo a resolver el problema específico.

---

## 💡 Tip para EasyPanel

EasyPanel a veces es quisquilloso con health checks. **La solución más rápida:**

1. En EasyPanel, ve a tu servicio
2. En "Advanced" o "Health Check", **deshabilitalo**
3. Usa el health check propio de EasyPanel:
   - Path: `/api/health`
   - Port: `3000`
   - Method: `GET`

Esto suele funcionar mejor que el HEALTHCHECK del Dockerfile.
