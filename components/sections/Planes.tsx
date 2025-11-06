"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const planes = [
  {
    id: 1,
    nombre: "Freelancer",
    descripcion:
      "Ideal para contractors, creadores y profesionales que venden su talento online",
    features: [
      "Declaraciones de monotributo o régimen general",
      "Estrategia impositiva completa y gestión de flujos de pago",
      "Proyección impositiva mensual y reportes periódicos",
      "Asesoramiento ilimitado por meet, mail o whatsapp",
    ],
    popular: false,
  },
  {
    id: 2,
    nombre: "E-commerce Seller",
    descripcion:
      "Pensado para vendedores de Mercado Libre y tiendas online",
    features: [
      "Declaraciones de monotributo o IVA, y convenio multilateral",
      "Análisis de tributación efectiva, y proyección impositiva mensual",
      "Gestión de certificados provinciales de no-retención",
      "Retenciones por facturas META Business y asesoramiento ilimitado",
    ],
    popular: true,
  },
  {
    id: 3,
    nombre: "Importador",
    descripcion:
      "Diseñado para importadores de productos que venden por internet",
    features: [
      "Declaraciones de IVA y Convenio Multilateral",
      "Contabilidad y cómputo de despachos de importación",
      "Control de costos y punto de equilibrio del producto",
      "Asesoramiento en estructuras fiscales mixtas (local + exterior)",
    ],
    popular: false,
  },
  {
    id: 4,
    nombre: "SAS",
    descripcion: "Creado para empresas que buscan ir más allá",
    features: [
      "Constitución de Sociedad por Acciones Simplificada",
      "Liquidaciones mensuales de IVA, Ingresos Brutos y Ganancias",
      "Administración de sueldos, cargas y retenciones",
      "Asesoramiento en dividendos, honorarios y planificación impositiva",
    ],
    popular: false,
  },
  {
    id: 5,
    nombre: "Growth",
    descripcion:
      "Tu contabilidad centralizada, tus proyectos ordenados y una mirada estratégica para seguir creciendo",
    features: [
      "Reportes financieros personalizados",
      "Asesoramiento impositivo estratégico",
      "Declaraciones impositivas mensuales y anuales",
      "Reuniones periódicas de análisis y optimización",
    ],
    popular: false,
  },
];

export default function Planes() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      }
    });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="planes"
      className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Decoración */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-contablix-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-contablix-green/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Planes a tu medida
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sea cual sea tu tipo de negocio digital, tenemos un plan que se
            adapta a tu forma de trabajar
          </p>
        </motion.div>

        {/* Grid de planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {planes.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative"
            >
              <div
                className={`h-full p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular
                    ? "bg-gradient-to-br from-contablix-blue to-contablix-blue/90 text-white shadow-2xl scale-105"
                    : "bg-white border-2 border-gray-200 hover:border-contablix-blue/30 hover:shadow-xl"
                }`}
              >
                {/* Badge popular */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 bg-contablix-green text-white text-sm font-bold rounded-full shadow-lg">
                      MÁS POPULAR
                    </div>
                  </div>
                )}

                {/* Nombre */}
                <h3
                  className={`text-3xl font-bold mb-3 ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.nombre}
                </h3>

                {/* Descripción */}
                <p
                  className={`mb-8 leading-relaxed ${
                    plan.popular ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {plan.descripcion}
                </p>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          plan.popular
                            ? "bg-white/20"
                            : "bg-contablix-green/10"
                        }`}
                      >
                        <Check
                          className={`w-3.5 h-3.5 ${
                            plan.popular ? "text-white" : "text-contablix-green"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm leading-relaxed ${
                          plan.popular ? "text-white/95" : "text-gray-700"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => scrollToSection("cotizador")}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                    plan.popular
                      ? "bg-white text-contablix-blue hover:bg-gray-100 hover:scale-105"
                      : "bg-contablix-blue text-white hover:bg-contablix-blue/90 hover:scale-105"
                  }`}
                >
                  Seleccionar plan
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA General + Anti-CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <button
            onClick={() => scrollToSection("como-funciona")}
            className="px-8 py-4 bg-contablix-blue text-white rounded-full font-semibold text-lg hover:bg-contablix-blue/90 transition-all hover:scale-105 shadow-lg"
          >
            Agendá una reunión gratuita y te ayudamos a elegir el plan ideal
          </button>

          <div className="text-sm text-gray-500">
            ¿Preferís un servicio tradicional?{" "}
            <a
              href="https://www.cpce.org.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-contablix-blue hover:underline font-medium"
            >
              Lista de matriculados →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
