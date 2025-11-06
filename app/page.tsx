import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Dolores from "@/components/sections/Dolores";
import Justificacion from "@/components/sections/Justificacion";
import Autoridad from "@/components/sections/Autoridad";
import Planes from "@/components/sections/Planes";
import ComoFunciona from "@/components/sections/ComoFunciona";
import Testimonios from "@/components/sections/Testimonios";
import Cotizador from "@/components/sections/Cotizador";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Dolores />
      <Justificacion />
      <Autoridad />
      <Planes />
      <ComoFunciona />
      <Testimonios />
      <Cotizador />
      <Footer />
      <FloatingButton />
    </main>
  );
}
