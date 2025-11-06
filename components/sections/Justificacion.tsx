"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, MessageCircle, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pilares = [
  {
    id: 1,
    icon: TrendingUp,
    titulo: "Especialistas en negocios digitales",
    descripcion:
      "Sabemos cómo se mueve tu mundo. Trabajamos a diario con ecom sellers, freelancers, creadores y agencias.",
    detalle:
      "Sabemos cómo optimizar tus impuestos, integrar tus cobros y ordenar tu operación.",
    beneficio: "Más eficiencia, menos carga impositiva, decisiones informadas.",
  },
  {
    id: 2,
    icon: MessageCircle,
    titulo: "Te respondemos cuando vos necesitás",
    descripcion:
      "Olvidate de mensajes que nadie contesta o tickets eternos.",
    detalle:
      "Atención humana, pero oportuna: tenés respuesta por whatsapp, mail o meet en menos de 24hs.",
    beneficio: "Respuestas ágiles, asesor dedicado, confianza real.",
  },
  {
    id: 3,
    icon: Zap,
    titulo: "Anticipate. Planificá. Enfocate en tu crecimiento.",
    descripcion:
      "Te ayudamos a ordenar tus números para que siempre sepas qué esperar.",
    detalle:
      "Nuestro procedimiento estandarizado te permite saber de antemano qué tenés que hacer y cuánto tendrás que pagar.",
    beneficio: "Claridad y control. No más sorpresas.",
  },
];

export default function Justificacion() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2,
          }
        );
      }
    });
  }, []);

  return (
    <section id="servicios" className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decoración */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-contablix-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-contablix-green/5 rounded-full blur-3xl" />

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
            El equilibrio justo entre
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-contablix-blue to-contablix-green">
              máquina y humanos
            </span>
          </h2>
        </motion.div>

        {/* Grid de pilares */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {pilares.map((pilar, index) => {
            const Icon = pilar.icon;
            return (
              <div
                key={pilar.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group relative"
              >
                <div className="h-full p-8 bg-white rounded-3xl border border-gray-200 hover:border-contablix-blue/30 transition-all duration-500 hover:shadow-2xl">
                  {/* Icono */}
                  <div className="mb-6 w-14 h-14 bg-gradient-to-br from-contablix-blue to-contablix-blue/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Contenido */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {pilar.titulo}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {pilar.descripcion}
                  </p>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {pilar.detalle}
                  </p>

                  {/* Beneficio destacado */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-contablix-blue flex items-start gap-2">
                      <span className="text-contablix-green mt-0.5">📈</span>
                      {pilar.beneficio}
                    </p>
                  </div>

                  {/* Borde animado */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-contablix-blue via-contablix-green to-contablix-blue rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-xl md:text-2xl text-gray-700 italic max-w-4xl mx-auto leading-relaxed">
            Ofrecemos el punto justo entre sistemas (que no te conocen) y
            humanos (sobrepasados).
            <span className="block mt-2 font-semibold text-gray-900">
              Tecnología para ordenar. Profesionales para acompañar.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
