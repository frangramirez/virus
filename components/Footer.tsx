"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-contablix-dark text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo y descripción */}
          <div>
            <h3 className="text-2xl font-bold text-contablix-blue mb-4">
              Contablix
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              El estudio contable del emprendedor digital en Argentina
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-contablix-blue rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-contablix-blue rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-contablix-blue rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Navegación</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("servicios")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("planes")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Planes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("como-funciona")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cómo funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cotizador")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cotizar
                </button>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-bold text-lg mb-4">Servicios</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Monotributo e Ingresos Brutos</li>
              <li>Responsable Inscripto</li>
              <li>Consultoría E-commerce</li>
              <li>Consultoría Cripto</li>
              <li>Constitución SAS</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:hola@contablix.com"
                  className="hover:text-white transition-colors"
                >
                  hola@contablix.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+5491112345678"
                  className="hover:text-white transition-colors"
                >
                  +54 9 11 1234-5678
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Contablix. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
