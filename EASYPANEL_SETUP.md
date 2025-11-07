# 🚀 Configuración para EasyPanel

Guía paso a paso para deployar Contablix en EasyPanel.

---

## ⚠️ IMPORTANTE: Si el contenedor no inicia

Si ves "No se encontraron contenedores en ejecución", el contenedor crasheó al iniciar.

### 🔍 Paso 1: Ver los logs del build

1. En EasyPanel, ve a tu servicio
2. Click en pestaña **"Logs"**
3. Busca errores en rojo
4. **Copia esos logs** y envíamelos

---

## 📝 Configuración en EasyPanel

### 1. Crear nuevo servicio

- Tipo: **App**
- Nombre: `contablix-web`
- Fuente: Git Repository

### 2. Configurar Git

- Repository: Tu repo de Git
- Branch: `claude/contablix-landing-page-011CUocJJVeaJQzELZ3coUcQ`
- Dockerfile path: `Dockerfile.easypanel` (el simplificado)

### 3. Configurar Build

**Variables de entorno de BUILD:**
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 4. Configurar Runtime

**Variables de entorno de RUNTIME:**
```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

### 5. Configurar Puertos

**Port Mapping:**
- Container Port: `3000`
- Public Port: `80` (o el que quieras)
- Protocol: `HTTP`

### 6. Configurar Health Check (OPCIONAL)

**Si quieres usar health check:**
- Path: `/api/health`
- Port: `3000`
- Interval: `30s`
- Timeout: `10s`
- Retries: `3`
- Start Period: `40s`

**Si da problemas, DESHABILÍTALO.**

### 7. Recursos

- CPU: `0.5` cores mínimo
- Memory: `512MB` mínimo

---

## 🐛 Si el contenedor sigue crasheando

### Opción 1: Usar Dockerfile simplificado

En EasyPanel, cambia el Dockerfile path a:
```
Dockerfile.easypanel
```

Este archivo **NO tiene health check** y es más simple.

### Opción 2: Build manual y debug

1. **SSH a tu servidor**

2. **Clonar el repo:**
```bash
git clone <TU_REPO>
cd virus
git checkout claude/contablix-landing-page-011CUocJJVeaJQzELZ3coUcQ
```

3. **Build manual:**
```bash
docker build -f Dockerfile.easypanel -t contablix-test .
```

4. **Ver si el build funciona:**
```bash
# Si el build falla, verás el error aquí
```

5. **Si el build funciona, probar el contenedor:**
```bash
docker run -it --rm -p 3000:3000 contablix-test
```

6. **Probar en tu navegador:**
```
http://TU_IP:3000
```

7. **Ver logs:**
```bash
docker logs <CONTAINER_ID>
```

---

## 🎯 Configuración Recomendada para EasyPanel

```yaml
Service Type: App
Build:
  - Source: Git
  - Branch: claude/contablix-landing-page-011CUocJJVeaJQzELZ3coUcQ
  - Dockerfile: Dockerfile.easypanel
  - Build Args: (ninguno)

Environment (Build):
  - NODE_ENV=production

Environment (Runtime):
  - NODE_ENV=production
  - PORT=3000
  - HOSTNAME=0.0.0.0

Ports:
  - 3000:80 (o 3000:443 si usas SSL)

Health Check: DESHABILITADO (EasyPanel lo maneja)

Resources:
  - CPU: 0.5-1 core
  - Memory: 512MB-1GB
```

---

## 🔥 Solución Rápida: Dockerfile Ultra-Simple

Si nada funciona, reemplaza `Dockerfile.easypanel` con esto:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Build
ENV NODE_ENV=production
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Iniciar
CMD ["npm", "start"]
```

Este es el Dockerfile MÁS SIMPLE posible. No es tan optimizado, pero debería funcionar siempre.

---

## 📊 Checklist de Troubleshooting

- [ ] Ver logs del build en EasyPanel
- [ ] Verificar que NODE_ENV=production esté configurado
- [ ] Usar Dockerfile.easypanel en lugar de Dockerfile
- [ ] Deshabilitar health check
- [ ] Verificar que el puerto sea 3000
- [ ] Aumentar memoria a 512MB mínimo
- [ ] Build manual en SSH para ver errores
- [ ] Usar Dockerfile ultra-simple si nada funciona

---

## 🆘 Información que necesito para ayudarte

Si sigues con problemas, envíame:

### 1. Logs del build (desde EasyPanel o SSH):
```bash
# Si hiciste build manual
docker build -f Dockerfile.easypanel -t contablix-test . 2>&1 | tee build.log
```

### 2. Logs del contenedor (si se creó):
```bash
docker ps -a  # Ver ID del contenedor
docker logs <CONTAINER_ID> --tail 100 > container.log
```

### 3. Screenshot de la configuración en EasyPanel:
- Variables de entorno
- Port mapping
- Health check settings

Con esa info te digo exactamente qué está fallando.

---

## 💡 Tip Final

EasyPanel a veces tiene caché agresivo. Si hiciste cambios:

1. En EasyPanel, **elimina el servicio completamente**
2. Vuelve a crearlo desde cero
3. Espera 2-3 minutos para el primer build
4. Revisa los logs durante el build

---

## 🎉 Si funciona

Deberías ver en EasyPanel:
- Estado: **Verde** (Running)
- CPU/Memory: Mostrando uso
- Logs: "Listening on port 3000" o similar
- En navegador: Tu landing page funcionando

