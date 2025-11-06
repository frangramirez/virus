"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const logos = [
  { name: "Mercado Libre", color: "#FFE600" },
  { name: "DEEL", color: "#6C4EE5" },
  { name: "Tienda Nube", color: "#00A97F" },
  { name: "Shopify", color: "#96BF48" },
  { name: "Bitcoin", color: "#F7931A" },
  { name: "n8n", color: "#FF6D5A" },
];

export default function Autoridad() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const scrollWidth = slider.scrollWidth;
      const animationDuration = 30;

      gsap.to(slider, {
        x: -scrollWidth / 2,
        duration: animationDuration,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats destacados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-contablix-green/10 rounded-full">
            <div className="w-2 h-2 bg-contablix-green rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-contablix-green">
              +5 años online · Pioneros en servicio digital
            </span>
          </div>

          <div>
            <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-contablix-blue to-contablix-green mb-4">
              +400
            </div>
            <p className="text-2xl md:text-3xl text-gray-700 font-semibold">
              Clientes satisfechos
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Confiando en nosotros para escalar sus negocios digitales
            </p>
          </div>
        </motion.div>

        {/* Texto integraciones */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-lg text-gray-600 font-medium">
            Trabajamos con las principales plataformas del ecosistema digital
          </p>
        </motion.div>

        {/* Slider infinito de logos */}
        <div className="relative">
          {/* Gradientes laterales */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Contenedor del slider */}
          <div className="overflow-hidden">
            <div ref={sliderRef} className="flex gap-12 items-center py-8">
              {/* Duplicamos los logos para el efecto infinito */}
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 h-24 flex items-center justify-center"
                >
                  <div className="group relative">
                    <div
                      className="px-8 py-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{
                        borderColor: `${logo.color}20`,
                      }}
                    >
                      <div
                        className="text-xl font-bold text-center"
                        style={{ color: logo.color }}
                      >
                        {logo.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
