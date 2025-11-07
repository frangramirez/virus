# Contablix Landing Page

Landing page minimalista y dinámica para **Contablix**, el estudio contable del emprendedor digital en Argentina.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ed)

## 🚀 Características

- ✨ **Diseño minimalista** inspirado en Apple con efectos dramáticos
- 🎭 **Animaciones avanzadas** con GSAP y Framer Motion
- 📱 **100% Responsive** - Mobile-first design
- ⚡ **Performance optimizada** - Next.js 14 con output standalone
- 🎨 **Transición dramática** de claro a oscuro en sección CTA
- 📋 **Cotizador wizard** multi-paso con React Hook Form
- 🔍 **SEO optimizado** - Meta tags, Schema.org, Open Graph
- 🐳 **Docker ready** - Deploy fácil con Docker y Docker Compose
- 🔒 **Seguro** - Headers de seguridad, HTTPS ready

## 📦 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animaciones**: GSAP 3 + Framer Motion
- **Formularios**: React Hook Form
- **Icons**: Lucide React
- **Deploy**: Docker + Nginx

## 🛠️ Desarrollo Local

### Requisitos

- Node.js 20+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/virus.git
cd virus

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de producción

```bash
# Build
npm run build

# Ejecutar en producción
npm start
```

## 🐳 Deploy con Docker

### Deploy rápido

```bash
# Build y levantar con Docker Compose
docker compose up -d --build

# Verificar que está corriendo
curl http://localhost:3000/api/health
```

### Documentación completa

Ver [DOCKER_DEPLOY.md](./DOCKER_DEPLOY.md) para instrucciones detalladas de deploy con Docker, incluyendo:

- Configuración de Nginx como reverse proxy
- Setup de SSL con Let's Encrypt
- Monitoreo y troubleshooting
- Actualizaciones y rollbacks

### Script de deploy automático

```bash
# Hacer ejecutable
chmod +x deploy.sh

# Ejecutar
./deploy.sh
```

## 📁 Estructura del Proyecto

```
contablix-landing/
├── app/
│   ├── api/health/          # Health check endpoint
│   ├── layout.tsx           # Layout principal con SEO
│   ├── page.tsx             # Página principal
│   └── globals.css          # Estilos globales
├── components/
│   ├── sections/            # Secciones de la landing
│   │   ├── Hero.tsx
│   │   ├── Dolores.tsx
│   │   ├── Justificacion.tsx
│   │   ├── Autoridad.tsx
│   │   ├── Planes.tsx
│   │   ├── ComoFunciona.tsx
│   │   ├── Testimonios.tsx
│   │   └── Cotizador.tsx
│   ├── Header.tsx           # Header sticky inteligente
│   ├── Footer.tsx           # Footer
│   └── FloatingButton.tsx   # Botón flotante animado
├── lib/
│   └── utils.ts             # Utilidades
├── public/                  # Assets estáticos
├── Dockerfile               # Dockerfile multi-stage
├── docker-compose.yml       # Configuración de Docker Compose
├── deploy.sh                # Script de deploy automático
└── nginx.conf.example       # Ejemplo de config Nginx
```

## 🎨 Secciones de la Landing

1. **Hero** - Introducción impactante con gradientes animados
2. **Dolores** - 4 pain points del cliente target
3. **Justificación** - 3 pilares del servicio
4. **Autoridad** - Slider infinito con logos de plataformas
5. **Planes** - 5 planes detallados con pricing
6. **Cómo Funciona** - Timeline de 3 pasos
7. **Testimonios** - 6 testimonios de clientes
8. **Cotizador** - Wizard multi-paso con transición a negro
9. **Footer** - Enlaces y contacto

## 🎯 Próximas Mejoras

- [ ] Integración con Brevo/Odoo para formularios
- [ ] Video de fondo en Hero section
- [ ] Figuras 3D de Spline o Dribbble
- [ ] Blog con Sanity CMS
- [ ] Subpáginas de servicios individuales
- [ ] Google Analytics / Plausible
- [ ] Tests E2E con Playwright

## 🔧 Variables de Entorno

Ver [.env.example](./.env.example) para configuración disponible.

```bash
# Copiar ejemplo
cp .env.example .env.production

# Editar según necesidad
nano .env.production
```

## 📊 Performance

- ⚡ Lighthouse Score: 95+
- 🎯 First Contentful Paint: < 1.5s
- 📦 Total Bundle Size: < 300KB (gzipped)
- 🖼️ Optimización de imágenes: WebP + lazy loading

## 🤝 Contribuir

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Proyecto privado - Todos los derechos reservados © Contablix

## 📞 Contacto

**Contablix** - [hola@contablix.com](mailto:hola@contablix.com)

Web: [https://contablix.com](https://contablix.com)
