"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determinar si ha scrolleado más de 50px
      setIsScrolled(currentScrollY > 50);

      // Mostrar header si scrollea hacia arriba o está en el top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled
              ? "bg-white/80 backdrop-blur-lg shadow-sm"
              : "bg-transparent"
          )}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              {/* Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 group"
              >
                <div className="text-2xl font-bold text-contablix-blue group-hover:scale-105 transition-transform">
                  Contablix
                </div>
              </button>

              {/* Menu Desktop */}
              <div className="hidden md:flex items-center gap-8">
                <button
                  onClick={() => scrollToSection("servicios")}
                  className="text-sm font-medium text-gray-700 hover:text-contablix-blue transition-colors"
                >
                  Servicios
                </button>
                <button
                  onClick={() => scrollToSection("planes")}
                  className="text-sm font-medium text-gray-700 hover:text-contablix-blue transition-colors"
                >
                  Planes
                </button>
                <button
                  onClick={() => scrollToSection("como-funciona")}
                  className="text-sm font-medium text-gray-700 hover:text-contablix-blue transition-colors"
                >
                  Cómo funciona
                </button>
                <button
                  onClick={() => scrollToSection("cotizador")}
                  className="px-6 py-2.5 bg-contablix-blue text-white rounded-full font-medium text-sm hover:bg-contablix-blue/90 transition-all hover:scale-105"
                >
                  Cotizá tu plan
                </button>
              </div>

              {/* Menu Mobile */}
              <button
                onClick={() => scrollToSection("cotizador")}
                className="md:hidden px-5 py-2 bg-contablix-blue text-white rounded-full font-medium text-sm"
              >
                Cotizar
              </button>
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
