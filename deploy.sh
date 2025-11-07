#!/bin/bash

# Script de deploy automático para Contablix Landing Page
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando deploy de Contablix Landing Page..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado. Por favor instalar Docker primero."
    exit 1
fi

# Verificar que Docker Compose está instalado
if ! command -v docker compose &> /dev/null; then
    print_error "Docker Compose no está instalado. Por favor instalar Docker Compose primero."
    exit 1
fi

print_info "Docker y Docker Compose encontrados ✓"

# Pull de últimos cambios (si estamos en un repo git)
if [ -d .git ]; then
    print_info "Actualizando código desde Git..."
    git pull
else
    print_warning "No es un repositorio Git, saltando git pull"
fi

# Verificar que existe docker-compose.yml
if [ ! -f docker-compose.yml ]; then
    print_error "No se encontró docker-compose.yml"
    exit 1
fi

# Detener contenedores existentes
print_info "Deteniendo contenedores existentes..."
docker compose down || true

# Limpiar imágenes antiguas (opcional)
read -p "¿Limpiar imágenes Docker antiguas? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Limpiando imágenes antiguas..."
    docker image prune -f
fi

# Build de la imagen
print_info "Construyendo imagen Docker..."
docker compose build --no-cache

# Levantar servicio
print_info "Levantando servicio..."
docker compose up -d

# Esperar a que el servicio esté listo
print_info "Esperando a que el servicio esté listo..."
sleep 5

# Verificar health check
print_info "Verificando health del servicio..."
for i in {1..10}; do
    if curl -f http://localhost:3000/api/health &> /dev/null; then
        print_info "✓ Servicio corriendo correctamente en http://localhost:3000"
        break
    fi

    if [ $i -eq 10 ]; then
        print_error "El servicio no respondió después de 30 segundos"
        print_info "Mostrando logs:"
        docker compose logs --tail 50
        exit 1
    fi

    print_warning "Esperando... ($i/10)"
    sleep 3
done

# Mostrar logs
print_info "Últimas líneas de logs:"
docker compose logs --tail 20

# Mostrar status
print_info "Status del contenedor:"
docker compose ps

print_info "✅ Deploy completado exitosamente!"
print_info ""
print_info "Comandos útiles:"
print_info "  Ver logs: docker compose logs -f"
print_info "  Reiniciar: docker compose restart"
print_info "  Detener: docker compose down"
print_info "  Stats: docker stats contablix-web"
