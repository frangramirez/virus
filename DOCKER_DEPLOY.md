# 🐳 Deploy de Contablix con Docker

Guía completa para deployar la landing page de Contablix usando Docker en tu servidor.

## 📋 Requisitos Previos

- Docker Engine 20.10+
- Docker Compose 2.0+ (opcional pero recomendado)
- Al menos 1GB de RAM disponible
- Puerto 3000 libre (o configurar otro)

### Instalar Docker en Ubuntu/Debian

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependencias
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Agregar repo de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Verificar instalación
docker --version
docker compose version
```

## 🚀 Opción 1: Deploy con Docker Compose (Recomendado)

### 1. Clonar el repositorio en tu servidor

```bash
git clone https://github.com/tu-usuario/virus.git
cd virus
git checkout claude/contablix-landing-page-011CUocJJVeaJQzELZ3coUcQ
```

### 2. (Opcional) Configurar variables de entorno

Si necesitas variables de entorno personalizadas, crea un archivo `.env.production`:

```bash
cat > .env.production << EOF
NODE_ENV=production
PORT=3000
# Agregar otras variables aquí si es necesario
EOF
```

Luego descomentar estas líneas en `docker-compose.yml`:
```yaml
env_file:
  - .env.production
```

### 3. Build y levantar el contenedor

```bash
# Build de la imagen
docker compose build

# Levantar el servicio en background
docker compose up -d

# Ver logs
docker compose logs -f contablix-web
```

### 4. Verificar que está corriendo

```bash
# Ver estado del contenedor
docker compose ps

# Verificar health check
curl http://localhost:3000/api/health

# Acceder a la web
curl http://localhost:3000
```

### 5. Comandos útiles

```bash
# Ver logs en tiempo real
docker compose logs -f

# Reiniciar el servicio
docker compose restart

# Detener el servicio
docker compose down

# Detener y eliminar volúmenes
docker compose down -v

# Rebuild (si hiciste cambios)
docker compose up -d --build

# Ver uso de recursos
docker stats contablix-web
```

## 🔧 Opción 2: Deploy con Docker (sin Compose)

### 1. Build de la imagen

```bash
docker build -t contablix-landing:latest .
```

### 2. Ejecutar el contenedor

```bash
docker run -d \
  --name contablix-web \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  contablix-landing:latest
```

### 3. Comandos útiles

```bash
# Ver logs
docker logs -f contablix-web

# Detener
docker stop contablix-web

# Iniciar
docker start contablix-web

# Reiniciar
docker restart contablix-web

# Eliminar
docker rm -f contablix-web

# Ver stats
docker stats contablix-web
```

## 🌐 Configurar Nginx como Reverse Proxy

Para exponer la app en el puerto 80/443 con un dominio personalizado:

### 1. Instalar Nginx

```bash
sudo apt install -y nginx
```

### 2. Crear configuración de Nginx

```bash
sudo nano /etc/nginx/sites-available/contablix
```

Agregar:

```nginx
server {
    listen 80;
    server_name contablix.com www.contablix.com;

    # Logs
    access_log /var/log/nginx/contablix-access.log;
    error_log /var/log/nginx/contablix-error.log;

    # Proxy a Docker
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache para assets estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3. Activar el sitio

```bash
sudo ln -s /etc/nginx/sites-available/contablix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Configurar SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d contablix.com -d www.contablix.com

# Auto-renovación (ya viene configurada)
sudo certbot renew --dry-run
```

## 🔄 Actualizar la Aplicación

### Con Docker Compose

```bash
# Pull de los últimos cambios
git pull origin claude/contablix-landing-page-011CUocJJVeaJQzELZ3coUcQ

# Rebuild y redeploy (sin downtime usando rolling update)
docker compose up -d --build
```

### Con Docker

```bash
# Pull de los últimos cambios
git pull origin claude/contablix-landing-page-011CUocJJVeaJQzELZ3coUcQ

# Rebuild de la imagen
docker build -t contablix-landing:latest .

# Recrear el contenedor
docker stop contablix-web
docker rm contablix-web
docker run -d \
  --name contablix-web \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  contablix-landing:latest
```

## 📊 Monitoreo y Logs

### Ver logs en tiempo real

```bash
# Docker Compose
docker compose logs -f contablix-web

# Docker
docker logs -f contablix-web
```

### Ver últimas 100 líneas

```bash
docker logs --tail 100 contablix-web
```

### Ver métricas de recursos

```bash
docker stats contablix-web
```

### Health Check

```bash
# Verificar salud del contenedor
docker inspect --format='{{.State.Health.Status}}' contablix-web

# Endpoint de health
curl http://localhost:3000/api/health
```

## 🔒 Seguridad

### 1. Configurar firewall

```bash
# Permitir SSH
sudo ufw allow OpenSSH

# Permitir HTTP y HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Habilitar firewall
sudo ufw enable
```

### 2. Limitar recursos del contenedor

Ya configurado en `docker-compose.yml`:
- CPU limit: 1 core
- Memory limit: 512MB

### 3. Ejecutar como usuario no-root

Ya configurado en el Dockerfile (usuario `nextjs`)

## 🐛 Troubleshooting

### El contenedor no inicia

```bash
# Ver logs de error
docker logs contablix-web

# Ver eventos de Docker
docker events
```

### Puerto 3000 ya en uso

```bash
# Ver qué proceso usa el puerto
sudo lsof -i :3000

# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"  # Usar puerto 3001 en el host
```

### Problemas de memoria

```bash
# Limpiar imágenes y contenedores no usados
docker system prune -a

# Liberar memoria caché
sync && echo 3 | sudo tee /proc/sys/vm/drop_caches
```

### Rebuild desde cero

```bash
# Detener y eliminar todo
docker compose down -v
docker system prune -a -f

# Build desde cero
docker compose build --no-cache
docker compose up -d
```

## 📈 Optimizaciones de Producción

### 1. Multi-stage build
✅ Ya implementado en el Dockerfile

### 2. Output standalone de Next.js
✅ Ya configurado en `next.config.ts`

### 3. Health checks
✅ Ya configurado en Dockerfile y docker-compose.yml

### 4. Restart policy
✅ Ya configurado: `restart: unless-stopped`

### 5. Resource limits
✅ Ya configurado en docker-compose.yml

## 🎯 Checklist Pre-Deploy

- [ ] DNS configurado apuntando al servidor
- [ ] Docker y Docker Compose instalados
- [ ] Firewall configurado (puertos 80, 443, SSH)
- [ ] Nginx instalado y configurado
- [ ] SSL configurado con Let's Encrypt
- [ ] Variables de entorno configuradas (si aplica)
- [ ] Backup del código y configuración

## 📞 Soporte

Si tenés problemas:

1. Revisar logs: `docker compose logs -f`
2. Verificar health: `curl http://localhost:3000/api/health`
3. Revisar recursos: `docker stats`
4. Limpiar y rebuild: `docker compose down && docker compose up -d --build`

---

## 🚀 Deploy Rápido (TL;DR)

```bash
# 1. Clonar repo
git clone https://github.com/tu-usuario/virus.git
cd virus
git checkout claude/contablix-landing-page-011CUocJJVeaJQzELZ3coUcQ

# 2. Build y deploy
docker compose up -d --build

# 3. Verificar
curl http://localhost:3000/api/health

# 4. Ver logs
docker compose logs -f
```

¡Listo! La aplicación está corriendo en http://localhost:3000
