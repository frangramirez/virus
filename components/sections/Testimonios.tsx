"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonios = [
  {
    id: 1,
    nombre: "Martín González",
    rol: "E-commerce Seller",
    texto:
      "Desde que trabajo con Contablix tengo claridad total sobre mis números. Ya no me preocupo por sorpresas fiscales y puedo enfocarme en vender.",
    rating: 5,
  },
  {
    id: 2,
    nombre: "Laura Fernández",
    rol: "Freelancer Designer",
    texto:
      "Finalmente encontré un contador que entiende mi negocio digital. Las respuestas son rápidas y siempre saben qué me conviene hacer.",
    rating: 5,
  },
  {
    id: 3,
    nombre: "Diego Ramírez",
    rol: "SaaS Founder",
    texto:
      "El servicio es impecable. Me ayudaron a estructurar mi SAS y optimizar la carga impositiva. Súper recomendables.",
    rating: 5,
  },
  {
    id: 4,
    nombre: "Carolina Paz",
    rol: "Importadora",
    texto:
      "Manejan perfectamente los despachos de importación y me ayudan a mantener mis costos bajo control. No los cambio por nada.",
    rating: 5,
  },
  {
    id: 5,
    nombre: "Sebastián Torres",
    rol: "Content Creator",
    texto:
      "Asesoramiento de primera, siempre disponibles. Me sacaron de un quilombo importante con monotributo y ahora está todo en orden.",
    rating: 5,
  },
  {
    id: 6,
    nombre: "Valeria Campos",
    rol: "Agencia Digital",
    texto:
      "Trabajamos con ellos hace 3 años y la diferencia es enorme. Proactivos, claros y súper profesionales.",
    rating: 5,
  },
];

export default function Testimonios() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: (index % 3) * 0.15,
          }
        );
      }
    });
  }, []);

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decoración */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-contablix-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-contablix-green/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-8 h-8 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 400 emprendedores digitales confían en nosotros para llevar
            su contabilidad
          </p>
        </motion.div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonios.map((testimonio, index) => (
            <div
              key={testimonio.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group"
            >
              <div className="h-full p-8 bg-white rounded-3xl border-2 border-gray-200 hover:border-contablix-blue/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative">
                {/* Icono de quote */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-contablix-blue to-contablix-green rounded-2xl flex items-center justify-center shadow-lg rotate-6 group-hover:rotate-12 transition-transform">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonio.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Texto */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonio.texto}"
                </p>

                {/* Autor */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="font-bold text-gray-900">{testimonio.nombre}</p>
                  <p className="text-sm text-contablix-blue font-medium">
                    {testimonio.rol}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            ¿Querés ser el próximo en unirte?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("cotizador");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="px-8 py-4 bg-contablix-blue text-white rounded-full font-semibold text-lg hover:bg-contablix-blue/90 transition-all hover:scale-105 shadow-lg"
          >
            Comenzá ahora
          </button>
        </motion.div>
      </div>
    </section>
  );
}
