"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dolores = [
  {
    id: 1,
    text: "No sé cuánto estoy pagando ni por qué",
    icon: "💸",
  },
  {
    id: 2,
    text: "Mi contador no me da pelota",
    icon: "👻",
  },
  {
    id: 3,
    text: "No entiendo por qué me cobran esto",
    icon: "🤔",
  },
  {
    id: 4,
    text: "Me da miedo crecer, siento que se va a ir todo en impuestos",
    icon: "😰",
  },
];

export default function Dolores() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
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
              end: "top 60%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.15,
          }
        );
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-50 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Liberate de esa carga que está
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              frenando tu crecimiento
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transformamos tu caos fiscal en un sistema simple, predecible y
            rentable.
            <br />
            <span className="font-semibold text-gray-800">
              Impuestos bajo control, márgenes claros y tiempo para enfocarte
              en crecer.
            </span>
          </p>
        </motion.div>

        {/* Grid de dolores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {dolores.map((dolor, index) => (
            <div
              key={dolor.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative"
            >
              <div className="relative p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Brillo en hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-contablix-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Contenido */}
                <div className="relative space-y-4">
                  <div className="text-5xl">{dolor.icon}</div>
                  <p className="text-xl font-semibold text-gray-800 leading-snug">
                    "{dolor.text}"
                  </p>
                </div>

                {/* Acento de color */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-contablix-blue to-contablix-green rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
