"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Calendar, Headphones } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pasos = [
  {
    id: 1,
    numero: "01",
    icon: Search,
    titulo: "Diagnóstico",
    puntos: [
      "Reunión gratuita inicial para evaluar si somos el estudio que necesitás",
      "Consulta inicial para diagnosticar tu situación y planificar los puntos de optimización y el plan de acción",
    ],
    cta: "Agendá tu reunión gratuita ahora",
  },
  {
    id: 2,
    numero: "02",
    icon: Calendar,
    titulo: "Acompañamiento mensual",
    puntos: [
      "Capacitación inicial: para prevenir errores y asegurarnos que sabés perfectamente qué tenés que hacer y cuándo tenés que hacerlo",
      "Calendario mensual: Ordena el flujo de información entre el estudio y el emprendedor, evitando sorpresas y facilitando la planificación",
      "Cada mes liquidamos tus impuestos, enviamos reportes claros y proyecciones actualizadas",
    ],
    cta: null,
  },
  {
    id: 3,
    numero: "03",
    icon: Headphones,
    titulo: "Consultoría permanente",
    puntos: [
      "Contás con un asesor dedicado que conoce tu situación tanto como vos, quien te asesorará de forma ilimitada por meet, mail o whatsapp",
      "Nuestros packs incluyen consultoría estratégica y revisiones periódicas con los profesionales más experimentados del estudio",
      "Podés escribirnos o agendar un meet por cualquier duda puntual",
    ],
    cta: null,
  },
];

export default function ComoFunciona() {
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animación de la línea conectora
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animación de los pasos
    stepsRef.current.forEach((step, index) => {
      if (step) {
        gsap.fromTo(
          step,
          {
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2,
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
      id="como-funciona"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Decoración */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-contablix-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-contablix-green/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Un proceso simple que
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-contablix-blue to-contablix-green">
              asegura tu tranquilidad
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Todo online. Sin papeles, sin idas y vueltas.
            <br />
            Del caos al orden en tres simples pasos.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea conectora vertical (solo desktop) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-contablix-blue via-contablix-green to-contablix-blue -translate-x-1/2"
          />

          {/* Pasos */}
          <div className="space-y-16 lg:space-y-24">
            {pasos.map((paso, index) => {
              const Icon = paso.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={paso.id}
                  ref={(el) => {
                    if (el) stepsRef.current[index] = el;
                  }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Contenido */}
                  <div className="flex-1 w-full">
                    <div className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-200 hover:border-contablix-blue/30 transition-all duration-500 hover:shadow-xl">
                      {/* Número y título */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-contablix-blue to-contablix-green">
                          {paso.numero}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">
                          {paso.titulo}
                        </h3>
                      </div>

                      {/* Puntos */}
                      <ul className="space-y-4 mb-6">
                        {paso.puntos.map((punto, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-gray-700 leading-relaxed"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 bg-contablix-blue rounded-full mt-2" />
                            <span>{punto}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Micro CTA */}
                      {paso.cta && (
                        <button
                          onClick={() => scrollToSection("cotizador")}
                          className="text-contablix-blue font-semibold hover:text-contablix-green transition-colors flex items-center gap-2 group/btn"
                        >
                          {paso.cta}
                          <span className="group-hover/btn:translate-x-1 transition-transform">
                            →
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Icono central */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-contablix-blue to-contablix-green rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-6 transition-transform duration-300">
                      <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                  </div>

                  {/* Espaciador para mantener simetría */}
                  <div className="hidden lg:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
