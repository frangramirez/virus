#!/bin/bash

# Script de diagnóstico rápido para troubleshooting
# Uso: ./diagnose.sh [nombre_contenedor]

set +e  # No salir en errores

echo "🔍 Diagnóstico de Contablix Landing Page"
echo "========================================="
echo ""

# Detectar nombre del contenedor
if [ -z "$1" ]; then
    CONTAINER=$(docker ps -a | grep "contablix\|virus" | awk '{print $NF}' | head -1)
    if [ -z "$CONTAINER" ]; then
        echo "❌ No se encontró contenedor. Especifica el nombre:"
        echo "   ./diagnose.sh <nombre_contenedor>"
        exit 1
    fi
else
    CONTAINER=$1
fi

echo "📦 Contenedor detectado: $CONTAINER"
echo ""

# 1. Estado del contenedor
echo "1️⃣  Estado del contenedor:"
echo "---"
docker ps -a | grep "$CONTAINER"
echo ""

# 2. Logs (últimas 50 líneas)
echo "2️⃣  Logs (últimas 50 líneas):"
echo "---"
docker logs "$CONTAINER" --tail 50 2>&1
echo ""

# 3. Verificar si el puerto responde
echo "3️⃣  Verificando puerto 3000:"
echo "---"
PORTS=$(docker port "$CONTAINER" 2>/dev/null)
if [ -z "$PORTS" ]; then
    echo "❌ No hay puertos expuestos"
else
    echo "✅ Puertos: $PORTS"
fi
echo ""

# 4. Test del endpoint de health
echo "4️⃣  Test de health endpoint:"
echo "---"
# Obtener IP del contenedor
CONTAINER_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$CONTAINER" 2>/dev/null)

if [ -n "$CONTAINER_IP" ]; then
    echo "IP del contenedor: $CONTAINER_IP"
    curl -s -w "\nStatus: %{http_code}\n" "http://$CONTAINER_IP:3000/api/health" 2>/dev/null || echo "❌ No responde"
else
    echo "⚠️  No se pudo obtener IP del contenedor"
fi

# Test desde localhost
echo ""
echo "Test desde localhost:3000:"
curl -s -w "\nStatus: %{http_code}\n" "http://localhost:3000/api/health" 2>/dev/null || echo "❌ No responde en localhost"
echo ""

# 5. Procesos dentro del contenedor
echo "5️⃣  Procesos dentro del contenedor:"
echo "---"
docker exec "$CONTAINER" ps aux 2>/dev/null || echo "❌ No se puede acceder al contenedor"
echo ""

# 6. Variables de entorno
echo "6️⃣  Variables de entorno importantes:"
echo "---"
docker exec "$CONTAINER" env | grep -E "NODE_ENV|PORT|HOSTNAME" 2>/dev/null || echo "❌ No se puede acceder al contenedor"
echo ""

# 7. Verificar archivos críticos
echo "7️⃣  Archivos críticos:"
echo "---"
docker exec "$CONTAINER" ls -lh server.js 2>/dev/null || echo "❌ server.js no encontrado"
docker exec "$CONTAINER" ls -lh .next 2>/dev/null || echo "❌ .next no encontrado"
echo ""

# 8. Health check status
echo "8️⃣  Health check status:"
echo "---"
docker inspect "$CONTAINER" | grep -A 5 "Health" 2>/dev/null || echo "Sin health check configurado"
echo ""

# Resumen
echo "========================================="
echo "📊 RESUMEN"
echo "========================================="

STATUS=$(docker inspect -f '{{.State.Status}}' "$CONTAINER" 2>/dev/null)
HEALTH=$(docker inspect -f '{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null)

echo "Estado: $STATUS"
echo "Health: $HEALTH"
echo ""

if [ "$STATUS" != "running" ]; then
    echo "❌ PROBLEMA: El contenedor no está corriendo"
    echo "   Solución: Ver logs arriba para encontrar el error"
elif [ "$HEALTH" = "unhealthy" ]; then
    echo "⚠️  PROBLEMA: Health check fallando"
    echo "   Solución: Deshabilitar health check o aumentar start-period"
else
    echo "✅ El contenedor parece estar corriendo correctamente"
fi

echo ""
echo "💡 Para más información, ver TROUBLESHOOTING.md"
