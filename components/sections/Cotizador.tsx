"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowLeft, Check, Mail, Phone, User } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  actividad: string;
  facturacion: string;
  provincias: string;
  nombre: string;
  email: string;
  telefono: string;
};

const actividades = [
  "Freelancer / Contractor",
  "E-commerce Seller",
  "Importador",
  "SAS / Empresa",
  "Creador de Contenido",
  "Agencia Digital",
  "Otro",
];

const facturaciones = [
  "Menos de $500k/mes",
  "$500k - $2M/mes",
  "$2M - $5M/mes",
  "Más de $5M/mes",
];

const provinciasOptions = [
  "1 provincia",
  "2 a 5 provincias",
  "5 a 15 provincias",
  "+15 provincias",
];

export default function Cotizador() {
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalSteps = 4;

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const selectedActividad = watch("actividad");
  const selectedFacturacion = watch("facturacion");
  const selectedProvincias = watch("provincias");

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#ffffff" },
        {
          backgroundColor: "#0a0a0a",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setIsComplete(true);
    // Aquí integrarás con Brevo/Odoo
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedActividad;
      case 2:
        return selectedFacturacion;
      case 3:
        return selectedProvincias;
      default:
        return false;
    }
  };

  return (
    <section
      id="cotizador"
      ref={sectionRef}
      className="min-h-screen py-24 md:py-32 bg-contablix-dark text-white relative overflow-hidden flex items-center"
    >
      {/* Efectos de fondo dramáticos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-contablix-blue/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-contablix-green/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        {!isComplete ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Cotizá tu servicio
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-contablix-blue to-contablix-green">
                  en minutos
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Respondé 3 preguntas simples y conocé el plan ideal para vos
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        i <= step
                          ? "bg-gradient-to-r from-contablix-blue to-contablix-green text-white"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {i < step ? <Check className="w-5 h-5" /> : i}
                    </div>
                    {i < 4 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-all ${
                          i < step ? "bg-contablix-green" : "bg-gray-700"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-400 text-sm">
                Paso {step} de {totalSteps}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* Step 1: Actividad */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold mb-8">
                      ¿Cuál es tu actividad principal?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {actividades.map((actividad) => (
                        <label
                          key={actividad}
                          className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                            selectedActividad === actividad
                              ? "border-contablix-green bg-contablix-green/10"
                              : "border-gray-700 hover:border-gray-600 bg-gray-900/50"
                          }`}
                        >
                          <input
                            type="radio"
                            value={actividad}
                            {...register("actividad", { required: true })}
                            className="sr-only"
                          />
                          <span className="text-lg font-medium">{actividad}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Facturación */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold mb-8">
                      ¿Cuál es tu facturación mensual aproximada?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {facturaciones.map((facturacion) => (
                        <label
                          key={facturacion}
                          className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                            selectedFacturacion === facturacion
                              ? "border-contablix-green bg-contablix-green/10"
                              : "border-gray-700 hover:border-gray-600 bg-gray-900/50"
                          }`}
                        >
                          <input
                            type="radio"
                            value={facturacion}
                            {...register("facturacion", { required: true })}
                            className="sr-only"
                          />
                          <span className="text-lg font-medium">{facturacion}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Provincias */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold mb-8">
                      ¿A cuántas provincias vendés?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {provinciasOptions.map((provincia) => (
                        <label
                          key={provincia}
                          className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                            selectedProvincias === provincia
                              ? "border-contablix-green bg-contablix-green/10"
                              : "border-gray-700 hover:border-gray-600 bg-gray-900/50"
                          }`}
                        >
                          <input
                            type="radio"
                            value={provincia}
                            {...register("provincias", { required: true })}
                            className="sr-only"
                          />
                          <span className="text-lg font-medium">{provincia}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Datos de contacto */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold mb-8">
                      Dejanos tus datos para enviarte la cotización
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Nombre completo
                        </label>
                        <input
                          {...register("nombre", { required: true })}
                          className="w-full p-4 rounded-xl bg-gray-900/50 border-2 border-gray-700 focus:border-contablix-blue outline-none transition-all"
                          placeholder="Tu nombre"
                        />
                        {errors.nombre && (
                          <span className="text-red-400 text-sm">Campo requerido</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </label>
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          className="w-full p-4 rounded-xl bg-gray-900/50 border-2 border-gray-700 focus:border-contablix-blue outline-none transition-all"
                          placeholder="tu@email.com"
                        />
                        {errors.email && (
                          <span className="text-red-400 text-sm">Campo requerido</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Teléfono
                        </label>
                        <input
                          {...register("telefono", { required: true })}
                          className="w-full p-4 rounded-xl bg-gray-900/50 border-2 border-gray-700 focus:border-contablix-blue outline-none transition-all"
                          placeholder="+54 9 11 1234-5678"
                        />
                        {errors.telefono && (
                          <span className="text-red-400 text-sm">Campo requerido</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botones de navegación */}
              <div className="flex justify-between mt-12">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Anterior
                  </button>
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-contablix-blue to-contablix-green text-white rounded-xl font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-contablix-blue to-contablix-green text-white rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
                  >
                    Obtener cotización
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-contablix-blue to-contablix-green rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-4xl font-bold mb-4">¡Listo!</h3>
            <p className="text-xl text-gray-400 mb-8">
              Te enviaremos tu cotización personalizada en las próximas 24hs
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-4 bg-white text-contablix-dark rounded-full font-semibold hover:scale-105 transition-all"
            >
              Volver al inicio
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
