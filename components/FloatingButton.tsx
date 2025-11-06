"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function FloatingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar después de scrollear 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCotizador = () => {
    const element = document.getElementById("cotizador");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          {/* Menú desplegable */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="absolute bottom-20 right-0 mb-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <h4 className="font-bold text-gray-900 text-lg">
                    ¿Necesitás ayuda?
                  </h4>
                  <button
                    onClick={scrollToCotizador}
                    className="w-full px-4 py-3 bg-contablix-blue text-white rounded-xl font-medium hover:bg-contablix-blue/90 transition-all hover:scale-105"
                  >
                    Cotizá tu servicio
                  </button>
                  <a
                    href="https://wa.me/5491112345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 bg-contablix-green text-white rounded-xl font-medium hover:bg-contablix-green/90 transition-all hover:scale-105 text-center"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="mailto:hola@contablix.com"
                    className="block w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition-all text-center"
                  >
                    Email
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón principal */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Círculo animado de fondo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-contablix-blue to-contablix-green opacity-80 group-hover:opacity-100 transition-opacity animate-pulse" />

            {/* Anillo exterior */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-contablix-blue via-contablix-green to-contablix-blue opacity-30 group-hover:opacity-50 blur-md transition-opacity" />

            {/* Contenido del botón */}
            <div className="relative w-16 h-16 bg-gradient-to-r from-contablix-blue to-contablix-green rounded-full flex items-center justify-center text-white shadow-2xl">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="message"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MessageCircle className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Badge de notificación */}
            {!isOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
              >
                <span className="text-[10px] font-bold text-white">1</span>
              </motion.div>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
