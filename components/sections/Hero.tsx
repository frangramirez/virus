"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gradientRef.current) {
      // Animación de gradiente de colores inspirada en Monoai
      gsap.to(gradientRef.current, {
        backgroundPosition: "400% 50%",
        duration: 8,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Gradiente animado de fondo */}
      <div
        ref={gradientRef}
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(120deg, #004678 0%, #00be69 25%, #004678 50%, #00be69 75%, #004678 100%)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* Patrones decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-contablix-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-contablix-green/5 rounded-full blur-3xl" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* H1 */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="block text-gray-900">
              Somos el estudio contable
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-contablix-blue to-contablix-blue/80 mt-2">
              del emprendedor digital
            </span>
          </h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Estrategia impositiva y claridad contable para escalar 100% online
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection("cotizador")}
              className="group relative px-8 py-4 bg-contablix-blue text-white rounded-full font-semibold text-lg hover:bg-contablix-blue/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">Cotizá en 1 minuto</span>
              <div className="absolute inset-0 rounded-full bg-contablix-green opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>

            <button
              onClick={() => scrollToSection("como-funciona")}
              className="px-8 py-4 bg-white text-contablix-blue border-2 border-contablix-blue rounded-full font-semibold text-lg hover:bg-contablix-blue hover:text-white transition-all hover:scale-105 shadow-md"
            >
              Agendá una reunión
            </button>
          </motion.div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
